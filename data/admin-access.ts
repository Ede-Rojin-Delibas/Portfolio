import {
  BookOpenText,
  Database,
  Eye,
  FileText,
  FolderKanban,
  Image,
  Inbox,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminRole = "super_admin" | "admin" | "editor" | "viewer";

export type AdminAccountStatus =
  | "pending"
  | "active"
  | "rejected"
  | "suspended";

export type AdminPermission =
  | "dashboard.read"
  | "projects.read"
  | "projects.create"
  | "projects.update"
  | "projects.delete"
  | "posts.read"
  | "posts.create"
  | "posts.update"
  | "posts.delete"
  | "pages.update"
  | "messages.read"
  | "media.manage"
  | "settings.update"
  | "users.manage"
  | "roles.manage"
  | "trash.manage";

export type AdminRoleDefinition = {
  role: AdminRole;
  label: string;
  description: string;
  permissions: AdminPermission[];
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  requestedRole: AdminRole;
  assignedRole?: AdminRole;
  status: AdminAccountStatus;
  createdAt: string;
  approvedAt?: string;
  lastLoginAt?: string;
};

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  permission: AdminPermission;
};

const contentPermissions: AdminPermission[] = [
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
  "trash.manage",
];

export const adminRoles: AdminRoleDefinition[] = [
  {
    role: "super_admin",
    label: "Super Admin",
    description:
      "Full access: users, roles, content, site settings and publishing controls.",
    permissions: [
      "dashboard.read",
      ...contentPermissions,
      "settings.update",
      "users.manage",
      "roles.manage",
    ],
  },
  {
    role: "admin",
    label: "Admin",
    description:
      "Can manage content, messages, media and most site settings, but cannot edit roles.",
    permissions: [
      "dashboard.read",
      ...contentPermissions,
      "settings.update",
      "users.manage",
    ],
  },
  {
    role: "editor",
    label: "Editor",
    description:
      "Can create and edit projects or blog posts, but cannot manage users or global settings.",
    permissions: [
      "dashboard.read",
      "projects.read",
      "projects.create",
      "projects.update",
      "posts.read",
      "posts.create",
      "posts.update",
      "media.manage",
    ],
  },
  {
    role: "viewer",
    label: "Viewer",
    description:
      "Read-only access for reviewing content, messages and dashboard state.",
    permissions: [
      "dashboard.read",
      "projects.read",
      "posts.read",
      "messages.read",
    ],
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "usr_super_admin",
    name: "Ede Rojin Delibas",
    email: "ederojind@gmail.com",
    requestedRole: "super_admin",
    assignedRole: "super_admin",
    status: "active",
    createdAt: "2026-07-20",
    approvedAt: "2026-07-20",
    lastLoginAt: "2026-07-24",
  },
  {
    id: "usr_pending_editor",
    name: "Content Reviewer",
    email: "reviewer@example.com",
    requestedRole: "editor",
    status: "pending",
    createdAt: "2026-07-24",
  },
  {
    id: "usr_pending_viewer",
    name: "Portfolio Viewer",
    email: "viewer@example.com",
    requestedRole: "viewer",
    status: "pending",
    createdAt: "2026-07-24",
  },
];

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard.read",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    permission: "projects.read",
  },
  {
    label: "Blog",
    href: "/admin/posts",
    icon: BookOpenText,
    permission: "posts.read",
  },
  {
    label: "Pages",
    href: "/admin/pages",
    icon: FileText,
    permission: "pages.update",
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: Inbox,
    permission: "messages.read",
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: Image,
    permission: "media.manage",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    permission: "users.manage",
  },
  {
    label: "Roles",
    href: "/admin/roles",
    icon: ShieldCheck,
    permission: "roles.manage",
  },
  {
    label: "Trash",
    href: "/admin/trash",
    icon: Trash2,
    permission: "trash.manage",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: "settings.update",
  },
];

export const adminSecuritySteps = [
  {
    title: "Registration creates a pending account",
    description:
      "A new user cannot enter the CMS immediately after registration.",
    icon: Eye,
  },
  {
    title: "Super Admin approves and assigns a role",
    description:
      "The role determines which menu items and API actions the user can access.",
    icon: ShieldCheck,
  },
  {
    title: "Backend checks permissions again",
    description:
      "UI hiding is helpful, but real protection must happen on server routes.",
    icon: Database,
  },
];

export function getRoleDefinition(role: AdminRole) {
  return adminRoles.find((item) => item.role === role);
}

export function getPendingUsers() {
  return adminUsers.filter((user) => user.status === "pending");
}
