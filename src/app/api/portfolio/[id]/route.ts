import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const body = await req.json();
        const updatedProject = await Project.findByIdAndUpdate(params.id, body, { new: true });
        if (!updatedProject) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedProject });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const deletedProject = await Project.findByIdAndDelete(params.id);
        if (!deletedProject) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
