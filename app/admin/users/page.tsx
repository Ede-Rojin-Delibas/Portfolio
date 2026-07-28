import type { Metadata } from "next";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import {
  adminRoles,
  adminSecuritySteps,
  adminUsers,
  getPendingUsers,
  getRoleDefinition,
} from "@/data/admin-access";
import { AdminShell } from "@/components/admin/admin-shell";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Users",
  description:
    "User approval, role assignment and permission planning for the portfolio CMS.",
};

const statusTone = {
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  rejected: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-200",
  suspended: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-200",
};

export default function AdminUsersPage() {
  const pendingUsers = getPendingUsers();

  return (
    <AdminShell
      activePath="/admin/users"
      requiredPermission="users.manage"
      title="Users, roles and approval queue."
      description="This is where the Super Admin will approve new accounts, assign roles and control who can access CMS features."
    >
      <div className="grid gap-5">
        <section className="grid gap-4 md:grid-cols-3">
          {adminSecuritySteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="glass-panel rounded-lg p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <IconTile
                    icon={Icon}
                    iconClassName="size-5"
                    tone={index === 0 ? "amber" : index === 1 ? "cyan" : "emerald"}
                  />
                  <span className="font-mono text-xl font-semibold text-primary/70">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Approval queue
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {pendingUsers.length} pending users
                </h2>
              </div>
              <TechBadge>Super Admin only</TechBadge>
            </div>

            <div className="grid gap-3">
              {pendingUsers.map((user) => {
                const role = getRoleDefinition(user.requestedRole);

                return (
                  <div
                    key={user.id}
                    className="grid gap-4 rounded-md border border-border/70 bg-background/55 p-4 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold tracking-tight">
                          {user.name}
                        </h3>
                        <span
                          className={`rounded-md border px-2 py-1 text-xs capitalize ${statusTone[user.status]}`}
                        >
                          {user.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <TechBadge>{role?.label ?? user.requestedRole}</TechBadge>
                        <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                          Requested {user.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:items-start md:justify-end">
                      <Button disabled size="sm">
                        <CheckCircle2 className="size-4" />
                        Approve
                      </Button>
                      <Button disabled variant="destructive" size="sm">
                        <XCircle className="size-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <IconTile icon={ShieldCheck} iconClassName="size-5" tone="cyan" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Role model
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Permission groups
                </h2>
              </div>
            </div>
            <div className="grid gap-3">
              {adminRoles.map((role) => (
                <div
                  key={role.role}
                  className="rounded-md border border-border/70 bg-background/55 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{role.label}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                    {role.role === "super_admin" ? (
                      <UserRoundCheck className="size-5 text-primary" />
                    ) : (
                      <Clock3 className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {role.permissions.length} permissions
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="glass-panel rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Current accounts
          </p>
          <div className="mt-5 overflow-x-auto rounded-md border border-border/70">
            <div className="min-w-[44rem]">
              <div className="grid grid-cols-[1.1fr_1fr_0.7fr_0.7fr] gap-3 border-b border-border/70 bg-background/65 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>User</span>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
              </div>
              {adminUsers.map((user) => {
                const role = user.assignedRole
                  ? getRoleDefinition(user.assignedRole)
                  : getRoleDefinition(user.requestedRole);

                return (
                  <div
                    key={user.id}
                    className="grid grid-cols-[1.1fr_1fr_0.7fr_0.7fr] gap-3 border-b border-border/50 px-4 py-3 text-sm last:border-b-0"
                  >
                    <span className="font-medium">{user.name}</span>
                    <span className="text-muted-foreground">{user.email}</span>
                    <span>{role?.label}</span>
                    <span className="capitalize text-muted-foreground">
                      {user.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
