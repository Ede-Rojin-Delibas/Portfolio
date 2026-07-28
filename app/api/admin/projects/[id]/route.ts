import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import {
  getProjectPublishedAt,
  projectUpdatePayloadSchema,
} from "@/lib/backend/project-input";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

type ProjectRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: ProjectRouteProps) {
  try {
    const auth = await requireAdminApiPermission("projects.update");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json();
    const values = projectUpdatePayloadSchema.parse(body);
    const prisma = getPrisma();
    const { tech, ...projectValues } = values;
    const shouldUpdatePublishedAt = typeof values.status !== "undefined";

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectValues,
        publishedAt: shouldUpdatePublishedAt
          ? getProjectPublishedAt(values.status)
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
