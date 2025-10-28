import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/email';
import { verifyAdminAuth } from '@/middlewares/authAdmin';

// Define TypeScript interfaces for the user data
interface UserData {
  _id: any;
  name: string;
  email: string;
  password: string;
  emailCount?: number;
  emailUnreadCount?: number;
  chatCount?: number;
  chatUnreadCount?: number;
  lastEmailDate?: Date;
  lastChatDate?: Date;
  createdAt: Date;
}

interface TransformedUser {
  id: string;
  name: string;
  email: string;
  password: string;
  emailCount: number;
  emailUnreadCount: number;
  chatCount: number;
  chatUnreadCount: number;
  lastEmailDate?: Date;
  lastChatDate?: Date;
  createdAt: Date;
}

// GET - Fetch all users with pagination and filtering OR single user by ID
export async function GET(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // If ID is provided, return single user
    if (id) {
      const user = await User.findById(id)
        .select('name email password emailCount emailUnreadCount chatCount chatUnreadCount lastEmailDate lastChatDate createdAt')
        .lean<UserData>();

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const transformedUser: TransformedUser = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        emailCount: user.emailCount || 0,
        emailUnreadCount: user.emailUnreadCount || 0,
        chatCount: user.chatCount || 0,
        chatUnreadCount: user.chatUnreadCount || 0,
        lastEmailDate: user.lastEmailDate,
        lastChatDate: user.lastChatDate,
        createdAt: user.createdAt
      };

      return NextResponse.json({
        success: true,
        data: {
          user: transformedUser
        }
      });
    }

    // Otherwise, return paginated users list
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
    if (status === 'email') {
      query.emailCount = { $gt: 0 };
    } else if (status === 'chat') {
      query.chatCount = { $gt: 0 };
    }

    // Get users with pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name email password emailCount emailUnreadCount chatCount chatUnreadCount lastEmailDate lastChatDate createdAt')
      .lean<UserData[]>();

    // Get total count for pagination
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Transform data for frontend
    const transformedUsers: TransformedUser[] = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      emailCount: user.emailCount || 0,
      emailUnreadCount: user.emailUnreadCount || 0,
      chatCount: user.chatCount || 0,
      chatUnreadCount: user.chatUnreadCount || 0,
      lastEmailDate: user.lastEmailDate,
      lastChatDate: user.lastChatDate,
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
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }
    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {

  // Verify authentication and admin role
  const authResult = await verifyAdminAuth(request);
  if ('error' in authResult) {
      return authResult.error;
  }
  try {
    await connectDB();

    const { id, name, email, password, sendEmail } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get current user data to compare changes
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email already exists for other users
    if (email && email !== currentUser.email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: id } 
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    let hasChanges = false;
    
    if (name && name !== currentUser.name) {
      updateData.name = name;
      hasChanges = true;
    }
    
    if (email && email !== currentUser.email) {
      updateData.email = email;
      hasChanges = true;
    }
    
    if (password && password !== currentUser.password) {
      updateData.password = password;
      hasChanges = true;
    }

    // If no changes, return early
    if (!hasChanges) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: currentUser._id.toString(),
            name: currentUser.name,
            email: currentUser.email,
            password: currentUser.password,
            emailCount: currentUser.emailCount || 0,
            emailUnreadCount: currentUser.emailUnreadCount || 0,
            chatCount: currentUser.chatCount || 0,
            chatUnreadCount: currentUser.chatUnreadCount || 0,
            createdAt: currentUser.createdAt
          }
        },
        message: 'No changes detected'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('name email password emailCount emailUnreadCount chatCount chatUnreadCount createdAt');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Send update email notification if requested and credentials changed
    if (sendEmail && hasChanges) {
      try {
        // Import the email function dynamically to avoid circular dependencies
        const { sendUpdateEmail } = await import('@/lib/email');
        await sendUpdateEmail({
          name: user.name,
          email: user.email,
          password: user.password,
          previousEmail: currentUser.email !== user.email ? currentUser.email : undefined
        });
        console.log('Update notification email sent to:', user.email);
      } catch (emailError) {
        console.error('Failed to send update notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
          emailCount: user.emailCount || 0,
          emailUnreadCount: user.emailUnreadCount || 0,
          chatCount: user.chatCount || 0,
          chatUnreadCount: user.chatUnreadCount || 0,
          createdAt: user.createdAt
        }
      },
      message: 'User updated successfully' + (sendEmail ? ' and email notification sent' : '')
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {

  // Verify authentication and admin role
  const authResult = await verifyAdminAuth(request);
  if ('error' in authResult) {
      return authResult.error;
  }
    await connectDB();

    const { name, email, password, sendEmail } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
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

    const user = new User({
      name,
      email,
      password,
      emailCount: 0,
      emailUnreadCount: 0,
      chatCount: 0,
      chatUnreadCount: 0
    });

    await user.save();

    // Send welcome email for new users
    if (sendEmail) {
      try {
        await sendWelcomeEmail({
          name: user.name,
          email: user.email,
          password: user.password,
          source: 'admin' // Mark as from admin creation
        });
        console.log('Welcome email sent to new user:', user.email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
          emailCount: 0,
          emailUnreadCount: 0,
          chatCount: 0,
          chatUnreadCount: 0,
          createdAt: user.createdAt
        }
      },
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}