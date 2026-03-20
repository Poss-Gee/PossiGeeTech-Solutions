import { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mockBlogPosts } from "@/lib/constants";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import ShareButton from "@/components/ShareButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    await dbConnect();
    let post = await Blog.findOne({ slug });
    
    // Fallback to mock data if not found in DB
    if (!post) {
        post = mockBlogPosts.find(p => p.slug === slug);
    }

    if (!post) return { title: "Post Not Found" };
    return { title: `${post.title} | PossiGeeTech Blog` };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await dbConnect();
    let post = await Blog.findOne({ slug });

    // Fallback to mock data if not found in DB
    if (!post) {
        post = mockBlogPosts.find(p => p.slug === slug);
    }

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-20 bg-[#0A0A0A]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Back to Blog */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#EAB308] transition-colors mb-12 group">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    Back to Articles
                </Link>

                {/* Hero Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 text-[#EAB308] text-sm font-medium mb-6">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <User className="w-5 h-5 text-[#EAB308]" />
                            </div>
                            <span className="font-medium text-white">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>
                                {post.createdAt 
                                    ? new Date(post.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })
                                    : post.date
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.imageUrl && (
                    <div className="relative w-full h-[300px] md:h-[600px] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <Image 
                            src={post.imageUrl} 
                            alt={post.title} 
                            fill 
                            className="object-contain"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-yellow max-w-none">
                    <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                {/* Footer / Share */}
                <footer className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} PossiGeeTech Solutions. All rights reserved.
                    </div>
                    <ShareButton title={post.title} slug={post.slug} />
                </footer>
            </div>
        </article>
    );
}
