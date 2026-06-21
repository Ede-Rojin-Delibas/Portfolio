import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjects() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold">Featured Projects</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
