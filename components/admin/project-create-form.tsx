"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  text: string;
  type: "error" | "success";
};

type ProjectFormValue = {
  accent?: string;
  approach?: string;
  category?: string;
  demo?: string | null;
  demoLabel?: string | null;
  description?: string;
  featured?: boolean;
  github?: string | null;
  highlights?: string[];
  imageAlt?: string | null;
  imageSrc?: string | null;
  outcome?: string;
  problem?: string;
  role?: string;
  screenshots?: {
    description: string;
    imageAlt?: string | null;
    imageSrc?: string | null;
    title: string;
  }[];
  slug?: string;
  status?: string;
  tech?: string[];
  title?: string;
  year?: string;
};

type ProjectCreateFormProps = {
  canPublish?: boolean;
  mode?: "create" | "edit";
  project?: ProjectFormValue & {
    id: string;
  };
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function splitList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectCreateForm({
  canPublish = false,
  mode = "create",
  project,
}: ProjectCreateFormProps) {
  const router = useRouter();
  const [message, setMessage] = React.useState<Message | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const isEdit = mode === "edit" && Boolean(project);
  const firstScreenshot = project?.screenshots?.[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = getString(formData, "title");
    const screenshotTitle = getString(formData, "screenshotTitle");
    const screenshotDescription = getString(formData, "screenshotDescription");
    const screenshotImageSrc = getString(formData, "screenshotImageSrc");
    const screenshotImageAlt = getString(formData, "screenshotImageAlt");
    const payload = {
      accent: getString(formData, "accent"),
      approach: getString(formData, "approach"),
      category: getString(formData, "category"),
      demo: getString(formData, "demo"),
      demoLabel: getString(formData, "demoLabel"),
      description: getString(formData, "description"),
      featured: formData.get("featured") === "on",
      github: getString(formData, "github"),
      highlights: splitList(getString(formData, "highlights")),
      imageAlt: getString(formData, "imageAlt"),
      imageSrc: getString(formData, "imageSrc"),
      outcome: getString(formData, "outcome"),
      problem: getString(formData, "problem"),
      role: getString(formData, "role"),
      screenshots:
        screenshotTitle || screenshotDescription || screenshotImageSrc
          ? [
              {
                description:
                  screenshotDescription || "Project screenshot from CMS.",
                imageAlt: screenshotImageAlt,
                imageSrc: screenshotImageSrc,
                title: screenshotTitle || "Project preview",
              },
            ]
          : [],
      slug: getString(formData, "slug") || slugify(title),
      status: canPublish ? getString(formData, "status") : "DRAFT",
      tech: splitList(getString(formData, "tech")),
      title,
      year: getString(formData, "year"),
    };

    const response = await fetch(
      isEdit ? `/api/admin/projects/${project?.id}` : "/api/admin/projects",
      {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: isEdit ? "PATCH" : "POST",
      },
    );

    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsPending(false);

    if (!response.ok) {
      setMessage({
        type: "error",
        text: data?.message ?? "Project could not be saved.",
      });
      return;
    }

    if (!isEdit) {
      form.reset();
    }

    setMessage({
      type: "success",
      text: data?.message ?? (isEdit ? "Project updated." : "Project created."),
    });
    router.refresh();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <Input
            defaultValue={project?.title ?? ""}
            name="title"
            placeholder="Synthetic Data Generator"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Slug
          <Input
            defaultValue={project?.slug ?? ""}
            name="slug"
            placeholder="synthetic-data-generator"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Category
          <Input
            defaultValue={project?.category ?? ""}
            name="category"
            placeholder="AI & Data"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Role
          <Input
            defaultValue={project?.role ?? ""}
            name="role"
            placeholder="Machine Learning Developer"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Year
          <Input
            defaultValue={project?.year ?? ""}
            name="year"
            placeholder="2026"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Short description
        <textarea
          className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          name="description"
          placeholder="A practical case study..."
          defaultValue={project?.description ?? ""}
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Problem
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={project?.problem ?? ""}
            name="problem"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Approach
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={project?.approach ?? ""}
            name="approach"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Outcome
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={project?.outcome ?? ""}
            name="outcome"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Tech stack
        <Input
          defaultValue={project?.tech?.join(", ") ?? ""}
          name="tech"
          placeholder="Python, Flask, Machine Learning"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Highlights
        <textarea
          className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          defaultValue={project?.highlights?.join("\n") ?? ""}
          name="highlights"
          placeholder="One highlight per line"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          GitHub URL
          <Input
            defaultValue={project?.github ?? ""}
            name="github"
            placeholder="https://github.com/..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Demo URL
          <Input
            defaultValue={project?.demo ?? ""}
            name="demo"
            placeholder="https://..."
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Image URL
          <Input
            defaultValue={project?.imageSrc ?? ""}
            name="imageSrc"
            placeholder="/images/generated-images/..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Image alt
          <Input
            defaultValue={project?.imageAlt ?? ""}
            name="imageAlt"
            placeholder="Project preview image"
          />
        </label>
      </div>

      <div className="rounded-md border border-border/70 bg-background/45 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          First screenshot
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Screenshot title
            <Input
              defaultValue={firstScreenshot?.title ?? ""}
              name="screenshotTitle"
              placeholder="Dashboard view"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Screenshot image
            <Input
              defaultValue={firstScreenshot?.imageSrc ?? ""}
              name="screenshotImageSrc"
              placeholder="/images/generated-images/..."
            />
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Screenshot description
            <Input
              defaultValue={firstScreenshot?.description ?? ""}
              name="screenshotDescription"
              placeholder="What this screenshot communicates"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Screenshot alt
            <Input
              defaultValue={firstScreenshot?.imageAlt ?? ""}
              name="screenshotImageAlt"
              placeholder="Screenshot alt text"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {canPublish ? (
          <label className="grid gap-2 text-sm font-medium">
            Status
            <select
              className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              defaultValue={project?.status ?? "DRAFT"}
              name="status"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </label>
        ) : (
          <div className="rounded-md border border-amber-500/25 bg-amber-500/10 p-3 text-sm leading-6 text-amber-800 dark:text-amber-100">
            This project will be saved as Draft. A Super Admin can review it and
            change the status to Published.
          </div>
        )}
        <label className="grid gap-2 text-sm font-medium">
          Accent
          <select
            className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={project?.accent ?? "blue"}
            name="accent"
          >
            <option value="blue">Blue</option>
            <option value="cyan">Cyan</option>
            <option value="indigo">Indigo</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end rounded-md border border-border/70 bg-background/55 px-3 py-2 text-sm font-medium">
          <input
            className="size-4 accent-primary"
            defaultChecked={Boolean(project?.featured)}
            name="featured"
            type="checkbox"
          />
          Featured
        </label>
      </div>

      {message ? (
        <div
          className={
            message.type === "success"
              ? "rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-200"
              : "rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-200"
          }
        >
          <div className="flex items-start gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4" />
            ) : (
              <AlertCircle className="mt-0.5 size-4" />
            )}
            <p>{message.text}</p>
          </div>
        </div>
      ) : null}

      <Button disabled={isPending} type="submit">
        {isEdit ? <Pencil className="size-4" /> : <Plus className="size-4" />}
        {isPending
          ? "Saving..."
          : isEdit
            ? "Save project changes"
            : "Create project"}
      </Button>
    </form>
  );
}
