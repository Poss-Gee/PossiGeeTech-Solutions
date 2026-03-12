"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        description: "Perfect for small businesses and individuals just getting started.",
        price: "$999",
        popular: false,
        features: [
            "Custom 5-page Website",
            "Mobile Responsive Design",
            "Basic SEO Setup",
            "Contact Form Integration",
            "1 Month Free Support",
        ],
        notIncluded: [
            "E-commerce Functionality",
            "Custom Web App Development",
            "Advanced SEO & Analytics",
        ]
    },
    {
        name: "Business",
        description: "Ideal for growing companies needing advanced features and integrations.",
        price: "$2,499",
        popular: true,
        features: [
            "Up to 15 Pages / E-commerce",
            "Custom UI/UX Design",
            "Advanced SEO Optimization",
            "Payment Gateway Integration",
            "CMS Setup (Content Management)",
            "3 Months Free Support",
        ],
        notIncluded: [
            "Custom Mobile App",
        ]
    },
    {
        name: "Premium",
        description: "Complete digital transformation for enterprise-level operations.",
        price: "Custom",
        popular: false,
        features: [
            "Unlimited Web Pages",
            "Custom Web/Mobile Application",
            "Complex Backend Architecture",
            "Advanced Analytics & Tracking",
            "Dedicated Project Manager",
            "12 Months Premium Support",
        ],
        notIncluded: []
    }
];

export default function Pricing() {
    return (
        <div className="flex flex-col min-h-screen pt-20">

            {/* Header */}
            <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[100px] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Pricing</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Every project is unique. Contact us today to discuss your idea and receive a custom quote tailored to your needs.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-10 text-center max-w-4xl mx-auto shadow-2xl hover:border-[#EAB308]/50 transition-colors">
                            <h3 className="text-3xl font-bold text-white mb-6">Custom Quote</h3>
                            <p className="text-gray-400 text-lg mb-8">
                                Every project is unique. Contact us today to discuss your idea and receive a custom quote tailored to your needs.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block px-10 py-4 rounded-md font-semibold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-all"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ alternative CTA */}
            <section className="py-24 bg-[#0A0A0A] border-t border-[#1E1E1E] text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-heading font-bold text-white mb-6">Need a custom estimate?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Every project is unique. Use our built-in calculator to get a highly requested estimate based on your specific feature requirements.
                    </p>
                    <Link
                        href="/calculator"
                        className="inline-block px-8 py-4 rounded-md font-semibold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-all"
                    >
                        Open Cost Calculator
                    </Link>
                </div>
            </section>

        </div>
    );
}
