

import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Github, 
  Star,
  Users,
  GitBranch,
  Code,
  Heart,
  Globe,
  Zap,
  Shield,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const projects = [
  {
    name: 'NextJS Boilerplate',
    description: 'Production-ready Next.js starter with TypeScript, Tailwind CSS, and authentication.',
    stars: '1.2k',
    forks: '245',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    features: ['Next.js 14', 'Tailwind CSS', 'NextAuth', 'Prisma'],
    githubUrl: 'https://github.com/gocloudex/nextjs-boilerplate',
    demoUrl: 'https://nextjs-starter.gocloudex.com'
  },
  {
    name: 'Cloudinary Manager',
    description: 'React component library for seamless Cloudinary integration and media management.',
    stars: '856',
    forks: '132',
    language: 'JavaScript',
    languageColor: 'bg-yellow-500',
    features: ['React Components', 'Image Optimization', 'Video Support', 'TypeScript'],
    githubUrl: 'https://github.com/gocloudex/cloudinary-manager',
    demoUrl: 'https://cloudinary-demo.gocloudex.com'
  },
  {
    name: 'MongoDB Utilities',
    description: 'Collection of MongoDB utilities, helpers, and best practices for Node.js applications.',
    stars: '623',
    forks: '89',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    features: ['MongoDB Helpers', 'Aggregation Pipelines', 'Performance', 'Type Safety'],
    githubUrl: 'https://github.com/gocloudex/mongodb-utilities',
    demoUrl: 'https://mongodb-utils.gocloudex.com'
  },
  {
    name: 'UI Component Library',
    description: 'Beautiful, accessible React components built with Tailwind CSS and Framer Motion.',
    stars: '1.5k',
    forks: '312',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    features: ['30+ Components', 'Dark Mode', 'Accessible', 'Customizable'],
    githubUrl: 'https://github.com/gocloudex/ui-components',
    demoUrl: 'https://ui.gocloudex.com'
  },
  {
    name: 'API Starter Kit',
    description: 'RESTful API starter with Node.js, Express, MongoDB, and comprehensive testing.',
    stars: '734',
    forks: '156',
    language: 'JavaScript',
    languageColor: 'bg-yellow-500',
    features: ['Express.js', 'JWT Auth', 'Swagger Docs', 'Testing'],
    githubUrl: 'https://github.com/gocloudex/api-starter',
    demoUrl: 'https://api-docs.gocloudex.com'
  },
  {
    name: 'DevOps Tools',
    description: 'Collection of Docker configurations, CI/CD pipelines, and deployment scripts.',
    stars: '542',
    forks: '78',
    language: 'Dockerfile',
    languageColor: 'bg-blue-400',
    features: ['Docker', 'GitHub Actions', 'AWS', 'Monitoring'],
    githubUrl: 'https://github.com/gocloudex/devops-tools',
    demoUrl: 'https://devops.gocloudex.com'
  }
];

const contributions = [
  {
    project: 'Next.js',
    description: 'Performance improvements and bug fixes for the App Router',
    prs: '12',
    impact: 'Core framework enhancements'
  },
  {
    project: 'Tailwind CSS',
    description: 'New utility classes and plugin development',
    prs: '8',
    impact: 'Extended styling capabilities'
  },
  {
    project: 'MongoDB Node Driver',
    description: 'TypeScript definitions and connection pooling improvements',
    prs: '6',
    impact: 'Better developer experience'
  },
  {
    project: 'React Hook Form',
    description: 'Accessibility improvements and performance optimizations',
    prs: '5',
    impact: 'Enhanced form handling'
  }
];

const benefits = [
  {
    icon: Globe,
    title: 'Community Driven',
    description: 'Build better software with feedback and contributions from developers worldwide.',
    color: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'Continuous Improvement',
    description: 'Open source projects evolve faster with collective intelligence and diverse perspectives.',
    color: 'text-yellow-500'
  },
  {
    icon: Shield,
    title: 'Transparent & Secure',
    description: 'Public code review ensures higher security standards and trust in the software.',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Knowledge Sharing',
    description: 'Learn from real-world code and contribute to the growth of the developer community.',
    color: 'text-purple-500'
  }
];

const stats = [
  {
    number: '50+',
    label: 'Open Source Projects'
  },
  {
    number: '5k+',
    label: 'GitHub Stars'
  },
  {
    number: '800+',
    label: 'Contributors'
  },
  {
    number: '2M+',
    label: 'Downloads'
  }
];

const howToContribute = [
  {
    step: '01',
    title: 'Find a Project',
    description: 'Browse our GitHub organization and find a project that interests you.',
    icon: Github
  },
  {
    step: '02',
    title: 'Read the Docs',
    description: 'Check the README and contribution guidelines to understand the project.',
    icon: BookOpen
  },
  {
    step: '03',
    title: 'Make Changes',
    description: 'Fork the repository, make your improvements, and test your changes.',
    icon: Code
  },
  {
    step: '04',
    title: 'Submit PR',
    description: 'Open a pull request with a clear description of your changes.',
    icon: GitBranch
  }
];

export default function OpenSourcePage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-orange-500/10 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Heart className="h-4 w-4" />
                <span>Open Source Love</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Open Source
                </span>
                <span className="block text-headingLight mt-2">By GoCloudEx</span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                We believe in the power of open source. Explore our projects, contribute to our code, 
                and join a community dedicated to building better software together.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/gocloudex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-gray-900 hover:bg-gray-800 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* GitHub Activity Mockup */}
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    {/* GitHub Header */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Github className="h-5 w-5 text-white" />
                        <span className="text-white font-semibold text-sm">gocloudex</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-300 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>5.2k</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitBranch className="h-4 w-4" />
                          <span>1.1k</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Repository List */}
                    <div className="p-4 space-y-3">
                      {projects.slice(0, 3).map((project, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <span className="text-white font-semibold text-sm">{project.name}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3" />
                                <span>{project.stars}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <GitBranch className="h-3 w-3" />
                                <span>{project.forks}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className={`w-3 h-3 rounded-full ${project.languageColor}`}></div>
                              <span className="text-gray-400">{project.language}</span>
                            </div>
                            <div className="text-gray-400">Updated 2 days ago</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Activity Footer */}
                    <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div>📈 24 contributions in the last week</div>
                        <div>👥 12 active contributors</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">50+</div>
                      <div className="text-xs text-purple-700">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <div className="text-lg font-bold text-pink-600">5k+</div>
                      <div className="text-xs text-pink-700">Stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-headingLight heading-style">{stat.number}</div>
                <div className="text-textLight mt-2 text-style">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Why We Love Open Source
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Open source is at the heart of everything we do. Here's why it matters.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-bgLight p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-white to-gray-50 group-hover:scale-110 transition-transform duration-300 mx-auto ${benefit.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-textLight leading-relaxed text-style">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Explore our most popular open source projects and start contributing today.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-bgLight border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="font-semibold text-headingLight heading-style">{project.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-textLight">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch className="h-3 w-3" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-textLight text-sm mb-4 text-style">
                  {project.description}
                </p>
                
                {/* Language */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${project.languageColor}`}></div>
                  <span className="text-textLight text-sm text-style">{project.language}</span>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="inline-block px-2 py-1 text-xs bg-input text-textLight rounded-md text-style"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors text-style"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-primary text-bgLight text-sm rounded-lg hover:bg-primary-dark transition-colors text-style"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="https://github.com/gocloudex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-border bg-bgLight rounded-lg hover:bg-input transition-colors text-style"
            >
              View All Projects on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contributions Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Community Contributions
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We actively contribute to the open source ecosystem and major projects we use.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributions.map((contribution, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-headingLight heading-style">
                    {contribution.project}
                  </h3>
                  <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
                    <GitBranch className="h-3 w-3" />
                    <span>{contribution.prs} PRs</span>
                  </div>
                </div>
                <p className="text-textLight mb-4 text-style">
                  {contribution.description}
                </p>
                <div className="bg-input rounded-lg p-3">
                  <p className="text-sm text-textLight text-style">
                    <span className="font-semibold">Impact:</span> {contribution.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Contribute Section */}
      <section className="py-24 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              How to Contribute
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Ready to contribute? Here's how you can get involved in our open source projects.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToContribute.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary text-bgLight rounded-xl flex items-center justify-center text-lg font-bold heading-style">
                        {step.step}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-headingLight mb-4 heading-style">
                    {step.title}
                  </h3>
                  <p className="text-textLight leading-relaxed text-style">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Contribution Guidelines */}
          <div className="mt-16 bg-bgLight border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-headingLight mb-6 heading-style text-center">
              Contribution Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-style">
              <div className="space-y-4">
                <h4 className="font-semibold text-headingLight">Before Contributing</h4>
                <ul className="space-y-2 text-textLight">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Check existing issues and pull requests</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Read the project's code of conduct</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Ensure your code follows project standards</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-headingLight">Making Contributions</h4>
                <ul className="space-y-2 text-textLight">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Write clear, descriptive commit messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Include tests for new features</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0 mt-0.5" />
                    <span>Update documentation as needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Join Our Open Source Community
          </h2>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto text-style">
            Whether you're fixing a bug, adding a feature, or improving documentation, 
            your contributions make open source better for everyone.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/gocloudex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              <Github className="h-5 w-5 mr-2" />
              Start Contributing
            </a>
            <a
              href="https://github.com/gocloudex/.github"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Read Guidelines
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}