"use client";

import Link from "next/link";
import { useState } from "react";
import logo from "../assets/images/Professional Logo 3.png";
import githubIcon from "../assets/images/github-mark-white.png";
import linkedinIcon from "../assets/images/InBug-White.png";
import xIcon from "../assets/images/logo-white.png";
import Image from "next/image";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-black backdrop-blur-sm border-b">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
                {/* Logo area */}
                <div className="flex items-center gap-3">
                    <Link href="/page0" className="flex items-center gap-3">
                        <Image src={logo} alt="Stefan's logo" width={80} height={80} className="rounded-full object-cover" />
                        <span className="hidden sm:inline-block font-semibold text-lg text-white drop-shadow-sm">Stefan Spataro</span>
                    </Link>
                </div>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/page0" className="text-sm font-medium text-gray-200 hover:text-[#c29a62]">
                        Home & About
                    </Link>
                    <Link href="/page1" className="text-sm text-gray-200 hover:text-[#c29a62]">
                        My Projects
                    </Link>
                    <Link href="/page2" className="text-sm text-gray-200 hover:text-[#c29a62]">
                        Contact Me
                    </Link>
                </nav>

                {/* Social icons + mobile menu button */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-3">
                        <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center">
                            <span className="sr-only">GitHub</span>
                            <Image src={githubIcon} alt="" width={30} height={30} />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center">
                            <span className="sr-only">LinkedIn</span>
                            <Image src={linkedinIcon} alt="" width={30} height={30} />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button type="button" className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile panel */}
            {open && (
                <div className="md:hidden border-t bg-white/60 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-3">
                        <Link href="/page0" className="block text-gray-700 font-medium">
                            Home & About
                        </Link>
                        <Link href="/page1" className="block text-gray-600">
                            My Projects
                        </Link>
                        <Link href="/page2" className="block text-gray-600">
                            Contact Me
                        </Link>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-600">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
