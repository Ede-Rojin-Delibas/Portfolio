import { getServerErrorMessage } from "@/lib/backend/auth-errors";
import { deleteCurrentAdminSession } from "@/lib/backend/session";

export async function POST() {
  try {
    await deleteCurrentAdminSession();

    return Response.json({
      message: "Signed out successfully.",
    });
  } catch (error) {
    const serverError = getServerErrorMessage(error);
    return Response.json(
      { message: serverError.message },
      { status: serverError.status },
    );
  }
}
