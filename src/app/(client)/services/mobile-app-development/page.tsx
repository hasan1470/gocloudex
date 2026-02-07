import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  Download,
  Zap,
  Shield,
  Users,
  BarChart3,
  Code,
  Palette,
  Cloud,
  MessageCircle,
  Star,
  Apple
  
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Native & Cross-Platform',
    description: 'High-performance apps built with React Native, Flutter, or native iOS/Android development.',
    color: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with smooth animations and instant load times.',
    color: 'text-yellow-500'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security, data encryption, and robust error handling.',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed around user needs and behaviors.',
    color: 'text-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Built-in analytics to track user behavior and app performance.',
    color: 'text-orange-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Seamless integration with cloud services and APIs.',
    color: 'text-indigo-500'
  }
];

const platforms = [
  {
    name: 'iOS Native',
    icon: Apple,
    description: 'Swift & Objective-C',
    features: ['Best performance', 'Apple ecosystem', 'Latest iOS features'],
    bestFor: 'Premium user experience'
  },
  {
    name: 'Android Native',
    icon: Smartphone,
    description: 'Kotlin & Java',
    features: ['Google Play Store', 'Android-specific features', 'Wide device support'],
    bestFor: 'Global market reach'
  },
  {
    name: 'Cross-Platform',
    icon: Code,
    description: 'React Native & Flutter',
    features: ['Single codebase', 'Faster development', 'Cost-effective'],
    bestFor: 'Startups & MVPs'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Strategy & Discovery',
    description: 'We define your app goals, target audience, and technical requirements.',
    icon: MessageCircle
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'Our designers create pixel-perfect interfaces following platform guidelines.',
    icon: Palette
  },
  {
    step: '03',
    title: 'Development',
    description: 'Agile development with regular demos and feedback sessions.',
    icon: Code
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'Rigorous testing on real devices followed by App Store deployment.',
    icon: Download
  }
];

const pricingPlans = [
  {
    name: 'MVP App',
    price: '$8,999',
    description: 'Perfect for testing your app idea',
    features: [
      'Cross-platform Development',
      'Basic UI/UX Design',
      'Core Features Only',
      'App Store Submission',
      '3 Months Support',
      'Basic Analytics',
      'Admin Dashboard',
      'Bug Fixing'
    ],
    recommended: false
  },
  {
    name: 'Business App',
    price: '$19,999',
    description: 'Ideal for established businesses',
    features: [
      'Native iOS & Android',
      'Custom UI/UX Design',
      'Advanced Features',
      'Push Notifications',
      '6 Months Support',
      'Advanced Analytics',
      'Backend API',
      'Third-party Integrations',
      'App Store Optimization'
    ],
    recommended: true
  },
  {
    name: 'Enterprise App',
    price: '$39,999',
    description: 'For complex business solutions',
    features: [
      'Multi-platform Development',
      'Premium UI/UX Design',
      'Custom Backend',
      'Real-time Features',
      '12 Months Support',
      'Enterprise Security',
      'Custom Integrations',
      'Dedicated Team',
      'Scalable Architecture'
    ],
    recommended: false
  }
];

const technologies = [
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase',
  'AWS Amplify', 'GraphQL', 'Redux', 'TypeScript', 'Node.js'
];

export default function MobileAppDevelopmentPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Native & Cross-Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mobile App
                </span>
                <span className="block text-headingLight mt-2">Development</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-textLight leading-relaxed text-style">
                Transform your ideas into powerful mobile applications. We build native and 
                cross-platform apps that deliver exceptional user experiences and drive 
                business growth across iOS and Android platforms.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Start Your App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/portfolio?category=mobile-app"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View App Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-2 shadow-2xl">
                    <div className="bg-bgLight rounded-2xl p-6">
                    {/* Main Container */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-7">
                        
                        {/* iPhone Mockup - Left */}
                        <div className="relative">
                        <div className="bg-gray-900 rounded-[2.5rem] p-1 shadow-2xl border-[6px] border-gray-800">
                            {/* iPhone Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-4.5 bg-gray-900 rounded-b-2xl z-10"></div>
                            
                            {/* Screen */}
                            <div className="bg-white rounded-[2rem] w-56 h-[28rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 pt-2 pb-1">
                                <div className="text-xs font-semibold">9:41</div>
                                <div className="flex items-center space-x-1">
                                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                                </div>
                            </div>

                            {/* App Content */}
                            <div className="p-4 space-y-4">
                                {/* Header */}
                                <div className="text-center">
                                <div className="w-32 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-2"></div>
                                <div className="w-40 h-4 bg-gray-200 rounded mx-auto"></div>
                                </div>

                                {/* Feature Cards */}
                                <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="bg-gray-50 rounded-xl p-3 text-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                                    <div className="w-12 h-2 bg-gray-300 rounded mx-auto mb-1"></div>
                                    <div className="w-8 h-2 bg-gray-200 rounded mx-auto"></div>
                                    </div>
                                ))}
                                </div>

                                {/* Main Content Area */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                                <div className="w-24 h-4 bg-gray-400 rounded mb-2 mx-auto"></div>
                                <div className="w-32 h-3 bg-gray-300 rounded mb-1 mx-auto"></div>
                                <div className="w-28 h-3 bg-gray-300 rounded mx-auto"></div>
                                </div>

                                {/* Action Button */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl py-3 text-center">
                                <div className="text-white text-sm font-semibold">Get Started</div>
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* Platform Label */}
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-1 rounded-full">
                            <Apple className="h-3 w-3" />
                            <span className="text-xs font-medium">iOS</span>
                            </div>
                        </div>
                        </div>

                        {/* Center Divider */}
                        <div className="hidden lg:block">
                        <div className="w-px h-64 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                        </div>

                        {/* Android Mockup - Right */}
                        <div className="relative">
                        <div className="bg-black rounded-3xl p-2 shadow-2xl border-2 border-gray-700">
                            {/* Screen */}
                            <div className="bg-white rounded-2xl w-52 h-[26rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-4 pt-3 pb-2">
                                <div className="text-xs">9:41</div>
                                <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                </div>
                            </div>

                            {/* App Content */}
                            <div className="p-4 space-y-4">
                                {/* Header */}
                                <div className="text-center">
                                <div className="w-28 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-2"></div>
                                <div className="w-36 h-3 bg-gray-200 rounded mx-auto"></div>
                                </div>

                                {/* Feature List */}
                                <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="w-20 h-3 bg-gray-300 rounded mb-1"></div>
                                        <div className="w-16 h-2 bg-gray-200 rounded"></div>
                                    </div>
                                    </div>
                                ))}
                                </div>

                                {/* Content Card */}
                                <div className="bg-gray-50 rounded-xl p-3">
                                <div className="w-20 h-3 bg-gray-400 rounded mb-2"></div>
                                <div className="w-24 h-2 bg-gray-300 rounded mb-1"></div>
                                <div className="w-20 h-2 bg-gray-300 rounded"></div>
                                </div>

                                {/* Action Area */}
                                <div className="space-y-2">
                                <div className="w-full h-8 bg-blue-500 rounded-lg"></div>
                                <div className="w-full h-8 bg-white border border-gray-300 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Android Navigation */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
                                <div className="flex justify-around">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                ))}
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        {/* Platform Label */}
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-full">
                            <Smartphone className="h-3 w-3" />
                            <span className="text-xs font-medium">Android</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* App Store Badges - Bottom */}
                    <div className="flex justify-center space-x-6 mt-12">
                        <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-xl">
                            <Apple className="h-5 w-5" />
                            <span className="text-sm font-medium">App Store</span>
                        </div>
                        <div className="text-xs text-textLight text-style">4.8★ Rating</div>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl">
                            <Smartphone className="h-5 w-5" />
                            <span className="text-sm font-medium">Play Store</span>
                        </div>
                        <div className="text-xs text-textLight text-style">4.7★ Rating</div>
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
              <div className="text-2xl font-semibold text-headingLight heading-style">50M+</div>
              <div className="text-textLight mt-2 text-style">App Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">4.8★</div>
              <div className="text-textLight mt-2 text-style">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">99.5%</div>
              <div className="text-textLight mt-2 text-style">Crash-Free Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-headingLight heading-style">24/7</div>
              <div className="text-textLight mt-2 text-style">App Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Powerful Mobile App Features
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We build feature-rich mobile applications that engage users and drive business results.
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
              Choose Your Development Approach
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We offer multiple development approaches to match your budget, timeline, and performance requirements.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  className="bg-bgLight border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-headingLight mb-2 heading-style">
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
              Our App Development Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A streamlined process that ensures your app is built right, from concept to launch.
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
              <h3 className="text-xl font-semibold text-headingLight mb-6 heading-style">App Store Ready</h3>
              <div className="space-y-4">
                {[
                  'App Store & Play Store submission',
                  'ASO (App Store Optimization)',
                  'Screenshot and video creation',
                  'Privacy policy and terms of service',
                  'App metadata optimization',
                  'Beta testing management',
                  'App review guidance',
                  'Post-launch monitoring'
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
      <section className="py-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Modern Technology Stack
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We use cutting-edge technologies to build scalable, maintainable, and high-performance mobile apps.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
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
              Mobile App Development Packages
            </h2>
            <p className="mt-4 text-base sm:text-lg text-textDark max-w-2xl mx-auto text-style">
              Comprehensive packages to bring your mobile app idea to life.
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
              Need a custom enterprise mobile solution?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized quote
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl heading-style">
            Ready to Build Your Mobile App?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto text-style">
            Let's create a mobile experience that users love and that drives your business forward.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your App Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio?category=mobile-app"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View App Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}