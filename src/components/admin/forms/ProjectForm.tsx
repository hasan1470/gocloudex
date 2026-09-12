'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  tags: string[];
  walkthrough: string[];
  projectOverview: string;
  imageAlt: string;
  detailWidth: number;
  detailHeight: number;
  kind: 'Independent product' | 'Portfolio demo' | 'Client project';
  role: string;
  challenge: string;
  approach: string;
  note: string;
  credit: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  completionDate: string;
  sortOrder: number;
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [techInput, setTechInput] = useState('');
  const [keyFeatureInput, setKeyFeatureInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFile, setDetailImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeDetailImage, setRemoveDetailImage] = useState(false);
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
    tags: [],
    walkthrough: [],
    projectOverview: '',
    imageAlt: '',
    detailWidth: 1200,
    detailHeight: 675,
    kind: 'Portfolio demo',
    role: 'Design & development',
    challenge: '',
    approach: '',
    note: '',
    credit: '',
    projectUrl: '',
    githubUrl: '',
    featured: false,
    status: 'draft',
    completionDate: new Date().toISOString().split('T')[0],
    sortOrder: 100,
  });

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPublishedProjects();
      setPortfolioProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all unique technologies from projects
  const allTechnologies = useMemo(
    () => Array.from(new Set(portfolioProjects.flatMap(project => project.technologies))).sort(),
    [portfolioProjects],
  );

  // Fetch categories
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
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
  }, [fetchProjects]);

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
        tags: project.tags || [],
        walkthrough: project.walkthrough || [],
        projectOverview: project.projectOverview || '',
        imageAlt: project.imageAlt || '',
        detailWidth: project.detailWidth || 1200,
        detailHeight: project.detailHeight || 675,
        kind: project.kind || 'Portfolio demo',
        role: project.role || 'Design & development',
        challenge: project.challenge || project.description,
        approach: project.approach || '',
        note: project.note || '',
        credit: project.credit || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        status: project.status || 'draft',
        completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        sortOrder: project.sortOrder ?? 100,
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
  }, [allTechnologies, techInput, formData.technologies]);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailImageChange = (file: File | null) => {
    setDetailImageFile(file);
    if (!file) return;
    setRemoveDetailImage(false);
    const objectUrl = URL.createObjectURL(file);
    const preview = new window.Image();
    preview.onload = () => {
      setFormData((previous) => ({
        ...previous,
        detailWidth: preview.naturalWidth,
        detailHeight: preview.naturalHeight,
      }));
      URL.revokeObjectURL(objectUrl);
    };
    preview.onerror = () => URL.revokeObjectURL(objectUrl);
    preview.src = objectUrl;
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
      const token = localStorage.getItem('adminToken');
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
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('walkthrough', JSON.stringify(formData.walkthrough));
      formDataToSend.append('projectOverview', formData.projectOverview);
      formDataToSend.append('imageAlt', formData.imageAlt);
      formDataToSend.append('detailWidth', String(formData.detailWidth));
      formDataToSend.append('detailHeight', String(formData.detailHeight));
      formDataToSend.append('kind', formData.kind);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('challenge', formData.challenge);
      formDataToSend.append('approach', formData.approach);
      formDataToSend.append('note', formData.note);
      formDataToSend.append('credit', formData.credit);
      formDataToSend.append('projectUrl', formData.projectUrl);
      formDataToSend.append('githubUrl', formData.githubUrl);
      formDataToSend.append('featured', formData.featured.toString());
      formDataToSend.append('status', formData.status);
      formDataToSend.append('completionDate', formData.completionDate);
      formDataToSend.append('sortOrder', String(formData.sortOrder));
      formDataToSend.append('removeImage', String(removeImage));
      formDataToSend.append('removeDetailImage', String(removeDetailImage));

      // Append image file if exists
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      if (detailImageFile) {
        formDataToSend.append('detailImage', detailImageFile);
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
        router.refresh();

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

        {/* Case Study Content */}
        <div className="bg-bgLight border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-headingLight mb-6 heading-style">
            Case Study Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Project type</label>
              <select
                value={formData.kind}
                onChange={(e) => handleInputChange('kind', e.target.value as ProjectFormData['kind'])}
                className="w-full px-4 py-3 border border-border rounded-lg bg-bgLight text-style"
              >
                <option value="Portfolio demo">Portfolio demo</option>
                <option value="Independent product">Independent product</option>
                <option value="Client project">Client project</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Our role</label>
              <input
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg text-style"
                placeholder="Website design & development"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">The brief</label>
              <textarea
                value={formData.challenge}
                onChange={(e) => handleInputChange('challenge', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="What problem did this project solve?"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Our approach</label>
              <textarea
                value={formData.approach}
                onChange={(e) => handleInputChange('approach', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="How was the work planned and delivered?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Walkthrough steps</label>
              <textarea
                value={formData.walkthrough.join('\n')}
                onChange={(e) => handleInputChange('walkthrough', e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="One step per line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Filter tags</label>
              <textarea
                value={formData.tags.join('\n')}
                onChange={(e) => handleInputChange('tags', e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="web-apps&#10;ecommerce&#10;react"
              />
              <p className="mt-2 text-xs text-textLight text-style">One tag per line. These power the public portfolio filters.</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Project note</label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="Demo limitations, data behavior, or ownership notes"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Credit</label>
              <textarea
                value={formData.credit}
                onChange={(e) => handleInputChange('credit', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-border rounded-lg resize-y text-style"
                placeholder="Optional starter, collaborator, or source credit"
              />
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

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Portfolio card image</label>
              <SingleImageUpload
                image={imageFile}
                onImageChange={(file) => { setImageFile(file); if (file) setRemoveImage(false); }}
                existingImageUrl={project?.image}
                onRemoveExisting={() => setRemoveImage(true)}
                label="card image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Case-study image</label>
              <SingleImageUpload
                image={detailImageFile}
                onImageChange={handleDetailImageChange}
                existingImageUrl={project?.detailImage}
                onRemoveExisting={() => setRemoveDetailImage(true)}
                label="case-study image"
              />
              <p className="mt-2 text-xs text-textLight text-style">Use the high-resolution screenshot shown on the project detail page.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">Image description</label>
              <input
                value={formData.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg text-style"
                placeholder="Describe the interface for visitors using a screen reader"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-headingLight mb-2 text-style">Image width</label>
                <input type="number" min="1" value={formData.detailWidth} onChange={(e) => handleInputChange('detailWidth', Number(e.target.value))} className="w-full px-4 py-3 border border-border rounded-lg text-style" />
              </div>
              <div>
                <label className="block text-sm font-medium text-headingLight mb-2 text-style">Image height</label>
                <input type="number" min="1" value={formData.detailHeight} onChange={(e) => handleInputChange('detailHeight', Number(e.target.value))} className="w-full px-4 py-3 border border-border rounded-lg text-style" />
              </div>
            </div>
          </div>
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
              <p className="mt-2 text-xs text-textLight text-style">
                Use a public website address. Localhost and admin links are not shown to visitors.
              </p>
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
              <p className="mt-2 text-xs text-textLight text-style">
                Leave this blank when the source repository is not public.
              </p>
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
                onChange={(e) => handleInputChange('status', e.target.value as ProjectFormData['status'])}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Display order
              </label>
              <input
                type="number"
                min="0"
                value={formData.sortOrder}
                onChange={(e) => handleInputChange('sortOrder', Number(e.target.value))}
                className="w-full px-4 py-3 border border-border rounded-lg text-style"
              />
              <p className="mt-2 text-xs text-textLight text-style">Lower numbers appear first.</p>
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
