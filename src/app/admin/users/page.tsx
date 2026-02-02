'use client';
import { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Check,
  Eye,
  EyeOff,
  Search,
  Filter,
  Mail,
  MessageCircle,
  User,
  Calendar,
  Edit,
  Trash2,
  RefreshCw,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  emailCount: number;
  emailUnreadCount: number;
  chatCount: number;
  chatUnreadCount: number;
  createdAt: string;
  lastEmailDate?: string;
  lastChatDate?: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalUsers: number;
}

import { getAdminUsers, deleteUser } from '@/actions/users';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [copiedField, setCopiedField] = useState<{ type: string, id: string } | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'email' | 'chat'>('all');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getAdminUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter
      });

      if (result.success && result.data) {
        setUsers(result.data.users);
        setPagination(result.data.pagination);
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
    fetchUsers();
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

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const result = await deleteUser(userId);

      if (result.success) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleRefresh = () => {
    fetchUsers();
    toast.success('Refreshing users...');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate stats from real data
  const totalCustomers = pagination.totalUsers;
  const totalEmails = users.reduce((sum, user) => sum + user.emailCount, 0);
  const totalChats = users.reduce((sum, user) => sum + user.chatCount, 0);
  const totalUnreadEmails = users.reduce((sum, user) => sum + user.emailUnreadCount, 0);
  const totalUnreadChats = users.reduce((sum, user) => sum + user.chatUnreadCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">User Management</h1>
          <p className="text-textLight text-style mt-2">Manage all users and their communication history</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/users/create"
            className="inline-flex items-center space-x-2 px-4 py-3 bg-bgLight border border-border text-headingLight rounded-lg hover:bg-input transition-colors disabled:opacity-50 text-style"

          >
            <Plus className="h-5 w-5" />
            <span>Add New User</span>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
            title="Refresh users list"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>

        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Total Users</p>
              <p className="text-2xl font-bold text-headingLight heading-style">{totalCustomers}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Total Emails</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {totalEmails}
              </p>
              <p className="text-xs text-textLight text-style">
                {totalUnreadEmails} unread
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
              <p className="text-textLight text-sm text-style">Total Chats</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {totalChats}
              </p>
              <p className="text-xs text-textLight text-style">
                {totalUnreadChats} unread
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-bgLight border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textLight text-sm text-style">Active Today</p>
              <p className="text-2xl font-bold text-headingLight heading-style">
                {users.filter(user =>
                  new Date(user.lastEmailDate || user.lastChatDate || user.createdAt).toDateString() ===
                  new Date().toDateString()
                ).length}
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-bgLight focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-textLight text-style">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as 'all' | 'email' | 'chat');
                  setCurrentPage(1);
                }}
                className="bg-bgLight border border-border rounded px-2 py-1 text-style"
              >
                <option value="all">All Users</option>
                <option value="email">With Emails</option>
                <option value="chat">With Chats</option>
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
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 hover:bg-input rounded-lg transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-bgLight border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-border bg-input px-6 py-4">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-headingLight text-style">All Users</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style w-12">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  User Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Credentials
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Account Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Email Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style">
                  Chat Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider text-style w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-input transition-colors">
                  {/* Number */}
                  <td className="px-6 py-4 text-textLight text-sm text-style">
                    {((currentPage - 1) * itemsPerPage) + index + 1}
                  </td>

                  {/* User Info */}
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

                  {/* Account Date */}
                  <td className="px-6 py-4">
                    <div className="text-textLight text-sm text-style">
                      {formatDate(user.createdAt)}
                    </div>
                  </td>

                  {/* Email Stats */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-greenType/10 rounded-full">
                          <Mail className="h-4 w-4 text-greenType" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Total</div>
                        <div className="font-semibold text-headingLight text-style">{user.emailCount}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-redType/10 rounded-full">
                          <MessageCircle className="h-4 w-4 text-redType" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Unread</div>
                        <div className="font-semibold text-headingLight text-style">{user.emailUnreadCount}</div>
                      </div>
                    </div>
                  </td>

                  {/* Chat Stats */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-full">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Total</div>
                        <div className="font-semibold text-headingLight text-style">{user.chatCount}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-500/10 rounded-full">
                          <MessageCircle className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="text-xs text-textLight mt-1 text-style">Unread</div>
                        <div className="font-semibold text-headingLight text-style">{user.chatUnreadCount}</div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/users/edit/${user.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="p-2 text-redType hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, pagination.totalUsers)} of {pagination.totalUsers} users
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
                      className={`w-8 h-8 rounded-lg text-sm transition-colors text-style ${currentPage === pageNum
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
          <Users className="h-12 w-12 text-textLight mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-headingLight mb-2 heading-style">
            No users found
          </h3>
          <p className="text-textLight text-style">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search terms or filters'
              : 'No users registered yet'
            }
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && users.length === 0 && (
        <div className="text-center py-12">
          <RefreshCw className="h-12 w-12 text-textLight mx-auto mb-4 animate-spin" />
          <p className="text-textLight text-style">Loading users...</p>
        </div>
      )}
    </div>
  );
}