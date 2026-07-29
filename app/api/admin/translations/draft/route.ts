import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { translationDraftPayloadSchema } from "@/lib/backend/translation-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

function revalidateContentPaths() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");
}

function getBlogTranslationContent(content: Prisma.JsonValue): Prisma.InputJsonValue {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.filter((item): item is string => typeof item === "string");
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdminApiPermission("translations.manage");

    if (auth.response) {
      return auth.response;
    }

    const body = await request.json();
    const values = translationDraftPayloadSchema.parse(body);
    const prisma = getPrisma();

    if (values.entity === "project") {
      const project = await prisma.project.findUnique({
        where: { id: values.id },
      });

      if (!project) {
        return Response.json({ message: "Project not found." }, { status: 404 });
      }

      const translation = await prisma.projectTranslation.upsert({
        where: {
          projectId_locale: {
            locale: values.locale,
            projectId: project.id,
          },
        },
        create: {
          approach: project.approach,
          description: project.description,
          locale: values.locale,
          outcome: project.outcome,
          problem: project.problem,
          projectId: project.id,
          status: "MACHINE_DRAFT",
          title: project.title,
        },
        update: {
          approach: project.approach,
          description: project.description,
          outcome: project.outcome,
          problem: project.problem,
          status: "MACHINE_DRAFT",
          title: project.title,
        },
      });

      await prisma.auditLog.create({
        data: {
          action: "translation.draft",
          actorId: auth.user.id,
          entity: "ProjectTranslation",
          entityId: translation.id,
          metadata: {
            locale: values.locale,
            projectSlug: project.slug,
          },
        },
      });

      revalidateContentPaths();
      revalidatePath(`/projects/${project.slug}`);

      return Response.json({
        message: "Project translation draft created.",
        translation,
      });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: values.id },
    });

    if (!post) {
      return Response.json({ message: "Blog post not found." }, { status: 404 });
    }

    const translation = await prisma.blogTranslation.upsert({
      where: {
        blogPostId_locale: {
          blogPostId: post.id,
          locale: values.locale,
        },
      },
      create: {
        blogPostId: post.id,
        content: getBlogTranslationContent(post.content),
        excerpt: post.excerpt,
        locale: values.locale,
        status: "MACHINE_DRAFT",
        title: post.title,
      },
      update: {
        content: getBlogTranslationContent(post.content),
        excerpt: post.excerpt,
        status: "MACHINE_DRAFT",
        title: post.title,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "translation.draft",
        actorId: auth.user.id,
        entity: "BlogTranslation",
        entityId: translation.id,
        metadata: {
          blogSlug: post.slug,
          locale: values.locale,
        },
      },
    });

    revalidateContentPaths();
    revalidatePath(`/blog/${post.slug}`);

    return Response.json({
      message: "Blog translation draft created.",
      translation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid translation draft payload.", issues: error.issues },
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
