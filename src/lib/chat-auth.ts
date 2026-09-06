import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export const chatCookie = "gocloudex_chat";
export function chatSecret() {
  if (!process.env.JWT_SECRET)
    throw new Error("Chat authentication is not configured");
  return process.env.JWT_SECRET;
}
export function chatIdentity(request: NextRequest) {
  const token =
    request.cookies.get(chatCookie)?.value ||
    request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  try {
    const value = jwt.verify(token, chatSecret());
    if (
      typeof value === "string" ||
      value.role ||
      typeof value.userId !== "string" ||
      !/^[a-f0-9]{24}$/i.test(value.userId)
    )
      return null;
    return { userId: value.userId };
  } catch {
    return null;
  }
}
