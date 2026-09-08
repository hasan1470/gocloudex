import test from "node:test";
import assert from "node:assert/strict";
import { publicUrl, filterProjects } from "../src/lib/portfolio-utils.ts";
import { showcase } from "../src/data/showcase.ts";
import { services } from "../src/data/services.ts";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

test("case studies have separate lossless previews with accurate intrinsic dimensions", async () => {
  for (const project of showcase) {
    assert.notEqual(project.detailImage, project.image, project.slug);
    const bytes = await readFile(new URL(`../public${project.detailImage}`, import.meta.url));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.width, project.detailWidth, project.slug);
    assert.equal(metadata.height, project.detailHeight, project.slug);
    assert.ok(metadata.width >= 1200, project.slug);
    assert.equal(bytes.toString("ascii", 12, 16), "VP8L", project.slug + " must preserve screenshot pixels");
  }
});

test("public links reject local, private, executable and admin placeholders", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,hello",
    "http://localhost:3000/admin/projects/new",
    "http://127.0.0.1",
    "http://[::1]",
    "http://10.0.0.1",
    "http://192.168.1.1",
    "http://172.16.0.1",
    "https://preview.local",
    "https://user:password@example.com",
    "https://gocloudex.com/admin/projects",
  ])
    assert.equal(publicUrl(url), undefined, url);
  assert.equal(
    publicUrl("https://github.com/hasan1470/Toolstack"),
    "https://github.com/hasan1470/Toolstack",
  );
  assert.equal(
    publicUrl("https://toolstack-lovat.vercel.app"),
    "https://toolstack-lovat.vercel.app/",
  );
});
test("portfolio filters combine with search and handle old navigation links", () => {
  assert.deepEqual(
    filterProjects(showcase, "ecommerce", " next ").map((item) => item.slug),
    ["themefoundry", "vettedly", "storemind", "craftlab", "shopcart"],
  );
  assert.deepEqual(filterProjects(showcase, "healthcare", "toolstack"), []);
  assert.deepEqual(
    filterProjects(showcase, "all", "BLOGGER").map((item) => item.slug),
    ["journal"],
  );
  assert.deepEqual(
    filterProjects(showcase, "mobile", "").map((item) => item.slug),
    ["pocketwise"],
  );
  assert.deepEqual(
    filterProjects(showcase, "client", "").map((item) => item.slug),
    ["jenifurro"],
  );
  assert.equal(filterProjects(showcase, "all", "  ").length, showcase.length);
});
test("case-study links and related service projects resolve without invented entries", () => {
  const slugs = new Set(showcase.map((item) => item.slug));
  assert.equal(slugs.size, showcase.length);
  for (const project of showcase) {
    assert.ok(project.note);
    assert.ok(project.features.length > 0);
    if (project.liveUrl) assert.ok(publicUrl(project.liveUrl), project.slug);
    if (project.githubUrl)
      assert.ok(publicUrl(project.githubUrl), project.slug);
  }
  for (const service of services)
    for (const slug of service.projectSlugs)
      assert.ok(slugs.has(slug), service.slug + ": " + slug);
});
