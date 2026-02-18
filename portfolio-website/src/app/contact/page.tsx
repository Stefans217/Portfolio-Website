import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch about employment opportunities, contract work, or collaborations.",
};

export default function ContactPage() {
    return (
        <main className="page-container">
            <header className="mb-8">
                <div className="section-divider">
                    <h1 className="page-title">Contact me</h1>
                </div>
                <p className="body-text-sm">Looking for a collaborator or hiring for a role? Drop a note below. All inquiries welcome.</p>
            </header>

            <section className="mx-auto max-w-3xl rounded-xl border border-gray-700 card-bg p-6 backdrop-blur sm:p-8">
                <ContactForm />
            </section>
        </main>
    );
}
