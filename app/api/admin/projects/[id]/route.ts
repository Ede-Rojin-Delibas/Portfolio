import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import {
  getProjectPublishedAt,
  projectUpdatePayloadSchema,
} from "@/lib/backend/project-input";
import {
  hasAdminPermission,
  requireAdminApiPermission,
} from "@/lib/backend/permissions";

type ProjectRouteProps = {
  params: Promise<{ id: string }>;
};

function revalidateProjectPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");

  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }
}

export async function PATCH(request: Request, { params }: ProjectRouteProps) {
  try {
    const auth = await requireAdminApiPermission("projects.update");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json();
    const values = projectUpdatePayloadSchema.parse(body); //Controls format of the data , either if is broke, missing or dangerous
    const prisma = getPrisma();
    const {
      highlights,
      screenshots,
      status: requestedStatus,
      tech,
      ...projectValues
    } = values;
    const canPublish = hasAdminPermission(auth.user, "projects.publish");
    const status = canPublish ? requestedStatus : "DRAFT";
    const shouldUpdatePublishedAt = typeof status !== "undefined";

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectValues,
        publishedAt: shouldUpdatePublishedAt
          ? getProjectPublishedAt(status)
          : undefined,
        status,
        highlights: highlights
          ? {
              deleteMany: {},
              create: highlights.map((text, index) => ({
                text,
                sortOrder: index,
              })),
            }
          : undefined,
        screenshots: screenshots
          ? {
              deleteMany: {},
              create: screenshots.map((screenshot, index) => ({
                description: screenshot.description,
                imageAlt: screenshot.imageAlt,
                imageSrc: screenshot.imageSrc,
                sortOrder: index,
                title: screenshot.title,
              })),
            }
          : undefined,
        technologies: tech
          ? {
              deleteMany: {},
              create: tech.map((label, index) => ({
                label,
                sortOrder: index,
              })),
            }
          : undefined,
      },
      include: {
        highlights: true,
        screenshots: true,
        technologies: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "project.update",
        actorId: auth.user.id,
        entity: "Project",
        entityId: project.id,
        metadata: {
          slug: project.slug,
          status: project.status,
        },
      },
    });

    revalidateProjectPages(project.slug);

    return Response.json({
      message: "Project updated.",
      project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid project data.", issues: error.issues },
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

export async function DELETE(_request: Request, { params }: ProjectRouteProps) {
  try {
    const auth = await requireAdminApiPermission("projects.delete");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const prisma = getPrisma();
    const project = await prisma.project.delete({
      where: { id },
      select: {
        id: true,
        slug: true,
        status: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "project.delete",
        actorId: auth.user.id,
        entity: "Project",
        entityId: project.id,
        metadata: {
          slug: project.slug,
          status: project.status,
        },
      },
    });

    revalidateProjectPages(project.slug);

    return Response.json({
      message: "Project deleted.",
      project,
    });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
