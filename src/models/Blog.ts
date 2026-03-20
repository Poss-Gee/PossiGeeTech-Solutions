import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
    imageUrl?: string;
    createdAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
