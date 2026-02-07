'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { Category } from '@/types';
import toast from 'react-hot-toast';

import { getAdminCategories, deleteCategory } from '@/actions/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAdminCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle delete category
  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(categoryId);
    try {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        toast.success(`Category "${categoryName}" deleted successfully.`);
        // Remove the category from the local state immediately for better UX
        setCategories(prev => prev.filter(cat => cat._id !== categoryId));
      } else {
        toast.error(result.error || 'Failed to delete category');
      }
    } catch (error) {
      toast.error(`An error occurred while deleting category "${categoryName}".`);
      console.error('Delete category error:', error);
    } finally {
      setDeleteLoading(null);
    }
  };
  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-headingLight heading-style">Categories</h1>
          <p className="mt-2 text-textLight text-style">Manage project categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors mt-4 sm:mt-0 text-style"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-bgLight border border-border rounded-lg p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-headingLight mb-2 text-style">
            Search Categories
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
            />
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-bgLight border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            {categories.length === 0 ? (
              <>
                <FolderOpen className="h-12 w-12 text-textLight mx-auto mb-4" />
                <div className="text-textLight text-lg mb-4">No categories found</div>
                <Link
                  href="/admin/categories/new"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Your First Category</span>
                </Link>
              </>
            ) : (
              <div className="text-textLight text-lg">No categories match your search</div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-input border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-input/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FolderOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-headingLight heading-style">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-textLight text-style max-w-md">
                        {category.description || 'No description'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-input px-2 py-1 rounded text-textLight font-mono">
                        {category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/categories/edit/${category._id}`}
                          className="p-2 text-textLight hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(category._id, category.name)}
                          disabled={deleteLoading === category._id}
                          className="p-2 text-textLight hover:text-redType transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                        >
                          {deleteLoading === category._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-redType"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}