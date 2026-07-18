"use client";

import { BrainCircuit, Code2, Database, Layers3 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AuroraText } from "@/components/shared/animation-effects";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

const stackLayers = [
  {
    label: "Software",
    title: "Reliable code foundation",
    detail: "APIs, backend logic and clean structure.",
    icon: Code2,
    className: "system-stack-layer--code",
    split: { x: -42, y: -78, rotate: -9 },
  },
  {
    label: "Data",
    title: "Signal and analysis layer",
    detail: "EDA, preprocessing and model evaluation.",
    icon: Database,
    className: "system-stack-layer--data",
    split: { x: 36, y: -18, rotate: 7 },
  },
  {
    label: "AI",
    title: "Intelligent decision layer",
    detail: "Learning workflows and practical prediction.",
    icon: BrainCircuit,
    className: "system-stack-layer--ai",
    split: { x: -24, y: 54, rotate: -5 },
  },
];

export function SystemStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="system-stack-skin section-skin"
      chapter="02"
      eyebrow="Signal layers"
      title="A portfolio built like a layered engineering system."
      description="This middle section turns the moodboard idea into motion: separate software, data and AI layers assemble into one practical engineering point of view."
      containerSize="wide"
    >
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal direction="left">
          <div className="system-stack-copy glass-panel rounded-lg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              How the work connects
            </p>
            <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Code, data and AI do not sit separately. They{" "}
              <AuroraText>join into systems</AuroraText>.
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              The goal is not to look like only a frontend, backend or AI
              portfolio. The story is broader: understand the system, read the
              data, build the useful output.
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <motion.div
            className="system-stack-visual"
            initial={shouldReduceMotion ? "joined" : "split"}
            whileInView="joined"
            viewport={{ once: true, margin: "-120px" }}
          >
            <div className="system-stack-visual__halo" />
            <div className="system-stack-visual__mesh" />
            <div className="system-stack-visual__core">
              <Layers3 className="size-5" />
              System
            </div>

            {stackLayers.map((layer, index) => {
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.label}
                  className={`system-stack-layer ${layer.className}`}
                  variants={{
                    split: {
                      opacity: 0.52,
                      x: layer.split.x,
                      y: layer.split.y,
                      rotateZ: layer.split.rotate,
                      rotateX: 62,
                      scale: 0.96,
                    },
                    joined: {
                      opacity: 1,
                      x: 0,
                      y: index * 58 - 58,
                      rotateZ: 0,
                      rotateX: 58,
                      scale: 1,
                    },
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.2,
                    delay: shouldReduceMotion ? 0 : index * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="system-stack-layer__shine" />
                  <div className="system-stack-layer__content">
                    <span className="system-stack-layer__icon">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {layer.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-foreground">
                        {layer.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {layer.detail}
                      </span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
