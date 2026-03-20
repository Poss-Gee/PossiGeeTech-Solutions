"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Save, Image as ImageIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import Toast from "@/components/ui/Toast";

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
    imageUrl?: string;
    createdAt: string;
}

export default function BlogManager() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "Design",
        author: "Possi Gee",
        readTime: "5 min read",
        imageUrl: ""
    });
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId ? `/api/blog/${posts.find(p => p._id === editingId)?.slug}` : "/api/blog";
            const method = editingId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            if (res.ok) {
                setToast({ message: editingId ? "Post updated successfully!" : "Post published successfully!", type: "success" });
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                    title: "",
                    excerpt: "",
                    content: "",
                    category: "Design",
                    author: "Possi Gee",
                    readTime: "5 min read",
                    imageUrl: ""
                });
                fetchPosts();
            }
        } catch (error) {
            setToast({ message: "Failed to save post. Please try again.", type: "error" });
            console.error("Failed to save post:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
            if (res.ok) {
                setToast({ message: "Post deleted successfully", type: "success" });
                fetchPosts();
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            setLoading(false);
        }
    };

    const startEdit = (post: BlogPost) => {
        setEditingId(post._id);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            readTime: post.readTime,
            imageUrl: post.imageUrl || ""
        });
        setIsAdding(true);
    };

    if (loading && posts.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Blog Management</h2>
                <button 
                    onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors"
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isAdding ? "Cancel" : "New Post"}
                </button>
            </header>

            {isAdding && (
                <div className="bg-[#1A1A1A] border border-[#333] p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Post Title</label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                        required
                                        placeholder="Enter a catchy title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                    >
                                        <option>Design</option>
                                        <option>Development</option>
                                        <option>Marketing</option>
                                        <option>Technology</option>
                                        <option>Case Study</option>
                                        <option>Security</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Featured Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input 
                                            type="url" 
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Image Preview</label>
                                <div className="relative aspect-video rounded-lg border-2 border-dashed border-white/10 bg-white/5 overflow-hidden flex items-center justify-center group">
                                    {formData.imageUrl ? (
                                        <img 
                                            src={formData.imageUrl} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x225?text=Invalid+Image+URL")}
                                        />
                                    ) : (
                                        <div className="text-center p-4">
                                            <ImageIcon className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                                            <span className="text-xs text-gray-500">Enter a URL to preview</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Excerpt</label>
                            <textarea 
                                value={formData.excerpt}
                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308] h-20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Content (Markdown supported)</label>
                            <textarea 
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308] h-40"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Author</label>
                                <input 
                                    type="text" 
                                    value={formData.author}
                                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Read Time (e.g. 5 min read)</label>
                                <input 
                                    type="text" 
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            {editingId ? "Update Post" : "Publish Post"}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] text-sm">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post._id} className="hover:bg-white/5 transition-colors text-white">
                                    <td className="px-6 py-4 font-medium">{post.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-[#EAB308]/10 text-[#EAB308] rounded text-xs uppercase">{post.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link 
                                                    href={`/blog/${post.slug}`} 
                                                    target="_blank"
                                                    className="p-2 hover:text-[#EAB308] transition-colors"
                                                    title="View Post"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => startEdit(post)}
                                                    className="p-2 hover:text-[#EAB308] transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(post.slug)}
                                                    className="p-2 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No blog posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </div>
    );
}
