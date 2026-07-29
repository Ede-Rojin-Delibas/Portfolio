import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminApiPermission } from "@/lib/backend/permissions";

export async function GET() {
  try {
    const auth = await requireAdminApiPermission("users.manage");

    if (auth.response) {
      return auth.response;
    }

    const prisma = getPrisma();
    const users = await prisma.adminUser.findMany({
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        accessReason: true,
        approvedAt: true,
        createdAt: true,
        email: true,
        id: true,
        lastLoginAt: true,
        name: true,
        requestedRole: true,
        role: true,
        status: true,
      },
    });

    return Response.json({ users });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
