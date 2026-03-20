import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
        }

        const user = await AdminUser.findOne({ inviteToken: token });
        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: { name: user.name } });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
