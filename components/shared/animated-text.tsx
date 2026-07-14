"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

export function AnimatedText({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag
      className={cn("max-w-full overflow-visible pb-[0.14em]", className)}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block overflow-visible pb-[0.14em] pr-[0.22em]"
          initial={{
            opacity: 0,
            y: 24,
            clipPath: "polygon(0 112%, 100% 112%, 100% 112%, 0 112%)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 -12%, 100% -12%, 100% 124%, 0 124%)",
          }}
          transition={{
            duration: 0.7,
            delay: delay + index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`${word}-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
