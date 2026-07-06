"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Target } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { BorderBeam } from "@/components/shared/animation-effects";
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
  | "outcome"
>;

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
  outcome,
}: ProjectCardProps) {
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
        <div className="relative h-56 overflow-hidden border-b border-border/70 bg-background/60">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              accentStyles[accent],
            )}
          />
          <div className="technical-grid absolute inset-0" />
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          <div className="absolute left-4 right-4 top-4 rounded-lg border border-border/70 bg-background/85 p-3 shadow-2xl backdrop-blur-md transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/35">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-400/80" />
              <span className="size-2 rounded-full bg-amber-300/80" />
              <span className="size-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                {category}.tsx
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-md border border-border/60 bg-card/70 p-2">
                <div className="mb-2 h-2 w-16 rounded-full bg-primary/45" />
                <div className="space-y-1.5">
                  {[78, 56, 88, 46].map((width, index) => (
                    <span
                      aria-hidden="true"
                      key={`${title}-mock-line-${index}`}
                      className="block h-1.5 rounded-full bg-muted-foreground/20"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1">
                  {[42, 64, 52].map((height, index) => (
                    <span
                      aria-hidden="true"
                      key={`${title}-mock-mini-${index}`}
                      className={cn(
                        "rounded-sm shadow-[0_0_18px_currentColor]",
                        signalStyles[accent],
                      )}
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-border/60 bg-card/70 p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="h-2 w-20 rounded-full bg-foreground/15" />
                  <span className="h-5 w-12 rounded-md border border-primary/25 bg-primary/10" />
                </div>
                <div className="relative h-20 overflow-hidden rounded-md border border-border/60 bg-background/70">
                  <div className="technical-grid absolute inset-0 opacity-45" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1.5">
                    {[24, 40, 32, 58, 44, 66, 52].map((height, index) => (
                      <span
                        aria-hidden="true"
                        key={`${title}-mock-chart-${index}`}
                        className={cn(
                          "flex-1 rounded-t-sm shadow-[0_0_18px_currentColor]",
                          signalStyles[accent],
                        )}
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="rounded-md border border-border/70 bg-background/80 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
              {tech[0]}
            </div>
            <div className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary backdrop-blur-md">
              View case
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {category}
            </p>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          </div>
          <ArrowUpRight className="mt-1 size-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{description}</p>

        <div className="rounded-md border border-border/70 bg-background/55 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Target className="size-3.5" />
            Outcome
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
              <Code2 className="size-4" />
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
              {demoLabel ?? "Live Demo"}
              <ArrowUpRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
