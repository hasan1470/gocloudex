import Link from 'next/link';
import { 
  Cloud, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ExternalLink,
  Sparkles,
  Code,
  Server,
  Zap
} from 'lucide-react';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Development', icon: Code },
    { name: 'Cloud Solutions', icon: Cloud },
    { name: 'API Development', icon: Server },
    { name: 'Performance Optimization', icon: Zap },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:hello@gocloudex.com',
      icon: Mail,
    },
  ],
};

export default function ClientFooter() {
  return (
    <footer className="bg-bgDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand Section */}
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Cloud className="h-10 w-10 text-primary group-hover:text-primary-dark transition-colors" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-headingDark heading-style">GoCloudEx</span>
                <span className="text-sm text-primary -mt-1 text-style">Cloud Solutions</span>
              </div>
            </Link>
            <p className="text-textDark text-lg leading-relaxed max-w-md text-style">
              Building exceptional digital experiences with cutting-edge cloud technologies. 
              We specialize in modern web development and scalable cloud solutions.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textDark hover:text-hoverTextDark transition-all duration-200 transform hover:scale-110 p-2 rounded-lg hover:bg-white/10"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Navigation */}
              <div>
                <h3 className="text-lg font-semibold text-headingDark tracking-wider uppercase mb-6 heading-style">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-textDark hover:text-hoverTextDark transition-colors duration-200 flex items-center space-x-2 group text-style"
                      >
                        <span>{item.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/admin"
                      className="text-linkDark hover:text-hoverLinkDark transition-colors duration-200 font-medium text-style"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-headingDark tracking-wider uppercase mb-6 heading-style">
                  Services
                </h3>
                <ul className="space-y-4">
                  {navigation.services.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name} className="flex items-center space-x-3 text-textDark text-style">
                        <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-headingDark tracking-wider uppercase mb-6 heading-style">
                  Get In Touch
                </h3>
                <div className="space-y-4 text-textDark text-style">
                  <p className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <a href="mailto:hello@gocloudex.com" className="hover:text-hoverTextDark transition-colors">
                      hello@gocloudex.com
                    </a>
                  </p>
                  <p className="leading-relaxed">
                    Ready to start your next project? Let&apos;s build something amazing together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-textDark text-sm text-style">
            &copy; {new Date().getFullYear()} GoCloudEx. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm text-textDark text-style">
            <Link href="/privacy" className="hover:text-hoverTextDark transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-hoverTextDark transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-2">
              <span>Built with</span>
              <div className="flex space-x-1">
                <span className="text-redType">♥</span>
                <span>using Next.js & Cloudinary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}