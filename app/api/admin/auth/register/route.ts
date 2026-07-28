import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { hashPassword } from "@/lib/backend/password";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    requestedRole: z.enum(["admin", "editor", "viewer"]),
    accessReason: z.string().min(12),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const requestedRoleMap = {
  admin: "ADMIN",
  editor: "EDITOR",
  viewer: "VIEWER",
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = registerSchema.parse(body);
    const prisma = getPrisma();
    const email = values.email.toLowerCase().trim();
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
    const isBootstrapSuperAdmin = Boolean(
      superAdminEmail && email === superAdminEmail,
    );

    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return Response.json(
        { message: "An account request already exists for this email." },
        { status: 409 },
      );
    }

    const user = await prisma.adminUser.create({
      data: {
        name: values.name.trim(),
        email,
        passwordHash: await hashPassword(values.password),
        requestedRole: isBootstrapSuperAdmin
          ? "SUPER_ADMIN"
          : requestedRoleMap[values.requestedRole],
        role: isBootstrapSuperAdmin ? "SUPER_ADMIN" : null,
        status: isBootstrapSuperAdmin ? "ACTIVE" : "PENDING",
        accessReason: values.accessReason.trim(),
        approvedAt: isBootstrapSuperAdmin ? new Date() : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        requestedRole: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.role === "SUPER_ADMIN" ? user.id : null,
        action: isBootstrapSuperAdmin
          ? "admin.bootstrap_super_admin"
          : "admin.register_request",
        entity: "AdminUser",
        entityId: user.id,
        metadata: {
          email: user.email,
          requestedRole: user.requestedRole,
          status: user.status,
        },
      },
    });

    return Response.json(
      {
        message:
          user.status === "ACTIVE"
            ? "Super Admin account created. You can now sign in."
            : "Access request created. A Super Admin must approve it before login.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid registration data.", issues: error.issues },
        { status: 400 },
      );
    }

    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
