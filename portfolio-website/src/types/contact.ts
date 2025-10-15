/**
 * Shared contact form types used by client and server.
 * Keeping this as a single source of truth ensures consistent validation.
 */
export type ContactPayload = {
    name: string;
    email: string;
    message: string;
    // honeypot to deter basic bots; should be empty
    website?: string;
};

export type ContactResponse = { ok: true; message: string } | { ok: false; fieldErrors?: Partial<Record<keyof ContactPayload, string>>; message: string };

// Minimal validator without extra deps
/**
 * Minimal runtime validation without pulling a schema lib.
 * Returns normalized data when valid, or field errors when invalid.
 */
export function validateContact(input: Partial<ContactPayload>): {
    valid: boolean;
    data?: ContactPayload;
    errors?: Partial<Record<keyof ContactPayload, string>>;
} {
    const errors: Partial<Record<keyof ContactPayload, string>> = {};

    const name = (input.name ?? "").trim();
    if (!name) errors.name = "Name is required";

    const email = (input.email ?? "").trim();
    // simple email check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = "Email is required";
    else if (!emailRe.test(email)) errors.email = "Enter a valid email";

    const message = (input.message ?? "").trim();
    if (!message) errors.message = "Message is required";
    else if (message.length < 10) errors.message = "Message must be at least 10 characters";

    const website = (input.website ?? "").trim();

    if (website) {
        // Honeypot filled -> treat as invalid silently
        errors.website = "Invalid";
    }

    const valid = Object.keys(errors).length === 0;
    if (!valid) return { valid, errors };

    return {
        valid: true,
        data: { name, email, message, website: website || undefined },
    };
}
