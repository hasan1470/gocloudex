import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { generatePassword, sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, mode } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (mode === 'login' && !password) {
      return NextResponse.json(
        { error: 'Password is required for login' },
        { status: 400 }
      );
    }

    if (mode === 'register' && !name) {
      return NextResponse.json(
        { error: 'Name is required for new registration' },
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
    let isNewUser = false;
    let userPassword = '';

    if (mode === 'login') {
      // Login mode - verify credentials
      if (!user) {
        return NextResponse.json(
          { error: 'No account found with this email. Please register as new user.' },
          { status: 404 }
        );
      }

      if (user.password !== password) {
        return NextResponse.json(
          { error: 'Invalid password. Please check your password or use "New User" to get password via email.' },
          { status: 401 }
        );
      }

      userPassword = user.password;
      
    } else {
      // Register mode - create new or handle existing
      if (!user) {
        // Create new user
        userPassword = generatePassword();
        user = new User({
          name,
          email,
          password: userPassword,
          emailCount: 0,
          emailUnreadCount: 0,
          chatCount: 0,
          chatUnreadCount: 0
        });
        await user.save();
        isNewUser = true;

        // Send welcome email with password
        try {
          await sendWelcomeEmail({
            name,
            email,
            password: userPassword,
            source: 'chat'
          });
          console.log('Welcome email sent to new chat user:', email);
        } catch (emailError) {
          console.error('Failed to send welcome email to chat user:', emailError);
        }

      } else {
        // Existing user trying to register again
        userPassword = user.password;
        
        // Send password reminder email
        try {
          await sendWelcomeEmail({
            name: user.name,
            email: user.email,
            password: userPassword,
            source: 'chat',
            isReminder: true
          });
          console.log('Password reminder sent to existing user:', email);
        } catch (emailError) {
          console.error('Failed to send password reminder:', emailError);
        }

        return NextResponse.json({
          success: true,
          data: {
            isNewUser: false,
            password: userPassword,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            },
            message: 'existing_user'
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isNewUser,
        password: userPassword,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Chat auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}