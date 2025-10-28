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
  Globe,
  Server,
  Smartphone,
  ShoppingCart,
  Search,
  Palette,
  MessageCircle,
  Star,
  Award,
  Clock
} from 'lucide-react';

const features = [
  {
    name: 'Modern Web Development',
    description: 'Built with Next.js, React, and TypeScript for blazing-fast performance and excellent developer experience.',
    icon: Code,
    color: 'text-primary'
  },
  {
    name: 'CMS Development',
    description: 'Expert in WordPress, Shopify, Wix, and WooCommerce for flexible, scalable solutions.',
    icon: ShoppingCart,
    color: 'text-accent'
  },
  {
    name: 'Cloud Solutions',
    description: 'Leveraging Cloudinary, MongoDB, and modern cloud services for scalable applications.',
    icon: Cloud,
    color: 'text-greenType'
  },
  {
    name: 'SEO Optimization',
    description: 'Search engine optimized websites that rank higher and attract more organic traffic.',
    icon: Search,
    color: 'text-purple-500'
  },
];

const services = [
  {
    name: 'Website Design',
    description: 'Custom, responsive websites that convert visitors into customers',
    icon: Palette,
    link: '/services/website-design',
    stats: '50+ Projects'
  },
  {
    name: 'E-commerce Development',
    description: 'Online stores with secure payment processing and inventory management',
    icon: ShoppingCart,
    link: '/services/ecommerce-development',
    stats: '30+ Stores'
  },
  {
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    icon: Smartphone,
    link: '/services/mobile-app-development',
    stats: '25+ Apps'
  },
  {
    name: 'SEO Services',
    description: 'Improve your search engine rankings and drive organic traffic',
    icon: Search,
    link: '/services/seo',
    stats: '85% Traffic Increase'
  }
];

const cmsPlatforms = [
  {
    name: 'WordPress',
    description: 'Custom themes, plugins, and full-site development',
    projects: '40+',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Shopify',
    description: 'E-commerce stores with custom functionality',
    projects: '25+',
    color: 'from-green-500 to-green-700'
  },
  {
    name: 'WooCommerce',
    description: 'WordPress e-commerce solutions',
    projects: '20+',
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Wix',
    description: 'Professional websites with advanced customization',
    projects: '15+',
    color: 'from-orange-500 to-orange-700'
  }
];

const stats = [
  {
    label: 'Projects Completed',
    value: '150+',
    icon: Award,
    color: 'text-greenType'
  },
  {
    label: 'Happy Clients',
    value: '80+',
    icon: Users,
    color: 'text-primary'
  },
  {
    label: 'Years Experience',
    value: '5+',
    icon: TrendingUp,
    color: 'text-accent'
  },
  {
    label: 'Support Response',
    value: '< 2 hours',
    icon: Clock,
    color: 'text-purple-500'
  },
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 
  'Cloudinary', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel',
  'WordPress', 'Shopify', 'WooCommerce', 'Wix', 'PHP'
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc',
    content: 'GoCloudEx transformed our online presence. Their attention to detail and technical expertise exceeded our expectations.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    company: 'Global Retail',
    content: 'The e-commerce store they built increased our sales by 200%. Professional team and outstanding results.',
    rating: 5
  },
  {
    name: 'Emily Davis',
    company: 'Creative Agency',
    content: 'Outstanding WordPress development. They delivered exactly what we needed on time and within budget.',
    rating: 5
  }
];

export default function Home() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-blue-500/5 to-accent/10 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span>Transforming Ideas Into Digital Reality</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Cloud-Powered
                </span>
                <span className="block bg-gradient-to-r from-headingLight to-textLight bg-clip-text text-transparent mt-2">
                  Digital Excellence
                </span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                We build exceptional digital experiences using modern technologies and CMS platforms. 
                From custom web applications to WordPress sites and e-commerce stores, we transform 
                your vision into high-performing digital solutions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
                  Get Free Consultation
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex items-center space-x-6">
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

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Platform Icons */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-headingLight">WordPress</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <ShoppingCart className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-headingLight">Shopify</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-headingLight">Next.js</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-headingLight">Mobile Apps</div>
                    </div>
                  </div>
                  
                  {/* Stats Bar */}
                  <div className="mt-6 bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-center">
                    <div className="text-white font-semibold text-style">150+ Successful Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bgLight border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
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

      {/* Services Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Comprehensive digital solutions tailored to drive your business growth and success.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.link}
                className="group bg-bgLight p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-bgLight transition-colors duration-300" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-headingLight group-hover:text-primary transition-colors heading-style">
                  {service.name}
                </h3>
                <p className="mt-2 text-textLight text-sm leading-relaxed text-style">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-primary font-medium text-style">{service.stats}</span>
                  <ArrowUpRight className="h-4 w-4 text-textLight group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CMS Platforms Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              CMS & Platform Expertise
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with all major platforms to deliver the perfect solution for your needs.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-bgLight rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-white font-bold text-lg">{platform.name.charAt(0)}</div>
                </div>
                <h3 className="text-xl font-semibold text-headingLight heading-style">{platform.name}</h3>
                <p className="mt-2 text-textLight text-sm text-style">{platform.description}</p>
                <div className="mt-4 bg-input rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-primary text-style">{platform.projects} Projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Why Choose GoCloudEx?
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

      {/* Technologies Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Technologies We Master
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with modern technologies and CMS platforms to build fast, scalable, and maintainable applications.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center px-4 py-3 bg-bgLight border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <CheckCircle className="h-4 w-4 text-greenType mr-2" />
                <span className="text-textLight font-medium text-style">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Don't just take our word for it - hear from businesses we've helped transform.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-textLight italic text-style">"{testimonial.content}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-headingLight text-style">{testimonial.name}</div>
                  <div className="text-sm text-textLight text-style">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-accent">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto text-style">
            Let's discuss how we can help bring your vision to life with modern technology and expert development.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Our Work
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}