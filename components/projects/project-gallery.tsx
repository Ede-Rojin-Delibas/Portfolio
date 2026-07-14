"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { animate, motion, useMotionValue } from "motion/react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectGalleryProps = {
  projects: Project[];
};

const fallbackImages = [
  "/images/code-dashboard-mockup.png",
  "/images/ai-data-pattern.png",
  "/images/abstract-3d-object.png",
];

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const shellRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [dragConstraints, setDragConstraints] = React.useState({
    left: -540,
    right: 0,
  });

  const clampX = React.useCallback(
    (value: number) => Math.min(dragConstraints.right, Math.max(dragConstraints.left, value)),
    [dragConstraints.left, dragConstraints.right],
  );

  React.useEffect(() => {
    function updateConstraints() {
      const shell = shellRef.current;
      const track = trackRef.current;

      if (!shell || !track) {
        return;
      }

      const overflow = Math.max(0, track.scrollWidth - shell.clientWidth);
      const nextConstraints = { left: -overflow, right: 0 };

      setDragConstraints(nextConstraints);
      x.set(Math.min(nextConstraints.right, Math.max(nextConstraints.left, x.get())));
    }

    updateConstraints();

    const observer = new ResizeObserver(updateConstraints);

    if (shellRef.current) {
      observer.observe(shellRef.current);
    }

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => observer.disconnect();
  }, [projects.length, x]);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (delta === 0 || dragConstraints.left === 0) {
      return;
    }

    const current = x.get();
    const next = clampX(current - delta * 1.15);
    const isMovingInsideGallery = next !== current;

    if (!isMovingInsideGallery) {
      return;
    }

    event.preventDefault();
    animate(x, next, {
      type: "spring",
      stiffness: 260,
      damping: 32,
      mass: 0.42,
    });
  }

  return (
    <div
      className="project-gallery-shell"
      onWheel={handleWheel}
      ref={shellRef}
    >
      <motion.div
        ref={trackRef}
        className="project-gallery-track"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.16}
        dragMomentum
        onDragEnd={() => x.set(clampX(x.get()))}
        style={{ x }}
      >
        {projects.map((project, index) => {
          const image = project.image?.src ?? fallbackImages[index % fallbackImages.length];

          return (
            <motion.div
              key={project.slug}
              className={cn("project-gallery-card", `project-gallery-card--${index % 3}`)}
              whileHover={{ y: -12, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <div className="relative h-full overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={project.image?.alt ?? `${project.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 34vw, 86vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/20 to-white/8" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                    <span className="rounded-md border border-white/20 bg-white/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="grid size-9 place-items-center rounded-md border border-white/20 bg-white/12 text-white backdrop-blur-md">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-heading text-2xl font-semibold leading-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
