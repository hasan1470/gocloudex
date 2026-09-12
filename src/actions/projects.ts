'use server';

import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Category from '@/models/Category';
import { Project as ProjectType, Category as CategoryType } from '@/types';
import { unstable_cache } from 'next/cache';

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
                .sort({ sortOrder: 1, completionDate: -1 })
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
