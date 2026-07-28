export function getServerErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("DATABASE_URL")) {
    return {
      status: 503,
      message:
        "Database is not configured yet. Add DATABASE_URL to .env before using admin auth.",
    };
  }

  return {
    status: 500,
    message: "Something went wrong. Please try again.",
  };
}
