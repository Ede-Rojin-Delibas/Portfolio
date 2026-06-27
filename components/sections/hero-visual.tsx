import { Braces, Code2, Sparkles } from "lucide-react";
import { ParallaxCard } from "@/components/shared/parallax-card";

export function HeroVisual() {
  return (
    <ParallaxCard offset={42} className="glass-panel relative overflow-hidden rounded-lg">
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
        <div className="rounded-lg border border-border/70 bg-background/70 p-4 transition duration-300 hover:border-primary/40 hover:bg-background/85">
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
          <div className="rounded-lg border border-border/70 bg-background/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
            <Braces className="mb-6 size-5 text-primary" />
            <p className="text-3xl font-semibold tracking-tight">07</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Core tools
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40">
            <Sparkles className="mb-6 size-5 text-accent" />
            <p className="text-3xl font-semibold tracking-tight">100%</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Responsive
            </p>
          </div>
        </div>
      </div>
    </ParallaxCard>
  );
}
