import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import type { AdminUser } from "@prisma/client";
import { getPrisma } from "@/lib/backend/prisma";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export type SafeAdminUser = Pick<
  AdminUser,
  "id" | "name" | "email" | "requestedRole" | "role" | "status"
>;

function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(userId: string, remember: boolean) {
  const prisma = getPrisma();
  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * ONE_DAY_MS);

  await prisma.adminSession.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return { expiresAt };
}

export async function deleteCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    const prisma = getPrisma();
    await prisma.adminSession.deleteMany({
      where: {
        tokenHash: hashSessionToken(token),
      },
    });
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getCurrentAdminUser(): Promise<SafeAdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const prisma = getPrisma();
  const session = await prisma.adminSession.findUnique({
    where: {
      tokenHash: hashSessionToken(token),
    },
    include: {
      user: true,
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    await deleteCurrentAdminSession();
    return null;
  }

  if (session.user.status !== "ACTIVE" || !session.user.role) {
    await deleteCurrentAdminSession();
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    requestedRole: session.user.requestedRole,
    role: session.user.role,
    status: session.user.status,
  };
}
