import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, phone, projectType, message } = body;

        // Basic validation
        if (!name || !email || !projectType || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 1. Save to DB
        const newContact = await Contact.create({
            name,
            email,
            phone,
            projectType,
            message,
        });

        // 2. Send email notification to Admin
        try {
            await resend.emails.send({
                from: "PossiGeeTech <onboarding@resend.dev>",
                to: ["myfake.possigee@gmail.com"],
                subject: `🚀 New Project Inquiry: ${projectType} from ${name}`,
                react: (
                    <ContactEmailTemplate
                        name={name}
                        email={email}
                        phone={phone}
                        projectType={projectType}
                        message={message}
                    />
                ),
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // We don't return an error here because the record was successfully saved to the DB
        }

        return NextResponse.json(
            { success: true, data: newContact },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("API error /api/contact:", error.message);
        return NextResponse.json(
            { error: "Failed to process request", message: error.message },
            { status: 500 }
        );
    }
}
