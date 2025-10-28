import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';

// GET /api/projects - Get all published projects
export async function GET() {
  try {
    await connectDB();

    // Only fetch projects with status 'published'
    const projects = await Project.find({ status: 'published' })
    .sort({ completionDate: -1 }); // newest first based on completionDate


    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
