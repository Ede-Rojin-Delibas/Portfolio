import type { Metadata } from "next";
import type { AccountStatus, AdminRole, PublishStatus } from "@prisma/client";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Database,
  FilePenLine,
  FolderKanban,
  Inbox,
  Languages,
  ListChecks,
  LockKeyhole,
  ScrollText,
  ShieldCheck,
  UserPlus,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile, type IconTileTone } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { getPrisma } from "@/lib/backend/prisma";
import {
  formatAdminRole,
  hasAdminPermission,
} from "@/lib/backend/permissions";
import { getCurrentAdminUser } from "@/lib/backend/session";

export const metadata: Metadata = {
  title: "Admin Studio",
  description:
    "Operational dashboard for portfolio content, users, drafts, requests and audit activity.",
};

const roleOrder: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"];
const statusOrder: AccountStatus[] = [
  "PENDING",
  "ACTIVE",
  "SUSPENDED",
  "REJECTED",
];

const statusTone: Record<AccountStatus | PublishStatus, string> = {
  ACTIVE:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  ARCHIVED:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-200",
  DRAFT:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  PENDING:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  PUBLISHED:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  REJECTED:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-200",
  SUSPENDED:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-200",
};

type MetricCardProps = {
  description: string;
  href?: string;
  icon: LucideIcon;
  label: string;
  tone: IconTileTone;
  value: number | string;
};

type UrgentAction = {
  count: number;
  description: string;
  href?: string;
  icon: LucideIcon;
  label: string;
  tone: IconTileTone;
};

type RecentContentItem = {
  href: string;
  id: string;
  kind: string;
  status: PublishStatus;
  title: string;
  updatedAt: Date;
};

function getRecordCount(record: Record<string, number>, key: string) {
  return record[key] ?? 0;
}

function formatDashboardDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "Europe/Istanbul",
  }).format(value);
}

function formatDashboardTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  }).format(value);
}

function formatActivityDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(value);
}

function MetricCard({
  description,
  href,
  icon,
  label,
  tone,
  value,
}: MetricCardProps) {
  const content = (
    <>
      <div className="mb-5 flex items-start justify-between gap-4">
        <IconTile icon={icon} iconClassName="size-5" tone={tone} />
        {href ? <ArrowRight className="size-4 text-primary/70" /> : null}
      </div>
      <p className="text-3xl font-semibold tracking-tight md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="glass-panel group block h-full rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        {content}
      </Link>
    );
  }

  return <article className="glass-panel h-full rounded-lg p-5">{content}</article>;
}

function AdminAccessGateway() {
  return (
    <main className="admin-skin section-skin relative grid min-h-screen overflow-hidden px-4 py-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 self-center lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <LockKeyhole className="size-4" />
            Protected CMS
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Manage the portfolio after signing in.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            This admin area controls projects, blog posts, page content, media,
            user approvals and translation workflow. Sign in if you already have
            access, or request an account if this is your first time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="h-11">
              <Link href="/admin/login">
                Sign in
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="h-11" variant="outline">
              <Link href="/admin/register">
                Request access
                <UserPlus className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="glass-panel rounded-lg p-5 md:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Access flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Login or registration
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              {
                title: "Already approved",
                description:
                  "Use the login page. The backend checks your session, role and permissions before opening CMS pages.",
                icon: LockKeyhole,
              },
              {
                title: "First time here",
                description:
                  "Create an access request. The configured Super Admin email is activated automatically; other users wait for approval.",
                icon: UserPlus,
              },
              {
                title: "Protected after entry",
                description:
                  "The sidebar only shows allowed modules, and protected pages check permissions on the server.",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="rounded-md border border-border/70 bg-background/55 p-4"
                  key={item.title}
                >
                  <div className="flex gap-3">
                    <IconTile icon={Icon} iconClassName="size-5" tone="cyan" />
                    <div>
                      <h3 className="font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function UrgentActionCard({ action }: { action: UrgentAction }) {
  const content = (
    <div className="flex items-start gap-4">
      <IconTile icon={action.icon} iconClassName="size-5" tone={action.tone} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold tracking-tight">{action.label}</p>
          <TechBadge>{action.count} waiting</TechBadge>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {action.description}
        </p>
      </div>
      {action.href ? <ArrowRight className="size-4 text-primary/70" /> : null}
    </div>
  );

  if (action.href) {
    return (
      <Link
        href={action.href}
        className="rounded-md border border-border/70 bg-background/55 p-4 transition hover:border-primary/40 hover:bg-background/75"
      >
        {content}
      </Link>
    );
  }

  return (
    <article className="rounded-md border border-border/70 bg-background/55 p-4">
      {content}
    </article>
  );
}

export default async function AdminStudioPage() {
  const activeAdmin = await getCurrentAdminUser();

  if (!activeAdmin) {
    return <AdminAccessGateway />;
  }

  const prisma = getPrisma();
  const canManageUsers = hasAdminPermission(activeAdmin, "users.manage");
  const canManageProjects = hasAdminPermission(activeAdmin, "projects.read");
  const canManagePosts = hasAdminPermission(activeAdmin, "posts.read");
  const canManageTranslations = hasAdminPermission(
    activeAdmin,
    "translations.manage",
  );
  const canReadMessages = hasAdminPermission(activeAdmin, "messages.read");
  const canReadAudit = hasAdminPermission(activeAdmin, "audit.read");

  const [
    totalUsers,
    usersByRole,
    usersByStatus,
    totalProjects,
    publishedProjects,
    draftProjects,
    featuredProjects,
    totalPosts,
    publishedPosts,
    draftPosts,
    unreadMessages,
    totalMessages,
    projectTranslationsWaiting,
    blogTranslationsWaiting,
    recentLogs,
    recentProjects,
    recentPosts,
  ] = await Promise.all([
    prisma.adminUser.count(),
    prisma.adminUser.groupBy({
      by: ["role"],
      _count: {
        _all: true,
      },
    }),
    prisma.adminUser.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
    prisma.project.count(),
    prisma.project.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.project.count({
      where: {
        status: "DRAFT",
      },
    }),
    prisma.project.count({
      where: {
        featured: true,
      },
    }),
    prisma.blogPost.count(),
    prisma.blogPost.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.blogPost.count({
      where: {
        status: "DRAFT",
      },
    }),
    canReadMessages
      ? prisma.contactMessage.count({
          where: {
            status: "UNREAD",
          },
        })
      : Promise.resolve(0),
    canReadMessages ? prisma.contactMessage.count() : Promise.resolve(0),
    canManageTranslations
      ? prisma.projectTranslation.count({
          where: {
            status: {
              in: ["MACHINE_DRAFT", "NEEDS_REVIEW"],
            },
          },
        })
      : Promise.resolve(0),
    canManageTranslations
      ? prisma.blogTranslation.count({
          where: {
            status: {
              in: ["MACHINE_DRAFT", "NEEDS_REVIEW"],
            },
          },
        })
      : Promise.resolve(0),
    canReadAudit
      ? prisma.auditLog.findMany({
          include: {
            actor: {
              select: {
                email: true,
                name: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 6,
        })
      : Promise.resolve([]),
    prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        status: true,
        title: true,
        updatedAt: true,
      },
      take: 4,
    }),
    prisma.blogPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        status: true,
        title: true,
        updatedAt: true,
      },
      take: 4,
    }),
  ]);

  const roleCounts: Record<string, number> = {};
  for (const item of usersByRole) {
    roleCounts[item.role ?? "UNASSIGNED"] = item._count._all;
  }

  const accountStatusCounts: Record<string, number> = {};
  for (const item of usersByStatus) {
    accountStatusCounts[item.status] = item._count._all;
  }

  const translationsWaiting =
    projectTranslationsWaiting + blogTranslationsWaiting;
  const pendingUsers = getRecordCount(accountStatusCounts, "PENDING");
  const suspendedUsers = getRecordCount(accountStatusCounts, "SUSPENDED");
  const draftContent = draftProjects + draftPosts;
  const publishedContent = publishedProjects + publishedPosts;
  const waitingTotal = pendingUsers + draftContent + unreadMessages + translationsWaiting;
  const now = new Date();

  const metricCards: MetricCardProps[] = [
    {
      description: `${pendingUsers} pending, ${suspendedUsers} suspended accounts.`,
      href: canManageUsers ? "/admin/users" : undefined,
      icon: Users,
      label: "Total users",
      tone: "blue",
      value: totalUsers,
    },
    {
      description: `${publishedProjects} live projects from ${totalProjects} database records.`,
      href: canManageProjects ? "/admin/projects" : undefined,
      icon: FolderKanban,
      label: "Published projects",
      tone: "cyan",
      value: publishedProjects,
    },
    {
      description: `${publishedPosts} live posts from ${totalPosts} database records.`,
      href: canManagePosts ? "/admin/posts" : undefined,
      icon: BookOpenText,
      label: "Published blog posts",
      tone: "violet",
      value: publishedPosts,
    },
    {
      description: "User requests, drafts, unread messages and translations.",
      icon: ListChecks,
      label: "Open actions",
      tone: waitingTotal > 0 ? "amber" : "emerald",
      value: waitingTotal,
    },
  ];

  const urgentActions: UrgentAction[] = [];

  if (pendingUsers > 0) {
    urgentActions.push({
      count: pendingUsers,
      description:
        "Approve, reject or assign roles for new admin registration requests.",
      href: canManageUsers ? "/admin/users" : undefined,
      icon: Users,
      label: "Review account requests",
      tone: "amber",
    });
  }

  if (draftContent > 0) {
    urgentActions.push({
      count: draftContent,
      description:
        "Project and blog drafts are waiting before they become public.",
      href: canManagePosts
        ? "/admin/posts"
        : canManageProjects
          ? "/admin/projects"
          : undefined,
      icon: FilePenLine,
      label: "Review content drafts",
      tone: "violet",
    });
  }

  if (translationsWaiting > 0) {
    urgentActions.push({
      count: translationsWaiting,
      description:
        "Turkish translation drafts need review before public rendering.",
      href: canManageTranslations ? "/admin/translations" : undefined,
      icon: Languages,
      label: "Review translations",
      tone: "cyan",
    });
  }

  if (unreadMessages > 0) {
    urgentActions.push({
      count: unreadMessages,
      description: "Contact form messages are unread and may need a response.",
      href: canReadMessages ? "/admin/messages" : undefined,
      icon: Inbox,
      label: "Check contact inbox",
      tone: "emerald",
    });
  }

  const recentContentChanges: RecentContentItem[] = [
    ...recentProjects.map((project) => ({
      href: "/admin/projects",
      id: project.id,
      kind: "Project",
      status: project.status,
      title: project.title,
      updatedAt: project.updatedAt,
    })),
    ...recentPosts.map((post) => ({
      href: "/admin/posts",
      id: post.id,
      kind: "Blog post",
      status: post.status,
      title: post.title,
      updatedAt: post.updatedAt,
    })),
  ]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 6);

  return (
    <AdminShell
      activePath="/admin"
      requiredPermission="dashboard.read"
      title="Operational dashboard for portfolio content."
      description="Track users, publishing queues, translations, messages and recent admin activity from one protected database-backed screen."
    >
      <div className="grid gap-5">
        <section className="glass-panel grid gap-5 rounded-lg p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Activity className="size-4" />
              Today in the CMS
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {waitingTotal > 0
                ? `${waitingTotal} items need attention`
                : "Everything important is clear"}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              The dashboard now reads live database counts instead of static
              planning notes, so the top cards reflect the current admin state.
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/60 p-4 text-sm md:min-w-64">
            <div className="flex items-center gap-3">
              <IconTile icon={CalendarDays} iconClassName="size-5" tone="blue" />
              <div>
                <p className="font-semibold tracking-tight">
                  {formatDashboardDate(now)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {formatDashboardTime(now)} Istanbul time
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => (
            <MetricCard key={card.label} {...card} />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Users by role
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {totalUsers} registered accounts
                </h2>
              </div>
              <IconTile icon={ShieldCheck} iconClassName="size-5" tone="cyan" />
            </div>

            <div className="grid gap-3">
              {roleOrder.map((role) => (
                <div
                  className="rounded-md border border-border/70 bg-background/55 p-4"
                  key={role}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{formatAdminRole(role)}</p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {getRecordCount(roleCounts, role)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {statusOrder.map((status) => (
                <span
                  className={`rounded-md border px-2 py-1 text-xs ${statusTone[status]}`}
                  key={status}
                >
                  {status}: {getRecordCount(accountStatusCounts, status)}
                </span>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Pending requests
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Operational queue
                </h2>
              </div>
              <IconTile
                icon={waitingTotal > 0 ? AlertTriangle : CheckCircle2}
                iconClassName="size-5"
                tone={waitingTotal > 0 ? "amber" : "emerald"}
              />
            </div>

            {urgentActions.length > 0 ? (
              <div className="grid gap-3">
                {urgentActions.map((action) => (
                  <UrgentActionCard action={action} key={action.label} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
                No pending accounts, drafts, unread messages or translation
                reviews. The portfolio CMS is in a clean state.
              </div>
            )}
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <article className="glass-panel rounded-lg p-5 xl:col-span-2">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Portfolio statistics
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Content visibility snapshot
                </h2>
              </div>
              <IconTile icon={BarChart3} iconClassName="size-5" tone="pink" />
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Published items",
                  value: publishedContent,
                  detail: "Projects and blog posts visible on the public site.",
                },
                {
                  label: "Draft items",
                  value: draftContent,
                  detail: "Content waiting for review or publishing.",
                },
                {
                  label: "Featured projects",
                  value: featuredProjects,
                  detail: "Projects promoted on the home page.",
                },
                {
                  label: "Contact messages",
                  value: totalMessages,
                  detail: canReadMessages
                    ? "Messages saved from the public contact form."
                    : "Hidden for roles without message permission.",
                },
              ].map((item) => (
                <div
                  className="rounded-md border border-border/70 bg-background/55 p-4"
                  key={item.label}
                >
                  <p className="text-3xl font-semibold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-2 font-medium">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile icon={Database} iconClassName="size-5" tone="slate" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Analytics source
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  Tracking not connected yet
                </h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Real visitor stats need a data source. We can either add a
              `PageView` table with a tiny tracking endpoint, or connect Vercel
              Analytics/PostHog and read their numbers into this card.
            </p>
            <div className="mt-5 grid gap-2 text-sm">
              <TechBadge>Page views</TechBadge>
              <TechBadge>Top project pages</TechBadge>
              <TechBadge>Contact conversions</TechBadge>
            </div>
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <IconTile icon={ScrollText} iconClassName="size-5" tone="amber" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Recent log records
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Latest admin actions
                  </h2>
                </div>
              </div>
              {canReadAudit ? (
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/audit-logs">
                    View all
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </div>

            {recentLogs.length > 0 ? (
              <div className="grid gap-3">
                {recentLogs.map((log) => (
                  <article
                    className="rounded-md border border-border/70 bg-background/55 p-4"
                    key={log.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold tracking-tight">
                            {log.action}
                          </p>
                          <TechBadge>{log.entity}</TechBadge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {log.actor?.name ?? "System"} -{" "}
                          {log.actor?.email ?? "no actor"}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatActivityDate(log.createdAt)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
                {canReadAudit
                  ? "No audit entries yet."
                  : "Your role cannot read audit logs."}
              </div>
            )}
          </article>

          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile icon={Clock3} iconClassName="size-5" tone="blue" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Recent changes
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Content updates
                </h2>
              </div>
            </div>

            {recentContentChanges.length > 0 ? (
              <div className="grid gap-3">
                {recentContentChanges.map((item) => (
                  <Link
                    className="rounded-md border border-border/70 bg-background/55 p-4 transition hover:border-primary/40 hover:bg-background/75"
                    href={item.href}
                    key={`${item.kind}-${item.id}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold tracking-tight">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.kind} - {formatActivityDate(item.updatedAt)}
                        </p>
                      </div>
                      <span
                        className={`rounded-md border px-2 py-1 text-xs ${statusTone[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
                No project or blog updates yet.
              </div>
            )}
          </article>
        </section>

        <section className="glass-panel rounded-lg p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Workflow map
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                What this dashboard watches
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                User approvals, publishing state, translation review, contact
                inbox and audit activity are now visible from the first admin
                screen.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TechBadge>
                <Workflow className="size-3.5" />
                PostgreSQL
              </TechBadge>
              <TechBadge>Prisma aggregates</TechBadge>
              <TechBadge>Server-side permissions</TechBadge>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
