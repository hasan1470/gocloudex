import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/middlewares/authAdmin";
import Settings from "@/models/CommunicationSettings";
import {
  getMailSettings,
  safeMailSettings,
  encryptMailPassword,
} from "@/lib/communication-settings";
import { mailSettingsInput } from "@/lib/communication-validation";
import { jsonError, smallJson } from "@/lib/communication-server";
import { mailErrorMessage, testEmailConnection } from "@/lib/email";
export async function GET(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    return NextResponse.json(
      { success: true, data: safeMailSettings(await getMailSettings()) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return jsonError("Could not load mailbox settings", 500);
  }
}
export async function PUT(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    const input = mailSettingsInput.safeParse(await smallJson(request));
    if (!input.success) return jsonError(input.error.issues[0].message);
    const current = await getMailSettings();
    const { password, ...values } = input.data;
    const sameMailbox =
      current.provider === values.provider &&
      current.smtpUser === values.smtpUser &&
      current.smtpHost === values.smtpHost;
    const encryptedPassword = password
      ? encryptMailPassword(
          values.provider === "gmail" ? password.replace(/\s/g, "") : password,
        )
      : sameMailbox
        ? current.encryptedPassword
        : undefined;
    if (values.provider !== "environment" && !encryptedPassword)
      return jsonError(
        "Enter an app password when connecting or changing the sending mailbox.",
      );
    await Settings.findOneAndUpdate(
      { _id: "communication" },
      { $set: { ...values, encryptedPassword: encryptedPassword || "" } },
      { upsert: true },
    );
    return NextResponse.json({
      success: true,
      data: safeMailSettings({ ...values, encryptedPassword }),
    });
  } catch {
    return jsonError("Could not save mailbox settings", 500);
  }
}
export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;
  try {
    await testEmailConnection();
    return NextResponse.json({
      success: true,
      message: "Mailbox connection verified. No email was sent.",
    });
  } catch (error) {
    return jsonError(mailErrorMessage(error), 422);
  }
}
