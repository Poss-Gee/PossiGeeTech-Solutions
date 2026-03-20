"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SetupPasswordPage() {
    const params = useParams();
    const token = params.token as string;
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"loading" | "form" | "success" | "error" | "verifying">("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Verify token exists and is valid
        const verifyToken = async () => {
            try {
                const res = await fetch(`/api/auth/verify-token?token=${token}`);
                const data = await res.json();
                if (data.success) {
                    setStatus("form");
                } else {
                    setStatus("error");
                    setMessage(data.error || "This invitation link is invalid or has expired.");
                }
            } catch (error) {
                setStatus("error");
                setMessage("Failed to verify invitation. Please try again.");
            }
        };
        verifyToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        
        setStatus("loading");
        try {
            const res = await fetch("/api/auth/setup-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            
            if (data.success) {
                setStatus("success");
            } else {
                setStatus("form");
                setMessage(data.error || "Failed to set password");
            }
        } catch (error) {
            setStatus("form");
            setMessage("Something went wrong. Please try again.");
        }
    };

    if (status === "verifying") {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 text-white">
                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAB308]/5 rounded-full blur-[120px] -z-10" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {status === "success" ? (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center shadow-2xl">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Account Ready!</h1>
                        <p className="text-gray-400 mb-8">Your password has been set successfully. You can now access the admin panel.</p>
                        <Link 
                            href="/admin/login"
                            className="inline-block w-full py-4 bg-[#EAB308] text-black font-bold rounded-xl hover:bg-[#CA8A04] transition-all"
                        >
                            Sign In to Dashboard
                        </Link>
                    </div>
                ) : status === "error" ? (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mx-auto mb-6">
                            <ShieldAlert className="w-8 h-8 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Link Expired</h1>
                        <p className="text-gray-400 mb-8">{message}</p>
                        <Link 
                            href="/"
                            className="inline-block w-full py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome!</h1>
                            <p className="text-gray-400">Please set a secure password for your account.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {message && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
                                        {message}
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input 
                                            type="password" 
                                            required
                                            minLength={8}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input 
                                            type="password" 
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#EAB308] text-black font-bold rounded-xl hover:bg-[#CA8A04] transition-all disabled:opacity-50"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
