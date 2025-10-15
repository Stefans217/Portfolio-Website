"use client";

import { useId, useState } from "react";
import type { ContactPayload, ContactResponse } from "@/types/contact";
import { MESSAGE_MAX_LENGTH, validateContact } from "@/types/contact";

type SubmitState = { status: "idle" } | { status: "submitting" } | { status: "success"; message: string } | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactPayload, string>> };

export default function ContactForm() {
    const formId = useId();
    const [values, setValues] = useState<ContactPayload>({ name: "", email: "", message: "", website: "" });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

    const clientErrors = validateContact(values).errors ?? {};

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched((t) => ({ ...t, [e.target.name]: true }));
    };

    const hasError = (name: keyof ContactPayload) => Boolean(touched[name] && clientErrors[name]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmit({ status: "submitting" });

        const result = validateContact(values);
        if (!result.valid) {
            setSubmit({ status: "error", message: "Please fill in all fields and try again.", fieldErrors: result.errors });
            // Mark fields with errors as touched to reveal inline errors
            if (result.errors) {
                const touchedUpdate: Record<string, boolean> = {};
                for (const k of Object.keys(result.errors)) {
                    touchedUpdate[k] = true;
                }
                setTouched((prev) => ({ ...prev, ...touchedUpdate }));
            }
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });
            const data = (await res.json()) as ContactResponse;
            if (!res.ok || !data.ok) {
                setSubmit({ status: "error", message: data.message || "Submission failed", fieldErrors: "fieldErrors" in data ? data.fieldErrors : undefined });
                return;
            }
            // Success: show message and reset the form
            setSubmit({ status: "success", message: data.message });
            setValues({ name: "", email: "", message: "", website: "" });
            setTouched({});
        } catch (err) {
            setSubmit({ status: "error", message: "Network error. Please try again." });
        }
    };

    return (
        <form onSubmit={onSubmit} aria-describedby={`${formId}-desc`} className="mx-auto max-w-xl space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Name" name="name" required value={values.name} onChange={onChange} onBlur={onBlur} error={hasError("name") ? clientErrors.name : undefined} />
                <FormField label="Email" name="email" type="email" required value={values.email} onChange={onChange} onBlur={onBlur} error={hasError("email") ? clientErrors.email : undefined} />
            </div>

            <FormTextArea label="Message" name="message" required value={values.message} onChange={onChange} onBlur={onBlur} error={hasError("message") ? clientErrors.message : undefined} rows={6} maxLength={MESSAGE_MAX_LENGTH} />

            {/* Honeypot: hidden from users, visible to bots */}
            <div className="sr-only" aria-hidden>
                <label>
                    Website
                    <input name="website" autoComplete="off" tabIndex={-1} value={values.website ?? ""} onChange={onChange} />
                </label>
            </div>

            {submit.status === "error" && (
                <div className="rounded-md border border-red-800 bg-red-950/30 p-3 text-sm text-red-300" role="alert">
                    {submit.message}
                </div>
            )}
            {submit.status === "success" && (
                <div className="rounded-md border border-emerald-800 bg-emerald-950/30 p-3 text-sm text-emerald-300" role="status">
                    {submit.message}
                </div>
            )}

            <button type="submit" disabled={submit.status === "submitting"} className="inline-flex w-full items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50">
                {submit.status === "submitting" ? "Sending…" : "Send message"}
            </button>
        </form>
    );
}

type FieldProps = {
    label: string;
    name: keyof ContactPayload;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    type?: "text" | "email";
    required?: boolean;
    error?: string;
};

function FormField({ label, name, value, onChange, onBlur, type = "text", required, error }: FieldProps) {
    const id = `${name}`;
    const describedBy = error ? `${id}-error` : undefined;
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-200">
                {label} {required ? <span className="text-red-400">*</span> : null}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                className="block w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30 focus:ring-0"
                placeholder={typeof label === "string" ? label.replace(/ \(optional\)/, "") : ""}
                autoComplete={name === "email" ? "email" : name === "name" ? "name" : "on"}
            />
            {error ? (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-400">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

type TextAreaProps = {
    label: string;
    name: keyof ContactPayload;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    required?: boolean;
    error?: string;
    maxLength?: number;
};

function FormTextArea({ label, name, value, onChange, onBlur, rows = 3, required, error, maxLength }: TextAreaProps) {
    const id = `${name}`;
    const describedBy = error ? `${id}-error` : undefined;
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-200">
                {label} {required ? <span className="text-red-400">*</span> : null}
            </label>
            <textarea id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} rows={rows} aria-invalid={Boolean(error)} aria-describedby={describedBy} className="block w-full resize-y rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30 focus:ring-0" placeholder="How can I help?" maxLength={maxLength} />
            {error ? (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-400">
                    {error}
                </p>
            ) : null}
            {typeof maxLength === "number" ? (
                <p className="mt-1 text-right text-xs text-gray-400">
                    {value.length} / {maxLength}
                </p>
            ) : null}
        </div>
    );
}
