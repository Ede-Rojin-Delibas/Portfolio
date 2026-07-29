import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { FolderKanban, Pencil, Plus, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentStatusButton } from "@/components/admin/content-status-button";
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

const adminProjectInclude = {
  highlights: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  screenshots: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  technologies: {
    orderBy: {
      sortOrder: "asc",
    },
  },
} satisfies Prisma.ProjectInclude;

type AdminProject = Prisma.ProjectGetPayload<{
  include: typeof adminProjectInclude;
}>;

function mapProjectToFormValue(project: AdminProject) {
  return {
    accent: project.accent,
    approach: project.approach,
    category: project.category,
    demo: project.demo,
    demoLabel: project.demoLabel,
    description: project.description,
    featured: project.featured,
    github: project.github,
    highlights: project.highlights.map((highlight) => highlight.text),
    id: project.id,
    imageAlt: project.imageAlt,
    imageSrc: project.imageSrc,
    outcome: project.outcome,
    problem: project.problem,
    role: project.role,
    screenshots: project.screenshots.map((screenshot) => ({
      description: screenshot.description,
      imageAlt: screenshot.imageAlt,
      imageSrc: screenshot.imageSrc,
      title: screenshot.title,
    })),
    slug: project.slug,
    status: project.status,
    tech: project.technologies.map((tech) => tech.label),
    title: project.title,
    year: project.year,
  };
}

export default async function AdminProjectsPage() {
  const activeAdmin = await requireAdminPagePermission("projects.read");
  const canCreate = hasAdminPermission(activeAdmin, "projects.create");
  const canUpdate = hasAdminPermission(activeAdmin, "projects.update");
  const canDelete = hasAdminPermission(activeAdmin, "projects.delete");
  const canPublish = hasAdminPermission(activeAdmin, "projects.publish");
  const prisma = getPrisma();
  const projects: AdminProject[] = await prisma.project.findMany({
    include: adminProjectInclude,
    orderBy: {
      updatedAt: "desc",
    },
  });
  const projectsWaitingReview = projects.filter(
    (project) => project.status === "DRAFT",
  );

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
            <ProjectCreateForm canPublish={canPublish} />
          </section>
        ) : null}

        {canPublish ? (
          <section className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Publishing review
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {projectsWaitingReview.length} project drafts
                </h2>
              </div>
              <TechBadge>Super Admin approval</TechBadge>
            </div>
            {projectsWaitingReview.length > 0 ? (
              <div className="grid gap-3">
                {projectsWaitingReview.map((project) => (
                  <div
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border/70 bg-background/55 p-4"
                    key={project.id}
                  >
                    <div>
                      <p className="font-semibold tracking-tight">
                        {project.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                    <ContentStatusButton
                      endpoint={`/api/admin/projects/${project.id}`}
                      label="Approve publish"
                      status="PUBLISHED"
                      variant="default"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-border/70 bg-background/55 p-4 text-sm leading-6 text-muted-foreground">
                No project drafts are waiting for approval.
              </p>
            )}
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
                  {canDelete || canPublish ? (
                    <div className="flex flex-wrap items-start justify-end gap-2">
                      {canPublish && project.status !== "PUBLISHED" ? (
                        <ContentStatusButton
                          endpoint={`/api/admin/projects/${project.id}`}
                          label="Publish"
                          status="PUBLISHED"
                          variant="default"
                        />
                      ) : null}
                      {canPublish && project.status !== "ARCHIVED" ? (
                        <ContentStatusButton
                          endpoint={`/api/admin/projects/${project.id}`}
                          label="Archive"
                          status="ARCHIVED"
                        />
                      ) : null}
                      {canDelete ? (
                        <ProjectDeleteButton
                          projectId={project.id}
                          title={project.title}
                        />
                      ) : null}
                    </div>
                  ) : null}
                  {canUpdate ? (
                    <details className="lg:col-span-2">
                      <summary className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                        <Pencil className="size-4 text-primary" />
                        Edit project
                      </summary>
                      <div className="mt-4 rounded-md border border-border/70 bg-background/45 p-4">
                        <ProjectCreateForm
                          canPublish={canPublish}
                          mode="edit"
                          project={mapProjectToFormValue(project)}
                        />
                      </div>
                    </details>
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
