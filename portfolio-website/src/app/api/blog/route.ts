import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

// Helper to check auth
async function checkAuth() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    if (!sessionToken || !verifySession(sessionToken)) {
        return false;
    }
    return true;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Fetch blog posts error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, content, category, published } = await req.json();

        if (!title || !content) {
            return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                content,
                category: category || "RANDOM",
                published: published || false,
            },
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error("Create blog post error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, title, content, category, published } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                content,
                category,
                published,
            },
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error("Update blog post error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        }

        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete blog post error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
