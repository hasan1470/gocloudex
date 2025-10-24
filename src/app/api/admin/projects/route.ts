import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { uploadToCloudinary } from '@/lib/upload';

// GET /api/admin/projects - Get all projects with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (featured && featured !== 'all') {
      filter.featured = featured === 'true';
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Get projects with population
    const projects = await Project.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Project.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    
    // Get text fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const technologies = JSON.parse(formData.get('technologies') as string || '[]');
    const projectUrl = formData.get('projectUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const featured = formData.get('featured') === 'true';
    const status = formData.get('status') as 'draft' | 'published' | 'archived';
    const completionDate = formData.get('completionDate') as string;
    
    // Get image file
    const imageFile = formData.get('image') as File;

    // Validate required fields
    if (!title || !description || !category || !technologies?.length) {
      return NextResponse.json(
        { success: false, error: 'Title, description, category, and technologies are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'A project with this title already exists' },
        { status: 400 }
      );
    }

    // Find category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary if provided
    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
        console.log('Image uploaded to Cloudinary:', imageUrl);
      } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Create project
    const project = await Project.create({
      title,
      description,
      slug,
      category: categoryDoc._id,
      image: imageUrl,
      technologies,
      projectUrl,
      githubUrl,
      featured,
      status,
      completionDate: new Date(completionDate),
    });

    await project.populate('category', 'name slug');

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}