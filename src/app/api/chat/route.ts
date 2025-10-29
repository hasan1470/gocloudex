import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '6ca5bc34a15ae62ac4a4abccb5c5177d7802e7d44b3ab47467d79a3e92462d0791161dd8';

// Helper function to verify token
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
};

// Helper function to authenticate request
const authenticateRequest = (request: NextRequest) => {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { error: 'Authentication required', status: 401 };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return { error: 'Invalid or expired token', status: 401 };
  }

  return { user: decoded };
};

// GET - Get chat history for authenticated user
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate request
    const authResult = authenticateRequest(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Verify the requested email matches the token email for security
    if (email && email !== user.email) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Get user with chats
    const userData = await User.findOne({ email: user.email }).select('chats name email lastChatDate lastChatMessage chatUnreadCount chatCount');
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Sort chats by creation date (oldest first for proper display)
    const sortedChats = userData.chats.sort((a: any, b: any) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: {
        messages: sortedChats,
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          lastChatDate: userData.lastChatDate,
          lastChatMessage: userData.lastChatMessage,
          chatCount: userData.chatCount,
          chatUnreadCount: userData.chatUnreadCount
        }
      }
    });

  } catch (error) {
    console.error('Get chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Send chat message
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate request
    const authResult = authenticateRequest(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid message is required' },
        { status: 400 }
      );
    }

    const messageText = message.trim();

    // Find user
    const userData = await User.findOne({ email: user.email });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create new chat message
    const newChat = {
      message: messageText,
      sender: 'user',
      isRead: false,
      createdAt: new Date()
    };

    userData.chats.push(newChat);

    // Update user counters and last message info
    userData.chatCount += 1;
    userData.chatUnreadCount += 1;
    userData.lastChatMessage = messageText;
    userData.lastChatDate = new Date();

    await userData.save();

    // Get the saved message with ID
    const savedMessage = userData.chats[userData.chats.length - 1];

    return NextResponse.json({
      success: true,
      data: {
        message: {
          id: savedMessage._id.toString(),
          message: savedMessage.message,
          sender: savedMessage.sender,
          isRead: savedMessage.isRead,
          createdAt: savedMessage.createdAt
        },
        user: {
          id: userData._id,
          chatCount: userData.chatCount,
          chatUnreadCount: userData.chatUnreadCount
        }
      }
    });

  } catch (error) {
    console.error('Send chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update chat status (mark as read, etc.)
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate request
    const authResult = authenticateRequest(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { action } = await request.json();

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    const userData = await User.findOne({ email: user.email });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'mark-read') {
      // Mark all user messages as read
      let markedCount = 0;
      userData.chats.forEach((chat: any) => {
        if (chat.sender === 'admin' && !chat.isRead) {
          chat.isRead = true;
          markedCount++;
        }
      });

      userData.chatUnreadCount = Math.max(0, userData.chatUnreadCount - markedCount);

      await userData.save();

      return NextResponse.json({
        success: true,
        data: {
          message: `${markedCount} messages marked as read`,
          chatUnreadCount: userData.chatUnreadCount
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

// DELETE - Delete chat messages (optional feature)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate request
    const authResult = authenticateRequest(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { messageId } = await request.json();

    const userData = await User.findOne({ email: user.email });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (messageId) {
      // Delete specific message
      const initialLength = userData.chats.length;
      userData.chats = userData.chats.filter((chat: any) => chat._id.toString() !== messageId);
      
      if (userData.chats.length === initialLength) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }

      // Recalculate counters
      userData.chatCount = userData.chats.length;
      userData.chatUnreadCount = userData.chats.filter((chat: any) => 
        chat.sender === 'admin' && !chat.isRead
      ).length;

      // Update last message info
      if (userData.chats.length > 0) {
        const lastChat = userData.chats[userData.chats.length - 1];
        userData.lastChatMessage = lastChat.message;
        userData.lastChatDate = lastChat.createdAt;
      } else {
        userData.lastChatMessage = '';
        userData.lastChatDate = new Date();
      }

      await userData.save();

      return NextResponse.json({
        success: true,
        data: {
          message: 'Message deleted successfully',
          chatCount: userData.chatCount,
          chatUnreadCount: userData.chatUnreadCount
        }
      });
    } else {
      // Delete all messages
      const deletedCount = userData.chats.length;
      
      userData.chats = [];
      userData.chatCount = 0;
      userData.chatUnreadCount = 0;
      userData.lastChatMessage = '';
      userData.lastChatDate = new Date();

      await userData.save();

      return NextResponse.json({
        success: true,
        data: {
          message: `All ${deletedCount} messages deleted successfully`,
          chatCount: 0,
          chatUnreadCount: 0
        }
      });
    }

  } catch (error) {
    console.error('Delete chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}