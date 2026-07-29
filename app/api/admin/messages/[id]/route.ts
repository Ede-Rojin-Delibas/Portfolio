import { z } from "zod";
import { contactStatusPayloadSchema } from "@/lib/backend/contact-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

type MessageRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: MessageRouteProps) {
  try {
    const auth = await requireAdminApiPermission("messages.update");

    if (auth.response) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json();
    const values = contactStatusPayloadSchema.parse(body);
    const prisma = getPrisma();

    const message = await prisma.contactMessage.update({
      where: { id },
      data: {
        status: values.status,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "message.update",
        actorId: auth.user.id,
        entity: "ContactMessage",
        entityId: message.id,
        metadata: {
          status: message.status,
          subject: message.subject,
        },
      },
    });

    return Response.json({
      message: "Contact message updated.",
      contactMessage: message,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid contact message status.", issues: error.issues },
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
