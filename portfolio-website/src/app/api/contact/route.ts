import { NextResponse } from "next/server";
import type { ContactPayload, ContactResponse } from "@/types/contact";
import { validateContact } from "@/types/contact";
import prisma from "@/lib/prisma";

// Prisma requires the Node.js runtime (not Edge)
export const runtime = "nodejs";

// POST /api/contact
// Note: This endpoint is intentionally simple; in production consider
// adding rate limiting and a mail provider. Keep validation shared
// with the client for a single source of truth.
export async function POST(req: Request): Promise<NextResponse<ContactResponse>> {
    try {
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ ok: false, message: "Invalid content type" }, { status: 415 });
        }

        const body = (await req.json()) as Partial<ContactPayload>;

        // Basic anti-spam: if honeypot filled, appear successful but do nothing.
        if (body.website && String(body.website).trim() !== "") {
            return NextResponse.json({ ok: true, message: "Thanks for reaching out!" }, { status: 200 });
        }

        const result = validateContact(body);

        if (!result.valid) {
            return NextResponse.json({ ok: false, message: "Please fix the errors and try again.", fieldErrors: result.errors }, { status: 400 });
        }

        const data = result.data!;

        // Persist to the database
        await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        });

        return NextResponse.json({ ok: true, message: "Thanks for reaching out! I will get back to you soon." }, { status: 200 });
    } catch (err) {
        console.error("[contact] error", err);
        return NextResponse.json({ ok: false, message: "Something went wrong. Please try again later." }, { status: 500 });
    }
}
