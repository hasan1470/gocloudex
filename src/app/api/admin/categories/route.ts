import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Category from '@/models/Category';
import { verifyAdminAuth } from '@/middlewares/authAdmin';
import { revalidateCategories, revalidatePortfolio } from '@/lib/portfolio-revalidation';

// GET /api/admin/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    await connectDB();

    const categories = await Category.find().sort({ name: 1 }).lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    await connectDB();

    const { name, description } = await request.json();

    // Validate required fields
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    if (!normalizedName) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = normalizedName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if category already exists
    const existingCategory = await Category.findOne({
      $or: [{ name: normalizedName }, { slug }]
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: normalizedName,
      slug,
      description: typeof description === 'string' ? description.trim() : '',
    });
    revalidateCategories();
    revalidatePortfolio();

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
