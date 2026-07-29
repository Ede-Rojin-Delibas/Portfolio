import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import {
  getProjectPublishedAt,
  projectPayloadSchema,
} from "@/lib/backend/project-input";
import {
  hasAdminPermission,
  requireAdminApiPermission,
} from "@/lib/backend/permissions";

function revalidateProjectPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");

  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }
}

export async function GET() {
  try {
    const auth = await requireAdminApiPermission("projects.read");

    if (auth.response) {
      return auth.response;
    }

    const prisma = getPrisma();
    const projects = await prisma.project.findMany({
      include: {
        highlights: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        screenshots: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        technologies: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return Response.json({ projects });
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
    const auth = await requireAdminApiPermission("projects.create");

    if (auth.response) {
      return auth.response;
    }

    const body = await request.json();
    const values = projectPayloadSchema.parse(body);
    const canPublish = hasAdminPermission(auth.user, "projects.publish");
    const status = canPublish ? values.status : "DRAFT";
    const prisma = getPrisma();
    const screenshots =
      values.screenshots.length > 0
        ? values.screenshots
        : [
            {
              description:
                "Project overview generated from the admin CMS record.",
              imageAlt: values.imageAlt,
              imageSrc: values.imageSrc,
              title: "Project overview",
            },
          ];

    const project = await prisma.project.create({
      data: {
        accent: values.accent,
        approach: values.approach,
        authorId: auth.user.id,
        category: values.category,
        demo: values.demo,
        demoLabel: values.demoLabel,
        description: values.description,
        featured: values.featured,
        github: values.github,
        imageAlt: values.imageAlt,
        imageSrc: values.imageSrc,
        outcome: values.outcome,
        problem: values.problem,
        publishedAt: getProjectPublishedAt(status),
        role: values.role,
        slug: values.slug,
        status,
        title: values.title,
        year: values.year,
        highlights: {
          create: values.highlights.map((text, index) => ({
            text,
            sortOrder: index,
          })),
        },
        screenshots: {
          create: screenshots.map((screenshot, index) => ({
            description: screenshot.description,
            imageAlt: screenshot.imageAlt,
            imageSrc: screenshot.imageSrc,
            sortOrder: index,
            title: screenshot.title,
          })),
        },
        technologies: {
          create: values.tech.map((label, index) => ({
            label,
            sortOrder: index,
          })),
        },
      },
      include: {
        highlights: true,
        screenshots: true,
        technologies: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "project.create",
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

    return Response.json(
      {
        message: "Project created.",
        project,
      },
      { status: 201 },
    );
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
