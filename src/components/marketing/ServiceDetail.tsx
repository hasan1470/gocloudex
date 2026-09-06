import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { showcase } from "@/data/showcase";
import ProjectCard from "./ProjectCard";
import { Process, ProjectCTA, SectionHeading } from "./Sections";

export function serviceMetadata(slug: string): Metadata {
  const service = services.find((item) => item.slug === slug)!;
  return {
    title: service.shortTitle,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.shortTitle} | GoCloudEx`,
      description: service.summary,
      url: `/services/${slug}`,
    },
  };
}
export default function ServiceDetail({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug)!;
  const projects = service.projectSlugs
    .flatMap((projectSlug) =>
      showcase.filter((project) => project.slug === projectSlug),
    )
    .slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.shortTitle,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: "GoCloudEx",
      url: "https://gocloudex.com",
    },
    url: `https://gocloudex.com/services/${slug}`,
  };
  return (
    <div className="gc-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="gc-detail-hero">
        <div className="gc-container">
          <Link className="gc-back" href="/services">
            <ArrowLeft size={16} /> All services
          </Link>
          <div className="gc-detail-grid">
            <div>
              <span className="gc-eyebrow">
                {service.number} / {service.category}
              </span>
              <h1>{service.title}</h1>
              <p className="gc-lead">{service.intro}</p>
              <Link className="gc-button" href="/contact">
                Discuss your project <ArrowUpRight size={18} />
              </Link>
            </div>
            <aside className="gc-service-brief">
              <span className="gc-eyebrow">A good fit for</span>
              <p>{service.bestFor}</p>
              <span className="gc-eyebrow">Tools we can work with</span>
              <div className="gc-tags">
                {service.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="gc-brief-foot">
                A focused scope, chosen around your business.
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            label="What we deliver"
            title="The details make the difference."
            description="We agree the exact scope before development, so the deliverables match your priorities."
          />
          <div className="gc-deliverables">
            {service.deliverables.map((item, index) => (
              <article key={item.title}>
                <span className="gc-step-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      {projects.length > 0 && (
        <section className="gc-section">
          <div className="gc-container">
            <SectionHeading
              label="Relevant work"
              title="See the thinking in practice."
              description="Explore an implementation, read about the work and try the public experience."
            />
            <div className="gc-project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="gc-section gc-soft">
        <div className="gc-container gc-faq-layout">
          <div>
            <span className="gc-eyebrow">Good questions</span>
            <h2>Before we begin.</h2>
            <p>Useful details for planning your project.</p>
          </div>
          <div className="gc-faq">
            {service.questions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="gc-related-services gc-container">
        <span className="gc-eyebrow">Explore more</span>
        <div>
          {services
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`}>
                {item.shortTitle}
                <ArrowUpRight size={18} />
              </Link>
            ))}
        </div>
      </section>
      <ProjectCTA />
    </div>
  );
}
