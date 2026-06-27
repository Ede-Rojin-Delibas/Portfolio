"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxCardProps = HTMLMotionProps<"div"> & {
  offset?: number;
};

export function ParallaxCard({
  className,
  offset = 36,
  style,
  ...props
}: ParallaxCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ ...style, y }}
      className={cn(className)}
      {...props}
    />
  );
}
