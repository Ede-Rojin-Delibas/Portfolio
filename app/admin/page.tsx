import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Database,
  FileCode2,
  Languages,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  adminContentSummaries,
  adminTranslationWorkflow,
  blogTranslationFields,
  projectTranslationFields,
  protectedTranslationTerms,
} from "@/data/admin-content";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { TechBadge } from "@/components/shared/tech-badge";

export const metadata: Metadata = {
  title: "Admin Studio",
  description:
    "Planning surface for portfolio content management, translation workflow and future admin panel architecture.",
};

const architectureCards = [
  {
    title: "Content source",
    description:
      "Projects and blog posts should move from static files into a database or CMS collection.",
    icon: Database,
    tone: "blue" as const,
  },
  {
    title: "Automatic draft translation",
    description:
      "New content creates translated drafts first; public pages should only use reviewed translations.",
    icon: Languages,
    tone: "cyan" as const,
  },
  {
    title: "Protected technical terms",
    description:
      "Framework names, libraries, model terms and stack labels stay unchanged during translation.",
    icon: ShieldCheck,
    tone: "emerald" as const,
  },
  {
    title: "Review before publish",
    description:
      "Machine output is treated as a draft, so technical accuracy and tone can be checked safely.",
    icon: CheckCircle2,
    tone: "violet" as const,
  },
];

function FieldList({
  fields,
  title,
}: {
  fields: typeof projectTranslationFields;
  title: string;
}) {
  return (
    <article className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <IconTile icon={FileCode2} iconClassName="size-5" tone="blue" />
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-3">
        {fields.map((field) => (
          <div
            key={field.name}
            className="rounded-md border border-border/70 bg-background/55 p-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{field.label}</p>
              <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                {field.intent}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {field.autoTranslate
                ? "Auto-translate draft enabled"
                : "Keep source value unchanged"}
              {field.reviewRequired ? " - Review required" : ""}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function AdminStudioPage() {
  return (
    <AdminShell
      activePath="/admin"
      title="Content Studio for projects, blog posts and translation workflow."
      description="This is the first safe admin step: no public write actions yet, but the content model, approval model and translation rules are now visible and ready to connect to storage."
    >
      <div className="grid gap-5">
        <Reveal>
          <div className="glass-panel mb-8 grid gap-5 rounded-lg p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <IconTile icon={AlertTriangle} iconClassName="size-5" tone="amber" />
            <div>
              <p className="text-lg font-semibold tracking-tight">
                This page is a planning studio, not an authenticated admin yet.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The next step should add authentication before save, delete,
                publish or translation API actions are exposed.
              </p>
            </div>
            <span className="rounded-md border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
              Safe scaffold
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {architectureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal delay={index * 0.06} key={card.title}>
                <article className="glass-panel h-full rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <IconTile
                    className="mb-5"
                    icon={Icon}
                    iconClassName="size-5"
                    tone={card.tone}
                  />
                  <h2 className="text-lg font-semibold tracking-tight">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {adminContentSummaries.map((item) => (
              <article key={item.type} className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {item.label}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                      {item.count} items
                    </h2>
                  </div>
                  <IconTile
                    icon={item.type === "project" ? Workflow : BookOpenText}
                    iconClassName="size-5"
                    tone={item.type === "project" ? "cyan" : "violet"}
                  />
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 grid gap-3 rounded-md border border-border/70 bg-background/55 p-4 text-sm">
                  <p>
                    <span className="text-muted-foreground">Current:</span>{" "}
                    {item.currentStorage}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Source:</span>{" "}
                    {item.source}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-muted-foreground">Next:</span>
                    <ArrowRight className="size-4 text-primary" />
                    {item.nextStorage}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <FieldList fields={projectTranslationFields} title="Project fields" />
          <FieldList fields={blogTranslationFields} title="Blog fields" />
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="glass-panel rounded-lg p-5">
              <div className="mb-5 flex items-center gap-3">
                <IconTile
                  icon={ShieldCheck}
                  iconClassName="size-5"
                  tone="emerald"
                />
                <h2 className="text-xl font-semibold tracking-tight">
                  Protected glossary
                </h2>
              </div>
              <p className="mb-5 text-sm leading-6 text-muted-foreground">
                These terms should not be translated automatically. The
                translation job will protect them before sending text to the
                translation provider.
              </p>
              <div className="flex flex-wrap gap-2">
                {protectedTranslationTerms.map((term) => (
                  <TechBadge key={term}>{term}</TechBadge>
                ))}
              </div>
            </article>

            <article className="glass-panel rounded-lg p-5">
              <div className="mb-5 flex items-center gap-3">
                <IconTile icon={Workflow} iconClassName="size-5" tone="pink" />
                <h2 className="text-xl font-semibold tracking-tight">
                  Translation workflow
                </h2>
              </div>
              <div className="grid gap-3">
                {adminTranslationWorkflow.map((item, index) => (
                  <div
                    key={item.step}
                    className="grid gap-3 rounded-md border border-border/70 bg-background/55 p-4 sm:grid-cols-[auto_1fr]"
                  >
                    <span className="font-mono text-xl font-semibold text-primary/80">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{item.step}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </AdminShell>
  );
}
