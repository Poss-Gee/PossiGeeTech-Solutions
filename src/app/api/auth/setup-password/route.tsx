import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { token, password } = await req.json();

        // Find user by token
        const user = await AdminUser.findOne({ inviteToken: token });
        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user
        user.password = hashedPassword;
        user.status = "Active";
        user.inviteToken = undefined; // Clear token after use
        await user.save();

        return NextResponse.json({ success: true, message: "Password set successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
