"use client";

import Image from "next/image";

type HeroProps = {
  name: string;
  title: string;
  photoSrc?: string; // path under public or imported static asset
};

export default function Hero({ name, title, photoSrc = "/next.svg" }: HeroProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
          <Image
            src={photoSrc}
            alt={`${name} profile photo`}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{name}</h1>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mt-2">{title}</p>
        </div>
      </div>
    </section>
  );
}
