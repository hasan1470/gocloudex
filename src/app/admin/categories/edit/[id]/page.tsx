
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CategoryForm from '@/components/admin/forms/CategoryForm';
import { Category } from '@/types';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = params.id as string;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/admin/categories/${categoryId}`,{
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }          
      });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Category not found');
          } else {
            setError('Failed to fetch category');
          }
          return;
        }
        
        const result = await response.json();
        
        if (result.success) {
          setCategory(result.data);
        } else {
          setError(result.error || 'Failed to fetch category');
        }
      } catch (error) {
        console.error('Failed to fetch category:', error);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">
            Edit Category
          </h1>
          <p className="mt-2 text-textLight text-style">
            Loading category...
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">
            Error
          </h1>
          <p className="mt-2 text-textLight text-style">
            {error}
          </p>
        </div>
        <div className="text-center py-8">
          <button
            onClick={() => router.push('/admin/categories')}
            className="px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">
            Category Not Found
          </h1>
          <p className="mt-2 text-textLight text-style">
            The category you're looking for doesn't exist.
          </p>
        </div>
        <div className="text-center py-8">
          <button
            onClick={() => router.push('/admin/categories')}
            className="px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-headingLight heading-style">
          Edit Category
        </h1>
        <p className="mt-2 text-textLight text-style">
          Update category details
        </p>
      </div>

      {/* Category Form */}
      <CategoryForm category={category} isEditing={true} />
    </div>
  );
}