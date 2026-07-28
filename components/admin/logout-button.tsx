"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function handleLogout() {
    setIsPending(true);

    await fetch("/api/admin/auth/logout", {
      method: "POST",
    });

    router.push("/admin");
    router.refresh();
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleLogout}
      size="sm"
      type="button"
      variant="outline"
    >
      <LogOut className="size-4" />
      {isPending ? "Signing out..." : "Log out"}
    </Button>
  );
}
