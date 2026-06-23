import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Section
        eyebrow={project.category}
        title={project.title}
        description={project.description}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
          <div className="glass-panel technical-grid min-h-80 rounded-lg p-6">
            <div className="rounded-lg border border-border/70 bg-background/75 p-5 font-mono text-sm text-muted-foreground backdrop-blur-md">
              <p>
                <span className="text-primary">project.slug</span> = &quot;
                {project.slug}&quot;
              </p>
              <p className="mt-3">
                <span className="text-primary">project.status</span> =
                &quot;case-study-coming-next&quot;
              </p>
            </div>
          </div>

          <aside className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-semibold tracking-tight">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <TechBadge key={item}>{item}</TechBadge>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {project.github ? (
                <Button asChild variant="outline" className="rounded-md">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2 className="size-4" />
                    GitHub
                  </Link>
                </Button>
              ) : null}
              {project.demo ? (
                <Button asChild className="rounded-md">
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
