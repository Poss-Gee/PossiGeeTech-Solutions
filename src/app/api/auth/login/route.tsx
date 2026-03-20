import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_me_in_production";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        console.log("Login attempt for:", email);
        
        // Find user and explicitly include password
        const user = await AdminUser.findOne({ email }).select("+password");
        
        if (!user) {
            console.log("User not found in DB");
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        console.log("User found, status:", user.status);
        console.log("User has password in doc:", !!user.password);

        if (user.status !== "Active") {
            return NextResponse.json({ success: false, error: "Account pending" }, { status: 401 });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password || "");
        console.log("Password match result:", isMatch);
        
        if (!isMatch) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set cookie
        const response = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
        response.cookies.set("admin-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
