import ProjectSectionLeft from "@/components/ProjectSectionLeft";
import ProjectSectionRight from "@/components/ProjectSectionRight";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const allProjects: Project[] = (projectsData.allProjects as unknown as Project[]) || [];

export default function ProjectsPage() {
  return (
    <main className="w-full">
      {/* Optional heading */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">A selection of my work, alternating layouts as you scroll.</p>
      </div>

  {allProjects.map((project, idx) => (
        idx % 2 === 0 ? (
          <ProjectSectionRight key={project.id} project={project} />
        ) : (
          <ProjectSectionLeft key={project.id} project={project} />
        )
      ))}

      {/* Spacer at the end */}
      <div className="h-16" />
    </main>
  );
}