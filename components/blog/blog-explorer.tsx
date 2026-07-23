"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { BlogPost } from "@/data/blog";
import { defaultLocale, getI18n, type Locale } from "@/data/i18n";
import { BlogPostIcon } from "@/components/blog/blog-post-icon";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { cn } from "@/lib/utils";

type BlogExplorerProps = {
  posts: BlogPost[];
  locale?: Locale;
};

type BlogExplorerCopy = {
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

const defaultCopy: BlogExplorerCopy = {
  searchLabel: "Search articles",
  resultsLabel: (shown, total) => `${shown} of ${total} articles shown`,
  categoriesLabel: (count) => `${count} categories`,
  reset: "Reset",
  searchPlaceholder: "Search blog posts...",
  searchPrefix: "Search",
  dynamicLabel: "Dynamic reading lane",
  dynamicDescription:
    "This temporary category is created from your search and scans article titles, topics, summaries and content.",
  matches: "matches",
  empty: "No blog posts matched that search. Try another keyword or category.",
  recommendedEyebrow: "Recommended next",
  recommendedTitle: "Related articles to keep the reading path alive.",
  recommendedDescription:
    "These suggestions are selected from shared categories, overlapping topics and the words in your current search.",
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

function getPostSearchText(
  post: BlogPost,
  categoryAliases: Record<string, string> = {},
) {
  return `${post.title} ${post.category} ${post.excerpt} ${post.hero.label} ${post.hero.metric} ${post.topics.join(
    " ",
  )} ${post.content.join(" ")} ${categoryAliases[post.category] ?? ""}`.toLowerCase();
}

function getRecommendedPosts({
  activeCategory,
  categoryAliases,
  filteredPosts,
  posts,
  query,
}: {
  activeCategory: string;
  categoryAliases?: Record<string, string>;
  filteredPosts: BlogPost[];
  posts: BlogPost[];
  query: string;
}) {
  const visibleSlugs = new Set(filteredPosts.map((post) => post.slug));
  const seedCategories = new Set(filteredPosts.map((post) => post.category));
  const seedTopics = new Set(filteredPosts.flatMap((post) => post.topics));
  return posts
    .filter((post) => !visibleSlugs.has(post.slug))
    .map((post) => {
      const text = getPostSearchText(post, categoryAliases);
      const sharedTopicCount = post.topics.filter((topic) =>
        seedTopics.has(topic),
      ).length;
      const queryScore = getQueryScore(text, query);
      const relationScore =
        (activeCategory !== "All" && post.category === activeCategory ? 6 : 0) +
        (seedCategories.has(post.category) ? 4 : 0) +
        sharedTopicCount * 1.8 +
        queryScore;
      const score =
        relationScore > 0 && post.status === "Published"
          ? relationScore + 1
          : relationScore;

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)
    .map((item) => item.post)
    .slice(0, 3);
}

function BlogCard({
  post,
  categoryLabel,
  compact = false,
  statusLabel,
}: {
  post: BlogPost;
  categoryLabel: string;
  compact?: boolean;
  statusLabel: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-panel group flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div
        className={cn(
          "blog-card-image relative border-b border-border/70",
          compact ? "aspect-[16/8]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1024px) 29vw, (min-width: 768px) 44vw, 92vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/18 to-transparent" />
        <div className="absolute left-4 top-4">
          <BlogPostIcon post={post} />
        </div>
      </div>
      <div className="flex grow flex-col p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {categoryLabel}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5 text-primary" />
            {post.readTime}
          </span>
        </div>
        <h2 className={cn("font-semibold tracking-tight", compact ? "text-lg" : "text-xl")}>
          {post.title}
        </h2>
        <p className="mt-3 grow text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.topics.slice(0, compact ? 2 : 3).map((topic) => (
            <TechBadge key={topic}>{topic}</TechBadge>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-sm text-muted-foreground">
          <span>{statusLabel}</span>
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}

export function BlogExplorer({
  posts,
  locale = defaultLocale,
}: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const queryLabel = query.trim();
  const copy = (getI18n(locale).blogExplorer ?? defaultCopy) as BlogExplorerCopy;
  const categoryLabels = { ...(copy.categoryLabels ?? {}) };
  const categoryAliases = { ...(copy.categoryAliases ?? {}) };
  const getCategoryLabel = (category: string) =>
    categoryLabels[category] ?? category;
  const getStatusLabel = (status: BlogPost["status"]) =>
    locale === "tr" && status === "Published" ? "Yayında" : status;

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
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

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesQuery = matchesSearch(
      getPostSearchText(post, categoryAliases),
      query,
    );

    return matchesCategory && matchesQuery;
  });

  const recommendedPosts = getRecommendedPosts({
    activeCategory,
    categoryAliases,
    filteredPosts,
    posts,
    query,
  });

  const isFiltering = queryLabel.length > 0 || activeCategory !== "All";

  function resetFilters() {
    setActiveCategory("All");
    setQuery("");
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="glass-panel grid gap-5 rounded-lg p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.searchLabel}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.resultsLabel(filteredPosts.length, posts.length)}
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
                  tone="violet"
                />
                {copy.categoriesLabel(Math.max(filterChips.length - 1, 0))}
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

        <div className="flex max-w-3xl flex-wrap gap-2 md:justify-end">
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
                    layoutId="blog-filter-active"
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
              <IconTile icon={Sparkles} iconClassName="size-5" tone="pink" />
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
                  {filteredPosts.length}
                </span>{" "}
                {copy.matches}
              </div>
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>

      <motion.div layout className="grid gap-5 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              layout
              key={post.slug}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BlogCard
                post={post}
                categoryLabel={getCategoryLabel(post.category)}
                statusLabel={getStatusLabel(post.status)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-lg p-6 text-sm text-muted-foreground"
        >
          {copy.empty}
        </motion.div>
      ) : null}

      {isFiltering && recommendedPosts.length > 0 ? (
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5">
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
          <div className="grid gap-5 md:grid-cols-3">
            {recommendedPosts.map((post, index) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
                key={post.slug}
              >
                <BlogCard
                  post={post}
                  categoryLabel={getCategoryLabel(post.category)}
                  compact
                  statusLabel={getStatusLabel(post.status)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
