import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/upload';
import { verifyAdminAuth } from '@/middlewares/authAdmin';
import { revalidatePortfolio } from '@/lib/portfolio-revalidation';
import type { FilterQuery } from 'mongoose';
import type { IProject } from '@/models/Project';

function getErrorField(error: unknown, field: string): unknown {
  return typeof error === 'object' && error !== null && field in error
    ? (error as Record<string, unknown>)[field]
    : undefined;
}

// GET /api/admin/projects - Get all projects with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10));
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: FilterQuery<IProject> = {};
    
    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.categories = categoryDoc._id; // Changed from category to categories
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
        { technologies: { $in: [new RegExp(search, 'i')] } },
        { keyFeatures: { $in: [new RegExp(search, 'i')] } }, // Added keyFeatures to search
        { projectOverview: { $regex: search, $options: 'i' } } // Added projectOverview to search
      ];
    }

    // Get projects with population
    const projects = await Project.find(filter)
      .populate('categories', 'name slug') 
      .sort({ sortOrder: 1, completionDate: -1 })
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

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }
    
    await connectDB();

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
    const detailWidth = Number(formData.get('detailWidth') || 1200);
    const detailHeight = Number(formData.get('detailHeight') || 675);
    const kind = (formData.get('kind') as string) || 'Portfolio demo';
    const role = (formData.get('role') as string) || 'Design & development';
    const challenge = (formData.get('challenge') as string) || description;
    const approach = formData.get('approach') as string;
    const note = formData.get('note') as string;
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

    // Validate categories exist
    const categoryDocs = await Category.find({ _id: { $in: categories } });
    if (categoryDocs.length !== categories.length) {
      return NextResponse.json(
        { success: false, error: 'One or more categories are invalid' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary if provided
    let imageUrl = '';
    let detailImageUrl = '';
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
    if (detailImageFile && detailImageFile.size > 0) {
      try {
        detailImageUrl = await uploadToCloudinary(detailImageFile);
      } catch (error) {
        if (imageUrl) await deleteFromCloudinary(imageUrl);
        console.error('Detail image upload error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload the detail image' },
          { status: 500 }
        );
      }
    }

    // Create project
    const project = await Project.create({
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
      note,
      credit,
      projectOverview, // HTML content for project overview
      projectUrl,
      githubUrl,
      featured,
      status,
      completionDate: parsedCompletionDate,
      sortOrder,
    });

    await project.populate('categories', 'name slug'); // Populate categories array
    revalidatePortfolio(project.slug);

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Create project error:', error);
    
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
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
