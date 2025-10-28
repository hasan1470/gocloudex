import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  
  // Email System Fields (simplified)
  emailCount: number;
  emailUnreadCount: number;
  lastEmailSubject: string;
  lastEmailMessage: string;
  lastEmailDate: Date;
  
  // Chat System Fields
  chatCount: number;
  chatUnreadCount: number;
  lastChatMessage: string;
  lastChatDate: Date;
  chats: Array<{
    message: string;
    sender: 'user' | 'admin';
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
    
    // Email System (simplified - no emails array)
    emailCount: { type: Number, default: 0 },
    emailUnreadCount: { type: Number, default: 0 },
    lastEmailSubject: { type: String, default: '' },
    lastEmailMessage: { type: String, default: '' },
    lastEmailDate: { type: Date, default: Date.now },
    
    // Chat System
    chatCount: { type: Number, default: 0 },
    chatUnreadCount: { type: Number, default: 0 },
    lastChatMessage: { type: String, default: '' },
    lastChatDate: { type: Date, default: Date.now },
    chats: [{
      message: { type: String, required: true },
      sender: { type: String, enum: ['user', 'admin'], required: true },
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

// Create indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ lastEmailDate: -1 });
UserSchema.index({ lastChatDate: -1 });
UserSchema.index({ 'chats.createdAt': -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);