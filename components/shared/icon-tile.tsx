import type * as React from "react";
import { cn } from "@/lib/utils";

export type IconTileTone =
  | "blue"
  | "cyan"
  | "emerald"
  | "violet"
  | "pink"
  | "amber"
  | "slate";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type IconTileProps = {
  icon: IconComponent;
  tone?: IconTileTone;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  iconClassName?: string;
  filled?: boolean;
};

export function IconTile({
  icon: Icon,
  tone = "blue",
  size = "md",
  className,
  iconClassName,
  filled = true,
}: IconTileProps) {
  return (
    <span
      className={cn("icon-tile", `icon-tile--${tone}`, `icon-tile--${size}`, className)}
    >
      <Icon
        aria-hidden="true"
        className={cn("icon-tile__icon", iconClassName)}
        fill={filled ? "currentColor" : "none"}
      />
    </span>
  );
}
