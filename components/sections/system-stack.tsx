"use client";

import { defaultLocale, type Locale } from "@/data/i18n";
import { AuroraText } from "@/components/shared/animation-effects";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

const systemStackCopy = {
  en: {
    eyebrow: "Signal layers",
    title: "A portfolio built like a layered engineering system.",
    description:
      "The page connects software foundations, data analysis, model thinking and interface delivery as one practical engineering path.",
    connectionEyebrow: "How the work connects",
    headingPrefix: "Code, data and AI do not sit separately. They",
    headingAccent: "join into systems",
    headingSuffix: ".",
    body:
      "The goal is not to look like only a frontend, backend or AI portfolio. The story is broader: understand the system, read the data, build the useful output.",
  },
  tr: {
    eyebrow: "Sinyal katmanları",
    title: "Katmanlı bir mühendislik sistemi gibi kurgulanmış portfolyo.",
    description:
      "Sayfa; yazılım temeli, veri analizi, model düşüncesi ve arayüz teslimini tek bir pratik mühendislik yolu olarak birbirine bağlar.",
    connectionEyebrow: "Çalışmalar nasıl bağlanıyor",
    headingPrefix: "Kod, veri ve yapay zeka ayrı ayrı durmaz. Birlikte",
    headingAccent: "sistemlere dönüşür",
    headingSuffix: ".",
    body:
      "Amaç yalnızca frontend, backend veya yapay zeka portfolyosu gibi görünmek değil. Hikaye daha geniş: sistemi anla, veriyi oku, yararlı çıktıyı geliştir.",
  },
} as const;

type SystemStackProps = {
  locale?: Locale;
};

export function SystemStack({ locale = defaultLocale }: SystemStackProps) {
  const copy = systemStackCopy[locale] ?? systemStackCopy[defaultLocale];

  return (
    <Section
      className="system-stack-skin section-skin"
      chapter="02"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      containerSize="wide"
    >
      <Reveal direction="up">
        <div className="system-stack-copy glass-panel max-w-4xl rounded-lg p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {copy.connectionEyebrow}
          </p>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {copy.headingPrefix}{" "}
            <AuroraText>{copy.headingAccent}</AuroraText>
            {copy.headingSuffix}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            {copy.body}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
