import prisma from "@/lib/prisma";
import BlogList from "@/components/BlogList";
import { marked } from "marked";

export const revalidate = 60; // Revalidate every 60 seconds

// Configure marked once at module level
marked.setOptions({
    breaks: true,
    gfm: true,
});

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    // Convert dates to strings and parse markdown on the server
    const serializedPosts = posts.map((post) => ({
        ...post,
        content: post.content, // Keep raw content for length check
        htmlContent: marked.parse(post.content) as string, // Pre-parsed HTML
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Blog</h1>
                <BlogList posts={serializedPosts} />
            </div>
        </div>
    );
}
