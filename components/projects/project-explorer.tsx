"use client";

import * as React from "react";
import { Filter, RotateCcw, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { defaultLocale, getI18n, type Locale } from "@/data/i18n";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { IconTile } from "@/components/shared/icon-tile";
import { cn } from "@/lib/utils";

type ProjectExplorerProps = {
  projects: Project[];
  locale?: Locale;
};

type ProjectExplorerCopy = {
  searchLabel: string;
  resultsLabel: (shown: number, total: number) => string;
  categoriesLabel: (count: number) => string;
  reset: string;
  searchPlaceholder: string;
  searchPrefix: string;
  dynamicLabel: string;
  dynamicDescription: string;
  matches: string;
  empty: string;
  recommendedEyebrow: string;
  recommendedTitle: string;
  recommendedDescription: string;
  categoryLabels?: Record<string, string>;
  categoryAliases?: Record<string, string>;
};

const defaultCopy: ProjectExplorerCopy = {
  searchLabel: "Search projects",
  resultsLabel: (shown, total) => `${shown} of ${total} projects shown`,
  categoriesLabel: (count) => `${count} categories`,
  reset: "Reset",
  searchPlaceholder: "Search projects...",
  searchPrefix: "Search",
  dynamicLabel: "Dynamic search lane",
  dynamicDescription:
    "This temporary category is created from your current search and matches project titles, descriptions, outcomes and tech stacks.",
  matches: "matches",
  empty: "No projects matched that search. Try another keyword or category.",
  recommendedEyebrow: "Recommended next",
  recommendedTitle: "Related projects you may want to compare.",
  recommendedDescription:
    "These are selected from shared categories, similar technologies and the words in your current search.",
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(value: string) {
  return normalize(value).match(/[a-z0-9#+.]+/g) ?? ([] as string[]);
}

function matchesSearch(text: string, query: string) {
  const terms = tokenize(query);

  if (terms.length === 0) {
    return true;
  }

  const tokens = tokenize(text);
  const normalizedText = normalize(text);

  return terms.every((term) => {
    if (term.length <= 2) {
      return tokens.includes(term);
    }

    return tokens.some((token) => token.includes(term)) || normalizedText.includes(term);
  });
}

function getQueryScore(text: string, query: string) {
  const terms = tokenize(query);
  const tokens = tokenize(text);
  const normalizedText = normalize(text);

  return terms.reduce((score, term) => {
    if (term.length <= 2) {
      return score + (tokens.includes(term) ? 3 : 0);
    }

    if (tokens.includes(term)) {
      return score + 4;
    }

    if (tokens.some((token) => token.startsWith(term))) {
      return score + 3;
    }

    return score + (normalizedText.includes(term) ? 1 : 0);
  }, 0);
}

function getProjectSearchText(
  project: Project,
  categoryAliases: Record<string, string> = {},
) {
  return `${project.title} ${project.category} ${project.description} ${project.problem} ${project.approach} ${project.outcome} ${project.role} ${project.tech.join(
    " ",
  )} ${categoryAliases[project.category] ?? ""}`.toLowerCase();
}

function getRecommendedProjects({
  activeCategory,
  categoryAliases,
  filteredProjects,
  projects,
  query,
}: {
  activeCategory: string;
  categoryAliases?: Record<string, string>;
  filteredProjects: Project[];
  projects: Project[];
  query: string;
}) {
  const visibleSlugs = new Set(filteredProjects.map((project) => project.slug));
  const seedCategories = new Set(
    filteredProjects.map((project) => project.category),
  );
  const seedTech = new Set(filteredProjects.flatMap((project) => project.tech));
  return projects
    .filter((project) => !visibleSlugs.has(project.slug))
    .map((project) => {
      const text = getProjectSearchText(project, categoryAliases);
      const sharedTechCount = project.tech.filter((tech) =>
        seedTech.has(tech),
      ).length;
      const queryScore = getQueryScore(text, query);
      const relationScore =
        (activeCategory !== "All" && project.category === activeCategory
          ? 6
          : 0) +
        (seedCategories.has(project.category) ? 4 : 0) +
        sharedTechCount * 1.6 +
        queryScore;
      const score =
        relationScore > 0 && project.featured
          ? relationScore + 1
          : relationScore;

      return { project, score };
    })
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)
    .map((item) => item.project)
    .slice(0, 3);
}

export function ProjectExplorer({
  projects,
  locale = defaultLocale,
}: ProjectExplorerProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const queryLabel = query.trim();
  const copy = (getI18n(locale).projectExplorer ?? defaultCopy) as ProjectExplorerCopy;
  const categoryLabels = { ...(copy.categoryLabels ?? {}) };
  const categoryAliases = { ...(copy.categoryAliases ?? {}) };

  const categories = React.useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.map((project) => project.category))),
    ],
    [projects],
  );

  const hasDynamicSearchCategory =
    queryLabel.length > 0 &&
    !categories.some(
      (category) => normalize(category) === normalize(queryLabel),
    );

  const filterChips = hasDynamicSearchCategory
    ? [
        ...categories.map((category) => ({
          value: category,
          label: categoryLabels[category] ?? category,
          dynamic: false,
        })),
        {
          value: "__search__",
          label: `${copy.searchPrefix}: ${queryLabel}`,
          dynamic: true,
        },
      ]
    : categories.map((category) => ({
        value: category,
        label: categoryLabels[category] ?? category,
        dynamic: false,
      }));

  const categoryCount = Math.max(filterChips.length - 1, 0);
  const isFiltering = queryLabel.length > 0 || activeCategory !== "All";

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesQuery = matchesSearch(
      getProjectSearchText(project, categoryAliases),
      query,
    );

    return matchesCategory && matchesQuery;
  });

  const recommendedProjects = getRecommendedProjects({
    activeCategory,
    categoryAliases,
    filteredProjects,
    projects,
    query,
  });

  function resetFilters() {
    setActiveCategory("All");
    setQuery("");
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel grid gap-5 rounded-lg p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.searchLabel}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.resultsLabel(filteredProjects.length, projects.length)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {isFiltering ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                  {copy.reset}
                </button>
              ) : null}
              <div className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-xs font-medium text-muted-foreground">
              <IconTile
                icon={Filter}
                iconClassName="size-3.5"
                size="sm"
                tone="blue"
              />
              {copy.categoriesLabel(categoryCount)}
              </div>
            </div>
          </div>

          <label className="relative block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
            <span className="sr-only">{copy.searchLabel}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="h-11 w-full rounded-md border border-border/70 bg-background/70 pl-10 pr-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>

        <div className="flex max-w-2xl flex-wrap gap-2 md:justify-end">
          {filterChips.map((category) => {
            const isDynamicSearchChip = category.dynamic;
            const active =
              activeCategory === category.value ||
              (isDynamicSearchChip && queryLabel.length > 0);

            return (
              <button
                type="button"
                key={category.value}
                onClick={() => {
                  if (isDynamicSearchChip) {
                    setActiveCategory("All");
                    return;
                  }

                  setActiveCategory(category.value);
                }}
                className={cn(
                  "relative h-10 rounded-md border border-border/70 px-3 text-sm font-medium text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground",
                  active && "border-primary/40 text-foreground",
                  isDynamicSearchChip &&
                    "border-accent/35 bg-accent/10 text-foreground",
                )}
              >
                {active && !isDynamicSearchChip ? (
                  <motion.span
                    layoutId="project-filter-active"
                    className="absolute inset-0 rounded-md bg-primary/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : active ? (
                  <span className="absolute inset-0 rounded-md bg-accent/10" />
                ) : null}
                <span className="relative">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hasDynamicSearchCategory ? (
          <motion.article
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass-panel rounded-lg p-5"
          >
            <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
              <IconTile icon={Sparkles} iconClassName="size-5" tone="cyan" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {copy.dynamicLabel}
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  {queryLabel}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {copy.dynamicDescription}
                </p>
              </div>
              <div className="rounded-md border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                {copy.matches}
              </div>
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>

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
              <ProjectCard {...project} locale={locale} />
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
          {copy.empty}
        </motion.div>
      ) : null}

      {isFiltering && recommendedProjects.length > 0 ? (
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.recommendedEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {copy.recommendedTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {copy.recommendedDescription}
              </p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {recommendedProjects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
                key={project.slug}
              >
                <ProjectCard {...project} compactPreview locale={locale} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
