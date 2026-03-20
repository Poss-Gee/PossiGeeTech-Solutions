import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        await dbConnect();
        const post = await Blog.findOne({ slug: params.slug });
        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    try {
        await dbConnect();
        const body = await req.json();
        const updatedPost = await Blog.findOneAndUpdate({ slug: params.slug }, body, { new: true });
        if (!updatedPost) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    try {
        await dbConnect();
        const deletedPost = await Blog.findOneAndDelete({ slug: params.slug });
        if (!deletedPost) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Post deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
