'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Eye,
  Filter,
  X,
  Search,
  Calendar
} from 'lucide-react';
import { Project, Category } from '@/types';
import Image from 'next/image';


export default function PortfolioClient() {

      const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get initial values from URL
  const initialCategory = searchParams.get('category') || 'all';
  const initialTech = searchParams.get('tech') || '';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedTech, setSelectedTech] = useState(initialTech);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [portfolioCategories, setPortfolioCategories] = useState<Category[]>([]);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/client/projects/`);
      const result = await response.json();
      if (result.success) {
        setPortfolioProjects(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/client/categories/`);
      const result = await response.json();
      if (result.success) {
        setPortfolioCategories(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    
    if (selectedTech) {
      params.set('tech', selectedTech);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/portfolio${newUrl}`, { scroll: false });
  }, [activeCategory, selectedTech, searchQuery, router]);

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter(project => {
      // Category filter - updated for multiple categories
      const categoryMatch = activeCategory === 'all' || 
        project.categories?.some(cat => {
          const category = typeof cat === 'object' ? cat : portfolioCategories.find(c => c._id === cat);
          return category?.slug === activeCategory;
        });
      
      // Technology filter
      const techMatch = !selectedTech || project.technologies.includes(selectedTech);
      
      // Search filter - updated for multiple categories
      const searchMatch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        // Search by category names
        project.categories?.some(cat => {
          const category = typeof cat === 'object' ? cat : portfolioCategories.find(c => c._id === cat);
          return category?.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
      
      return categoryMatch && techMatch && searchMatch;
    });
  }, [portfolioProjects, portfolioCategories, activeCategory, selectedTech, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedTech('');
    setSearchQuery('');
  };

  // Get available technologies for current category
  const availableTechnologies = useMemo(() => {
    const categoryProjects = activeCategory === 'all' 
      ? portfolioProjects 
      : portfolioProjects.filter(p => {
          // Match by category slug in multiple categories
          return p.categories?.some(cat => {
            const category = typeof cat === 'object' ? cat : portfolioCategories.find(c => c._id === cat);
            return category?.slug === activeCategory;
          });
        });
    
    return Array.from(
      new Set(categoryProjects.flatMap(p => p.technologies))
    ).sort();
  }, [portfolioProjects, portfolioCategories, activeCategory]);

  // Get category names for display
  const getCategoryNames = (project: Project) => {
    if (!project.categories || project.categories.length === 0) {
      return ['Uncategorized'];
    }

    return project.categories.map(cat => {
      if (typeof cat === 'object') {
        return cat.name;
      } else {
        const category = portfolioCategories.find(c => c._id === cat);
        return category?.name || 'Unknown';
      }
    });
  };

  // Check if project has a specific category
  const projectHasCategory = (project: Project, categorySlug: string) => {
    return project.categories?.some(cat => {
      const category = typeof cat === 'object' ? cat : portfolioCategories.find(c => c._id === cat);
      return category?.slug === categorySlug;
    });
  };

  // Render categories for a project
  const renderProjectCategories = (project: Project) => {
    const categoryNames = getCategoryNames(project);
    
    if (categoryNames.length === 0) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 text-style">
          Uncategorized
        </span>
      );
    }

    // Show first category and +count if there are more
    if (categoryNames.length > 1) {
      return (
        <div className="flex items-center space-x-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary text-style">
            {categoryNames[0]}
          </span>
          <span className="text-xs text-textLight">
            +{categoryNames.length - 1}
          </span>
        </div>
      );
    }

    // Single category
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary text-style">
        {categoryNames[0]}
      </span>
    );
  };

  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>
          <p className="mt-6 text-xl text-textLight leading-relaxed max-w-3xl mx-auto text-style">
            Explore our latest projects and see how we&apos;ve helped businesses 
            transform their ideas into successful digital solutions.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-bgLight border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-textLight" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by title, description, technology, or category..."
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-bgLight placeholder-textLight focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-textLight hover:text-headingLight" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center space-x-2 w-full px-6 py-3 border border-border rounded-lg bg-bgLight hover:bg-input transition-colors text-style justify-center"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {(activeCategory !== 'all' || selectedTech) && (
                  <span className="bg-primary text-bgLight text-xs px-2 py-1 rounded-full">
                    {[activeCategory !== 'all', selectedTech].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <div className={`
            ${showFilters ? 'block' : 'hidden'} 
            lg:block mt-6
          `}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-textLight mb-3 text-style">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-style
                      ${activeCategory === 'all'
                        ? 'bg-primary text-bgLight shadow-lg transform -translate-y-0.5'
                        : 'bg-bgLight text-textLight border border-border hover:bg-input hover:text-headingLight hover:-translate-y-0.5'
                      }
                    `}
                  >
                    All
                  </button>
                  {portfolioCategories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setActiveCategory(category.slug)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-style
                        ${activeCategory === category.slug
                          ? 'bg-primary text-bgLight shadow-lg transform -translate-y-0.5'
                          : 'bg-bgLight text-textLight border border-border hover:bg-input hover:text-headingLight hover:-translate-y-0.5'
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              <div className="lg:w-64">
                <h3 className="text-sm font-medium text-textLight mb-3 text-style">Technologies</h3>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-bgLight text-textLight focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-style"
                >
                  <option value="">All Technologies</option>
                  {availableTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters & Reset */}
            {(activeCategory !== 'all' || selectedTech || searchQuery) && (
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-textLight text-style">
                  <span>Active filters:</span>
                  {activeCategory !== 'all' && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      {portfolioCategories.find(cat => cat.slug === activeCategory)?.name || activeCategory}
                    </span>
                  )}
                  {selectedTech && (
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                      {selectedTech}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-greenType/10 text-greenType px-2 py-1 rounded text-xs">
                      Search: "{searchQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={resetFilters}
                  className="text-sm text-textLight hover:text-headingLight transition-colors text-style"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-6 text-center">
            <p className="text-textLight text-style">
              Showing {filteredProjects.length} of {portfolioProjects.length} projects
              {activeCategory !== 'all' && ` in ${portfolioCategories.find(cat => cat.slug === activeCategory)?.name || activeCategory}`}
              {selectedTech && ` using ${selectedTech}`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-textLight text-style">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-textLight text-lg mb-4 text-style">
                No projects found matching your criteria.
              </div>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="group bg-bgLight rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Image 
                        src={project.image} 
                        width={400} 
                        height={192} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Overlay with Links */}
                    <div className="absolute inset-0 bg-bgDark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary text-bgLight rounded-full hover:bg-primary-dark transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-bgLight text-headingLight rounded-full hover:bg-input transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="p-3 bg-accent text-bgLight rounded-full hover:bg-accent/80 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-greenType/10 text-greenType border border-greenType/20 text-style">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Completion Date */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-bgDark/80 text-textLight px-2 py-1 rounded text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(project.completionDate).toLocaleString('default', {
                            month: 'short', // e.g. Jan, Feb, Mar
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-headingLight group-hover:text-primary transition-colors heading-style">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-textLight line-clamp-3 mb-4 text-style">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-1 text-xs bg-input text-textLight rounded-md text-style"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs bg-input text-textLight rounded-md text-style">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Categories - Updated for multiple categories */}
                    <div className="mb-4">
                      {renderProjectCategories(project)}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center text-sm text-primary hover:text-hoverLinkLight font-medium transition-colors text-style"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      
                      <div className="flex space-x-2">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-textLight hover:text-primary transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-textLight hover:text-headingLight transition-colors"
                            title="Source Code"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgDark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
            Have a Project in Mind?
          </h2>
          <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
            Let&apos;s discuss how we can bring your ideas to life with our expertise and creativity.
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
  

}
