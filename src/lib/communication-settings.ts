import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import connectDB from "@/lib/database";
import Settings from "@/models/CommunicationSettings";

export interface MailSettings {
  inboxEmail: string;
  publicEmail: string;
  senderName: string;
  provider: "environment" | "gmail" | "smtp";
  smtpUser: string;
  smtpHost: string;
  smtpPort: 465 | 587;
  encryptedPassword?: string;
}
export const defaultMailSettings: MailSettings = {
  inboxEmail: "pandawebservice@gmail.com",
  publicEmail: "pandawebservice@gmail.com",
  senderName: "GoCloudEx",
  provider: "environment",
  smtpUser: "",
  smtpHost: "",
  smtpPort: 465,
};
function encryptionKey() {
  const secret = process.env.EMAIL_SETTINGS_KEY || process.env.JWT_SECRET;
  if (!secret) throw new Error("Mailbox encryption is not configured");
  return createHash("sha256").update(`gocloudex:mailbox:v1:${secret}`).digest();
}
export function encryptMailPassword(password: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const content = Buffer.concat([
    cipher.update(password, "utf8"),
    cipher.final(),
  ]);
  return [iv, cipher.getAuthTag(), content]
    .map((part) => part.toString("base64"))
    .join(".");
}
export function decryptMailPassword(encrypted: string) {
  const [iv, tag, content] = encrypted
    .split(".")
    .map((part) => Buffer.from(part, "base64"));
  const cipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  cipher.setAuthTag(tag);
  return Buffer.concat([cipher.update(content), cipher.final()]).toString(
    "utf8",
  );
}
export async function getMailSettings(): Promise<MailSettings> {
  await connectDB();
  const settings = await Settings.findById("communication")
    .select("+encryptedPassword")
    .lean();
  return { ...defaultMailSettings, ...settings } as MailSettings;
}
export function safeMailSettings(settings: MailSettings) {
  return {
    inboxEmail: settings.inboxEmail,
    publicEmail: settings.publicEmail,
    senderName: settings.senderName,
    provider: settings.provider,
    smtpUser: settings.smtpUser,
    smtpHost: settings.smtpHost,
    smtpPort: settings.smtpPort,
    hasPassword: !!settings.encryptedPassword,
    sendingAddress:
      settings.provider === "environment"
        ? process.env.EMAIL_USER || ""
        : settings.smtpUser,
    configured:
      settings.provider === "environment"
        ? !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
        : !!settings.encryptedPassword,
  };
}
