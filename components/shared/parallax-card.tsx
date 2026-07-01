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
  const ref = React.useRef<HTMLDivElement>(null); //bu component in DOM daki gerçek div ini takip etmek için referans oluşturur.
  const { scrollYProgress } = useScroll({
    // bu component in scroll içindeki ilerlemesini ölçer.

    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]); //scroll değerini hareket değerine çevirir.

  return (
    <motion.div
      ref={ref}
      style={{ ...style, y }}
      className={cn(className)}
      {...props}
    />
  );
}
