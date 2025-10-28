import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { verifyAdminAuth } from '@/middlewares/authAdmin';

// GET - Fetch users with pagination and filtering (only those with email activity)
export async function GET(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    // Build query - Only users who have email activity
    let query: any = {
      $and: [
        { lastEmailMessage: { $exists: true, $ne: '' } },
        { lastEmailSubject: { $exists: true, $ne: '' } }
      ]
    };
    
    // Search filter
    if (search) {
      query.$and.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
    }

    // Status filter - using emailUnreadCount for email-specific filtering
    if (status === 'unread') {
      query.$and.push({ emailUnreadCount: { $gt: 0 } });
    } else if (status === 'read') {
      query.$and.push({ emailUnreadCount: 0 });
    }

    // Get users with pagination - sort by lastEmailDate
    const users = await User.find(query)
      .sort({ lastEmailDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('name email password emailCount emailUnreadCount lastEmailSubject lastEmailMessage lastEmailDate createdAt')
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
      emailCount: user.emailCount || 0,
      emailUnreadCount: user.emailUnreadCount || 0,
      lastEmailSubject: user.lastEmailSubject || '',
      lastEmailMessage: user.lastEmailMessage || '',
      lastEmailDate: user.lastEmailDate || user.createdAt,
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

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }

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
      // Mark ALL email messages as read by setting emailUnreadCount to 0
      user.emailUnreadCount = 0;
      
      await user.save();
      
      return NextResponse.json({
        success: true,
        data: {
          unreadCount: 0,
          message: 'All emails marked as read'
        }
      });
      
    } else if (action === 'mark-unread') {
      // Restore to original unread count or use smart default
      let messagesToMarkUnread = 0;
      
      if (originalUnreadCount && originalUnreadCount > 0) {
        // Use the original unread count if provided
        messagesToMarkUnread = Math.min(originalUnreadCount, user.emailCount);
      } else {
        // If no original count, use a smart default
        if (user.emailUnreadCount === 0) {
          // If all are read, mark 25% of emails as unread (minimum 1)
          messagesToMarkUnread = Math.max(1, Math.ceil(user.emailCount * 0.25));
        } else {
          // If some are already unread, double the unread count (but don't exceed total emails)
          messagesToMarkUnread = Math.min(user.emailUnreadCount * 2, user.emailCount);
        }
      }
      
      user.emailUnreadCount = messagesToMarkUnread;
      await user.save();
      
      return NextResponse.json({
        success: true,
        data: {
          unreadCount: messagesToMarkUnread,
          message: `${messagesToMarkUnread} emails marked as unread`
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