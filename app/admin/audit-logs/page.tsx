import type { Metadata } from "next";
import { ScrollText, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminPagePermission } from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Audit Logs",
  description: "Review admin actions written to PostgreSQL audit logs.",
};

function formatMetadata(value: unknown) {
  if (!value) {
    return "No metadata";
  }

  return JSON.stringify(value, null, 2);
}

export default async function AdminAuditLogsPage() {
  await requireAdminPagePermission("audit.read");
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

  return (
    <AdminShell
      activePath="/admin/audit-logs"
      requiredPermission="audit.read"
      title="Audit trail for admin actions."
      description="Project, blog, translation, registration and message status changes are recorded here for traceability."
    >
      <section className="glass-panel rounded-lg p-5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconTile icon={ScrollText} iconClassName="size-5" tone="amber" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Recent activity
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {logs.length} log entries
              </h2>
            </div>
          </div>
          <TechBadge>
            <ShieldCheck className="size-3.5" />
            Read only
          </TechBadge>
        </div>

        {logs.length > 0 ? (
          <div className="grid gap-3">
            {logs.map((log) => (
              <article
                className="rounded-md border border-border/70 bg-background/55 p-4"
                key={log.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {log.action}
                      </h3>
                      <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                        {log.entity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {log.actor?.name ?? "System"} -{" "}
                      {log.actor?.email ?? "no actor"}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {log.createdAt.toLocaleString("en-US")}
                  </div>
                </div>
                <pre className="mt-4 max-h-44 overflow-auto rounded-md border border-border/70 bg-background/70 p-3 text-xs leading-5 text-muted-foreground">
                  {formatMetadata(log.metadata)}
                </pre>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
            No audit entries yet. Create, edit or review content to generate
            activity logs.
          </div>
        )}
      </section>
    </AdminShell>
  );
}
