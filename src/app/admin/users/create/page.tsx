'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import UserForm from '@/components/admin/forms/UserForm';

export default function CreateUserPage() {
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
          <h1 className="text-2xl font-semibold text-headingLight heading-style">Create New User</h1>
          <p className="text-textLight text-style mt-2">Add a new user to the system</p>
        </div>
      </div>

      {/* User Form */}
      <UserForm mode="create" />
    </div>
  );
}