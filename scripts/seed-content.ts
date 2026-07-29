import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed content.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

function getPublishedAt(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function seedProjects() {
  for (const project of projects) {
    await prisma.project.upsert({
      create: {
        accent: project.accent,
        approach: project.approach,
        category: project.category,
        demo: project.demo,
        demoLabel: project.demoLabel,
        description: project.description,
        featured: Boolean(project.featured),
        github: project.github,
        imageAlt: project.image?.alt,
        imageSrc: project.image?.src,
        outcome: project.outcome,
        problem: project.problem,
        publishedAt: new Date(),
        role: project.role,
        slug: project.slug,
        status: "PUBLISHED",
        title: project.title,
        year: project.year,
        highlights: {
          create: project.highlights.map((text, index) => ({
            text,
            sortOrder: index,
          })),
        },
        screenshots: {
          create: project.screenshots.map((screenshot, index) => ({
            description: screenshot.description,
            imageAlt: screenshot.image?.alt,
            imageSrc: screenshot.image?.src,
            sortOrder: index,
            title: screenshot.title,
          })),
        },
        technologies: {
          create: project.tech.map((label, index) => ({
            label,
            sortOrder: index,
          })),
        },
      },
      update: {
        accent: project.accent,
        approach: project.approach,
        category: project.category,
        demo: project.demo,
        demoLabel: project.demoLabel,
        description: project.description,
        featured: Boolean(project.featured),
        github: project.github,
        imageAlt: project.image?.alt,
        imageSrc: project.image?.src,
        outcome: project.outcome,
        problem: project.problem,
        role: project.role,
        status: "PUBLISHED",
        title: project.title,
        year: project.year,
        highlights: {
          deleteMany: {},
          create: project.highlights.map((text, index) => ({
            text,
            sortOrder: index,
          })),
        },
        screenshots: {
          deleteMany: {},
          create: project.screenshots.map((screenshot, index) => ({
            description: screenshot.description,
            imageAlt: screenshot.image?.alt,
            imageSrc: screenshot.image?.src,
            sortOrder: index,
            title: screenshot.title,
          })),
        },
        technologies: {
          deleteMany: {},
          create: project.tech.map((label, index) => ({
            label,
            sortOrder: index,
          })),
        },
      },
      where: {
        slug: project.slug,
      },
    });
  }
}

async function seedBlogPosts() {
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      create: {
        category: post.category,
        content: post.content,
        excerpt: post.excerpt,
        heroLabel: post.hero.label,
        heroMetric: post.hero.metric,
        imageAlt: post.image.alt,
        imageSrc: post.image.src,
        publishedAt: getPublishedAt(post.date),
        readTime: post.readTime,
        slug: post.slug,
        status: "PUBLISHED",
        title: post.title,
        tone: post.tone,
        topics: post.topics,
      },
      update: {
        category: post.category,
        content: post.content,
        excerpt: post.excerpt,
        heroLabel: post.hero.label,
        heroMetric: post.hero.metric,
        imageAlt: post.image.alt,
        imageSrc: post.image.src,
        publishedAt: getPublishedAt(post.date),
        readTime: post.readTime,
        status: "PUBLISHED",
        title: post.title,
        tone: post.tone,
        topics: post.topics,
      },
      where: {
        slug: post.slug,
      },
    });
  }
}

async function main() {
  await seedProjects();
  await seedBlogPosts();

  const [projectCount, blogPostCount] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
  ]);

  console.log(`Seed complete: ${projectCount} projects, ${blogPostCount} blog posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
