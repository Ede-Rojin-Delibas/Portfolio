import * as React from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

type ContainerProps = React.ComponentProps<"div"> & {
  size?: keyof typeof containerSizes;
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}
