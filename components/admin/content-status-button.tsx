"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { PublishStatus } from "@prisma/client";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContentStatusButtonProps = {
  endpoint: string;
  label: string;
  status: PublishStatus;
  variant?: "default" | "outline";
};

export function ContentStatusButton({
  endpoint,
  label,
  status,
  variant = "outline",
}: ContentStatusButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function updateStatus() {
    setIsPending(true);

    const response = await fetch(endpoint, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    setIsPending(false);

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <Button
      disabled={isPending}
      onClick={updateStatus}
      size="sm"
      type="button"
      variant={variant}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <CheckCircle2 className="size-4" />
      )}
      {isPending ? "Updating..." : label}
    </Button>
  );
}
