import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { verifyAdminAuth } from '@/middlewares/authAdmin';

export async function GET(request: NextRequest) {
  try {

    // Verify authentication and admin role
    const authResult = await verifyAdminAuth(request);
    if ('error' in authResult) {
        return authResult.error;
    }

    await connectDB();

    // Get total customers count
    const totalCustomers = await User.countDocuments();

    // Get email statistics - using the fields from your User model
    const emailStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalEmails: { $sum: '$emailCount' },
          unreadEmails: { $sum: '$emailUnreadCount' }
        }
      }
    ]);

    // Get chat statistics - using the fields from your User model
    const chatStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalChats: { $sum: '$chatCount' },
          unreadChats: { $sum: '$chatUnreadCount' }
        }
      }
    ]);

    // Get recent users with any activity (email or chat)
    const recentUsers = await User.find({
      $or: [
        { emailCount: { $gt: 0 } },
        { chatCount: { $gt: 0 } }
      ]
    })
    .sort({ updatedAt: -1 })
    .limit(5)
    .select('name email emailCount chatCount lastEmailDate lastChatDate updatedAt createdAt')
    .lean();

    // Calculate totals from aggregation results
    const totalEmails = emailStats[0]?.totalEmails || 0;
    const unreadEmails = emailStats[0]?.unreadEmails || 0;
    const totalChats = chatStats[0]?.totalChats || 0;
    const unreadChats = chatStats[0]?.unreadChats || 0;
    const totalUnreadMessages = unreadEmails + unreadChats;

    // Prepare stats object
    const stats = {
      totalCustomers,
      totalEmails,
      unreadEmails,
      totalChats,
      unreadChats,
      unreadMessages: totalUnreadMessages,
      totalProjects: 12, // Mock data
      totalCategories: 8, // Mock data
      siteVisitors: 1247 // Mock data
    };

    // Generate recent activities from user data
    const recentActivities = recentUsers.map((user) => {
      const hasEmail = user.emailCount > 0;
      const hasChat = user.chatCount > 0;
      
      let activityType = 'user';
      let description = `${user.name} registered`;
      let icon = 'Users';
      let color = 'bg-primary';
      
      // Determine the most recent activity
      if (hasEmail && hasChat) {
        const emailDate = new Date(user.lastEmailDate || 0);
        const chatDate = new Date(user.lastChatDate || 0);
        activityType = emailDate > chatDate ? 'email' : 'chat';
      } else if (hasEmail) {
        activityType = 'email';
      } else if (hasChat) {
        activityType = 'chat';
      }

      // Set activity details based on type
      switch (activityType) {
        case 'email':
          description = `Email from ${user.name}`;
          icon = 'Mail';
          color = 'bg-greenType';
          break;
        case 'chat':
          description = `Chat with ${user.name}`;
          icon = 'MessageCircle';
          color = 'bg-accent';
          break;
        default:
          description = `New customer: ${user.name}`;
          icon = 'Users';
          color = 'bg-primary';
      }

      // Generate relative time
      const now = new Date();
      const userDate = new Date(user.lastEmailDate || user.lastChatDate || user.updatedAt || user.createdAt);
      const diffHours = Math.floor((now.getTime() - userDate.getTime()) / (1000 * 60 * 60));
      
      let time = '';
      if (diffHours < 1) {
        time = 'Just now';
      } else if (diffHours < 24) {
        time = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        time = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      }

      return {
        id: user._id?.toString() || `activity-${Date.now()}`,
        action: activityType === 'user' ? 'New customer registered' : 
                activityType === 'email' ? 'Email received' : 'Chat message',
        description,
        time,
        icon,
        color
      };
    });

    // Add mock activities if we don't have enough real ones
    const mockActivities = [
      {
        id: 'mock-1',
        action: 'System updated',
        description: 'Chat features enhanced',
        time: '1 day ago',
        icon: 'TrendingUp',
        color: 'bg-secondary'
      },
      {
        id: 'mock-2',
        action: 'New feature',
        description: 'Real-time messaging added',
        time: '2 days ago',
        icon: 'MessageCircle',
        color: 'bg-accent'
      }
    ];

    const allActivities = [...recentActivities, ...mockActivities].slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentActivities: allActivities
      }
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to load dashboard data' 
      },
      { status: 500 }
    );
  }
}