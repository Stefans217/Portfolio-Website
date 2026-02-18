import type { Skill } from "@/types/skill";

export default function SkillCard({ name, details }: Skill) {
    return (
        <article className="py-4 border-b border-gray-800">
            <h3 className="text-sm font-medium tracking-wide uppercase text-foreground mb-1">{name}</h3>
            <p className="text-sm text-muted leading-relaxed">{details}</p>
        </article>
    );
}
