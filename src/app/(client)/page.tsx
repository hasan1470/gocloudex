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
  Server
} from 'lucide-react';

const features = [
  {
    name: 'Modern Web Development',
    description: 'Built with Next.js, React, and TypeScript for blazing-fast performance and excellent developer experience.',
    icon: Code,
    color: 'text-primary'
  },
  {
    name: 'Cloud Solutions',
    description: 'Leveraging Cloudinary, MongoDB, and modern cloud services for scalable and reliable applications.',
    icon: Cloud,
    color: 'text-accent'
  },
  {
    name: 'Performance Optimized',
    description: 'Every project is optimized for speed, SEO, and user experience with best practices.',
    icon: Zap,
    color: 'text-greenType'
  },
  {
    name: 'Secure & Reliable',
    description: 'Enterprise-grade security and reliability for your applications and data.',
    icon: Shield,
    color: 'text-secondary'
  },
];

const stats = [
  {
    label: 'Projects Completed',
    value: '50+',
    icon: CheckCircle,
    color: 'text-greenType'
  },
  {
    label: 'Happy Clients',
    value: '30+',
    icon: Users,
    color: 'text-primary'
  },
  {
    label: 'Years Experience',
    value: '3+',
    icon: TrendingUp,
    color: 'text-accent'
  },
  {
    label: 'Technologies',
    value: '15+',
    icon: Server,
    color: 'text-secondary'
  },
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 
  'Cloudinary', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel'
];

export default function Home() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium text-style border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span>Now Building Amazing Digital Experiences</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight heading-style">
              <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Cloud-Powered
              </span>
              <span className="block bg-gradient-to-r from-headingLight to-textLight bg-clip-text text-transparent mt-2">
                Digital Solutions
              </span>
            </h1>
            <p className="mt-8 text-xl text-textLight max-w-3xl mx-auto leading-relaxed text-style">
              We build exceptional web applications and cloud solutions using modern technologies like 
              Next.js, MongoDB, and Cloudinary. Let&apos;s transform your ideas into reality.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
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
                Get In Touch
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bgLight border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
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
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Technologies We Love
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with modern technologies to build fast, scalable, and maintainable applications.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
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

      {/* Process Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Development Process
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              A structured approach to ensure quality and success in every project.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">Discovery & Planning</h3>
              <p className="mt-4 text-textLight text-style">
                We start by understanding your requirements, goals, and target audience to create a comprehensive project plan.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">Development & Testing</h3>
              <p className="mt-4 text-textLight text-style">
                Our team builds your solution using best practices, with continuous testing and quality assurance.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-greenType/10 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-greenType" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">Deployment & Support</h3>
              <p className="mt-4 text-textLight text-style">
                We deploy your application and provide ongoing support to ensure optimal performance and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgDark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              Let&apos;s discuss how we can help bring your vision to life with modern technology and expert development.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingDark bg-bgDark border border-border rounded-xl shadow-sm hover:bg-white/5 transition-all duration-200 transform hover:-translate-y-1 text-style"
              >
                View Our Work
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}