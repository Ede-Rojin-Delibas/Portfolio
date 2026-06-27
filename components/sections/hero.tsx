import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedText } from "@/components/shared/animated-text";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";

const heroTech = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Motion",
  "React Hook Form",
  "Zod",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              Dark-first developer portfolio
            </div>
          </Reveal>

          <AnimatedText
            text="Building clean interfaces with depth, motion and technical clarity."
            className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl"
          />

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              I design and build frontend experiences with Next.js, TypeScript
              and component-driven UI systems. The goal is simple: responsive,
              readable and memorable interfaces that feel good in both dark and
              light mode.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-md">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md">
                <Link href="/contact">Contact me</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap gap-2">
              {heroTech.map((item) => (
                <TechBadge key={item}>{item}</TechBadge>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
