"use server";
import { headers } from "next/headers";
import { saveContact } from "@/lib/contact-service";
export async function submitContactForm(data: { name: string; email: string; subject: string; message: string; requestId?: string }) {
  try { return await saveContact({ ...data, requestId: data.requestId || crypto.randomUUID() }, (await headers()).get("x-forwarded-for")?.split(",")[0] || "local"); }
  catch { return { success: false, error: "We could not save your message. Please try again." }; }
}
