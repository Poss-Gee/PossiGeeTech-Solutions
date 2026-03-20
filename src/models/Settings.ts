import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
    siteName: { type: String, default: "PossiGeeTech Solutions" },
    contactEmail: { type: String, default: "info@possigeetech.com" },
    supportPhone: { type: String, default: "+233 555 123 456" },
    maintenanceMode: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: true },
    newsletterSync: { type: Boolean, default: true },
    logoUrl: { type: String, default: "/images/logo.png" },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
