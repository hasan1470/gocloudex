'use server';

import connectDB from '@/lib/database';
import User, { IUser } from '@/models/User'; // Modified: Added IUser import
import Message from '@/models/Message';
import { revalidateTag } from 'next/cache';

/**
 * Fetches all users who have chats.
 */
export async function getChatUsers() {
    try {
        await connectDB();
        const users = await User.find({
            $and: [
                { lastChatMessage: { $exists: true, $ne: '' } },
                { chatCount: { $gt: 0 } }
            ]
        })
            .sort({ lastChatDate: -1 })
            .lean() as any[];

        const transformedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            lastChatDate: user.lastChatDate || user.createdAt,
            lastChatMessage: user.lastChatMessage || 'No messages yet',
            chatUnreadCount: user.chatUnreadCount || 0,
            chatCount: user.chatCount || 0,
            isOnline: Math.random() > 0.5,
            lastSeen: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
        }));

        return {
            success: true,
            data: {
                users: JSON.parse(JSON.stringify(transformedUsers))
            }
        };
    } catch (error) {
        console.error('Error fetching chat users:', error);
        return { success: false, error: 'Failed to fetch chat users' };
    }
}

/**
 * Fetches messages for a specific user from their chats array.
 */
export async function getChatMessages(userId: string) {
    try {
        await connectDB();
        const user = await User.findById(userId).select('chats name email lastChatDate lastChatMessage chatUnreadCount chatCount').lean() as any;

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // Sort messages by creation date if needed
        const messages = (user.chats || []).map((msg: any) => ({
            ...msg,
            id: msg._id,
            _id: msg._id
        }));

        return {
            success: true,
            data: {
                messages: JSON.parse(JSON.stringify(messages)),
                user: JSON.parse(JSON.stringify({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    lastChatDate: user.lastChatDate,
                    lastChatMessage: user.lastChatMessage,
                    chatUnreadCount: user.chatUnreadCount,
                    chatCount: user.chatCount
                }))
            }
        };
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return { success: false, error: 'Failed to fetch chat messages' };
    }
}

/**
 * Marks all messages from a user as read.
 */
export async function markChatAsRead(userId: string) {
    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) return { success: false, error: 'User not found' };

        user.chats.forEach((chat: any) => {
            if (chat.sender === 'user') {
                chat.isRead = true;
            }
        });

        user.chatUnreadCount = 0;
        await user.save();

        return { success: true };
    } catch (error) {
        console.error('Error marking chat as read:', error);
        return { success: false, error: 'Failed to mark as read' };
    }
}

/**
 * Sends a message from admin to a user by pushing to their chats array.
 */
export async function sendAdminMessage(userId: string, text: string) {
    try {
        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        const newMessage = {
            message: text,
            sender: 'admin' as const,
            isRead: true,
            createdAt: new Date(),
            type: 'text'
        };

        user.chats.push(newMessage);
        user.chatCount += 1;
        user.lastChatDate = new Date();
        user.lastChatMessage = text;

        await user.save();

        const savedMessage = user.chats[user.chats.length - 1];

        return {
            success: true,
            data: {
                message: JSON.parse(JSON.stringify({
                    ...savedMessage.toObject(),
                    id: savedMessage._id,
                    _id: savedMessage._id
                }))
            }
        };
    } catch (error) {
        console.error('Error sending admin message:', error);
        return { success: false, error: 'Failed to send message' };
    }
}
