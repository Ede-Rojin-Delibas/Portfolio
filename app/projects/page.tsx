import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export default function ProjectsPage() {
  return (
    <main>
      <Section
        eyebrow="Projects"
        title="Project library"
        description="Bugün kart sistemini kuruyoruz. Sonraki adımda bu sayfaya kategori filtresi ve arama özelliği ekleyeceğiz."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal delay={index * 0.08} key={project.slug}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
