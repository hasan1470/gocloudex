import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import User from "@/models/User";
import connectDB from "@/lib/database";
import { verifyAdminAuth } from "@/middlewares/authAdmin";
import { chatHistory, sendChat, updateChatActivity } from "@/lib/chat-service";
import { isActive } from "@/lib/communication-validation";
import { jsonError, smallJson } from "@/lib/communication-server";
const idSchema = z.string().regex(/^[a-f0-9]{24}$/i);
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("userId");
    if (id) {
      if (!idSchema.safeParse(id).success)
        return jsonError("Invalid conversation");
      const data = await chatHistory(
        id,
        "admin",
        request.nextUrl.searchParams.get("before"),
      );
      return data
        ? NextResponse.json({ success: true, data })
        : jsonError("Conversation not found", 404);
    }
    const users = await User.find({ chatCount: { $gt: 0 } })
      .select(
        "name email lastChatDate lastChatMessage chatUnreadCount lastSeenAt",
      )
      .sort({ lastChatDate: -1 })
      .limit(100)
      .lean();
    return NextResponse.json(
      {
        success: true,
        data: {
          users: users.map((user) => ({
            id: String(user._id),
            name: user.name,
            email: user.email,
            lastChatDate: user.lastChatDate,
            lastChatMessage: user.lastChatMessage,
            chatUnreadCount: user.chatUnreadCount,
            isOnline: isActive(user.lastSeenAt),
          })),
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return jsonError("Could not load conversations", 503);
  }
}
export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    const input = await smallJson(request);
    const id = idSchema.parse(input.userId);
    return NextResponse.json({
      success: true,
      data: { message: await sendChat(id, "admin", input) },
    });
  } catch {
    return jsonError("Reply not sent. Please try again.");
  }
}
export async function PATCH(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    const input = z
      .object({
        userId: idSchema,
        typing: z.boolean().optional(),
        readIds: z.array(idSchema).max(100).optional(),
      })
      .parse(await smallJson(request));
    await updateChatActivity(input.userId, "admin", input);
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Activity could not be updated");
  }
}
