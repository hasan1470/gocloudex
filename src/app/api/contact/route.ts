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

    if (user) {
      // Existing customer - update email fields
      user.emailCount += 1;
      user.emailUnreadCount += 1;
      user.lastEmailSubject = subject;
      user.lastEmailMessage = message.substring(0, 100) + (message.length > 100 ? '...' : '');
      user.lastEmailDate = new Date();
    } else {
      // Create new customer - generate password
      password = generatePassword();
      
      user = new User({
        name,
        email,
        password,
        emailCount: 1,
        emailUnreadCount: 1,
        lastEmailSubject: subject,
        lastEmailMessage: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        lastEmailDate: new Date(),
        chatCount: 0,
        chatUnreadCount: 0
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
        existingPassword: isNewCustomer ? password : undefined,
        source: 'contact'
      });

      console.log('Contact form email result:', emailResult);
    } catch (emailError) {
      console.error('Contact form email sending failed:', emailError);
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

// Helper function to generate password
function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}