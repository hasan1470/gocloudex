import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { verifyAdminAuth } from '@/middlewares/authAdmin';

// GET - Fetch chat users or specific user messages
export async function GET(request: NextRequest) {

  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const filter = searchParams.get('filter');

    if (userId) {
      // Get specific user's chat messages
      const user = await User.findById(userId).select('chats name email lastChatDate lastChatMessage chatUnreadCount chatCount');
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Sort messages by creation date
      const sortedMessages = user.chats.sort((a: any, b: any) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return NextResponse.json({
        success: true,
        data: {
          messages: sortedMessages,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            lastChatDate: user.lastChatDate,
            lastChatMessage: user.lastChatMessage,
            chatUnreadCount: user.chatUnreadCount,
            chatCount: user.chatCount
          }
        }
      });
    } else {
      // Get all users with chat activity
      let query: any = {
        $and: [
          { lastChatMessage: { $exists: true, $ne: '' } },
          { chatCount: { $gt: 0 } }
        ]
      };

      if (filter === 'chat') {
        query.$and.push({ chatCount: { $gt: 0 } });
      }

      const users = await User.find(query)
        .sort({ lastChatDate: -1 })
        .select('name email password chatCount chatUnreadCount lastChatDate lastChatMessage createdAt')
        .lean();

      const transformedUsers = users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        lastChatDate: user.lastChatDate || user.createdAt,
        lastChatMessage: user.lastChatMessage || 'No messages yet',
        chatUnreadCount: user.chatUnreadCount || 0,
        chatCount: user.chatCount || 0,
        isOnline: Math.random() > 0.5, // Simulate online status
        lastSeen: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() // Random last seen
      }));

      return NextResponse.json({
        success: true,
        data: {
          users: transformedUsers
        }
      });
    }

  } catch (error) {
    console.error('Admin chats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Send message as admin
export async function POST(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }
    await connectDB();

    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'User ID and message are required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Add admin message
    const newMessage = {
      message,
      sender: 'admin',
      isRead: true,
      createdAt: new Date(),
      type: 'text'
    };

    user.chats.push(newMessage);
    user.chatCount += 1;
    user.lastChatDate = new Date();
    user.lastChatMessage = message;

    await user.save();

    // Get the saved message with ID
    const savedMessage = user.chats[user.chats.length - 1];

    return NextResponse.json({
      success: true,
      data: {
        message: {
          id: savedMessage._id.toString(),
          message: savedMessage.message,
          sender: savedMessage.sender,
          isRead: savedMessage.isRead,
          createdAt: savedMessage.createdAt,
          type: savedMessage.type
        }
      }
    });

  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Mark messages as read or other actions
export async function PATCH(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }
    await connectDB();

    const { userId, action } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'mark-read') {
      // Mark all user messages as read
      user.chats.forEach((chat: any) => {
        if (chat.sender === 'user') {
          chat.isRead = true;
        }
      });
      user.chatUnreadCount = 0;

      await user.save();

      return NextResponse.json({
        success: true,
        data: {
          message: 'All messages marked as read'
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Update chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}