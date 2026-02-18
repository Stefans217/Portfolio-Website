"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";
import { getCategoryColorDark } from "@/utils/categoryColors";

type BlogPost = {
    id: string;
    title: string;
    content: string;
    htmlContent: string; // Pre-parsed HTML from server
    category: BlogCategory;
    published: boolean;
    createdAt: string;
};

type Props = {
    posts: BlogPost[];
};

// Character threshold for showing collapse/expand button
const CONTENT_COLLAPSE_THRESHOLD = 500;

export default function BlogList({ posts }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "ALL">("ALL");
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

    const filteredPosts = selectedCategory === "ALL" ? posts : posts.filter((post) => post.category === selectedCategory);

    const categories = ["ALL", ...Object.keys(BLOG_CATEGORIES)] as const;

    const toggleExpanded = useCallback((postId: string) => {
        setExpandedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    }, []);

    const isLongPost = (content: string) => content.length > CONTENT_COLLAPSE_THRESHOLD;

    return (
        <div>
            {/* Category Filter Tabs */}
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button key={category} onClick={() => setSelectedCategory(category as BlogCategory | "ALL")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "text-white theme-accent" : "card-bg text-foreground hover:bg-gray-800 border border-gray-700"}`}>
                            {category === "ALL" ? "All Posts" : BLOG_CATEGORIES[category as BlogCategory]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Count */}
            <p className="text-center text-sm text-muted mb-6">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                {selectedCategory !== "ALL" && ` in ${BLOG_CATEGORIES[selectedCategory]}`}
            </p>

            {/* Posts Grid */}
            <div className="space-y-8">
                {filteredPosts.length === 0 ? (
                    <p className="text-center text-muted">No blog posts in this category yet.</p>
                ) : (
                    filteredPosts.map((post) => {
                        const isExpanded = expandedPosts.has(post.id);
                        const shouldCollapse = isLongPost(post.content);

                        return <BlogPostCard key={post.id} post={post} isExpanded={isExpanded} shouldCollapse={shouldCollapse} onToggle={toggleExpanded} />;
                    })
                )}
            </div>
        </div>
    );
}

type BlogPostCardProps = {
    post: BlogPost;
    isExpanded: boolean;
    shouldCollapse: boolean;
    onToggle: (postId: string) => void;
};

// Memoized BlogPostCard to prevent re-renders when other posts change
const BlogPostCard = memo(function BlogPostCard({ post, isExpanded, shouldCollapse, onToggle }: BlogPostCardProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [post.htmlContent]);

    // Collapsed height in pixels (approximately 6 lines of text)
    const collapsedHeight = 150;

    const handleToggle = useCallback(() => {
        onToggle(post.id);
    }, [onToggle, post.id]);

    return (
        <article className="card-bg rounded-lg shadow-md overflow-hidden p-6 transition-all duration-300 ease-in-out border border-gray-700">
            <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColorDark(post.category)}`}>{BLOG_CATEGORIES[post.category]}</span>
                <p className="text-sm text-muted">{formatDate(post.createdAt)}</p>
            </div>
            <h2 className="section-heading mb-4">{post.title}</h2>

            <div className="relative">
                <div
                    ref={contentRef}
                    className="blog-content prose prose-gray max-w-none overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        maxHeight: shouldCollapse && !isExpanded ? `${collapsedHeight}px` : contentHeight ? `${contentHeight}px` : "none",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />

                {/* Gradient fade overlay when collapsed */}
                {shouldCollapse && !isExpanded && <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />}
            </div>

            {/* Expand/Collapse Button */}
            {shouldCollapse && (
                <button onClick={handleToggle} className="mt-4 flex items-center gap-2 text-accent-2 hover:text-accent font-medium transition-colors duration-200">
                    <span>{isExpanded ? "Show less" : "Read more"}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            )}
        </article>
    );
});

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
