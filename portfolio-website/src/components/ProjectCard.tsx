import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectCard({ title, description, tags = [], repo, imageSrc }: Project) {
    return (
        <article className="group relative card-bg backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:-translate-y-1 overflow-hidden shadow-sm hover:shadow-md">
            {imageSrc ? (
                <div className="relative w-full h-40">
                    <Image src={imageSrc} alt={`${title} preview image`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
            ) : null}
            <div className="p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-2 transition-colors">{title}</h3>
                <p className="text-sm text-muted line-clamp-3 leading-relaxed">{description}</p>
                {tags?.length ? (
                    <ul className="flex flex-wrap gap-2 mt-1">
                        {tags.map((t) => (
                            <li key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 ring-1 ring-gray-600">
                                {t}
                            </li>
                        ))}
                    </ul>
                ) : null}
                {repo && (
                    <div className="mt-2 flex items-center gap-4 pt-2 border-t border-gray-700">
                        <Link href={repo} className="text-sm text-muted hover:text-accent flex items-center gap-1">
                            View the Repo →
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
