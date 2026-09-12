import "server-only";
import { getPublishedProjects } from "@/actions/projects";
import { showcase, type ShowcaseProject } from "@/data/showcase";
import { mergePortfolioProjects } from "./portfolio-utils";

export async function getPortfolio(): Promise<ShowcaseProject[]> {
  const published = await getPublishedProjects();
  return mergePortfolioProjects(showcase, published);
}
