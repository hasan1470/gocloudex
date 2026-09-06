import type { ProjectPreview } from "@/data/showcase";

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
