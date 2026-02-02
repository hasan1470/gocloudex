'use server';

import connectDB from '@/lib/database';
import User from '@/models/User';

interface EmailFilter {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'all' | 'read' | 'unread';
}

/**
 * Fetches users for email management.
 */
export async function getAdminEmails(filters: EmailFilter = {}) {
    try {
        await connectDB();
        const { page = 1, limit = 10, search = '', status = 'all' } = filters;
        const skip = (page - 1) * limit;

        const query: any = { emailCount: { $gt: 0 } };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status === 'unread') {
            query.emailUnreadCount = { $gt: 0 };
        } else if (status === 'read') {
            query.emailUnreadCount = 0;
        }

        const [users, total] = await Promise.all([
            User.find(query).sort({ lastEmailDate: -1 }).skip(skip).limit(limit).lean(),
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
        console.error('Error fetching admin emails:', error);
        return { success: false, error: 'Failed to fetch emails' };
    }
}

/**
 * Toggles the read status of a user's emails.
 */
export async function toggleEmailReadStatus(userId: string, action: 'mark-read' | 'mark-unread', originalUnreadCount?: number) {
    try {
        await connectDB();

        let unreadCount = 0;

        if (action === 'mark-read') {
            unreadCount = 0;
        } else {
            // If we're marking as unread, we restore the original count or default to 1
            unreadCount = originalUnreadCount || 1;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { emailUnreadCount: unreadCount } },
            { new: true }
        );

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        return {
            success: true,
            data: {
                unreadCount: user.emailUnreadCount,
                message: `Marked as ${action === 'mark-read' ? 'read' : 'unread'}`
            }
        };
    } catch (error) {
        console.error('Error toggling email status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}
