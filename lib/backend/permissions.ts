import { redirect } from "next/navigation";
import type { AdminRole as PrismaAdminRole } from "@prisma/client";
import type { AdminPermission } from "@/data/admin-access";
import {
  getCurrentAdminUser,
  type SafeAdminUser,
} from "@/lib/backend/session";

const rolePermissions: Record<PrismaAdminRole, AdminPermission[]> = {
  SUPER_ADMIN: [
    "dashboard.read",
    "projects.read",
    "projects.create",
    "projects.update",
    "projects.delete",
    "posts.read",
    "posts.create",
    "posts.update",
    "posts.delete",
    "pages.update",
    "messages.read",
    "media.manage",
    "settings.update",
    "users.manage",
    "roles.manage",
    "trash.manage",
  ],
  ADMIN: [
    "dashboard.read",
    "projects.read",
    "projects.create",
    "projects.update",
    "projects.delete",
    "posts.read",
    "posts.create",
    "posts.update",
    "posts.delete",
    "pages.update",
    "messages.read",
    "media.manage",
    "settings.update",
    "users.manage",
    "trash.manage",
  ],
  EDITOR: [
    "dashboard.read",
    "projects.read",
    "projects.create",
    "projects.update",
    "posts.read",
    "posts.create",
    "posts.update",
    "media.manage",
  ],
  VIEWER: [
    "dashboard.read",
    "projects.read",
    "posts.read",
    "messages.read",
  ],
};

export function getAdminPermissions(role: PrismaAdminRole | null) {
  if (!role) {
    return [];
  }

  return rolePermissions[role] ?? [];
}

export function hasAdminPermission(
  user: SafeAdminUser | null,
  permission: AdminPermission,
) {
  return Boolean(
    user?.role && getAdminPermissions(user.role).includes(permission),
  );
}

export function formatAdminRole(role: PrismaAdminRole | null) {
  if (!role) {
    return "Pending role";
  }

  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function requireAdminPagePermission(
  permission: AdminPermission = "dashboard.read",
) {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!hasAdminPermission(user, permission)) {
    redirect("/admin");
  }

  return user;
}

export async function requireAdminApiPermission(permission: AdminPermission) {
  const user = await getCurrentAdminUser();

  if (!user) {
    return {
      user: null,
      response: Response.json(
        { message: "Authentication required." },
        { status: 401 },
      ),
    };
  }

  if (!hasAdminPermission(user, permission)) {
    return {
      user: null,
      response: Response.json(
        { message: "You do not have permission to perform this action." },
        { status: 403 },
      ),
    };
  }

  return {
    user,
    response: null,
  };
}
