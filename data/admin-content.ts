import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";

export type ContentType = "project" | "blog";
export type TranslationStatus = "source" | "machine_draft" | "needs_review" | "reviewed";

export type TranslationField = {
  name: string;
  label: string;
  intent: "title" | "summary" | "body" | "metadata";
  autoTranslate: boolean;
  reviewRequired: boolean;
};

export type AdminContentSummary = {
  type: ContentType;
  label: string;
  count: number;
  source: string;
  currentStorage: string;
  nextStorage: string;
  description: string;
};

export const protectedTranslationTerms = [
  "AI",
  "API",
  "REST API",
  "REST APIs",
  "Backend",
  "Frontend",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
  "Motion",
  "React Hook Form",
  "Zod",
  "Python",
  "Flask",
  "SQL",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "LoRA",
  "PEFT",
  "LLM",
  "Git",
  "GitHub",
  "Linux",
  "Cloud",
  "CMS",
  "SEO",
];

export const projectTranslationFields: TranslationField[] = [
  {
    name: "title",
    label: "Project title",
    intent: "title",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "description",
    label: "Card description",
    intent: "summary",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "problem",
    label: "Problem",
    intent: "body",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "approach",
    label: "Approach",
    intent: "body",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "outcome",
    label: "Outcome",
    intent: "body",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "tech",
    label: "Technology stack",
    intent: "metadata",
    autoTranslate: false,
    reviewRequired: false,
  },
];

export const blogTranslationFields: TranslationField[] = [
  {
    name: "title",
    label: "Post title",
    intent: "title",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "excerpt",
    label: "Excerpt",
    intent: "summary",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "content",
    label: "Article paragraphs",
    intent: "body",
    autoTranslate: true,
    reviewRequired: true,
  },
  {
    name: "topics",
    label: "Topics",
    intent: "metadata",
    autoTranslate: false,
    reviewRequired: true,
  },
];

export const adminContentSummaries: AdminContentSummary[] = [
  {
    type: "project",
    label: "Projects",
    count: projects.length,
    source: "data/projects.ts",
    currentStorage: "Static TypeScript data",
    nextStorage: "Database or CMS collection",
    description:
      "Project cards, project detail pages, search fields, outcomes and case-study content.",
  },
  {
    type: "blog",
    label: "Blog posts",
    count: blogPosts.length,
    source: "data/blog.ts",
    currentStorage: "Static TypeScript data",
    nextStorage: "Database or CMS collection",
    description:
      "Article titles, excerpts, categories, topics, hero copy and long-form content.",
  },
];

export const adminTranslationWorkflow = [
  {
    step: "Create or edit source content",
    description:
      "The admin writes the main content once, preferably in English for portfolio consistency.",
  },
  {
    step: "Generate translated draft",
    description:
      "A server-side translation job creates Turkish draft fields while preserving protected technical terms.",
  },
  {
    step: "Review technical language",
    description:
      "The admin checks terminology, tone, project names and engineering accuracy before publishing.",
  },
  {
    step: "Publish reviewed content",
    description:
      "Only reviewed translations become visible on the public portfolio.",
  },
];
