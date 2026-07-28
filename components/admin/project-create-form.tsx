"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  text: string;
  type: "error" | "success";
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectCreateForm() {
  const router = useRouter();
  const [message, setMessage] = React.useState<Message | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = getString(formData, "title");
    const payload = {
      accent: getString(formData, "accent"),
      approach: getString(formData, "approach"),
      category: getString(formData, "category"),
      demo: getString(formData, "demo"),
      demoLabel: getString(formData, "demoLabel"),
      description: getString(formData, "description"),
      featured: formData.get("featured") === "on",
      github: getString(formData, "github"),
      imageAlt: getString(formData, "imageAlt"),
      imageSrc: getString(formData, "imageSrc"),
      outcome: getString(formData, "outcome"),
      problem: getString(formData, "problem"),
      role: getString(formData, "role"),
      slug: getString(formData, "slug") || slugify(title),
      status: getString(formData, "status"),
      tech: getString(formData, "tech")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      title,
      year: getString(formData, "year"),
    };

    const response = await fetch("/api/admin/projects", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsPending(false);

    if (!response.ok) {
      setMessage({
        type: "error",
        text: data?.message ?? "Project could not be created.",
      });
      return;
    }

    form.reset();
    setMessage({
      type: "success",
      text: data?.message ?? "Project created.",
    });
    router.refresh();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <Input name="title" placeholder="Synthetic Data Generator" required />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Slug
          <Input name="slug" placeholder="synthetic-data-generator" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Category
          <Input name="category" placeholder="AI & Data" required />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Role
          <Input name="role" placeholder="Machine Learning Developer" required />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Year
          <Input name="year" placeholder="2026" required />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Short description
        <textarea
          className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          name="description"
          placeholder="A practical case study..."
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Problem
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            name="problem"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Approach
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            name="approach"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Outcome
          <textarea
            className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            name="outcome"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Tech stack
        <Input
          name="tech"
          placeholder="Python, Flask, Machine Learning"
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          GitHub URL
          <Input name="github" placeholder="https://github.com/..." />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Demo URL
          <Input name="demo" placeholder="https://..." />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Image URL
          <Input name="imageSrc" placeholder="/images/generated-images/..." />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Image alt
          <Input name="imageAlt" placeholder="Project preview image" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue="DRAFT"
            name="status"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Accent
          <select
            className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue="blue"
            name="accent"
          >
            <option value="blue">Blue</option>
            <option value="cyan">Cyan</option>
            <option value="indigo">Indigo</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end rounded-md border border-border/70 bg-background/55 px-3 py-2 text-sm font-medium">
          <input className="size-4 accent-primary" name="featured" type="checkbox" />
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
        <Plus className="size-4" />
        {isPending ? "Creating..." : "Create project"}
      </Button>
    </form>
  );
}
