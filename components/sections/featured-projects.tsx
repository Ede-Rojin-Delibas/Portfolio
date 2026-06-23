import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  return (
    <Section
      id="featured-projects"
      eyebrow="Selected work"
      title="Featured project cards with a technical UI feel."
      description="Each card previews the project like a small product surface: category, stack, detail route, GitHub and live demo actions."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal delay={index * 0.08} key={project.slug}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.18}>
        <div className="mt-8 flex justify-center md:justify-start">
          <Button asChild variant="outline" className="rounded-md">
            <Link href="/projects">
              Browse all projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
