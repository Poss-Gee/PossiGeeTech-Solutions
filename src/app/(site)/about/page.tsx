"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen pt-20">

            {/* Header */}
            <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[100px] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">PossiGeeTech</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        PossiGeeTech Solutions is a modern technology company focused on delivering innovative digital solutions for businesses, startups, and organizations. We specialize in building high-quality websites, mobile applications, software systems, and digital products that help businesses grow in the digital world.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <motion.div
                            className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-16 h-16 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-6 border border-[#EAB308]/30">
                                <Target className="w-8 h-8 text-[#EAB308]" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To build innovative, reliable, and scalable digital solutions that empower businesses and individuals through technology.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="w-16 h-16 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-6 border border-[#EAB308]/30">
                                <Eye className="w-8 h-8 text-[#EAB308]" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To become one of the leading technology solution providers in Africa, helping organizations transform their ideas into powerful digital products.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-20 bg-[#0A0A0A] border-t border-[#1E1E1E]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Our Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">These principles guide everything we do at PossiGeeTech Solutions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Innovation", desc: "We constantly explore new technologies and ideas." },
                            { name: "Reliability", desc: "We deliver solutions that businesses can depend on." },
                            { name: "Quality", desc: "We focus on high-quality and professional results." },
                            { name: "Scalability", desc: "Our solutions are built to grow with businesses." },
                            { name: "Customer Satisfaction", desc: "We prioritize the success of our clients." },
                        ].map((value, index) => (
                            <motion.div
                                key={value.name}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:bg-white/10 transition-colors"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <h3 className="text-[#EAB308] font-bold mb-2">{value.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-[400px] lg:h-auto overflow-hidden">
                                <Image
                                    src="/images/founder.png"
                                    alt="Ofori Michael (Possi Gee)"
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/20 to-transparent" />
                            </div>

                            <div className="p-12 lg:p-16 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-[#EAB308] font-semibold tracking-wider uppercase mb-2">Meet The Founder</h3>
                                    <h2 className="text-4xl font-heading font-bold text-white mb-6">Ofori Michael <span className="text-gray-500 text-2xl font-normal">(Possi Gee)</span></h2>

                                    <div className="space-y-4 text-gray-400">
                                        <p>
                                            Ofori Michael is a passionate developer and tech innovator who founded PossiGeeTech Solutions with the goal of building powerful digital solutions that help businesses succeed in the modern technology landscape.
                                        </p>
                                        <p>
                                            His leadership drives the agency&apos;s commitment to Innovation, Reliability, Quality, and Scalability, ensuring that every project—from small business websites to enterprise-level applications—is executed with precision and customer satisfaction in mind.
                                        </p>
                                        <p className="font-medium text-white mt-6 pt-6 border-t border-[#333]">
                                            &quot;Every project is unique. We build digital products that help businesses grow and transform ideas into powerful reality.&quot;
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
