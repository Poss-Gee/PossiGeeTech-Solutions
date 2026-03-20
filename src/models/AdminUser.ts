import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Admin", "Editor"], default: "Editor" },
    status: { type: String, enum: ["Active", "Pending"], default: "Active" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
