"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  getTechBadgeToneClass,
  getTechIconImagePath,
} from "@/components/shared/tech-badge";

type ClassNameProps = {
  className?: string;
};

type AuroraTextProps = React.ComponentProps<"span">;

export function AuroraText({ className, ...props }: AuroraTextProps) {
  return <span className={cn("aurora-text", className)} {...props} />;
}

type HyperTextProps = ClassNameProps & {
  text: string;
  delay?: number;
};

export function HyperText({ text, className, delay = 220 }: HyperTextProps) {
  const [value, setValue] = React.useState(text);

  React.useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setValue(
          text
            .split("")
            .map((letter, index) => {
              if (letter === " " || index < frame / 2) {
                return letter;
              }

              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join(""),
        );

        frame += 1;

        if (frame / 2 >= text.length) {
          clearInterval(interval);
          setValue(text);
        }
      }, 32);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [delay, text]);

  return <span className={cn("font-mono", className)}>{value}</span>;
}

type WordRotateProps = ClassNameProps & {
  words: string[];
};

export function WordRotate({ words, className }: WordRotateProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={cn("inline-grid overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function BorderBeam({ className }: ClassNameProps) {
  return <span aria-hidden="true" className={cn("border-beam", className)} />;
}

type AnimatedCircularProgressProps = ClassNameProps & {
  label: string;
  value: number;
  detail?: string;
};

export function AnimatedCircularProgress({
  label,
  value,
  detail,
  className,
}: AnimatedCircularProgressProps) {
  const progress = Math.max(0, Math.min(value, 100)) / 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative size-16 shrink-0">
        <svg viewBox="0 0 44 44" className="size-16 -rotate-90">
          <circle
            cx="22"
            cy="22"
            r="17"
            className="fill-none stroke-border"
            strokeWidth="4"
          />
          <motion.circle
            cx="22"
            cy="22"
            r="17"
            className="fill-none stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={1}
            initial={{ strokeDasharray: "0 1" }}
            whileInView={{ strokeDasharray: `${progress} 1` }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xs font-semibold">
          {value}%
        </span>
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {detail ? (
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type IconCloudProps = ClassNameProps & {
  items: string[];
};

export function IconCloud({ items, className }: IconCloudProps) {
  return (
    <div className={cn("icon-cloud", className)}>
      <div className="icon-cloud__center">
        <span>Stack</span>
      </div>
      {items.map((item, index) => {
        const toneClass = getTechBadgeToneClass(item);
        const img = getTechIconImagePath(item);

        if (!img) {
          return null;
        }

        return (
          <span
            key={item}
            className={cn("icon-cloud__item", toneClass)}
            title={item}
            style={
              {
                "--index": index,
                "--total": items.length,
              } as React.CSSProperties
            }
          >
            <img src={img} alt={item} className="brand-icon-image" />
            <span className="sr-only">{item}</span>
          </span>
        );
      })}
    </div>
  );
}

type TechMarqueeProps = ClassNameProps & {
  items: string[];
};

export function TechMarquee({ items, className }: TechMarqueeProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div className={cn("tech-marquee", className)}>
      <div className="tech-marquee__track">
        {repeatedItems.map((item, index) => {
          const toneClass = getTechBadgeToneClass(item);
          const img = getTechIconImagePath(item);

          if (!img) {
            return null;
          }

          return (
            <span
              key={`${item}-${index}`}
              className={cn("tech-marquee__item", toneClass)}
              title={item}
            >
              <img src={img} alt={item} className="brand-icon-image" />
              <span className="sr-only">{item}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function AnimatedBeam({ className }: ClassNameProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 180"
      className={cn("animated-beam", className)}
    >
      <path d="M28 40 C128 0 248 22 392 36" />
      <path d="M40 142 C136 82 260 112 382 82" />
      <path d="M72 88 C150 132 252 48 354 136" />
    </svg>
  );
}
