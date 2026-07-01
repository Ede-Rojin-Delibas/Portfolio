import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2, Monitor } from "lucide-react";
import { projects } from "@/data/projects";
import { ParallaxCard } from "@/components/shared/parallax-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const accentStyles = {
  blue: "from-blue-500/30 via-sky-400/10 to-transparent",
  cyan: "from-cyan-400/30 via-blue-500/10 to-transparent",
  indigo: "from-indigo-500/30 via-sky-400/10 to-transparent",
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
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
        <div className="mb-8">
          <Button asChild variant="ghost" className="rounded-md">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <Reveal direction="left">
            <ParallaxCard
              offset={32}
              className="glass-panel technical-grid relative min-h-96 overflow-hidden rounded-lg p-5"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-90",
                  accentStyles[project.accent],
                )}
              />
              <div className="relative rounded-lg border border-border/70 bg-background/80 p-4 font-mono text-xs text-muted-foreground backdrop-blur-md">
                <div className="mb-4 flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-amber-300" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2">{project.slug}.case-study</span>
                </div>
                <p>
                  <span className="text-primary">role</span>: &quot;
                  {project.role}&quot;
                </p>
                <p className="mt-2">
                  <span className="text-primary">year</span>: &quot;
                  {project.year}&quot;
                </p>
                <p className="mt-2">
                  <span className="text-primary">motion</span>: &quot;scroll
                  reveal, hover, parallax&quot;
                </p>
              </div>

              <div className="relative mt-5 grid gap-4 md:grid-cols-2">
                {project.screenshots.map((screenshot) => (
                  <article
                    key={screenshot.title}
                    className="rounded-lg border border-border/70 bg-background/75 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <Monitor className="mb-8 size-5 text-primary" />
                    <h2 className="font-semibold tracking-tight">
                      {screenshot.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {screenshot.description}
                    </p>
                  </article>
                ))}
              </div>
            </ParallaxCard>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <aside className="glass-panel rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 border-b border-border/70 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Role
                  </p>
                  <p className="mt-2 font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Year
                  </p>
                  <p className="mt-2 font-medium">{project.year}</p>
                </div>
              </div>

              <h2 className="mt-6 text-lg font-semibold tracking-tight">
                Stack
              </h2>
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
                      {project.demoLabel ?? "Live Demo"}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-8 glass-panel rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Highlights
            </p>
            <StaggerList className="mt-5 grid gap-3 md:grid-cols-3">
              {project.highlights.map((highlight) => (
                <StaggerItem
                  key={highlight}
                  className="rounded-md border border-border/70 bg-background/60 p-4 text-sm leading-6 text-muted-foreground"
                >
                  {highlight}
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
