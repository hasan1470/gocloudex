import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  BarChart3,
  Zap,
  Users,
  DollarSign,
  Smartphone,
  Mail,
  TrendingUp,
  MessageCircle,
  Star,
  Eye,
  MousePointer
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'Reach your ideal customers with advanced demographic, interest, and behavioral targeting.',
    color: 'text-red-500'
  },
  {
    icon: Zap,
    title: 'Real-Time Optimization',
    description: 'Continuous campaign optimization based on performance data to maximize ROI.',
    color: 'text-yellow-500'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Comprehensive tracking and reporting to measure campaign effectiveness and ROI.',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Multi-Channel Strategy',
    description: 'Integrated campaigns across Google, Facebook, Instagram, LinkedIn, and more.',
    color: 'text-green-500'
  },
  {
    icon: DollarSign,
    title: 'Budget Optimization',
    description: 'Smart budget allocation to highest-performing channels and audiences.',
    color: 'text-purple-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Approach',
    description: 'Optimized ad experiences for mobile users across all platforms.',
    color: 'text-indigo-500'
  }
];

const platforms = [
  {
    name: 'Google Ads',
    description: 'Search, Display, and YouTube advertising',
    features: ['Search Network', 'Display Network', 'YouTube Ads', 'Shopping Ads'],
    bestFor: 'High-intent customers',
    budget: 'From $500/month'
  },
  {
    name: 'Facebook & Instagram',
    description: 'Social media advertising across Meta platforms',
    features: ['News Feed Ads', 'Stories Ads', 'Carousel Ads', 'Lead Generation'],
    bestFor: 'Brand awareness & engagement',
    budget: 'From $300/month'
  },
  {
    name: 'LinkedIn Ads',
    description: 'Professional network advertising',
    features: ['Sponsored Content', 'Message Ads', 'Dynamic Ads', 'Account Targeting'],
    bestFor: 'B2B & professional services',
    budget: 'From $1,000/month'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Strategy & Planning',
    description: 'We analyze your business goals, target audience, and competition to create a winning ad strategy.',
    icon: MessageCircle,
    deliverables: ['Audience Analysis', 'Channel Selection', 'Budget Planning', 'KPI Setting']
  },
  {
    step: '02',
    title: 'Campaign Setup',
    description: 'Professional ad creation, landing page optimization, and tracking implementation.',
    icon: Target,
    deliverables: ['Ad Creative', 'Landing Pages', 'Tracking Setup', 'Conversion Tracking']
  },
  {
    step: '03',
    title: 'Launch & Optimize',
    description: 'Campaign launch with continuous monitoring and real-time optimization for maximum performance.',
    icon: Zap,
    deliverables: ['A/B Testing', 'Bid Management', 'Audience Refinement', 'Performance Monitoring']
  },
  {
    step: '04',
    title: 'Analyze & Scale',
    description: 'Detailed performance analysis and strategic scaling of winning campaigns.',
    icon: TrendingUp,
    deliverables: ['ROI Analysis', 'Scale Strategy', 'Monthly Reporting', 'Strategy Refinement']
  }
];

const pricingPlans = [
  {
    name: 'Starter Ads',
    price: '$699',
    period: '/month',
    description: 'Perfect for businesses starting with paid advertising',
    features: [
      '1 Advertising Platform',
      'Basic Ad Creation',
      'Monthly Performance Report',
      'Conversion Tracking',
      'A/B Testing (2 variations)',
      'Email Support',
      'Up to $2,000 Ad Spend'
    ],
    recommended: false
  },
  {
    name: 'Growth Campaigns',
    price: '$1,299',
    period: '/month',
    description: 'Ideal for businesses scaling their advertising efforts',
    features: [
      '2 Advertising Platforms',
      'Professional Ad Creation',
      'Weekly Performance Reports',
      'Advanced Conversion Tracking',
      'A/B Testing (5 variations)',
      'Priority Support',
      'Up to $5,000 Ad Spend',
      'Landing Page Optimization'
    ],
    recommended: true
  },
  {
    name: 'Enterprise Solutions',
    price: '$2,499',
    period: '/month',
    description: 'For businesses needing comprehensive advertising management',
    features: [
      '3+ Advertising Platforms',
      'Premium Ad Creation',
      'Daily Performance Monitoring',
      'Multi-touch Attribution',
      'Unlimited A/B Testing',
      'Dedicated Account Manager',
      'Unlimited Ad Spend',
      'Custom Reporting',
      'Competitor Analysis'
    ],
    recommended: false
  }
];

const results = [
  {
    metric: '4.2x',
    description: 'Average ROI on ad spend'
  },
  {
    metric: '63%',
    description: 'Lower cost per acquisition'
  },
  {
    metric: '285%',
    description: 'Increase in qualified leads'
  },
  {
    metric: '24/7',
    description: 'Campaign monitoring & optimization'
  }
];

const adTypes = [
  'Search Ads', 'Display Ads', 'Video Ads', 'Social Media Ads', 'Shopping Ads',
  'Retargeting Ads', 'Lead Generation Ads', 'App Install Ads', 'Local Service Ads'
];

export default function AdsCampaignPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500/10 via-yellow-500/5 to-blue-500/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Performance-Driven Advertising</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  Ads Campaign
                </span>
                <span className="block text-headingLight mt-2">Management</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-textLight leading-relaxed text-style">
                Drive qualified traffic and conversions with data-driven advertising campaigns. 
                We manage your paid media across all major platforms to deliver measurable 
                business growth and maximum ROI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Launch Campaign
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
              <div className="bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* Advertising Dashboard Mockup */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Dashboard Header */}
                    <div className="bg-gray-800 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white font-semibold">Campaign Dashboard</div>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="text-xs text-gray-300">Live</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Campaign Stats */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">$4,287</div>
                          <div className="text-xs text-gray-600">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">42</div>
                          <div className="text-xs text-gray-600">Leads</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Campaign Performance */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-semibold">Active Campaigns</div>
                        <div className="text-xs text-green-600">+18% ROAS</div>
                      </div>
                      
                      {/* Campaign List */}
                      <div className="space-y-3">
                        {[
                          { name: 'Google Search', budget: '$1,200', status: 'Active' },
                          { name: 'Facebook Prospecting', budget: '$800', status: 'Active' },
                          { name: 'Retargeting', budget: '$400', status: 'Active' }
                        ].map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div>
                                <div className="text-sm font-medium">{campaign.name}</div>
                                <div className="text-xs text-gray-500">{campaign.budget} budget</div>
                              </div>
                            </div>
                            <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                              {campaign.status}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Performance Chart */}
                      <div className="mt-4 bg-gray-50 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs font-medium">Performance Trend</div>
                          <div className="text-xs text-gray-500">Last 7 days</div>
                        </div>
                        <div className="flex items-end space-x-1 h-12">
                          {[4, 7, 6, 8, 10, 12, 15].map((height, index) => (
                            <div
                              key={index}
                              className="flex-1 bg-gradient-to-t from-red-500 to-yellow-500 rounded-t"
                              style={{ height: `${height * 3}px` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ROI Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">4.2x</div>
                      <div className="text-xs text-blue-700">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">$28</div>
                      <div className="text-xs text-green-700">Cost per Lead</div>
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
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Proven Advertising Results
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Data-driven campaigns that deliver measurable business outcomes
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-semibold text-headingLight heading-style">{result.metric}</div>
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
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Advanced Advertising Features
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Comprehensive ad management with cutting-edge optimization techniques
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

      {/* Platforms Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Advertising Platforms
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We manage campaigns across all major advertising platforms
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-headingLight mb-4 heading-style">
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
                <div className="space-y-2">
                  <div className="bg-input rounded-lg p-3">
                    <p className="text-sm text-textLight text-style">
                      <span className="font-semibold">Best for:</span> {platform.bestFor}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700 text-style">
                      <span className="font-semibold">Budget:</span> {platform.budget}
                    </p>
                  </div>
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
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Our Advertising Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A systematic approach to launching and scaling successful advertising campaigns
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

      {/* Ad Types Section */}
      <section className="py-24 bg-gradient-to-br from-red-500/5 to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Advertising Formats
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We create and optimize all types of high-performing ad formats
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {adTypes.map((adType, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Eye className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{adType}</span>
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
              Advertising Management Packages
            </h2>
            <p className="mt-4 text-base sm:text-lg text-textDark max-w-2xl mx-auto text-style">
              All-inclusive advertising management with transparent pricing
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
                    Start Advertising
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-textDark text-style">
              * Management fees separate from ad spend. Need custom enterprise advertising?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized proposal
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl heading-style">
            Ready to Scale Your Business with Ads?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-red-100 max-w-2xl mx-auto text-style">
            Let's create advertising campaigns that drive real business growth and measurable ROI.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-red-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Launch Your Campaign
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