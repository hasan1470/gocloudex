'use client';

import { useState, useEffect } from 'react';
import { Mail, Copy, Check, Eye, EyeOff, Search, Filter, MessageCircle, User, Calendar, RefreshCw, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  messageCount: number;
  unreadCount: number;
  lastMessage: string;
  lastMessagePreview: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalUsers: number;
}

// Track original unread counts
interface UserUnreadState {
  [userId: string]: number;
}

const yourEmailCredentials = {
  email: process.env.NEXT_PUBLIC_EMAIL_USERNAME || 'info@gocloudex.com',
  password: process.env.NEXT_PUBLIC_EMAIL_PASSWORD || '6PzPXeWIOH@Dosa353sdIGo',
  webmailUrl: process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || 'https://mail.hostinger.com',
};

export default function EmailPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [copiedField, setCopiedField] = useState<{type: string, id: string} | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNext: false,
    hasPrev: false
  });
  
  // Track original unread states
  const [originalUnreadCounts, setOriginalUnreadCounts] = useState<UserUnreadState>({});

  // Fetch users from API
  const fetchUsers = async (page: number, limit: number, search: string, status: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status !== 'all' && { status })
      });

      const response = await fetch(`/api/users?${params}`);
      const result = await response.json();

      if (result.success) {
        const fetchedUsers = result.data.users;
        setUsers(fetchedUsers);
        setPagination(result.data.pagination);
        
        // Initialize original unread counts
        const newOriginalCounts: UserUnreadState = {};
        fetchedUsers.forEach((user: User) => {
          newOriginalCounts[user.id] = user.unreadCount;
        });
        setOriginalUnreadCounts(newOriginalCounts);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users when filters change
  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, searchTerm, statusFilter);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  const copyToClipboard = async (text: string, type: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id) {
        setCopiedField({ type, id });
      } else {
        setCopiedField({ type, id: 'admin' });
      }
      toast.success(`${type === 'email' ? 'Email' : 'Password'} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

const toggleReadStatus = async (userId: string) => {
  try {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const action = user.unreadCount > 0 ? 'mark-read' : 'mark-unread';
    
    console.log('Toggling status for user:', userId, 'Action:', action, 'Current unread:', user.unreadCount);

    // Get the original unread count from our state
    const originalUnreadCount = originalUnreadCounts[userId];

const response = await fetch('/api/users', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: userId,
    action: user.unreadCount > 0 ? 'mark-read' : 'mark-unread',
    originalUnreadCount: action === 'mark-unread' ? originalUnreadCount : undefined
  }),
});

    const result = await response.json();

    if (result.success) {
      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              unreadCount: result.data.unreadCount,
            }
          : user
      ));
      
      // Update original unread counts if we're marking as read
      if (action === 'mark-read') {
        setOriginalUnreadCounts(prev => ({
          ...prev,
          [userId]: user.unreadCount // Store the count before marking as read
        }));
      }
      
      toast.success(result.data.message);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Failed to update read status:', error);
    toast.error('Failed to update read status');
  }
};

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  // Format time in 12-hour format with AM/PM
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  // Format date as DD/MM/YYYY
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return `${time} - ${formattedDate}`;
};

  const handleRefresh = () => {
    fetchUsers(currentPage, itemsPerPage, searchTerm, statusFilter);
    toast.success('Refreshing messages...');
  };

  const handleOpenWebmail = () => {
    window.open(yourEmailCredentials.webmailUrl, '_blank');
  };

  // Calculate stats from real data
  const totalCustomers = pagination.totalUsers;
  const totalMessages = users.reduce((sum, user) => sum + user.messageCount, 0);
  const totalUnread = users.reduce((sum, user) => sum + user.unreadCount, 0);
  const activeToday = users.filter(user => 
    new Date(user.lastMessage).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Header with Your Email Credentials */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-headingLight mb-3 heading-style">Your Email Credentials</h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Your Email Credentials */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-bgLight border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-textLight text-sm text-style">Email</p>
                      <p className="text-headingLight font-mono text-sm text-style">{yourEmailCredentials.email}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(yourEmailCredentials.email, 'email')}
                      className="p-2 hover:bg-input rounded-lg transition-colors"
                      title="Copy email"
                    >
                      {copiedField?.type === 'email' && copiedField.id === 'admin' ? (
                        <Check className="h-4 w-4 text-greenType" />
                      ) : (
                        <Copy className="h-4 w-4 text-textLight" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-bgLight border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-textLight text-sm text-style">Password</p>
                      <p className="text-headingLight font-mono text-sm text-style">
                        {showPasswords['admin'] ? yourEmailCredentials.password : '••••••••••'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => togglePasswordVisibility('admin')}
                        className="p-2 hover:bg-input rounded-lg transition-colors"
                        title={showPasswords['admin'] ? 'Hide password' : 'Show password'}
                      >
                        {showPasswords['admin'] ? (
                          <EyeOff className="h-4 w-4 text-textLight" />
                        ) : (
                          <Eye className="h-4 w-4 text-textLight" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(yourEmailCredentials.password, 'password')}
                        className="p-2 hover:bg-input rounded-lg transition-colors"
                        title="Copy password"
                      >
                        {copiedField?.type === 'password' && copiedField.id === 'admin' ? (
                          <Check className="h-4 w-4 text-greenType" />
                        ) : (
                          <Copy className="h-4 w-4 text-textLight" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors text-style"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Loading...' : 'Refresh'}</span>
            </button>
            <button
              onClick={handleOpenWebmail}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-bgLight border border-border text-headingLight rounded-lg hover:bg-input transition-colors text-style"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open Webmail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Total Customers</p>
              <p className="text-2xl font-bold text-headingLight heading-style">{totalCustomers}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Total Messages</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {totalMessages}
              </p>
            </div>
            <div className="w-10 h-10 bg-greenType/10 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-greenType" />
            </div>
          </div>
        </div>
        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Unread Messages</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {totalUnread}
              </p>
            </div>
            <div className="w-10 h-10 bg-redType/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-redType" />
            </div>
          </div>
        </div>
        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Active Today</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {activeToday}
              </p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-bgLight border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-bgLight focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-textLight text-style">
              <Filter className="h-4 w-4" />
              <span>Status:</span>
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as 'all' | 'read' | 'unread');
                  setCurrentPage(1);
                }}
                className="bg-bgLight border border-border rounded px-2 py-1 text-style"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-textLight text-style">
              <span>Show:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-bgLight border border-border rounded px-2 py-1 text-style"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-bgLight border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-border bg-input px-6 py-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-headingLight text-style">Customer Messages</h2>
            {loading && (
              <div className="flex items-center space-x-2 text-sm text-textLight">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-input border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Credentials
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Last Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Messages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-input transition-colors">
                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium text-headingLight text-style">{user.name}</div>
                        <div className="text-textLight text-sm text-style">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Credentials */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {/* Email */}
                      <div className="flex items-center space-x-2">
                        <span className="text-textLight text-sm text-style w-12">Email:</span>
                        <code className="flex-1 bg-input px-2 py-1 rounded text-sm font-mono text-primary text-style">
                          {user.email}
                        </code>
                        <button
                          onClick={() => copyToClipboard(user.email, 'email', user.id)}
                          className="p-1 hover:bg-border rounded transition-colors"
                          title="Copy email"
                        >
                          {copiedField?.type === 'email' && copiedField.id === user.id ? (
                            <Check className="h-4 w-4 text-greenType" />
                          ) : (
                            <Copy className="h-4 w-4 text-textLight" />
                          )}
                        </button>
                      </div>
                      
                      {/* Password */}
                      <div className="flex items-center space-x-2">
                        <span className="text-textLight text-sm text-style w-12">Pass:</span>
                        <code className="flex-1 bg-input px-2 py-1 rounded text-sm font-mono text-primary text-style">
                          {showPasswords[user.id] ? user.password : '••••••••'}
                        </code>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="p-1 hover:bg-border rounded transition-colors"
                            title={showPasswords[user.id] ? 'Hide password' : 'Show password'}
                          >
                            {showPasswords[user.id] ? (
                              <EyeOff className="h-4 w-4 text-textLight" />
                            ) : (
                              <Eye className="h-4 w-4 text-textLight" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(user.password, 'password', user.id)}
                            className="p-1 hover:bg-border rounded transition-colors"
                            title="Copy password"
                          >
                            {copiedField?.type === 'password' && copiedField.id === user.id ? (
                              <Check className="h-4 w-4 text-greenType" />
                            ) : (
                              <Copy className="h-4 w-4 text-textLight" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Last Message */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-textLight text-sm mb-1 line-clamp-2 text-style">
                        {user.lastMessagePreview}
                      </div>
                      <div className="text-textLight text-xs text-style">
                        {formatDate(user.lastMessage)}
                      </div>
                    </div>
                  </td>

                  {/* Message Counts */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Total</div>
                        <div className="font-semibold text-headingLight text-style">{user.messageCount}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-redType/10 rounded-full">
                          <MessageCircle className="h-4 w-4 text-redType" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Unread</div>
                        <div className="font-semibold text-headingLight text-style">{user.unreadCount}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {user.unreadCount > 0 ? (
                        <>
                          <div className="w-3 h-3 bg-redType rounded-full animate-pulse"></div>
                          <span className="text-redType text-sm font-medium text-style">Unread</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-greenType rounded-full"></div>
                          <span className="text-greenType text-sm font-medium text-style">Read</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleReadStatus(user.id)}
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors text-style ${
                        user.unreadCount > 0
                          ? 'bg-redType/10 text-redType hover:bg-redType/20'
                          : 'bg-greenType/10 text-greenType hover:bg-greenType/20'
                      }`}
                    >
                      {user.unreadCount > 0 ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Mark Read</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4" />
                          <span>Mark Unread</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-border bg-input px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-textLight text-style">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, pagination.totalUsers)} of {pagination.totalUsers} customers
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Page Navigation */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={!pagination.hasPrev || loading}
                  className="px-3 py-1 border border-border rounded-lg hover:bg-bgLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-style"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors text-style ${
                        currentPage === pageNum
                          ? 'bg-primary text-bgLight'
                          : 'border border-border hover:bg-bgLight text-headingLight'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={!pagination.hasNext || loading}
                  className="px-3 py-1 border border-border rounded-lg hover:bg-bgLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-style"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-textLight mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-headingLight mb-2 heading-style">
            No customers found
          </h3>
          <p className="text-textLight text-style">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search terms or filters' 
              : 'No customer messages yet'
            }
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && users.length === 0 && (
        <div className="text-center py-12">
          <RefreshCw className="h-12 w-12 text-textLight mx-auto mb-4 animate-spin" />
          <p className="text-textLight text-style">Loading customer messages...</p>
        </div>
      )}
    </div>
  );
}