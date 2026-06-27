import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ParallaxCard } from "@/components/shared/parallax-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <Section className="pb-24" containerSize="wide">
      <ParallaxCard offset={28} className="glass-panel relative overflow-hidden rounded-lg p-6 md:p-10">
        <div className="technical-grid absolute inset-0 opacity-60" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal direction="left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Next step
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Want to see how the full portfolio experience comes together?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Explore the project library or jump directly to contact. This
              section works as a clear conversion point after the animated
              content blocks.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.12}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="rounded-md">
                <Link href="/projects">
                  View all projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md">
                <Link href="/contact">
                  <MessageCircle className="size-4" />
                  Start a conversation
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxCard>
    </Section>
  );
}
