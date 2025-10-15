import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";

type ProjectsGridProps = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects?.length) return null;
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
