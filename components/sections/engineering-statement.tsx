import {
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Layers3,
  Network,
} from "lucide-react";
import { defaultLocale, type Locale } from "@/data/i18n";
import { AuroraText } from "@/components/shared/animation-effects";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

const statementPoints = [
  {
    label: "Systems",
    value: "Backend",
    icon: Cpu,
  },
  {
    label: "Signals",
    value: "Data + ML",
    icon: Database,
  },
  {
    label: "Delivery",
    value: "Interfaces",
    icon: Network,
  },
];

const systemNodes = [
  {
    label: "Code",
    value: "APIs",
    icon: Code2,
  },
  {
    label: "Data",
    value: "EDA",
    icon: Database,
  },
  {
    label: "Model",
    value: "ML",
    icon: BrainCircuit,
  },
  {
    label: "Delivery",
    value: "UI",
    icon: Network,
  },
];

const consoleLines = [
  "read_signal(dataset)",
  "build_api(response)",
  "evaluate_model(metric)",
];

const statementCopy = {
  en: {
    kicker: "Engineering point of view",
    titlePrefix: "Technology is more than writing code. It is understanding",
    titleAccent: "systems, data and impact",
    titleSuffix: ".",
    description:
      "This portfolio is structured as a small engineering story: build reliable software, analyze data carefully, then turn the result into a clear user-facing experience.",
    visualLabel: "Engineering system visual",
    core: "Systems",
    badge: "Product-minded engineering",
    points: statementPoints,
    nodes: systemNodes,
  },
  tr: {
    kicker: "Mühendislik bakış açısı",
    titlePrefix: "Teknoloji yalnızca kod yazmak değildir. Asıl mesele",
    titleAccent: "sistemleri, veriyi ve etkiyi",
    titleSuffix: "anlamaktır.",
    description:
      "Bu portfolyo küçük bir mühendislik hikayesi gibi kurgulandı: güvenilir yazılım geliştir, veriyi dikkatle analiz et, sonra sonucu anlaşılır bir kullanıcı deneyimine dönüştür.",
    visualLabel: "Mühendislik sistemi görseli",
    core: "Sistemler",
    badge: "Ürün odaklı mühendislik",
    points: [
      { ...statementPoints[0], label: "Sistemler", value: "Backend" },
      { ...statementPoints[1], label: "Sinyaller", value: "Veri + ML" },
      { ...statementPoints[2], label: "Teslim", value: "Arayüzler" },
    ],
    nodes: [
      { ...systemNodes[0], label: "Kod", value: "API" },
      { ...systemNodes[1], label: "Veri", value: "EDA" },
      { ...systemNodes[2], label: "Model", value: "ML" },
      { ...systemNodes[3], label: "Teslim", value: "UI" },
    ],
  },
} as const;

type EngineeringStatementProps = {
  locale?: Locale;
};

export function EngineeringStatement({
  locale = defaultLocale,
}: EngineeringStatementProps) {
  const copy = statementCopy[locale] ?? statementCopy[defaultLocale];

  return (
    <section className="statement-skin section-skin py-16 md:py-24">
      <Container size="wide">
        <div className="statement-grid">
          <Reveal direction="left">
            <div className="statement-copy">
              <p className="statement-kicker">{copy.kicker}</p>
              <h2 className="text-balance font-heading text-4xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-6xl">
                {copy.titlePrefix}{" "}
                <AuroraText>{copy.titleAccent}</AuroraText>{" "}
                {copy.titleSuffix}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-xl">
                {copy.description}
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div
              className="statement-visual statement-system-visual"
              aria-label={copy.visualLabel}
            >
              <div className="statement-system-visual__glow" />
              <div className="statement-system-visual__grid" />
              <div className="statement-system-visual__ring" />

              <div className="statement-system-visual__core">
                <Layers3 className="size-5" />
                <span>{copy.core}</span>
              </div>

              <div className="statement-system-visual__nodes">
                {copy.nodes.map((node) => {
                  const Icon = node.icon;

                  return (
                    <div
                      className="statement-system-visual__node"
                      key={node.label}
                    >
                      <Icon className="size-4" />
                      <span>
                        <span>{node.label}</span>
                        <strong>{node.value}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="statement-system-visual__console">
                <div className="statement-system-visual__console-top">
                  <span />
                  <span />
                  <span />
                  <strong>engineering.flow</strong>
                </div>
                <div className="statement-system-visual__console-lines">
                  {consoleLines.map((line) => (
                    <p key={line}>
                      <span>&gt;</span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="statement-visual__badge">
                {copy.badge}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="statement-points">
          {copy.points.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal delay={index * 0.08} key={item.label}>
                <div className="statement-point">
                  <div className="statement-point__icon">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase leading-5 text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
