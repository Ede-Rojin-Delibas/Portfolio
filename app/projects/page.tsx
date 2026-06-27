import { projects } from "@/data/projects";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Section } from "@/components/shared/section";

export default function ProjectsPage() {
  return (
    <main>
      <Section
        eyebrow="Projects"
        title="Project library"
        description="Search and filter the project list by category, title, stack or description. The animated grid makes changes easier to follow."
      >
        <ProjectExplorer projects={projects} />
      </Section>
    </main>
  );
}
