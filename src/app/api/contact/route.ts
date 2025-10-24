import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import Message from '@/models/Message';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name,
        email,
        messageCount: 1,
        unreadCount: 1,
        lastMessageAt: new Date(),
      });
    } else {
      // Update user's message count and unread count
      user.messageCount += 1;
      user.unreadCount += 1;
      user.lastMessageAt = new Date();
      await user.save();
    }

    // Create message
    const newMessage = await Message.create({
      user: user._id,
      name,
      email,
      subject,
      message,
      isRead: false,
      isReply: false,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        data: {
          messageId: newMessage._id,
          userId: user._id
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}