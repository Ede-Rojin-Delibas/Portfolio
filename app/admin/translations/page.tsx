import type { Metadata } from "next";
import { BookOpenText, FolderKanban, Languages, ShieldCheck } from "lucide-react";
import {
  TranslationDraftButton,
  TranslationReviewButton,
} from "@/components/admin/translation-action-button";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminPagePermission } from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Translations",
  description: "Create and review Turkish translation drafts for content.",
};

function TranslationState({
  translation,
}: {
  translation?: {
    id: string;
    status: string;
  };
}) {
  if (!translation) {
    return <TechBadge>No TR draft</TechBadge>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <TechBadge>{translation.status}</TechBadge>
      {translation.status !== "REVIEWED" ? (
        <TranslationReviewButton translationId={translation.id} />
      ) : null}
    </div>
  );
}

export default async function AdminTranslationsPage() {
  await requireAdminPagePermission("translations.manage");
  const prisma = getPrisma();
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      include: {
        translations: {
          where: {
            locale: "tr",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.blogPost.findMany({
      include: {
        translations: {
          where: {
            locale: "tr",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
  ]);

  return (
    <AdminShell
      activePath="/admin/translations"
      requiredPermission="translations.manage"
      title="Translation drafts for Turkish content."
      description="Drafts are created from source records first. Public Turkish pages only use translations after they are marked as reviewed."
    >
      <div className="grid gap-5">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile icon={Languages} iconClassName="size-5" tone="cyan" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Translation workflow
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Draft, review, publish
                </h2>
              </div>
            </div>
            <TechBadge>
              <ShieldCheck className="size-3.5" />
              Reviewed only
            </TechBadge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            This first workflow creates reviewable database records. A real
            translation provider can later replace the draft text generator
            without changing the public rendering rule.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile
                icon={FolderKanban}
                iconClassName="size-5"
                tone="blue"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Projects
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  {projects.length} records
                </h2>
              </div>
            </div>
            <div className="grid gap-3">
              {projects.map((project) => {
                const translation = project.translations[0];

                return (
                  <div
                    className="rounded-md border border-border/70 bg-background/55 p-4"
                    key={project.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold tracking-tight">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          /projects/{project.slug}
                        </p>
                      </div>
                      <TranslationDraftButton
                        entity="project"
                        itemId={project.id}
                      />
                    </div>
                    <div className="mt-3">
                      <TranslationState translation={translation} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile
                icon={BookOpenText}
                iconClassName="size-5"
                tone="violet"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Blog posts
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  {posts.length} records
                </h2>
              </div>
            </div>
            <div className="grid gap-3">
              {posts.map((post) => {
                const translation = post.translations[0];

                return (
                  <div
                    className="rounded-md border border-border/70 bg-background/55 p-4"
                    key={post.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold tracking-tight">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          /blog/{post.slug}
                        </p>
                      </div>
                      <TranslationDraftButton entity="blog" itemId={post.id} />
                    </div>
                    <div className="mt-3">
                      <TranslationState translation={translation} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}
