"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    MessageSquare, 
    BookOpen, 
    Briefcase, 
    Users, 
    Bell, 
    Settings, 
    LogOut,
    Menu,
    X,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Info,
    FileText,
    Mail,
    Newspaper,
    Clock,
    Loader2,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BlogManager from "@/components/admin/BlogManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import NewsletterManager from "@/components/admin/NewsletterManager";
import UsersManager from "@/components/admin/UsersManager";
import SettingsManager from "@/components/admin/SettingsManager";

interface AdminMessage {
    _id: string;
    name: string;
    email: string;
    projectType: string;
    message: string;
    createdAt: string;
}

interface DashboardStats {
    messages: number;
    subscribers: number;
    proposals: number;
}

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState<"messages" | "blog" | "portfolio" | "newsletter" | "users" | "settings">("messages");
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [messages, setMessages] = useState<AdminMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [demoMode, setDemoMode] = useState(false);
    const [connected, setConnected] = useState<boolean | null>(null); 
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock data for Demo Mode
    const mockStats = { messages: 12, subscribers: 48, proposals: 3 };
    const mockMessages: AdminMessage[] = [
        { _id: "m1", name: "Sarah Connor", email: "sarah@cyberdyne.com", projectType: "Security", message: "Protect the future.", createdAt: new Date().toISOString() },
        { _id: "m2", name: "John Doe", email: "john@example.com", projectType: "Web App", message: "Need a modern portfolio.", createdAt: new Date().toISOString() },
        { _id: "m3", name: "Emily Watson", email: "emily@design.com", projectType: "UI/UX", message: "Looking for a website redesign.", createdAt: new Date().toISOString() }
    ];

    useEffect(() => {
        const saved = localStorage.getItem("adminDemoMode");
        if (saved === "true") setDemoMode(true);
    }, []);

    const toggleDemoMode = () => {
        const newVal = !demoMode;
        setDemoMode(newVal);
        localStorage.setItem("adminDemoMode", String(newVal));
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                
                if (data.success && data.connected) {
                    setConnected(true);
                    setStats(data.stats);
                    setMessages(data.messages || []);
                } else {
                    setConnected(false);
                    setErrorMsg(data.error || "Failed to connect to database");
                    setStats({ messages: 0, subscribers: 0, proposals: 0 });
                    setMessages([]);
                }
            } catch (error: any) {
                console.error("Failed to fetch dashboard data:", error);
                setConnected(false);
                setErrorMsg(error.message || "An unexpected error occurred");
                setStats({ messages: 0, subscribers: 0, proposals: 0 });
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const fetchAllMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/messages");
            const data = await res.json();
            if (data.success) {
                setMessages(data.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch all messages:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#EAB308] animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col border-t border-[#1E1E1E]">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0A0A0A] sticky top-0 z-[100]">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={120} height={72} className="h-12 w-auto object-contain" />
                    <span className="text-[#EAB308] font-bold text-xl uppercase tracking-wider hidden xs:block">Admin</span>
                </div>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-white hover:bg-white/5 rounded-md transition-colors"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1">
                {/* Mobile Sidebar (Animated) */}
                <AnimatePresence mode="wait">
                    {isMenuOpen && (
                        <motion.aside 
                            key="mobile-sidebar"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[999] flex md:hidden bg-[#0A0A0A] p-6 flex-col"
                        >
                            {/* Mobile overlay background (clicking outside content) */}
                            <div className="absolute inset-0 bg-black/60 -z-10" onClick={() => setIsMenuOpen(false)} />
                            
                            <div className="mb-10 px-2 flex justify-between items-center">
                                <Image src="/logo.png" alt="Logo" width={140} height={84} className="h-14 w-auto object-contain" />
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="space-y-4 flex-grow">
                                {[
                                    { id: "messages", label: "Messages", icon: MessageSquare },
                                    { id: "blog", label: "Blog", icon: Newspaper },
                                    { id: "newsletter", label: "Newsletter", icon: Mail },
                                    { id: "portfolio", label: "Portfolio", icon: Briefcase },
                                    { id: "users", label: "Users", icon: Users },
                                    { id: "settings", label: "Settings", icon: Settings },
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => {
                                            setActiveView(item.id as any);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-4 w-full px-4 py-4 text-lg font-bold rounded-xl transition-all ${activeView === item.id ? "bg-[#EAB308] text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <item.icon className="w-6 h-6" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-auto pt-6 border-t border-white/10">
                                <Link href="/" className="flex items-center gap-4 w-full px-4 py-4 text-gray-400 hover:text-red-400 font-bold text-lg">
                                    <LogOut className="w-6 h-6" />
                                    Logout
                                </Link>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar (Always visible) */}
                <aside className="hidden md:flex md:w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex-col relative h-[calc(100vh-80px)] sticky top-0">
                    <div className="mb-10 px-2">
                        <Image src="/logo.png" alt="Logo" width={140} height={84} className="h-14 w-auto object-contain mb-6" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest block">Dashboard</span>
                    </div>

                    <nav className="space-y-2 flex-grow">
                        {[
                            { id: "messages", label: "Messages", icon: MessageSquare },
                            { id: "blog", label: "Blog", icon: Newspaper },
                            { id: "newsletter", label: "Newsletter", icon: Mail },
                            { id: "portfolio", label: "Portfolio", icon: Briefcase },
                            { id: "users", label: "Users", icon: Users },
                            { id: "settings", label: "Settings", icon: Settings },
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveView(item.id as any)}
                                className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === item.id ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10">
                        <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 font-medium rounded-md transition-colors">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Link>
                    </div>
                </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                {activeView === "messages" && (
                    <>
                        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col">
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Admin Dashboard
                                </h1>
                                <p className="text-gray-400 text-sm">Welcome back, Administrator</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {demoMode && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-full text-[#EAB308] text-xs font-bold animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                                        DEMO MODE ACTIVE
                                    </div>
                                )}
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                    <span className="text-[#EAB308] font-bold">A</span>
                                </div>
                            </div>
                        </header>
                        
                        {/* Connection Status Banners */}
                        {connected === false && !demoMode && (
                            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between gap-3 text-red-400">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 animate-pulse" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Database Connection Failed (Production)</p>
                                        <p className="text-xs text-red-300 mb-1">{errorMsg}</p>
                                        <p className="text-xs text-red-300/60 font-medium italic">Check your Vercel settings for <span className="font-mono bg-red-500/20 px-1 rounded not-italic">MONGODB_URI</span>.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={toggleDemoMode}
                                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                                >
                                    Try Demo Mode
                                </button>
                            </div>
                        )}

                        {connected === true && (stats?.messages === 0 && stats?.subscribers === 0) && !demoMode && (
                            <div className="mb-8 p-4 bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-xl flex items-center justify-between gap-3 text-[#EAB308]">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Database Connected (No Content Found)</p>
                                        <p className="text-sm opacity-80">Your database is connected, but it's currently empty. Once you add real blogs or receive messages, they will appear here.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={toggleDemoMode}
                                    className="px-4 py-2 bg-[#EAB308]/20 hover:bg-[#EAB308]/30 border border-[#EAB308]/30 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                                >
                                    Enable Demo Mode
                                </button>
                            </div>
                        )}

                        {demoMode && (
                            <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between gap-3 text-blue-400">
                                <div className="flex items-center gap-3">
                                    <Info className="w-5 h-5" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Showing Preview Content (Demo Mode)</p>
                                        <p className="text-sm opacity-80 text-blue-300/80">You are currently viewing high-quality sample data. Switch back at any time to see your real database.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={toggleDemoMode}
                                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                                >
                                    View Real Data
                                </button>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[
                                { label: "Total Messages", value: demoMode ? mockStats.messages : (stats?.messages || 0), icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
                                { label: "Project Proposals", value: demoMode ? mockStats.proposals : (stats?.proposals || 0), icon: FileText, color: "text-[#EAB308]", bg: "bg-[#EAB308]/10" },
                                { label: "Newsletter", value: demoMode ? mockStats.subscribers : (stats?.subscribers || 0), icon: Users, color: "text-green-500", bg: "bg-green-500/10" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${item.bg}`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm font-medium mb-1">{item.label}</div>
                                        <div className="text-3xl font-bold text-white">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Messages Table */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Recent Submissions</h2>
                                <button 
                                    onClick={fetchAllMessages}
                                    className="text-sm text-[#EAB308] hover:underline cursor-pointer"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead className="bg-white/5 text-gray-400 text-sm">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Name</th>
                                            <th className="px-6 py-4 font-medium">Email</th>
                                            <th className="px-6 py-4 font-medium">Project Type</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {(demoMode ? mockMessages : messages).length > 0 ? (
                                            (demoMode ? mockMessages : messages).map((msg) => (
                                                <tr 
                                                    key={msg._id}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                                                    onClick={() => setSelectedMessage(msg)}
                                                >
                                                    <td className="px-6 py-4 text-white font-medium">{msg.name}</td>
                                                    <td className="px-6 py-4 text-gray-400">{msg.email}</td>
                                                    <td className="px-6 py-4 text-gray-400">
                                                        <span className="px-2 py-1 bg-[#EAB308]/10 text-[#EAB308] rounded text-xs uppercase">{msg.projectType}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {formatDate(msg.createdAt)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); setSelectedMessage(msg); }}
                                                            className="text-[#EAB308] hover:text-[#CA8A04] font-medium transition-colors cursor-pointer"
                                                        >
                                                            Review
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                    No messages found yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeView === "blog" && (
                    <BlogManager demoMode={demoMode} />
                )}

                {activeView === "portfolio" && (
                    <PortfolioManager demoMode={demoMode} />
                )}

                {activeView === "newsletter" && (
                    <NewsletterManager demoMode={demoMode} />
                )}

                {activeView === "users" && (
                    <UsersManager demoMode={demoMode} />
                )}

                {activeView === "settings" && (
                    <SettingsManager />
                )}

                {/* Admin Footer */}
                <footer className="mt-12 py-6 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} <span className="text-[#EAB308]">PossiGeeTech Solutions</span>. All rights reserved.
                    </p>
                </footer>
            </main>

            {/* Message Review Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#EAB308]" />
                                Message Details
                            </h3>
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-4 sm:p-8 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From</div>
                                    <div className="text-white font-medium text-base sm:text-lg">{selectedMessage.name}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sent On</div>
                                    <div className="text-white font-medium text-sm sm:text-base">{new Date(selectedMessage.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</div>
                                    <div className="text-[#EAB308] font-medium flex items-center gap-2 text-sm sm:text-base">
                                        <Mail className="w-4 h-4" />
                                        {selectedMessage.email}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Message Body</div>
                                <div className="bg-white/5 border border-white/5 rounded-xl p-6 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="order-2 sm:order-1 px-6 py-3 rounded-md font-bold text-gray-400 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <a 
                                href={`mailto:${selectedMessage.email}`}
                                className="order-1 sm:order-2 px-6 py-3 rounded-md font-extrabold bg-[#EAB308] text-black hover:bg-[#CA8A04] transition-all flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
            </div>
        </div>
    );
}
