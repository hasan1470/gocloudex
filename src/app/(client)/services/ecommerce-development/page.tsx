import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  ShoppingCart, 
  CreditCard, 
  Truck,
  Shield,
  BarChart3,
  Smartphone,
  Zap,
  Users,
  Package,
  Code,
  Star,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: ShoppingCart,
    title: 'Online Store',
    description: 'Beautiful, intuitive online stores with seamless shopping experience and easy product management.',
    color: 'text-green-500'
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment gateway integration with PCI compliance and fraud protection.',
    color: 'text-blue-500'
  },
  {
    icon: Truck,
    title: 'Inventory Management',
    description: 'Real-time inventory tracking, stock alerts, and automated order fulfillment.',
    color: 'text-orange-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive sales analytics, customer insights, and business intelligence.',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security, SSL certificates, and GDPR/PCI compliance.',
    color: 'text-red-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Commerce',
    description: 'Mobile-optimized shopping experience with PWA capabilities for app-like performance.',
    color: 'text-indigo-500'
  }
];

const platforms = [
  {
    name: 'Custom React/Next.js',
    description: 'Fully custom solutions built with modern frameworks',
    features: ['Complete customization', 'Best performance', 'Scalable architecture'],
    bestFor: 'Large businesses & startups'
  },
  {
    name: 'Shopify Plus',
    description: 'Enterprise e-commerce with extensive app ecosystem',
    features: ['Quick setup', 'Reliable hosting', '3000+ apps'],
    bestFor: 'Growing brands'
  },
  {
    name: 'WooCommerce',
    description: 'WordPress-based e-commerce with full control',
    features: ['WordPress integration', 'Cost-effective', 'Flexible'],
    bestFor: 'WordPress users'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Strategy & Planning',
    description: 'We analyze your business needs, target audience, and competition to create a winning e-commerce strategy.',
    icon: MessageCircle
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'Our designers create conversion-focused designs that guide users from browsing to checkout.',
    icon: Users
  },
  {
    step: '03',
    title: 'Development & Integration',
    description: 'We build your store with secure payment gateways, inventory systems, and third-party integrations.',
    icon: Code
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'Comprehensive testing across all devices and payment methods followed by smooth deployment.',
    icon: Zap
  }
];

const pricingPlans = [
  {
    name: 'Starter Store',
    price: '$3,999',
    description: 'Perfect for small businesses starting online',
    features: [
      'Up to 50 Products',
      'Basic Design Customization',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing',
      '3 Months Support',
      'Mobile Responsive',
      'Basic SEO Setup'
    ],
    recommended: false
  },
  {
    name: 'Professional Store',
    price: '$6,999',
    description: 'Ideal for growing e-commerce businesses',
    features: [
      'Up to 500 Products',
      'Custom Design & Branding',
      'Multiple Payment Methods',
      'Advanced Inventory',
      'Email Marketing Integration',
      '6 Months Support',
      'PWA Mobile App',
      'Advanced SEO',
      'Analytics Dashboard',
      'CRM Integration'
    ],
    recommended: true
  },
  {
    name: 'Enterprise Solution',
    price: '$12,999',
    description: 'For high-volume e-commerce operations',
    features: [
      'Unlimited Products',
      'Complete Custom Development',
      'International Payments',
      'Multi-warehouse Management',
      'Custom Integrations',
      '12 Months Support',
      'Dedicated Account Manager',
      'Enterprise Security',
      'Custom Reporting',
      'API Development'
    ],
    recommended: false
  }
];

const integrations = [
  'Stripe', 'PayPal', 'Square', 'Authorize.net', 'Shopify Payments',
  'Mailchimp', 'Klaviyo', 'Zapier', 'QuickBooks', 'ShipStation',
  'Google Analytics', 'Facebook Pixel', 'Instagram Shopping'
];

export default function EcommerceDevelopmentPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500/10 via-blue-500/5 to-orange-500/10 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>High-Converting Stores</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  E-commerce
                </span>
                <span className="block text-headingLight mt-2">Development</span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                Build powerful online stores that drive sales and grow your business. 
                From custom marketplaces to Shopify stores, we create e-commerce solutions 
                that convert visitors into loyal customers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Start Your Store
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/portfolio?category=ecommerce"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View E-commerce Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-2 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* E-commerce Store Mockup */}
                  <div className="bg-gray-800 rounded-t-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-700 rounded px-3 py-1">
                        <div className="text-xs text-gray-300 text-center">yourstore.com</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-b-lg p-4">
                    {/* Store Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div className="w-24 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hero Product */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-3">
                      <div className="flex space-x-4">
                        <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="w-3/4 h-5 bg-gray-400 rounded mb-2"></div>
                          <div className="w-16 h-4 bg-green-500 rounded mb-2"></div>
                          <div className="w-20 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="text-center p-2 border border-gray-100 rounded">
                          <div className="w-full h-16 bg-gray-200 rounded mb-2"></div>
                          <div className="w-3/4 h-3 bg-gray-300 rounded mx-auto mb-1"></div>
                          <div className="w-1/2 h-3 bg-gray-400 rounded mx-auto"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Shopping Cart Preview */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="h-4 w-4 text-gray-600" />
                          <div className="text-sm text-gray-600">3 items • $247.00</div>
                        </div>
                        <div className="w-16 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded text-xs text-white flex items-center justify-center">
                          Checkout
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Store Preview */}
                  <div className="absolute -bottom-4 -right-4">
                    <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-2 w-24 shadow-2xl">
                      <div className="bg-white rounded-lg p-2">
                        <div className="flex justify-between items-center mb-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                          <ShoppingCart className="h-3 w-3 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-8 bg-gray-200 rounded"></div>
                          <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                          <div className="w-1/2 h-3 bg-green-500 rounded"></div>
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
              <div className="text-3xl font-bold text-headingLight heading-style">45%</div>
              <div className="text-textLight mt-2 text-style">Average Sales Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-headingLight heading-style">2.1x</div>
              <div className="text-textLight mt-2 text-style">Faster Load Times</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-headingLight heading-style">99.9%</div>
              <div className="text-textLight mt-2 text-style">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-headingLight heading-style">24/7</div>
              <div className="text-textLight mt-2 text-style">E-commerce Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Complete E-commerce Solutions
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Everything you need to run a successful online store, built with scalability and conversion in mind.
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
                  <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">
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

      {/* Platforms Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Choose Your Platform
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with the best e-commerce platforms to match your business needs and budget.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-headingLight mb-4 heading-style">
                  {platform.name}
                </h3>
                <p className="text-textLight mb-6 text-style">
                  {platform.description}
                </p>
                <div className="space-y-3 mb-6">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-greenType flex-shrink-0" />
                      <span className="text-textLight text-sm text-style">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-input rounded-lg p-3">
                  <p className="text-sm text-textLight text-style">
                    <span className="font-semibold">Best for:</span> {platform.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our E-commerce Development Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A proven methodology that delivers successful online stores on time and within budget.
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
              <h3 className="text-2xl font-bold text-headingLight mb-6 heading-style">What You Get</h3>
              <div className="space-y-4">
                {[
                  'Fully functional online store',
                  'Admin dashboard for management',
                  'Secure payment processing',
                  'Inventory and order management',
                  'Customer account system',
                  'Marketing and SEO tools',
                  'Analytics and reporting',
                  'Mobile-responsive design',
                  'Ongoing support and maintenance'
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

      {/* Integrations Section */}
      <section className="py-24 bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Seamless Integrations
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Connect your store with the tools and services you already use.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Package className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
              E-commerce Development Packages
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              All-inclusive packages to get your online store up and running.
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
                  <h3 className="text-2xl font-bold text-headingLight heading-style">{plan.name}</h3>
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
              Need a custom enterprise solution?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized quote
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Ready to Launch Your Online Store?
          </h2>
          <p className="mt-4 text-xl text-green-100 max-w-2xl mx-auto text-style">
            Let's build an e-commerce platform that drives sales and grows your business.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your E-commerce Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio?category=ecommerce"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View E-commerce Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}