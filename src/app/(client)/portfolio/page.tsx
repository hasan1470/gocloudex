import type { Metadata } from "next";
import { Suspense } from "react";
import PortfolioClient from "./PortfolioClient";
import { getPortfolio } from "@/lib/portfolio";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Selected Work & Project Case Studies",
  description:
    "Explore GoCloudEx websites, independent products and working portfolio demos. Read the case studies, try live projects and view their source code.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = (await getPortfolio()).map(
    ({
      slug,
      title,
      category,
      tags,
      summary,
      image,
      imageAlt,
      kind,
      stack,
    }) => ({
      slug,
      title,
      category,
      tags,
      summary,
      image,
      imageAlt,
      kind,
      stack,
    }),
  );
  return (
    <Suspense
      fallback={
        <div className="gc-site gc-section">
          <div className="gc-container">
            <h1>Selected work</h1>
            <p>Loading the project collection…</p>
          </div>
        </div>
      }
    >
      <PortfolioClient projects={projects} />
    </Suspense>
  );
}
