"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "web",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", projectType: "web", message: "" });
            } else {
                setSubmitStatus("error");
                if (data.type === "DATABASE_CONNECTION_ERROR") {
                    setErrorMessage("Database connection issue. This is usually due to IP whitelisting. Please check your Atlas settings.");
                } else {
                    setErrorMessage(data.message || "An unexpected error occurred. Please try again later.");
                }
                console.error("Submission error:", data);
            }
        } catch (error: unknown) {
            const err = error as Error;
            setSubmitStatus("error");
            setErrorMessage("Network error. Please check your internet connection.");
            console.error("Network or parsing error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pt-20">

            {/* Header */}
            <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[100px] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Touch</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        We&apos;d love to hear from you. Whether you have a question about features, pricing, or need a demo, our team is ready to answer all your questions.
                    </motion.p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-heading font-bold text-white mb-8">Contact Information</h2>
                            <p className="text-gray-400 mb-12">
                                Fill out the form and our team will get back to you within 24 hours. For more urgent inquiries, please reach out via phone.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#333] shrink-0">
                                        <MapPin className="w-6 h-6 text-[#EAB308]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Our Location</h3>
                                        <p className="text-gray-400">Accra, Ghana</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#333] shrink-0">
                                        <Phone className="w-6 h-6 text-[#EAB308]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Phone Number</h3>
                                        <p className="text-gray-400">+233 50 934 9675</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#333] shrink-0">
                                        <Mail className="w-6 h-6 text-[#EAB308]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Email Address</h3>
                                        <p className="text-gray-400">support@possigeetech.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#333] shrink-0">
                                        <Clock className="w-6 h-6 text-[#EAB308]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Working Hours</h3>
                                        <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="bg-[#1A1A1A] p-8 sm:p-10 rounded-2xl border border-[#333] shadow-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Phone Number (Optional)</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Project Type</label>
                                        <select
                                            value={formData.projectType}
                                            onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors appearance-none"
                                        >
                                            <option value="web">Web Development</option>
                                            <option value="mobile">Mobile App</option>
                                            <option value="uiux">UI/UX Design</option>
                                            <option value="software">Custom Software</option>
                                            <option value="marketing">Digital Marketing</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Your Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-md font-semibold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                                    ) : (
                                        <><Send className="w-5 h-5" /> Send Message</>
                                    )}
                                </button>

                                {submitStatus === "success" && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-sm text-center">
                                        Thank you! Your message has been sent successfully. We will be in touch soon.
                                    </div>
                                )}
                                {submitStatus === "error" && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm text-center">
                                        {errorMessage || "Oops! Something went wrong. Please try again later."}
                                    </div>
                                )}
                            </form>
                        </motion.div>

                    </div>
                </div>
            </section>

        </div>
    );
}
