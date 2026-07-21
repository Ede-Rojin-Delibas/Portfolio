import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AuroraText } from "@/components/shared/animation-effects";
import { ParallaxCard } from "@/components/shared/parallax-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <Section
      chapter="06"
      className="cta-skin section-skin pb-24"
      containerSize="wide"
    >
      <ParallaxCard
        offset={28}
        className="cta-panel relative overflow-hidden rounded-lg p-6 md:p-10"
      >
        <div className="technical-grid absolute inset-0 opacity-45" />
        <div className="absolute inset-y-0 right-0 hidden h-full min-h-72 w-1/2 overflow-hidden opacity-45 md:block">
          <Image
            src="/images/ai-data-pattern.png"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal direction="left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Build practical impact
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Explore the work, then continue the{" "}
              <AuroraText>engineering conversation</AuroraText>.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              My goal is to design intelligent systems, build reliable software
              and contribute to projects where technology creates meaningful
              value.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.12}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="rainbow-button w-full rounded-md sm:w-auto">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-md sm:w-auto"
              >
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
