import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    title: string;
    category: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
    liveUrl?: string;
    sourceUrl?: string;
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String },
    liveUrl: { type: String },
    sourceUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
