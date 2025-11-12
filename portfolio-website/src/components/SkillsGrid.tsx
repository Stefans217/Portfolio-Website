"use client";

import { useState } from "react";
import SkillCard from "@/components/SkillCard";
import { Skill } from "@/types/skill";

type SkillsGridProps = {
    skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps ){
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowButton = skills.length > 6;
    const displayedSkills = shouldShowButton && !isExpanded ? skills.slice(0, 6) : skills;

    return(
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSkills.map((s) => (
                    <SkillCard key={s.id} {...s} />
                ))}
            </div>

            {shouldShowButton && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                Show Less
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </>
                        ) : (
                            <>
                                Show All {skills.length} Skills
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}