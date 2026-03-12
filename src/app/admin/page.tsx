"use client";

import { motion } from "framer-motion";
import { Users, Mail, MessageSquare, Briefcase, Settings, LogOut, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [messages, setMessages] = useState<AdminMessage[]>([]);
    const [loading, setLoading] = useState(true);

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
                    <button className="flex items-center gap-3 w-full px-4 py-3 bg-[#EAB308] text-black font-semibold rounded-md transition-colors cursor-pointer">
                        <MessageSquare className="w-5 h-5" />
                        Messages
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 font-medium rounded-md transition-colors cursor-pointer">
                        <Mail className="w-5 h-5" />
                        Newsletter
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1E1E1E] font-medium rounded-md transition-colors cursor-pointer">
                        <Briefcase className="w-5 h-5" />
                        Portfolio
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 font-medium rounded-md transition-colors cursor-pointer">
                        <Users className="w-5 h-5" />
                        Users
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 font-medium rounded-md transition-colors cursor-pointer">
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
                                                <button className="text-white hover:text-[#EAB308] font-medium transition-colors cursor-pointer">Review</button>
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
            </main>

        </div>
    );
}
