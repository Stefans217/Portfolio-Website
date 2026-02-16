import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { z } from "zod";
import { Prisma } from "@/generated/prisma";

const BLOG_CATEGORIES = ["NETWORKING", "TUTORIALS", "RANDOM", "TECH_NEWS", "PERSONAL"] as const;

// Zod schemas for input validation
const CreatePostSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title must be at most 200 characters"),
    content: z.string().min(1, "Content is required"),
    category: z.enum(BLOG_CATEGORIES).default("RANDOM"),
    published: z.boolean().default(false),
});

const UpdatePostSchema = z.object({
    id: z.string().min(1, "Post ID is required"),
    title: z.string().min(1, "Title is required").max(200, "Title must be at most 200 characters").optional(),
    content: z.string().min(1, "Content is required").optional(),
    category: z.enum(BLOG_CATEGORIES).optional(),
    published: z.boolean().optional(),
});

// Helper to check auth
async function checkAuth() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    if (!sessionToken || !verifySession(sessionToken)) {
        return false;
    }
    return true;
}

/** Helper to detect Prisma "record not found" errors */
function isPrismaNotFound(error: unknown): boolean {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    );
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
        const body = await req.json();
        const result = CreatePostSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { title, content, category, published } = result.data;

        const post = await prisma.blogPost.create({
            data: { title, content, category, published },
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
        const body = await req.json();
        const result = UpdatePostSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { id, ...data } = result.data;

        const post = await prisma.blogPost.update({
            where: { id },
            data,
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        if (isPrismaNotFound(error)) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }
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
        if (isPrismaNotFound(error)) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }
        console.error("Delete blog post error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
