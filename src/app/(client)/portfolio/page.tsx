import { Suspense } from 'react';
import PortfolioClient from './PortfolioClient';
import { getPublishedProjects, getCategories } from '@/actions/projects';

export default async function PortfolioPage() {
  // Fetch data on the server
  const [projects, categories] = await Promise.all([
    getPublishedProjects(),
    getCategories()
  ]);

  return (
    <Suspense fallback={null}>
      <PortfolioClient initialProjects={projects} initialCategories={categories} />
    </Suspense>
  );
}
