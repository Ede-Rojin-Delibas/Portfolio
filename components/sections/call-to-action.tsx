import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { generatedAssets } from "@/data/generated-assets";
import { defaultLocale } from "@/data/i18n";
import { AuroraText } from "@/components/shared/animation-effects";
import { ParallaxCard } from "@/components/shared/parallax-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getServerLocale } from "@/lib/server-locale";

const ctaCopy = {
  en: {
    eyebrow: "Build practical impact",
    titlePrefix: "Explore the work, then continue the",
    titleAccent: "engineering conversation",
    titleSuffix: ".",
    description:
      "My goal is to design intelligent systems, build reliable software and contribute to projects where technology creates meaningful value.",
    projects: "View projects",
    contact: "Start a conversation",
  },
  tr: {
    eyebrow: "Pratik etki üret",
    titlePrefix: "Çalışmaları keşfet, sonra",
    titleAccent: "mühendislik konuşmasına",
    titleSuffix: "devam edelim.",
    description:
      "Hedefim akıllı sistemler tasarlamak, güvenilir yazılımlar geliştirmek ve teknolojinin anlamlı değer ürettiği projelere katkı sağlamak.",
    projects: "Projeleri gör",
    contact: "Konuşma başlat",
  },
} as const;

export async function CallToAction() {
  const locale = await getServerLocale();
  const copy = ctaCopy[locale] ?? ctaCopy[defaultLocale];

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
            src={generatedAssets.engineeringWorkspace.src}
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
              {copy.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {copy.titlePrefix}{" "}
              <AuroraText>{copy.titleAccent}</AuroraText>{" "}
              {copy.titleSuffix}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {copy.description}
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.12}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="rainbow-button w-full rounded-md sm:w-auto">
                <Link href="/projects">
                  {copy.projects}
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
                  {copy.contact}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxCard>
    </Section>
  );
}
