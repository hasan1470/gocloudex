import type { Project } from "@/types";
import type { ProjectPreview, ShowcaseProject } from "@/data/showcase";

/** Public links must not send visitors to local/admin placeholders or executable URLs. */
export function publicUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    if (
      host === "localhost" ||
      !host.includes(".") ||
      host.endsWith(".local") ||
      host.endsWith(".localhost") ||
      host.includes(":")
    )
      return undefined;
    if (
      /^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
        host,
      )
    )
      return undefined;
    if (/\/(admin|adminlogin)(\/|$)/i.test(url.pathname)) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function filterProjects<T extends ProjectPreview>(
  projects: T[],
  filter: string,
  query: string,
) {
  const normalized = query.trim().toLocaleLowerCase();
  return projects.filter((project) => {
    const matchesFilter =
      filter === "all" ||
      project.tags.includes(filter) ||
      project.kind.toLowerCase() === filter;
    const text = [
      project.title,
      project.summary,
      project.category,
      ...project.stack,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return matchesFilter && (!normalized || text.includes(normalized));
  });
}

/** Merge dashboard-managed projects into the verified portfolio collection. */
export function mergePortfolioProjects(
  curated: ShowcaseProject[],
  published: Project[],
): ShowcaseProject[] {
  const curatedSlugs = new Set(curated.map((project) => project.slug));
  const curatedRepositories = new Set(
    curated.map((project) => publicUrl(project.githubUrl)).filter(Boolean),
  );
  const additions = published
    .filter(
      (project) =>
        !curatedSlugs.has(project.slug) &&
        !curatedRepositories.has(publicUrl(project.githubUrl)),
    )
    .map(
      (project): ShowcaseProject => ({
        slug: project.slug,
        title: project.title,
        category: project.categories?.[0]?.name || "Website",
        tags: [
          ...(project.categories || []).map((category) => category.slug),
          "web-design",
        ],
        summary: project.description,
        image: project.image || "/portfolio/project-placeholder.svg",
        imageAlt: `${project.title} project preview`,
        kind: "Portfolio demo",
        role: "Design & development",
        stack: project.technologies || [],
        featured: project.featured,
        liveUrl: publicUrl(project.projectUrl),
        githubUrl: publicUrl(project.githubUrl),
        challenge: project.description,
        approach: "",
        features: project.keyFeatures || [],
        walkthrough: [],
        overviewHtml: project.projectOverview,
        note: "This project is managed from the GoCloudEx dashboard. Public live and source links appear when valid web addresses are provided.",
      }),
    );
  return [...additions, ...curated];
}
