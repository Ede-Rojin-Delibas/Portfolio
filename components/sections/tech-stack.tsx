import {
  BrainCircuit,
  Code2,
  Component,
  Database,
  Gauge,
  Network,
} from "lucide-react";
import { defaultLocale, type Locale } from "@/data/i18n";
import {
  AnimatedCircularProgress,
  AuroraText,
  IconCloud,
  TechMarquee,
} from "@/components/shared/animation-effects";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";

const techGroups = [
  {
    title: "Software Engineering",
    icon: Code2,
    items: ["Python", "OOP", "Git & GitHub", "Problem Solving"],
  },
  {
    title: "Backend & APIs",
    icon: Component,
    items: ["Flask", "REST APIs", "SQL", "Backend Development"],
  },
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    items: ["Machine Learning", "Scikit-learn", "Model Evaluation"],
  },
  {
    title: "Data Analysis",
    icon: Database,
    items: ["Pandas", "NumPy", "EDA", "Data Visualization"],
  },
  {
    title: "Systems Foundation",
    icon: Network,
    items: ["Networking Fundamentals", "Linux", "Cloud Concepts"],
  },
  {
    title: "Interface Delivery",
    icon: Gauge,
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
];

const iconCloudItems = [
  "Python",
  "TypeScript",
  "SQL",
  "GitHub",
  "Linux",
  "Flask",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Pandas",
  "NumPy",
  "Scikit-learn",
];

const marqueeItems = [
  "Python",
  "Flask",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "SQL",
  "C#",
  "ASP.NET",
  "GitHub",
  "Git",
  "Linux",
  "HTML",
  "CSS",
];

const progressItems = [
  {
    label: "Backend systems",
    value: 86,
    detail: "APIs, data flow and structured application logic.",
  },
  {
    label: "AI & data",
    value: 82,
    detail: "ML workflows, EDA and model evaluation practice.",
  },
  {
    label: "Interface delivery",
    value: 78,
    detail: "Responsive UI, interaction states and motion details.",
  },
];

const techStackCopy = {
  en: {
    eyebrow: "Engineering toolkit",
    title: "A practical stack for software, data and intelligent systems.",
    description:
      "The technologies are grouped by engineering purpose: backend work, data analysis, machine learning, system fundamentals and user-facing delivery.",
    brandEyebrow: "Brand icon map",
    brandTitlePrefix: "Real tool logos for",
    brandTitleAccent: "software, AI and data",
    brandTitleSuffix: ".",
    brandDescription:
      "This area now uses recognizable technology logos instead of generic line icons, closer to the GitHub profile style.",
    progressEyebrow: "Circular progress",
    progressTitle: "Focus distribution",
    groups: techGroups,
    progress: progressItems,
  },
  tr: {
    eyebrow: "Mühendislik araç seti",
    title: "Yazılım, veri ve akıllı sistemler için pratik bir stack.",
    description:
      "Teknolojiler mühendislik amacına göre gruplandı: backend çalışma, veri analizi, makine öğrenmesi, sistem temelleri ve kullanıcıya dönük teslim.",
    brandEyebrow: "Brand icon haritası",
    brandTitlePrefix: "Gerçek araç logoları",
    brandTitleAccent: "yazılım, yapay zeka ve veri",
    brandTitleSuffix: "için kullanılıyor.",
    brandDescription:
      "Bu alan artık generic çizgi ikonlar yerine GitHub profilindeki stile daha yakın, tanınabilir teknoloji logoları kullanıyor.",
    progressEyebrow: "Dairesel ilerleme",
    progressTitle: "Odak dağılımı",
    groups: [
      { ...techGroups[0], title: "Yazılım Mühendisliği" },
      { ...techGroups[1], title: "Backend & API’ler" },
      { ...techGroups[2], title: "Yapay Zeka & Makine Öğrenmesi" },
      { ...techGroups[3], title: "Veri Analizi" },
      { ...techGroups[4], title: "Sistem Temelleri" },
      { ...techGroups[5], title: "Arayüz Teslimi" },
    ],
    progress: [
      {
        ...progressItems[0],
        label: "Backend sistemleri",
        detail: "API’ler, veri akışı ve yapılandırılmış uygulama mantığı.",
      },
      {
        ...progressItems[1],
        label: "Yapay zeka & veri",
        detail: "ML akışları, EDA ve model değerlendirme pratiği.",
      },
      {
        ...progressItems[2],
        label: "Arayüz teslimi",
        detail:
          "Responsive UI, etkileşim durumları ve motion detayları.",
      },
    ],
  },
} as const;

type TechStackProps = {
  locale?: Locale;
};

export function TechStack({ locale = defaultLocale }: TechStackProps) {
  const copy = techStackCopy[locale] ?? techStackCopy[defaultLocale];

  return (
    <Section
      chapter="03"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      className="tech-skin section-skin"
    >
      <div className="mb-6 grid gap-5 md:mb-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal direction="left">
          <div className="glass-panel relative min-h-[34rem] overflow-hidden rounded-lg p-5 md:min-h-[30rem] md:p-6">
            <div className="tech-pattern-visual absolute inset-0" />
            <div className="technical-grid absolute inset-0 opacity-25" />
            <div className="relative grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {copy.brandEyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {copy.brandTitlePrefix}{" "}
                  <AuroraText>{copy.brandTitleAccent}</AuroraText>{" "}
                  {copy.brandTitleSuffix}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {copy.brandDescription}
                </p>
              </div>
              <IconCloud items={iconCloudItems} />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <div className="glass-panel grid h-full gap-4 rounded-lg p-5 md:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.progressEyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {copy.progressTitle}
              </h3>
            </div>
            <div className="grid gap-4">
              {copy.progress.map((item) => (
                <AnimatedCircularProgress key={item.label} {...item} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mb-6 glass-panel rounded-lg p-3 md:mb-8">
          <TechMarquee items={marqueeItems} />
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {copy.groups.map((group, index) => {
          const Icon = group.icon;

          return (
            <Reveal delay={index * 0.06} key={group.title}>
              <div className="glass-panel h-full rounded-lg p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechBadge key={item}>{item}</TechBadge>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
