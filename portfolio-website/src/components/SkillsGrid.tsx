"use client";

import { useState } from "react";
import SkillCard from "@/components/SkillCard";
import type { Skill } from "@/types/skill";

type SkillsGridProps = {
    skills: Skill[];
    onExpand?: () => void;
    onCollapse?: () => void;
};

export default function SkillsGrid({ skills, onExpand, onCollapse }: SkillsGridProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowButton = skills.length > 6;
    const displayedSkills = shouldShowButton && !isExpanded ? skills.slice(0, 6) : skills;

    const handleToggle = () => {
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);

        if (newExpandedState && onExpand) {
            setTimeout(() => {
                onExpand();
            }, 100);
        } else if (!newExpandedState && onCollapse) {
            setTimeout(() => {
                onCollapse();
            }, 100);
        }
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {displayedSkills.map((s) => (
                    <SkillCard key={s.name} {...s} />
                ))}
            </div>

            {shouldShowButton && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleToggle}
                        className="cursor-pointer text-sm text-muted hover:text-foreground tracking-wide uppercase transition-colors duration-200 hover:underline underline-offset-4"
                    >
                        {isExpanded ? "Show Less ↑" : `Show All ${skills.length} Skills ↓`}
                    </button>
                </div>
            )}
        </div>
    );
}
