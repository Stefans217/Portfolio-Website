import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactNotification = {
    name: string;
    email: string;
    message: string;
};

/**
 * Send an email notification when a new contact form submission is received.
 * Uses Resend's default "onboarding@resend.dev" sender until a custom domain
 * is verified. Replace the `from` address once you've set up a domain in Resend.
 */
export async function sendContactNotification({ name, email, message }: ContactNotification) {
    const to = process.env.NOTIFICATION_EMAIL;
    if (!to) {
        console.warn("[resend] NOTIFICATION_EMAIL not set, skipping email");
        return;
    }

    const { error } = await resend.emails.send({
        from: "Portfolio Contact <contact@notify.stefanspataro.com>",
        to,
        subject: `New contact message from ${name}`,
        replyTo: email,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
    });

    if (error) {
        throw new Error(`[resend] Failed to send email: ${error.message}`);
    }
}

function escapeHtml(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
