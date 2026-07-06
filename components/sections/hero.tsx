import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AuroraText,
  HyperText,
  WordRotate,
} from "@/components/shared/animation-effects";
import { AnimatedText } from "@/components/shared/animated-text";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";

const heroTech = [
  "Python",
  "Flask",
  "Machine Learning",
  "REST APIs",
  "SQL",
  "Data Analysis",
  "Next.js",
];

export function Hero() {
  return (
    <section className="hero-skin section-skin relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <div aria-hidden="true" className="hero-wireframe" />
      <div
        aria-hidden="true"
        className="hero-abstract-object hero-abstract-object--primary"
      />
      <div
        aria-hidden="true"
        className="hero-abstract-object hero-abstract-object--secondary"
      />

      <Container className="relative z-10 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              <HyperText text="Computer Engineering for Intelligent Systems" />
            </div>
          </Reveal>

          <div>
            <AnimatedText
              text="Building practical technology from data, software and intelligent systems."
              className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl"
            />
            <Reveal delay={0.08}>
              <p className="mt-4 text-lg font-medium text-muted-foreground md:text-2xl">
                Currently shaping{" "}
                <WordRotate
                  className="min-w-56 text-left text-foreground"
                  words={[
                    "backend systems",
                    "machine learning workflows",
                    "data-driven products",
                    "clean interfaces",
                  ]}
                />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-6 max-w-2xl space-y-3">
              <p className="text-base leading-8 text-muted-foreground md:text-lg">
                I am a Computer Engineer who enjoys understanding how systems
                work, turning data into insight and building reliable software.
                This portfolio brings backend development, machine learning,
                data analysis and user-focused interfaces into one engineering
                story.
              </p>
              <p className="rounded-md border border-primary/25 bg-primary/5 px-4 py-3 text-sm font-medium leading-6 text-foreground shadow-[0_18px_60px_-44px_var(--primary)] dark:bg-primary/10">
                Focused on{" "}
                <AuroraText>backend systems, data analysis, machine learning</AuroraText>
                {" "}and clean user interfaces.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rainbow-button rounded-md">
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
            <StaggerList className="mt-8 flex flex-wrap gap-2" staggerDelay={0.045}>
              {heroTech.map((item) => (
                <StaggerItem key={item}>
                  <TechBadge>{item}</TechBadge>
                </StaggerItem>
              ))}
            </StaggerList>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
