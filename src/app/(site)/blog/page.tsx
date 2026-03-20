"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Mail, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { mockBlogPosts } from "@/lib/constants";

interface BlogPost {
    id: string;
    _id?: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    slug: string;
    imageUrl?: string;
}

export default function BlogListing() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success) {
                    // Merge real posts with mock posts to keep content rich
                    const realPosts: BlogPost[] = data.data || [];
                    const mergedPosts = [...realPosts, ...mockBlogPosts.filter(m => !realPosts.find((r: BlogPost) => r.title === m.title)) as BlogPost[]];
                    setPosts(mergedPosts);
                } else {
                    setPosts(mockBlogPosts);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setPosts(mockBlogPosts);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchPosts();
    }, []);

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
                        Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">News</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        The latest thoughts on technology, design, and business strategy from our team of experts.
                    </motion.p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="h-80 lg:h-auto bg-[#1A1A1A] relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                                {posts[0]?.imageUrl ? (
                                    <Image 
                                        src={posts[0].imageUrl} 
                                        alt={posts[0].title} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/5 to-transparent z-0" />
                                        <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white/10 uppercase tracking-widest text-center relative z-10 text-balance leading-tight max-w-[80%]">Featured Article</h2>
                                    </>
                                )}
                            </div>
                            <div className="p-8 lg:p-12 bg-transparent flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-sm mb-6">
                                    <span className="px-3 py-1 bg-[#EAB308]/10 text-[#EAB308] rounded-full font-medium">{posts[0]?.category || "Design"}</span>
                                    <span className="text-gray-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {posts[0]?.date || "Oct 12, 2026"}</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 lg:mb-6 group-hover:text-[#EAB308] transition-colors">
                                    {posts[0]?.title || "10 Essential UI/UX Principles for Modern Web Apps"}
                                </h2>
                                <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                                    {posts[0]?.excerpt || "Discover the core principles that separate good interfaces from great ones."}
                                </p>
                                <Link href={`/blog/${posts[0]?.slug || "essential-ui-ux-principles"}`} className="inline-flex items-center font-semibold text-[#EAB308] hover:text-[#FACC15] transition-colors mt-auto w-fit border border-[#EAB308] rounded-md px-4 py-2 hover:bg-[#EAB308]/10">
                                    Read Full Article <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Post Grid */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loadingPosts ? (
                            <div className="col-span-full py-20 flex justify-center">
                                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
                            </div>
                        ) : (
                            posts.slice(1).map((post: BlogPost, index: number) => (
                            <motion.div
                                key={post.id || post._id}
                                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-[#EAB308]/50 hover:bg-white/10 transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {post.imageUrl && (
                                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                                        <Image 
                                            src={post.imageUrl} 
                                            alt={post.title} 
                                            fill 
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                )}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs font-semibold px-3 py-1 bg-[#1E1E1E] border border-[#333] text-gray-300 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{post.readTime}</span>
                                    </div>

                                    <Link href={`/blog/${post.slug}`} className="block mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#EAB308] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-400 line-clamp-3 mb-8 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-6 py-3 rounded-md font-medium text-white bg-[#1E1E1E] hover:bg-[#333] border border-[#333] transition-colors cursor-pointer">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 bg-[#0A0A0A] border-t border-[#1E1E1E] text-center">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 mx-auto mb-6">
                        <Mail className="w-8 h-8 text-[#EAB308]" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">Never miss an update</h2>
                    <p className="text-gray-400 mb-8">
                        Get the latest articles, resources, and insights delivered straight to your inbox. No spam, just quality content.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="flex flex-col items-center">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full sm:w-96 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#EAB308] transition-colors"
                                required
                            />
                            <div className="h-6 mt-2">
                                {status === "success" && (
                                    <p className="text-green-500 text-xs">Thanks for subscribing!</p>
                                )}
                                {status === "error" && (
                                    <p className="text-red-500 text-xs">Failed to subscribe. Please try again.</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="px-8 py-3 rounded-md font-bold bg-[#EAB308] text-black hover:bg-[#FACC15] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 h-fit"
                        >
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Subscribing...
                                </>
                            ) : status === "success" ? (
                                "Subscribed!"
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
}
