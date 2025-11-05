"use client";

import Image from "next/image";

type HeroProps = {
  name: string;
  title: string;
  photoSrc: string;
};

export default function Hero({ name, title, photoSrc }: HeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20">
      <div className="relative flex flex-col items-center gap-6 md:gap-10">
        
        {/* Combined image, name, and title */}
        <div className="relative w-full md:w-2/3 h-auto">

          {/* Background image */}
          <div className="relative w-full h-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={photoSrc}
              alt={`${name} background`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Name and title overlayed spilling over the top and left */}
          <div className="absolute -top-6 -left-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-md max-w-md">
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mt-2">
              {title}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
