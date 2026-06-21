import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <Badge variant="outline" className="mb-6 gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          Next.js Portfolio Experience
        </Badge>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Designing clean, interactive and memorable web experiences.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          I build modern frontend interfaces with Next.js, TypeScript, Tailwind
          CSS and thoughtful motion design.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button size="lg" variant="outline">
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
