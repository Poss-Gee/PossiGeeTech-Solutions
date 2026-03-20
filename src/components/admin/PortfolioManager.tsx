"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Save, Image as ImageIcon } from "lucide-react";

interface Project {
    _id: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
    liveUrl?: string;
    sourceUrl?: string;
    createdAt: string;
}

export default function PortfolioManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "Web Application",
        description: "",
        techStack: "",
        imageUrl: "",
        liveUrl: "",
        sourceUrl: ""
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/portfolio");
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
            const method = editingId ? "PUT" : "POST";
            
            const payload = {
                ...formData,
                techStack: formData.techStack.split(",").map(t => t.trim()).filter(t => t !== "")
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            
            if (res.ok) {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                    title: "",
                    category: "Web Application",
                    description: "",
                    techStack: "",
                    imageUrl: "",
                    liveUrl: "",
                    sourceUrl: ""
                });
                fetchProjects();
            }
        } catch (error) {
            console.error("Failed to save project:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
            setLoading(false);
        }
    };

    const startEdit = (project: Project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            category: project.category,
            description: project.description,
            techStack: project.techStack.join(", "),
            imageUrl: project.imageUrl || "",
            liveUrl: project.liveUrl || "",
            sourceUrl: project.sourceUrl || ""
        });
        setIsAdding(true);
    };

    if (loading && projects.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#EAB308] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Portfolio Management</h2>
                <button 
                    onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors"
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isAdding ? "Cancel" : "New Project"}
                </button>
            </header>

            {isAdding && (
                <div className="bg-[#1A1A1A] border border-[#333] p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Project Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Category</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                >
                                    <option>Web Application</option>
                                    <option>Mobile App</option>
                                    <option>UI/UX Design</option>
                                    <option>Enterprise</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Description</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308] h-24"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Tech Stack (comma separated: React, Node, etc.)</label>
                            <input 
                                type="text" 
                                value={formData.techStack}
                                onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                placeholder="React, Tailwind, MongoDB"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Image Path/URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                        placeholder="/images/project.jpg"
                                    />
                                    <div className="bg-white/5 p-2 rounded-md border border-white/10">
                                        <ImageIcon className="w-6 h-6 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Live Preview URL</label>
                                <input 
                                    type="text" 
                                    value={formData.liveUrl}
                                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#EAB308]"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#EAB308] text-black font-bold rounded-md hover:bg-[#CA8A04] transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            {editingId ? "Update Project" : "Add to Portfolio"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project._id} className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden group">
                            <div className="aspect-video bg-white/5 relative flex items-center justify-center border-b border-[#333]">
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
                                ) : (
                                    <ImageIcon className="w-12 h-12 text-gray-600" />
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button 
                                        onClick={() => startEdit(project)}
                                        className="p-2 bg-black/60 text-white rounded-md hover:text-[#EAB308] transition-colors backdrop-blur-md"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(project._id)}
                                        className="p-2 bg-black/60 text-white rounded-md hover:text-red-500 transition-colors backdrop-blur-md"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-semibold text-[#EAB308] uppercase tracking-wider mb-2">{project.category}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-[#333] rounded-xl">
                        No projects found. Add your first one above!
                    </div>
                )}
            </div>
        </div>
    );
}
