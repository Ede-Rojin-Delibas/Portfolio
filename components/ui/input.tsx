import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/70 aria-invalid:focus:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
