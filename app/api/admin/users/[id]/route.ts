import { z } from "zod";
import { adminUserUpdatePayloadSchema } from "@/lib/backend/admin-user-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import {
  hasAdminPermission,
  requireAdminApiPermission,
} from "@/lib/backend/permissions";

type AdminUserRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: AdminUserRouteProps) {
  try {
    const auth = await requireAdminApiPermission("users.manage");

    if (auth.response) {
      return auth.response;
    }

    const body = await request.json();
    const values = adminUserUpdatePayloadSchema.parse(body);

    if (values.role && !hasAdminPermission(auth.user, "roles.manage")) {
      return Response.json(
        { message: "Only Super Admin can assign roles." },
        { status: 403 },
      );
    }

    if (values.role === "SUPER_ADMIN" && auth.user.role !== "SUPER_ADMIN") {
      return Response.json(
        { message: "Only a Super Admin can assign Super Admin access." },
        { status: 403 },
      );
    }

    const { id } = await params;

    if (id === auth.user.id && values.status && values.status !== "ACTIVE") {
      return Response.json(
        { message: "You cannot deactivate your own active session account." },
        { status: 400 },
      );
    }

    const prisma = getPrisma();
    const existingUser = await prisma.adminUser.findUnique({
      where: { id },
      select: {
        requestedRole: true,
        role: true,
        status: true,
      },
    });

    if (!existingUser) {
      return Response.json({ message: "User not found." }, { status: 404 });
    }

    const nextStatus = values.status ?? existingUser.status;
    const nextRole =
      nextStatus === "ACTIVE"
        ? values.role ?? existingUser.role ?? existingUser.requestedRole
        : nextStatus === "REJECTED"
          ? null
          : values.role ?? existingUser.role;

    if (
      id === auth.user.id &&
      values.role &&
      values.role !== existingUser.role
    ) {
      return Response.json(
        { message: "You cannot change your own role." },
        { status: 400 },
      );
    }

    const removesActiveSuperAdmin =
      existingUser.role === "SUPER_ADMIN" &&
      existingUser.status === "ACTIVE" &&
      (nextStatus !== "ACTIVE" || nextRole !== "SUPER_ADMIN");

    if (removesActiveSuperAdmin) {
      const otherActiveSuperAdmins = await prisma.adminUser.count({
        where: {
          id: {
            not: id,
          },
          role: "SUPER_ADMIN",
          status: "ACTIVE",
        },
      });

      if (otherActiveSuperAdmins === 0) {
        return Response.json(
          { message: "At least one active Super Admin must remain." },
          { status: 400 },
        );
      }
    }

    const user = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.adminUser.update({
        where: { id },
        data: {
          approvedAt:
            nextStatus === "ACTIVE" && existingUser.status !== "ACTIVE"
              ? new Date()
              : undefined,
          approvedById:
            nextStatus === "ACTIVE" && existingUser.status !== "ACTIVE"
              ? auth.user.id
              : undefined,
          role: nextRole,
          status: nextStatus,
        },
        select: {
          email: true,
          id: true,
          name: true,
          requestedRole: true,
          role: true,
          status: true,
        },
      });

      if (nextStatus !== "ACTIVE" || !nextRole) {
        await tx.adminSession.deleteMany({
          where: {
            userId: id,
          },
        });
      }

      await tx.auditLog.create({
        data: {
          action: "admin.user_update",
          actorId: auth.user.id,
          entity: "AdminUser",
          entityId: updatedUser.id,
          metadata: {
            email: updatedUser.email,
            nextRole: updatedUser.role,
            nextStatus: updatedUser.status,
            previousRole: existingUser.role,
            previousStatus: existingUser.status,
          },
        },
      });

      return updatedUser;
    });

    return Response.json({
      message: "Admin user updated.",
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid admin user update.", issues: error.issues },
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
