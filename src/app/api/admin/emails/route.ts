import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import { verifyAdminAuth } from "@/middlewares/authAdmin";
import Message from "@/models/Message";
import User from "@/models/User";
import connectDB from "@/lib/database";
import { deliverContactMessage } from "@/lib/contact-delivery";
import { allowed, jsonError, smallJson } from "@/lib/communication-server";
import { escapeRegex } from "@/lib/communication-validation";
const idSchema = z.string().regex(/^[a-f0-9]{24}$/i);
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (id) {
      if (!idSchema.safeParse(id).success) return jsonError("Invalid enquiry");
      const message = await Message.findOne({ _id: id, isReply: false }).lean();
      if (!message) return jsonError("Enquiry not found", 404);
      const replies = await Message.find({ repliedTo: id, isReply: true })
        .sort({ createdAt: 1 })
        .lean();
      return NextResponse.json({ success: true, data: { message, replies } });
    }
    const search = escapeRegex(
      (request.nextUrl.searchParams.get("q") || "").slice(0, 100),
    );
    const page = Math.max(
      1,
      Math.min(10000, Number(request.nextUrl.searchParams.get("page")) || 1),
    );
    const query = {
      isReply: false,
      ...(request.nextUrl.searchParams.get("unread") === "1"
        ? { isRead: false }
        : {}),
      ...(search
        ? {
            $or: ["name", "email", "subject"].map((field) => ({
              [field]: { $regex: search, $options: "i" },
            })),
          }
        : {}),
    };
    const [messages, total] = await Promise.all([
      Message.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * 25)
        .limit(25)
        .lean(),
      Message.countDocuments(query),
    ]);
    // Preserve access to older enquiries for which only a summary was ever stored.
    const legacy =
      page === 1 && !search
        ? await User.aggregate([
            { $match: { emailCount: { $gt: 0 } } },
            {
              $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "user",
                as: "savedMessages",
              },
            },
            { $match: { "savedMessages.0": { $exists: false } } },
            { $sort: { lastEmailDate: -1 } },
            { $limit: 25 },
            {
              $project: {
                name: 1,
                email: 1,
                lastEmailSubject: 1,
                lastEmailMessage: 1,
                lastEmailDate: 1,
              },
            },
          ])
        : [];
    return NextResponse.json(
      { success: true, data: { messages, legacy, page, total } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return jsonError("Could not load enquiries", 503);
  }
}
export async function PATCH(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    const input = z
      .object({ id: idSchema, action: z.enum(["read", "unread", "retry"]) })
      .parse(await smallJson(request));
    await connectDB();
    if (input.action === "retry") {
      await deliverContactMessage(input.id);
    } else {
      const message = await Message.findOneAndUpdate(
        { _id: input.id, isReply: false },
        { $set: { isRead: input.action === "read" } },
        { new: true },
      );
      if (!message) return jsonError("Enquiry not found", 404);
      const count = await Message.countDocuments({
        user: message.user,
        isReply: false,
        isRead: false,
      });
      await User.updateOne(
        { _id: message.user },
        { $set: { emailUnreadCount: count } },
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Could not update enquiry");
  }
}
export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    const input = z
      .object({
        id: idSchema,
        message: z.string().trim().min(1).max(10000),
        requestId: z.string().uuid(),
      })
      .parse(await smallJson(request));
    if (!(await allowed(`reply:${auth.user.email}`, 40, 60000)))
      return jsonError("Please wait before sending more replies.", 429);
    const parent = await Message.findOne({ _id: input.id, isReply: false });
    if (!parent) return jsonError("Enquiry not found", 404);
    const reply = await Message.findOneAndUpdate(
      { requestId: input.requestId },
      {
        $setOnInsert: {
          _id: new Types.ObjectId(),
          requestId: input.requestId,
          user: parent.user,
          name: parent.name,
          email: parent.email,
          subject: `Re: ${parent.subject}`,
          message: input.message,
          isReply: true,
          isRead: true,
          repliedTo: parent._id,
          deliveryStatus: "pending",
        },
      },
      { upsert: true, new: true },
    );
    if (String(reply.repliedTo) !== input.id)
      return jsonError("Invalid reply request");
    await deliverContactMessage(String(reply._id));
    const saved = await Message.findById(reply._id).lean();
    return NextResponse.json({ success: true, data: saved });
  } catch {
    return jsonError("Could not save the reply. Please try again.", 500);
  }
}
