import { NextResponse } from "next/server";
import { saveContact } from "@/lib/contact-service";
import {
  clientKey,
  sameOrigin,
  smallJson,
  jsonError,
} from "@/lib/communication-server";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);
  try {
    const result = await saveContact(
      await smallJson(request),
      clientKey(request),
    );
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return jsonError("We could not save your message. Please try again.", 500);
  }
}
