"use client";

import * as React from "react";
import type { ContactStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageStatusButton({
  messageId,
  status,
}: {
  messageId: string;
  status: ContactStatus;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function updateStatus() {
    setIsPending(true);

    await fetch(`/api/admin/messages/${messageId}`, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    setIsPending(false);
    router.refresh();
  }

  return (
    <Button
      disabled={isPending}
      onClick={updateStatus}
      size="sm"
      type="button"
      variant="outline"
    >
      <CheckCircle2 className="size-4" />
      {isPending ? "Updating..." : `Mark ${status.toLowerCase()}`}
    </Button>
  );
}
