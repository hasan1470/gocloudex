import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReply: boolean;
  repliedTo?: Schema.Types.ObjectId; // Reference to original message if this is a reply
  adminReply?: string; // Admin's reply message
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isReply: { type: Boolean, default: false },
    repliedTo: { type: Schema.Types.ObjectId, ref: 'Message' },
    adminReply: { type: String },
  },
  { timestamps: true }
);

// Create indexes for better query performance
MessageSchema.index({ user: 1, createdAt: -1 });
MessageSchema.index({ isRead: 1 });
MessageSchema.index({ email: 1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);