"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100 border-b">
      <Link href="/page0" className="font-semibold hover:underline">Home</Link>
      <Link href="/page1" className="hover:underline">Page 1</Link>
      <Link href="/page2" className="hover:underline">Page 2</Link>
      <Link href="/page3" className="hover:underline">Page 3</Link>
    </nav>
  );
}