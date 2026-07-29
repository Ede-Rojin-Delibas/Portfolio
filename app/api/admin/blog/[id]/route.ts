import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  blogUpdatePayloadSchema,
  getBlogPublishedAt,
} from "@/lib/backend/blog-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import {
  hasAdminPermission,
  requireAdminApiPermission,
} from "@/lib/backend/permissions";

type BlogRouteProps = {
  params: Promise<{ id: string }>;
};

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

export async function PATCH(request: Request, { params }: BlogRouteProps) {
  try {
    const auth = await requireAdminApiPermission("posts.update");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json();
    const values = blogUpdatePayloadSchema.parse(body);
    const prisma = getPrisma();
    const { status: requestedStatus, ...postValues } = values;
    const canPublish = hasAdminPermission(auth.user, "posts.publish");
    const status = canPublish ? requestedStatus : "DRAFT";
    const shouldUpdatePublishedAt = typeof status !== "undefined";

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...postValues,
        publishedAt: shouldUpdatePublishedAt
          ? getBlogPublishedAt(status)
          : undefined,
        status,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "blog.update",
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

    return Response.json({
      message: "Blog post updated.",
      post,
    });
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

export async function DELETE(_request: Request, { params }: BlogRouteProps) {
  try {
    const auth = await requireAdminApiPermission("posts.delete");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const prisma = getPrisma();
    const post = await prisma.blogPost.delete({
      where: { id },
      select: {
        id: true,
        slug: true,
        status: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "blog.delete",
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

    return Response.json({
      message: "Blog post deleted.",
      post,
    });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
