import { useState, useEffect } from "react";
import { Globe, Bell, Shield, Save, Loader2 } from "lucide-react";
import Toast from "@/components/ui/Toast";

export default function SettingsManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [settings, setSettings] = useState({
        siteName: "PossiGeeTech Solutions",
        contactEmail: "info@possigeetech.com",
        supportPhone: "+233 555 123 456",
        maintenanceMode: false,
        emailNotifications: true,
        newsletterSync: true,
        logoUrl: "/images/logo.png"
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.success) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                setToast({ message: "Settings saved successfully", type: "success" });
            } else {
                setToast({ message: "Failed to save settings", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Error saving settings", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-2xl md:text-3xl font-bold text-white">System Settings</h2>
                <p className="text-gray-400 mt-1 text-sm">Configure your platform preferences and contact information.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#1A1A1A] border border-[#333] p-4 sm:p-8 rounded-xl shadow-2xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#EAB308]" />
                            General Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Site Name</label>
                                <input 
                                    type="text" 
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Contact Email</label>
                                    <input 
                                        type="email" 
                                        value={settings.contactEmail}
                                        onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Support Phone</label>
                                    <input 
                                        type="text" 
                                        value={settings.supportPhone}
                                        onChange={(e) => setSettings({...settings, supportPhone: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Logo URL</label>
                                <input 
                                    type="text" 
                                    value={settings.logoUrl}
                                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1A1A1A] border border-[#333] p-4 sm:p-8 rounded-xl shadow-2xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-[#EAB308]" />
                            Notifications
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-white/5">
                                <div>
                                    <div className="text-white font-medium text-sm sm:text-base">Email Alerts</div>
                                    <div className="text-gray-400 text-xs sm:text-sm">Receive emails for new contact submissions.</div>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                                    className="w-5 h-5 sm:w-6 sm:h-6 accent-[#EAB308] bg-transparent border-white/10 rounded cursor-pointer"
                                />
                            </div>
                            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-white/5">
                                <div>
                                    <div className="text-white font-medium text-sm sm:text-base">Newsletter Automation</div>
                                    <div className="text-gray-400 text-xs sm:text-sm">Automatically sync new subscribers to mailing list.</div>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={settings.newsletterSync}
                                    onChange={(e) => setSettings({...settings, newsletterSync: e.target.checked})}
                                    className="w-5 h-5 sm:w-6 sm:h-6 accent-[#EAB308] bg-transparent border-white/10 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Status */}
                <div className="space-y-6">
                    <div className="bg-[#1A1A1A] border border-[#333] p-4 sm:p-8 rounded-xl shadow-2xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#EAB308]" />
                            System Status
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-white font-medium">API Core: Operational</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-white font-medium">Database: Connected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-white font-medium">Email Server: Online</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#EAB308] text-black font-extrabold rounded-xl hover:bg-[#CA8A04] transition-all shadow-xl shadow-[#EAB308]/10 group disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 transition-transform group-hover:scale-110" />}
                        {saving ? "Saving..." : "Save All Changes"}
                    </button>
                </div>
            </div>

            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </div>
    );
}
