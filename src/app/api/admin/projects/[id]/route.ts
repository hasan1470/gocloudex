import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/upload';

// GET /api/admin/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    console.log('Fetching project with ID:', id);

    const project = await Project.findById(id)
      .populate('categories', 'name slug') // Changed from category to categories
      .lean();

    if (!project) {
      console.log('Project not found for ID:', id);
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    console.log('Project found:', project.title);
    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[id] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const formData = await request.formData();
    
    // Get text fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categories = JSON.parse(formData.get('categories') as string || '[]'); // Changed to categories array
    const technologies = JSON.parse(formData.get('technologies') as string || '[]');
    const keyFeatures = JSON.parse(formData.get('keyFeatures') as string || '[]'); // New field
    const projectOverview = formData.get('projectOverview') as string; // New field
    const projectUrl = formData.get('projectUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const featured = formData.get('featured') === 'true';
    const status = formData.get('status') as 'draft' | 'published' | 'archived';
    const completionDate = formData.get('completionDate') as string;
    
    // Get image file
    const imageFile = formData.get('image') as File;

    // Find existing project
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!title || !description || !categories?.length || !technologies?.length) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Title, description, categories, and technologies are required' 
        },
        { status: 400 }
      );
    }

    // If title changed, update slug
    let slug = existingProject.slug;
    if (title && title !== existingProject.title) {
      slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug already exists
      const slugExists = await Project.findOne({ 
        slug, 
        _id: { $ne: id } 
      });
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A project with this title already exists' },
          { status: 400 }
        );
      }
    }

    // Validate categories exist
    if (categories && categories.length > 0) {
      const categoryDocs = await Category.find({ _id: { $in: categories } });
      if (categoryDocs.length !== categories.length) {
        return NextResponse.json(
          { success: false, error: 'One or more categories are invalid' },
          { status: 400 }
        );
      }
    }

    // Handle image upload if new image is provided
    let imageUrl = existingProject.image;
    if (imageFile && imageFile.size > 0) {
      try {
        // Delete old image from Cloudinary if exists
        if (existingProject.image) {
          await deleteFromCloudinary(existingProject.image);
          console.log('Deleted old image from Cloudinary');
        }
        
        // Upload new image
        imageUrl = await uploadToCloudinary(imageFile);
        console.log('New image uploaded to Cloudinary:', imageUrl);
      } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Update project
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        slug,
        categories, // Array of category IDs
        image: imageUrl,
        technologies,
        keyFeatures, // Array of key features
        projectOverview, // HTML content for project overview
        projectUrl,
        githubUrl,
        featured,
        status,
        completionDate: new Date(completionDate),
      },
      { new: true, runValidators: true }
    ).populate('categories', 'name slug'); // Populate categories array

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('Update project error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A project with this title already exists' },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    console.log('DELETE request for project ID:', id);

    // Find project first to get image URL
    const project = await Project.findById(id);
    if (!project) {
      console.log('Project not found for deletion:', id);
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    console.log('Found project to delete:', project.title);

    // Delete the project (this will trigger the post hook to delete image from Cloudinary)
    const deletedProject = await Project.findByIdAndDelete(id);
    console.log('Project deleted successfully:', deletedProject?.title);

    return NextResponse.json({
      success: true,
      message: `Project "${project.title}" deleted successfully`,
      data: { id: deletedProject?._id }
    });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}