"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 py-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent py-4"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-20" : "h-28"}`}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/logo.png"
                            alt="PossiGeeTech Logo"
                            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${scrolled ? "h-16" : "h-24"}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-0 bg-[#1E1E1E] rounded-md -z-10"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        >
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#EAB308] rounded-t-md shadow-[0_0_8px_#EAB308]" />
                                        </motion.div>
                                    )}
                                </Link>
                            );
                        })}

                        {/* CTA Button */}
                        <div className="pl-4 ml-2 border-l border-[#1E1E1E]">
                            <Link
                                href="/calculator"
                                className="px-5 py-2 rounded-md text-sm font-medium bg-[#EAB308] text-black hover:bg-[#FACC15] transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] flex items-center gap-2"
                            >
                                Start Project
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1E1E1E] transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0A0A0A] border-b border-[#1E1E1E]"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-3 rounded-md text-base font-medium ${isActive
                                            ? "text-[#EAB308] bg-[#1E1E1E]"
                                            : "text-gray-400 hover:text-white hover:bg-[#1E1E1E]"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="mt-4 pt-4 border-t border-[#1E1E1E]">
                                <Link
                                    href="/calculator"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center px-5 py-3 rounded-md text-base font-medium bg-[#EAB308] text-black hover:bg-[#FACC15]"
                                >
                                    Start Project
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
