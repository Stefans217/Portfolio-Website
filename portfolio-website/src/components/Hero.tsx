"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroProps = {
    name: string;
    tagline: string;
    photoSrc: string | string[];
};

export default function Hero({ name, tagline, photoSrc }: HeroProps) {
    const images = Array.isArray(photoSrc) ? photoSrc : [photoSrc];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Split name into first name and last name for staggered styling
    const nameParts = name.split(" ");

    return (
        <section className="relative w-full py-16 md:py-28 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-2)] opacity-[0.03] blur-[120px]" />
            </div>

            <div
                className={`relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 transition-all duration-1000 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                {/* Photo */}
                <div className="relative group">
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[var(--accent)] via-transparent to-[var(--accent-2)] opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-700" />

                    {/* Photo container */}
                    <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden ring-2 ring-white/10 shadow-2xl">
                        {images.map((src, index) => (
                            <Image
                                key={src}
                                src={src}
                                alt={`${name} photo`}
                                fill
                                sizes="(max-width: 768px) 176px, 224px"
                                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                                    index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                                priority={index === 0}
                            />
                        ))}
                    </div>

                    {/* Dot indicators for multiple images */}
                    {images.length > 1 && (
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, index) => (
                                <button
                                    key={`dot-${
                                        // biome-ignore lint/suspicious/noArrayIndexKey: stable order
                                        index
                                    }`}
                                    type="button"
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                                        index === currentIndex
                                            ? "bg-[var(--accent)] w-4"
                                            : "bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label={`View photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Text content */}
                <div className="text-center md:text-left space-y-5">
                    {/* Greeting line */}
                    <p
                        className={`text-sm md:text-base font-medium tracking-[0.25em] uppercase text-[var(--accent)] transition-all duration-700 delay-200 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        Hello, I&apos;m
                    </p>

                    {/* Name */}
                    <h1 className="flex flex-col gap-0 leading-[1.1]">
                        {nameParts.map((part, i) => (
                            <span
                                key={part}
                                className={`block text-5xl md:text-7xl font-bold text-foreground tracking-tight transition-all duration-700 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                                style={{ transitionDelay: `${300 + i * 120}ms` }}
                            >
                                {part}
                            </span>
                        ))}
                    </h1>

                    {/* Divider */}
                    <div
                        className={`flex items-center gap-4 justify-center md:justify-start transition-all duration-700 delay-500 ${
                            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                        }`}
                    >
                        <span className="h-px w-12 bg-gradient-to-r from-[var(--accent)] to-transparent" />
                    </div>

                    {/* Tagline */}
                    <p
                        className={`text-lg md:text-xl text-[var(--muted)] font-light tracking-wide max-w-md transition-all duration-700 delay-600 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        {tagline}
                    </p>

                    {/* CTA row */}
                    <div
                        className={`flex items-center gap-4 justify-center md:justify-start pt-2 transition-all duration-700 delay-700 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <Link
                            href="/projects"
                            className="px-6 py-2.5 text-sm font-medium rounded-full bg-[var(--accent)] text-white hover:brightness-110 transition-all duration-300 shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-2.5 text-sm font-medium rounded-full border border-white/15 text-[var(--foreground)] hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
