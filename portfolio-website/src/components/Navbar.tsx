"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../assets/images/Logo 7.png";
import githubIcon from "../assets/images/github-mark-white.png";
import linkedinIcon from "../assets/images/InBug-White.png";

const NAV_LINKS = [
    { href: "/", label: "Home & About" },
    { href: "/projects", label: "My Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Me" },
] as const;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full theme-navbar backdrop-blur-sm border-b border-gray-700/80">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
                {/* Logo & Name */}
                <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105" aria-label="Home">
                    <Image src={logo} alt="Stefan Spataro logo" width={80} height={80} className="rounded-full object-cover" priority />
                    <span className="hidden sm:inline-block font-semibold text-lg text-white drop-shadow-sm">Stefan Spataro</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link key={href} href={href} className="text-sm font-medium header-link nav-link-underline">
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Social Icons & Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Social Icons */}
                    <div className="hidden sm:flex items-center gap-3">
                        <a href="https://github.com/Stefans217?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center transition-transform duration-200 hover:scale-110" aria-label="GitHub Profile">
                            <Image src={githubIcon} alt="" width={30} height={30} />
                        </a>
                        <a href="https://www.linkedin.com/in/stefanspataro-8ba631225/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center transition-transform duration-200 hover:scale-110" aria-label="LinkedIn Profile">
                            <Image src={linkedinIcon} alt="" width={30} height={30} />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button type="button" className="md:hidden p-2 rounded-md hover:bg-gray-700/50 text-white transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-700/80 theme-navbar backdrop-blur-sm">
                    <nav className="max-w-6xl mx-auto p-4 flex flex-col gap-3" aria-label="Mobile navigation">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link key={href} href={href} className="block py-2 mobile-link transition-colors" onClick={() => setIsMenuOpen(false)}>
                                {label}
                            </Link>
                        ))}

                        {/* Mobile Social Links */}
                        <div className="flex gap-4 pt-2 border-t border-gray-700/50 mt-2">
                            <a href="https://github.com/Stefans217?tab=repositories" target="_blank" rel="noopener noreferrer" className="mobile-link transition-colors" aria-label="GitHub Profile">
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/stefanspataro-8ba631225/" target="_blank" rel="noopener noreferrer" className="mobile-link transition-colors" aria-label="LinkedIn Profile">
                                LinkedIn
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
