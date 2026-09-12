import mongoose, { Schema, Document } from 'mongoose';
import { deleteFromCloudinary } from '@/lib/upload';

export interface IProject extends Document {
  title: string;
  description: string;
  slug: string;
  categories: Schema.Types.ObjectId[]; // Changed from category to categories array
  image: string;
  detailImage?: string;
  imageAlt?: string;
  detailWidth?: number;
  detailHeight?: number;
  kind: 'Independent product' | 'Portfolio demo' | 'Client project';
  role: string;
  tags: string[];
  technologies: string[];
  keyFeatures: string[]; // New field for key features
  challenge: string;
  approach?: string;
  walkthrough: string[];
  note: string;
  credit?: string;
  projectOverview: string; // New field for rich text overview
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: Date;
  status: 'draft' | 'published' | 'archived';
  sortOrder: number;
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
    detailImage: { type: String },
    imageAlt: { type: String },
    detailWidth: { type: Number },
    detailHeight: { type: Number },
    kind: {
      type: String,
      enum: ['Independent product', 'Portfolio demo', 'Client project'],
      default: 'Portfolio demo',
    },
    role: { type: String, default: 'Design & development' },
    tags: [{ type: String }],
    technologies: [{ type: String }],
    keyFeatures: [{ type: String }], // Array of key features
    challenge: { type: String },
    approach: { type: String },
    walkthrough: [{ type: String }],
    note: { type: String },
    credit: { type: String },
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
    sortOrder: { type: Number, default: 100 },
  },
  { timestamps: true }
);

// Create indexes for better performance
ProjectSchema.index({ categories: 1 }); // Updated index
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ sortOrder: 1, completionDate: -1 });

// Delete image from Cloudinary when project is deleted
ProjectSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    try {
      const images = [doc.image, doc.detailImage].filter(Boolean);
      await Promise.all(images.map((image) => deleteFromCloudinary(image)));
      console.log(`Deleted image from Cloudinary for project: ${doc.title}`);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  }
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
