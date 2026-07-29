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

type ApiIssue = {
  message: string;
  path?: Array<number | string>;
};

type ApiResponse = {
  issues?: ApiIssue[];
  message?: string;
};

type BlogPostFormValue = {
  category?: string;
  content?: string[];
  excerpt?: string;
  heroLabel?: string;
  heroMetric?: string;
  id: string;
  imageAlt?: string | null;
  imageSrc?: string | null;
  readTime?: string;
  slug?: string;
  status?: string;
  title?: string;
  tone?: string;
  topics?: string[];
};

type BlogPostFormProps = {
  canPublish?: boolean;
  mode?: "create" | "edit";
  post?: BlogPostFormValue;
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

function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  const normalizedValue = value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const slug = normalizedValue
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "blog-post";
}

function normalizePublicPath(value: string) {
  if (!value) {
    return "";
  }

  if (value.startsWith("/") || /^https?:\/\//i.test(value)) {
    return value;
  }

  return `/${value.replace(/^\/+/, "")}`;
}

function normalizeReadTime(value: string) {
  return /^\d+$/.test(value) ? `${value} min read` : value;
}

function formatApiError(data: ApiResponse | null) {
  if (data?.issues?.length) {
    return data.issues
      .map((issue) => {
        const field = issue.path?.join(".");

        return field ? `${field}: ${issue.message}` : issue.message;
      })
      .join(" ");
  }

  return data?.message ?? "Blog post could not be saved.";
}

function normalizeSlugInput(value: string) {
  return value
    ? slugify(value)
    : "";
}

export function BlogPostForm({
  canPublish = false,
  mode = "create",
  post,
}: BlogPostFormProps) {
  const router = useRouter();
  const [message, setMessage] = React.useState<Message | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const isEdit = mode === "edit" && Boolean(post);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = getString(formData, "title");
    const slug = normalizeSlugInput(getString(formData, "slug")) || slugify(title);
    const payload = {
      category: getString(formData, "category"),
      content: splitParagraphs(getString(formData, "content")),
      excerpt: getString(formData, "excerpt"),
      heroLabel: getString(formData, "heroLabel"),
      heroMetric: getString(formData, "heroMetric"),
      imageAlt: getString(formData, "imageAlt"),
      imageSrc: normalizePublicPath(getString(formData, "imageSrc")),
      readTime: normalizeReadTime(getString(formData, "readTime")),
      slug,
      status: canPublish ? getString(formData, "status") : "DRAFT",
      title,
      tone: getString(formData, "tone"),
      topics: splitList(getString(formData, "topics")),
    };

    const response = await fetch(
      isEdit ? `/api/admin/blog/${post?.id}` : "/api/admin/blog",
      {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: isEdit ? "PATCH" : "POST",
      },
    );

    const data = (await response.json().catch(() => null)) as ApiResponse | null;

    setIsPending(false);

    if (!response.ok) {
      setMessage({
        type: "error",
        text: formatApiError(data),
      });
      return;
    }

    if (!isEdit) {
      form.reset();
    }

    setMessage({
      type: "success",
      text: data?.message ?? (isEdit ? "Blog post updated." : "Blog post created."),
    });
    router.refresh();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <Input
            defaultValue={post?.title ?? ""}
            name="title"
            placeholder="Building Practical Intelligent Systems"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Slug
          <Input
            defaultValue={post?.slug ?? ""}
            name="slug"
            placeholder="building-practical-intelligent-systems"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Category
          <Input
            defaultValue={post?.category ?? ""}
            name="category"
            placeholder="AI Systems"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Read time
          <Input
            defaultValue={post?.readTime ?? ""}
            name="readTime"
            placeholder="5 min read"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Tone
          <select
            className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={post?.tone ?? "blue"}
            name="tone"
          >
            <option value="blue">Blue</option>
            <option value="cyan">Cyan</option>
            <option value="emerald">Emerald</option>
            <option value="violet">Violet</option>
            <option value="pink">Pink</option>
            <option value="amber">Amber</option>
            <option value="slate">Slate</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Excerpt
        <textarea
          className="min-h-24 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          defaultValue={post?.excerpt ?? ""}
          name="excerpt"
          placeholder="Short summary for cards and SEO description"
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Hero label
          <Input
            defaultValue={post?.heroLabel ?? ""}
            name="heroLabel"
            placeholder="Focus"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Hero metric
          <Input
            defaultValue={post?.heroMetric ?? ""}
            name="heroMetric"
            placeholder="Software + Data + AI"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium">
        Topics
        <Input
          defaultValue={post?.topics?.join(", ") ?? ""}
          name="topics"
          placeholder="Software, AI, Data, Systems"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Content
        <textarea
          className="min-h-56 rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm leading-7 outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          defaultValue={post?.content?.join("\n\n") ?? ""}
          name="content"
          placeholder="Write one paragraph, leave a blank line, then write the next paragraph."
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Cover image URL
          <Input
            defaultValue={post?.imageSrc ?? ""}
            name="imageSrc"
            placeholder="/images/generated-images/..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Cover image alt
          <Input
            defaultValue={post?.imageAlt ?? ""}
            name="imageAlt"
            placeholder="Technical blog cover image"
          />
        </label>
      </div>

      {canPublish ? (
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            className="h-10 rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            defaultValue={post?.status ?? "DRAFT"}
            name="status"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
      ) : (
        <div className="rounded-md border border-amber-500/25 bg-amber-500/10 p-3 text-sm leading-6 text-amber-800 dark:text-amber-100">
          This post will be saved as Draft. A Super Admin can review it and
          change the status to Published.
        </div>
      )}

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
            ? "Save blog changes"
            : "Create blog post"}
      </Button>
    </form>
  );
}
