import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Globe2, MessageCircle } from "lucide-react";
import { generatedAssets } from "@/data/generated-assets";
import { defaultLocale, type Locale } from "@/data/i18n";
import { ContactMapCard } from "@/components/contact/contact-map-card";
import { ContactForm } from "@/components/contact/contact-form";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
} from "@/components/shared/brand-icons";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ede-Rojin about software engineering, data analysis, machine learning and intelligent systems projects.",
};

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/Ede-Rojin-Delibas",
    href: "https://github.com/Ede-Rojin-Delibas",
    icon: GithubBrandIcon,
    tone: "slate" as const,
  },
  {
    label: "Previous portfolio",
    value: "ede-rojin-delibas.github.io",
    href: "https://ede-rojin-delibas.github.io/",
    icon: Globe2,
    tone: "blue" as const,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ede-rojin-delibas",
    href: "https://www.linkedin.com/in/ede-rojin-deliba%C5%9F/",
    icon: LinkedinBrandIcon,
    tone: "cyan" as const,
  },
  {
    label: "Availability",
    value: {
      en: "Open to software, AI and data projects",
      tr: "Yazılım, yapay zeka ve veri projelerine açık",
    },
    href: "/projects",
    icon: MessageCircle,
    tone: "emerald" as const,
  },
];

const contactPageCopy = {
  en: {
    eyebrow: "Collaboration",
    title: "Let's talk about practical technology solutions.",
    description:
      "Use this page for project ideas, collaboration opportunities, feedback or engineering conversations around software, AI and data.",
    visualEyebrow: "Collaboration signal",
    visualDescription:
      "A softer visual layer for contact, separate from the hero but still connected to the portfolio palette.",
    directLinks: "Direct links",
  },
  tr: {
    eyebrow: "İş birliği",
    title: "Pratik teknoloji çözümleri üzerine konuşalım.",
    description:
      "Bu sayfayı proje fikirleri, iş birliği fırsatları, geri bildirim veya yazılım, yapay zeka ve veri odaklı mühendislik konuşmaları için kullanabilirsin.",
    visualEyebrow: "İş birliği sinyali",
    visualDescription:
      "Hero’dan farklı ama portfolyo paletiyle bağlantılı, iletişim sayfasına özel daha yumuşak bir görsel katman.",
    directLinks: "Doğrudan linkler",
  },
} as const;

function getLocalizedLinkValue(
  value: string | Record<Locale, string>,
  locale: Locale,
) {
  return typeof value === "string"
    ? value
    : value[locale] ?? value[defaultLocale];
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const copy = contactPageCopy[locale] ?? contactPageCopy[defaultLocale];

  return (
    <main>
      <Section
        className="contact-skin section-skin"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-5">
            <Reveal direction="left">
              <div className="contact-generated-visual glass-panel overflow-hidden rounded-lg">
                <Image
                  src={generatedAssets.contactPremium.src}
                  alt={generatedAssets.contactPremium.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover"
                />
                <div className="contact-generated-visual__overlay" />
                <Image
                  src={generatedAssets.realisticGlassObject.src}
                  alt=""
                  width={220}
                  height={220}
                  aria-hidden="true"
                  className="contact-generated-visual__object"
                />
                <div className="contact-generated-visual__copy">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {copy.visualEyebrow}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {copy.visualDescription}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.04}>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {copy.directLinks}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="rounded-md border border-border/70 bg-background/60 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-background/75"
                      >
                        <div className="mb-5 flex items-center justify-between gap-4">
                          <IconTile
                            icon={Icon}
                            iconClassName="size-5"
                            tone={item.tone}
                          />
                          <ExternalLink className="size-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="mt-1 break-words text-sm text-muted-foreground">
                          {getLocalizedLinkValue(item.value, locale)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <ContactMapCard locale={locale} />
            </Reveal>
          </div>

          <ContactForm locale={locale} />
        </div>
      </Section>
    </main>
  );
}
