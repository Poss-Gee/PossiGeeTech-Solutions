import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Admin", "Editor"], default: "Editor" },
    status: { type: String, enum: ["Active", "Pending"], default: "Pending" },
    password: { type: String },
    inviteToken: { type: String },
}, { timestamps: true });

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function resetAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const email = "possigee96@gmail.com";
        const token = crypto.randomBytes(32).toString("hex");

        const user = await AdminUser.findOneAndUpdate(
            { email },
            { 
                status: "Pending", 
                inviteToken: token,
                name: "Possi Gee",
                role: "Admin"
            },
            { upsert: true, new: true }
        );

        console.log("-----------------------------------------");
        console.log(`User: ${user.name} (${user.email})`);
        console.log(`Status set to: Pending`);
        console.log(`Invitation Token: ${token}`);
        console.log("-----------------------------------------");
        console.log(`Visit this link to set your password:`);
        console.log(`http://localhost:3000/admin/setup-password/${token}`);
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("Error resetting admin:", error);
    } finally {
        await mongoose.disconnect();
    }
}

resetAdmin();
