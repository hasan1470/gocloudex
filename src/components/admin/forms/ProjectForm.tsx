'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Link as LinkIcon,
  Github,
  Calendar,
  Plus,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Project, Category } from '@/types';
import SingleImageUpload from './SingleImageUpload';
import RichTextEditor from './RichTextEditor';
import toast from 'react-hot-toast';
import { getPublishedProjects } from '@/actions/projects';

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

interface ProjectFormData {
  title: string;
  description: string;
  categories: string[];
  technologies: string[];
  keyFeatures: string[];
  projectOverview: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  completionDate: string;
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [techInput, setTechInput] = useState('');
  const [keyFeatureInput, setKeyFeatureInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showTechSuggestions, setShowTechSuggestions] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [filteredTechSuggestions, setFilteredTechSuggestions] = useState<string[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    categories: [],
    technologies: [],
    keyFeatures: [],
    projectOverview: '',
    projectUrl: '',
    githubUrl: '',
    featured: false,
    status: 'draft',
    completionDate: new Date().toISOString().split('T')[0],
  });

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getPublishedProjects();
      setPortfolioProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(portfolioProjects.flatMap(project => project.technologies))
  ).sort();

  // Fetch categories
  useEffect(() => {
    fetchProjects();
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (project && isEditing) {
      setFormData({
        title: project.title,
        description: project.description,
        categories: project.categories?.map(cat => cat._id) || [],
        technologies: project.technologies || [],
        keyFeatures: project.keyFeatures || [],
        projectOverview: project.projectOverview || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        status: project.status || 'draft',
        completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [project, isEditing]);

  // Filter technology suggestions based on input
  useEffect(() => {
    if (techInput.trim()) {
      const filtered = allTechnologies.filter(tech =>
        tech.toLowerCase().includes(techInput.toLowerCase()) &&
        !formData.technologies.includes(tech)
      );
      setFilteredTechSuggestions(filtered);
      setShowTechSuggestions(filtered.length > 0);
    } else {
      setFilteredTechSuggestions([]);
      setShowTechSuggestions(false);
    }
  }, [techInput, formData.technologies]);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Get selected category names for display
  const selectedCategoryNames = formData.categories.map(catId => {
    const category = categories.find(c => c._id === catId);
    return category?.name || '';
  }).filter(Boolean);

  // Handle form input changes
  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle category selection
  const handleAddCategory = (categoryId: string) => {
    if (!formData.categories.includes(categoryId)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryId]
      }));
    }
    setCategorySearch('');
    setShowCategoryDropdown(false);
  };

  const handleRemoveCategory = (categoryIdToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(id => id !== categoryIdToRemove)
    }));
  };

  // Handle technology input
  const handleAddTechnology = (tech?: string) => {
    const technologyToAdd = tech || techInput.trim();
    if (technologyToAdd && !formData.technologies.includes(technologyToAdd)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technologyToAdd]
      }));
      setTechInput('');
      setShowTechSuggestions(false);
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  // Handle key features
  const handleAddKeyFeature = () => {
    const feature = keyFeatureInput.trim();
    if (feature && !formData.keyFeatures.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, feature]
      }));
      setKeyFeatureInput('');
    }
  };

  const handleRemoveKeyFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter(feature => feature !== featureToRemove)
    }));
  };

  const handleKeyFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyFeature();
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  const handleTechInputChange = (value: string) => {
    setTechInput(value);
  };

  const handleSuggestionClick = (tech: string) => {
    handleAddTechnology(tech);
  };

  const handleTechInputFocus = () => {
    if (techInput.trim() && filteredTechSuggestions.length > 0) {
      setShowTechSuggestions(true);
    }
  };

  const handleTechInputBlur = () => {
    setTimeout(() => {
      setShowTechSuggestions(false);
    }, 200);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing && project
        ? `/api/admin/projects/${project._id}`
        : '/api/admin/projects';

      const formDataToSend = new FormData();

      // Append all form data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('categories', JSON.stringify(formData.categories));
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      formDataToSend.append('keyFeatures', JSON.stringify(formData.keyFeatures));
      formDataToSend.append('projectOverview', formData.projectOverview);
      formDataToSend.append('projectUrl', formData.projectUrl);
      formDataToSend.append('githubUrl', formData.githubUrl);
      formDataToSend.append('featured', formData.featured.toString());
      formDataToSend.append('status', formData.status);
      formDataToSend.append('completionDate', formData.completionDate);

      // Append image file if exists
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          isEditing
            ? 'Project updated successfully!'
            : 'Project created successfully!',
        );
        router.push('/admin/projects');

      } else {
        toast.error(result.error || `Failed to ${isEditing ? 'update' : 'create'} project`);
      }
    } catch (error) {
      console.error('Project form error:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} project`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-style"
                placeholder="Describe your project..."
                required
              />
            </div>

            {/* Categories - Dropdown with Search */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Categories *
              </label>

              {/* Selected Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.categories.map((categoryId) => {
                  const category = categories.find(c => c._id === categoryId);
                  return category ? (
                    <span
                      key={categoryId}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {category.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(categoryId)}
                        className="ml-2 hover:text-redType transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>

              {/* Category Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style bg-bgLight"
                >
                  <span className="text-textLight">
                    {formData.categories.length === 0 ? 'Select categories...' : `${formData.categories.length} category selected`}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-bgLight border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-2 border-b border-border">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          placeholder="Search categories..."
                          className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-style bg-bgLight"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                    {/* Categories List */}
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCategories.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-textLight text-center text-style">
                          No categories found
                        </div>
                      ) : (
                        filteredCategories.map((category) => {
                          const isSelected = formData.categories.includes(category._id);
                          return (
                            <button
                              key={category._id}
                              type="button"
                              onClick={() => handleAddCategory(category._id)}
                              disabled={isSelected}
                              className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-border last:border-b-0 text-style ${isSelected
                                ? 'bg-primary/10 text-primary cursor-not-allowed'
                                : 'text-textLight hover:bg-input hover:text-headingLight'
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{category.name}</span>
                                {isSelected && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {formData.categories.length === 0 && (
                <p className="text-sm text-redType mt-2 text-style">Please select at least one category</p>
              )}
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Project Overview
          </h2>

          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Detailed Project Overview
            </label>
            <RichTextEditor
              value={formData.projectOverview}
              onChange={(value) => handleInputChange('projectOverview', value)}

            />

          </div>
        </div>

        {/* Project Image */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Project Image
          </h2>

          <SingleImageUpload
            image={imageFile}
            onImageChange={setImageFile}
            existingImageUrl={project?.image}
          />
        </div>

        {/* Technologies */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Technologies
          </h2>

          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Technologies Used *
            </label>

            {/* Selected Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="ml-2 hover:text-redType transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Technology Input with Suggestions */}
            <div className="relative">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => handleTechInputChange(e.target.value)}
                    onKeyPress={handleTechKeyPress}
                    onFocus={handleTechInputFocus}
                    onBlur={handleTechInputBlur}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                    placeholder="Type to search technologies..."
                  />

                  {/* Suggestions Dropdown */}
                  {showTechSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-bgLight border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredTechSuggestions.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => handleSuggestionClick(tech)}
                          className="w-full px-4 py-2 text-left text-sm text-textLight hover:bg-input hover:text-headingLight transition-colors first:rounded-t-lg last:rounded-b-lg text-style"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddTechnology()}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-input text-textLight rounded-lg hover:bg-border transition-colors text-style"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Available Technologies Hint */}
              {techInput.length === 0 && (
                <p className="mt-2 text-xs text-textLight text-style">
                  Start typing to see suggestions from {allTechnologies.length} available technologies
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Key Features
          </h2>

          <div>
            <label className="block text-sm font-medium text-headingLight mb-2 text-style">
              Key Features of the Project
            </label>

            {/* Selected Key Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.keyFeatures.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyFeature(feature)}
                    className="ml-2 hover:text-redType transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Key Feature Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={keyFeatureInput}
                onChange={(e) => setKeyFeatureInput(e.target.value)}
                onKeyPress={handleKeyFeatureKeyPress}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="Enter a key feature..."
              />

              <button
                type="button"
                onClick={handleAddKeyFeature}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-input text-textLight rounded-lg hover:bg-border transition-colors text-style"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Links */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Project Links
          </h2>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                <LinkIcon className="h-4 w-4 inline mr-2" />
                Live Project URL
              </label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="https://your-project.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                <Github className="h-4 w-4 inline mr-2" />
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        {/* Project Settings */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Project Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completion Date */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                <Calendar className="h-4 w-4 inline mr-2" />
                Completion Date *
              </label>
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => handleInputChange('completionDate', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as any)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-headingLight text-style">
                Feature this project
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-3 border border-border text-textLight rounded-lg hover:bg-input transition-colors text-style"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || formData.categories.length === 0}
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
                <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}