import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Newsletter from "@/models/Subscriber";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedSubscriber = await Newsletter.findByIdAndDelete(id);
        
        if (!deletedSubscriber) {
            return NextResponse.json({ success: false, error: "Subscriber not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, message: "Subscriber removed" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
