import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define MONGODB_URI");
    process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
    email: String,
    password: { type: String, select: true },
    status: String,
});

const AdminUser = mongoose.models.AdminUserTest || mongoose.model("AdminUserTest", AdminUserSchema, "adminusers");

async function testLoginLogic() {
    try {
        await mongoose.connect(MONGODB_URI);
        const email = "possigee96@gmail.com";
        const passwordToTest = "AdminPassword123!";
        
        console.log(`Testing login for: ${email}`);
        
        const user = await AdminUser.findOne({ email });
        if (!user) {
            console.log("Error: User not found in DB");
            return;
        }
        
        console.log(`User found. Status: ${user.status}`);
        console.log(`Has password field in result: ${user.password ? "YES" : "NO"}`);
        
        if (user.password) {
            const isMatch = await bcrypt.compare(passwordToTest, user.password);
            console.log(`Bcrypt compare result: ${isMatch}`);
        }
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testLoginLogic();
