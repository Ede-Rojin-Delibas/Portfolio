import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { BookOpenText, Pencil, Plus, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostDeleteButton } from "@/components/admin/blog-post-delete-button";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { ContentStatusButton } from "@/components/admin/content-status-button";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import {
  hasAdminPermission,
  requireAdminPagePermission,
} from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Blog",
  description: "Create, edit and manage portfolio blog posts from PostgreSQL.",
};

function getContent(value: Prisma.JsonValue) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return [];
}

export default async function AdminPostsPage() {
  const activeAdmin = await requireAdminPagePermission("posts.read");
  const canCreate = hasAdminPermission(activeAdmin, "posts.create");
  const canUpdate = hasAdminPermission(activeAdmin, "posts.update");
  const canDelete = hasAdminPermission(activeAdmin, "posts.delete");
  const canPublish = hasAdminPermission(activeAdmin, "posts.publish");
  const prisma = getPrisma();
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  const postsWaitingReview = posts.filter((post) => post.status === "DRAFT");

  return (
    <AdminShell
      activePath="/admin/posts"
      requiredPermission="posts.read"
      title="Blog management connected to PostgreSQL."
      description="Create, edit, publish and delete technical articles from the protected admin panel."
    >
      <div className="grid gap-5">
        {canCreate ? (
          <section className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile icon={Plus} iconClassName="size-5" tone="violet" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Create record
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Add a blog post
                </h2>
              </div>
            </div>
            <BlogPostForm canPublish={canPublish} />
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
                  {postsWaitingReview.length} blog drafts
                </h2>
              </div>
              <TechBadge>Super Admin approval</TechBadge>
            </div>
            {postsWaitingReview.length > 0 ? (
              <div className="grid gap-3">
                {postsWaitingReview.map((post) => (
                  <div
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border/70 bg-background/55 p-4"
                    key={post.id}
                  >
                    <div>
                      <p className="font-semibold tracking-tight">
                        {post.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.category}
                      </p>
                    </div>
                    <ContentStatusButton
                      endpoint={`/api/admin/blog/${post.id}`}
                      label="Approve publish"
                      status="PUBLISHED"
                      variant="default"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-border/70 bg-background/55 p-4 text-sm leading-6 text-muted-foreground">
                No blog drafts are waiting for approval.
              </p>
            )}
          </section>
        ) : null}

        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile
                icon={BookOpenText}
                iconClassName="size-5"
                tone="violet"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Database records
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {posts.length} blog posts
                </h2>
              </div>
            </div>
            <TechBadge>
              <ShieldCheck className="size-3.5" />
              Protected API
            </TechBadge>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-3">
              {posts.map((post) => (
                <article
                  className="grid gap-4 rounded-md border border-border/70 bg-background/55 p-4 lg:grid-cols-[1fr_auto]"
                  key={post.id}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {post.title}
                      </h3>
                      <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                        {post.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <TechBadge>{post.category}</TechBadge>
                      {post.topics.slice(0, 5).map((topic) => (
                        <TechBadge key={topic}>{topic}</TechBadge>
                      ))}
                    </div>
                  </div>
                  {canDelete || canPublish ? (
                    <div className="flex flex-wrap items-start justify-end gap-2">
                      {canPublish && post.status !== "PUBLISHED" ? (
                        <ContentStatusButton
                          endpoint={`/api/admin/blog/${post.id}`}
                          label="Publish"
                          status="PUBLISHED"
                          variant="default"
                        />
                      ) : null}
                      {canPublish && post.status !== "ARCHIVED" ? (
                        <ContentStatusButton
                          endpoint={`/api/admin/blog/${post.id}`}
                          label="Archive"
                          status="ARCHIVED"
                        />
                      ) : null}
                      {canDelete ? (
                        <BlogPostDeleteButton
                          postId={post.id}
                          title={post.title}
                        />
                      ) : null}
                    </div>
                  ) : null}
                  {canUpdate ? (
                    <details className="lg:col-span-2">
                      <summary className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                        <Pencil className="size-4 text-primary" />
                        Edit blog post
                      </summary>
                      <div className="mt-4 rounded-md border border-border/70 bg-background/45 p-4">
                        <BlogPostForm
                          canPublish={canPublish}
                          mode="edit"
                          post={{
                            category: post.category,
                            content: getContent(post.content),
                            excerpt: post.excerpt,
                            heroLabel: post.heroLabel,
                            heroMetric: post.heroMetric,
                            id: post.id,
                            imageAlt: post.imageAlt,
                            imageSrc: post.imageSrc,
                            readTime: post.readTime,
                            slug: post.slug,
                            status: post.status,
                            title: post.title,
                            tone: post.tone,
                            topics: post.topics,
                          }}
                        />
                      </div>
                    </details>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
              No database blog posts yet. Seed the existing articles or create a
              new one from the form above.
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
