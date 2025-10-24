import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  messageCount: number;
  unreadCount: number;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    messageCount: { type: Number, default: 0 },
    unreadCount: { type: Number, default: 0 },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ lastMessageAt: -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);