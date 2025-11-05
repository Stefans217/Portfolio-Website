// this is the main landing page of the website
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import aboutData from "@/data/about.json";
import { featuredProjects } from "@/data/projects";
import { featuredSkills } from "@/data/skills";

export default function Page0() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6">

      {/*Name and Photo*/}
      <Hero name="Stefan Spataro" title="IT and Software Engineer" photoSrc="/images/MountainPhoto.jpg" />

      {/* About Me */}
      <section className="py-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">About Me</h2>
        <hr aria-hidden="true" className="my-4 border-t border-gray-200 dark:border-gray-700" />
        <p className="text-gray-700 dark:text-gray-400">{aboutData.aboutMe}</p> 
      </section>
    
      <section className="mt-4 py-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Skills</h2>
        <SkillsGrid skills={featuredSkills}/>
      </section>

      {/*Featured Projects*/}Featured Projects

      <section className="mt-4 py-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Featured Projects</h2>
        <ProjectsGrid projects={featuredProjects} />
      </section>

    </main>
  );
}