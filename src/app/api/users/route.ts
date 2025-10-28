import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';

// GET - Fetch users with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Status filter
    if (status === 'unread') {
      query.unreadCount = { $gt: 0 };
    } else if (status === 'read') {
      query.unreadCount = 0;
    }

    // Get users with pagination
    const users = await User.find(query)
      .sort({ lastMessage: -1 })
      .skip(skip)
      .limit(limit)
      .select('-messages') // Exclude full messages for performance
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Transform data for frontend
    const transformedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      messageCount: user.messageCount,
      unreadCount: user.unreadCount,
      lastMessage: user.lastMessage,
      lastMessagePreview: user.lastMessagePreview,
      createdAt: user.createdAt
    }));

    return NextResponse.json({
      success: true,
      data: {
        users: transformedUsers,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update user read status
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const { id, action, originalUnreadCount } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'mark-read') {
      // Mark ALL messages as read
      user.messages.forEach((message: any) => {
        message.isRead = true;
      });
      user.unreadCount = 0;
      
      await user.save();
      
      return NextResponse.json({
        success: true,
        data: {
          unreadCount: 0,
          message: 'All messages marked as read'
        }
      });
      
    } else if (action === 'mark-unread') {
      // Sort messages by latest first (newest at the top)
      const sortedMessages = [...user.messages].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      let messagesToMarkUnread = 0;
      
      if (originalUnreadCount && originalUnreadCount > 0) {
        // Use the original unread count if provided
        messagesToMarkUnread = Math.min(originalUnreadCount, user.messages.length);
      } else {
        // If no original count, use a smart default
        if (user.unreadCount === 0) {
          // If all are read, mark 25% of messages as unread (minimum 1)
          messagesToMarkUnread = Math.max(1, Math.ceil(user.messages.length * 0.25));
        } else {
          // If some are already unread, double the unread count (but don't exceed total messages)
          messagesToMarkUnread = Math.min(user.unreadCount * 2, user.messages.length);
        }
      }
      
      
      // Mark the specified number of most recent messages as unread
      let markedCount = 0;
      for (const message of sortedMessages) {
        if (markedCount < messagesToMarkUnread) {
          message.isRead = false;
          markedCount++;
        } else {
          // Ensure the rest are marked as read
          message.isRead = true;
        }
      }
      
      user.unreadCount = markedCount;
      await user.save();
      
      return NextResponse.json({
        success: true,
        data: {
          unreadCount: markedCount,
          message: `${markedCount} messages marked as unread`
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Update read status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}