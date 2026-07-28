import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { getCurrentAdminUser } from "@/lib/backend/session";

export async function GET() {
  try {
    const user = await getCurrentAdminUser();

    return Response.json({
      authenticated: Boolean(user),
      user,
    });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
