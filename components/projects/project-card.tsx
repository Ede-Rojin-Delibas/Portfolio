"use client";

import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
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
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group glass-panel overflow-hidden rounded-lg"
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative h-48 overflow-hidden border-b border-border/70 bg-background/60">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              accentStyles[accent],
            )}
          />
          <div className="technical-grid absolute inset-0" />
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          <div className="absolute left-4 right-4 top-4 rounded-md border border-border/70 bg-background/80 p-3 font-mono text-[11px] shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-400/80" />
              <span className="size-2 rounded-full bg-amber-300/80" />
              <span className="size-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-muted-foreground">{category}.tsx</span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div>
                <span className="text-primary">const</span>{" "}
                <span className="text-foreground">project</span> = {"{"}
              </div>
              <div className="pl-4">
                title: <span className="text-foreground">&quot;{title}&quot;</span>,
              </div>
              <div className="pl-4">
                stack: <span className="text-accent">{tech[0]}</span>,
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="flex h-10 items-end gap-1.5">
              {[42, 26, 34, 18, 38, 30].map((height, index) => (
                <span
                  aria-hidden="true"
                  key={`${title}-${height}-${index}`}
                  className={cn(
                    "w-2 rounded-t-sm shadow-[0_0_18px_currentColor]",
                    signalStyles[accent],
                  )}
                  style={{ height }}
                />
              ))}
            </div>
            <div className="rounded-md border border-border/70 bg-background/80 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
              {tech[0]} signal
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
