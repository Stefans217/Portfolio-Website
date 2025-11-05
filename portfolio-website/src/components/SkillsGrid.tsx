import SkillCard from "@/components/SkillCard";
import { Skill } from "@/types/skill";

type SkillsGridProps = {
    skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps ){
    return(
        <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((s) => (
                <SkillCard key={s.id} {...s} />
            ))}
            </div>
        </section>
    );
}