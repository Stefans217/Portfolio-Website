import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsSection from "@/components/SkillsSection";
import ScrollHint from "@/components/ScrollHint";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import skillsData from "@/data/skills.json";
import type { Skill } from "@/types/skill";

const allProjects: Project[] = (projectsData.allProjects as unknown as Project[]) || [];
const allSkills: Skill[] = (skillsData.allSkills as unknown as Skill[]) || [];

export default function Home() {
    return (
        <main className="page-container !pt-0">
            {/* Hero Section */}
            <section className="relative">
                <Hero name="Stefan Spataro" tagline="A network enthusiast who likes to build software" photoSrc={["/images/ProfessionalVothPhoto.jpg", "/images/MountainPhoto.jpg"]} />

                {/* Scroll-down indicator (client component) */}
                <ScrollHint targetId="about" />
            </section>

            {/* About Me Section */}
            <section id="about" className="mb-12">
                <div className="section-divider">
                    <h2 className="section-heading">About Me</h2>
                </div>
                <p className="body-text">{aboutData.aboutMe}</p>
            </section>

            {/* Skills Section (client wrapper for scroll behaviour) */}
            <SkillsSection skills={allSkills} />

            {/* Featured Projects Section */}
            <section className="mb-16">
                <div className="section-divider">
                    <h2 className="section-heading">Featured Projects</h2>
                </div>
                <ProjectsGrid projects={allProjects} />
            </section>
        </main>
    );
}
