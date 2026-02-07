

import Link from 'next/link';
import { 
  ArrowRight, 
  Star, 
  Quote,
  Users,
  Target,
  Calendar,
  Play,
  ExternalLink
} from 'lucide-react';

const featuredStories = [
  {
    id: 1,
    client: 'TechInnovate Inc.',
    industry: 'SaaS Platform',
    project: 'Cloud Infrastructure & Mobile App',
    duration: '6 months',
    results: {
      revenue: '+200%',
      users: '+50K',
      performance: '3x faster',
      satisfaction: '4.9/5'
    },
    story: 'TechInnovate needed a scalable cloud infrastructure and mobile app to support their rapid growth. We implemented a microservices architecture and React Native app that helped them scale to 50,000+ users.',
    image: '/api/placeholder/400/300',
    video: 'https://youtube.com/embed/example',
    logo: '/api/placeholder/120/60',
    featured: true
  },
  {
    id: 2,
    client: 'EcoFashion Co.',
    industry: 'E-commerce',
    project: 'Online Store & SEO Strategy',
    duration: '4 months',
    results: {
      revenue: '+150%',
      traffic: '+300%',
      conversion: '+45%',
      satisfaction: '4.8/5'
    },
    story: 'EcoFashion wanted to establish a strong online presence. We built a custom e-commerce platform and implemented an SEO strategy that tripled their organic traffic in 4 months.',
    image: '/api/placeholder/400/300',
    logo: '/api/placeholder/120/60',
    featured: true
  }
];

const successStories = [
  {
    id: 3,
    client: 'HealthFlow Medical',
    industry: 'Healthcare',
    project: 'Patient Portal & Mobile App',
    results: {
      patients: '+25K',
      efficiency: '+60%',
      rating: '4.9/5'
    },
    quote: 'GoCloudEx transformed our patient experience with a seamless mobile app that reduced appointment no-shows by 40%.',
    author: 'Dr. Sarah Chen',
    position: 'Medical Director',
    logo: '/api/placeholder/100/50'
  },
  {
    id: 4,
    client: 'FinTech Solutions',
    industry: 'Finance',
    project: 'Banking Platform & Security',
    results: {
      transactions: '+1M/mo',
      security: '99.99%',
      compliance: '100%'
    },
    quote: 'The security architecture and compliance framework implemented by GoCloudEx gave us the confidence to scale globally.',
    author: 'Michael Roberts',
    position: 'CTO',
    logo: '/api/placeholder/100/50'
  },
  {
    id: 5,
    client: 'EduLearn Academy',
    industry: 'Education',
    project: 'Learning Management System',
    results: {
      students: '+100K',
      engagement: '+75%',
      completion: '+50%'
    },
    quote: 'Our online learning platform built by GoCloudEx has helped us reach 100,000+ students with exceptional engagement rates.',
    author: 'Jennifer Martinez',
    position: 'CEO',
    logo: '/api/placeholder/100/50'
  },
  {
    id: 6,
    client: 'LogiChain Pro',
    industry: 'Logistics',
    project: 'Supply Chain Platform',
    results: {
      efficiency: '+80%',
      delivery: '2x faster',
      cost: '-30%'
    },
    quote: 'The custom logistics platform revolutionized our supply chain operations, cutting costs by 30% while improving delivery times.',
    author: 'David Kim',
    position: 'Operations Director',
    logo: '/api/placeholder/100/50'
  }
];

const metrics = [
  {
    number: '50+',
    label: 'Happy Clients'
  },
  {
    number: '98%',
    label: 'Client Satisfaction'
  },
  {
    number: '45+',
    label: 'Projects Delivered'
  },
  {
    number: '2M+',
    label: 'Users Reached'
  }
];


const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 
  'Logistics', 'Real Estate', 'Manufacturing', 'Entertainment'
];

export default function ClientStoriesPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-greenType/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
            <Star className="h-4 w-4" />
            <span>Success Stories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Client Stories
            </span>
            <span className="block text-headingLight mt-2">That Inspire</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-textLight leading-relaxed max-w-3xl mx-auto text-style">
            Discover how businesses across industries have transformed their operations, 
            accelerated growth, and achieved remarkable results with our custom solutions.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Success Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {metrics.map((metric, index) => (
              <div key={index}>
                <div className="text-2xl font-semibold text-headingLight heading-style">{metric.number}</div>
                <div className="text-textLight mt-2 text-style">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Featured Success Stories
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              In-depth case studies showcasing transformative results
            </p>
          </div>

          <div className="mt-20 space-y-16">
            {featuredStories.map((story, index) => (
              <div key={story.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {/* Client Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                      <div className="text-textLight text-xs text-center">Client Logo</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-headingLight heading-style">{story.client}</h3>
                      <p className="text-textLight text-style">{story.industry}</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-4 text-sm text-textLight">
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-primary" />
                        <span>{story.project}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{story.duration}</span>
                      </div>
                    </div>
                    <p className="text-textLight leading-relaxed text-style">{story.story}</p>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(story.results).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-input rounded-lg">
                        <div className="text-lg font-semibold text-headingLight heading-style">{value}</div>
                        <div className="text-xs text-textLight capitalize mt-1 text-style">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <Link
                    href={`/portfolio/client-stories/`}
                    className="inline-flex items-center text-primary hover:text-hoverLinkLight font-medium text-style"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative bg-gradient-to-br from-primary to-accent rounded-2xl p-1 shadow-2xl">
                    <div className="bg-bgLight rounded-xl p-4">
                      {story.video ? (
                        <div className="relative">
                          <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                            <button className="w-16 h-16 bg-primary text-bgLight rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors">
                              <Play className="h-6 w-6" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-bgLight/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-headingLight">
                              Video Testimonial
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Quote className="h-8 w-8 text-primary mx-auto mb-2" />
                            <div className="text-textLight text-style">Project Showcase</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              More Success Stories
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Real results from businesses we've helped transform
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="group bg-bgLight border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Client Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-textLight text-xs text-center">Logo</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-headingLight heading-style">{story.client}</h3>
                    <p className="text-sm text-textLight text-style">{story.industry}</p>
                  </div>
                </div>

                {/* Project */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-primary text-style">{story.project}</div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.entries(story.results).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-input rounded">
                      <div className="text-sm font-bold text-headingLight heading-style">{value}</div>
                      <div className="text-xs text-textLight capitalize text-style">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-6 w-6 text-primary/20 absolute -top-1 -left-1" />
                  <p className="text-textLight text-sm italic pl-4 text-style">"{story.quote}"</p>
                </div>

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-medium text-headingLight text-sm heading-style">{story.author}</div>
                  <div className="text-xs text-textLight text-style">{story.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Industries Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-headingLight sm:text-3xl heading-style">
              Industries We Serve
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Expertise across diverse industries and business models
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="inline-flex items-center px-6 py-3 bg-input border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-style"
              >
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-headingLight font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgDark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 text-style">
            <Star className="h-4 w-4" />
            <span>Your Success Story Awaits</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-headingDark sm:text-3xl heading-style">
            Ready to Write Your Success Story?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textDark max-w-2xl mx-auto text-style">
            Join our growing list of successful clients and let us help you achieve remarkable results.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingDark bg-bgDark border border-border rounded-xl hover:bg-white/5 transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Our Portfolio
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}