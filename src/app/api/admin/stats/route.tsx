import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import Newsletter from "@/models/Subscriber";
import Portfolio from "@/models/Project";

export async function GET() {
    try {
        await dbConnect();
        
        const [messageCount, subscriberCount, projectCount, recentMessages] = await Promise.all([
            Contact.countDocuments(),
            Newsletter.countDocuments(),
            Portfolio.countDocuments(),
            Contact.find().sort({ createdAt: -1 }).limit(5)
        ]);

        return NextResponse.json({ 
            success: true, 
            stats: {
                messages: messageCount,
                subscribers: subscriberCount,
                proposals: 0, // Placeholder for future feature
                projects: projectCount
            },
            messages: recentMessages
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
