import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Category from '@/models/Category';
import Project from '@/models/Project';

// GET /api/admin/categories/[id] - Get single category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    console.log('Fetching category with ID:', id);

    const category = await Category.findById(id).lean();

    if (!category) {
      console.log('Category not found for ID:', id);
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    console.log('Category found:', category.name);
    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/categories/[id] - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { name, description } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Find existing category
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Generate new slug if name changed
    let slug = existingCategory.slug;
    if (name !== existingCategory.name) {
      slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug already exists
      const slugExists = await Category.findOne({ 
        slug, 
        _id: { $ne: id } 
      });
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Category with this name already exists' },
          { status: 400 }
        );
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, description },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id] - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    console.log('DELETE request for category ID:', id);

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      console.log('Category not found for deletion:', id);
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category is being used by any projects
    const projectsCount = await Project.countDocuments({ category: id });
    console.log(`Category "${category.name}" is used by ${projectsCount} projects`);
    
    if (projectsCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete category "${category.name}". It is being used by ${projectsCount} project(s).` 
        },
        { status: 400 }
      );
    }

    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(id);
    console.log('Category deleted successfully:', deletedCategory?.name);

    return NextResponse.json({
      success: true,
      message: `Category "${category.name}" deleted successfully`,
      data: { id: deletedCategory?._id }
    });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}