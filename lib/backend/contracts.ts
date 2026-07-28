import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";

export const backendDecision = {
  database: "PostgreSQL",
  orm: "Prisma",
  apiStyle: "Next.js App Router Route Handlers",
  authModel: "Database sessions with server-side role checks",
} as const;

export const publicApiEndpoints = [
  {
    method: "GET",
    path: "/api/health",
    purpose: "Checks backend readiness and planned storage configuration.",
  },
  {
    method: "GET",
    path: "/api/projects",
    purpose: "Lists published projects with search, category and featured filters.",
  },
  {
    method: "GET",
    path: "/api/projects/[slug]",
    purpose: "Returns one published project detail by slug.",
  },
  {
    method: "GET",
    path: "/api/blog",
    purpose: "Lists published blog posts with search and category filters.",
  },
  {
    method: "GET",
    path: "/api/blog/[slug]",
    purpose: "Returns one published blog post by slug.",
  },
  {
    method: "POST",
    path: "/api/contact",
    purpose: "Validates and stores contact form messages.",
  },
] as const;

export const adminApiEndpoints = [
  {
    method: "POST",
    path: "/api/admin/auth/register",
    permission: "public",
    purpose: "Creates a pending admin account request.",
  },
  {
    method: "POST",
    path: "/api/admin/auth/login",
    permission: "public",
    purpose: "Creates a session only for approved active accounts.",
  },
  {
    method: "POST",
    path: "/api/admin/auth/logout",
    permission: "authenticated",
    purpose: "Deletes the active session.",
  },
  {
    method: "GET",
    path: "/api/admin/session",
    permission: "authenticated",
    purpose: "Returns the current approved admin user from the session cookie.",
  },
  {
    method: "GET",
    path: "/api/admin/users",
    permission: "users.manage",
    purpose: "Lists users and pending approval requests.",
  },
  {
    method: "PATCH",
    path: "/api/admin/users/[id]/approve",
    permission: "users.manage",
    purpose: "Approves a user and assigns a role.",
  },
  {
    method: "GET/POST",
    path: "/api/admin/projects",
    permission: "projects.read/projects.create",
    purpose: "Reads or creates project records.",
  },
  {
    method: "PATCH/DELETE",
    path: "/api/admin/projects/[id]",
    permission: "projects.update/projects.delete",
    purpose: "Updates or deletes one project.",
  },
  {
    method: "GET/POST",
    path: "/api/admin/blog",
    permission: "posts.read/posts.create",
    purpose: "Reads or creates blog posts.",
  },
  {
    method: "PATCH/DELETE",
    path: "/api/admin/blog/[id]",
    permission: "posts.update/posts.delete",
    purpose: "Updates or deletes one blog post.",
  },
  {
    method: "POST",
    path: "/api/admin/translations/draft",
    permission: "pages.update",
    purpose: "Creates draft translations while protecting technical terms.",
  },
] as const;

export function getBackendHealthSnapshot() {
  return {
    status: "ok",
    phase: "backend-contracts",
    configured: {
      databaseUrl: Boolean(process.env.DATABASE_URL),
      authSecret: Boolean(process.env.AUTH_SECRET),
      superAdminEmail: Boolean(process.env.SUPER_ADMIN_EMAIL),
    },
    contentSnapshot: {
      currentStorage: "static TypeScript data",
      plannedStorage: "PostgreSQL tables",
      projects: projects.length,
      blogPosts: blogPosts.length,
    },
    decision: backendDecision,
    nextStep:
      "Connect a real PostgreSQL DATABASE_URL, apply migrations and add admin approval routes.",
  };
}
