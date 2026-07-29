import { z } from "zod";

export const translationDraftPayloadSchema = z.object({
  entity: z.enum(["project", "blog"]),
  id: z.string().min(1),
  locale: z.enum(["tr"]).default("tr"),
});

export const translationReviewPayloadSchema = z.object({
  status: z
    .enum(["MACHINE_DRAFT", "NEEDS_REVIEW", "REVIEWED"])
    .default("REVIEWED"),
});

export type TranslationDraftPayload = z.infer<
  typeof translationDraftPayloadSchema
>;
