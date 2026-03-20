"use client";

import { useState, useEffect } from "react";
import { Users, UserPlus, Shield, Mail, Trash2, Edit2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Toast from "@/components/ui/Toast";

interface AdminUser {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role: "Admin" | "Editor";
    status: "Active" | "Pending";
}

// No mock data needed anymore, fetching from database

export default function UsersManager() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Editor" });
    const [saving, setSaving] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            if (res.ok) {
                setToast({ message: "User invited successfully", type: "success" });
                setShowInviteModal(false);
                setNewUser({ name: "", email: "", role: "Editor" });
                fetchUsers();
            } else {
                setToast({ message: "Failed to invite user", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Error inviting user", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string, isCanDelete: boolean = true) => {
        if (!isCanDelete) {
            setToast({ message: "Cannot delete the primary admin", type: "error" });
            return;
        }
        if (!confirm("Are you sure?")) return;
        
        try {
            const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                setToast({ message: "User removed", type: "success" });
                fetchUsers();
            }
        } catch (error) {
            setToast({ message: "Failed to delete user", type: "error" });
        }
    };

    const startEdit = (user: any) => {
        setNewUser({ name: user.name, email: user.email, role: user.role });
        setShowInviteModal(true);
        // We'll treat this as "invite" for now but we could add update logic later
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Team Management</h2>
                    <p className="text-gray-400 mt-1">Manage administrative access to the platform.</p>
                </div>
                <button 
                    onClick={() => {
                        setNewUser({ name: "", email: "", role: "Editor" });
                        setShowInviteModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors"
                >
                    <UserPlus className="w-5 h-5" />
                    Invite Member
                </button>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] text-sm">
                        {users.map((user) => (
                            <tr key={user._id || user.id} className="hover:bg-white/5 transition-colors text-white">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#EAB308]/10 flex items-center justify-center border border-[#EAB308]/20 text-[#EAB308] font-bold">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-gray-400 text-xs">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className={`w-4 h-4 ${user.role === 'Admin' ? 'text-[#EAB308]' : 'text-blue-400'}`} />
                                        {user.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button 
                                            onClick={() => startEdit(user)}
                                            className="p-2 hover:text-[#EAB308] transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user._id || user.id, user.id !== "1" && user._id !== "1")}
                                            className="p-2 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No team members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showInviteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1A1A] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Invite New Member</h3>
                        <form onSubmit={handleInvite} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                    placeholder="e.g. Ofori Michael"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                    placeholder="ofori@possigeetech.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Role</label>
                                <select 
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]"
                                >
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button 
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-3 bg-white/5 text-white font-bold rounded-md hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-3 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

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
