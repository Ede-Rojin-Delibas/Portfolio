import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, FileText, Layers3 } from "lucide-react";
import { getI18n } from "@/data/i18n";
import {
  getLocalizedBlogPosts,
  getLocalizedFeaturedBlogPost,
} from "@/data/localized-content";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { BlogPostIcon } from "@/components/blog/blog-post-icon";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "English articles about software engineering, data analysis, artificial intelligence, machine learning, systems and computer engineering growth.",
};

const sideCardIcons = [FileText, Layers3, FileText];
const sideCardTones = ["blue", "cyan", "violet"] as const;

export default async function BlogPage() {
  const locale = await getServerLocale();
  const copy = getI18n(locale).blogPage;
  const explorerCopy = getI18n(locale).blogExplorer;
  const localizedPosts = getLocalizedBlogPosts(locale);
  const featuredPost = getLocalizedFeaturedBlogPost(locale);
  const blogCategoryLabels = explorerCopy.categoryLabels as
    | Record<string, string>
    | undefined;
  const featuredCategoryLabel =
    blogCategoryLabels?.[featuredPost.category] ?? featuredPost.category;
  const featuredStatus =
    locale === "tr" && featuredPost.status === "Published"
      ? "Yayında"
      : featuredPost.status;

  return (
    <main>
      <Section
        className="blog-skin section-skin"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal direction="left">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="blog-feature-card glass-panel group relative block min-h-[28rem] overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-8"
            >
              <Image
                src={featuredPost.image.src}
                alt={featuredPost.image.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="blog-feature-card__image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 technical-grid opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-accent/10" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <BlogPostIcon post={featuredPost} />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {copy.featuredArticle}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {featuredCategoryLabel}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {featuredPost.topics.map((topic) => (
                      <TechBadge key={topic}>{topic}</TechBadge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4 text-primary" />
                      {featuredPost.readTime}
                    </span>
                    <span className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-medium text-primary">
                      {featuredStatus}
                    </span>
                    <ArrowUpRight className="ml-auto size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <aside className="grid gap-4">
              {copy.sideCards.map((item, index) => {
                const Icon = sideCardIcons[index] ?? FileText;
                const tone = sideCardTones[index] ?? "blue";

                return (
                <div key={item.label} className="glass-panel rounded-lg p-5">
                  <IconTile
                    className="mb-6"
                    icon={Icon}
                    iconClassName="size-5"
                    tone={tone}
                  />
                  <p className="text-3xl font-semibold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                );
              })}
            </aside>
          </Reveal>
        </div>

        <BlogExplorer locale={locale} posts={localizedPosts} />
      </Section>
    </main>
  );
}
