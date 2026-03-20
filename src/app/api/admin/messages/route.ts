import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function GET() {
    try {
        await dbConnect();
        const allMessages = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: allMessages });
    } catch (error: any) {
        console.error("Failed to fetch all messages:", error.message);
        return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
    }
}
