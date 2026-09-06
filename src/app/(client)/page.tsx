import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Code2, Globe2, Layers3 } from "lucide-react";
import { services } from "@/data/services";
import { showcase } from "@/data/showcase";
import ProjectCard from "@/components/marketing/ProjectCard";
import HeroArtwork from "@/components/marketing/HeroArtwork";
import {
  Process,
  ProjectCTA,
  SectionHeading,
} from "@/components/marketing/Sections";

export const metadata: Metadata = {
  title: {
    absolute: "GoCloudEx — Websites & Digital Products, Thoughtfully Built",
  },
  description:
    "GoCloudEx designs and develops business websites, e-commerce stores and useful web applications. Explore our services, live projects and development approach.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="gc-site">
      <section className="gc-home-hero">
        <div className="gc-container">
          <div className="gc-hero-topline">
            <span className="gc-eyebrow">
              <i className="gc-status-dot" /> Independent digital studio
            </span>
            <span className="gc-small-label">
              Design with purpose. Build with care.
            </span>
          </div>
          <div className="gc-home-grid">
            <div className="gc-home-copy">
              <h1>
                Good ideas.
                <br />
                Great{" "}
                <span>
                  digital
                  <br className="gc-desktop-break" /> experiences.
                </span>
              </h1>
              <p>
                We turn your next idea into a website or digital product that
                looks the part, works beautifully and helps your business move
                forward.
              </p>
              <div className="gc-button-row">
                <Link className="gc-button" href="/services">
                  Explore our services <ArrowUpRight size={19} />
                </Link>
                <Link className="gc-text-link" href="/about">
                  Get to know us <ArrowRight size={18} />
                </Link>
              </div>
              <div className="gc-hero-footnote">
                <span>Websites</span>
                <i />
                <span>Applications</span>
                <i />
                <span>E-commerce</span>
              </div>
            </div>
            <HeroArtwork />
          </div>
        </div>
      </section>
      <div className="gc-stack-strip">
        <div className="gc-container">
          <span>Tools behind the work</span>
          <div>
            {[
              "Next.js",
              "React",
              "WordPress",
              "Shopify",
              "Node.js",
              "MongoDB",
            ].map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
        </div>
      </div>
      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            label="What we bring"
            title="From the first idea. To the final detail."
            description="Design and development under one roof, with the right platform for your business and a clear plan for getting there."
          />
          <div className="gc-home-services">
            {services.slice(0, 3).map((service, index) => {
              const Icon = [Globe2, Code2, Layers3][index];
              return (
                <Link
                  key={service.slug}
                  href={"/services/" + service.slug}
                  className="gc-home-service"
                >
                  <Icon size={29} strokeWidth={1.5} />
                  <h3>{service.shortTitle}</h3>
                  <p>{service.summary}</p>
                  <span>
                    Explore service <ArrowUpRight size={18} />
                  </span>
                </Link>
              );
            })}
          </div>
          <Link className="gc-text-link gc-space-top" href="/services">
            See all services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="gc-section gc-soft">
        <div className="gc-container">
          <SectionHeading
            label="Selected work"
            title="Less talk. More to explore."
            description="Real interfaces, working features and the thinking behind them. Open a case study, then try the experience for yourself."
          />
          <div className="gc-project-grid">
            {showcase.slice(0, 4).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link
            className="gc-button gc-button-outline gc-space-top"
            href="/portfolio"
          >
            View the full portfolio <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container gc-principles">
          <div>
            <span className="gc-eyebrow">The way we build</span>
            <h2>
              Thoughtful on the surface.
              <br />
              <span>Solid underneath.</span>
            </h2>
            <p>
              A website should be more than a good first impression. It should
              be understandable, maintainable and useful long after launch.
            </p>
            <Link className="gc-text-link" href="/about">
              Meet GoCloudEx <ArrowUpRight size={18} />
            </Link>
          </div>
          <div>
            {[
              {
                title: "Clarity before complexity",
                text: "A clear page structure, direct content and features chosen around a real need.",
              },
              {
                title: "Performance as a foundation",
                text: "Appropriate rendering, optimized images and purposeful interactions, checked in the browser.",
              },
              {
                title: "A handover you can use",
                text: "Editable content where needed, organized source code and practical setup instructions.",
              },
            ].map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <ProjectCTA />
    </div>
  );
}
