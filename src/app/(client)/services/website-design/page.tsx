import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap, 
  Smartphone,
  Palette,
  Code,
  Shield,
  TrendingUp,
  Star,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Unique, brand-aligned designs that capture your vision and resonate with your audience.',
    color: 'text-purple-500'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Flawless experience across all devices - desktop, tablet, and mobile.',
    color: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Lightning-fast loading times optimized for SEO and user experience.',
    color: 'text-yellow-500'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Semantic, maintainable code that follows industry best practices.',
    color: 'text-green-500'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security measures to protect your website and user data.',
    color: 'text-red-500'
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimized',
    description: 'Search engine friendly structure to help you rank higher in search results.',
    color: 'text-orange-500'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We start by understanding your business, goals, and target audience to create a comprehensive strategy.',
    icon: MessageCircle
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'Our designers create wireframes and mockups for your approval before development begins.',
    icon: Palette
  },
  {
    step: '03',
    title: 'Development',
    description: 'Our developers bring the designs to life with clean, efficient code and modern technologies.',
    icon: Code
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'Rigorous testing across devices and browsers followed by smooth deployment.',
    icon: Zap
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$1,499',
    description: 'Perfect for small businesses and startups',
    features: [
      '5 Custom Designed Pages',
      'Mobile Responsive Design',
      'Contact Form Integration',
      'Basic SEO Setup',
      '1 Month Support',
      '2 Revisions'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: '$2,999',
    description: 'Ideal for growing businesses',
    features: [
      '10 Custom Designed Pages',
      'Advanced Responsive Design',
      'CMS Integration',
      'Advanced SEO Optimization',
      '3 Months Support',
      '5 Revisions',
      'Performance Optimization',
      'Social Media Integration'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '$4,999',
    description: 'For large-scale business needs',
    features: [
      '15+ Custom Designed Pages',
      'Premium Responsive Design',
      'Custom CMS Development',
      'Comprehensive SEO Strategy',
      '6 Months Support',
      'Unlimited Revisions',
      'Advanced Performance',
      'E-commerce Ready',
      'Analytics Integration'
    ],
    recommended: false
  }
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Figma', 'Adobe XD', 'Webflow', 'WordPress', 'Shopify'
];

export default function WebsiteDesignPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Most Popular Service</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Website Design
                </span>
                <span className="block text-headingLight mt-2">That Converts Visitors</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-textLight leading-relaxed text-style">
                We create stunning, responsive websites that not only look amazing but also 
                drive results. From small business sites to complex web applications, we build 
                digital experiences that engage your audience and grow your business.
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
                  href="/portfolio?category=web-design"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-1">
                <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-1 shadow-2xl">
                    <div className="bg-bgLight rounded-xl p-6">
                    {/* Browser Window Mockup */}
                    <div className="bg-gray-800 rounded-t-lg p-3">
                        <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded px-3 py-1">
                            <div className="text-xs text-gray-300 text-center">www.yourbrand.com</div>
                        </div>
                        </div>
                    </div>
                    
                    {/* Website Content Preview */}
                    <div className="bg-white rounded-b-lg p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                        <div className="w-32 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                        <div className="flex space-x-3">
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                            <div className="w-20 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                        </div>
                        </div>
                        
                        {/* Hero Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-4">
                        <div className="w-3/4 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded mb-3"></div>
                        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="flex space-x-3">
                            <div className="w-24 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                            <div className="w-24 h-8 bg-white border border-gray-300 rounded"></div>
                        </div>
                        </div>
                        
                        {/* Features Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="text-center p-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-2"></div>
                            <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                            <div className="w-2/3 h-2 bg-gray-200 rounded mx-auto"></div>
                            </div>
                        ))}
                        </div>
                        
                        {/* Content Sections */}
                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Image/Graphic</div>
                        </div>
                        </div>
                    </div>
                    
                    {/* Mobile Preview */}
                    <div className="absolute -bottom-6 -right-6">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-2 w-32 shadow-2xl">
                        <div className="bg-white rounded-lg p-2">
                            {/* Mobile Header */}
                            <div className="flex justify-between items-center mb-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                            </div>
                            
                            {/* Mobile Content */}
                            <div className="space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                            <div className="w-1/2 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded mt-2"></div>
                            </div>
                            
                            {/* Mobile Navigation */}
                            <div className="flex justify-around mt-4 pt-3 border-t border-gray-200">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="w-5 h-5 bg-gray-300 rounded"></div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
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
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">50+</div>
              <div className="text-textLight mt-2 text-style">Websites Designed</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">98%</div>
              <div className="text-textLight mt-2 text-style">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">24/7</div>
              <div className="text-textLight mt-2 text-style">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">2-4</div>
              <div className="text-textLight mt-2 text-style">Weeks Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Why Our Website Design Stands Out
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We combine beautiful design with technical excellence to create websites 
              that not only look great but perform exceptionally.
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

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Our Design Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A structured approach that ensures your vision becomes reality, on time and on budget.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start space-x-6">
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
                );
              })}
            </div>
            <div className="bg-bgLight border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-headingLight mb-6 heading-style">What You Get</h3>
              <div className="space-y-4">
                {[
                  'Fully responsive website design',
                  'Cross-browser compatibility',
                  'SEO-optimized structure',
                  'Fast loading performance',
                  'Mobile-first approach',
                  'Clean, maintainable code',
                  'Ongoing support & maintenance',
                  'Documentation and training'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-greenType flex-shrink-0" />
                    <span className="text-textLight text-style">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Technologies We Use
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with modern, proven technologies to build fast, secure, and scalable websites.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-input border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Code className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingDark sm:text-3xl heading-style">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-base sm:text-lg text-textDark max-w-2xl mx-auto text-style">
              Choose the plan that fits your needs. All packages include our signature quality and support.
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
                    <span className="text-textLight text-style"> one-time</span>
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
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-textDark text-style">
              Need a custom solution?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized quote
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl heading-style">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-purple-100 max-w-2xl mx-auto text-style">
            Let's discuss your project and create a website that drives results for your business.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio?category=web-design"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}