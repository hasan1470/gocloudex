import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Heart,
  Share2,
  MessageCircle,
  TrendingUp,
  Calendar,
  BarChart3,
  Video,
  Image,
  Zap,
  Star,
  ThumbsUp,
  Rocket
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Community Building',
    description: 'Grow an engaged community of followers who love your brand and become loyal customers.',
    color: 'text-blue-500'
  },
  {
    icon: Heart,
    title: 'Brand Awareness',
    description: 'Increase brand visibility and recognition through strategic content and engagement.',
    color: 'text-red-500'
  },
  {
    icon: Share2,
    title: 'Content Strategy',
    description: 'Data-driven content planning that resonates with your target audience.',
    color: 'text-green-500'
  },
  {
    icon: MessageCircle,
    title: 'Engagement Growth',
    description: 'Boost interactions, comments, and shares to build meaningful relationships.',
    color: 'text-purple-500'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Comprehensive tracking and reporting to measure ROI and optimize strategy.',
    color: 'text-orange-500'
  },
  {
    icon: Video,
    title: 'Video Content',
    description: 'Engaging video content including Reels, Stories, and live streaming.',
    color: 'text-indigo-500'
  }
];

const platforms = [
  {
    name: 'Instagram',
    description: 'Visual storytelling and community engagement',
    features: ['Feed Posts', 'Stories & Reels', 'IGTV', 'Shopping'],
    bestFor: 'Visual brands & B2C',
    audience: 'Ages 18-34'
  },
  {
    name: 'Facebook',
    description: 'Community building and targeted advertising',
    features: ['Page Management', 'Groups', 'Live Video', 'Ads'],
    bestFor: 'Community-focused brands',
    audience: 'All age groups'
  },
  {
    name: 'LinkedIn',
    description: 'Professional networking and B2B marketing',
    features: ['Company Page', 'Content Publishing', 'LinkedIn Live', 'Lead Gen'],
    bestFor: 'B2B & professional services',
    audience: 'Professionals & businesses'
  },
  {
    name: 'TikTok',
    description: 'Short-form video and viral content',
    features: ['TikTok Videos', 'Trend Participation', 'Duets', 'Hashtag Challenges'],
    bestFor: 'Youth-focused brands',
    audience: 'Gen Z & Millennials'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Strategy & Audit',
    description: 'Comprehensive analysis of your current social presence and development of a custom strategy.',
    icon: BarChart3,
    deliverables: ['Competitor Analysis', 'Audience Research', 'Content Strategy', 'Goal Setting']
  },
  {
    step: '02',
    title: 'Content Creation',
    description: 'Professional content creation including graphics, videos, and copywriting.',
    icon: Image,
    deliverables: ['Content Calendar', 'Visual Design', 'Copywriting', 'Video Production']
  },
  {
    step: '03',
    title: 'Platform Management',
    description: 'Daily management, posting, and community engagement across all platforms.',
    icon: MessageCircle,
    deliverables: ['Daily Posting', 'Community Engagement', 'Response Management', 'Growth Tactics']
  },
  {
    step: '04',
    title: 'Analysis & Optimization',
    description: 'Performance tracking and strategy refinement based on data insights.',
    icon: TrendingUp,
    deliverables: ['Performance Reports', 'Strategy Refinement', 'ROI Analysis', 'Scale Planning']
  }
];

const pricingPlans = [
  {
    name: 'Starter Social',
    price: '$799',
    period: '/month',
    description: 'Perfect for businesses starting with social media',
    features: [
      '2 Social Media Platforms',
      '12 Posts Per Month',
      'Content Creation',
      'Basic Engagement',
      'Monthly Performance Report',
      'Content Calendar',
      'Email Support'
    ],
    recommended: false
  },
  {
    name: 'Growth Plan',
    price: '$1,499',
    period: '/month',
    description: 'Ideal for businesses scaling social media presence',
    features: [
      '3 Social Media Platforms',
      '24 Posts Per Month',
      'Premium Content Creation',
      'Active Community Management',
      'Weekly Performance Reports',
      'Advanced Analytics',
      'Strategy Sessions',
      'Priority Support'
    ],
    recommended: true
  },
  {
    name: 'Enterprise Solution',
    price: '$2,999',
    period: '/month',
    description: 'For brands needing comprehensive social media management',
    features: [
      '4+ Social Media Platforms',
      '48+ Posts Per Month',
      'Dedicated Content Team',
      '24/7 Community Management',
      'Daily Performance Monitoring',
      'Custom Reporting',
      'Video Content Production',
      'Dedicated Account Manager',
      'Crisis Management'
    ],
    recommended: false
  }
];

const results = [
  {
    metric: '3.5x',
    description: 'Average engagement rate increase'
  },
  {
    metric: '89%',
    description: 'Faster response time to messages'
  },
  {
    metric: '215%',
    description: 'Growth in qualified followers'
  },
  {
    metric: '24/7',
    description: 'Community management'
  }
];

const contentTypes = [
  'Feed Posts', 'Stories', 'Reels/TikToks', 'Live Videos', 'Carousel Posts',
  'User-Generated Content', 'Polls & Questions', 'Behind-the-Scenes', 'Testimonials'
];

export default function SocialMediaMarketingPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Community-First Approach</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Social Media
                </span>
                <span className="block text-headingLight mt-2">Marketing</span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                Build meaningful connections and grow your brand through strategic 
                social media management. We create engaging content that builds communities 
                and drives real business results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Grow Your Social
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
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* Social Media Dashboard Mockup */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Platform Tabs */}
                    <div className="flex border-b border-gray-200">
                      {['Instagram', 'Facebook', 'LinkedIn', 'TikTok'].map((platform) => (
                        <div key={platform} className="flex-1 text-center py-3 border-r border-gray-200 last:border-r-0">
                          <div className="text-sm font-medium text-gray-700">{platform}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Content Grid */}
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div key={item} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200"></div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Engagement Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <div className="text-sm font-semibold">2.4K</div>
                          </div>
                          <div className="text-xs text-gray-500">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <MessageCircle className="h-3 w-3 text-blue-500" />
                            <div className="text-sm font-semibold">348</div>
                          </div>
                          <div className="text-xs text-gray-500">Comments</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Share2 className="h-3 w-3 text-green-500" />
                            <div className="text-sm font-semibold">127</div>
                          </div>
                          <div className="text-xs text-gray-500">Shares</div>
                        </div>
                      </div>
                      
                      {/* Recent Posts */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">New product launch</div>
                            <div className="text-xs text-gray-500">2 hours ago • 1.2K views</div>
                          </div>
                          <div className="text-xs text-green-600">+24%</div>
                        </div>
                        <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">Customer testimonial</div>
                            <div className="text-xs text-gray-500">5 hours ago • 894 views</div>
                          </div>
                          <div className="text-xs text-green-600">+18%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Growth Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <div className="text-lg font-bold text-pink-600">+215%</div>
                      <div className="text-xs text-pink-700">Follower Growth</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">3.5x</div>
                      <div className="text-xs text-purple-700">Engagement Rate</div>
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
              Social Media Success Stories
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Real results from our data-driven social media strategies
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
              Comprehensive Social Media Management
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              End-to-end social media solutions that build communities and drive engagement
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
              Platform Expertise
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We master every major social media platform to reach your ideal audience
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-headingLight mb-2 heading-style">
                  {platform.name}
                </h3>
                <p className="text-textLight mb-4 text-sm text-style">
                  {platform.description}
                </p>
                <div className="space-y-2 mb-4">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-greenType flex-shrink-0" />
                      <span className="text-textLight text-xs text-style">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="bg-input rounded-lg p-2">
                    <p className="text-xs text-textLight text-style">
                      <span className="font-semibold">Best for:</span> {platform.bestFor}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-blue-700 text-style">
                      <span className="font-semibold">Audience:</span> {platform.audience}
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
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Social Media Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A systematic approach to building and growing your social media presence
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

      {/* Content Types Section */}
      <section className="py-24 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Engaging Content Types
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We create diverse content that captures attention and drives engagement
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {contentTypes.map((contentType, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Image className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{contentType}</span>
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
              Social Media Management Packages
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              Comprehensive social media management with transparent monthly pricing
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
                    Start Growing
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-textDark text-style">
              Need custom social media solutions for multiple brands?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for enterprise pricing
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Ready to Build Your Social Community?
          </h2>
          <p className="mt-4 text-xl text-pink-100 max-w-2xl mx-auto text-style">
            Let's create a social media presence that builds meaningful connections and drives business growth.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-pink-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Social Growth
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