"use client";

import Link from "next/link";
import { Terminal, Facebook, Instagram, Twitter, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <footer className="bg-[#0A0A0A] border-t border-[#1E1E1E] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-4 group w-max">
                            <img
                                src="/logo.png"
                                alt="PossiGeeTech Logo"
                                className="h-28 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6">
                            PossiGeeTech Solutions is a modern technology company focused on delivering innovative digital solutions for businesses, startups, and organizations.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/PossiGee" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#EAB308] transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/possi_gee_23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#EAB308] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/PossiGee55175467" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#EAB308] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#EAB308] shrink-0" />
                                <span className="text-gray-400 text-sm">Accra, Ghana</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#EAB308] shrink-0" />
                                <span className="text-gray-400 text-sm">+233 50 934 9675</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#EAB308] shrink-0" />
                                <span className="text-gray-400 text-sm">support@possigeetech.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get the latest tech news and updates.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1E1E1E] border border-[#333] rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-[#EAB308] text-black font-semibold rounded-md px-4 py-2 text-sm hover:bg-[#FACC15] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Subscribing...
                                    </>
                                ) : status === "success" ? (
                                    "Subscribed!"
                                ) : (
                                    "Subscribe"
                                )}
                            </button>
                            {status === "success" && (
                                <p className="text-green-500 text-xs mt-1">Thanks for subscribing!</p>
                            )}
                            {status === "error" && (
                                <p className="text-red-500 text-xs mt-1">Failed to subscribe. Please try again.</p>
                            )}
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-[#1E1E1E] text-center md:flex md:justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} PossiGeeTech Solutions. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
