import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import Subscriber from "@/models/Subscriber";

export async function GET() {
    try {
        await dbConnect();

        const messageCount = await Contact.countDocuments();
        const subscriberCount = await Subscriber.countDocuments();
        const latestMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);

        // Diagnostics: List all collections to see if we're in the right DB
        const collections = await mongoose.connection.db?.listCollections().toArray();
        const collectionNames = collections?.map(c => c.name) || [];

        return NextResponse.json({
            success: true,
            connected: true,
            debug: {
                dbName: mongoose.connection.db?.databaseName,
                collections: collectionNames
            },
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
