
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ExternalLink,
  Github,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { Project, Category } from '@/types';
import { toast } from 'react-hot-toast';

interface ProjectsResponse {
  success: boolean;
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export default function ProjectsPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    category: 'all',
    status: 'all',
    featured: 'all',
    search: '',
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', filters.page.toString());
      params.append('limit', filters.limit.toString());
      
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.featured !== 'all') params.append('featured', filters.featured);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/admin/projects?${params}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result: ProjectsResponse = await response.json();

      if (result.success) {
        setProjects(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      toast.error('Failed to fetch projects. Please try again.');
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result: CategoriesResponse = await response.json();

      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories. Please try again.');
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  // Handle delete project - UPDATED WITH DEBUGGING
  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete the project "${projectTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(projectId);
    try {
      
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
          toast.success('Project deteted successfully!');
        // Remove the project from the local state immediately for better UX
        setProjects(prev => prev.filter(proj => proj._id !== projectId));
        // Also update pagination total
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
          toast.error('Failed to delete project. Please try again.');
          console.error(' Delete project error:', result.error);
        // Refresh the list to ensure we have the latest data
        fetchProjects();
      }
    } catch (error) {
      toast.error('Failed to delete project. Please try again.');
      console.error(' Delete project error:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Pagination controls
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleFilterChange('page', i)}
          className={`px-3 py-1 rounded ${
            pagination.page === i
              ? 'bg-primary text-bgLight'
              : 'bg-input text-textLight hover:bg-border'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-textLight">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} projects
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFilterChange('page', pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-3 py-1 rounded bg-input text-textLight hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {pages}
          <button
            onClick={() => handleFilterChange('page', pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-3 py-1 rounded bg-input text-textLight hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">Projects</h1>
          <p className="mt-2 text-textLight text-style">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors mt-4 sm:mt-0 text-style"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-bgLight border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Featured
            </label>
            <select
              value={filters.featured}
              onChange={(e) => handleFilterChange('featured', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
            >
              <option value="all">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-bgLight border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-textLight text-lg mb-4">No projects found</div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
            >
              <Plus className="h-4 w-4" />
              <span>Create Your First Project</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-input border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-headingLight uppercase tracking-wider text-style">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-input/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-textLight" />
                          )}
                        </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-semibold text-headingLight truncate heading-style">
                                {project.title}
                              </h3>
                              {project.featured && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-greenType/10 text-greenType text-style">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-textLight line-clamp-1 text-style w-80">
                              {project.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              {project.projectUrl && (
                                <a
                                  href={project.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-xs text-textLight hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  <span>Live</span>
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-xs text-textLight hover:text-headingLight transition-colors"
                                >
                                  <Github className="h-3 w-3" />
                                  <span>Code</span>
                                </a>
                              )}
                              <Link
                                href={`/portfolio/${project.slug}`}
                                target="_blank"
                                className="flex items-center space-x-1 text-xs text-textLight hover:text-accent transition-colors"
                              >
                                <Eye className="h-3 w-3" />
                                <span>View</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {project.categories && project.categories.length > 0 ? (
                          project.categories.length === 1 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary text-style">
                              {typeof project.categories[0] === 'object' ? project.categories[0].name : 'Loading...'}
                            </span>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary text-style">
                                {typeof project.categories[0] === 'object' ? project.categories[0].name : 'Loading...'}
                              </span>
                              <span className="text-xs text-textLight">
                                +{project.categories.length - 1}
                              </span>
                            </div>
                          )
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 text-style">
                            Uncategorized
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-style ${
                            project.status === 'published'
                              ? 'bg-greenType/10 text-greenType'
                              : project.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-redType/10 text-redType'
                          }`}
                        >
                          {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-textLight text-style">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(project.completionDate)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/projects/edit/${project._id}`}
                            className="p-2 text-textLight hover:text-primary transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project._id, project.title)}
                            disabled={deleteLoading === project._id}
                            className="p-2 text-textLight hover:text-redType transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deleteLoading === project._id ? (
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

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-border">
                {renderPagination()}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}