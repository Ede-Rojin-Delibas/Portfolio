import { revalidatePath } from "next/cache";
import { z } from "zod";
import { translationReviewPayloadSchema } from "@/lib/backend/translation-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

type TranslationReviewRouteProps = {
  params: Promise<{ id: string }>;
};

function revalidateContentPaths(slug: string, type: "blog" | "project") {
  revalidatePath("/");
  revalidatePath(type === "project" ? "/projects" : "/blog");
  revalidatePath(type === "project" ? `/projects/${slug}` : `/blog/${slug}`);
}

export async function PATCH(
  request: Request,
  { params }: TranslationReviewRouteProps,
) {
  try {
    const auth = await requireAdminApiPermission("translations.manage");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const values = translationReviewPayloadSchema.parse(body);
    const prisma = getPrisma();

    const projectTranslation = await prisma.projectTranslation.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (projectTranslation) {
      const translation = await prisma.projectTranslation.update({
        where: { id },
        data: {
          status: values.status,
        },
      });

      await prisma.auditLog.create({
        data: {
          action: "translation.review",
          actorId: auth.user.id,
          entity: "ProjectTranslation",
          entityId: translation.id,
          metadata: {
            locale: translation.locale,
            status: translation.status,
          },
        },
      });

      revalidateContentPaths(projectTranslation.project.slug, "project");

      return Response.json({
        message: "Project translation status updated.",
        translation,
      });
    }

    const blogTranslation = await prisma.blogTranslation.findUnique({
      where: { id },
      include: {
        blogPost: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!blogTranslation) {
      return Response.json(
        { message: "Translation not found." },
        { status: 404 },
      );
    }

    const translation = await prisma.blogTranslation.update({
      where: { id },
      data: {
        status: values.status,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "translation.review",
        actorId: auth.user.id,
        entity: "BlogTranslation",
        entityId: translation.id,
        metadata: {
          locale: translation.locale,
          status: translation.status,
        },
      },
    });

    revalidateContentPaths(blogTranslation.blogPost.slug, "blog");

    return Response.json({
      message: "Blog translation status updated.",
      translation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid translation review payload.", issues: error.issues },
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
