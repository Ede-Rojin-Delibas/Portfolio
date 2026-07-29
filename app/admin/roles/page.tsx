import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { adminRoles } from "@/data/admin-access";

export const metadata: Metadata = {
  title: "Admin Roles",
  description: "Review portfolio CMS roles and permissions.",
};

const approvalRules = [
  "New registrations enter the system as Pending.",
  "Only Super Admin can approve accounts and assign roles.",
  "Only users with roles.manage can change assigned roles.",
  "Only Super Admin can publish project and blog records.",
];

export default function AdminRolesPage() {
  return (
    <AdminShell
      activePath="/admin/roles"
      requiredPermission="roles.manage"
      title="Roles and permissions."
      description="This page explains who can enter the panel, who can change roles and who can publish reviewed content."
    >
      <div className="grid gap-5">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <IconTile icon={ShieldCheck} iconClassName="size-5" tone="amber" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Permission model
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                Four admin roles
              </h2>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {adminRoles.map((role) => (
              <article
                className="rounded-md border border-border/70 bg-background/55 p-4"
                key={role.role}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight">{role.label}</h3>
                  <TechBadge>{role.permissions.length} permissions</TechBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {role.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <TechBadge key={permission}>{permission}</TechBadge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Approval rules
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {approvalRules.map((rule) => (
              <div
                className="flex items-start gap-3 rounded-md border border-border/70 bg-background/55 p-4 text-sm leading-6 text-muted-foreground"
                key={rule}
              >
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
