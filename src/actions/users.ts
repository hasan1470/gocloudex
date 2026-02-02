'use server';

import connectDB from '@/lib/database';
import User from '@/models/User';
import { revalidateTag } from 'next/cache';

interface UsersFilter {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'all' | 'email' | 'chat';
}

/**
 * Fetches users with filtering and pagination.
 */
export async function getAdminUsers(filters: UsersFilter = {}) {
    try {
        await connectDB();
        const { page = 1, limit = 10, search = '', status = 'all' } = filters;
        const skip = (page - 1) * limit;

        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status === 'email') {
            query.emailCount = { $gt: 0 };
        } else if (status === 'chat') {
            query.chatCount = { $gt: 0 };
        }

        const [users, total] = await Promise.all([
            User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            User.countDocuments(query)
        ]);

        return {
            success: true,
            data: {
                users: JSON.parse(JSON.stringify(users.map((u: any) => ({ ...u, id: u._id })))),
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalUsers: total,
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        };
    } catch (error) {
        console.error('Error fetching admin users:', error);
        return { success: false, error: 'Failed to fetch users' };
    }
}

/**
 * Deletes a user by ID.
 */
export async function deleteUser(id: string) {
    try {
        await connectDB();
        const result = await User.findByIdAndDelete(id);
        if (result) {
            // Revalidate any user-related caches if they exist
            return { success: true };
        }
        return { success: false, error: 'User not found' };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}
