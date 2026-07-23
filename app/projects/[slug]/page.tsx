import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Lightbulb,
  Route,
  Target,
} from "lucide-react";
import { generatedAssets, type GeneratedAsset } from "@/data/generated-assets";
import { getI18n } from "@/data/i18n";
import { getLocalizedProject } from "@/data/localized-content";
import { projects } from "@/data/projects";
import { ParallaxCard } from "@/components/shared/parallax-card";
import type { Project } from "@/data/projects";
import { GithubBrandIcon } from "@/components/shared/brand-icons";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerLocale } from "@/lib/server-locale";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const accentStyles = {
  blue: "from-blue-500/30 via-sky-400/10 to-transparent",
  cyan: "from-cyan-400/30 via-blue-500/10 to-transparent",
  indigo: "from-indigo-500/30 via-sky-400/10 to-transparent",
};

type ScreenshotCardProps = {
  screenshot: Project["screenshots"][number];
  accent: Project["accent"];
};

function ScreenshotCard({ screenshot, accent }: ScreenshotCardProps) {
  const accentTone = {
    blue: "from-blue-500/22 via-sky-400/10 to-transparent",
    cyan: "from-cyan-400/22 via-blue-500/10 to-transparent",
    indigo: "from-indigo-500/22 via-violet-400/10 to-transparent",
  }[accent];

  return (
    <article className="group rounded-lg border border-border/70 bg-background/75 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      {screenshot.image ? (
        <div className="mb-4 overflow-hidden rounded-md border border-border/60 bg-background/80">
          <div className="relative aspect-[16/10]">
            <Image
              src={screenshot.image.src}
              alt={screenshot.image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 92vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "mb-4 rounded-md border border-border/70 bg-gradient-to-br p-3",
            accentTone,
          )}
        >
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2.5 w-24 rounded-full bg-foreground/15" />
            <div className="h-2 w-4/5 rounded-full bg-muted-foreground/20" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[58, 82, 66].map((height, index) => (
                <div
                  key={`${screenshot.title}-${index}`}
                  className="h-12 rounded-md border border-border/60 bg-background/75"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <h2 className="font-semibold tracking-tight">{screenshot.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {screenshot.description}
      </p>
    </article>
  );
}

const caseStudySections = [
  {
    label: {
      en: "Problem",
      tr: "Problem",
    },
    field: "problem",
    icon: Lightbulb,
    tone: "amber" as const,
  },
  {
    label: {
      en: "Approach",
      tr: "Yaklaşım",
    },
    field: "approach",
    icon: Route,
    tone: "cyan" as const,
  },
  {
    label: {
      en: "Outcome",
      tr: "Sonuç",
    },
    field: "outcome",
    icon: Target,
    tone: "emerald" as const,
  },
] as const;

function getProjectScreenshotImage(
  project: Project,
  index: number,
): GeneratedAsset | undefined {
  const categoryImages: Record<string, GeneratedAsset[]> = {
    "AI & Data": [
      project.image ?? generatedAssets.machineLearningPipeline,
      generatedAssets.dataAnalysisCover,
      generatedAssets.machineLearningWorkflow,
    ],
    "Backend Systems": [
      project.image ?? generatedAssets.backendSystems,
      generatedAssets.architectureCover,
      generatedAssets.caseStudyHero,
    ],
    Portfolio: [
      project.image ?? generatedAssets.projectShowcase,
      generatedAssets.caseStudyHero,
      generatedAssets.engineeringWorkspace,
    ],
    "Productivity Systems": [
      project.image ?? generatedAssets.developerWorkspace,
      generatedAssets.careerGrowth,
      generatedAssets.engineeringIdentity,
    ],
  };

  const images = (
    categoryImages[project.category] ?? [project.image, generatedAssets.caseStudyHero]
  ).filter((image): image is GeneratedAsset => Boolean(image));

  return images[index % images.length];
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const baseProject = projects.find((item) => item.slug === slug);
  const project = baseProject
    ? getLocalizedProject(baseProject, locale)
    : undefined;

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
  const locale = await getServerLocale();
  const baseProject = projects.find((item) => item.slug === slug);
  const project = baseProject
    ? getLocalizedProject(baseProject, locale)
    : undefined;

  if (!project) {
    notFound();
  }

  const projectCopy = getI18n(locale).projectExplorer;
  const projectCategoryLabels = projectCopy.categoryLabels as
    | Record<string, string>
    | undefined;
  const categoryLabel =
    projectCategoryLabels?.[project.category] ?? project.category;
  const detailCopy =
    locale === "tr"
      ? {
          back: "Projelere dön",
          role: "Rol",
          year: "Yıl",
          stack: "Teknolojiler",
          motion: "scroll reveal, hover, parallax",
          highlights: "Öne çıkanlar",
          liveDemo: "Canlı Demo",
        }
      : {
          back: "Back to projects",
          role: "Role",
          year: "Year",
          stack: "Stack",
          motion: "scroll reveal, hover, parallax",
          highlights: "Highlights",
          liveDemo: "Live Demo",
        };

  return (
    <main>
      <Section
        eyebrow={categoryLabel}
        title={project.title}
        description={project.description}
      >
        <div className="mb-8">
          <Button asChild variant="ghost" className="rounded-md">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              {detailCopy.back}
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
              {project.image ? (
                <div className="relative mb-5 overflow-hidden rounded-lg border border-border/70 bg-background/70">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 92vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                    <div className="technical-grid absolute inset-0 opacity-20" />
                  </div>
                </div>
              ) : null}
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
                  <span className="text-primary">motion</span>: &quot;
                  {detailCopy.motion}&quot;
                </p>
                <p className="mt-2">
                  <span className="text-primary">outcome</span>: &quot;
                  {project.outcome}&quot;
                </p>
              </div>

              <div className="relative mt-5 grid gap-4 md:grid-cols-2">
                {project.screenshots.map((screenshot, index) => (
                  <ScreenshotCard
                    key={screenshot.title}
                    screenshot={{
                      ...screenshot,
                      image:
                        screenshot.image ??
                        getProjectScreenshotImage(project, index),
                    }}
                    accent={project.accent}
                  />
                ))}
              </div>
            </ParallaxCard>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <aside className="glass-panel rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 border-b border-border/70 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {detailCopy.role}
                  </p>
                  <p className="mt-2 font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {detailCopy.year}
                  </p>
                  <p className="mt-2 font-medium">{project.year}</p>
                </div>
              </div>

              <h2 className="mt-6 text-lg font-semibold tracking-tight">
                {detailCopy.stack}
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
                      <GithubBrandIcon className="size-4" />
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
                      {project.demoLabel ?? detailCopy.liveDemo}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {caseStudySections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.field}
                  className="glass-panel rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <IconTile
                      icon={Icon}
                      iconClassName="size-5"
                      tone={section.tone}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {section.label[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project[section.field]}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 glass-panel rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {detailCopy.highlights}
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
