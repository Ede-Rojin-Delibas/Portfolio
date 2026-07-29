import type { Metadata } from "next";
import { Settings, SlidersHorizontal } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { requireAdminPagePermission } from "@/lib/backend/permissions";
import { getPrisma } from "@/lib/backend/prisma";

export const metadata: Metadata = {
  title: "Admin Settings",
  description: "Review global settings stored in PostgreSQL.",
};

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default async function AdminSettingsPage() {
  await requireAdminPagePermission("settings.update");

  const prisma = getPrisma();
  const settings = await prisma.siteSetting.findMany({
    orderBy: {
      key: "asc",
    },
  });

  return (
    <AdminShell
      activePath="/admin/settings"
      requiredPermission="settings.update"
      title="Site settings."
      description="Global CMS settings live here: profile defaults, SEO values, social links and registration behavior can be stored as database records."
    >
      <div className="grid gap-5">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile icon={Settings} iconClassName="size-5" tone="blue" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Database settings
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {settings.length} setting records
                </h2>
              </div>
            </div>
            <TechBadge>
              <SlidersHorizontal className="size-3.5" />
              JSON values
            </TechBadge>
          </div>

          {settings.length > 0 ? (
            <div className="grid gap-3">
              {settings.map((setting) => (
                <article
                  className="rounded-md border border-border/70 bg-background/55 p-4"
                  key={setting.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold tracking-tight">
                      {setting.key}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      Updated {setting.updatedAt.toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <pre className="mt-3 overflow-auto rounded-md border border-border/70 bg-background/70 p-3 text-xs leading-6 text-muted-foreground">
                    {formatJson(setting.value)}
                  </pre>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
              No settings have been created yet. The table is ready for future
              global controls such as default language, SEO defaults and social
              profile URLs.
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
