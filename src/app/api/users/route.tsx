import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";

export async function GET() {
    try {
        await dbConnect();
        const users = await AdminUser.find({}).sort({ createdAt: -1 });
        
        // If no users, return mock data for now so it's not empty
        if (users.length === 0) {
            return NextResponse.json({ 
                success: true, 
                data: [
                    { _id: "1", name: "Possi Gee", email: "possigee96@gmail.com", role: "Admin", status: "Active" }
                ],
                isMock: true
            });
        }

        return NextResponse.json({ success: true, data: users });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const newUser = await AdminUser.create(body);
        return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
