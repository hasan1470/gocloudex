import { z } from "zod";

export const emailAddress = z.string().trim().toLowerCase().email().max(254);
export const plainLine = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((s) => !/[\r\n]/.test(s), "Use a single line");
export const contactInput = z.object({
  name: plainLine(100),
  email: emailAddress,
  subject: plainLine(180),
  message: z.string().trim().min(10).max(10000),
  website: z.string().max(200).optional().default(""),
  requestId: z.string().uuid(),
});
export const chatInput = z.object({
  message: z.string().trim().min(1).max(4000),
  clientId: z.string().uuid(),
});
export const mailSettingsInput = z
  .object({
    inboxEmail: emailAddress,
    publicEmail: emailAddress,
    senderName: plainLine(80),
    provider: z.enum(["environment", "gmail", "smtp"]),
    smtpUser: z.string().trim().max(254),
    smtpHost: z.string().trim().max(253),
    smtpPort: z.union([z.literal(465), z.literal(587)]),
    password: z.string().max(500).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (
      data.provider !== "environment" &&
      !emailAddress.safeParse(data.smtpUser).success
    )
      ctx.addIssue({
        code: "custom",
        path: ["smtpUser"],
        message: "Enter the mailbox email address",
      });
    if (
      data.provider === "smtp" &&
      !/^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
        data.smtpHost,
      )
    )
      ctx.addIssue({
        code: "custom",
        path: ["smtpHost"],
        message: "Enter a public SMTP hostname",
      });
  });
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}
export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export function isActive(value?: Date | string | null, now = Date.now()) {
  return !!value && now - new Date(value).getTime() < 25000;
}
