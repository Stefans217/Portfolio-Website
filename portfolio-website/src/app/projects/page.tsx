import ProjectSection from "@/components/ProjectSection";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const allProjects: Project[] = (projectsData.allProjects as unknown as Project[]) || [];

export default function ProjectsPage() {
    return (
        <main className="page-container">
            {/* Header Section */}
            <section className="mb-12">
                <div className="section-divider">
                    <h1 className="page-title">Projects</h1>
                </div>
                <p className="body-text">A selection of my work, showcasing various projects and technical solutions.</p>
            </section>

            {/* Projects List */}
            <div className="space-y-16 md:space-y-24">
                {allProjects.length > 0 ? (
                    allProjects.map((project, index) => <ProjectSection key={project.id} project={project} reversed={index % 2 !== 0} />)
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted">No projects available yet.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
