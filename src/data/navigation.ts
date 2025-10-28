import { 
  Layout, 
  Search, 
  TrendingUp, 
  Target, 
  Code, 
  Cloud, 
  Smartphone,
  ShoppingCart,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  Palette,
  Video,
  Mail,
  User,
  Home
} from 'lucide-react';

// Generic Mega Menu Interface
export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuItem {
  title: string;
  description: string;
  icon: any; // Lucide icon component
  link: string;
  featured?: boolean;
  features?: string[];
}

export interface MegaMenuData {
  title: string;
  description: string;
  columns: MegaMenuColumn[];
  viewAll?: {
    text: string;
    link: string;
  };
}

// Service Mega Menu
export const serviceMegaMenu: MegaMenuData = {
  title: 'Our Services',
  description: 'Comprehensive digital solutions to grow your business',
  columns: [
    {
      title: 'Design & Development',
      items: [
        {
          title: 'Website Design',
          description: 'Custom, responsive websites that convert visitors into customers',
          icon: Layout,
          link: '/services/website-design',
          featured: true,
          features: ['Modern design', 'SEO-friendly', 'mobile-optimized'],
        },
        {
          title: 'E-commerce Development',
          description: 'Online stores with secure payment processing and inventory management',
          icon: ShoppingCart,
          link: '/services/ecommerce-development',
          featured: true,
          features: ['Secure payments', 'User-friendly', 'Scalable solutions'],
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android',
          icon: Smartphone,
          link: '/services/mobile-app-development',
          featured: true,
          features: ['iOS & Android', 'User-centric design', 'Performance optimized'],
        },
        {
          title: 'UI/UX Design',
          description: 'User-centered design that enhances user experience and engagement',
          icon: Palette,
          link: '/services'
        }
      ]
    },
    {
      title: 'Digital Marketing',
      items: [
        {
          title: 'SEO Service',
          description: 'Improve your search engine rankings and drive organic traffic',
          icon: Search,
          link: '/services/seo',
          featured: true,
          features: ['Keyword research', 'On-page SEO', 'Link building']
        },
        {
          title: 'Ads Campaign',
          description: 'Targeted advertising campaigns across Google, social media, and more',
          icon: Target,
          link: '/services/ads-campaign',
          featured: true,
          features: ['PPC Management', 'Social Media Ads', 'Performance Tracking']
        },
        {
          title: 'Social Media Marketing',
          description: 'Build your brand presence and engage with your audience',
          icon: MessageCircle,
          link: '/services/social-media-marketing',
          featured: true,
          features: ['Content Creation', 'Community Management', 'Analytics & Reporting']
        },
        {
          title: 'Content Marketing',
          description: 'Strategic content creation to attract and retain customers',
          icon: Video,
          link: '/services'
        }
      ]
    },
    {
      title: 'Technology Solutions',
      items: [
        {
          title: 'Web Application',
          description: 'Custom web applications tailored to your business needs',
          icon: Code,
          link: '/services/web-application',
          featured: true,
          features: ['Scalable Architecture', 'Robust Security', 'User-friendly Interfaces']
        },
        {
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and deployment services',
          icon: Cloud,
          link: '/services/cloud-solutions',
          featured: true,
          features: ['AWS & Azure', 'Cloud Migration', '24/7 Monitoring']
        },
        {
          title: 'API Development',
          description: 'RESTful APIs and integration services for your applications',
          icon: Zap,
          link: '/services'
        },
        {
          title: 'Security Audit',
          description: 'Comprehensive security assessment and protection solutions',
          icon: Shield,
          link: '/services'
        }
      ]
    }
  ],
  viewAll: {
    text: 'View All Services',
    link: '/services'
  }
};

// Portfolio Mega Menu
export const portfolioMegaMenu: MegaMenuData = {
  title: 'Our Portfolio',
  description: 'Explore our work across different industries and technologies',
  columns: [
    {
      title: 'By Industry',
      items: [
        {
          title: 'E-commerce',
          description: 'Online stores and shopping platforms',
          icon: ShoppingCart,
          link: '/portfolio?filter=ecommerce',
          featured: true
        },
        {
          title: 'Healthcare',
          description: 'Medical and healthcare applications',
          icon: Shield,
          link: '/portfolio?filter=healthcare'
        },
        {
          title: 'Education',
          description: 'E-learning platforms and educational tools',
          icon: Video,
          link: '/portfolio?filter=education'
        },
        {
          title: 'Finance',
          description: 'Banking and financial applications',
          icon: BarChart3,
          link: '/portfolio?filter=finance'
        }
      ]
    },
    {
      title: 'By Technology',
      items: [
        {
          title: 'React & Next.js',
          description: 'Modern React applications and Next.js websites',
          icon: Code,
          link: '/portfolio?filter=react',
          featured: true
        },
        {
          title: 'Mobile Apps',
          description: 'iOS and Android mobile applications',
          icon: Smartphone,
          link: '/portfolio?filter=mobile'
        },
        {
          title: 'Cloud Solutions',
          description: 'Cloud-native applications and infrastructure',
          icon: Cloud,
          link: '/portfolio?filter=cloud'
        },
        {
          title: 'E-commerce',
          description: 'Online stores and payment systems',
          icon: ShoppingCart,
          link: '/portfolio?filter=ecommerce-tech',
          featured: true
        }
      ]
    },
    {
      title: 'Featured Work',
      items: [
        {
          title: 'Latest Projects',
          description: 'Recently completed work and case studies',
          icon: Zap,
          link: '/portfolio',
          featured: true
        },
        {
          title: 'Client Stories',
          description: 'Success stories and client testimonials',
          icon: User,
          link: '/portfolio',
          featured: true
        },
        {
          title: 'Award Winning',
          description: 'Our most recognized and awarded projects',
          icon: TrendingUp,
          link: '/portfolio',
        },
        {
          title: 'Open Source',
          description: 'Our contributions to the open source community',
          icon: Code,
          link: '/portfolio'
        }
      ]
    }
  ],
  viewAll: {
    text: 'View All Projects',
    link: '/portfolio'
  }
};

// Main Navigation with Mega Menu Support
export interface NavigationItem {
  name: string;
  href: string;
  icon?: any;
  hasMegaMenu?: boolean;
  megaMenuData?: MegaMenuData;
}

export const mainNavigation: NavigationItem[] = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home 
  },
  { 
    name: 'Our Services', 
    href: '/services',
    hasMegaMenu: true,
    megaMenuData: serviceMegaMenu
  },
  { 
    name: 'Portfolio', 
    href: '/portfolio',
    hasMegaMenu: true,
    megaMenuData: portfolioMegaMenu
  },
  { 
    name: 'About Us', 
    href: '/about', 
    icon: User 
  },
  { 
    name: 'Contact Us', 
    href: '/contact', 
    icon: Mail 
  },
];

// Helper function to get mega menu data for a navigation item
export const getMegaMenuData = (menuName: string): MegaMenuData | null => {
  const navItem = mainNavigation.find(item => item.name === menuName);
  return navItem?.megaMenuData || null;
};