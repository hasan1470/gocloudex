// app/(client)/portfolio/page.tsx
'use client';

import { Suspense } from 'react';
import PortfolioClient from './PortfolioClient';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading portfolio...</div>}>
      <PortfolioClient />
    </Suspense>
  );
}
