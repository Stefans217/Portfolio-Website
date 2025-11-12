import ProjectSection from "@/components/ProjectSection";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const allProjects: Project[] = (projectsData.allProjects as unknown as Project[]) || [];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 pb-16">
      {/* Header Section */}
      <section className="py-12 md:py-20">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          A selection of my work, showcasing various projects and technical solutions.
        </p>
      </section>

      {/* Projects List */}
      <div className="space-y-16 md:space-y-24">
        {allProjects.length > 0 ? (
          allProjects.map((project, index) => (
            <ProjectSection 
              key={project.id} 
              project={project} 
              reversed={index % 2 !== 0}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}