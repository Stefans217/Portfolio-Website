// this is the main landing page of the website
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsGrid from "@/components/SkillsGrid";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import skillsData from "@/data/skills.json";
import type { Skill } from "@/types/skill";

//define projects and skills with type safety.
const allProjects: Project[] = (projectsData.allProjects as unknown as Project[]) || [];
const allSkills: Skill[] = (skillsData.allSkills as unknown as Skill[]) || [];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 pb-16">

      {/* Hero Section */}
      <section className="mb-16">
        <Hero name="Stefan Spataro" title="IT and Software Engineer" photoSrc="/images/MountainPhoto.jpg" />
      </section>

      {/* About Me Section */}
      <section className="mb-16">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{aboutData.aboutMe}</p> 
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Skills</h2>
        </div>
        <SkillsGrid skills={allSkills}/>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-16">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
        </div>
        <ProjectsGrid projects={allProjects} />
      </section>

    </main>
  );
}