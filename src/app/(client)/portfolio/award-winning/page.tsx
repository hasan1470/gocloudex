import Link from 'next/link';
import { 
  ArrowRight, 
  Trophy, 
  Award, 
  Star, 
  Medal,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Quote,
} from 'lucide-react';

const awards = [
  {
    year: '2025',
    awards: [
      {
        title: 'Best Cloud Solutions Provider',
        organization: 'Tech Excellence Awards',
        category: 'Cloud Services',
        level: 'Gold',
        description: 'Recognized for innovative cloud solutions and exceptional client results',
        icon: Trophy,
        color: 'text-yellow-500'
      },
      {
        title: 'Top Web Development Agency',
        organization: 'Design & Development Awards',
        category: 'Web Development',
        level: 'Platinum',
        description: 'Awarded for outstanding website design and development excellence',
        icon: Award,
        color: 'text-gray-400'
      }
    ]
  },
  {
    year: '2024',
    awards: [
      {
        title: 'Fastest Growing Tech Company',
        organization: 'Business Innovation Awards',
        category: 'Growth',
        level: 'Winner',
        description: 'Recognized for rapid growth and market impact in technology sector',
        icon: TrendingUp,
        color: 'text-green-500'
      },
      {
        title: 'Excellence in Customer Service',
        organization: 'Client Choice Awards',
        category: 'Service',
        level: 'Diamond',
        description: 'Voted by clients for exceptional service and support experience',
        icon: Users,
        color: 'text-blue-500'
      },
      {
        title: 'Best Mobile App Development',
        organization: 'Mobile Innovation Summit',
        category: 'Mobile Development',
        level: 'Gold',
        description: 'Awarded for innovative mobile applications and user experience',
        icon: Zap,
        color: 'text-yellow-500'
      }
    ]
  },
  {
    year: '2023',
    awards: [
      {
        title: 'Top SEO Service Provider',
        organization: 'Digital Marketing Awards',
        category: 'SEO',
        level: 'Excellence',
        description: 'Recognized for delivering outstanding SEO results and ROI',
        icon: TrendingUp,
        color: 'text-purple-500'
      },
      {
        title: 'Security Excellence Award',
        organization: 'Cyber Security Forum',
        category: 'Security',
        level: 'Gold',
        description: 'Awarded for implementing robust security measures in all projects',
        icon: Shield,
        color: 'text-yellow-500'
      }
    ]
  }
];

const achievements = [
  {
    icon: Users,
    number: '50+',
    label: 'Happy Clients',
    description: 'Served across various industries worldwide'
  },
  {
    icon: Trophy,
    number: '15+',
    label: 'Industry Awards',
    description: 'Recognized for excellence and innovation'
  },
  {
    icon: Globe,
    number: '25+',
    label: 'Countries Served',
    description: 'Global client base and projects'
  },
  {
    icon: TrendingUp,
    number: '99%',
    label: 'Client Retention',
    description: 'Long-term partnerships and satisfaction'
  }
];

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

const recognition = [
  {
    organization: 'Clutch',
    recognition: 'Top B2B Service Provider',
    year: '2024',
    category: 'Web Development',
    badge: 'Leader'
  },
  {
    organization: 'GoodFirms',
    recognition: 'Top Mobile App Developers',
    year: '2024',
    category: 'Mobile Development',
    badge: 'Elite'
  },
  {
    organization: 'DesignRush',
    recognition: 'Best E-commerce Agencies',
    year: '2023',
    category: 'E-commerce',
    badge: 'Top'
  },
  {
    organization: 'UpCity',
    recognition: 'National Excellence Award',
    year: '2023',
    category: 'Digital Marketing',
    badge: 'Excellence'
  }
];

const pressFeatures = [
  {
    publication: 'TechCrunch',
    title: 'GoCloudEx Revolutionizes Cloud Solutions for SMEs',
    date: 'March 2024',
    excerpt: 'Innovative approach to cloud infrastructure makes enterprise-grade solutions accessible to small businesses.'
  },
  {
    publication: 'Forbes',
    title: 'The Future of Web Development: GoCloudEx Leading the Way',
    date: 'January 2024',
    excerpt: 'Pioneering modern web development practices that set new industry standards.'
  },
  {
    publication: 'Business Insider',
    title: 'How GoCloudEx Achieved 300% Growth in 2 Years',
    date: 'November 2023',
    excerpt: 'Strategic focus on quality and client success drives unprecedented growth.'
  }
];

export default function AwardsPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-blue-500/10 py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Prestige Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Trophy className="h-5 w-5" />
            <span>Award-Winning Excellence</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-yellow-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Award-Winning
            </span>
            <span className="block text-headingLight mt-4">Excellence</span>
          </h1>
          
          <p className="mt-8 text-2xl text-textLight leading-relaxed max-w-4xl mx-auto text-style">
            Recognized globally for innovative solutions, exceptional quality, and outstanding 
            client results. Our awards reflect our commitment to excellence in every project.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-style"
            >
              <Trophy className="h-6 w-6 mr-3" />
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-headingLight bg-white border-2 border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-style"
            >
              Start Award-Winning Project
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-bold text-headingLight heading-style">{achievement.number}</div>
                    <div className="text-lg font-semibold text-headingLight mt-2 heading-style">{achievement.label}</div>
                    <div className="text-textLight mt-2 text-style">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards Timeline */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-headingLight sm:text-5xl heading-style">
              Our Awards & Recognition
            </h2>
            <p className="mt-6 text-xl text-textLight max-w-3xl mx-auto text-style">
              Celebrating excellence and innovation across multiple industries and disciplines
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-purple-600"></div>
            
            <div className="space-y-16">
              {awards.map((yearGroup, yearIndex) => (
                <div key={yearIndex} className="relative">
                  {/* Year Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
                    <div className="bg-gradient-to-r from-yellow-500 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg heading-style">
                      {yearGroup.year}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    {yearGroup.awards.map((award, awardIndex) => {
                      const Icon = award.icon;
                      const isLeft = awardIndex % 2 === 0;
                      
                      return (
                        <div
                          key={awardIndex}
                          className={`relative ${
                            isLeft ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'
                          }`}
                        >
                          {/* Award Card */}
                          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 p-8 relative overflow-hidden">
                            {/* Accent Bar */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 to-purple-600"></div>
                            
                            {/* Award Level Badge */}
                            <div className="absolute top-6 right-6">
                              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                                award.level === 'Gold' || award.level === 'Winner' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : award.level === 'Platinum' || award.level === 'Diamond'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                <Medal className="h-3 w-3" />
                                <span>{award.level}</span>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-purple-600 flex items-center justify-center ${award.color}`}>
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-headingLight heading-style">
                                  {award.title}
                                </h3>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Award className="h-4 w-4 text-yellow-500" />
                                  <span className="text-lg font-semibold text-textLight heading-style">
                                    {award.organization}
                                  </span>
                                </div>
                                <div className="mt-3">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                                    {award.category}
                                  </span>
                                </div>
                                <p className="mt-4 text-textLight leading-relaxed text-style">
                                  {award.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Timeline Dot */}
                          <div className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-full border-4 border-white shadow-lg ${
                            isLeft ? 'right-0 lg:right-[-48px]' : 'left-0 lg:left-[-48px]'
                          }`}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Recognition */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-headingLight sm:text-5xl heading-style">
              Industry Recognition
            </h2>
            <p className="mt-6 text-xl text-textLight max-w-3xl mx-auto text-style">
              Recognized by leading industry platforms and review sites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recognition.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-headingLight mb-2 heading-style">
                  {item.organization}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                    {item.badge}
                  </div>
                </div>
                <p className="text-textLight mb-2 text-style">{item.recognition}</p>
                <div className="text-sm text-textLight">
                  {item.category} • {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-bgLight">
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
                className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {testimonial.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-headingLight sm:text-5xl heading-style">
              Featured in Press
            </h2>
            <p className="mt-6 text-xl text-textLight max-w-3xl mx-auto text-style">
              Recognized by leading publications for innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pressFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {feature.publication.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-headingLight heading-style">
                      {feature.publication}
                    </div>
                    <div className="text-textLight text-sm text-style">
                      {feature.date}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-headingLight mb-4 heading-style">
                  {feature.title}
                </h3>
                <p className="text-textLight leading-relaxed text-style">
                  {feature.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-yellow-500 via-purple-600 to-blue-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Trophy className="h-5 w-5" />
            <span>Award-Winning Partnership</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white heading-style">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Award-Winning Project?
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto text-style">
            Join our portfolio of successful clients and experience the excellence 
            that has earned us industry recognition and awards.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-purple-600 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-style"
            >
              Start Your Project
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 text-style"
            >
              View Award-Winning Work
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-8 w-8 text-yellow-300 fill-current animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}