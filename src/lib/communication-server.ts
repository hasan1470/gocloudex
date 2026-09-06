import { createHash } from "node:crypto";
import mongoose, { Schema } from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";

const limitSchema = new Schema({ _id: String, count: Number, expiresAt: Date });
limitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Limit =
  mongoose.models.CommunicationLimit ||
  mongoose.model("CommunicationLimit", limitSchema);
export async function allowed(key: string, maximum: number, windowMs: number) {
  await connectDB();
  const window = Math.floor(Date.now() / windowMs);
  const id = createHash("sha256").update(`${key}:${window}`).digest("hex");
  const result = await Limit.findOneAndUpdate(
    { _id: id },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date((window + 2) * windowMs) },
    },
    { upsert: true, new: true },
  );
  return result.count <= maximum;
}
export function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local"
  );
}
export function jsonError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  try {
    return (
      !origin ||
      new URL(origin).host ===
        (request.headers.get("host") || new URL(request.url).host)
    );
  } catch {
    return false;
  }
}
export async function smallJson(request: Request) {
  if (Number(request.headers.get("content-length")) > 24000)
    throw new Error("Request too large");
  const body = await request.text();
  if (body.length > 24000) throw new Error("Request too large");
  return JSON.parse(body);
}
