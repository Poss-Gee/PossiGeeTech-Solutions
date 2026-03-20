"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Project {
    _id: string;
    id?: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
}

const mockProjects: Project[] = [
    {
        _id: "1",
        title: "Campus Bite App",
        category: "Mobile App",
        description: "A mobile application designed to help university students order food easily on campus and track their orders in real time.",
        techStack: ["Flutter", "Firebase"],
        imageUrl: "/images/campus-bite.png"
    },
    {
        _id: "2",
        title: "University Portal System",
        category: "Web Application",
        description: "A digital portal that helps universities manage student records, courses, and communication between students and administrators.",
        techStack: ["React", "Node.js", "MongoDB"],
        imageUrl: "/images/portal.jpg"
    },
    {
        _id: "3",
        title: "Business Website Platform",
        category: "Web Application",
        description: "A modern website platform built for small businesses to showcase their services and connect with customers online.",
        techStack: ["HTML", "CSS", "JavaScript", "React"],
        imageUrl: "/images/business.jpg"
    },
    {
        _id: "4",
        title: "Study Group Application",
        category: "Mobile App",
        description: "A mobile application designed for university students to collaborate, share study materials, and organize group discussions.",
        techStack: ["Flutter", "Firebase"],
        imageUrl: "/images/study-group.jpg"
    }
];

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/portfolio");
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setProjects(data.data);
                } else {
                    setProjects(mockProjects);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setProjects(mockProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
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
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Work</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Explore our latest projects showcasing our expertise in design, development, and problem-solving across various industries.
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EAB308]"></div>
                            </div>
                        ) : (
                            projects.map((project: Project, index: number) => (
                            <motion.div
                                key={project.id || project._id}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >

                                {/* Image Side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 group shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#EAB308]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {project.imageUrl ? (
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                                                <MonitorSmartphone className="w-20 h-20 text-gray-400 mb-4" />
                                                <span className="text-lg font-medium text-gray-400 tracking-wider uppercase text-center px-4">{project.title}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[#EAB308] text-sm font-medium">
                                        {project.category}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                                    <p className="text-lg text-gray-400 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="pt-4 border-t border-[#333]">
                                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-3 mb-8">
                                            {project.techStack.map((tech: string) => (
                                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <Link href="#" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium text-black bg-[#EAB308] hover:bg-[#FACC15] transition-colors">
                                            View Live <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <Link href="#" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                                            Source <Github className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div >
                            </motion.div >
                        ))
                        )}
                    </div >
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0A0A0A] border-t border-[#1E1E1E] text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Have a project in mind?</h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Let&apos;s build something amazing together. Review our pricing plans or contact us for a custom quote.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href="/pricing"
                            className="px-8 py-4 rounded-md font-semibold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-all w-full sm:w-auto"
                        >
                            View Pricing
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-md font-semibold bg-[#1E1E1E] text-white hover:bg-[#333] border border-[#333] transition-all w-full sm:w-auto"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
