import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getPortfolio } from "@/lib/portfolio";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPortfolio();
  const routes = [
    "/",
    "/services",
    "/portfolio",
    "/about",
    "/contact",
    ...services.map((service) => "/services/" + service.slug),
    ...projects.map((project) => "/portfolio/" + project.slug),
  ];
  return routes.map((path) => ({
    url: "https://gocloudex.com" + path,
    changeFrequency: path === "/portfolio" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
