import process from "node:process";
import nextEnv from "@next/env";
import jwt from "jsonwebtoken";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const baseUrl = process.env.PORTFOLIO_CRUD_BASE_URL || "http://127.0.0.1:4324";
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is not configured");
const token = jwt.sign({ email: "portfolio-crud-check@gocloudex.local", role: "admin" }, secret, {
  expiresIn: "10m",
});
const headers = { Authorization: `Bearer ${token}` };
const suffix = Date.now().toString(36);
let categoryId;
let projectId;

async function jsonRequest(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`${options.method || "GET"} ${path}: ${payload.error || payload.message || response.status}`);
  }
  return payload;
}

try {
  const category = await jsonRequest("/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `CRUD Check ${suffix}`,
      description: "Temporary category used to verify dashboard operations.",
    }),
  });
  categoryId = category.data._id;

  const createData = new FormData();
  const createFields = {
    title: `CRUD Project ${suffix}`,
    description: "Temporary project used to verify dashboard operations.",
    categories: JSON.stringify([categoryId]),
    technologies: JSON.stringify(["Next.js"]),
    keyFeatures: JSON.stringify(["Create", "Update", "Delete"]),
    tags: JSON.stringify(["crud-check"]),
    walkthrough: JSON.stringify(["Create the record", "Edit it", "Remove it"]),
    projectOverview: "<p>Temporary verification content.</p>",
    imageAlt: "Temporary dashboard verification project",
    detailWidth: "1200",
    detailHeight: "675",
    kind: "Portfolio demo",
    role: "Dashboard verification",
    challenge: "Verify every project field passes through the dashboard API.",
    approach: "Create, read, update and delete one temporary draft.",
    note: "Temporary test record.",
    credit: "",
    projectUrl: "",
    githubUrl: "",
    featured: "false",
    status: "draft",
    completionDate: "2026-09-12",
    sortOrder: "9999",
  };
  for (const [key, value] of Object.entries(createFields)) createData.append(key, value);
  const created = await jsonRequest("/api/admin/projects", { method: "POST", body: createData });
  projectId = created.data._id;

  const fetched = await jsonRequest(`/api/admin/projects/${projectId}`);
  if (fetched.data.challenge !== createFields.challenge || fetched.data.walkthrough.length !== 3) {
    throw new Error("Created project did not preserve all case-study fields");
  }

  const updateData = new FormData();
  for (const [key, value] of Object.entries({
    ...createFields,
    title: `CRUD Project Updated ${suffix}`,
    role: "Verified dashboard workflow",
  })) updateData.append(key, value);
  const updated = await jsonRequest(`/api/admin/projects/${projectId}`, {
    method: "PUT",
    body: updateData,
  });
  if (updated.data.role !== "Verified dashboard workflow") {
    throw new Error("Project update did not persist");
  }

  await jsonRequest(`/api/admin/projects/${projectId}`, { method: "DELETE" });
  projectId = undefined;
  await jsonRequest(`/api/admin/categories/${categoryId}`, { method: "DELETE" });
  categoryId = undefined;
  console.log(JSON.stringify({ categories: "passed", projects: "passed", cleanup: "passed" }));
} finally {
  if (projectId) {
    await fetch(`${baseUrl}/api/admin/projects/${projectId}`, { method: "DELETE", headers }).catch(() => {});
  }
  if (categoryId) {
    await fetch(`${baseUrl}/api/admin/categories/${categoryId}`, { method: "DELETE", headers }).catch(() => {});
  }
}
