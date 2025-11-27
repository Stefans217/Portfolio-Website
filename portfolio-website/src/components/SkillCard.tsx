import type { Skill } from "@/types/skill";
import Image from "next/image";

export default function SkillCard({ name, iconSrc, details }: Skill) {
    return (
        <article className="group relative card-bg backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                {iconSrc ? (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 ring-1 ring-gray-600">
                        <Image src={iconSrc} alt={`${name} icon`} width={36} height={36} className="object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                ) : (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 ring-1 ring-gray-600">
                        <span className="text-xl font-bold text-accent-2">{name.charAt(0)}</span>
                    </div>
                )}

                {/* Content */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent-2 transition-colors">{name}</h3>
                    <p className="text-sm text-muted line-clamp-3 leading-relaxed">{details}</p>
                </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </article>
    );
}
