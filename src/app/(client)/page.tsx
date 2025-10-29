import Link from 'next/link';
import { 
  ArrowRight, 
  Code, 
  Cloud, 
  Zap, 
  Shield, 
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Users,
  Server,
  Palette,
  Database,
  Layout,
  Cpu,
  Star,
  Quote
} from 'lucide-react';

const features = [
  {
    name: 'Modern Web Development',
    description: 'Built with Next.js, React, and TypeScript for blazing-fast performance and excellent developer experience.',
    icon: Code,
    color: 'text-primary'
  },
  {
    name: 'Cloud Solutions',
    description: 'Leveraging Cloudinary, MongoDB, and modern cloud services for scalable and reliable applications.',
    icon: Cloud,
    color: 'text-accent'
  },
  {
    name: 'Performance Optimized',
    description: 'Every project is optimized for speed, SEO, and user experience with best practices.',
    icon: Zap,
    color: 'text-greenType'
  },
  {
    name: 'Secure & Reliable',
    description: 'Enterprise-grade security and reliability for your applications and data.',
    icon: Shield,
    color: 'text-secondary'
  },
];

const stats = [
  {
    label: 'Projects Completed',
    value: '50+',
    icon: CheckCircle,
    color: 'text-greenType'
  },
  {
    label: 'Happy Clients',
    value: '30+',
    icon: Users,
    color: 'text-primary'
  },
  {
    label: 'Years Experience',
    value: '3+',
    icon: TrendingUp,
    color: 'text-accent'
  },
  {
    label: 'Technologies',
    value: '15+',
    icon: Server,
    color: 'text-secondary'
  },
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 
  'Cloudinary', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel',
  'Prisma', 'WordPress', 'Shopify', 'React Native'
];

// New service categories
const serviceCategories = [
  {
    name: 'Website Platforms',
    description: 'Professional website development on popular platforms',
    icon: Layout,
    color: 'text-blue-600',
    services: [
      {
        name: 'WordPress Development',
        description: 'Custom themes, plugins, and full-site development',
        features: ['Custom Themes', 'Plugin Development', 'WooCommerce', 'Elementor']
      },
      {
        name: 'Shopify Stores',
        description: 'Beautiful, high-converting e-commerce stores',
        features: ['Custom Themes', 'App Integration', 'Payment Setup', 'SEO Optimization']
      },
      {
        name: 'Wix Development',
        description: 'Professional Wix sites with custom functionality',
        features: ['Custom Design', 'API Integration', 'E-commerce', 'Responsive Design']
      }
    ]
  },
  {
    name: 'Modern Frameworks',
    description: 'Cutting-edge web applications with latest technologies',
    icon: Cpu,
    color: 'text-purple-600',
    services: [
      {
        name: 'Next.js Development',
        description: 'Server-side rendering and static site generation',
        features: ['SSR/SSG', 'API Routes', 'Performance', 'SEO Friendly']
      },
      {
        name: 'React Applications',
        description: 'Dynamic and interactive web applications',
        features: ['Component Library', 'State Management', 'UI/UX', 'Progressive Web Apps']
      },
      {
        name: 'React Native Apps',
        description: 'Cross-platform mobile applications',
        features: ['iOS & Android', 'Native Performance', 'Offline Support', 'App Store Deployment']
      }
    ]
  },
  {
    name: 'Design & Styling',
    description: 'Beautiful interfaces with modern design systems',
    icon: Palette,
    color: 'text-pink-600',
    services: [
      {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework for rapid UI development',
        features: ['Responsive Design', 'Custom Components', 'Dark Mode', 'Design Systems']
      },
      {
        name: 'TypeScript',
        description: 'Type-safe JavaScript for better developer experience',
        features: ['Type Safety', 'Better IDE Support', 'Reduced Bugs', 'Scalable Code']
      },
      {
        name: 'Elementor Pro',
        description: 'Advanced page building with Elementor',
        features: ['Custom Widgets', 'Dynamic Content', 'Theme Builder', 'WooCommerce Integration']
      }
    ]
  },
  {
    name: 'Backend & Database',
    description: 'Robust backend solutions and data management',
    icon: Database,
    color: 'text-green-600',
    services: [
      {
        name: 'MongoDB Integration',
        description: 'NoSQL database solutions for modern applications',
        features: ['Schema Design', 'Aggregation', 'Indexing', 'Performance Optimization']
      },
      {
        name: 'Prisma ORM',
        description: 'Next-generation Node.js TypeScript ORM',
        features: ['Type Safety', 'Migrations', 'Relations', 'Database Management']
      },
      {
        name: 'Cloudinary Media',
        description: 'Advanced media management and optimization',
        features: ['Image Optimization', 'Video Processing', 'CDN Delivery', 'AI Features']
      }
    ]
  }
];

// Technology stacks
const techStacks = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'MongoDB', 'Prisma', 'PostgreSQL', 'AWS']
  },
  {
    category: 'Platforms',
    technologies: ['WordPress', 'Shopify', 'Wix', 'WooCommerce', 'Elementor']
  },
  {
    category: 'Mobile',
    technologies: ['React Native', 'Expo', 'iOS', 'Android', 'PWA']
  },
  {
    category: 'Cloud & Media',
    technologies: ['Cloudinary', 'Vercel', 'AWS', 'CDN', 'Serverless']
  }
];

// Client testimonials
const testimonials = [
  {
    name: 'Sarah Chen',
    position: 'CTO, TechInnovate Inc.',
    company: 'Enterprise SaaS Company',
    content: 'GoCloudEx transformed our digital infrastructure. Their cloud solutions improved our performance by 300% and reduced costs by 40%. Truly award-winning work!',
    rating: 5,
    project: 'Cloud Migration & Optimization'
  },
  {
    name: 'Michael Rodriguez',
    position: 'Marketing Director',
    company: 'Global E-commerce Brand',
    content: 'The SEO strategy developed by GoCloudEx took us from page 3 to #1 rankings for our key terms. Their expertise is unmatched in the industry.',
    rating: 5,
    project: 'Enterprise SEO Campaign'
  },
  {
    name: 'Emily Watson',
    position: 'Product Manager',
    company: 'FinTech Startup',
    content: 'Our mobile app developed by GoCloudEx received 4.8-star ratings on both app stores. Their attention to detail and user experience is exceptional.',
    rating: 5,
    project: 'Cross-Platform Mobile App'
  }
];

export default function Home() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium text-style border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span>Now Building Amazing Digital Experiences</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight heading-style">
              <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Cloud-Powered
              </span>
              <span className="block bg-gradient-to-r from-headingLight to-textLight bg-clip-text text-transparent mt-2">
                Digital Solutions
              </span>
            </h1>
            <p className="mt-8 text-xl text-textLight max-w-3xl mx-auto leading-relaxed text-style">
              From WordPress to React, Shopify to Next.js - we build exceptional digital experiences 
              using the perfect technology stack for your business needs.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
              >
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
              >
                Get In Touch
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
              {/* Trust Badges */}
              <div className="mt-8 flex items-center space-x-6 justify-center">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-textLight text-style">5.0 Rating</span>
                </div>
                <div className="text-sm text-textLight text-style">•</div>
                <div className="text-sm text-textLight text-style">80+ Happy Clients</div>
              </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bgLight border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className={`flex justify-center ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-headingLight heading-style">{stat.value}</div>
                  <div className="text-sm text-textLight mt-1 text-style">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Comprehensive Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              End-to-end solutions covering all aspects of modern web and mobile development.
            </p>
          </div>

          <div className="mt-20 space-y-16">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.name} className="relative">
                <div className="flex items-center mb-8">
                  <div className={`flex items-center justify-center w-12 h-12 ${category.color.replace('text', 'bg')}/10 rounded-xl`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-headingLight heading-style">{category.name}</h3>
                    <p className="text-textLight text-style">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <div
                      key={service.name}
                      className="bg-bgLight p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                      <h4 className="text-lg font-semibold text-headingLight heading-style group-hover:text-primary transition-colors">
                        {service.name}
                      </h4>
                      <p className="mt-2 text-textLight text-sm text-style">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <span
                            key={feature}
                            className="inline-flex items-center px-2 py-1 bg-input text-textLight text-xs rounded-md text-style"
                          >
                            <CheckCircle className="h-3 w-3 mr-1 text-greenType" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Technology Stack
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We master a wide range of technologies to deliver the perfect solution for every project.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {techStacks.map((stack, index) => (
              <div
                key={stack.category}
                className="bg-bgLight p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-headingLight heading-style text-center mb-4">
                  {stack.category}
                </h3>
                <div className="space-y-2">
                  {stack.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center justify-between p-3 bg-input rounded-lg hover:bg-input/80 transition-colors"
                    >
                      <span className="text-textLight text-sm font-medium text-style">{tech}</span>
                      <CheckCircle className="h-4 w-4 text-greenType" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Specialization Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Platform Specialization
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Expert development across all major platforms and frameworks.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* WordPress & E-commerce */}
            <div className="space-y-8">
              <div className="flex items-center">
                <Layout className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-headingLight heading-style">WordPress & E-commerce</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">WordPress</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Custom Theme Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Plugin Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Elementor Pro
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">WooCommerce</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Store Setup
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Payment Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Custom Features
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">Shopify</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Theme Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      App Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Store Optimization
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">Wix</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Custom Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      API Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      E-commerce Solutions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modern Development */}
            <div className="space-y-8">
              <div className="flex items-center">
                <Cpu className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-headingLight heading-style">Modern Development</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">React Ecosystem</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Next.js Applications
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      TypeScript
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Tailwind CSS
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">React Native</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Cross-platform Apps
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Native Performance
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      App Store Deployment
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">Backend & Database</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      MongoDB Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Prisma ORM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Cloudinary Media
                    </li>
                  </ul>
                </div>

                <div className="bg-input p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-headingLight heading-style">JavaScript/TypeScript</h4>
                  <ul className="mt-2 space-y-1 text-sm text-textLight">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Full-Stack Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      API Development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-greenType mr-2" />
                      Performance Optimization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Why Choose Our Services?
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We combine cutting-edge technology with proven methodologies to deliver outstanding results.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-bgLight p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className={`h-6 w-6 ${feature.color} group-hover:text-bgLight transition-colors duration-300`} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-headingLight heading-style">{feature.name}</h3>
                <p className="mt-2 text-textLight leading-relaxed text-style">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-headingLight sm:text-5xl heading-style">
              Client Success Stories
            </h2>
            <p className="mt-6 text-xl text-textLight max-w-3xl mx-auto text-style">
              Hear from our satisfied clients about their award-winning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Quote className="h-6 w-6 text-yellow-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-lg text-textLight leading-relaxed mb-6 text-style italic">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-gray-100 pt-6">
                  <div className="font-semibold text-headingLight heading-style">
                    {testimonial.name}
                  </div>
                  <div className="text-textLight text-sm mt-1 text-style">
                    {testimonial.position}
                  </div>
                  <div className="text-textLight text-sm text-style">
                    {testimonial.company}
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {testimonial.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgDark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              Whether you need a WordPress site, React application, or full-stack solution - we have the expertise to deliver.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingDark bg-bgDark border border-border rounded-xl shadow-sm hover:bg-white/5 transition-all duration-200 transform hover:-translate-y-1 text-style"
              >
                View Our Work
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}