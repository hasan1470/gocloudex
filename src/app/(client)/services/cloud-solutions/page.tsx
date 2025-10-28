import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Cloud,
  Server,
  Zap,
  Shield,
  Database,
  Globe,
  Users,
  BarChart3,
  MessageCircle,
  Star,
  Cpu,
  Lock
} from 'lucide-react';

const features = [
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud infrastructure setup with auto-scaling, load balancing, and high availability.',
    color: 'text-blue-500'
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Managed database services with automated backups, replication, and performance optimization.',
    color: 'text-green-500'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with compliance frameworks and continuous monitoring.',
    color: 'text-red-500'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Application performance tuning and infrastructure optimization for maximum efficiency.',
    color: 'text-yellow-500'
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Multi-region deployment with CDN integration for global reach and low latency.',
    color: 'text-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Monitoring & Analytics',
    description: 'Real-time monitoring, logging, and analytics for proactive issue resolution.',
    color: 'text-orange-500'
  }
];

const platforms = [
  {
    name: 'AWS',
    description: 'Amazon Web Services',
    features: ['EC2, S3, RDS', 'Lambda Functions', 'CloudFront CDN'],
    bestFor: 'Enterprise applications'
  },
  {
    name: 'Google Cloud',
    description: 'Google Cloud Platform',
    features: ['Compute Engine', 'Cloud Storage', 'BigQuery'],
    bestFor: 'Data-intensive applications'
  },
  {
    name: 'Microsoft Azure',
    description: 'Azure Cloud Services',
    features: ['Virtual Machines', 'Azure SQL', 'Active Directory'],
    bestFor: 'Microsoft ecosystem'
  },
  {
    name: 'Vercel/Netlify',
    description: 'Modern hosting platforms',
    features: ['Static hosting', 'Edge functions', 'Automatic deployments'],
    bestFor: 'Frontend applications'
  }
];

const solutions = [
  {
    category: 'Infrastructure',
    services: [
      'Cloud Architecture Design',
      'Serverless Computing',
      'Container Orchestration',
      'Load Balancing',
      'Auto-scaling Setup'
    ]
  },
  {
    category: 'Storage & Databases',
    services: [
      'Database Migration',
      'Data Backup Solutions',
      'Content Delivery Networks',
      'Object Storage',
      'Data Warehousing'
    ]
  },
  {
    category: 'Security',
    services: [
      'Cloud Security Assessment',
      'Identity & Access Management',
      'Network Security',
      'Compliance Auditing',
      'DDoS Protection'
    ]
  },
  {
    category: 'DevOps',
    services: [
      'CI/CD Pipeline Setup',
      'Infrastructure as Code',
      'Monitoring & Alerting',
      'Disaster Recovery',
      'Cost Optimization'
    ]
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Assessment & Planning',
    description: 'Comprehensive analysis of your current infrastructure and cloud migration strategy.',
    icon: MessageCircle
  },
  {
    step: '02',
    title: 'Architecture Design',
    description: 'Design scalable, secure cloud architecture tailored to your business needs.',
    icon: Cpu
  },
  {
    step: '03',
    title: 'Migration & Implementation',
    description: 'Seamless migration with minimal downtime and comprehensive testing.',
    icon: Cloud
  },
  {
    step: '04',
    title: 'Optimization & Support',
    description: 'Continuous optimization, monitoring, and 24/7 support for your cloud environment.',
    icon: Zap
  }
];

const pricingPlans = [
  {
    name: 'Cloud Starter',
    price: '$999',
    period: '/month',
    description: 'Perfect for small to medium businesses',
    features: [
      'Cloud Architecture Design',
      'Basic Infrastructure Setup',
      'Security Configuration',
      'Monthly Monitoring',
      'Email Support',
      '99.9% Uptime SLA',
      'Basic Backup Solutions'
    ],
    recommended: false
  },
  {
    name: 'Cloud Professional',
    price: '$2,499',
    period: '/month',
    description: 'Ideal for growing enterprises',
    features: [
      'Advanced Cloud Architecture',
      'Multi-region Deployment',
      'Advanced Security',
      '24/7 Monitoring',
      'Phone & Email Support',
      '99.95% Uptime SLA',
      'Disaster Recovery',
      'Performance Optimization',
      'Cost Management'
    ],
    recommended: true
  },
  {
    name: 'Cloud Enterprise',
    price: '$4,999',
    period: '/month',
    description: 'For mission-critical applications',
    features: [
      'Enterprise Architecture',
      'Global Deployment',
      'Enterprise Security',
      'Real-time Monitoring',
      'Dedicated Support Team',
      '99.99% Uptime SLA',
      'Multi-cloud Strategy',
      'Custom Integrations',
      'Compliance Management'
    ],
    recommended: false
  }
];

const benefits = [
  {
    metric: '60%',
    description: 'Average cost reduction vs on-premise'
  },
  {
    metric: '99.9%',
    description: 'Uptime guarantee with SLA'
  },
  {
    metric: '3x',
    description: 'Faster deployment times'
  },
  {
    metric: '50%',
    description: 'Reduced maintenance overhead'
  }
];

const technologies = [
  'AWS EC2', 'AWS S3', 'AWS Lambda', 'Google Cloud', 'Azure',
  'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins'
];

export default function CloudSolutionsPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
                <Star className="h-4 w-4" />
                <span>Scalable & Secure</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Cloud Solutions
                </span>
                <span className="block text-headingLight mt-2">For Modern Businesses</span>
              </h1>
              <p className="mt-6 text-xl text-textLight leading-relaxed text-style">
                Transform your business with scalable, secure, and cost-effective cloud infrastructure. 
                We design, implement, and manage cloud solutions that drive innovation and growth.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
                >
                  Get Cloud Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
                >
                  View Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-bgLight rounded-xl p-6">
                  {/* Cloud Architecture Diagram */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    {/* Global Network */}
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Global Cloud Network</span>
                      </div>
                    </div>
                    
                    {/* Data Centers */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {['US East', 'EU West', 'Asia Pacific'].map((region) => (
                        <div key={region} className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <Server className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-xs font-medium text-gray-700">{region}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Services Layer */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Database className="h-4 w-4 text-green-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Database</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Cpu className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Compute</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Lock className="h-4 w-4 text-red-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Security</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <BarChart3 className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Analytics</div>
                      </div>
                    </div>
                    
                    {/* Connectivity */}
                    <div className="flex justify-center">
                      <div className="bg-green-50 px-3 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Auto-scaling Enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">99.9%</div>
                      <div className="text-xs text-blue-700">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">2.5s</div>
                      <div className="text-xs text-green-700">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Cloud Business Benefits
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Transform your operations with cloud technology
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-headingLight heading-style">{benefit.metric}</div>
                <div className="text-textLight mt-2 text-style">{benefit.description}</div>
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
              Comprehensive Cloud Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              End-to-end cloud solutions tailored to your business needs
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
              Cloud Platforms We Work With
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Expertise across all major cloud providers
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-headingLight mb-2 heading-style">
                  {platform.name}
                </h3>
                <p className="text-textLight mb-6 text-style">
                  {platform.description}
                </p>
                <div className="space-y-2 mb-6">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
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

      {/* Solutions Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Cloud Solutions
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Comprehensive cloud services for every business need
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-bgLight border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-headingLight mb-4 heading-style">
                  {solution.category}
                </h3>
                <ul className="space-y-3">
                  {solution.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-greenType flex-shrink-0" />
                      <span className="text-textLight text-sm text-style">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Cloud Implementation Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A structured approach to successful cloud transformation
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
                  'Scalable cloud infrastructure',
                  'Enhanced security posture',
                  'Cost optimization',
                  'Performance monitoring',
                  'Disaster recovery plan',
                  '24/7 technical support',
                  'Regular security updates',
                  'Compliance documentation'
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
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Cloud Technologies & Tools
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with industry-leading cloud technologies and DevOps tools
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-bgLight border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Cloud className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium text-style">{tech}</span>
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
              Cloud Management Packages
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              Comprehensive cloud management and support packages
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
              Need a custom enterprise cloud solution?{' '}
              <Link href="/contact" className="text-primary hover:text-hoverLinkLight">
                Contact us for a personalized proposal
              </Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-style">
            Ready to Scale Your Business in the Cloud?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto text-style">
            Let's build a cloud infrastructure that grows with your business and drives innovation.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Get Cloud Consultation
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