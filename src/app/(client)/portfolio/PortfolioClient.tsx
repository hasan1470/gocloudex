"use client";

import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight } from "lucide-react";
import {
  designReferences,
  type ProjectPreview,
} from "@/data/showcase";
import { filterProjects } from "@/lib/portfolio-utils";
import ProjectCard from "@/components/marketing/ProjectCard";
import { ProjectCTA, SectionHeading } from "@/components/marketing/Sections";

export default function PortfolioClient({
  projects,
}: {
  projects: ProjectPreview[];
}) {
  const params = useSearchParams();
  const filter = params.get("filter") || "all";
  const query = params.get("q") || "";
  const visible = filterProjects(projects, filter, query);
  const filterMap = new Map<string, string>();
  for (const project of projects) {
    const value = project.category
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (value) filterMap.set(value, project.category);
  }
  const filters = [
    { label: "All work", value: "all" },
    ...Array.from(filterMap, ([value, label]) => ({ value, label })),
  ];
  const knownFilter = filters.some((item) => item.value === filter);
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    const search = next.toString();
    window.history.replaceState(
      null,
      "",
      "/portfolio" + (search ? "?" + search : ""),
    );
  }
  function reset() {
    window.history.replaceState(null, "", "/portfolio");
  }
  return (
    <div className="gc-site">
      <section className="gc-page-hero gc-portfolio-hero">
        <div className="gc-container">
          <div className="gc-hero-topline">
            <span className="gc-eyebrow">The work, in detail</span>
            <span className="gc-small-label">
              Design. Development. Delivered.
            </span>
          </div>
          <h1>
            Built with purpose.
            <br />
            <span>Ready to explore.</span>
          </h1>
          <div className="gc-hero-bottom">
            <p className="gc-lead">
              A selection of websites, products and working demos. See what we
              built, understand the thinking behind it and try the experience
              yourself.
            </p>
            <div className="gc-portfolio-count">
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              <span>projects to explore</span>
            </div>
          </div>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container">
          <div className="gc-filter-area">
            <div className="gc-filter-top">
              <span role="status" aria-live="polite">
                {visible.length} of {projects.length} projects
                {query ? " matching “" + query + "”" : ""}
              </span>
              <label className="gc-search">
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Search projects</span>
                <input
                  type="search"
                  placeholder="Search projects or technologies"
                  value={query}
                  onChange={(event) => update("q", event.target.value)}
                />
              </label>
            </div>
            <div
              className="gc-filters"
              role="group"
              aria-label="Filter projects"
            >
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={filter === item.value}
                  onClick={() => update("filter", item.value)}
                >
                  {item.label}
                </button>
              ))}
              {!knownFilter && (
                <button
                  type="button"
                  aria-pressed="true"
                  onClick={() => update("filter", "all")}
                >
                  {filter} ×
                </button>
              )}
            </div>
          </div>
          {visible.length ? (
            <div className="gc-project-grid">
              {visible.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  priority={index < 2}
                />
              ))}
            </div>
          ) : (
            <div className="gc-empty">
              <h3>No matching projects yet.</h3>
              <p>Try another search or explore the complete collection.</p>
              <button
                className="gc-button gc-button-outline"
                type="button"
                onClick={reset}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="gc-section gc-soft">
        <div className="gc-container">
          <SectionHeading
            label="Our reference shelf"
            title="Good design is worth studying."
            description="A few useful examples from the wider web, and what we appreciate about their approach."
          />
          <p className="gc-reference-disclosure">
            Independent references, created by their respective teams. These are
            not GoCloudEx projects or clients.
          </p>
          <div className="gc-reference-grid">
            {designReferences.map((reference) => (
              <a
                className="gc-reference"
                key={reference.name}
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="gc-reference-top">
                  <strong>{reference.name}</strong>
                  <ArrowUpRight size={21} />
                </div>
                <span className="gc-eyebrow">{reference.category}</span>
                <p>{reference.description}</p>
                <span>Visit {reference.domain} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <ProjectCTA />
    </div>
  );
}
