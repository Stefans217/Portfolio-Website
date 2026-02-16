"use client";

import { useState, useEffect } from "react";
import type { AdminUser, AdminBlogPost, AdminContactMessage } from "@/types/admin";
import LoginForm from "@/components/admin/LoginForm";
import BlogPostForm from "@/components/admin/BlogPostForm";
import BlogPostManager from "@/components/admin/BlogPostManager";
import ContactMessageList from "@/components/admin/ContactMessageList";

export default function AdminPage() {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Blog Post State
    const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);

    // Contact Messages State
    const [messages, setMessages] = useState<AdminContactMessage[]>([]);

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

    const handleLoginSuccess = (loggedInUser: AdminUser) => {
        setUser(loggedInUser);
        fetchMessages();
        fetchBlogPosts();
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        setMessages([]);
        setBlogPosts([]);
    };

    const handleEditPost = (post: AdminBlogPost) => {
        setEditingPost(post);
        setActiveTab("create");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleSaveSuccess = () => {
        setEditingPost(null);
        fetchBlogPosts();
    };

    const handleDeletePost = async (id: string) => {
        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchBlogPosts();
                if (editingPost?.id === id) {
                    setEditingPost(null);
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
        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessages((prev) => prev.filter((msg) => msg.id !== id));
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
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-sm font-light text-gray-400">Remember Ctrl+Shift+A for admin quick access</p>
                    </div>
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
                    {activeTab === "create" && (
                        <BlogPostForm editingPost={editingPost} onSaveSuccess={handleSaveSuccess} onCancelEdit={handleCancelEdit} />
                    )}
                    {activeTab === "messages" && (
                        <ContactMessageList messages={messages} onDelete={handleDeleteMessage} />
                    )}
                    {activeTab === "manage" && (
                        <BlogPostManager posts={blogPosts} onEdit={handleEditPost} onDelete={handleDeletePost} />
                    )}
                </div>
            </div>
        </div>
    );
}
