import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import nextEnv from "@next/env";
import { showcase } from "../src/data/showcase.ts";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const configuredMongoUri = process.env.MONGODB_URI;
if (!configuredMongoUri) throw new Error("MONGODB_URI is not configured");
const mongoUri: string = configuredMongoUri;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadAsset(filePath: string, publicId: string) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing portfolio image: ${filePath}`);
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    resource_type: "image",
    overwrite: true,
    invalidate: true,
  });
  return result.secure_url;
}

async function main() {
  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || "gocloudex",
    serverSelectionTimeoutMS: 10000,
  });
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not provide a database");
  const categories = db.collection("categories");
  const projects = db.collection("projects");

  const existing = await projects
    .find({ slug: { $in: showcase.map((project) => project.slug) } })
    .project({ slug: 1 })
    .toArray();
  const existingSlugs = new Set(existing.map((project) => String(project.slug)));
  const planned = showcase.filter((project) => force || !existingSlugs.has(project.slug));

  console.log(
    JSON.stringify({ dryRun, force, seedProjects: showcase.length, existing: existing.length, planned: planned.length }),
  );
  if (dryRun) return;

  await projects.updateMany(
    {},
    [
      {
        $set: {
          sortOrder: { $ifNull: ["$sortOrder", 100] },
          kind: { $ifNull: ["$kind", "Portfolio demo"] },
          role: { $ifNull: ["$role", "Design & development"] },
          tags: { $ifNull: ["$tags", []] },
          challenge: { $ifNull: ["$challenge", "$description"] },
          approach: { $ifNull: ["$approach", ""] },
          walkthrough: { $ifNull: ["$walkthrough", []] },
          note: {
            $ifNull: [
              "$note",
              "This project is managed from the GoCloudEx dashboard. Public live and source links appear when valid web addresses are provided.",
            ],
          },
          credit: { $ifNull: ["$credit", ""] },
          imageAlt: { $ifNull: ["$imageAlt", ""] },
        },
      },
    ],
  );

  const categoryIds = new Map<string, mongoose.Types.ObjectId>();
  for (const project of showcase) {
    const slug = slugify(project.category);
    const result = await categories.findOneAndUpdate(
      { slug },
      {
        $set: { name: project.category, slug, updatedAt: new Date() },
        $setOnInsert: {
          _id: new mongoose.Types.ObjectId(),
          description: `Projects in ${project.category}.`,
          createdAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
    if (!result) throw new Error(`Could not create category ${project.category}`);
    categoryIds.set(slug, result._id as mongoose.Types.ObjectId);
  }

  for (const [index, project] of showcase.entries()) {
    if (!force && existingSlugs.has(project.slug)) {
      console.log(`skip ${project.slug}: already managed in MongoDB`);
      continue;
    }
    const cardPath = path.join(process.cwd(), "public", project.image.replace(/^\//, ""));
    const detailPath = path.join(
      process.cwd(),
      "public",
      (project.detailImage || project.image).replace(/^\//, ""),
    );
    const image = await uploadAsset(cardPath, `gocloudex/projects/portfolio-${project.slug}-card`);
    const detailImage = await uploadAsset(
      detailPath,
      `gocloudex/projects/portfolio-${project.slug}-detail`,
    );
    const categoryId = categoryIds.get(slugify(project.category));
    const now = new Date();
    const document = {
      title: project.title,
      description: project.summary,
      slug: project.slug,
      categories: categoryId ? [categoryId] : [],
      image,
      detailImage,
      imageAlt: project.imageAlt,
      detailWidth: project.detailWidth,
      detailHeight: project.detailHeight,
      kind: project.kind,
      role: project.role,
      tags: project.tags,
      technologies: project.stack,
      keyFeatures: project.features,
      challenge: project.challenge,
      approach: project.approach,
      walkthrough: project.walkthrough,
      note: project.note,
      credit: project.credit || "",
      projectOverview: project.overviewHtml || "",
      projectUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: index < 4,
      completionDate: new Date(Date.UTC(2026, 7, 31 - index)),
      status: "published",
      sortOrder: index + 1,
      updatedAt: now,
    };
    await projects.updateOne(
      { slug: project.slug },
      force
        ? { $set: document, $setOnInsert: { createdAt: now } }
        : { $setOnInsert: { ...document, createdAt: now } },
      { upsert: true },
    );
    console.log(`migrated ${project.slug}`);
  }

  await Promise.all([
    projects.createIndex({ slug: 1 }, { unique: true }),
    projects.createIndex({ sortOrder: 1, completionDate: -1 }),
    categories.createIndex({ slug: 1 }, { unique: true }),
  ]);
  console.log("Portfolio migration complete");
}

try {
  await main();
} finally {
  await mongoose.disconnect();
}
