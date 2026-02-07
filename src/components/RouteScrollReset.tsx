'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type RouteScrollResetProps = {
  targetSelector?: string;
};

export default function RouteScrollReset({ targetSelector }: RouteScrollResetProps) {
  const pathname = usePathname();

  useEffect(() => {
    const resetScroll = () => {
      if (targetSelector) {
        const target = document.querySelector<HTMLElement>(targetSelector);
        if (target) {
          target.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    resetScroll();
    const raf = window.requestAnimationFrame(resetScroll);
    return () => window.cancelAnimationFrame(raf);
  }, [pathname, targetSelector]);

  return null;
}
