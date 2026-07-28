import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) =>
      value.length === 0 || value.startsWith("/") || z.string().url().safeParse(value).success,
    "Enter a valid URL or a public image path.",
  )
  .or(z.literal(""))
  .optional()
  .transform((value) => value || null);

export const projectPayloadSchema = z.object({
  accent: z.enum(["blue", "cyan", "indigo"]).default("blue"),
  approach: z.string().min(12, "Approach must be at least 12 characters."),
  category: z.string().min(2, "Category is required."),
  demo: optionalUrl,
  demoLabel: z.string().trim().optional().transform((value) => value || null),
  description: z.string().min(12, "Description must be at least 12 characters."),
  featured: z.boolean().default(false),
  github: optionalUrl,
  imageAlt: z.string().trim().optional().transform((value) => value || null),
  imageSrc: optionalUrl,
  outcome: z.string().min(12, "Outcome must be at least 12 characters."),
  problem: z.string().min(12, "Problem must be at least 12 characters."),
  role: z.string().min(2, "Role is required."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe slug."),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  tech: z.array(z.string().trim().min(1)).min(1, "Add at least one technology."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  year: z.string().min(4, "Year is required."),
});

export const projectUpdatePayloadSchema = projectPayloadSchema.partial();

export type ProjectPayload = z.infer<typeof projectPayloadSchema>;

export function getProjectPublishedAt(status?: ProjectPayload["status"]) {
  return status === "PUBLISHED" ? new Date() : null;
}
