"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TranslationDraftButton({
  entity,
  itemId,
}: {
  entity: "blog" | "project";
  itemId: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function createDraft() {
    setIsPending(true);

    await fetch("/api/admin/translations/draft", {
      body: JSON.stringify({
        entity,
        id: itemId,
        locale: "tr",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setIsPending(false);
    router.refresh();
  }

  return (
    <Button
      disabled={isPending}
      onClick={createDraft}
      size="sm"
      type="button"
      variant="outline"
    >
      <Languages className="size-4" />
      {isPending ? "Creating..." : "Create TR draft"}
    </Button>
  );
}

export function TranslationReviewButton({
  translationId,
}: {
  translationId: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function markReviewed() {
    setIsPending(true);

    await fetch(`/api/admin/translations/${translationId}/review`, {
      body: JSON.stringify({ status: "REVIEWED" }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    setIsPending(false);
    router.refresh();
  }

  return (
    <Button disabled={isPending} onClick={markReviewed} size="sm" type="button">
      <CheckCircle2 className="size-4" />
      {isPending ? "Reviewing..." : "Mark reviewed"}
    </Button>
  );
}
