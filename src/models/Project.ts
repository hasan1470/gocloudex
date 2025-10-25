import mongoose, { Schema, Document } from 'mongoose';
import { deleteFromCloudinary } from '@/lib/upload';

export interface IProject extends Document {
  title: string;
  description: string;
  slug: string;
  categories: Schema.Types.ObjectId[]; // Changed from category to categories array
  image: string;
  technologies: string[];
  keyFeatures: string[]; // New field for key features
  projectOverview: string; // New field for rich text overview
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: Date;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categories: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    }], // Array of categories
    image: { type: String },
    technologies: [{ type: String }],
    keyFeatures: [{ type: String }], // Array of key features
    projectOverview: { type: String }, // HTML content for project overview
    projectUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    completionDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    },
  },
  { timestamps: true }
);

// Create indexes for better performance
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ categories: 1 }); // Updated index
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ status: 1 });

// Delete image from Cloudinary when project is deleted
ProjectSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.image) {
    try {
      await deleteFromCloudinary(doc.image);
      console.log(`Deleted image from Cloudinary for project: ${doc.title}`);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  }
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);