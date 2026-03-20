import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, select: true },
    status: String,
    inviteToken: String
});

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function setFixedPassword() {
    try {
        await mongoose.connect(MONGODB_URI);
        const email = "possigee96@gmail.com";
        const plainPassword = "AdminPassword123!"; // Temporary password
        
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        
        const result = await AdminUser.updateOne(
            { email },
            { 
                $set: { 
                    password: hashedPassword,
                    status: "Active",
                    inviteToken: null
                } 
            }
        );

        if (result.modifiedCount > 0) {
            console.log("-----------------------------------------");
            console.log(`Success! Password set for: ${email}`);
            console.log(`Temporary Password: ${plainPassword}`);
            console.log("-----------------------------------------");
            console.log(`Go to: http://localhost:3000/admin/login`);
            console.log("-----------------------------------------");
        } else {
            console.log("No user was modified. Check if the email matches.");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

setFixedPassword();
