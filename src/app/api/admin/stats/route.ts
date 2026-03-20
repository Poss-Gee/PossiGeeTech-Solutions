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
            stats: {
                messages: messageCount,
                subscribers: subscriberCount,
                proposals: 0 
            },
            messages: latestMessages
        });
    } catch (error: any) {
        console.error("Dashboard data fetch failed:", error.message);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}
