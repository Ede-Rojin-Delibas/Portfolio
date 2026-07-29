import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { getI18n } from "@/data/i18n";
import { BlogPostIcon } from "@/components/blog/blog-post-icon";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { getRelatedBlogPosts } from "@/lib/blog-recommendations";
import { getBlogPostBySlug, getBlogPosts, getBlogStaticParams } from "@/lib/content/blog";
import { getServerLocale } from "@/lib/server-locale";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const post = await getBlogPostBySlug(slug, locale);

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
  const locale = await getServerLocale();
  const allPosts = await getBlogPosts(locale);
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const explorerCopy = getI18n(locale).blogExplorer;
  const blogCategoryLabels = explorerCopy.categoryLabels as
    | Record<string, string>
    | undefined;
  const categoryLabel =
    blogCategoryLabels?.[post.category] ?? post.category;
  const detailCopy =
    locale === "tr"
      ? {
          back: "Bloga dön",
          relatedDescription:
            "Bu öneriler kategori, konu etiketleri ve metin benzerliğine göre seçildi.",
          relatedEyebrow: "Sıradaki okuma",
          relatedTitle: "Bu yazıya bağlı önerilen yazılar",
          status: post.status === "Published" ? "Yayında" : post.status,
        }
      : {
          back: "Back to blog",
          relatedDescription:
            "These suggestions are selected from category, topic and content similarity. If there is no close match, the newest useful articles are shown.",
          relatedEyebrow: "Recommended next",
          relatedTitle: "Related articles for this reading path",
          status: post.status,
        };
  const relatedPosts = getRelatedBlogPosts({
    post,
    posts: allPosts,
  });

  return (
    <main>
      <Section
        className="blog-skin section-skin"
        eyebrow={categoryLabel}
        title={post.title}
        description={post.excerpt}
      >
        <div className="mb-8">
          <Button asChild variant="ghost" className="rounded-md">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              {detailCopy.back}
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
          <Reveal direction="left">
            <article className="glass-panel overflow-hidden rounded-lg">
              <div className="relative min-h-64 border-b border-border/70 p-6 md:p-8">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/26" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 technical-grid opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-accent/10" />
                <div className="relative">
                  <div className="mb-8 flex items-center gap-3">
                    <BlogPostIcon post={post} />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {post.hero.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {categoryLabel}
                      </p>
                    </div>
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
                <IconTile icon={Clock3} iconClassName="size-4" size="sm" tone={post.tone} />
                {post.readTime}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <IconTile
                  icon={CalendarDays}
                  iconClassName="size-4"
                  size="sm"
                  tone="slate"
                />
                {post.date}
              </div>
              <div className="mt-4 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-sm">
                {detailCopy.status}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <TechBadge key={topic}>{topic}</TechBadge>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>

        {relatedPosts.length > 0 ? (
          <section className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {detailCopy.relatedEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {detailCopy.relatedTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {detailCopy.relatedDescription}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relatedCategoryLabel =
                  blogCategoryLabels?.[relatedPost.category] ??
                  relatedPost.category;

                return (
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    key={relatedPost.slug}
                    className="group overflow-hidden rounded-lg border border-border/70 bg-background/55 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="relative aspect-[16/9] border-b border-border/70">
                      <Image
                        src={relatedPost.image.src}
                        alt={relatedPost.image.alt}
                        fill
                        sizes="(min-width: 1024px) 28vw, 92vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <BlogPostIcon post={relatedPost} />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {relatedCategoryLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {relatedPost.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span>{relatedPost.readTime}</span>
                        <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </Section>
    </main>
  );
}
