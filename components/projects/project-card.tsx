"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Target } from "lucide-react";
import { motion } from "motion/react";
import { defaultLocale, getI18n, type Locale } from "@/data/i18n";
import type { Project } from "@/data/projects";
import { BorderBeam } from "@/components/shared/animation-effects";
import { GithubBrandIcon } from "@/components/shared/brand-icons";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { cn } from "@/lib/utils";

const accentStyles = {
  blue: "from-blue-500/30 via-sky-400/10 to-transparent",
  cyan: "from-cyan-400/30 via-blue-500/10 to-transparent",
  indigo: "from-indigo-500/30 via-sky-400/10 to-transparent",
};

const signalStyles = {
  blue: "bg-blue-400/75",
  cyan: "bg-cyan-300/75",
  indigo: "bg-indigo-400/75",
};

const accentGlowStyles = {
  blue: "bg-blue-500/20",
  cyan: "bg-cyan-400/20",
  indigo: "bg-indigo-500/20",
};

type ProjectCardProps = Pick<
  Project,
  | "slug"
  | "title"
  | "category"
  | "description"
  | "tech"
  | "github"
  | "demo"
  | "demoLabel"
  | "accent"
  | "image"
  | "outcome"
> & {
  compactPreview?: boolean;
  locale?: Locale;
};

export function ProjectCard({
  slug,
  title,
  category,
  description,
  tech,
  github,
  demo,
  demoLabel,
  accent,
  image,
  outcome,
  compactPreview = false,
  locale = defaultLocale,
}: ProjectCardProps) {
  const copy = getI18n(locale).projectExplorer;
  const categoryLabels = copy.categoryLabels as
    | Record<string, string>
    | undefined;
  const categoryLabel = categoryLabels?.[category] ?? category;
  const fixedCopy =
    locale === "tr"
      ? {
          casePreview: "Vaka önizlemesi",
          viewCase: "Vakayı gör",
          outcome: "Sonuç",
          liveDemo: "Canlı Demo",
        }
      : {
          casePreview: "Case preview",
          viewCase: "View case",
          outcome: "Outcome",
          liveDemo: "Live Demo",
        };

  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="project-card-shell group glass-panel relative overflow-hidden rounded-lg"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100",
          accentGlowStyles[accent],
        )}
      />
      <BorderBeam className="project-card-border-beam" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
      />
      <Link href={`/projects/${slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden border-b border-border/70 bg-background/60",
            compactPreview ? "h-40 md:h-44" : "h-56",
          )}
        >
          {image ? (
            <>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 31vw, 92vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/28 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/10" />
              <div className="technical-grid absolute inset-0 opacity-20" />
              {compactPreview ? null : (
                <div className="absolute left-4 right-4 top-4 rounded-lg border border-border/70 bg-background/78 p-3 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {fixedCopy.casePreview}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold tracking-tight">
                    {title}
                  </h3>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-90",
                  accentStyles[accent],
                )}
              />
              <div className="technical-grid absolute inset-0" />
              <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
              <div className="project-abstract-surface absolute inset-4 transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/35">
                <div className="project-abstract-surface__glow" />
                <div className="project-abstract-surface__header">
                  <span>{categoryLabel}</span>
                  <span>{tech[0]}</span>
                </div>

                <div className="project-abstract-surface__diagram">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span
                      aria-hidden="true"
                      key={`${title}-surface-node-${item}`}
                      className={cn(
                        "project-abstract-surface__node",
                        signalStyles[accent],
                      )}
                    />
                  ))}
                  <div className="project-abstract-surface__plate project-abstract-surface__plate--primary" />
                  <div className="project-abstract-surface__plate project-abstract-surface__plate--secondary" />
                  <div className="project-abstract-surface__plate project-abstract-surface__plate--tertiary" />
                </div>

                <div className="project-abstract-surface__metrics">
                  {[68, 44, 82].map((width, index) => (
                    <span
                      aria-hidden="true"
                      key={`${title}-surface-metric-${index}`}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="rounded-md border border-border/70 bg-background/80 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
              {tech[0]}
            </div>
            <div className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary backdrop-blur-md">
              {fixedCopy.viewCase}
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {categoryLabel}
            </p>
            <Link
              href={`/projects/${slug}`}
              className="inline-flex text-left transition hover:text-primary"
            >
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            </Link>
          </div>
          <Link
            href={`/projects/${slug}`}
            aria-label={`${title} case study`}
            className="mt-1 text-muted-foreground transition hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-primary"
          >
            <ArrowUpRight className="size-5" />
          </Link>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{description}</p>

        <div className="rounded-md border border-border/70 bg-background/55 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <IconTile
              icon={Target}
              iconClassName="size-3.5"
              size="sm"
              tone={accent === "cyan" ? "cyan" : accent === "indigo" ? "violet" : "blue"}
            />
            {fixedCopy.outcome}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{outcome}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <TechBadge key={item}>{item}</TechBadge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border/70 pt-4">
          {github ? (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border/70 px-3 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              <GithubBrandIcon className="size-4" />
              GitHub
            </Link>
          ) : null}
          {demo ? (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {demoLabel ?? fixedCopy.liveDemo}
              <ArrowUpRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
