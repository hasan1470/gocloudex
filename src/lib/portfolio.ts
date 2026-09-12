import "server-only";
import { getPublishedProjects } from "@/actions/projects";
import type { ShowcaseProject } from "@/data/showcase";
import { mapPortfolioProjects } from "./portfolio-utils";

export async function getPortfolio(): Promise<ShowcaseProject[]> {
  const published = await getPublishedProjects();
  return mapPortfolioProjects(published);
}
