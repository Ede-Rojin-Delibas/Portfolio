import type { Metadata } from "next";
import type { AccountStatus, AdminRole } from "@prisma/client";
import { Clock3, ShieldCheck, UserRoundCheck } from "lucide-react";
import { adminRoles, adminSecuritySteps } from "@/data/admin-access";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  UserApprovalControls,
  UserRoleControls,
} from "@/components/admin/user-action-controls";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import {
  formatAdminRole,
  requireAdminPagePermission,
} from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Users",
  description:
    "User approval, role assignment and permission planning for the portfolio CMS.",
};

const statusTone: Record<AccountStatus, string> = {
  ACTIVE:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  PENDING:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  REJECTED:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-200",
  SUSPENDED:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-200",
};

function formatDate(value?: Date | null) {
  if (!value) {
    return "Not yet";
  }

  return value.toLocaleDateString("en-US");
}

export default async function AdminUsersPage() {
  const activeAdmin = await requireAdminPagePermission("users.manage");
  const prisma = getPrisma();
  const users = await prisma.adminUser.findMany({
    orderBy: [
      {
        status: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    select: {
      accessReason: true,
      approvedAt: true,
      createdAt: true,
      email: true,
      id: true,
      lastLoginAt: true,
      name: true,
      requestedRole: true,
      role: true,
      status: true,
    },
  });
  const pendingUsers = users.filter((user) => user.status === "PENDING");
  const approvedUsers = users.filter((user) => user.status !== "PENDING");

  return (
    <AdminShell
      activePath="/admin/users"
      requiredPermission="users.manage"
      title="Users, roles and approval queue."
      description="New registration requests wait here as pending database records until a Super Admin approves or rejects them."
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

            {pendingUsers.length > 0 ? (
              <div className="grid gap-3">
                {pendingUsers.map((user) => {
                  const requestedRole = user.requestedRole as AdminRole;

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
                            className={`rounded-md border px-2 py-1 text-xs ${statusTone[user.status]}`}
                          >
                            {user.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {user.accessReason ?? "No access reason provided."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <TechBadge>
                            Requested {formatAdminRole(requestedRole)}
                          </TechBadge>
                          <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                            Requested {formatDate(user.createdAt)}
                          </span>
                        </div>
                      </div>

                      <UserApprovalControls
                        requestedRole={requestedRole}
                        userId={user.id}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
                No pending users. New `/admin/register` requests will appear
                here automatically.
              </div>
            )}
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
            Current database accounts
          </p>
          <div className="mt-5 grid gap-3">
            {approvedUsers.map((user) => (
              <article
                className="rounded-md border border-border/70 bg-background/55 p-4"
                key={user.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {user.name}
                      </h3>
                      <span
                        className={`rounded-md border px-2 py-1 text-xs ${statusTone[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <TechBadge>{formatAdminRole(user.role)}</TechBadge>
                      <TechBadge>
                        Approved {formatDate(user.approvedAt)}
                      </TechBadge>
                      <TechBadge>
                        Last login {formatDate(user.lastLoginAt)}
                      </TechBadge>
                    </div>
                  </div>

                  <UserRoleControls
                    currentRole={user.role}
                    currentStatus={user.status}
                    isCurrentUser={user.id === activeAdmin.id}
                    userId={user.id}
                  />
                </div>
              </article>
            ))}

            {approvedUsers.length === 0 ? (
              <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
                No approved, rejected or suspended database users yet.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
