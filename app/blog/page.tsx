import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, FileText, Layers3 } from "lucide-react";
import { blogPosts, featuredBlogPost } from "@/data/blog";
import { BlogPostIcon } from "@/components/blog/blog-post-icon";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes and draft articles about software engineering, data analysis, artificial intelligence and computer engineering growth.",
};

export default function BlogPage() {
  return (
    <main>
      <Section
        className="blog-skin section-skin"
        eyebrow="Engineering notes"
        title="Writing about software, data, AI and the systems behind them."
        description="Short English articles about engineering growth, data analysis, machine learning, architecture, IT foundations and product-minded software work."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal direction="left">
            <Link
              href={`/blog/${featuredBlogPost.slug}`}
              className="blog-feature-card glass-panel group relative block min-h-[28rem] overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-8"
            >
              <div className="absolute inset-0 technical-grid opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-accent/10" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <BlogPostIcon post={featuredBlogPost} />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Featured article
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {featuredBlogPost.category}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                    {featuredBlogPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                    {featuredBlogPost.excerpt}
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {featuredBlogPost.topics.map((topic) => (
                      <TechBadge key={topic}>{topic}</TechBadge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4 text-primary" />
                      {featuredBlogPost.readTime}
                    </span>
                    <span className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-medium text-primary">
                      {featuredBlogPost.status}
                    </span>
                    <ArrowUpRight className="ml-auto size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <aside className="grid gap-4">
              {[
                {
                  label: "Articles",
                  value: blogPosts.length,
                  detail: "English posts aligned with the portfolio identity.",
                  tone: "blue" as const,
                  icon: FileText,
                },
                {
                  label: "Main topics",
                  value: "8",
                  detail: "Career, data, AI, ML, systems, architecture and IT.",
                  tone: "cyan" as const,
                  icon: Layers3,
                },
                {
                  label: "Format",
                  value: "Static",
                  detail: "Fast, SEO-friendly and easy to maintain.",
                  tone: "violet" as const,
                  icon: FileText,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                <div key={item.label} className="glass-panel rounded-lg p-5">
                  <IconTile
                    className="mb-6"
                    icon={Icon}
                    iconClassName="size-5"
                    tone={item.tone}
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

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal delay={index * 0.06} key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass-panel group flex h-full flex-col rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <BlogPostIcon post={post} />
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {post.category}
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-3 grow text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-sm text-muted-foreground">
                  <span>{post.status}</span>
                  <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
