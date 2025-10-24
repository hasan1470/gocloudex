import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Target, 
  Award, 
  Heart,
  Globe,
  Code,
  Cloud,
  Zap,
  Shield
} from 'lucide-react';

const values = [
  {
    name: 'Innovation',
    description: 'We stay at the forefront of technology, constantly exploring new tools and methodologies to deliver cutting-edge solutions.',
    icon: Zap,
    color: 'text-primary'
  },
  {
    name: 'Quality',
    description: 'Every line of code is written with precision and care, ensuring robust, maintainable, and scalable applications.',
    icon: Award,
    color: 'text-greenType'
  },
  {
    name: 'Collaboration',
    description: 'We work closely with our clients, treating them as partners in the journey to create exceptional digital experiences.',
    icon: Users,
    color: 'text-accent'
  },
  {
    name: 'Reliability',
    description: 'Our clients trust us to deliver on time and exceed expectations, building long-term relationships based on consistent performance.',
    icon: Shield,
    color: 'text-secondary'
  },
];

const teamStats = [
  { number: '3+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Happy Clients' },
  { number: '15+', label: 'Technologies' },
];

const technologies = [
  {
    category: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs']
  },
  {
    category: 'Cloud & DevOps',
    skills: ['Cloudinary', 'AWS', 'Vercel', 'Git', 'Docker']
  },
  {
    category: 'Tools',
    skills: ['VS Code', 'Figma', 'Postman', 'MongoDB Compass', 'Chrome DevTools']
  }
];

export default function AboutPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              About GoCloudEx
            </span>
          </h1>
          <p className="mt-6 text-xl text-textLight leading-relaxed max-w-3xl mx-auto text-style">
            We are passionate developers and cloud specialists dedicated to building 
            exceptional digital experiences that drive business growth and innovation.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-textLight text-style">
                <p>
                  Founded with a vision to bridge the gap between innovative ideas and 
                  technical execution, GoCloudEx has been at the forefront of digital 
                  transformation for businesses of all sizes.
                </p>
                <p>
                  What started as a passion for coding and cloud technologies has evolved 
                  into a full-service development agency specializing in modern web 
                  applications and cloud solutions.
                </p>
                <p>
                  We believe that great technology should be accessible, reliable, and 
                  transformative. Our mission is to empower businesses with the tools 
                  they need to thrive in the digital age.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-8">
                {teamStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary heading-style">{stat.number}</div>
                    <div className="text-sm text-textLight mt-1 text-style">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-2xl">
                <div className="bg-bgLight rounded-xl p-8 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Code className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-headingLight heading-style">Our Mission</h3>
                      <p className="text-textLight mt-2 text-style">
                        To deliver innovative, scalable, and user-centric digital solutions 
                        that empower businesses to achieve their goals and stand out in the 
                        digital landscape.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                      <Target className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-headingLight heading-style">Our Vision</h3>
                      <p className="text-textLight mt-2 text-style">
                        To be the leading partner for businesses seeking cutting-edge 
                        cloud solutions and web development services that drive growth 
                        and innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              The principles that guide everything we do and define who we are as a team.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.name}
                className="relative bg-bgLight p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group text-center"
              >
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-300">
                    <value.icon className={`h-8 w-8 ${value.color} group-hover:text-bgLight transition-colors duration-300`} />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-headingLight heading-style">{value.name}</h3>
                <p className="mt-4 text-textLight leading-relaxed text-style">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Our Technology Stack
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              We work with modern, proven technologies to build fast, secure, and scalable applications.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div key={tech.category} className="bg-bgLight border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-headingLight mb-4 heading-style">{tech.category}</h3>
                <ul className="space-y-3">
                  {tech.skills.map((skill) => (
                    <li key={skill} className="flex items-center text-textLight text-style">
                      <CheckCircle className="h-4 w-4 text-greenType mr-3 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-bgDark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
              Why Choose GoCloudEx?
            </h2>
            <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
              We bring more than just technical expertise to the table.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingDark heading-style">Passionate Team</h3>
              <p className="mt-4 text-textDark text-style">
                We genuinely love what we do. Our passion for technology and design 
                shines through in every project we undertake.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                  <Globe className="h-10 w-10 text-accent" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingDark heading-style">Global Perspective</h3>
              <p className="mt-4 text-textDark text-style">
                We understand diverse markets and user behaviors, creating solutions 
                that work across different cultures and regions.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-greenType/10 rounded-full flex items-center justify-center">
                  <Cloud className="h-10 w-10 text-greenType" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-headingDark heading-style">Future-Proof Solutions</h3>
              <p className="mt-4 text-textDark text-style">
                We build with scalability in mind, ensuring your digital presence 
                grows seamlessly with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgLight">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
            Ready to Build Something Amazing?
          </h2>
          <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
            Let&apos;s discuss your project and how we can help bring your vision to life.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-headingLight bg-bgLight border border-border rounded-xl shadow-sm hover:bg-input transition-all duration-200 transform hover:-translate-y-1 text-style"
            >
              View Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}