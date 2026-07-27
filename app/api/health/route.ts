import { getBackendHealthSnapshot } from "@/lib/backend/contracts";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getBackendHealthSnapshot());
}
