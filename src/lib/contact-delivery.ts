import Message from "@/models/Message";
import { deliverMail, mailErrorMessage } from "@/lib/email";
import { getMailSettings } from "@/lib/communication-settings";
export async function deliverContactMessage(id: string) {
  const message = await Message.findOneAndUpdate(
    {
      _id: id,
      deliveryStatus: { $in: ["pending", "failed"] },
      $or: [
        { sendingAt: null },
        { sendingAt: { $lt: new Date(Date.now() - 60000) } },
      ],
    },
    { $set: { sendingAt: new Date() } },
    { new: true },
  );
  if (!message) return;
  try {
    const settings = await getMailSettings();
    await deliverMail(
      {
        to: message.isReply ? message.email : settings.inboxEmail,
        replyTo: message.isReply ? settings.inboxEmail : message.email,
        subject: message.isReply
          ? message.subject
          : `[Website enquiry] ${message.subject}`,
        text: message.isReply
          ? message.message
          : `From: ${message.name} <${message.email}>\nSubject: ${message.subject}\n\n${message.message}\n\nReply to this email to contact ${message.name}, or reply from the GoCloudEx dashboard.`,
      },
      settings,
    );
    await Message.updateOne(
      { _id: id },
      {
        $set: { deliveryStatus: "sent", deliveryError: "", sentAt: new Date() },
        $unset: { sendingAt: "" },
      },
    );
  } catch (error) {
    await Message.updateOne(
      { _id: id },
      {
        $set: {
          deliveryStatus: "failed",
          deliveryError: mailErrorMessage(error),
        },
        $unset: { sendingAt: "" },
      },
    );
  }
}
