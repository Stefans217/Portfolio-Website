import { Suspense } from "react";
import prisma from "@/lib/prisma";
import BlogList from "@/components/BlogList";
import { marked } from "marked";
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic"; // Skip prerendering, fetch data at request time
export const revalidate = 60; // Revalidate every 60 seconds

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

    // Convert dates to strings and parse markdown on the server
    const serializedPosts = posts.map((post) => ({
        ...post,
        content: post.content,
        htmlContent: marked.parse(post.content) as string,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));

    return <BlogList posts={serializedPosts} />;
}

export default function BlogPage() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Blog</h1>
                <Suspense fallback={<BlogSkeleton />}>
                    <BlogPosts />
                </Suspense>
            </div>
        </div>
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
