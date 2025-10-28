'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Key, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserFormProps {
  user?: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  mode: 'create' | 'edit';
}

export default function UserForm({ user, mode }: UserFormProps) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === 'create' ? '/api/admin/users' : `/api/admin/users`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(mode === 'edit' && { id: user?.id }),
          sendEmail: true // Flag to indicate email should be sent
        }),
      });

      const result = await response.json();

      if (result.success) {
        const successMessage = mode === 'create' 
          ? 'User created successfully and welcome email sent!' 
          : 'User updated successfully and email notification sent!';
        
        toast.success(successMessage);
        router.push('/admin/users');
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('User form error:', error);
      toast.error(
        mode === 'create' 
          ? 'Failed to create user' 
          : 'Failed to update user'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Generate random password for new users
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-bgLight border border-border rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b border-border bg-input px-6 py-4">
          <h2 className="text-xl font-semibold text-headingLight heading-style">
            {mode === 'create' ? 'Create New User' : 'Edit User'}
          </h2>
          <p className="text-textLight text-sm mt-1 text-style">
            {mode === 'create' 
              ? 'Add a new user to the system - Welcome email will be sent automatically' 
              : 'Update user information - Email notification will be sent if credentials change'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-headingLight mb-2 text-style">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-headingLight mb-2 text-style">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-headingLight text-style">
                Password *
              </label>
              {mode === 'create' && (
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-sm text-primary hover:text-primary-dark transition-colors text-style"
                >
                  Generate Password
                </button>
              )}
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textLight hover:text-headingLight"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-textLight mt-2 text-style">
              Password must be at least 6 characters long.
              {mode === 'edit' && ' Leave empty to keep current password.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-border text-headingLight rounded-lg hover:bg-input transition-colors text-style"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors text-style"
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === 'create' ? (
                <span>Create User & Send Email</span>
              ) : (
                <span>Update User & Send Email</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}