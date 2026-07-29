import { z } from "zod";

function normalizePathOrUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (
    trimmedValue.startsWith("/") ||
    z.string().url().safeParse(trimmedValue).success
  ) {
    return trimmedValue;
  }

  if (!trimmedValue.includes("\\") && !/\s/.test(trimmedValue)) {
    return `/${trimmedValue.replace(/^\/+/, "")}`;
  }

  return trimmedValue;
}

const optionalUrl = z
  .unknown()
  .transform(normalizePathOrUrl)
  .refine(
    (value) =>
      value === null ||
      value.startsWith("/") ||
      z.string().url().safeParse(value).success,
    "Enter a valid URL or a public image path.",
  );

export const blogPayloadSchema = z.object({
  category: z.string().min(2, "Category is required."),
  content: z.array(z.string().trim().min(1)).min(1, "Add at least one paragraph."),
  excerpt: z.string().min(12, "Excerpt must be at least 12 characters."),
  heroLabel: z.string().min(2, "Hero label is required."),
  heroMetric: z.string().min(2, "Hero metric is required."),
  imageAlt: z.string().trim().optional().transform((value) => value || null),
  imageSrc: optionalUrl,
  readTime: z
    .string()
    .trim()
    .min(1, "Read time is required.")
    .transform((value) => (/^\d+$/.test(value) ? `${value} min read` : value)),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe slug."),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  title: z.string().min(3, "Title must be at least 3 characters."),
  tone: z
    .enum(["blue", "cyan", "emerald", "violet", "pink", "amber", "slate"])
    .default("blue"),
  topics: z.array(z.string().trim().min(1)).min(1, "Add at least one topic."),
});

export const blogUpdatePayloadSchema = blogPayloadSchema.partial();

export type BlogPayload = z.infer<typeof blogPayloadSchema>;

export function getBlogPublishedAt(status?: BlogPayload["status"]) {
  return status === "PUBLISHED" ? new Date() : null;
}
