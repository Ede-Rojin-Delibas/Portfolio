import Image from "next/image";
import { Braces, Code2, Sparkles } from "lucide-react";
import { ParallaxCard } from "@/components/shared/parallax-card";

export function HeroVisual() {
  return (
    <ParallaxCard
      offset={42}
      className="glass-panel relative overflow-hidden rounded-lg p-3"
    >
      <div className="technical-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent" />

      <div className="relative rounded-md border border-border/70 bg-background/70 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-md border border-border/70 bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground">
            systems/engineering.tsx
          </div>
        </div>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-lg border border-border/70 bg-background/70">
        <div className="relative aspect-[4/3] min-h-80">
          <Image
            src="/images/ai-engineering-hero.png"
            alt="Abstract AI engineering workspace with code, data and neural system visuals"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/10" />
          <div className="absolute bottom-4 left-4 right-4 rounded-md border border-border/70 bg-background/80 p-4 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Intelligent systems
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Software, backend workflows, AI models and data signals presented
              as one computer engineering practice.
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 pt-3">
        <div className="rounded-lg border border-border/70 bg-background/75 p-4 transition duration-300 hover:border-primary/40 hover:bg-background/85">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Code2 className="size-4 text-primary" />
            Engineering System
          </div>
          <div className="space-y-2 font-mono text-xs text-muted-foreground">
            <p>
              <span className="text-primary">const</span> focus ={" "}
              <span className="text-foreground">&quot;software + data + AI&quot;</span>
            </p>
            <p>
              <span className="text-primary">const</span> method ={" "}
              <span className="text-foreground">&quot;build, analyze, refine&quot;</span>
            </p>
            <p>
              <span className="text-primary">const</span> output ={" "}
              <span className="text-accent">&quot;practical impact&quot;</span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-background/75 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
            <Braces className="mb-6 size-5 text-primary" />
            <p className="text-3xl font-semibold tracking-tight">10</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Case studies
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/75 p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40">
            <Sparkles className="mb-6 size-5 text-accent" />
            <p className="text-3xl font-semibold tracking-tight">4</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Focus areas
            </p>
          </div>
        </div>
      </div>
    </ParallaxCard>
  );
}
