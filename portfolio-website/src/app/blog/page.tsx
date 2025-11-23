import prisma from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Blog</h1>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No blog posts yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {post.content}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
