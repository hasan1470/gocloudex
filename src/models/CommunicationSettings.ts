import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    _id: { type: String, default: "communication" },
    inboxEmail: String,
    publicEmail: String,
    senderName: String,
    provider: { type: String, enum: ["environment", "gmail", "smtp"] },
    smtpUser: String,
    smtpHost: String,
    smtpPort: Number,
    encryptedPassword: { type: String, select: false },
  },
  { timestamps: true },
);
export default mongoose.models.CommunicationSettings ||
  mongoose.model("CommunicationSettings", schema);
