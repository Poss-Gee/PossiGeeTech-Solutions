"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, Briefcase, Users, Settings, LogOut, Clock, Loader2, CheckCircle2, AlertCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import BlogManager from "@/components/admin/BlogManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import NewsletterManager from "@/components/admin/NewsletterManager";
import UsersManager from "@/components/admin/UsersManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { X, ExternalLink } from "lucide-react";

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
    const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (data.stats) {
                    setStats(data.stats);
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
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
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row pt-20 border-t border-[#1E1E1E]">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col hidden md:flex">
                <div className="mb-10 px-2">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Dashboard</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <button 
                        onClick={() => setActiveView("messages")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "messages" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Messages
                    </button>
                    <button 
                        onClick={() => setActiveView("blog")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "blog" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <Newspaper className="w-5 h-5" />
                        Blog
                    </button>
                    <button 
                        onClick={() => setActiveView("newsletter")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "newsletter" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <Mail className="w-5 h-5" />
                        Newsletter
                    </button>
                    <button 
                        onClick={() => setActiveView("portfolio")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "portfolio" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <Briefcase className="w-5 h-5" />
                        Portfolio
                    </button>
                    <button 
                        onClick={() => setActiveView("users")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "users" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <Users className="w-5 h-5" />
                        Users
                    </button>
                    <button 
                        onClick={() => setActiveView("settings")}
                        className={`flex items-center gap-3 w-full px-4 py-3 font-semibold rounded-md transition-colors cursor-pointer ${activeView === "settings" ? "bg-[#EAB308] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 font-medium rounded-md transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeView === "messages" && (
                    <>
                        <header className="mb-8 flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-white">Inbox & Requests</h1>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                    <span className="text-[#EAB308] font-bold">A</span>
                                </div>
                            </div>
                        </header>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl">
                                <div className="text-gray-400 text-sm font-medium mb-2">Total Messages</div>
                                <div className="text-3xl font-bold text-white">{stats?.messages || 0}</div>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl">
                                <div className="text-gray-400 text-sm font-medium mb-2">New Subscribers</div>
                                <div className="text-3xl font-bold text-white">{stats?.subscribers || 0}</div>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl">
                                <div className="text-gray-400 text-sm font-medium mb-2">Pending Proposals</div>
                                <div className="text-3xl font-bold text-[#EAB308]">{stats?.proposals || 0}</div>
                            </div>
                        </div>

                        {/* Messages Table */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Recent Submissions</h2>
                                <button className="text-sm text-[#EAB308] hover:underline cursor-pointer">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-gray-400 text-sm">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Name</th>
                                            <th className="px-6 py-4 font-medium">Email</th>
                                            <th className="px-6 py-4 font-medium">Project Type</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#333] text-sm">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <tr key={msg._id} className="hover:bg-white/5 transition-colors">
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
                                                            onClick={() => setSelectedMessage(msg)}
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
                    <BlogManager />
                )}

                {activeView === "portfolio" && (
                    <PortfolioManager />
                )}

                {activeView === "newsletter" && (
                    <NewsletterManager />
                )}

                {activeView === "users" && (
                    <UsersManager />
                )}

                {activeView === "settings" && (
                    <SettingsManager />
                )}
            </main>

            {/* Message Review Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
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
                        
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">From</div>
                                    <div className="text-white font-medium text-lg">{selectedMessage.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Sent On</div>
                                    <div className="text-white font-medium">{new Date(selectedMessage.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</div>
                                    <div className="text-[#EAB308] font-medium flex items-center gap-2">
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

                        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-4">
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="px-6 py-2 rounded-md font-bold text-gray-400 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <a 
                                href={`mailto:${selectedMessage.email}`}
                                className="px-6 py-2 rounded-md font-extrabold bg-[#EAB308] text-black hover:bg-[#CA8A04] transition-all flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
