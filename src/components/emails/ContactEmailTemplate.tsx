import * as React from "react";

interface ContactEmailTemplateProps {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
    name,
    email,
    phone,
    projectType,
    message,
}) => (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
        <h2 style={{ color: "#EAB308" }}>New Lead from PossiGeeTech Website</h2>
        <p>You have received a new message through the contact form:</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Name:</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{name}</td>
            </tr>
            <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Email:</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{email}</td>
            </tr>
            <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Phone:</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{phone || "N/A"}</td>
            </tr>
            <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>Project Type:</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{projectType}</td>
            </tr>
        </table>
        <h3 style={{ marginTop: "20px" }}>Message:</h3>
        <p style={{ backgroundColor: "#f9f9f9", padding: "15px", borderLeft: "4px solid #EAB308" }}>{message}</p>
        <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "30px 0" }} />
        <p style={{ fontSize: "12px", color: "#666" }}>Sent from PossiGeeTech Solutions Contact System</p>
    </div>
);
