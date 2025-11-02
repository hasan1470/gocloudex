# 🚀 GoCloudEx - Professional Portfolio & Admin Dashboard

A modern, full-stack portfolio website with admin dashboard built with Next.js 14, MongoDB, and Cloudinary. Features a beautiful client-facing portfolio and a powerful admin panel for content management.

![GoCloudEx](https://img.shields.io/badge/GoCloudEx-Portfolio%20Website-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🎨 Client-Facing Website
- **Modern Portfolio**: Showcase projects with filtering and search
- **Service Pages**: Detailed service descriptions with mega menu
- **Contact System**: Integrated contact form with auto-response
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### ⚡ Admin Dashboard
- **Project Management**: Add, edit, and manage portfolio projects
- **Category System**: Organize projects by categories
- **Message Center**: View and manage customer inquiries
- **Email Integration**: Direct webmail access within dashboard
- **User Management**: Track customer communications and credentials

### 🛠 Technical Features
- **Next.js 14**: App Router with React Server Components
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Database with Mongoose ODM
- **Cloudinary**: Image and media management
- **Authentication**: Secure admin access
- **Email System**: Automated email notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- MongoDB database
- Cloudinary account (for image uploads)


### 📁 Project Structure

gocloudex/
├── src/
│   ├── app/                    # App Router
│   │   ├── (client)/          # Client routes
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── portfolio/
│   │   │   ├── services/
│   │   │   └── contact/
│   │   ├── (admin)/           # Admin routes
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── projects/
│   │   │   ├── categories/
│   │   │   ├── email/
│   │   │   └── messages/
│   │   └── api/               # API routes
│   │       ├── contact/
│   │       ├── users/
│   │       ├── projects/
│   │       └── upload/
│   ├── components/            # React components
│   │   ├── client/           # Client components
│   │   ├── admin/            # Admin components
│   │   └── shared/           # Shared components
│   ├── lib/                  # Utility libraries
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   └── email.ts
│   ├── models/               # Database models
│   │   ├── User.ts
│   │   ├── Project.ts
│   │   └── Category.ts
│   └── data/                 # Static data
│       └── navigation.ts
├── public/                   # Static assets
└── package.json