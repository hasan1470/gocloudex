import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { showcase } from "@/data/showcase";
import { getPortfolio } from "@/lib/portfolio";
import { publicUrl } from "@/lib/portfolio-utils";
import ProjectCard from "@/components/marketing/ProjectCard";
import {
  Checklist,
  ProjectCTA,
  SectionHeading,
} from "@/components/marketing/Sections";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 3600;
export function generateStaticParams() {
  return showcase.map(({ slug }) => ({ slug }));
}
async function findProject(slug: string) {
  return (
    showcase.find((project) => project.slug === slug) ||
    (await getPortfolio()).find((project) => project.slug === slug)
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project)
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  return {
    title: project.title + " — Case Study",
    description: project.summary,
    alternates: { canonical: "/portfolio/" + project.slug },
    openGraph: {
      title: project.title + " | GoCloudEx",
      description: project.summary,
      url: "/portfolio/" + project.slug,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) notFound();
  const live = publicUrl(project.liveUrl);
  const github = publicUrl(project.githubUrl);
  const related = showcase
    .filter((item) => item.slug !== project.slug)
    .sort(
      (a, b) =>
        Number(b.tags.some((tag) => project.tags.includes(tag))) -
        Number(a.tags.some((tag) => project.tags.includes(tag))),
    )
    .slice(0, 2);
  return (
    <div className="gc-site">
      <section className="gc-case-hero">
        <div className="gc-container">
          <Link className="gc-back" href="/portfolio">
            <ArrowLeft size={16} /> All projects
          </Link>
          <span className="gc-eyebrow" style={{ display: "flex" }}>
            {project.category} / {project.kind}
          </span>
          <div className="gc-case-title">
            <div>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
            <div className="gc-button-row">
              {live && (
                <a
                  className="gc-button"
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore live project <ArrowUpRight size={18} />
                </a>
              )}
              {github && (
                <a
                  className="gc-text-link"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} /> View source code{" "}
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
          <dl className="gc-case-meta">
            <div>
              <dt>Project type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>Our work</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
          </dl>
          <div className="gc-case-cover">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 800px) 95vw, 1200px"
            />
          </div>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container gc-case-content">
          <div>
            <div className="gc-case-section">
              <span className="gc-eyebrow">The brief</span>
              <h2>The idea behind the work.</h2>
              <p>{project.challenge}</p>
            </div>
            {project.approach && (
              <div className="gc-case-section">
                <span className="gc-eyebrow">Our approach</span>
                <h2>How we brought it together.</h2>
                <p>{project.approach}</p>
              </div>
            )}
            {project.overviewHtml && (
              <div
                className="gc-case-section gc-prose"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(project.overviewHtml, {
                    allowedTags: [
                      "p",
                      "br",
                      "strong",
                      "em",
                      "u",
                      "s",
                      "ul",
                      "ol",
                      "li",
                      "h2",
                      "h3",
                      "h4",
                      "blockquote",
                      "a",
                    ],
                    allowedAttributes: { a: ["href", "title"] },
                    allowedSchemes: ["https", "http", "mailto"],
                  }),
                }}
              />
            )}
            {project.walkthrough.length > 0 && (
              <div className="gc-case-section">
                <span className="gc-eyebrow">Take a look around</span>
                <h2>Try the experience.</h2>
                <ol className="gc-walkthrough">
                  {project.walkthrough.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <aside>
            <span className="gc-eyebrow">Inside the project</span>
            <h2>What you can explore.</h2>
            <Checklist items={project.features} />
            <div className="gc-demo-note">
              <strong>About this project</strong>
              <p>{project.note}</p>
              {project.credit && <p className="gc-credit">{project.credit}</p>}
            </div>
          </aside>
        </div>
      </section>
      <section className="gc-section gc-soft">
        <div className="gc-container">
          <SectionHeading
            label="Keep exploring"
            title="More from the studio."
          />
          <div className="gc-project-grid">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>
      <ProjectCTA />
    </div>
  );
}
