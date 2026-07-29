"use client";

import * as React from "react";
import type { AdminRole, AccountStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CheckCircle2, RotateCcw, Save, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const roleOptions: AdminRole[] = ["ADMIN", "EDITOR", "VIEWER"];

function formatRole(role: AdminRole) {
  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function updateUser({
  role,
  status,
  userId,
}: {
  role?: AdminRole;
  status?: AccountStatus;
  userId: string;
}) {
  return fetch(`/api/admin/users/${userId}`, {
    body: JSON.stringify({ role, status }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
}

export function UserApprovalControls({
  requestedRole,
  userId,
}: {
  requestedRole: AdminRole;
  userId: string;
}) {
  const router = useRouter();
  const [role, setRole] = React.useState<AdminRole>(
    requestedRole === "SUPER_ADMIN" ? "ADMIN" : requestedRole,
  );
  const [isPending, setIsPending] = React.useState(false);

  async function approve() {
    setIsPending(true);
    await updateUser({ role, status: "ACTIVE", userId });
    setIsPending(false);
    router.refresh();
  }

  async function reject() {
    setIsPending(true);
    await updateUser({ status: "REJECTED", userId });
    setIsPending(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2 md:items-start md:justify-end">
      <select
        className="h-9 rounded-md border border-border/70 bg-background/70 px-2 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        disabled={isPending}
        onChange={(event) => setRole(event.target.value as AdminRole)}
        value={role}
      >
        {roleOptions.map((item) => (
          <option key={item} value={item}>
            {formatRole(item)}
          </option>
        ))}
      </select>
      <Button disabled={isPending} onClick={approve} size="sm" type="button">
        <CheckCircle2 className="size-4" />
        {isPending ? "Saving..." : "Approve"}
      </Button>
      <Button
        disabled={isPending}
        onClick={reject}
        size="sm"
        type="button"
        variant="destructive"
      >
        <XCircle className="size-4" />
        Reject
      </Button>
    </div>
  );
}

export function UserRoleControls({
  currentRole,
  currentStatus,
  isCurrentUser,
  userId,
}: {
  currentRole: AdminRole | null;
  currentStatus: AccountStatus;
  isCurrentUser: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [role, setRole] = React.useState<AdminRole>(currentRole ?? "VIEWER");
  const [isPending, setIsPending] = React.useState(false);

  async function saveRole() {
    setIsPending(true);
    await updateUser({ role, status: "ACTIVE", userId });
    setIsPending(false);
    router.refresh();
  }

  async function suspend() {
    setIsPending(true);
    await updateUser({ status: "SUSPENDED", userId });
    setIsPending(false);
    router.refresh();
  }

  async function reactivate() {
    setIsPending(true);
    await updateUser({ role, status: "ACTIVE", userId });
    setIsPending(false);
    router.refresh();
  }

  const isActive = currentStatus === "ACTIVE";

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="h-9 rounded-md border border-border/70 bg-background/70 px-2 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        disabled={isPending}
        onChange={(event) => setRole(event.target.value as AdminRole)}
        value={role}
      >
        {(["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"] as AdminRole[]).map(
          (item) => (
            <option key={item} value={item}>
              {formatRole(item)}
            </option>
          ),
        )}
      </select>
      {isActive ? (
        <Button
          disabled={isPending}
          onClick={saveRole}
          size="sm"
          type="button"
          variant="outline"
        >
          <Save className="size-4" />
          Save role
        </Button>
      ) : null}
      {!isActive && !isCurrentUser ? (
        <Button
          disabled={isPending}
          onClick={reactivate}
          size="sm"
          type="button"
        >
          <RotateCcw className="size-4" />
          Reactivate
        </Button>
      ) : null}
      {isActive && !isCurrentUser ? (
        <Button
          disabled={isPending}
          onClick={suspend}
          size="sm"
          type="button"
          variant="destructive"
        >
          Suspend
        </Button>
      ) : null}
    </div>
  );
}
