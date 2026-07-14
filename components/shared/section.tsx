import * as React from "react";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  eyebrow?: string;
  chapter?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  containerSize?: React.ComponentProps<typeof Container>["size"];
};

export function Section({
  className,
  children,
  eyebrow,
  chapter,
  title,
  description,
  align = "left",
  containerSize = "default",
  ...props
}: SectionProps) {
  const hasHeader = chapter || eyebrow || title || description;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <Container size={containerSize}>
        {hasHeader ? (
          <div
            className={cn(
              "mb-10 max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {chapter ? (
              <span className="section-chapter">{chapter}</span>
            ) : null}
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
