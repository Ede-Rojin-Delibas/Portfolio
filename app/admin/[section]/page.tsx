import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BookOpenText,
  FolderKanban,
  Image,
  Inbox,
  Settings,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { adminNavItems } from "@/data/admin-access";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";

type AdminSectionPageProps = {
  params: Promise<{ section: string }>;
};

const sectionPlans = {
  projects: {
    title: "Project management",
    description:
      "Create, edit, publish, feature, archive and soft-delete portfolio projects.",
    icon: FolderKanban,
    tone: "cyan" as const,
    steps: [
      "Project list with search, category filters and publication status",
      "Project form with slug, summary, case study, stack and links",
      "Draft, published, archived and deleted states",
      "Homepage visibility and display order controls",
    ],
  },
  posts: {
    title: "Blog management",
    description:
      "Write technical articles, manage drafts and publish reviewed posts.",
    icon: BookOpenText,
    tone: "violet" as const,
    steps: [
      "Markdown-friendly editor for technical writing",
      "Category, tag, cover image and reading time fields",
      "SEO title, meta description and Open Graph image controls",
      "Draft, scheduled, published and archived states",
    ],
  },
  pages: {
    title: "Page content",
    description:
      "Edit Home, About and Contact content without touching source code.",
    icon: BookOpenText,
    tone: "blue" as const,
    steps: [
      "Home hero, CTA, stats and featured content controls",
      "About biography, education, timeline and skills sections",
      "Contact copy, location, social links and form availability",
      "Reviewed translations for static page sections",
    ],
  },
  messages: {
    title: "Contact messages",
    description:
      "Review, archive and respond to messages coming from the contact form.",
    icon: Inbox,
    tone: "emerald" as const,
    steps: [
      "Inbox with unread, read, replied, archived and spam states",
      "Search and filter by sender, topic and status",
      "Honeypot, rate limiting and validation on form submissions",
      "Reply helper and email copy actions",
    ],
  },
  media: {
    title: "Media library",
    description:
      "Central place for project images, blog covers, page visuals and alt text.",
    icon: Image,
    tone: "pink" as const,
    steps: [
      "Upload and preview image assets",
      "Alt text, folder, usage and file size metadata",
      "WebP conversion and image size validation",
      "Attach media to projects, posts and page sections",
    ],
  },
  roles: {
    title: "Roles and permissions",
    description:
      "Control which users can read, create, update, publish or delete content.",
    icon: ShieldCheck,
    tone: "amber" as const,
    steps: [
      "Permission matrix for Super Admin, Admin, Editor and Viewer",
      "Backend permission checks for every admin API route",
      "Role assignment during user approval",
      "Audit log entries when roles change",
    ],
  },
  trash: {
    title: "Trash and restore",
    description:
      "Protect content from accidental deletion with soft delete and restore flow.",
    icon: Trash2,
    tone: "slate" as const,
    steps: [
      "Move deleted content to trash instead of permanent deletion",
      "Restore projects, posts, media and page sections",
      "Permanent deletion only for authorized Super Admin users",
      "Activity logs for delete and restore actions",
    ],
  },
  settings: {
    title: "Site settings",
    description:
      "Manage global profile, SEO, social links, theme and technical settings.",
    icon: Settings,
    tone: "blue" as const,
    steps: [
      "Portfolio identity, default language and social links",
      "SEO defaults, Open Graph metadata and analytics settings",
      "Contact form availability and maintenance mode",
      "Security settings for sessions and registration behavior",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(sectionPlans).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: AdminSectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const plan = sectionPlans[section as keyof typeof sectionPlans];

  if (!plan) {
    return {
      title: "Admin section not found",
    };
  }

  return {
    title: plan.title,
    description: plan.description,
  };
}

export default async function AdminSectionPage({
  params,
}: AdminSectionPageProps) {
  const { section } = await params;
  const plan = sectionPlans[section as keyof typeof sectionPlans];

  if (!plan) {
    notFound();
  }

  const navItem = adminNavItems.find((item) => item.href === `/admin/${section}`);
  const Icon = plan.icon;

  return (
    <AdminShell
      activePath={`/admin/${section}`}
      title={plan.title}
      description={plan.description}
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <IconTile icon={Icon} iconClassName="size-5" tone={plan.tone} />
            <TechBadge>{navItem?.permission ?? "planned"}</TechBadge>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Planned module
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This page is intentionally scaffolded before CRUD actions. It lets
            us design the CMS information architecture before adding database
            writes and protected API routes.
          </p>
          <div className="mt-5 rounded-md border border-border/70 bg-background/55 p-4 text-sm text-muted-foreground">
            Next implementation: authenticated server actions or API routes
            with permission checks.
          </div>
        </article>

        <article className="glass-panel rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            First version checklist
          </p>
          <div className="mt-5 grid gap-3">
            {plan.steps.map((step, index) => (
              <div
                key={step}
                className="grid gap-3 rounded-md border border-border/70 bg-background/55 p-4 sm:grid-cols-[auto_1fr]"
              >
                <span className="font-mono text-xl font-semibold text-primary/75">
                  0{index + 1}
                </span>
                <p className="text-sm leading-6 text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
          <Button disabled className="mt-5">
            Build CRUD after auth
          </Button>
        </article>
      </div>
    </AdminShell>
  );
}
