import "server-only";
import { getPublishedProjects } from "@/actions/projects";
import { showcase, type ShowcaseProject } from "@/data/showcase";
import { publicUrl } from "./portfolio-utils";

export async function getPortfolio(): Promise<ShowcaseProject[]> {
  const published = await getPublishedProjects();
  const curatedSlugs = new Set(showcase.map((project) => project.slug));
  const curatedRepositories = new Set(
    showcase.map((project) => publicUrl(project.githubUrl)),
  );
  const additions: ShowcaseProject[] = published
    .filter((project) => {
      if (curatedSlugs.has(project.slug)) return false;
      if (
        project.githubUrl &&
        curatedRepositories.has(publicUrl(project.githubUrl))
      )
        return false;
      // Preserve placeholder records in the CMS, but don't present them as public work.
      if (
        (project.projectUrl || project.githubUrl) &&
        !publicUrl(project.projectUrl) &&
        !publicUrl(project.githubUrl)
      )
        return false;
      return true;
    })
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      category: project.categories?.[0]?.name || "Website",
      tags: [
        ...(project.categories || []).map((category) => category.slug),
        "web-design",
      ],
      summary: project.description,
      image: project.image,
      imageAlt: `${project.title} project preview`,
      kind: "Portfolio demo",
      role: "Design & development",
      stack: project.technologies || [],
      liveUrl: publicUrl(project.projectUrl),
      githubUrl: publicUrl(project.githubUrl),
      challenge: project.description,
      approach: "",
      features: project.keyFeatures || [],
      walkthrough: [],
      overviewHtml: project.projectOverview,
      note: "Portfolio project. Explore the linked website or repository for the current implementation.",
    }));
  return [...showcase, ...additions];
}
