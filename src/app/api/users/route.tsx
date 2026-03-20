import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/AdminUser";
import { Resend } from "resend";
import { InviteEmail } from "@/components/emails/InviteEmail";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        await dbConnect();
        const users = await AdminUser.find({}).sort({ createdAt: -1 });
        
        if (users.length === 0) {
            return NextResponse.json({ 
                success: true, 
                data: [
                    { _id: "1", name: "Possi Gee", email: "possigee96@gmail.com", role: "Admin", status: "Active" }
                ],
                isMock: true
            });
        }

        return NextResponse.json({ success: true, data: users });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        console.log("Creating new user with body:", body);
        
        // Generate a unique token for the invitation
        const inviteToken = crypto.randomBytes(32).toString("hex");
        
        const userData = {
            ...body,
            status: "Pending",
            inviteToken,
        };

        const newUser = await AdminUser.create(userData);
        console.log("User created in DB:", newUser._id);

        // Send the invitation email
        if (process.env.RESEND_API_KEY) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
                const inviteLink = `${baseUrl}/admin/setup-password/${inviteToken}`;

                await resend.emails.send({
                    from: "PossiGeeTech <onboarding@resend.dev>", // Replace with your verified domain
                    to: newUser.email,
                    subject: "You've been invited to join the PossiGeeTech Team",
                    react: <InviteEmail name={newUser.name} inviteLink={inviteLink} companyName="PossiGeeTech" />,
                });
                console.log("Invitation email sent to:", newUser.email);
            } catch (emailError) {
                console.error("Failed to send invitation email:", emailError);
                // Don't fail the whole request if email fails, but maybe log it
            }
        }

        return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    } catch (error: any) {
        console.error("Invitation error details:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
