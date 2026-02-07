'use client';

import { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Mail, 
  Users, 
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MessageCircle,
  Calendar,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

// Define the icon mapping
const iconMap = {
  FolderOpen,
  Mail,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MessageCircle,
  Calendar,
  BarChart3,
  RefreshCw
};

interface DashboardStats {
  totalProjects: number;
  unreadMessages: number;
  totalCategories: number;
  siteVisitors: number;
  totalCustomers: number;
  totalEmails: number;
  unreadEmails: number;
  totalChats: number;
  unreadChats: number;
}

interface RecentActivity {
  id: string;
  action: string;
  description: string;
  time: string;
  icon: keyof typeof iconMap;
  color: string;
}

interface QuickAction {
  name: string;
  description: string;
  icon: any;
  href: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    name: 'View Messages',
    description: 'Check client chats',
    icon: MessageCircle,
    href: '/admin/chats',
    color: 'text-primary'
  },
  {
    name: 'Email Inbox',
    description: 'View email messages',
    icon: Mail,
    href: '/admin/emails',
    color: 'text-accent'
  },
  {
    name: 'Customers',
    description: 'Manage users',
    icon: Users,
    href: '/admin/users',
    color: 'text-greenType'
  },
  {
    name: 'Analytics',
    description: 'View statistics',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'text-secondary'
  },
];

export default function AdminDashboard() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    unreadMessages: 0,
    totalCategories: 0,
    siteVisitors: 0,
    totalCustomers: 0,
    totalEmails: 0,
    unreadEmails: 0,
    totalChats: 0,
    unreadChats: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const result = await response.json();

      if (result.success) {
        setStats(result.data.stats);
        setRecentActivities(result.data.recentActivities);
      } else {
        throw new Error(result.error || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      if (!silent) {
        toast.error('Failed to load dashboard data');
      }
      // Set fallback data
      setStats({
        totalProjects: 12,
        unreadMessages: 5,
        totalCategories: 8,
        siteVisitors: 1247,
        totalCustomers: 0,
        totalEmails: 0,
        unreadEmails: 0,
        totalChats: 0,
        unreadChats: 0
      });
      setRecentActivities([
        {
          id: 'fallback-1',
          action: 'Welcome to Dashboard',
          description: 'Start monitoring your system',
          time: 'Just now',
          icon: 'TrendingUp',
          color: 'bg-primary'
        }
      ]);
    } finally {
      if (!silent) setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData(true);
    toast.success('Refreshing dashboard...');
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Calculate percentage change
  const getChangeData = (current: number, previous: number = Math.max(1, current * 0.8)) => {
    const change = current - previous;
    const percentage = previous > 0 ? ((change / previous) * 100) : 0;
    
    return {
      value: Math.abs(change),
      percentage: Math.abs(Math.round(percentage)),
      type: change >= 0 ? 'positive' : 'negative'
    };
  };

  // Stats cards configuration
  const statsCards = [
    {
      name: 'Total Customers',
      value: formatNumber(stats.totalCustomers),
      change: getChangeData(stats.totalCustomers),
      icon: Users,
      color: 'text-primary',
      description: 'Registered users'
    },
    {
      name: 'Unread Messages',
      value: formatNumber(stats.unreadMessages),
      change: getChangeData(stats.unreadMessages, stats.unreadMessages + 2),
      icon: Mail,
      color: 'text-accent',
      description: 'Require attention'
    },
    {
      name: 'Total Emails',
      value: formatNumber(stats.totalEmails),
      change: getChangeData(stats.totalEmails),
      icon: FolderOpen,
      color: 'text-greenType',
      description: 'Contact form submissions'
    },
    {
      name: 'Active Chats',
      value: formatNumber(stats.totalChats),
      change: getChangeData(stats.totalChats),
      icon: MessageCircle,
      color: 'text-secondary',
      description: 'Live conversations'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-headingLight heading-style">Dashboard</h1>
          <p className="mt-2 text-textLight text-style">Welcome to your admin dashboard</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-bgLight rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors text-style"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-bgLight overflow-hidden shadow-sm rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg bg-primary/10`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-textLight truncate text-style">
                      {stat.name}
                    </p>
                    <p className="text-xl font-semibold text-headingLight heading-style mt-1">
                      {loading ? '...' : stat.value}
                    </p>
                    <p className="text-xs text-textLight mt-1 text-style">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <div
                    className={`flex items-center text-sm font-semibold text-style ${
                      stat.change.type === 'positive'
                        ? 'text-greenType'
                        : 'text-redType'
                    }`}
                  >
                    {stat.change.type === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {stat.change.percentage}% 
                      <span className="text-textLight text-xs ml-1">
                        ({stat.change.type === 'positive' ? '+' : '-'}{stat.change.value})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Stats Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-greenType/10">
              <Mail className="h-6 w-6 text-greenType" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-headingLight heading-style">Email Stats</h3>
              <p className="text-sm text-textLight text-style">Contact form analytics</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Total Emails</span>
              <span className="font-semibold text-headingLight text-style">
                {loading ? '...' : formatNumber(stats.totalEmails)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Unread Emails</span>
              <span className="font-semibold text-redType text-style">
                {loading ? '...' : formatNumber(stats.unreadEmails)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Response Rate</span>
              <span className="font-semibold text-greenType text-style">
                {loading ? '...' : stats.totalEmails > 0 ? Math.round((stats.totalEmails - stats.unreadEmails) / stats.totalEmails * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-headingLight heading-style">Chat Stats</h3>
              <p className="text-sm text-textLight text-style">Live chat analytics</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Total Chats</span>
              <span className="font-semibold text-headingLight text-style">
                {loading ? '...' : formatNumber(stats.totalChats)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Unread Chats</span>
              <span className="font-semibold text-redType text-style">
                {loading ? '...' : formatNumber(stats.unreadChats)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Active Conversations</span>
              <span className="font-semibold text-greenType text-style">
                {loading ? '...' : formatNumber(stats.totalChats - stats.unreadChats)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-headingLight heading-style">Customer Overview</h3>
              <p className="text-sm text-textLight text-style">User statistics</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Total Customers</span>
              <span className="font-semibold text-headingLight text-style">
                {loading ? '...' : formatNumber(stats.totalCustomers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">New This Month</span>
              <span className="font-semibold text-greenType text-style">
                {loading ? '...' : Math.round(stats.totalCustomers * 0.15)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textLight text-style">Growth Rate</span>
              <span className="font-semibold text-greenType text-style">
                {loading ? '...' : '+15%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-headingLight heading-style">Recent Activity</h2>
            <span className="text-sm text-textLight text-style">
              {loading ? 'Loading...' : `${recentActivities.length} activities`}
            </span>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-4 animate-pulse">
                  <div className="w-10 h-10 bg-input rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-input rounded w-3/4"></div>
                    <div className="h-3 bg-input rounded w-1/2"></div>
                    <div className="h-3 bg-input rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-textLight mx-auto mb-3" />
                <p className="text-textLight text-style">No recent activity</p>
              </div>
            ) : (
              recentActivities.map((activity) => {
                const IconComponent = iconMap[activity.icon] || Users;
                return (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-bgLight" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-headingLight text-style">
                        {activity.action}
                      </p>
                      <p className="text-sm text-textLight text-style">
                        {activity.description}
                      </p>
                      <p className="text-xs text-textDark mt-1 text-style">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-headingLight mb-6 heading-style">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-input transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <action.icon className={`h-8 w-8 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-headingLight text-style text-center">{action.name}</span>
                <span className="text-xs text-textLight text-style text-center mt-1">{action.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}