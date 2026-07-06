import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, PenLine } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Section
        className="blog-skin section-skin"
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
      >
        <div className="mb-8">
          <Button asChild variant="ghost" className="rounded-md">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to blog
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
          <Reveal direction="left">
            <article className="glass-panel overflow-hidden rounded-lg">
              <div className="relative min-h-64 border-b border-border/70 p-6 md:p-8">
                <div className="absolute inset-0 technical-grid opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-accent/10" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <PenLine className="size-3.5" />
                    {post.hero.label}
                  </div>
                  <p className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                    {post.hero.metric}
                  </p>
                </div>
              </div>

              <div className="space-y-5 p-6 text-base leading-8 text-muted-foreground md:p-8">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <aside className="glass-panel h-fit rounded-lg p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-primary" />
                {post.readTime}
              </div>
              <div className="mt-4 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-sm">
                {post.status}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <TechBadge key={topic}>{topic}</TechBadge>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
