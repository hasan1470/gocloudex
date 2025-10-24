'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar,
  Clock,
  Users,
  Code,
  ChevronRight
} from 'lucide-react';
import { portfolioProjects, portfolioCategories } from '@/data/portfolio';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params.slug as string;

  // Find project by slug
  const project = portfolioProjects.find(p => p.slug === projectSlug);

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

  const category = portfolioCategories.find(c => c.id === project.category);
  const relatedProjects = portfolioProjects
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

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
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-textLight text-lg text-style">Project Image</div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-all duration-200 transform hover:-translate-y-0.5 text-style"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
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
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary text-style mb-4">
                  {category?.name || project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-greenType/10 text-greenType border border-greenType/20 text-style ml-2">
                    Featured
                  </span>
                )}
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

      {/* Project Details */}
      <section className="py-16 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-headingLight mb-8 heading-style">Project Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-headingLight heading-style">Overview</h3>
              <div className="space-y-4 text-textLight leading-relaxed text-style">
                <p>
                  This project was designed and developed to address specific business needs 
                  and provide an exceptional user experience. Every aspect was carefully 
                  considered to ensure optimal performance and usability.
                </p>
                <p>
                  The solution incorporates modern development practices and follows 
                  industry standards for code quality, security, and maintainability.
                </p>
                <p>
                  Through careful planning and execution, we delivered a robust application 
                  that meets both current requirements and allows for future scalability.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-headingLight heading-style">Key Features</h3>
              <ul className="space-y-3 text-style">
                {[
                  'Responsive design for all devices',
                  'Optimized performance and fast loading',
                  'Secure authentication and authorization',
                  'Scalable architecture for future growth',
                  'Intuitive user interface and experience',
                  'Comprehensive testing and quality assurance'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-textLight">
                    <ChevronRight className="h-4 w-4 text-greenType mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-bgLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-headingLight heading-style">Related Projects</h2>
              <Link
                href={`/portfolio?category=${project.category}`}
                className="text-primary hover:text-hoverLinkLight text-style"
              >
                View all {category?.name.toLowerCase()} projects
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.slug}`}
                  className="group bg-bgLight border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-textLight text-sm text-style">Project Image</div>
                  </div>
                  <h3 className="font-semibold text-headingLight group-hover:text-primary transition-colors mb-2 heading-style">
                    {relatedProject.title}
                  </h3>
                  <p className="text-textLight text-sm line-clamp-2 mb-3 text-style">
                    {relatedProject.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-textLight text-style">
                      {relatedProject.technologies.slice(0, 2).join(', ')}
                      {relatedProject.technologies.length > 2 && '...'}
                    </span>
                    <ExternalLink className="h-4 w-4 text-textLight group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
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