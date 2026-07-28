import { z } from "zod";
import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getPrisma } from "@/lib/backend/prisma";
import { verifyPassword } from "@/lib/backend/password";
import { createAdminSession } from "@/lib/backend/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = loginSchema.parse(body);
    const prisma = getPrisma();
    const email = values.email.toLowerCase().trim();

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const passwordMatches = await verifyPassword(
      values.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    if (user.status !== "ACTIVE" || !user.role) {
      return Response.json(
        {
          message:
            "This account is not active yet. A Super Admin must approve it before login.",
          status: user.status,
        },
        { status: 403 },
      );
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const session = await createAdminSession(user.id, values.remember);

    return Response.json({
      message: "Signed in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        requestedRole: user.requestedRole,
        role: user.role,
        status: user.status,
      },
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid login data.", issues: error.issues },
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
