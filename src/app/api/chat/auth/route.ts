import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import User from "@/models/User";
import connectDB from "@/lib/database";
import { chatCookie, chatIdentity, chatSecret } from "@/lib/chat-auth";
import { emailAddress, plainLine } from "@/lib/communication-validation";
import {
  allowed,
  clientKey,
  jsonError,
  sameOrigin,
  smallJson,
} from "@/lib/communication-server";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 86400,
};
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);
  try {
    const input = z
      .object({
        mode: z.enum(["login", "register"]),
        name: plainLine(100).optional(),
        email: emailAddress,
        password: z.string().min(1).max(72),
      })
      .safeParse(await smallJson(request));
    if (!input.success) return jsonError("Enter a valid email and password.");
    if (!(await allowed(`auth:${clientKey(request)}`, 15, 600000)))
      return jsonError(
        "Too many attempts. Please try again in a few minutes.",
        429,
      );
    const { email, name, password, mode } = input.data;
    let user = await User.findOne({ email });
    if (mode === "register") {
      if (
        !name ||
        password.length < 8 ||
        Buffer.byteLength(password, "utf8") > 72
      )
        return jsonError("Use your name and a password of 8–72 bytes.");
      if (user && (!user.chatRegistrationPending || user.chats?.length))
        return jsonError(
          "If you already have an account, sign in with your existing password.",
          409,
        );
      const hashed = await bcrypt.hash(password, 12);
      user = user
        ? await User.findOneAndUpdate(
            {
              _id: user._id,
              chatRegistrationPending: true,
              chats: { $size: 0 },
            },
            {
              $set: { name, password: hashed, chatRegistrationPending: false },
            },
            { new: true },
          )
        : await User.create({ email, name, password: hashed });
      if (!user)
        return jsonError("Please sign in with your existing password.", 409);
    } else {
      const stored = user?.password || "";
      const valid = stored.startsWith("$2")
        ? await bcrypt.compare(password, stored)
        : !!stored &&
          Buffer.byteLength(stored) === Buffer.byteLength(password) &&
          timingSafeEqual(Buffer.from(stored), Buffer.from(password));
      if (!user || !valid)
        return jsonError("Email or password is incorrect.", 401);
      if (!stored.startsWith("$2"))
        await User.updateOne(
          { _id: user._id, password: stored },
          { $set: { password: await bcrypt.hash(password, 12) } },
        );
    }
    const token = jwt.sign({ userId: String(user._id) }, chatSecret(), {
      expiresIn: "7d",
    });
    const response = NextResponse.json({
      success: true,
      data: {
        user: { id: String(user._id), name: user.name, email: user.email },
      },
    });
    response.cookies.set(chatCookie, token, cookieOptions);
    return response;
  } catch {
    return jsonError("Unable to connect. Please try again.", 503);
  }
}
export async function GET(request: NextRequest) {
  const auth = chatIdentity(request);
  if (!auth) return jsonError("Not signed in", 401);
  await connectDB();
  const user = await User.findById(auth.userId).select("name email");
  if (!user) return jsonError("Not signed in", 401);
  const response = NextResponse.json(
    {
      success: true,
      data: {
        user: { id: String(user._id), name: user.name, email: user.email },
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
  if (!request.cookies.get(chatCookie))
    response.cookies.set(
      chatCookie,
      jwt.sign({ userId: String(user._id) }, chatSecret(), { expiresIn: "7d" }),
      cookieOptions,
    );
  return response;
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);
  const response = NextResponse.json({ success: true });
  response.cookies.set(chatCookie, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
