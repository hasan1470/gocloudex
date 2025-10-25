'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Search, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Redirect immediately if countdown reaches 0
    if (countdown <= 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-bgLight flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-primary opacity-10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent heading-style">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-headingLight mb-3 heading-style">
              Page Not Found
            </h1>
            <p className="text-textLight text-lg leading-relaxed text-style">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-textLight text-sm text-style">
              Redirecting to homepage in{' '}
              <span className="font-semibold text-primary">{countdown}</span> seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-textLight rounded-lg hover:bg-input transition-all duration-200 hover:-translate-y-0.5 text-style group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 shadow-lg text-style group"
            >
              <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Homepage
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-border">
            <p className="text-textLight mb-4 text-style">Quick Links:</p>
            <div className="flex justify-center space-x-6">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-sm text-primary hover:text-hoverLinkLight transition-colors text-style group"
              >
                <Search className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm text-primary hover:text-hoverLinkLight transition-colors text-style group"
              >
                <Mail className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                Contact
              </Link>
            </div>
          </div>

          {/* Fun Illustration */}
          <div className="pt-8">
            <div className="relative w-32 h-32 mx-auto">
              {/* Floating elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary/20 rounded-full animate-bounce"></div>
              <div className="absolute top-8 left-8 w-8 h-8 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-12 right-8 w-6 h-6 bg-greenType/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-4 left-10 w-10 h-10 bg-primary/10 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-greenType/20"></div>
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
        </div>
      </div>
    </div>
  );
}