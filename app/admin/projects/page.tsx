import type { Metadata } from "next";
import { FolderKanban, Plus, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectCreateForm } from "@/components/admin/project-create-form";
import { ProjectDeleteButton } from "@/components/admin/project-delete-button";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import {
  hasAdminPermission,
  requireAdminPagePermission,
} from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Projects",
  description: "Create, list and manage portfolio projects from PostgreSQL.",
};

export default async function AdminProjectsPage() {
  const activeAdmin = await requireAdminPagePermission("projects.read");
  const canCreate = hasAdminPermission(activeAdmin, "projects.create");
  const canDelete = hasAdminPermission(activeAdmin, "projects.delete");
  const prisma = getPrisma();
  const projects = await prisma.project.findMany({
    include: {
      technologies: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <AdminShell
      activePath="/admin/projects"
      requiredPermission="projects.read"
      title="Project management connected to PostgreSQL."
      description="This is the first real CRUD module: project records are now created, listed and deleted through protected admin API routes."
    >
      <div className="grid gap-5">
        {canCreate ? (
          <section className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile icon={Plus} iconClassName="size-5" tone="cyan" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Create record
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Add a project
                </h2>
              </div>
            </div>
            <ProjectCreateForm />
          </section>
        ) : null}

        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile icon={FolderKanban} iconClassName="size-5" tone="blue" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Database records
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {projects.length} projects
                </h2>
              </div>
            </div>
            <TechBadge>
              <ShieldCheck className="size-3.5" />
              Protected API
            </TechBadge>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-3">
              {projects.map((project) => (
                <article
                  className="grid gap-4 rounded-md border border-border/70 bg-background/55 p-4 lg:grid-cols-[1fr_auto]"
                  key={project.id}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                        {project.status}
                      </span>
                      {project.featured ? <TechBadge>Featured</TechBadge> : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <TechBadge>{project.category}</TechBadge>
                      {project.technologies.slice(0, 5).map((tech) => (
                        <TechBadge key={tech.id}>{tech.label}</TechBadge>
                      ))}
                    </div>
                  </div>
                  {canDelete ? (
                    <div className="flex items-start justify-end">
                      <ProjectDeleteButton
                        projectId={project.id}
                        title={project.title}
                      />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
              No database projects yet. Create the first one from the form above.
              Static portfolio cards are still coming from `data/projects.ts`
              until we migrate public content reads to PostgreSQL.
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
