import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Clock3, FileText } from "lucide-react";
import { blogPosts, featuredBlogPost } from "@/data/blog";
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
        description="This blog area is ready for your articles. For now it contains draft topics that match the portfolio direction and can be replaced with your real writing."
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
                  <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <BookOpenText className="size-3.5" />
                    Featured draft
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
                  label: "Draft posts",
                  value: blogPosts.length,
                  detail: "Ready to replace with your real articles.",
                },
                {
                  label: "Main topics",
                  value: "4",
                  detail: "Software, AI, data and systems thinking.",
                },
                {
                  label: "Format",
                  value: "Static",
                  detail: "Fast, SEO-friendly and easy to maintain.",
                },
              ].map((item) => (
                <div key={item.label} className="glass-panel rounded-lg p-5">
                  <FileText className="mb-6 size-5 text-primary" />
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
              ))}
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
                  <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
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
