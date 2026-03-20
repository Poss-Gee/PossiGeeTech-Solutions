"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import Toast from "./ui/Toast";

interface ShareButtonProps {
    title: string;
    slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
    const [showToast, setShowToast] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: `Check out this blog post: ${title} | PossiGeeTech Solutions`,
            url: `${window.location.origin}/blog/${slug}`,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error("Share API not supported");
            }
        } catch (error: any) {
            // Only fallback if the error is NOT a user cancellation
            if (error.name !== 'AbortError') {
                try {
                    await navigator.clipboard.writeText(shareData.url);
                    setShowToast(true);
                } catch (clipError) {
                    console.error("Clipboard also failed:", clipError);
                }
            }
        }
    };

    return (
        <>
            <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium cursor-pointer"
            >
                <Share2 className="w-4 h-4" />
                Share Post
            </button>

            {showToast && (
                <Toast 
                    message="Link copied to clipboard!" 
                    type="success" 
                    onClose={() => setShowToast(false)} 
                />
            )}
        </>
    );
}
