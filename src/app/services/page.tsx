"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Code, Megaphone, PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "We design and develop modern, responsive, and high-performance websites for businesses, startups, schools, and organizations. Our websites are optimized for speed, security, and user experience.",
        features: ["Custom React/Next.js Apps", "E-commerce Solutions", "CMS Development", "SEO Optimization"]
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        description: "We build powerful and user-friendly mobile applications for Android and cross-platform devices. Our apps are designed to solve real-world problems and improve user engagement.",
        features: ["iOS & Android Apps", "React Native / Flutter", "App Backend Dev", "UI/UX for Mobile"]
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "We create visually appealing and user-friendly interfaces for websites and mobile applications, ensuring the best possible experience for users.",
        features: ["Wireframing & Prototyping", "User Research", "Visual Design", "Usability Testing"]
    },
    {
        icon: Code,
        title: "Software Development",
        description: "We develop custom software systems such as school management systems, business management platforms, booking systems, and automation tools.",
        features: ["Custom CRM/ERP", "API Development", "Cloud Solutions", "Legacy Modernization"]
    },
    {
        icon: PenTool,
        title: "Graphic Design",
        description: "We design professional branding materials such as logos, marketing graphics, social media designs, and brand identity assets.",
        features: ["Brand Identity/Logo", "Marketing Materials", "Social Media Graphics", "Print Design"]
    },
    {
        icon: Globe, // Use Globe or a Cloud icon if available, but for now stick to existing or similar
        title: "Cloud Solutions",
        description: "We provide cloud-based infrastructure, hosting, and deployment solutions that help businesses scale their digital platforms efficiently and securely.",
        features: ["Cloud Infrastructure", "Hosting & SSL", "Secure Deployment", "Scalable Systems"]
    },
    {
        icon: Smartphone, // Use a generic icon for AI
        title: "AI & Data Science",
        description: "We develop intelligent systems that use data analysis, machine learning, and automation to help businesses make smarter decisions and improve efficiency.",
        features: ["Machine Learning", "Data Analysis", "Process Automation", "Predictive Systems"]
    }
];

export default function Services() {
    return (
        <div className="flex flex-col min-h-screen pt-20">

            {/* Header */}
            <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[100px] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Services</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        We provide comprehensive digital solutions tailored to your unique business needs. From initial concept to deployment and beyond.
                    </motion.p>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 transition-all group flex flex-col items-start hover:border-[#EAB308]/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-6 border border-[#333] group-hover:border-[#EAB308] transition-colors">
                                    <service.icon className="w-8 h-8 text-[#EAB308]" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

                                <ul className="w-full space-y-2 mb-8 border-t border-[#333] pt-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/calculator" className="mt-auto px-6 py-2 rounded-md font-medium text-black bg-[#EAB308] hover:bg-[#FACC15] transition-colors w-full text-center">
                                    Request a Quote
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0A0A0A] border-t border-[#1E1E1E]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Need a custom solution not listed here?</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Our team of experts can build tailored solutions to solve even the most complex technical challenges.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex px-8 py-4 rounded-md font-semibold bg-[#1E1E1E] text-white hover:bg-[#333] border border-[#333] transition-all items-center gap-2"
                    >
                        Contact our engineering team <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

        </div>
    );
}
