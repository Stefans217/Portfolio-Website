import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch about employment opportunities, contract work, or collaborations.",
};

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-[#366899] sm:text-4xl">Contact me</h1>
                <p className="mt-2 text-m text-[#366899]">Looking for a collaborator or hiring for a role? Drop a note below. All inquiries welcome.</p>
            </header>

            <section className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur sm:p-8">
                <ContactForm />
            </section>
        </main>
    );
}
