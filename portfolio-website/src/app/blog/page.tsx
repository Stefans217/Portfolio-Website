import { Suspense } from "react";
import prisma from "@/lib/prisma";
import BlogList from "@/components/BlogList";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import LoadingSpinner from "@/components/LoadingSpinner";

// Use ISR: revalidate every 60 seconds (do NOT combine with force-dynamic)
export const revalidate = 60;

// Configure marked once at module level
marked.setOptions({
    breaks: true,
    gfm: true,
});

// Separate async component for data fetching
async function BlogPosts() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            content: true,
            category: true,
            published: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    // Convert dates to strings, parse markdown, and sanitize HTML to prevent XSS
    const serializedPosts = posts.map((post) => ({
        ...post,
        content: post.content,
        htmlContent: sanitizeHtml(marked.parse(post.content) as string, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt", "title", "width", "height"],
                a: ["href", "name", "target", "rel"],
                code: ["class"],
                span: ["class"],
            },
        }),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));

    return <BlogList posts={serializedPosts} />;
}

export default function BlogPage() {
    return (
        <main className="page-container">
            <div className="section-divider">
                <h1 className="page-title">Blog</h1>
            </div>
            <Suspense fallback={<BlogSkeleton />}>
                <BlogPosts />
            </Suspense>
        </main>
    );
}

// Skeleton loader for blog posts - shows immediately
function BlogSkeleton() {
    return (
        <div className="space-y-8">
            {/* Category filter skeleton */}
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-10 w-24 bg-gray-800 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Post count skeleton */}
            <div className="flex justify-center mb-6">
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
            </div>

            {/* Post cards skeleton */}
            {[1, 2, 3].map((i) => (
                <article key={i} className="card-bg rounded-lg shadow-md p-6 animate-pulse border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <div className="h-6 w-20 bg-gray-800 rounded-full" />
                        <div className="h-4 w-24 bg-gray-800 rounded" />
                    </div>
                    <div className="h-8 w-3/4 bg-gray-800 rounded mb-4" />
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-800 rounded" />
                        <div className="h-4 w-full bg-gray-800 rounded" />
                        <div className="h-4 w-2/3 bg-gray-800 rounded" />
                    </div>
                </article>
            ))}
        </div>
    );
}
