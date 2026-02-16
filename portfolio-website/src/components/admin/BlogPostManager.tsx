"use client";

import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";
import { getCategoryColorLight } from "@/utils/categoryColors";
import type { AdminBlogPost } from "@/types/admin";

type BlogPostManagerProps = {
    posts: AdminBlogPost[];
    onEdit: (post: AdminBlogPost) => void;
    onDelete: (id: string) => void;
};

export default function BlogPostManager({ posts, onEdit, onDelete }: BlogPostManagerProps) {
    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        onDelete(id);
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-md flex flex-col h-[600px] max-w-4xl mx-auto">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex-shrink-0">Manage Blog Posts</h2>
            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
                {posts.length === 0 ? (
                    <p className="text-gray-500">No blog posts found.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="rounded-md border border-gray-200 p-4 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="mb-1 flex items-start justify-between">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColorLight(post.category)}`}>{BLOG_CATEGORIES[post.category]}</span>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{post.published ? "Published" : "Draft"}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate max-w-md">{post.content}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button onClick={() => onEdit(post)} className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(post.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
