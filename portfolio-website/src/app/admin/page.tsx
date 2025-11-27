"use client";

import { useState, useEffect } from "react";
import { BLOG_CATEGORIES, BlogCategory } from "@/types/blog";
import MarkdownEditor from "@/components/MarkdownEditor";

function getCategoryColor(category: BlogCategory): string {
    const colors: Record<BlogCategory, string> = {
        NETWORKING: "bg-purple-100 text-purple-800",
        TUTORIALS: "bg-green-100 text-green-800",
        RANDOM: "bg-yellow-100 text-yellow-800",
        TECH_NEWS: "bg-blue-100 text-blue-800",
        PERSONAL: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
}

type User = {
    id: string;
    email: string;
    name: string | null;
};

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

type BlogPost = {
    id: string;
    title: string;
    content: string;
    category: BlogCategory;
    published: boolean;
    createdAt: string;
};

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Blog Post State
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogCategory, setBlogCategory] = useState<BlogCategory>("RANDOM");
    const [blogPublished, setBlogPublished] = useState(false);
    const [blogMessage, setBlogMessage] = useState("");

    // Contact Messages State
    const [messages, setMessages] = useState<ContactMessage[]>([]);

    // UI State
    const [activeTab, setActiveTab] = useState<"create" | "messages" | "manage">("create");

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
                fetchMessages();
                fetchBlogPosts();
            }
        } catch (error) {
            console.error("Failed to check login", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const fetchBlogPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            if (res.ok) {
                const data = await res.json();
                setBlogPosts(data.posts);
            }
        } catch (error) {
            console.error("Failed to fetch blog posts", error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                fetchMessages();
                fetchBlogPosts();
            } else {
                setLoginError(data.error || "Login failed");
            }
        } catch (error) {
            setLoginError("An error occurred");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        setMessages([]);
        setBlogPosts([]);
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
                setBlogTitle("");
                setBlogContent("");
                setBlogCategory("RANDOM");
                setBlogPublished(false);
                setEditingPost(null);
                fetchBlogPosts();
            } else {
                setBlogMessage(`Failed to ${editingPost ? "update" : "create"} blog post.`);
            }
        } catch (error) {
            setBlogMessage("An error occurred.");
        }
    };

    const handleEditPost = (post: BlogPost) => {
        setEditingPost(post);
        setBlogTitle(post.title);
        setBlogContent(post.content);
        setBlogCategory(post.category);
        setBlogPublished(post.published);
        setBlogMessage("");
        setActiveTab("create");
        // Scroll to top to see the form
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setBlogTitle("");
        setBlogContent("");
        setBlogCategory("RANDOM");
        setBlogPublished(false);
        setBlogMessage("");
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchBlogPosts();
                if (editingPost?.id === id) {
                    handleCancelEdit();
                }
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Error deleting post");
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setMessages(messages.filter((msg) => msg.id !== id));
            } else {
                alert("Failed to delete message");
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Error deleting message");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                        <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Welcome, {user.name || user.email}</span>
                        <button onClick={handleLogout} className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex border-b border-gray-200">
                        <button className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === "create" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("create")}>
                            {editingPost ? "Edit Blog Post" : "Create Blog Post"}
                        </button>
                        <button className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === "messages" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("messages")}>
                            Contact Messages
                        </button>
                        <button className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === "manage" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("manage")}>
                            Manage Blog Posts
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    {/* Create/Edit Blog Post Section */}
                    {activeTab === "create" && (
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
                    )}

                    {/* Contact Messages Section */}
                    {activeTab === "messages" && (
                        <div className="rounded-lg bg-white p-6 shadow-md flex flex-col h-[600px] max-w-4xl mx-auto">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex-shrink-0">Contact Messages</h2>
                            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
                                {messages.length === 0 ? (
                                    <p className="text-gray-500">No messages found.</p>
                                ) : (
                                    messages.map((msg) => (
                                        <div key={msg.id} className="rounded-md border border-gray-200 p-4 flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{msg.name}</h3>
                                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button onClick={() => handleDeleteMessage(msg.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Manage Blog Posts Section */}
                    {activeTab === "manage" && (
                        <div className="rounded-lg bg-white p-6 shadow-md flex flex-col h-[600px] max-w-4xl mx-auto">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex-shrink-0">Manage Blog Posts</h2>
                            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
                                {blogPosts.length === 0 ? (
                                    <p className="text-gray-500">No blog posts found.</p>
                                ) : (
                                    blogPosts.map((post) => (
                                        <div key={post.id} className="rounded-md border border-gray-200 p-4 flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-start justify-between">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(post.category)}`}>{BLOG_CATEGORIES[post.category]}</span>
                                                        <span className={`px-2 py-0.5 text-xs rounded-full ${post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{post.published ? "Published" : "Draft"}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 truncate max-w-md">{post.content}</p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button onClick={() => handleEditPost(post)} className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeletePost(post.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
