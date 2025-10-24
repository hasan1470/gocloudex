'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  X, 
  Link as LinkIcon,
  Github,
  Calendar,
} from 'lucide-react';
import { Project, Category } from '@/types';
import SingleImageUpload from './SingleImageUpload';
import toast from 'react-hot-toast';

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  completionDate: string;
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [techInput, setTechInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    technologies: [],
    projectUrl: '',
    githubUrl: '',
    featured: false,
    status: 'draft',
    completionDate: new Date().toISOString().split('T')[0],
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
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

  // Populate form if editing
  useEffect(() => {
    if (project && isEditing) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category?._id || '',
        technologies: project.technologies || [],
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        status: project.status || 'draft',
        completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [project, isEditing]);

  // Handle form input changes
  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle technology input
  const handleAddTechnology = () => {
    const tech = techInput.trim();
    if (tech && !formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
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
      formDataToSend.append('category', formData.category);
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="flex space-x-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                placeholder="Add a technology (press Enter)"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-input text-textLight rounded-lg hover:bg-border transition-colors text-style"
              >
                Add
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
                <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}