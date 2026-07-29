import type { Metadata } from "next";
import Link from "next/link";
import { Archive, BookOpenText, FolderKanban, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { requireAdminPagePermission } from "@/lib/backend/permissions";
import { getPrisma } from "@/lib/backend/prisma";

export const metadata: Metadata = {
  title: "Admin Trash",
  description: "Review archived project and blog records.",
};

export default async function AdminTrashPage() {
  await requireAdminPagePermission("trash.manage");

  const prisma = getPrisma();
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        status: "ARCHIVED",
      },
    }),
    prisma.blogPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        status: "ARCHIVED",
      },
    }),
  ]);

  return (
    <AdminShell
      activePath="/admin/trash"
      requiredPermission="trash.manage"
      title="Trash and archive review."
      description="Archived content is separated from public pages so it can be reviewed before a later restore or permanent delete flow."
    >
      <div className="grid gap-5">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile icon={Trash2} iconClassName="size-5" tone="slate" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Archived records
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {projects.length + posts.length} items
                </h2>
              </div>
            </div>
            <TechBadge>
              <Archive className="size-3.5" />
              Status: ARCHIVED
            </TechBadge>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-md border border-border/70 bg-background/55 p-4">
              <div className="mb-4 flex items-center gap-2">
                <FolderKanban className="size-4 text-primary" />
                <h3 className="font-semibold tracking-tight">Projects</h3>
              </div>
              {projects.length > 0 ? (
                <div className="grid gap-3">
                  {projects.map((project) => (
                    <div
                      className="rounded-md border border-border/70 bg-background/60 p-3"
                      key={project.id}
                    >
                      <p className="font-medium">{project.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  No archived projects.
                </p>
              )}
              <Button asChild className="mt-4" variant="outline">
                <Link href="/admin/projects">Manage projects</Link>
              </Button>
            </article>

            <article className="rounded-md border border-border/70 bg-background/55 p-4">
              <div className="mb-4 flex items-center gap-2">
                <BookOpenText className="size-4 text-primary" />
                <h3 className="font-semibold tracking-tight">Blog posts</h3>
              </div>
              {posts.length > 0 ? (
                <div className="grid gap-3">
                  {posts.map((post) => (
                    <div
                      className="rounded-md border border-border/70 bg-background/60 p-3"
                      key={post.id}
                    >
                      <p className="font-medium">{post.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.category}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  No archived blog posts.
                </p>
              )}
              <Button asChild className="mt-4" variant="outline">
                <Link href="/admin/posts">Manage blog posts</Link>
              </Button>
            </article>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
