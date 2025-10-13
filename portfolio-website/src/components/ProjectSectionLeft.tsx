import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

type Props = {
  project: Project;
};

export default function ProjectSectionLeft({ project }: Props) {
  const { title, description, tags, href, repo, imageSrc } = project;
  return (
    <section className="min-h-[90vh] w-full flex items-center">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Card (left) */}
          <div className="order-1">
            <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-sm overflow-hidden h-80 sm:h-96 md:h-[28rem]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={`${title} preview image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
              )}
            </div>
          </div>

          {/* Text (right) */}
          <div className="order-2">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">{description}</p>
            {tags?.length ? (
              <ul className="flex flex-wrap gap-2 mb-6">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="text-xs md:text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {(href || repo) && (
              <div className="flex items-center gap-4">
                {href && (
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm md:text-base font-medium text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-900 dark:hover:bg-blue-950/40"
                  >
                    Live
                  </Link>
                )}
                {repo && (
                  <Link
                    href={repo}
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm md:text-base text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-900/40"
                  >
                    Code
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
