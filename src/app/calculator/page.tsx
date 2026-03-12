"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2 } from "lucide-react";

type ProjectType = "web" | "mobile" | "uiux" | "software";
type ProjectSize = "small" | "medium" | "large";

export default function CostCalculator() {
    const [projectType, setProjectType] = useState<ProjectType>("web");
    const [projectSize, setProjectSize] = useState<ProjectSize>("small");
    const [pages, setPages] = useState(5);
    const [features, setFeatures] = useState<string[]>([]);
    const [totalCost, setTotalCost] = useState(0);

    const basePrices = {
        web: 500,
        mobile: 1500,
        uiux: 800,
        software: 3000,
    };

    const sizeMultipliers = {
        small: 1,
        medium: 2,
        large: 4,
    };

    const extraFeatures = [
        { id: "auth", label: "User Authentication", price: 300 },
        { id: "payments", label: "Payment Integration", price: 500 },
        { id: "cms", label: "Content Management (CMS)", price: 400 },
        { id: "seo", label: "Advanced SEO", price: 250 },
        { id: "api", label: "Custom API Integration", price: 600 },
        { id: "admin", label: "Admin Dashboard", price: 800 },
    ];

    useEffect(() => {
        let cost = basePrices[projectType] * sizeMultipliers[projectSize]; // Base cost

        // Page cost (only for web/uiux typically, but we'll apply a flat rate)
        if (projectType === "web" || projectType === "uiux") {
            cost += (pages - 5) * 100 > 0 ? (pages - 5) * 100 : 0;
        }

        // Features cost
        features.forEach(featureId => {
            const feat = extraFeatures.find(f => f.id === featureId);
            if (feat) cost += feat.price;
        });

        setTotalCost(cost);
    }, [projectType, projectSize, pages, features]);

    const toggleFeature = (id: string) => {
        setFeatures(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        );
    };

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
                        Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Calculator</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Get an instant, transparent estimate for your project. Customize your features and immediately see the projected cost.
                    </motion.p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Form */}
                        <motion.div
                            className="lg:col-span-2 space-y-10 bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Type */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">1. Project Type</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { id: "web", label: "Website" },
                                        { id: "mobile", label: "Mobile App" },
                                        { id: "uiux", label: "UI/UX Design" },
                                        { id: "software", label: "Custom Software" },
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setProjectType(type.id as ProjectType)}
                                            className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${projectType === type.id
                                                ? "bg-[#EAB308] border-[#EAB308] text-black"
                                                : "bg-[#0A0A0A] border-[#333] text-gray-400 hover:border-[#EAB308] hover:text-white cursor-pointer"
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">2. Project Complexity</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: "small", label: "Basic" },
                                        { id: "medium", label: "Advanced" },
                                        { id: "large", label: "Enterprise" },
                                    ].map(size => (
                                        <button
                                            key={size.id}
                                            onClick={() => setProjectSize(size.id as ProjectSize)}
                                            className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${projectSize === size.id
                                                ? "bg-[#EAB308] border-[#EAB308] text-black"
                                                : "bg-[#0A0A0A] border-[#333] text-gray-400 hover:border-[#EAB308] hover:text-white cursor-pointer"
                                                }`}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pages Slider */}
                            {(projectType === "web" || projectType === "uiux") && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold text-white">3. Number of Pages/Screens</h3>
                                        <span className="text-[#EAB308] font-bold text-lg">{pages} Pages</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={pages}
                                        onChange={(e) => setPages(parseInt(e.target.value))}
                                        className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#EAB308]"
                                    />
                                    <div className="flex justify-between text-gray-500 text-xs mt-2">
                                        <span>1</span>
                                        <span>50+</span>
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">4. Additional Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {extraFeatures.map(feature => {
                                        const isSelected = features.includes(feature.id);
                                        return (
                                            <button
                                                key={feature.id}
                                                onClick={() => toggleFeature(feature.id)}
                                                className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors text-left cursor-pointer ${isSelected
                                                    ? "bg-[#EAB308]/10 border-[#EAB308] text-white"
                                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium flex items-center gap-2">
                                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#EAB308]" />}
                                                    {!isSelected && <div className="w-4 h-4 border border-gray-500 rounded-full" />}
                                                    {feature.label}
                                                </span>
                                                <span className="text-xs text-gray-500">+${feature.price}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Sticky Summary */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="sticky top-28 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl overflow-hidden relative group">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#EAB308]/20 rounded-full blur-[40px] group-hover:bg-[#EAB308]/30 transition-colors" />

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <Calculator className="w-8 h-8 text-[#EAB308]" />
                                    <h2 className="text-2xl font-bold text-white">Estimated Cost</h2>
                                </div>

                                <div className="mb-8 relative z-10">
                                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Total Est. Price</span>
                                    <div className="text-5xl font-black text-white mt-1">
                                        ${totalCost.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 font-medium">
                                        *This is a rough estimate. Final pricing may vary based on specific requirements.
                                    </p>
                                </div>

                                <div className="space-y-3 mb-8 border-t border-white/10 pt-6 relative z-10">
                                    <div className="flex justify-between text-gray-300 text-sm font-medium">
                                        <span>Base Engine</span>
                                        <span>${(basePrices[projectType] * sizeMultipliers[projectSize]).toLocaleString()}</span>
                                    </div>
                                    {(projectType === "web" || projectType === "uiux") && pages > 5 && (
                                        <div className="flex justify-between text-gray-300 text-sm font-medium">
                                            <span>Extra Pages ({pages - 5})</span>
                                            <span>${((pages - 5) * 100).toLocaleString()}</span>
                                        </div>
                                    )}
                                    {features.map(fId => {
                                        const f = extraFeatures.find(feat => feat.id === fId);
                                        if (!f) return null;
                                        return (
                                            <div key={fId} className="flex justify-between text-gray-300 text-sm font-medium">
                                                <span>{f.label}</span>
                                                <span>${f.price.toLocaleString()}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button className="w-full py-4 rounded-xl font-bold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-all relative z-10 shadow-lg cursor-pointer active:scale-95">
                                    Request Detailed Proposal
                                </button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

        </div>
    );
}
