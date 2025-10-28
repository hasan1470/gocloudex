import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { handleCustomerEmail } from '@/lib/email';

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

    // Find existing user
    let user = await User.findOne({ email });
    const isNewCustomer = !user;
    
    let password = '';
    let existingPassword = '';

    if (user) {
      // Existing customer - use their existing password
      existingPassword = user.password;
      
      // Update existing user
      user.messageCount += 1;
      user.unreadCount += 1;
      user.lastMessage = new Date();
      user.lastMessagePreview = message.substring(0, 100) + (message.length > 100 ? '...' : '');
      user.messages.push({
        subject,
        message,
        isRead: false,
        createdAt: new Date()
      });
    } else {
      // Create new customer - generate password
      password = generatePassword();
      
      user = new User({
        name,
        email,
        password,
        messageCount: 1,
        unreadCount: 1,
        lastMessage: new Date(),
        lastMessagePreview: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        messages: [{
          subject,
          message,
          isRead: false,
          createdAt: new Date()
        }]
      });
    }

    await user.save();

    // Send appropriate emails based on customer status
    try {
      const emailResult = await handleCustomerEmail({
        name,
        email,
        subject,
        message,
        isNewCustomer,
        existingPassword: existingPassword || user.password
      });

      console.log('Email result:', emailResult);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: isNewCustomer 
          ? 'Message sent successfully! Check your email for account details.'
          : 'Message sent successfully! We\'ll get back to you soon.',
        data: {
          userId: user._id,
          isNewCustomer,
          hasAccount: true
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

// Helper function to generate password (moved here to avoid import issues)
function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}