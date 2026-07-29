import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

export async function GET() {
  try {
    const auth = await requireAdminApiPermission("audit.read");

    if (auth.response) {
      return auth.response;
    }

    const prisma = getPrisma();
    const logs = await prisma.auditLog.findMany({
      include: {
        actor: {
          select: {
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return Response.json({ logs });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
