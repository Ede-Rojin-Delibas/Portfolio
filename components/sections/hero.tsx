import Link from "next/link";
import { ArrowRight, Braces, Code2, Sparkles } from "lucide-react";
import { AnimatedText } from "@/components/shared/animated-text";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";

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
          <div className="glass-panel relative overflow-hidden rounded-lg">
            <div className="technical-grid absolute inset-0 opacity-70" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent" />

            <div className="relative border-b border-border/70 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-amber-300" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-md border border-border/70 bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                  app/portfolio.tsx
                </div>
              </div>
            </div>

            <div className="relative grid gap-4 p-5">
              <div className="rounded-lg border border-border/70 bg-background/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Code2 className="size-4 text-primary" />
                  Interface System
                </div>
                <div className="space-y-2 font-mono text-xs text-muted-foreground">
                  <p>
                    <span className="text-primary">const</span> theme ={" "}
                    <span className="text-foreground">&quot;dark/light&quot;</span>
                  </p>
                  <p>
                    <span className="text-primary">const</span> motion ={" "}
                    <span className="text-foreground">&quot;scroll + hover&quot;</span>
                  </p>
                  <p>
                    <span className="text-primary">const</span> stack ={" "}
                    <span className="text-accent">&quot;Next.js&quot;</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/70 bg-background/70 p-4">
                  <Braces className="mb-6 size-5 text-primary" />
                  <p className="text-3xl font-semibold tracking-tight">07</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Core tools
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/70 p-4">
                  <Sparkles className="mb-6 size-5 text-accent" />
                  <p className="text-3xl font-semibold tracking-tight">100%</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Responsive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
