import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { generatePassword, sendWelcomeEmail } from '@/lib/email';
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

// POST - Authenticate user (login/register)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, mode } = await request.json();

    // Validate required fields
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
      
    } else {
      // Register mode - create new or handle existing
      if (!user) {
        // Create new user
        const userPassword = generatePassword();
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
          // Don't fail the request if email fails
        }

      } else {
        // Existing user trying to register again - send password reminder
        try {
          await sendWelcomeEmail({
            name: user.name,
            email: user.email,
            password: user.password,
            source: 'chat',
            isReminder: true
          });
          console.log('Password reminder sent to existing user:', email);
        } catch (emailError) {
          console.error('Failed to send password reminder:', emailError);
        }

        // Return success but don't create token - force them to login
        return NextResponse.json({
          success: true,
          data: {
            isNewUser: false,
            message: 'existing_user_please_login',
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          }
        });
      }
    }

    // Create JWT token for authenticated users
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Prepare response data
    const responseData: any = {
      isNewUser,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };

    // Only return password for new users
    if (isNewUser) {
      responseData.password = user.password;
    }

    return NextResponse.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Chat auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Verify token and get user info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid or expired token' 
        },
        { status: 401 }
      );
    }

    // Get fresh user data from database
    await connectDB();
    const user = await User.findById(decoded.userId).select('name email');
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        valid: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Token verification failed' 
      },
      { status: 500 }
    );
  }
}