import {
  BookOpenText,
  Database,
  Eye,
  FileText,
  FolderKanban,
  Image,
  Inbox,
  Languages,
  LayoutDashboard,
  ScrollText,
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
  | "projects.publish"
  | "posts.read"
  | "posts.create"
  | "posts.update"
  | "posts.delete"
  | "posts.publish"
  | "translations.manage"
  | "pages.update"
  | "messages.read"
  | "messages.update"
  | "media.manage"
  | "settings.update"
  | "users.manage"
  | "roles.manage"
  | "audit.read"
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
  "translations.manage",
  "pages.update",
  "messages.read",
  "messages.update",
  "media.manage",
  "audit.read",
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
      "projects.publish",
      "posts.publish",
      "settings.update",
      "users.manage",
      "roles.manage",
    ],
  },
  {
    role: "admin",
    label: "Admin",
    description:
      "Can manage content, messages, media and most site settings, but publishing and role changes stay with Super Admin.",
    permissions: [
      "dashboard.read",
      ...contentPermissions,
      "settings.update",
    ],
  },
  {
    role: "editor",
    label: "Editor",
    description:
      "Can create and edit project or blog drafts, but cannot publish, delete, manage users or change settings.",
    permissions: [
      "dashboard.read",
      "projects.read",
      "projects.create",
      "projects.update",
      "posts.read",
      "posts.create",
      "posts.update",
      "translations.manage",
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
      "audit.read",
    ],
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
    label: "Translations",
    href: "/admin/translations",
    icon: Languages,
    permission: "translations.manage",
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
    label: "Audit",
    href: "/admin/audit-logs",
    icon: ScrollText,
    permission: "audit.read",
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
