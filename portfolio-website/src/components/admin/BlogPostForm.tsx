"use client";

import { useState, useEffect } from "react";
import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";
import MarkdownEditor from "@/components/MarkdownEditor";
import type { AdminBlogPost } from "@/types/admin";

type BlogPostFormProps = {
    editingPost: AdminBlogPost | null;
    onSaveSuccess: () => void;
    onCancelEdit: () => void;
};

export default function BlogPostForm({ editingPost, onSaveSuccess, onCancelEdit }: BlogPostFormProps) {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogCategory, setBlogCategory] = useState<BlogCategory>("RANDOM");
    const [blogPublished, setBlogPublished] = useState(false);
    const [blogMessage, setBlogMessage] = useState("");

    // Sync form state when editingPost changes
    useEffect(() => {
        if (editingPost) {
            setBlogTitle(editingPost.title);
            setBlogContent(editingPost.content);
            setBlogCategory(editingPost.category);
            setBlogPublished(editingPost.published);
            setBlogMessage("");
        } else {
            resetForm();
        }
    }, [editingPost]);

    const resetForm = () => {
        setBlogTitle("");
        setBlogContent("");
        setBlogCategory("RANDOM");
        setBlogPublished(false);
        setBlogMessage("");
    };

    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlogMessage("");

        const method = editingPost ? "PUT" : "POST";
        const body = {
            id: editingPost?.id,
            title: blogTitle,
            content: blogContent,
            category: blogCategory,
            published: blogPublished,
        };

        try {
            const res = await fetch("/api/blog", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setBlogMessage(`Blog post ${editingPost ? "updated" : "created"} successfully!`);
                resetForm();
                onSaveSuccess();
            } else {
                setBlogMessage(`Failed to ${editingPost ? "update" : "create"} blog post.`);
            }
        } catch (_error) {
            setBlogMessage("An error occurred.");
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        onCancelEdit();
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-md max-w-3xl mx-auto">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">{editingPost ? "Edit Blog Post" : "Create Blog Post"}</h2>
            <form onSubmit={handleSavePost} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value as BlogCategory)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {(Object.keys(BLOG_CATEGORIES) as BlogCategory[]).map((cat) => (
                            <option key={cat} value={cat}>
                                {BLOG_CATEGORIES[cat]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <div className="mt-1">
                        <MarkdownEditor value={blogContent} onChange={setBlogContent} placeholder="Write your blog content here using Markdown..." />
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="published" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                        Publish immediately
                    </label>
                </div>
                {blogMessage && <p className={`text-sm ${blogMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>{blogMessage}</p>}
                <div className="flex gap-2">
                    <button type="submit" className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        {editingPost ? "Update Post" : "Create Post"}
                    </button>
                    {editingPost && (
                        <button type="button" onClick={handleCancelEdit} className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
