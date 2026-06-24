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
  className, //tailwind css
  as: Tag = "h1", //hangi HTML etiketleriyle render edilecek(h1 varsayılan)
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block pr-[0.22em]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + index * 0.045, //stagger animation
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
