"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogPostDeleteButton({
  postId,
  title,
}: {
  postId: string;
  title: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${title}"?`);

    if (!confirmed) {
      return;
    }

    setIsPending(true);

    await fetch(`/api/admin/blog/${postId}`, {
      method: "DELETE",
    });

    setIsPending(false);
    router.refresh();
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleDelete}
      size="sm"
      type="button"
      variant="destructive"
    >
      <Trash2 className="size-4" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
