import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
    email: String,
    password: { type: String, select: true },
    status: String,
    name: String,
    inviteToken: String
});

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function checkUser() {
    try {
        await mongoose.connect(MONGODB_URI);
        const user = await AdminUser.findOne({ email: "possigee96@gmail.com" });
        if (user) {
            console.log("-----------------------------------------");
            console.log(`User Found: ${user.name}`);
            console.log(`Status: ${user.status}`);
            console.log(`Invite Token: ${user.inviteToken || "NONE"}`);
            console.log("-----------------------------------------");
        } else {
            console.log("User not found!");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkUser();
