import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import Subscriber from "@/models/Subscriber";

export async function GET() {
    try {
        await dbConnect();

        const messageCount = await Contact.countDocuments();
        const subscriberCount = await Subscriber.countDocuments();
        const latestMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);

        return NextResponse.json({
            success: true,
            connected: true,
            stats: {
                messages: messageCount,
                subscribers: subscriberCount,
                proposals: 0 
            },
            messages: latestMessages
        });
    } catch (error: any) {
        console.error("Dashboard data fetch failed:", error.message);
        return NextResponse.json({ 
            success: false, 
            connected: false,
            error: error.message || "Failed to connect to database" 
        }, { status: 500 });
    }
}
