import { z } from "zod";
import { contactPayloadSchema } from "@/lib/backend/contact-input";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = contactPayloadSchema.parse(body);
    const prisma = getPrisma();

    const message = await prisma.contactMessage.create({
      data: values,
      select: {
        id: true,
        createdAt: true,
      },
    });

    return Response.json(
      {
        message: "Contact message saved.",
        contactMessage: message,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid contact message.", issues: error.issues },
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
