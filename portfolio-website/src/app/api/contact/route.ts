import { NextResponse } from "next/server";
import type { ContactPayload, ContactResponse } from "@/types/contact";
import { validateContact } from "@/types/contact";
import prisma from "@/lib/prisma";
import { sendContactNotification } from "@/lib/resend";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// Prisma requires the Node.js runtime (not Edge)
export const runtime = "nodejs";

// GET /api/contact
// Fetch all contact messages (protected)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    
    if (!sessionToken || !verifySession(sessionToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// DELETE /api/contact
// Delete a contact message (protected)
export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken || !verifySession(sessionToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    console.error("[contact] delete error", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// POST /api/contact
// Note: This endpoint is intentionally simple; in production consider
// adding rate limiting and a mail provider. Keep validation shared
// with the client for a single source of truth.
export async function POST(
  req: Request
): Promise<NextResponse<ContactResponse>> {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, message: "Invalid content type" },
        { status: 415 }
      );
    }

    const body = (await req.json()) as Partial<ContactPayload>;

    // Basic anti-spam: if honeypot filled, appear successful but do nothing.
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json(
        { ok: true, message: "Thanks for reaching out!" },
        { status: 200 }
      );
    }

    const result = validateContact(body);

    if (!result.valid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the errors and try again.",
          fieldErrors: result.errors,
        },
        { status: 400 }
      );
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

    // Send email notification — awaited so the serverless runtime doesn't
    // terminate before Resend completes. A failed email does not fail the
    // request; the message is already saved.
    try {
      await sendContactNotification({
        name: data.name,
        email: data.email,
        message: data.message,
      });
    } catch (err) {
      console.error("[contact] email notification failed", err);
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thanks for reaching out! I will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
