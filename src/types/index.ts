// Database Types
export interface User {
  _id: string;
  name: string;
  email: string;
  messageCount: number;
  unreadCount: number;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  user: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReply: boolean;
  repliedTo?: string;
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// types/index.ts
export interface Project {
  _id: string;
  title: string;
  description: string;
  slug: string;
  categories: Category[]; // Changed from category to categories array
  image: string;
  technologies: string[];
  keyFeatures: string[]; // New field
  projectOverview: string; // New field
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  completionDate: string;
  images: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}