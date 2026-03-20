"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Mail, Trash2, Edit2, Loader2 } from "lucide-react";

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Editor";
    status: "Active" | "Pending";
}

const mockUsers: AdminUser[] = [
    { id: "1", name: "Possi Gee", email: "possigee96@gmail.com", role: "Admin", status: "Active" },
    { id: "2", name: "Ofori Michael", email: "ofori@possigeetech.com", role: "Editor", status: "Active" }
];

export default function UsersManager() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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

    const handleDelete = async (id: string, isMock?: boolean) => {
        if (id === "1") {
            setToast({ message: "Cannot delete the primary admin", type: "error" });
            return;
        }
        if (isMock) {
            setUsers(users.filter(u => u._id !== id));
            setToast({ message: "Mock user removed locally", type: "success" });
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

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Team Management</h2>
                    <p className="text-gray-400 mt-1">Manage administrative access to the platform.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors">
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
                            <tr key={user.id} className="hover:bg-white/5 transition-colors text-white">
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
                                        <button className="p-2 hover:text-[#EAB308] transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button 
                                            onClick={() => handleDelete(user._id, user.id === "1" || user._id === "1")}
                                            className="p-2 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
