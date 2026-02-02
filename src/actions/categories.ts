'use server';

import connectDB from '@/lib/database';
import Category from '@/models/Category';
import { Category as CategoryType } from '@/types';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';

/**
 * Fetches all categories.
 */
export const getAdminCategories = unstable_cache(
    async (): Promise<CategoryType[]> => {
        try {
            await connectDB();
            const categories = await Category.find().sort({ name: 1 }).lean();
            return JSON.parse(JSON.stringify(categories));
        } catch (error) {
            console.error('Error fetching admin categories:', error);
            return [];
        }
    },
    ['admin-categories'],
    { revalidate: 3600, tags: ['categories'] }
);

/**
 * Deletes a category by ID.
 */
export async function deleteCategory(id: string) {
    try {
        await connectDB();
        const result = await Category.findByIdAndDelete(id);
        if (result) {
            revalidatePath('/admin/categories');
            revalidatePath('/portfolio');
            return { success: true };
        }
        return { success: false, error: 'Category not found' };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, error: 'Failed to delete category' };
    }
}
