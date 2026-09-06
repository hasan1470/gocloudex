import User from "@/models/User";
import Message from "@/models/Message";
import { generatePassword } from "@/lib/email";
import { contactInput } from "@/lib/communication-validation";
import { allowed } from "@/lib/communication-server";
import { deliverContactMessage } from "@/lib/contact-delivery";
export async function saveContact(input: unknown, key: string) {
  const parsed = contactInput.safeParse(input);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };
  const data = parsed.data;
  if (data.website) return { success: true, message: "Message received." };
  if (!(await allowed(`contact:${key}`, 8, 600000)))
    return {
      success: false,
      error: "Please wait a few minutes before sending another enquiry.",
    };
  const prior = await Message.exists({ requestId: data.requestId });
  if (prior)
    return {
      success: true,
      message:
        "Your message is already saved. The team will reply to your email.",
    };
  const user = await User.findOneAndUpdate(
    { email: data.email },
    {
      $setOnInsert: {
        name: data.name,
        email: data.email,
        password: generatePassword(),
        chatRegistrationPending: true,
      },
    },
    { upsert: true, new: true },
  );
  let message;
  try {
    message = await Message.create({
      user: user._id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      requestId: data.requestId,
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000)
      return { success: true, message: "Your message is already saved." };
    throw error;
  }
  await User.updateOne(
    { _id: user._id },
    {
      $inc: { emailCount: 1, emailUnreadCount: 1 },
      $set: {
        lastEmailSubject: data.subject,
        lastEmailMessage: data.message.slice(0, 100),
        lastEmailDate: new Date(),
      },
    },
  );
  await deliverContactMessage(String(message._id));
  return {
    success: true,
    message:
      "Your message is saved in our inbox. The team will reply to the email address you provided.",
  };
}
