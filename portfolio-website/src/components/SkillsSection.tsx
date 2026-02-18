"use client";

import { useRef, useCallback } from "react";
import SkillsGrid from "@/components/SkillsGrid";
import type { Skill } from "@/types/skill";

/**
 * Client wrapper that provides smooth-scroll callbacks
 * to the SkillsGrid expand/collapse actions.
 */
export default function SkillsSection({ skills }: { skills: Skill[] }) {
    const sectionRef = useRef<HTMLElement>(null);

    const scrollToSkills = useCallback(() => {
        if (sectionRef.current) {
            const elementPosition = sectionRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="mb-16">
            <div className="section-divider">
                <h2 className="section-heading">Skills</h2>
            </div>
            <SkillsGrid skills={skills} onExpand={scrollToSkills} onCollapse={scrollToSkills} />
        </section>
    );
}
