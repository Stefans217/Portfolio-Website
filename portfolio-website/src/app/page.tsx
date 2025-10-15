// this is the main landing page of the website
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { featuredProjects } from "@/data/projects";

export default function Page0() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6">
      <Hero name="Stefan Spataro" title="IT and Software Engineer" photoSrc="/next.svg" />

      <section className="py-4 md:py-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Featured Projects</h2>
        <ProjectsGrid projects={featuredProjects} />
      </section>
    </main>
  );
}