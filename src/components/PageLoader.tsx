'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoaderUI from './LoaderUI';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
    >
      <LoaderUI />
    </div>
  );
}
