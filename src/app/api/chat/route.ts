import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';

// GET - Get chat history
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('chats');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Sort chats by creation date (newest first for display)
    const sortedChats = user.chats.sort((a: any, b: any) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: {
        messages: sortedChats
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

    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Add new chat message
    user.chats.push({
      message,
      sender: 'user',
      isRead: false,
      createdAt: new Date()
    });

    // Update counters
    user.chatCount += 1;
    user.chatUnreadCount += 1;
    user.lastChatMessage = message;

    await user.save();

    return NextResponse.json({
      success: true,
      data: {
        message: 'Chat message sent successfully'
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