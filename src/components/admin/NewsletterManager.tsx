"use client";

import { useState, useEffect } from "react";
import { Mail, Loader2, Search, Download, Trash2 } from "lucide-react";
import Toast from "@/components/ui/Toast";

interface Subscriber {
    _id: string;
    email: string;
    createdAt: string;
}

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/newsletter");
            const data = await res.json();
            if (data.success) {
                setSubscribers(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this subscriber?")) return;
        try {
            const res = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
            if (res.ok) {
                setToast({ message: "Subscriber removed", type: "success" });
                fetchSubscribers();
            }
        } catch (error) {
            setToast({ message: "Failed to remove subscriber", type: "error" });
            console.error("Failed to delete subscriber:", error);
        }
    };

    const filteredSubscribers = subscribers.filter(s => 
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToCSV = () => {
        const headers = ["Email", "Joined Date"];
        const rows = filteredSubscribers.map(s => [s.email, new Date(s.createdAt).toLocaleDateString()]);
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(r => r.join(",")).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading && subscribers.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Newsletter</h2>
                    <p className="text-gray-400 mt-1">Manage your {subscribers.length} active subscribers.</p>
                </div>
                <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                >
                    <Download className="w-5 h-5" />
                    Export CSV
                </button>
            </header>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-[#EAB308] transition-all"
                />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-medium">Email Address</th>
                            <th className="px-6 py-4 font-medium">Joined On</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] text-sm">
                        {filteredSubscribers.length > 0 ? (
                            filteredSubscribers.map((subscriber) => (
                                <tr key={subscriber._id} className="hover:bg-white/5 transition-colors text-white">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#EAB308]/10 flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-[#EAB308]" />
                                        </div>
                                        {subscriber.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleDelete(subscriber._id)}
                                            className="p-2 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                    {searchTerm ? "No matching subscribers found." : "No one has subscribed yet."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
