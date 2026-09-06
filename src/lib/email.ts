import nodemailer from "nodemailer";
import { randomBytes } from "node:crypto";
import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import {
  getMailSettings,
  decryptMailPassword,
  type MailSettings,
} from "@/lib/communication-settings";
import { escapeHtml } from "@/lib/communication-validation";

export function generatePassword() {
  return randomBytes(18).toString("base64url");
}
const blocked = new BlockList();
for (const [network, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.168.0.0", 16],
  ["192.0.0.0", 24],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const)
  blocked.addSubnet(network, prefix);
blocked.addAddress("::", "ipv6");
blocked.addAddress("::1", "ipv6");
blocked.addSubnet("fc00::", 7, "ipv6");
blocked.addSubnet("fe80::", 10, "ipv6");
blocked.addSubnet("ff00::", 8, "ipv6");
async function transport(settings: MailSettings) {
  const environment = settings.provider === "environment";
  const user = environment ? process.env.EMAIL_USER?.trim() : settings.smtpUser;
  const password = environment
    ? process.env.EMAIL_PASSWORD?.trim()
    : settings.encryptedPassword
      ? decryptMailPassword(settings.encryptedPassword)
      : "";
  if (!user || !password) throw new Error("MAIL_NOT_CONFIGURED");
  const gmail =
    settings.provider === "gmail" ||
    (environment && process.env.EMAIL_SERVICE_TYPE === "gmail");
  const hostname = gmail
    ? "smtp.gmail.com"
    : environment
      ? process.env.EMAIL_HOST || "smtp.hostinger.com"
      : settings.smtpHost;
  const port = gmail
    ? 465
    : environment
      ? Number(process.env.EMAIL_PORT || 587)
      : settings.smtpPort;
  let host = hostname;
  // Pin checked public addresses for dashboard-supplied SMTP hosts.
  if (!environment) {
    const addresses = await lookup(hostname, { all: true });
    if (
      !addresses.length ||
      addresses.some(({ address }) =>
        blocked.check(address, isIP(address) === 6 ? "ipv6" : "ipv4"),
      )
    )
      throw new Error("MAIL_HOST_NOT_PUBLIC");
    host =
      addresses.find(({ family }) => family === 4)?.address ||
      addresses[0].address;
  }
  const client = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: { servername: hostname, minVersion: "TLSv1.2" },
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return { client, user };
}
export function mailErrorMessage(error: unknown) {
  if ((error as { code?: string })?.code === "EAUTH")
    return "Mailbox authentication failed. Check the address and app password in Settings.";
  if (error instanceof Error && error.message === "MAIL_NOT_CONFIGURED")
    return "Connect a sending mailbox in Settings.";
  return "The mail server could not confirm delivery. Check the connection in Settings before retrying.";
}
export async function deliverMail(
  input: { to: string; subject: string; text: string; replyTo?: string },
  supplied?: MailSettings,
) {
  const settings = supplied || (await getMailSettings());
  const { client, user } = await transport(settings);
  const info = await client.sendMail({
    from: { name: settings.senderName, address: user },
    to: input.to,
    replyTo: input.replyTo || settings.inboxEmail,
    subject: input.subject,
    text: input.text,
    html: `<div style="font:16px/1.7 Arial,sans-serif;color:#172f3a;max-width:640px;margin:auto"><h2>${escapeHtml(settings.senderName)}</h2><div style="white-space:pre-wrap">${escapeHtml(input.text)}</div></div>`,
  });
  if (!info.accepted?.length) throw new Error("MAIL_NOT_ACCEPTED");
  return String(info.messageId);
}
export async function testEmailConnection(settings?: MailSettings) {
  const { client } = await transport(settings || (await getMailSettings()));
  await client.verify();
  return true;
}
// Compatibility with explicit account actions in the existing user manager.
export async function sendWelcomeEmail(data: {
  name: string;
  email: string;
  password: string;
  source?: string;
  isReminder?: boolean;
}) {
  await deliverMail({
    to: data.email,
    subject: "Your GoCloudEx account",
    text: `Hello ${data.name},\n\nYour account has been created by GoCloudEx.\nEmail: ${data.email}\nTemporary password: ${data.password}\n\nYou can sign in through the website chat.`,
  });
}
export async function sendUpdateEmail(data: {
  name: string;
  email: string;
  password: string;
  previousEmail?: string;
}) {
  await deliverMail({
    to: data.email,
    subject: "Your GoCloudEx account was updated",
    text: `Hello ${data.name},\n\nYour account details were updated by the GoCloudEx team.\nEmail: ${data.email}\nPassword: ${data.password}\n\nIf you did not request this, please contact us.`,
  });
}
