'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import UserForm from '@/components/admin/forms/UserForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function EditUserPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users?id=${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        if (result.success) {
          setUser(result.data.user);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/admin/users');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-textLight text-style">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-textLight text-style">User not found</p>
          <Link href="/admin/users" className="text-primary hover:underline mt-2 inline-block text-style">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/users"
          className="p-2 hover:bg-input rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-textLight" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-headingLight heading-style">Edit User</h1>
          <p className="text-textLight text-style mt-2">Update user information and credentials</p>
        </div>
      </div>

      {/* User Form */}
      <UserForm user={user} mode="edit" />
    </div>
  );
}