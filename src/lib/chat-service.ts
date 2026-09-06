import { Types } from "mongoose";
import User from "@/models/User";
import connectDB from "@/lib/database";
import { chatInput, isActive } from "@/lib/communication-validation";
import { allowed } from "@/lib/communication-server";

interface StoredChat {
  _id: Types.ObjectId;
  clientId?: string;
  message: string;
  sender: "user" | "admin";
  isRead: boolean;
  createdAt: Date;
}
interface ChatUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  chats: StoredChat[];
  lastSeenAt?: Date;
  adminSeenAt?: Date;
  userTypingUntil?: Date;
  adminTypingUntil?: Date;
}
export function messageDTO(message: StoredChat) {
  return {
    id: String(message._id),
    clientId: message.clientId,
    message: message.message,
    sender: message.sender,
    isRead: message.isRead,
    createdAt: new Date(message.createdAt).toISOString(),
  };
}
export async function chatHistory(
  userId: string,
  viewer: "user" | "admin",
  before?: string | null,
) {
  await connectDB();
  const user = await User.findById(userId)
    .select(
      "name email chats lastSeenAt adminSeenAt userTypingUntil adminTypingUntil chatCount chatUnreadCount",
    )
    .lean<ChatUser>();
  if (!user) return null;
  const all = (user.chats || []) as StoredChat[];
  const index = before
    ? all.findIndex((item) => String(item._id) === before)
    : all.length;
  const end = index < 0 ? 0 : index;
  const messages = all.slice(Math.max(0, end - 100), end).map(messageDTO);
  return {
    messages,
    hasMore: end > 100,
    user: { id: String(user._id), name: user.name, email: user.email },
    unread: all.filter(
      (message) => message.sender !== viewer && !message.isRead,
    ).length,
    peer: {
      online: isActive(viewer === "admin" ? user.lastSeenAt : user.adminSeenAt),
      typing:
        new Date(
          (viewer === "admin" ? user.userTypingUntil : user.adminTypingUntil) ||
            0,
        ).getTime() > Date.now(),
    },
  };
}
export async function sendChat(
  userId: string,
  sender: "user" | "admin",
  input: unknown,
) {
  const parsed = chatInput.safeParse(input);
  if (!parsed.success)
    throw new Error("Write a message of up to 4,000 characters.");
  if (!(await allowed(`chat:${sender}:${userId}`, 40, 60000)))
    throw new Error("Please slow down for a moment.");
  const { message, clientId } = parsed.data;
  const record = {
    _id: new Types.ObjectId(),
    clientId,
    message,
    sender,
    isRead: false,
    createdAt: new Date(),
  };
  await User.updateOne(
    { _id: userId, "chats.clientId": { $ne: clientId } },
    {
      $push: { chats: record },
      $inc: {
        chatCount: 1,
        ...(sender === "user" ? { chatUnreadCount: 1 } : {}),
      },
      $set: {
        lastChatMessage: message,
        lastChatDate: record.createdAt,
        [sender === "user" ? "userTypingUntil" : "adminTypingUntil"]: new Date(
          0,
        ),
      },
    },
  );
  const user = await User.findById(userId).select({
    chats: { $elemMatch: { clientId } },
  });
  if (!user?.chats?.[0] || user.chats[0].sender !== sender)
    throw new Error("Message could not be saved.");
  return messageDTO(user.chats[0]);
}
export async function updateChatActivity(
  userId: string,
  viewer: "user" | "admin",
  input: { typing?: boolean; readIds?: string[] },
) {
  await connectDB();
  const ids = (input.readIds || [])
    .slice(0, 100)
    .filter((id) => Types.ObjectId.isValid(id))
    .map((id) => new Types.ObjectId(id));
  const peer = viewer === "user" ? "admin" : "user";
  await User.updateOne({ _id: userId }, [
    {
      $set: {
        [viewer === "user" ? "lastSeenAt" : "adminSeenAt"]: new Date(),
        ...(typeof input.typing === "boolean"
          ? {
              [viewer === "user" ? "userTypingUntil" : "adminTypingUntil"]:
                new Date(input.typing ? Date.now() + 6000 : 0),
            }
          : {}),
        ...(ids.length
          ? {
              chats: {
                $map: {
                  input: "$chats",
                  as: "chat",
                  in: {
                    $cond: [
                      {
                        $and: [
                          { $in: ["$$chat._id", ids] },
                          { $eq: ["$$chat.sender", peer] },
                        ],
                      },
                      { $mergeObjects: ["$$chat", { isRead: true }] },
                      "$$chat",
                    ],
                  },
                },
              },
            }
          : {}),
      },
    },
    {
      $set: {
        chatUnreadCount: {
          $size: {
            $filter: {
              input: { $ifNull: ["$chats", []] },
              as: "chat",
              cond: {
                $and: [
                  { $eq: ["$$chat.sender", "user"] },
                  { $ne: ["$$chat.isRead", true] },
                ],
              },
            },
          },
        },
      },
    },
  ]);
}
