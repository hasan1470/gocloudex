import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";

export function revalidatePortfolio(...slugs: Array<string | undefined>) {
  revalidateTag("projects", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/sitemap.xml");
  for (const slug of new Set(slugs.filter((slug): slug is string => Boolean(slug)))) {
    revalidatePath(`/portfolio/${slug}`);
  }
}

export function revalidateCategories() {
  revalidateTag("categories", { expire: 0 });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}
