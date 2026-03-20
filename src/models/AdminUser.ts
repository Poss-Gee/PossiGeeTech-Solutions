import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Admin", "Editor"], default: "Editor" },
    status: { type: String, enum: ["Active", "Pending"], default: "Pending" },
    password: { type: String, select: false }, // Use select: false by default for security
    inviteToken: { type: String }, // For first-time setup
}, { timestamps: true });

export default mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
