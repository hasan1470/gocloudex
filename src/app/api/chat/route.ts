import { NextRequest, NextResponse } from "next/server";
import { chatIdentity } from "@/lib/chat-auth";
import { chatHistory, sendChat, updateChatActivity } from "@/lib/chat-service";
import { jsonError, sameOrigin, smallJson } from "@/lib/communication-server";
import { z } from "zod";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const auth = chatIdentity(request);
  if (!auth) return jsonError("Please sign in to chat.", 401);
  try {
    const data = await chatHistory(
      auth.userId,
      "user",
      request.nextUrl.searchParams.get("before"),
    );
    return data
      ? NextResponse.json(
          { success: true, data },
          { headers: { "Cache-Control": "no-store" } },
        )
      : jsonError("Conversation not found", 404);
  } catch {
    return jsonError("Chat is reconnecting. Please try again.", 503);
  }
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);
  const auth = chatIdentity(request);
  if (!auth) return jsonError("Please sign in to chat.", 401);
  try {
    return NextResponse.json({
      success: true,
      data: {
        message: await sendChat(auth.userId, "user", await smallJson(request)),
      },
    });
  } catch {
    return jsonError(
      "Message not sent. Check your connection and try again.",
      400,
    );
  }
}
export async function PATCH(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);
  const auth = chatIdentity(request);
  if (!auth) return jsonError("Please sign in to chat.", 401);
  try {
    const input = z
      .object({
        typing: z.boolean().optional(),
        readIds: z
          .array(z.string().regex(/^[a-f0-9]{24}$/i))
          .max(100)
          .optional(),
      })
      .parse(await smallJson(request));
    await updateChatActivity(auth.userId, "user", input);
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Activity could not be updated", 400);
  }
}
