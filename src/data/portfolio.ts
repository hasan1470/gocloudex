// Add to src/data/navigation.ts or create src/data/portfolio.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  slug: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  completionDate: string;
}

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Fashion Store',
    description: 'A modern e-commerce platform for fashion retailers with real-time inventory, payment processing, and customer management system.',
    category: 'ecommerce',
    slug: 'ecommerce-fashion-store',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'TypeScript', 'Cloudinary'],
    liveLink: 'https://fashion-store.demo.com',
    githubLink: 'https://github.com/username/fashion-store',
    featured: true,
    completionDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Business Consulting Website',
    description: 'Professional website for a business consulting firm with service pages, team profiles, and client case studies.',
    category: 'business',
    slug: 'business-consulting-website',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
    liveLink: 'https://consulting-firm.demo.com',
    githubLink: 'https://github.com/username/consulting-site',
    featured: false,
    completionDate: '2024-02-20'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking features.',
    category: 'web-app',
    slug: 'task-management-app',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    liveLink: 'https://taskapp.demo.com',
    githubLink: 'https://github.com/username/task-app',
    featured: true,
    completionDate: '2024-01-30'
  },
  {
    id: 4,
    title: 'SaaS Analytics Dashboard',
    description: 'Comprehensive analytics dashboard for SaaS businesses with data visualization, reporting, and team management.',
    category: 'saas',
    slug: 'saas-analytics-dashboard',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Chart.js', 'D3.js'],
    liveLink: 'https://analytics-saas.demo.com',
    githubLink: 'https://github.com/username/saas-dashboard',
    featured: false,
    completionDate: '2024-03-10'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    description: 'Beautiful website for a fine dining restaurant with online reservations, menu display, and gallery showcase.',
    category: 'web-design',
    slug: 'restaurant-website',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion'],
    liveLink: 'https://restaurant.demo.com',
    githubLink: 'https://github.com/username/restaurant-site',
    featured: true,
    completionDate: '2024-02-05'
  },
  {
    id: 6,
    title: 'Fitness Mobile App',
    description: 'Mobile fitness application with workout plans, progress tracking, and social features for fitness enthusiasts.',
    category: 'mobile-app',
    slug: 'fitness-mobile-app',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Firebase', 'Stripe', 'Node.js'],
    liveLink: 'https://fitnessapp.demo.com',
    githubLink: 'https://github.com/username/fitness-app',
    featured: false,
    completionDate: '2024-03-25'
  },
  {
    id: 7,
    title: 'Portfolio Website',
    description: 'Minimal and elegant portfolio website for creative professionals with project showcase and contact form.',
    category: 'web-design',
    slug: 'portfolio-website',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    liveLink: 'https://portfolio.demo.com',
    githubLink: 'https://github.com/username/portfolio-site',
    featured: false,
    completionDate: '2024-01-20'
  },
  {
    id: 8,
    title: 'E-learning Platform',
    description: 'Online learning platform with course management, video streaming, and student progress tracking system.',
    category: 'saas',
    slug: 'e-learning-platform',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Redis'],
    liveLink: 'https://elearning.demo.com',
    githubLink: 'https://github.com/username/elearning-platform',
    featured: true,
    completionDate: '2024-03-15'
  }
];

export const portfolioCategories = [
  { id: 'all', name: 'All Work', slug: '' },
  { id: 'web-design', name: 'Web Design', slug: 'web-design' },
  { id: 'ecommerce', name: 'E-commerce', slug: 'ecommerce' },
  { id: 'web-app', name: 'Web Application', slug: 'web-app' },
  { id: 'mobile-app', name: 'Mobile App', slug: 'mobile-app' },
  { id: 'saas', name: 'SaaS Platform', slug: 'saas' },
  { id: 'business', name: 'Business Website', slug: 'business' },
];

// Get all unique technologies from projects
export const allTechnologies = Array.from(
  new Set(portfolioProjects.flatMap(project => project.technologies))
).sort();