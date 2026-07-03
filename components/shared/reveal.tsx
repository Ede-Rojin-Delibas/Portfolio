"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
};

export function Reveal({
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  ...props
}: RevealProps) {
  const x =
    direction === "left" ? distance : direction === "right" ? -distance : 0;
  const y =
    direction === "up" ? distance : direction === "down" ? -distance : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale: 0.985, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    />
  );
}
