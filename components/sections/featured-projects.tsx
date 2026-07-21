import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { WheelScroll } from "@/components/shared/wheel-scroll";
import { Button } from "@/components/ui/button";

const showcaseProjects = featuredProjects.slice(0, 5);

export function FeaturedProjects() {
  return (
    <Section
      id="featured-projects"
      className="projects-showcase-skin section-skin"
      chapter="05"
      eyebrow="Selected systems"
      title="Case studies in software, data and intelligent systems."
      description="Each card presents one practical engineering problem: what it solves, which tools it uses, and how the work connects to real-world value."
    >
      <WheelScroll className="project-scroll-shell project-scroll-shell--featured">
        <div className="project-scroll-track" aria-label="Featured projects">
          {showcaseProjects.map((project, index) => (
            <Reveal
              className="project-scroll-item"
              delay={index * 0.08}
              direction={index % 2 === 0 ? "left" : "right"}
              key={project.slug}
            >
              <ProjectCard {...project} compactPreview />
            </Reveal>
          ))}
        </div>
      </WheelScroll>

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
