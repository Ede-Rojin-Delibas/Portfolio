"use client";

import * as React from "react";
import { Filter, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

type ProjectExplorerProps = {
  projects: Project[];
};

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.map((project) => project.category))),
    ],
    [projects],
  );

  const categoryCount = Math.max(categories.length - 1, 0);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const searchText = `${project.title} ${project.description} ${project.problem} ${project.approach} ${project.outcome} ${project.tech.join(
      " ",
    )}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="glass-panel grid gap-5 rounded-lg p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Search projects
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredProjects.length} of {projects.length} projects shown
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-xs font-medium text-muted-foreground">
              <Filter className="size-3.5 text-primary" />
              {categoryCount} categories
            </div>
          </div>

          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="h-11 w-full rounded-md border border-border/70 bg-background/70 pl-10 pr-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>

        <div className="flex max-w-2xl flex-wrap gap-2 md:justify-end">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative h-10 rounded-md border border-border/70 px-3 text-sm font-medium text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground",
                  active && "border-primary/40 text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="project-filter-active"
                    className="absolute inset-0 rounded-md bg-primary/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="grid gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-lg p-6 text-sm text-muted-foreground"
        >
          No projects matched that search. Try another keyword or category.
        </motion.div>
      ) : null}
    </div>
  );
}
