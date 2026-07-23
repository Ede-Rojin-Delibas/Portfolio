import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AuroraText,
  HyperText,
  WordRotate,
} from "@/components/shared/animation-effects";
import { defaultLocale } from "@/data/i18n";
import { AnimatedText } from "@/components/shared/animated-text";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";
import { getServerLocale } from "@/lib/server-locale";

const heroTech = [
  "Python",
  "Flask",
  "Machine Learning",
  "REST APIs",
  "SQL",
  "Data Analysis",
  "Next.js",
];

const heroCopy = {
  en: {
    eyebrow: "AI + Software Systems",
    headline:
      "Building practical technology from data, software and intelligent systems.",
    currently: "Currently shaping",
    rotatingWords: [
      "backend systems",
      "machine learning workflows",
      "data-driven products",
      "clean interfaces",
    ],
    summary:
      "I am a Computer Engineer who enjoys understanding how systems work, turning data into insight and building reliable software. This portfolio brings backend development, machine learning, data analysis and user-focused interfaces into one engineering story.",
    focusPrefix: "Focused on",
    focusText: "backend, data, ML",
    focusSuffix: "and clean interfaces.",
    projects: "View projects",
    contact: "Contact me",
  },
  tr: {
    eyebrow: "Yapay Zeka + Yazılım Sistemleri",
    headline:
      "Veri, yazılım ve akıllı sistemlerden pratik teknoloji inşa ediyorum.",
    currently: "Şu anda geliştirdiğim alanlar",
    rotatingWords: [
      "backend sistemleri",
      "makine öğrenmesi akışları",
      "veri odaklı ürünler",
      "temiz arayüzler",
    ],
    summary:
      "Sistemlerin nasıl çalıştığını anlamayı, veriyi içgörüye dönüştürmeyi ve güvenilir yazılımlar geliştirmeyi seven bir Bilgisayar Mühendisiyim. Bu portfolyo; backend geliştirme, makine öğrenmesi, veri analizi ve kullanıcı odaklı arayüzleri tek bir mühendislik hikayesinde birleştiriyor.",
    focusPrefix: "Odaklandığım alanlar",
    focusText: "backend, veri, ML",
    focusSuffix: "ve temiz arayüzler.",
    projects: "Projeleri gör",
    contact: "İletişime geç",
  },
} as const;

export async function Hero() {
  const locale = await getServerLocale();
  const copy = heroCopy[locale] ?? heroCopy[defaultLocale];

  return (
    <section className="hero-skin section-skin relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <div aria-hidden="true" className="hero-wireframe" />
      <Image
        src="/images/hero-glass-crystal.png"
        alt=""
        width={900}
        height={900}
        preload
        aria-hidden="true"
        className="hero-glass-object"
      />
      <div
        aria-hidden="true"
        className="hero-abstract-object hero-abstract-object--primary"
      />
      <div
        aria-hidden="true"
        className="hero-abstract-object hero-abstract-object--secondary"
      />

      <Container className="relative z-10 grid min-w-0 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <Reveal>
            <div className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-left text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              <HyperText
                text={copy.eyebrow}
                className="min-w-0 break-words"
              />
            </div>
          </Reveal>

          <div>
            <AnimatedText
              text={copy.headline}
              className="max-w-full text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl"
            />
            <Reveal delay={0.08}>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-lg font-medium leading-8 text-muted-foreground md:text-2xl">
                {copy.currently}{" "}
                <WordRotate
                  className="grid w-full min-w-0 overflow-visible text-left text-foreground sm:inline-grid sm:w-auto sm:min-w-56"
                  words={[...copy.rotatingWords]}
                />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-6 max-w-2xl space-y-3">
              <p className="text-base leading-8 text-muted-foreground md:text-lg">
                {copy.summary}
              </p>
              <p className="rounded-md border border-primary/25 bg-primary/5 px-4 py-3 text-sm font-medium leading-6 text-foreground shadow-[0_18px_60px_-44px_var(--primary)] dark:bg-primary/10">
                {copy.focusPrefix}{" "}
                <AuroraText>{copy.focusText}</AuroraText> {copy.focusSuffix}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rainbow-button rounded-md sm:w-auto">
                <Link href="/projects">
                  {copy.projects}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md sm:w-auto">
                <Link href="/contact">{copy.contact}</Link>
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

        <Reveal className="min-w-0" delay={0.2}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
