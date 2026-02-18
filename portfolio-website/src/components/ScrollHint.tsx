"use client";

import { useEffect, useState } from "react";

/**
 * A scroll-down indicator that fades out once the user scrolls past a threshold.
 * Also handles smooth-scrolling to a target element identified by `targetId`.
 */
export default function ScrollHint({ targetId }: { targetId: string }) {
    const [showScrollHint, setShowScrollHint] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollHint(window.scrollY <= 80);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <button
            type="button"
            onClick={scrollToTarget}
            aria-label="Scroll down to see more"
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer transition-opacity duration-500 ${
                showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <span className="text-xs tracking-widest uppercase text-[var(--muted)]">Scroll</span>
            <svg
                className="w-5 h-5 text-[var(--accent)] animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
}
