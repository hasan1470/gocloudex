import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Search, 
  TrendingUp, 
  BarChart3,
  Target,
  Zap,
  Users,
  Globe,
  Shield,
  MessageCircle,
  Star,
  ArrowUpRight
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Keyword Research',
    description: 'Comprehensive keyword analysis to target high-intent search terms that drive qualified traffic.',
    color: 'text-blue-500'
  },
  {
    icon: TrendingUp,
    title: 'Technical SEO',
    description: 'Website optimization for speed, mobile-friendliness, and search engine crawling efficiency.',
    color: 'text-green-500'
  },
  {
    icon: Target,
    title: 'On-Page Optimization',
    description: 'Strategic optimization of content, meta tags, and structure for maximum search visibility.',
    color: 'text-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Detailed tracking and reporting to measure ROI and identify growth opportunities.',
    color: 'text-orange-500'
  },
  {
    icon: Users,
    title: 'Content Strategy',
    description: 'Data-driven content planning that addresses user intent and builds topical authority.',
    color: 'text-red-500'
  },
  {
    icon: Globe,
    title: 'Local SEO',
    description: 'Optimization for local search results and Google Business Profile management.',
    color: 'text-indigo-500'
  }
];

const seoProcess = [
  {
    step: '01',
    title: 'SEO Audit & Analysis',
    description: 'Comprehensive website analysis to identify technical issues and growth opportunities.',
    metrics: ['Technical Health Score', 'Keyword Gap Analysis', 'Competitor Insights'],
    icon: Shield
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: 'Custom SEO strategy tailored to your business goals and target audience.',
    metrics: ['Keyword Strategy', 'Content Roadmap', 'Technical Plan'],
    icon: Target
  },
  {
    step: '03',
    title: 'Implementation & Optimization',
    description: 'Technical implementation and ongoing optimization based on performance data.',
    metrics: ['On-page Optimization', 'Technical Fixes', 'Content Creation'],
    icon: Zap
  },
  {
    step: '04',
    title: 'Monitoring & Growth',
    description: 'Continuous monitoring, reporting, and strategy refinement for sustained growth.',
    metrics: ['Performance Tracking', 'Monthly Reporting', 'Strategy Updates'],
    icon: TrendingUp
  }
];

const pricingPlans = [
  {
    name: 'Starter SEO',
    price: '$499',
    period: '/month',
    description: 'Perfect for small businesses starting with SEO',
    features: [
      'Technical SEO Audit',
      'Keyword Research (50 keywords)',
      'On-page Optimization',
      'Monthly Performance Report',
      'Google Analytics Setup',
      'Basic Content Recommendations',
      'Email Support'
    ],
    recommended: false
  },
  {
    name: 'Professional SEO',
    price: '$899',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Comprehensive SEO Audit',
      'Keyword Research (150 keywords)',
      'Full On-page Optimization',
      'Weekly Performance Reports',
      'Competitor Analysis',
      'Content Strategy',
      'Local SEO Optimization',
      'Priority Support'
    ],
    recommended: true
  },
  {
    name: 'Enterprise SEO',
    price: '$1,499',
    period: '/month',
    description: 'For established businesses needing maximum results',
    features: [
      'Enterprise SEO Audit',
      'Keyword Research (300+ keywords)',
      'Advanced Technical SEO',
      'Daily Monitoring',
      'Comprehensive Competitor Analysis',
      'Custom Content Strategy',
      'International SEO',
      'Dedicated Account Manager',
      '24/7 Priority Support'
    ],
    recommended: false
  }
];

const results = [
  {
    metric: '85%',
    description: 'Average organic traffic increase within 6 months'
  },
  {
    metric: '3.2x',
    description: 'More qualified leads from organic search'
  },
  {
    metric: '60%',
    description: 'Reduction in cost-per-acquisition'
  },
  {
    metric: '95%',
    description: 'Client retention rate'
  }
];

const tools = [
  'Google Search Console', 'Google Analytics', 'Ahrefs', 'SEMrush', 'Screaming Frog',
  'Google PageSpeed', 'GTmetrix', 'Google Business Profile', 'Google Tag Manager'
];

export default function SEOServicePage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500/10 via-green-500/5 to-purple-500/10 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Proven Results</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  SEO Services
                </span>
                <span className="block text-headingLight mt-2">That Drive Growth</span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                Get found by customers actively searching for your products or services. 
                Our data-driven SEO strategies deliver sustainable organic growth and 
                measurable business results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Get SEO Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* Search Results Mockup */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Search Bar */}
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Search className="h-5 w-5 text-gray-400" />
                        <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2">
                          <div className="text-sm text-gray-600">best [your industry] services near me</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Search Results */}
                    <div className="p-4 space-y-4">
                      {/* Featured Snippet */}
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <div className="flex items-start space-x-2 mb-2">
                          <div className="w-20 h-4 bg-blue-500 rounded-full"></div>
                          <div className="text-xs text-blue-600 px-2 py-1 bg-blue-100 rounded">Featured</div>
                        </div>
                        <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                        <div className="w-2/3 h-3 bg-gray-400 rounded"></div>
                      </div>
                      
                      {/* Organic Results */}
                      {[1, 2].map((item) => (
                        <div key={item} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <div className="w-32 h-3 bg-gray-300 rounded"></div>
                          </div>
                          <div className="w-3/4 h-4 bg-blue-600 rounded"></div>
                          <div className="w-full h-3 bg-gray-400 rounded"></div>
                          <div className="w-2/3 h-3 bg-gray-400 rounded"></div>
                        </div>
                      ))}
                      
                      {/* Local Pack */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div className="w-24 h-3 bg-gray-600 rounded"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="text-center">
                              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                              <div className="w-16 h-2 bg-gray-400 rounded mx-auto mb-1"></div>
                              <div className="w-12 h-2 bg-gray-300 rounded mx-auto"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Results Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">#1</div>
                      <div className="text-xs text-green-700">Google Ranking</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">+235%</div>
                      <div className="text-xs text-blue-700">Organic Traffic</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Proven SEO Results
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Our data-driven approach delivers measurable business outcomes
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-headingLight heading-style">{result.metric}</div>
                <div className="text-textLight mt-2 text-style">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Comprehensive SEO Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              End-to-end SEO solutions that cover every aspect of search engine optimization
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

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our SEO Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A systematic approach that delivers sustainable, long-term results
            </p>
          </div>
          <div className="mt-20 space-y-12">
            {seoProcess.map((step, index) => {
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {step.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="bg-bgLight border border-border rounded-lg p-4 text-center">
                          <div className="text-sm font-semibold text-headingLight text-style">{metric}</div>
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

      {/* Tools Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Professional SEO Tools
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We use industry-leading tools to deliver accurate data and insights
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <BarChart3 className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
              SEO Service Packages
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              Choose the plan that matches your business goals and budget
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
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-headingLight heading-style">{plan.price}</span>
                    <span className="text-textLight text-style ml-2">{plan.period}</span>
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
              Need a custom enterprise SEO solution?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized proposal
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Ready to Dominate Search Results?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto text-style">
            Let's develop an SEO strategy that drives sustainable organic growth for your business.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Get Free SEO Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Pricing Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add missing MapPin component
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);