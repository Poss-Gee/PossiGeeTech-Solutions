import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Subscriber from "@/models/Subscriber";
import { Resend } from "resend";
import { WelcomeEmailTemplate } from "@/components/emails/WelcomeEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        await dbConnect();
        const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: subscribers });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // 1. Save to DB
        const newSubscriber = await Subscriber.create({ email });

        // 2. Send Welcome Email to Subscriber
        try {
            await resend.emails.send({
                from: "PossiGeeTech <onboarding@resend.dev>",
                to: [email],
                subject: "Welcome to PossiGeeTech Solutions!",
                react: <WelcomeEmailTemplate email={email} />,
            });
        } catch (emailError) {
            console.error("Welcome email failed:", emailError);
        }

        return NextResponse.json({ success: true, data: newSubscriber }, { status: 201 });

    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Email already subscribed" },
                { status: 400 }
            );
        }
        console.error("API error /api/newsletter:", error.message);

        return NextResponse.json(
            { error: "Failed to process request", message: error.message },
            { status: 500 }
        );
    }
}
