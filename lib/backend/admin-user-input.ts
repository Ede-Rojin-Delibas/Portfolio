import { z } from "zod";

export const adminRolePayloadSchema = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "VIEWER",
]);

export const adminUserUpdatePayloadSchema = z.object({
  role: adminRolePayloadSchema.optional(),
  status: z.enum(["PENDING", "ACTIVE", "REJECTED", "SUSPENDED"]).optional(),
});

export type AdminUserUpdatePayload = z.infer<
  typeof adminUserUpdatePayloadSchema
>;
