import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

export async function GET() {
  try {
    const auth = await requireAdminApiPermission("messages.read");

    if (auth.response) {
      return auth.response;
    }

    const prisma = getPrisma();
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({ messages });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
