import * as React from "react";
import { Badge } from "@/components/ui/badge"; //shadcn/ui dan gelen badge componentleri kullanılıyor.
import { cn } from "@/lib/utils";

type TechBadgeProps = React.ComponentProps<typeof Badge>;

export function TechBadge({ className, ...props }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 rounded-md border-primary/25 bg-primary/5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/85",
        "dark:border-primary/30 dark:bg-primary/10 dark:text-foreground/80",
        className,
      )}
      {...props}
    />
  );
}
