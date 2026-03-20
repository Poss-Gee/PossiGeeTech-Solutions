"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            
            if (data.success) {
                window.location.href = "/admin";
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAB308]/5 rounded-full blur-[120px] -z-10" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#EAB308]/10 rounded-2xl flex items-center justify-center border border-[#EAB308]/20 mx-auto mb-6">
                        <ShieldCheck className="w-8 h-8 text-[#EAB308]" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Please sign in to access management tools.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                    placeholder="admin@possigeetech.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <Link href="#" className="text-xs text-[#EAB308] hover:underline">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-[#EAB308] text-black font-bold rounded-xl hover:bg-[#CA8A04] transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-12">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
                        &larr; Back to website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
