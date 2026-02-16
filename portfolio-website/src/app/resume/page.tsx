import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: "View and download Stefan Spataro's resume.",
};

const RESUME_PATH = "/resume/Stefan_Spataro_Resume.pdf";

export default function ResumePage() {
    return (
        <main className="page-container">
            <header className="mb-8">
                <div className="section-divider">
                    <h1 className="page-title">Resume</h1>
                </div>
                <p className="body-text-sm">
                    View my resume below or download a copy.
                </p>
            </header>

            {/* Download button */}
            <div className="flex justify-center sm:justify-start mb-6">
                <a
                    href={RESUME_PATH}
                    download
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full bg-[var(--accent)] text-white hover:brightness-110 transition-all duration-300 shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40"
                >
                    {/* Download icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                        />
                    </svg>
                    Download Resume
                </a>
            </div>

            {/* Embedded PDF viewer */}
            <section className="rounded-xl border border-gray-700 card-bg overflow-hidden backdrop-blur">
                <div className="relative w-full" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
                    <object
                        data={RESUME_PATH}
                        type="application/pdf"
                        className="w-full h-full"
                        aria-label="Stefan Spataro's resume"
                    >
                        {/* Fallback for browsers that don't support embedded PDFs */}
                        <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-[var(--muted)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="text-[var(--muted)] text-lg">
                                Your browser does not support embedded PDFs.
                            </p>
                            <a
                                href={RESUME_PATH}
                                download
                                className="px-6 py-2.5 text-sm font-medium rounded-full bg-[var(--accent)] text-white hover:brightness-110 transition-all duration-300"
                            >
                                Download Resume Instead
                            </a>
                        </div>
                    </object>
                </div>
            </section>
        </main>
    );
}
