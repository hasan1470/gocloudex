import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';

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

import LoaderUI from '@/components/LoaderUI';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedColor = localStorage.getItem('theme-color');
                  const savedFont = localStorage.getItem('theme-font');
                  if (savedColor) {
                    const colors = {
                      'rgb(59 130 246)': 'rgb(37 99 235)',
                      'rgb(147 51 234)': 'rgb(126 34 206)',
                      'rgb(22 163 74)': 'rgb(21 128 61)',
                      'rgb(220 26 26)': 'rgb(185 28 28)',
                      'rgb(234 88 12)': 'rgb(194 65 12)'
                    };
                    document.documentElement.style.setProperty('--primary-color', savedColor);
                    if (colors[savedColor]) {
                      document.documentElement.style.setProperty('--primary-color-dark', colors[savedColor]);
                    }
                  }
                  if (savedFont) {
                    document.documentElement.style.setProperty('--heading-font', savedFont);
                    document.documentElement.style.setProperty('--body-font', savedFont);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Suspense fallback={<LoaderUI />}>
            <PageLoader />
          </Suspense>
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
        </ThemeProvider>
      </body>
    </html>
  );
}