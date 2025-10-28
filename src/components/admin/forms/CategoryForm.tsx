'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { Category } from '@/types';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  category?: Category;
  isEditing?: boolean;
}

interface CategoryFormData {
  name: string;
  description: string;
}

export default function CategoryForm({ category, isEditing = false }: CategoryFormProps) {

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || '',
    description: category?.description || '',
  });

  // Handle form input changes
  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    setLoading(true);

    try {
      const url = isEditing && category 
        ? `/api/admin/categories/${category._id}`
        : '/api/admin/categories';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/categories');
        toast.success(`Category ${isEditing ? 'updated' : 'created'} successfully`);
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} category: ${result.error || 'Unknown error'}`);
        console.error('Category form error:', result.error);
      }
    } catch (error) {
      toast.error(`An error occurred while ${isEditing ? 'updating' : 'creating'} the category.`);
      console.error('Category form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-style"
                placeholder="Describe this category..."
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="px-6 py-3 border border-border text-textLight rounded-lg hover:bg-input transition-colors text-style"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-style"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditing ? 'Update Category' : 'Create Category'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}