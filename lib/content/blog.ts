import type { Prisma } from "@prisma/client";
import {
  blogPosts as staticBlogPosts,
  featuredBlogPost,
  type BlogPost,
} from "@/data/blog";
import { generatedAssets, type GeneratedAsset } from "@/data/generated-assets";
import type { Locale } from "@/data/i18n";
import { getLocalizedBlogPost } from "@/data/localized-content";
import { getPrisma } from "@/lib/backend/prisma";

const blogPostWithRelations = {
  translations: true,
} satisfies Prisma.BlogPostInclude;

type DbBlogPost = Prisma.BlogPostGetPayload<{
  include: typeof blogPostWithRelations;
}>;

function getTone(value: string): BlogPost["tone"] {
  if (
    value === "cyan" ||
    value === "emerald" ||
    value === "violet" ||
    value === "pink" ||
    value === "amber" ||
    value === "slate"
  ) {
    return value;
  }

  return "blue";
}

function getContent(value: Prisma.JsonValue): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return [];
}

function getImage(src?: string | null, alt?: string | null): GeneratedAsset {
  if (!src) {
    return generatedAssets.editorialBlogCover;
  }

  return {
    src,
    alt: alt ?? "Blog cover image.",
  };
}

function getReviewedBlogTranslation(post: DbBlogPost, locale: Locale) {
  if (locale === "en") {
    return undefined;
  }

  return post.translations.find(
    (translation) =>
      translation.locale === locale && translation.status === "REVIEWED",
  );
}

function mapDbBlogPost(post: DbBlogPost, locale: Locale): BlogPost {
  const translation = getReviewedBlogTranslation(post, locale);

  return {
    category: post.category,
    content: getContent(translation?.content ?? post.content),
    date:
      post.publishedAt?.toISOString().slice(0, 10) ??
      post.createdAt.toISOString().slice(0, 10),
    excerpt: translation?.excerpt ?? post.excerpt,
    hero: {
      label: post.heroLabel,
      metric: post.heroMetric,
    },
    image: getImage(post.imageSrc, post.imageAlt),
    readTime: post.readTime,
    slug: post.slug,
    status: post.status === "PUBLISHED" ? "Published" : "Draft",
    title: translation?.title ?? post.title,
    tone: getTone(post.tone),
    topics: post.topics,
  };
}

async function readPublishedBlogPostsFromDb() {
  const prisma = getPrisma();

  return prisma.blogPost.findMany({
    include: blogPostWithRelations,
    orderBy: {
      publishedAt: "desc",
    },
    where: {
      status: "PUBLISHED",
    },
  });
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  try {
    const posts = await readPublishedBlogPostsFromDb();

    if (posts.length === 0) {
      return staticBlogPosts.map((post) => getLocalizedBlogPost(post, locale));
    }

    return posts.map((post) => {
      const mappedPost = mapDbBlogPost(post, locale);

      return getReviewedBlogTranslation(post, locale)
        ? mappedPost
        : getLocalizedBlogPost(mappedPost, locale);
    });
  } catch {
    return staticBlogPosts.map((post) => getLocalizedBlogPost(post, locale));
  }
}

export async function getFeaturedBlogPost(locale: Locale): Promise<BlogPost> {
  const posts = await getBlogPosts(locale);

  return posts[0] ?? getLocalizedBlogPost(featuredBlogPost, locale);
}

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  const posts = await getBlogPosts(locale);

  return posts.find((post) => post.slug === slug);
}

export async function getBlogStaticParams() {
  try {
    const posts = await readPublishedBlogPostsFromDb();

    if (posts.length === 0) {
      return staticBlogPosts.map((post) => ({ slug: post.slug }));
    }

    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return staticBlogPosts.map((post) => ({ slug: post.slug }));
  }
}
