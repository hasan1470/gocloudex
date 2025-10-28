'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/forms/ProjectForm';
import { Project } from '@/types';

export default function EditProjectPage() {

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectId = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/admin/projects/${projectId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
            
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Project not found');
          } else {
            setError('Failed to fetch project');
          }
          return;
        }
        
        const result = await response.json();
        
        if (result.success) {
          setProject(result.data);
        } else {
          setError(result.error || 'Failed to fetch project');
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">
            Edit Project
          </h1>
          <p className="mt-2 text-textLight text-style">
            Loading project...
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
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-headingLight heading-style">
            Project Not Found
          </h1>
          <p className="mt-2 text-textLight text-style">
            The project you're looking for doesn't exist.
          </p>
        </div>
        <div className="text-center py-8">
          <button
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
          >
            Back to Projects
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
          Edit Project
        </h1>
        <p className="mt-2 text-textLight text-style">
          Update project details and settings
        </p>
      </div>

      {/* Project Form */}
      <ProjectForm project={project} isEditing={true} />
    </div>
  );
}