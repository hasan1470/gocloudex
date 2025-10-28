import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  messageCount: number;
  unreadCount: number;
  lastMessage: string;
  lastMessagePreview: string;
  messages: Array<{
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messageCount: { type: Number, default: 0 },
    unreadCount: { type: Number, default: 0 },
    lastMessage: { type: Date, default: Date.now },
    lastMessagePreview: { type: String, default: '' },
    messages: [{
      subject: { type: String, required: true },
      message: { type: String, required: true },
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

// Create index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ lastMessage: -1 });
UserSchema.index({ 'messages.createdAt': -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);