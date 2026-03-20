import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Settings from "@/models/Settings";

export async function GET() {
    try {
        await dbConnect();
        let settings = await Settings.findOne({});
        if (!settings) {
            settings = await Settings.create({});
        }
        return NextResponse.json({ success: true, data: settings });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const settings = await Settings.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ success: true, data: settings });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
