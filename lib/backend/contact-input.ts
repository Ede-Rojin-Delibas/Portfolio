import { z } from "zod";

export const contactPayloadSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(1000, "Message must be shorter than 1000 characters."),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be shorter than 80 characters."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(120, "Subject must be shorter than 120 characters."),
});

export const contactStatusPayloadSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
