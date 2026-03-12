import * as React from "react";

interface WelcomeEmailTemplateProps {
    email: string;
}

export const WelcomeEmailTemplate: React.FC<Readonly<WelcomeEmailTemplateProps>> = ({
    email,
}) => (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333", textAlign: "center", padding: "40px" }}>
        <img
            src="https://possigeetech.com/logo.png"
            alt="PossiGeeTech Logo"
            style={{ width: "80px", marginBottom: "20px" }}
        />
        <h1 style={{ color: "#EAB308" }}>Welcome to PossiGeeTech!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You&apos;ll be the first to know about our latest tech insights, project launches, and digital solutions.</p>
        <div style={{ margin: "40px 0" }}>
            <a
                href="https://possigeetech.com"
                style={{ backgroundColor: "#EAB308", color: "#000", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
            >
                Visit Our Website
            </a>
        </div>
        <p style={{ fontSize: "12px", color: "#999" }}>
            You are receiving this because {email} subscribed to the PossiGeeTech newsletter.
        </p>
    </div>
);
