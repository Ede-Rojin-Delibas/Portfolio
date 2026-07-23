import { ArrowRight, Braces, Database, Sparkles } from "lucide-react";
import { defaultLocale, type Locale } from "@/data/i18n";
import { AuroraText } from "@/components/shared/animation-effects";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";

const layers = [
  {
    number: "01",
    eyebrow: "Build",
    title: "Reliable software layer",
    description:
      "Backend logic, APIs and structured code turn an idea into a working product foundation.",
    icon: Braces,
    stack: ["Python", "Flask", "SQL", "GitHub"],
  },
  {
    number: "02",
    eyebrow: "Analyze",
    title: "Data and model layer",
    description:
      "Exploration, preprocessing and model evaluation transform raw data into useful signals.",
    icon: Database,
    stack: ["Pandas", "NumPy", "Scikit-learn", "Python"],
  },
  {
    number: "03",
    eyebrow: "Present",
    title: "Interface and delivery layer",
    description:
      "Clear interfaces, responsive layouts and motion details make technical work easier to understand.",
    icon: Sparkles,
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  },
];

const engineeringLayersCopy = {
  en: {
    eyebrow: "Scroll story",
    title:
      "Three layers turn technical work into a complete portfolio experience.",
    description:
      "This section breaks the page rhythm: instead of another card grid, it explains the engineering flow from software foundation to data signals and interface delivery.",
    panelEyebrow: "Portfolio architecture",
    panelTitlePrefix: "Not just pages. A small",
    panelTitleAccent: "engineering narrative",
    panelTitleSuffix: ".",
    panelDescription:
      "The site works better when every section has a distinct purpose: introduction, stack, story, projects, writing and contact.",
    orbit: ["Code", "Data", "AI", "UI"],
    layers,
    nextStop:
      "Next stop: project cards show how these layers become concrete case studies.",
    jump: "Jump to projects",
  },
  tr: {
    eyebrow: "Scroll hikayesi",
    title:
      "Üç katman teknik çalışmayı tamamlanmış bir portfolyo deneyimine dönüştürür.",
    description:
      "Bu bölüm sayfa ritmini kırar: başka bir kart grid’i yerine yazılım temelinden veri sinyallerine ve arayüz teslimine giden mühendislik akışını açıklar.",
    panelEyebrow: "Portfolyo mimarisi",
    panelTitlePrefix: "Sadece sayfalar değil. Küçük bir",
    panelTitleAccent: "mühendislik anlatısı",
    panelTitleSuffix: ".",
    panelDescription:
      "Her bölümün net bir amacı olduğunda site daha güçlü çalışır: tanıtım, stack, hikaye, projeler, yazılar ve iletişim.",
    orbit: ["Kod", "Veri", "YZ", "UI"],
    layers: [
      {
        ...layers[0],
        eyebrow: "Geliştir",
        title: "Güvenilir yazılım katmanı",
        description:
          "Backend mantığı, API’ler ve düzenli kod bir fikri çalışan ürün temeline dönüştürür.",
      },
      {
        ...layers[1],
        eyebrow: "Analiz et",
        title: "Veri ve model katmanı",
        description:
          "Keşif, ön işleme ve model değerlendirme ham veriyi yararlı sinyallere dönüştürür.",
      },
      {
        ...layers[2],
        eyebrow: "Sun",
        title: "Arayüz ve teslim katmanı",
        description:
          "Temiz arayüzler, responsive layout’lar ve motion detayları teknik çalışmayı daha anlaşılır hale getirir.",
      },
    ],
    nextStop:
      "Sıradaki durak: proje kartları bu katmanların somut vaka çalışmalarına nasıl dönüştüğünü gösterir.",
    jump: "Projelere git",
  },
} as const;

type EngineeringLayersProps = {
  locale?: Locale;
};

export function EngineeringLayers({
  locale = defaultLocale,
}: EngineeringLayersProps) {
  const copy =
    engineeringLayersCopy[locale] ?? engineeringLayersCopy[defaultLocale];

  return (
    <Section
      className="story-skin section-skin"
      chapter="04"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      containerSize="wide"
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal direction="left">
          <div className="story-sticky-panel glass-panel rounded-lg p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.panelEyebrow}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {copy.panelTitlePrefix}{" "}
              <AuroraText>{copy.panelTitleAccent}</AuroraText>
              {copy.panelTitleSuffix}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {copy.panelDescription}
            </p>

            <div className="story-orbit mt-8" aria-hidden="true">
              {copy.orbit.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <StaggerList className="grid gap-4" staggerDelay={0.11}>
          {copy.layers.map((layer) => {
            const Icon = layer.icon;

            return (
              <StaggerItem
                key={layer.title}
                className="story-layer-card glass-panel rounded-lg p-5 md:p-6"
              >
                <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
                  <span className="font-mono text-4xl font-semibold tracking-tight text-primary/70 md:text-5xl">
                    {layer.number}
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {layer.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {layer.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {layer.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {layer.stack.map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </div>
                  </div>

                  <div className="hidden size-12 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary md:grid">
                    <Icon className="size-5" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}

          <StaggerItem className="story-link-card rounded-lg border border-border/70 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted-foreground">
                {copy.nextStop}
              </p>
              <a
                href="#featured-projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {copy.jump}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </StaggerItem>
        </StaggerList>
      </div>
    </Section>
  );
}
