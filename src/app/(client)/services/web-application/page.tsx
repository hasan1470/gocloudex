import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Database,
  Shield,
  Zap,
  Users,
  BarChart3,
  Cloud,
  GitBranch,
  MessageCircle,
  Star,
  Cpu,
  Workflow
} from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored web applications built from scratch to meet your specific business requirements.',
    color: 'text-blue-500'
  },
  {
    icon: Database,
    title: 'Scalable Architecture',
    description: 'Robust backend systems designed to handle growth and increasing user demands.',
    color: 'text-green-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with encryption, authentication, and compliance built-in.',
    color: 'text-red-500'
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Lightning-fast applications optimized for speed and seamless user experience.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed around user workflows and business processes.',
    color: 'text-purple-500'
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'Built for the cloud with auto-scaling, reliability, and global availability.',
    color: 'text-indigo-500'
  }
];

const applicationTypes = [
  {
    name: 'CRM Systems',
    description: 'Customer relationship management platforms',
    features: ['Lead Management', 'Sales Pipeline', 'Customer Database', 'Reporting'],
    complexity: 'Medium to High',
    timeline: '8-16 weeks'
  },
  {
    name: 'SaaS Platforms',
    description: 'Software as a Service applications',
    features: ['Multi-tenant Architecture', 'Subscription Billing', 'User Management', 'Analytics'],
    complexity: 'High',
    timeline: '12-24 weeks'
  },
  {
    name: 'Internal Tools',
    description: 'Business process automation systems',
    features: ['Workflow Automation', 'Data Management', 'Reporting Dashboards', 'Integration'],
    complexity: 'Medium',
    timeline: '6-12 weeks'
  }
];

const techStack = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    icon: Code
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    icon: Database
  },
  {
    category: 'Cloud & DevOps',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    icon: Cloud
  },
  {
    category: 'APIs & Integration',
    technologies: ['REST APIs', 'GraphQL', 'WebSocket', 'Third-party APIs'],
    icon: GitBranch
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'Comprehensive requirements gathering, user stories, and technical architecture planning.',
    icon: MessageCircle,
    deliverables: ['Requirements Document', 'Technical Specs', 'Project Timeline', 'Architecture Plan']
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'User interface design, user experience mapping, and interactive prototyping.',
    icon: Users,
    deliverables: ['Wireframes', 'Mockups', 'Interactive Prototype', 'Design System']
  },
  {
    step: '03',
    title: 'Development',
    description: 'Agile development with sprints, regular demos, and continuous integration.',
    icon: Code,
    deliverables: ['Frontend Development', 'Backend Development', 'API Development', 'Database Design']
  },
  {
    step: '04',
    title: 'Testing & Deployment',
    description: 'Comprehensive testing, quality assurance, and production deployment.',
    icon: Shield,
    deliverables: ['Quality Assurance', 'Performance Testing', 'Security Audit', 'Production Launch']
  }
];

const pricingPlans = [
  {
    name: 'MVP Application',
    price: '$12,999',
    description: 'Perfect for validating your application idea',
    features: [
      'Basic Features Only',
      'Single Platform (Web)',
      'Basic UI/UX Design',
      'Standard Backend',
      '3 Months Support',
      'Basic Security',
      'Documentation',
      'Source Code Delivery'
    ],
    recommended: false
  },
  {
    name: 'Business Application',
    price: '$24,999',
    description: 'Ideal for established businesses',
    features: [
      'Advanced Features',
      'Web & Mobile Responsive',
      'Custom UI/UX Design',
      'Scalable Backend',
      '6 Months Support',
      'Advanced Security',
      'Admin Dashboard',
      'API Development',
      'Third-party Integrations'
    ],
    recommended: true
  },
  {
    name: 'Enterprise Platform',
    price: '$49,999',
    description: 'For complex, scalable business platforms',
    features: [
      'Complete Feature Set',
      'Multi-platform Support',
      'Premium UI/UX Design',
      'Enterprise Architecture',
      '12 Months Support',
      'Enterprise Security',
      'Custom Integrations',
      'Advanced Analytics',
      'Dedicated Team',
      'Ongoing Maintenance'
    ],
    recommended: false
  }
];

const caseStudies = [
  {
    title: 'E-commerce Management Platform',
    description: 'Custom platform handling 10,000+ daily orders with real-time inventory and analytics.',
    metrics: '75% faster order processing',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    title: 'Healthcare SaaS Application',
    description: 'HIPAA-compliant patient management system with telemedicine integration.',
    metrics: '50% reduction in admin work',
    tech: ['Next.js', 'Python', 'MongoDB', 'Azure']
  },
  {
    title: 'Financial Dashboard',
    description: 'Real-time financial analytics platform with automated reporting and forecasting.',
    metrics: '90% faster reporting',
    tech: ['TypeScript', 'NestJS', 'MySQL', 'Google Cloud']
  }
];

export default function WebApplicationPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Custom Software Solutions</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Web Application
                </span>
                <span className="block text-headingLight mt-2">Development</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-textLight leading-relaxed text-style">
                Build powerful, scalable web applications that transform your business operations. 
                From SaaS platforms to internal tools, we create custom software solutions 
                that drive efficiency and growth.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* Application Architecture Diagram */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    {/* Architecture Layers */}
                    <div className="space-y-4">
                      {/* Frontend Layer */}
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600 mb-2">Frontend Layer</div>
                        <div className="flex justify-center space-x-2">
                          {['UI Components', 'User Interface', 'Client Logic'].map((item, index) => (
                            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-xs font-medium">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* API Layer */}
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600 mb-2">API Layer</div>
                        <div className="flex justify-center space-x-2">
                          {['REST API', 'GraphQL', 'WebSocket'].map((item, index) => (
                            <div key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-xs font-medium">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Backend Layer */}
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600 mb-2">Backend Layer</div>
                        <div className="flex justify-center space-x-2">
                          {['Business Logic', 'Database', 'Authentication'].map((item, index) => (
                            <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-xs font-medium">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Infrastructure Layer */}
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600 mb-2">Infrastructure</div>
                        <div className="flex justify-center space-x-2">
                          {['Cloud Hosting', 'CDN', 'Monitoring'].map((item, index) => (
                            <div key={index} className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-xs font-medium">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tech Stack Preview */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Code className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-blue-700">Modern Stack</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-green-700">Secure & Scalable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Types Section */}
      <section className="py-16 bg-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Types of Web Applications
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We build various types of web applications tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applicationTypes.map((app, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-headingLight mb-4 heading-style">
                  {app.name}
                </h3>
                <p className="text-textLight mb-6 text-style">
                  {app.description}
                </p>
                <div className="space-y-3 mb-6">
                  {app.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-greenType flex-shrink-0" />
                      <span className="text-textLight text-sm text-style">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="bg-input rounded-lg p-3">
                    <p className="text-sm text-textLight text-style">
                      <span className="font-semibold">Complexity:</span> {app.complexity}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700 text-style">
                      <span className="font-semibold">Timeline:</span> {app.timeline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Enterprise-Grade Features
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Built with scalability, security, and performance in mind
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-bgLight p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-white to-gray-50 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-base sm:text-lg font-semibold text-headingLight heading-style">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-textLight leading-relaxed text-style">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Modern Technology Stack
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We use cutting-edge technologies to build robust, maintainable applications
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <div key={index} className="bg-bgLight border border-border rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-headingLight mb-4 heading-style">
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="text-textLight text-sm text-style">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Our Development Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A structured approach that ensures quality, transparency, and successful delivery
            </p>
          </div>
          <div className="mt-20 space-y-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary text-bgLight rounded-xl flex items-center justify-center text-lg font-bold heading-style">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-semibold text-headingLight heading-style">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-textLight leading-relaxed text-style">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <div key={deliverableIndex} className="bg-input border border-border rounded-lg p-4 text-center">
                          <div className="text-sm font-semibold text-headingLight text-style">{deliverable}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Real web applications delivering real business results
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-bgLight border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold text-headingLight mb-3 heading-style">
                  {study.title}
                </h3>
                <p className="text-textLight mb-4 text-style">
                  {study.description}
                </p>
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-700 font-semibold text-style">
                    {study.metrics}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.tech.map((technology, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-input text-textLight rounded text-xs text-style">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingDark sm:text-3xl heading-style">
              Web Application Development Packages
            </h2>
            <p className="mt-4 text-base sm:text-lg text-textDark max-w-2xl mx-auto text-style">
              Comprehensive packages to bring your application idea to life
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-bgLight rounded-2xl border-2 p-8 ${
                  plan.recommended
                    ? 'border-primary shadow-xl scale-105'
                    : 'border-border shadow-sm'
                } transition-all duration-300`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-bgLight px-4 py-1 rounded-full text-sm font-medium text-style">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-headingLight heading-style">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-headingLight heading-style">{plan.price}</span>
                    <span className="text-textLight text-style"> starting from</span>
                  </div>
                  <p className="mt-2 text-textLight text-style">{plan.description}</p>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0" />
                      <span className="text-textLight text-style">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      plan.recommended
                        ? 'bg-primary text-bgLight hover:bg-primary-dark transform hover:-translate-y-1'
                        : 'bg-input text-headingLight hover:bg-border'
                    } text-style`}
                  >
                    Start Development
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-textDark text-style">
              Need a custom enterprise application?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized quote
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl heading-style">
            Ready to Build Your Web Application?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto text-style">
            Let's create a powerful web application that transforms your business operations and drives growth.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}