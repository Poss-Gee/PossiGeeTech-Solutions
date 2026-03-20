import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const updatedUser = await AdminUser.findByIdAndUpdate(id, body, { new: true });
        
        if (!updatedUser) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        console.log("Delete attempt for ID:", id);
        
        const deletedUser = await AdminUser.findByIdAndDelete(id);
        console.log("Deleted user result:", deletedUser ? "FOUND & DELETED" : "NOT FOUND");
        
        if (!deletedUser) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, message: "User deleted" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
