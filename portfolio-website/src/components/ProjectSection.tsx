import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

type Props = {
  project: Project;
  reversed?: boolean;
};

export default function ProjectSection({ project, reversed = false }: Props) {
  const { title, description, tags, href, repo, imageSrc } = project;
  
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        
        {/* Image Card */}
        <div className={`${reversed ? 'md:order-2' : 'md:order-1'} order-1 md:col-span-3`}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm group h-80 md:h-[32rem]">
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={`${title} preview image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className={`${reversed ? 'md:order-1' : 'md:order-2'} order-2 md:col-span-2`}>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {description}
          </p>
          
          {tags?.length ? (
            <ul className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="text-sm px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          
          {(href || repo) && (
            <div className="flex items-center gap-4">
              {href && (
                <Link
                  href={href}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
                >
                  Live Demo →
                </Link>
              )}
              {repo && (
                <Link
                  href={repo}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
                >
                  View Code →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
