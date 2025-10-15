// displays a single project in the projects and landing page.
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectCard({
  title,
  description,
  tags = [],
  href,
  repo,
  imageSrc,
}: Project) {
  return (
    <article className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {imageSrc ? (
        <div className="relative w-full h-40">
          <Image
            src={imageSrc}
            alt={`${title} preview image`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        {tags?.length ? (
          <ul className="flex flex-wrap gap-2 mt-1">
            {tags.map((t) => (
              <li
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        {(href || repo) && (
          <div className="mt-2 flex items-center gap-3">
            {href && (
              <Link
                href={href}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Live
              </Link>
            )}
            {repo && (
              <Link
                href={repo}
                className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Code
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
