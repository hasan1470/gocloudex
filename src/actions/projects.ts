'use server';

import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { Project as ProjectType, Category as CategoryType } from '@/types';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';

/**
 * Fetches all published projects directly from the database.
 * Cached for performance.
 */
export const getPublishedProjects = unstable_cache(
    async (): Promise<ProjectType[]> => {
        try {
            await connectDB();
            const projects = await Project.find({ status: 'published' })
                .populate('categories')
                .sort({ completionDate: -1 })
                .lean();

            // Convert Mongo objects to plain JS objects for Serializability
            return JSON.parse(JSON.stringify(projects));
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    },
    ['published-projects'],
    { revalidate: 3600, tags: ['projects'] }
);

/**
 * Fetches all project categories.
 * Cached for performance.
 */
export const getCategories = unstable_cache(
    async (): Promise<CategoryType[]> => {
        try {
            await connectDB();
            const categories = await Category.find().sort({ name: 1 }).lean();
            return JSON.parse(JSON.stringify(categories));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },
    ['all-categories'],
    { revalidate: 3600, tags: ['categories'] }
);

/**
 * Fetches a single project by slug.
 * Cached for performance.
 */
export const getProjectBySlug = unstable_cache(
    async (slug: string): Promise<ProjectType | null> => {
        try {
            await connectDB();
            const project = await Project.findOne({ slug, status: 'published' })
                .populate('categories')
                .lean();

            if (!project) return null;
            return JSON.parse(JSON.stringify(project));
        } catch (error) {
            console.error('Error fetching project by slug:', error);
            return null;
        }
    },
    ['project-by-slug'],
    { revalidate: 3600, tags: ['projects'] }
);

/**
 * Deletes a project by ID.
 */
export async function deleteProject(id: string) {
    try {
        await connectDB();
        const result = await Project.findByIdAndDelete(id);
        if (result) {
            revalidatePath('/admin/projects');
            revalidatePath('/portfolio');
            return { success: true };
        }
        return { success: false, error: 'Project not found' };
    } catch (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: 'Failed to delete project' };
    }
}

/**
 * Enhanced fetch for admin projects with filters.
 */
export async function getAdminProjects(filters: any = {}) {
    try {
        await connectDB();
        const { page = 1, limit = 10, category = 'all', status = 'all', featured = 'all', search = '' } = filters;
        const skip = (page - 1) * limit;

        const query: any = {};
        if (category !== 'all') {
            const categoryDoc = await Category.findOne({ slug: category });
            if (categoryDoc) query.categories = categoryDoc._id;
        }
        if (status !== 'all') query.status = status;
        if (featured !== 'all') query.featured = featured === 'true';
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const [projects, total] = await Promise.all([
            Project.find(query).populate('categories').sort({ completionDate: -1 }).skip(skip).limit(limit).lean(),
            Project.countDocuments(query)
        ]);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(projects)),
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        console.error('Error fetching admin projects:', error);
        return { success: false, error: 'Failed to fetch projects' };
    }
}
