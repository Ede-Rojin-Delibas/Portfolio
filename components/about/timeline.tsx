"use client";

import { CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { IconTile, type IconTileTone } from "@/components/shared/icon-tile";
import { cn } from "@/lib/utils";

type TimelineEntry = {
  period: string;
  title: string;
  description: string;
  tags?: string[];
  tone?: IconTileTone;
};

type TimelineProps = {
  items: TimelineEntry[];
  className?: string;
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={cn("relative grid gap-5", className)}
    >
      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

      {items.map((item) => (
        <motion.li
          key={`${item.period}-${item.title}`}
          variants={{
            hidden: { opacity: 0, x: -18, filter: "blur(8px)" },
            show: { opacity: 1, x: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-[2rem_1fr] gap-4"
        >
          <IconTile
            className="relative z-10"
            icon={CalendarDays}
            iconClassName="size-4"
            size="sm"
            tone={item.tone ?? "blue"}
          />

          <article className="rounded-lg border border-border/70 bg-background/55 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {item.period}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>

            {item.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/70 bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        </motion.li>
      ))}
    </motion.ol>
  );
}
