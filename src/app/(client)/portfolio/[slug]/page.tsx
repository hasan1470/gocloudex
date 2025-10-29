

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar,
  Code,
  CheckCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Project, Category } from '@/types';
import Image from 'next/image';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params.slug as string;

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
  
  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  // Find project by slug
  const project = portfolioProjects.find(p => p.slug === projectSlug);

  // Get categories for project
  const getProjectCategories = () => {
    if (!project?.categories || project.categories.length === 0) {
      return [];
    }
    
    return project.categories.map(cat => {
      if (typeof cat === 'object') {
        return cat;
      } else {
        return portfolioCategories.find(c => c._id === cat);
      }
    }).filter(Boolean) as Category[];
  };

  // Get related projects (projects that share at least one category)
  const getRelatedProjects = () => {
    if (!project) return [];
    
    const projectCategories = getProjectCategories();
    const projectCategoryIds = projectCategories.map(cat => cat._id);
    
    return portfolioProjects
      .filter(p => 
        p._id !== project._id && 
        p.categories?.some(cat => {
          const categoryId = typeof cat === 'object' ? cat._id : cat;
          return projectCategoryIds.includes(categoryId);
        })
      )
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-textLight text-style">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-headingLight mb-4 heading-style">Project not found</h1>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-primary hover:text-hoverLinkLight text-style"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const projectCategories = getProjectCategories();
  const relatedProjects = getRelatedProjects();

  return (
    <div className="bg-bgLight min-h-screen">
      {/* Back Navigation */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-textLight hover:text-headingLight transition-colors text-style"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Project Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Image */}
            <div className="relative">
              <div className="w-full h-80 md:h-130 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-[object-position] duration-2000 ease-in-out hover:object-bottom"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-all duration-200 transform hover:-translate-y-0.5 text-style"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-bgLight text-headingLight border border-border rounded-lg hover:bg-input transition-all duration-200 transform hover:-translate-y-0.5 text-style"
                  >
                    <Github className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">

              {/* Featured */}
              {project.featured && (
              <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-greenType/10 text-greenType border border-greenType/20 text-style">
                    Featured
                  </span>
                  </div>
                )}
              
              {/* Categories - Updated for multiple categories */}
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <span 
                    key={category._id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary text-style"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-headingLight heading-style">
                {project.title}
              </h1>
              
              <p className="text-xl text-textLight leading-relaxed text-style">
                {project.description}
              </p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-textLight text-style">Completed</div>
                    <div className="font-medium text-headingLight text-style">
                      {new Date(project.completionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm text-textLight text-style">Technologies</div>
                    <div className="font-medium text-headingLight text-style">
                      {project.technologies.length} used
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-headingLight mb-8 heading-style">Technologies Used</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-input border border-border rounded-lg hover:shadow-md transition-shadow text-style"
              >
                <Code className="h-5 w-5 text-primary" />
                <span className="text-headingLight font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      {(project.projectOverview || project.keyFeatures?.length > 0) && (
        <section className="py-16 bg-gradient-to-br from-input to-bgLight border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-headingLight mb-8 heading-style">Project Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Project Overview */}
              {project.projectOverview && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-headingLight heading-style">Project Overview</h3>
                  <div 
                    className="prose prose-lg max-w-none text-textLight leading-relaxed text-style"
                    dangerouslySetInnerHTML={{ __html: project.projectOverview }}
                  />
                </div>
              )}
              
              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-headingLight heading-style">Key Features</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {project.keyFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-input border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <CheckCircle className="h-5 w-5 text-greenType mt-0.5 flex-shrink-0" />
                        <span className="text-headingLight text-style">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-headingLight heading-style">Related Projects</h2>
              <Link
                href="/portfolio"
                className="text-primary hover:text-hoverLinkLight text-style"
              >
                View all projects
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => {
                const relatedProjectCategories = relatedProject.categories?.map(cat => {
                  if (typeof cat === 'object') return cat;
                  return portfolioCategories.find(c => c._id === cat);
                }).filter(Boolean) as Category[];

                return (
                  <Link
                    key={relatedProject._id}
                    href={`/portfolio/${relatedProject.slug}`}
                    className="group bg-bgLight border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {relatedProject.image ? (
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          width={200}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-textLight text-sm text-style">Project Image</div>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-headingLight group-hover:text-primary transition-colors mb-2 heading-style">
                      {relatedProject.title}
                    </h3>
                    
                    <p className="text-textLight text-sm line-clamp-2 mb-3 text-style">
                      {relatedProject.description}
                    </p>
                    
                    {/* Related Project Categories */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {relatedProjectCategories.slice(0, 2).map((category) => (
                        <span 
                          key={category._id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary text-style"
                        >
                          {category.name}
                        </span>
                      ))}
                      {relatedProjectCategories.length > 2 && (
                        <span className="text-xs text-textLight">
                          +{relatedProjectCategories.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-textLight text-style">
                        {relatedProject.technologies.slice(0, 2).join(', ')}
                        {relatedProject.technologies.length > 2 && '...'}
                      </span>
                      <ExternalLink className="h-4 w-4 text-textLight group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-bgDark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-headingDark sm:text-4xl heading-style">
            Like What You See?
          </h2>
          <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
            Let&apos;s work together to bring your next project to life with the same level of quality and attention to detail.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}