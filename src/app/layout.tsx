import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'GoCloudEx - Professional Portfolio & Cloud Solutions',
    template: '%s | GoCloudEx'
  },
  description: 'Building exceptional digital experiences with cutting-edge cloud technologies. Expert in Next.js, Cloudinary, MongoDB and modern web development.',
  keywords: ['portfolio', 'cloud solutions', 'web development', 'Next.js', 'React', 'Cloudinary', 'MongoDB', 'JavaScript', 'TypeScript', 'full-stack', 'developer', 'WordPress', 'headless CMS', 'Web Design', 'API Integration', 'WooCommerce', 'Elementor', 'Digital Experiences', 'SEO', 'Digital Marketing'],
  authors: [{ name: 'GoCloudEx' }],
  creator: 'GoCloudEx',
  metadataBase: new URL('https://gocloudex.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gocloudex.com',
    title: 'GoCloudEx - Professional Portfolio & Cloud Solutions',
    description: 'Building exceptional digital experiences with cutting-edge cloud technologies.',
    siteName: 'GoCloudEx',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoCloudEx Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoCloudEx - Professional Portfolio & Cloud Solutions',
    description: 'Building exceptional digital experiences with cutting-edge cloud technologies.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}