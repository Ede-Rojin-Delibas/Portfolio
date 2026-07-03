import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse searchable and filterable computer engineering projects across backend development, data analysis, machine learning and intelligent systems.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Section
        eyebrow="Systems library"
        title="Project case studies across software, AI, data and systems."
        description="Search and filter the work by category, title, stack or description. Each card is framed around the problem, the engineering approach and the value of the output."
      >
        <ProjectExplorer projects={projects} />
      </Section>
    </main>
  );
}
