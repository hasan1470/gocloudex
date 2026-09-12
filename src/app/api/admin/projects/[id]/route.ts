import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/upload';
import { verifyAdminAuth } from '@/middlewares/authAdmin';
import { revalidatePortfolio } from '@/lib/portfolio-revalidation';

function getErrorField(error: unknown, field: string): unknown {
  return typeof error === 'object' && error !== null && field in error
    ? (error as Record<string, unknown>)[field]
    : undefined;
}

// GET /api/admin/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }
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
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }
    await connectDB();

    const { id } = await params;
    const formData = await request.formData();
    
    // Get text fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categories = JSON.parse(formData.get('categories') as string || '[]'); // Changed to categories array
    const technologies = JSON.parse(formData.get('technologies') as string || '[]');
    const keyFeatures = JSON.parse(formData.get('keyFeatures') as string || '[]'); // New field
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const walkthrough = JSON.parse(formData.get('walkthrough') as string || '[]');
    const projectOverview = formData.get('projectOverview') as string; // New field
    const imageAlt = formData.get('imageAlt') as string;
    const detailWidthValue = formData.get('detailWidth');
    const detailHeightValue = formData.get('detailHeight');
    const kind = (formData.get('kind') as string) || 'Portfolio demo';
    const role = (formData.get('role') as string) || 'Design & development';
    const challenge = (formData.get('challenge') as string) || description;
    const approach = formData.get('approach') as string;
    const walkthroughNote = formData.get('note') as string;
    const credit = formData.get('credit') as string;
    const sortOrder = Number(formData.get('sortOrder') || 100);
    const projectUrl = formData.get('projectUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const featured = formData.get('featured') === 'true';
    const status = formData.get('status') as 'draft' | 'published' | 'archived';
    const completionDate = formData.get('completionDate') as string;
    
    // Get image file
    const imageFile = formData.get('image') as File;
    const detailImageFile = formData.get('detailImage') as File;
    const removeImage = formData.get('removeImage') === 'true';
    const removeDetailImage = formData.get('removeDetailImage') === 'true';

    // Find existing project
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const previousSlug = existingProject.slug;
    const detailWidth = Number(detailWidthValue || existingProject.detailWidth || 1200);
    const detailHeight = Number(detailHeightValue || existingProject.detailHeight || 675);

    // Validate required fields
    const validKinds = ['Independent product', 'Portfolio demo', 'Client project'];
    const validStatuses = ['draft', 'published', 'archived'];
    const parsedCompletionDate = new Date(completionDate);
    if (
      !title?.trim() ||
      !description?.trim() ||
      !Array.isArray(categories) ||
      !categories.length ||
      !Array.isArray(technologies) ||
      !technologies.length ||
      !Array.isArray(keyFeatures) ||
      !Array.isArray(tags) ||
      !Array.isArray(walkthrough) ||
      !validKinds.includes(kind) ||
      !validStatuses.includes(status) ||
      Number.isNaN(parsedCompletionDate.getTime()) ||
      !Number.isFinite(sortOrder) ||
      detailWidth <= 0 ||
      detailHeight <= 0
    ) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please complete the required project fields with valid values.'
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
    let imageUrl = removeImage ? '' : existingProject.image;
    let oldImageToDelete = removeImage ? existingProject.image : '';
    if (imageFile && imageFile.size > 0) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
        oldImageToDelete = existingProject.image;
      } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    let detailImageUrl = removeDetailImage ? '' : existingProject.detailImage;
    let oldDetailImageToDelete = removeDetailImage ? existingProject.detailImage : '';
    if (detailImageFile && detailImageFile.size > 0) {
      try {
        detailImageUrl = await uploadToCloudinary(detailImageFile);
        oldDetailImageToDelete = existingProject.detailImage;
      } catch (error) {
        if (imageFile && imageUrl) await deleteFromCloudinary(imageUrl);
        console.error('Detail image upload error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload the detail image' },
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
        detailImage: detailImageUrl,
        imageAlt,
        detailWidth,
        detailHeight,
        kind,
        role,
        tags,
        technologies,
        keyFeatures, // Array of key features
        challenge,
        approach,
        walkthrough,
        note: walkthroughNote,
        credit,
        projectOverview, // HTML content for project overview
        projectUrl,
        githubUrl,
        featured,
        status,
        completionDate: parsedCompletionDate,
        sortOrder,
      },
      { new: true, runValidators: true }
    ).populate('categories', 'name slug'); // Populate categories array
    await Promise.allSettled(
      [oldImageToDelete, oldDetailImageToDelete]
        .filter(Boolean)
        .map((url) => deleteFromCloudinary(url)),
    );
    revalidatePortfolio(previousSlug, project?.slug);

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    console.error('Update project error:', error);
    
    // Handle duplicate key errors
    if (getErrorField(error, 'code') === 11000) {
      return NextResponse.json(
        { success: false, error: 'A project with this title already exists' },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (getErrorField(error, 'name') === 'ValidationError') {
      const validationErrors = getErrorField(error, 'errors');
      const errors = validationErrors && typeof validationErrors === 'object'
        ? Object.values(validationErrors).map((item) => String(getErrorField(item, 'message') || item))
        : ['Project validation failed'];
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
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }
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
    revalidatePortfolio(project.slug);

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
