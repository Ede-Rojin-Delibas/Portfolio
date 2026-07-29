import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { blogPayloadSchema, getBlogPublishedAt } from "@/lib/backend/blog-input";
import { getPrisma } from "@/lib/backend/prisma";
import {
  hasAdminPermission,
  requireAdminApiPermission,
} from "@/lib/backend/permissions";

function revalidateBlogPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

function formatZodError(error: z.ZodError) {
  const details = error.issues
    .map((issue) => {
      const field = issue.path.join(".");

      return field ? `${field}: ${issue.message}` : issue.message;
    })
    .join(" ");

  return details ? `Invalid blog post data. ${details}` : "Invalid blog post data.";
}

export async function GET() {
  try {
    const auth = await requireAdminApiPermission("posts.read");

    if (auth.response) {
      return auth.response;
    }

    const prisma = getPrisma();
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return Response.json({ posts });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdminApiPermission("posts.create");

    if (auth.response) {
      return auth.response;
    }

    const body = await request.json();
    const values = blogPayloadSchema.parse(body);
    const canPublish = hasAdminPermission(auth.user, "posts.publish");
    const status = canPublish ? values.status : "DRAFT";
    const prisma = getPrisma();

    const post = await prisma.blogPost.create({
      data: {
        authorId: auth.user.id,
        category: values.category,
        content: values.content,
        excerpt: values.excerpt,
        heroLabel: values.heroLabel,
        heroMetric: values.heroMetric,
        imageAlt: values.imageAlt,
        imageSrc: values.imageSrc,
        publishedAt: getBlogPublishedAt(status),
        readTime: values.readTime,
        slug: values.slug,
        status,
        title: values.title,
        tone: values.tone,
        topics: values.topics,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "blog.create",
        actorId: auth.user.id,
        entity: "BlogPost",
        entityId: post.id,
        metadata: {
          slug: post.slug,
          status: post.status,
        },
      },
    });

    revalidateBlogPages(post.slug);

    return Response.json(
      {
        message: "Blog post created.",
        post,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: formatZodError(error), issues: error.issues },
        { status: 400 },
      );
    }

    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
