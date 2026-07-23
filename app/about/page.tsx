import type { Metadata } from "next";
import Image from "next/image";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Network,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { generatedAssets } from "@/data/generated-assets";
import { defaultLocale, type Locale } from "@/data/i18n";
import { Timeline } from "@/components/about/timeline";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ede-Rojin's computer engineering background, software skills, data analysis practice, machine learning interests and professional values.",
};

const profileCards = [
  {
    title: "About me",
    icon: Sparkles,
    tone: "cyan" as const,
    body: "I am a Computer Engineer with strong curiosity for technology, practical problem solving and continuous learning.",
  },
  {
    title: "Education",
    icon: GraduationCap,
    tone: "blue" as const,
    body: "My academic foundation in Computer Engineering supports my work across software, data, artificial intelligence and system technologies.",
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
    tone: "violet" as const,
    body: "I have worked on backend applications, REST APIs, dataset analysis, machine learning models and personal engineering projects.",
  },
];

const professionalSummary = [
  "Technology, for me, is more than writing code. It is about understanding how systems work, solving meaningful problems and continuously improving.",
  "My primary interests include software engineering, data science, artificial intelligence, machine learning, backend development, networking and cloud technologies.",
  "I enjoy transforming data into insights, building scalable applications and understanding how complex systems work behind the scenes.",
  "My long-term goal is to become a versatile engineer capable of designing intelligent systems, building reliable software and contributing to projects that create real value.",
];

const hardSkills = [
  "Python",
  "Flask",
  "Machine Learning",
  "Data Analysis",
  "Data Visualization",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "SQL",
  "REST API Development",
  "Git & GitHub",
  "Object-Oriented Programming",
  "Backend Development",
  "Networking Fundamentals",
  "Linux",
  "Data Preprocessing",
  "Exploratory Data Analysis",
  "Model Evaluation",
  "Optimization Techniques",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
];

const softSkills = [
  "Analytical Thinking",
  "Continuous Learning",
  "Problem Solving",
  "Curiosity",
  "Adaptability",
  "Growth Mindset",
  "Attention to Detail",
  "Team Collaboration",
  "Communication",
  "Time Management",
  "Self-Learning",
  "Research Skills",
  "Critical Thinking",
  "Responsibility",
  "Initiative",
  "Persistence",
];

const trSoftSkills = [
  "Analitik Düşünme",
  "Sürekli Öğrenme",
  "Problem Çözme",
  "Merak",
  "Uyum Sağlama",
  "Gelişim Zihniyeti",
  "Detaylara Dikkat",
  "Takım Çalışması",
  "İletişim",
  "Zaman Yönetimi",
  "Kendi Kendine Öğrenme",
  "Araştırma Becerisi",
  "Eleştirel Düşünme",
  "Sorumluluk",
  "İnisiyatif",
  "Israr ve Dayanıklılık",
];

const focusAreas = [
  {
    title: "Software and backend",
    icon: Code2,
    tone: "blue" as const,
    body: "Building practical applications with clean APIs, structured code and reliable development habits.",
  },
  {
    title: "AI and machine learning",
    icon: BrainCircuit,
    tone: "violet" as const,
    body: "Exploring model workflows, prediction systems and intelligent features that turn data into useful output.",
  },
  {
    title: "Data thinking",
    icon: Database,
    tone: "cyan" as const,
    body: "Analyzing datasets, preparing data, visualizing patterns and evaluating results with an engineering mindset.",
  },
  {
    title: "Systems foundation",
    icon: Network,
    tone: "emerald" as const,
    body: "Strengthening fundamentals in networking, Linux, cloud concepts and the infrastructure behind modern software.",
  },
];

const timelineItems = [
  {
    period: "Education",
    title: "Computer Engineering foundation",
    description:
      "Built an academic foundation across programming, algorithms, databases, networking and system-oriented thinking.",
    tags: ["Computer Engineering", "Systems Thinking"],
    tone: "blue" as const,
  },
  {
    period: "Applied projects",
    title: "Software, data and machine learning practice",
    description:
      "Developed projects with Python, Flask, REST APIs, SQL, data analysis and machine learning workflows.",
    tags: ["Python", "Flask", "Machine Learning"],
    tone: "violet" as const,
  },
  {
    period: "Engineering growth",
    title: "Research, analysis and continuous learning",
    description:
      "Explored AI systems, code generation models, education ranking prediction, customer analytics and productivity concepts.",
    tags: ["AI & Data", "Research", "Analytics"],
    tone: "cyan" as const,
  },
  {
    period: "Now",
    title: "Intelligent systems portfolio",
    description:
      "Presents a clearer engineering identity: reliable software, data-informed thinking and intelligent systems delivery.",
    tags: ["Software", "Data", "Systems"],
    tone: "emerald" as const,
  },
];

const trProfileCards = [
  {
    title: "Hakkımda",
    body: "Teknolojiye güçlü merakı, pratik problem çözmeyi ve sürekli öğrenmeyi seven bir Bilgisayar Mühendisiyim.",
  },
  {
    title: "Eğitim",
    body: "Bilgisayar Mühendisliği temelim; yazılım, veri, yapay zeka ve sistem teknolojileri arasındaki çalışmalarımı destekliyor.",
  },
  {
    title: "Deneyim",
    body: "Backend uygulamaları, REST API’ler, veri seti analizi, makine öğrenmesi modelleri ve kişisel mühendislik projeleri üzerinde çalıştım.",
  },
];

const trProfessionalSummary = [
  "Teknoloji benim için yalnızca kod yazmak değil; sistemlerin nasıl çalıştığını anlamak, anlamlı problemleri çözmek ve sürekli gelişmektir.",
  "Ana ilgi alanlarım yazılım mühendisliği, veri bilimi, yapay zeka, makine öğrenmesi, backend geliştirme, ağ teknolojileri ve bulut kavramlarını kapsar.",
  "Veriyi içgörüye dönüştürmeyi, ölçeklenebilir uygulamalar geliştirmeyi ve karmaşık sistemlerin arka planda nasıl çalıştığını anlamayı seviyorum.",
  "Uzun vadeli hedefim; akıllı sistemler tasarlayabilen, güvenilir yazılım geliştirebilen ve gerçek değer üreten projelere katkı sağlayan çok yönlü bir mühendis olmak.",
];

const trFocusAreas = [
  {
    title: "Yazılım ve backend",
    body: "Temiz API’ler, düzenli kod yapısı ve güvenilir geliştirme alışkanlıklarıyla pratik uygulamalar geliştirmek.",
  },
  {
    title: "Yapay zeka ve makine öğrenmesi",
    body: "Veriyi yararlı çıktıya dönüştüren model akışlarını, tahmin sistemlerini ve akıllı özellikleri keşfetmek.",
  },
  {
    title: "Veri düşüncesi",
    body: "Veri setlerini analiz etmek, veriyi hazırlamak, desenleri görselleştirmek ve sonuçları mühendislik bakışıyla değerlendirmek.",
  },
  {
    title: "Sistem temeli",
    body: "Ağ, Linux, bulut kavramları ve modern yazılımın arkasındaki altyapı temellerini güçlendirmek.",
  },
];

const trTimelineItems = [
  {
    period: "Eğitim",
    title: "Bilgisayar Mühendisliği temeli",
    description:
      "Programlama, algoritmalar, veritabanları, ağ teknolojileri ve sistem odaklı düşünme üzerinde akademik temel oluşturuldu.",
    tags: ["Bilgisayar Mühendisliği", "Sistem Düşüncesi"],
  },
  {
    period: "Uygulamalı projeler",
    title: "Yazılım, veri ve makine öğrenmesi pratiği",
    description:
      "Python, Flask, REST API, SQL, veri analizi ve makine öğrenmesi akışlarıyla projeler geliştirildi.",
    tags: ["Python", "Flask", "Makine Öğrenmesi"],
  },
  {
    period: "Mühendislik gelişimi",
    title: "Araştırma, analiz ve sürekli öğrenme",
    description:
      "Yapay zeka sistemleri, kod üretim modelleri, eğitim sıralama tahmini, müşteri analitiği ve üretkenlik konseptleri keşfedildi.",
    tags: ["Yapay Zeka & Veri", "Araştırma", "Analitik"],
  },
  {
    period: "Şimdi",
    title: "Akıllı sistemler portfolyosu",
    description:
      "Daha net bir mühendislik kimliği sunar: güvenilir yazılım, veriyle beslenen düşünme ve akıllı sistem geliştirme.",
    tags: ["Yazılım", "Veri", "Sistemler"],
  },
];

const aboutPageCopy = {
  en: {
    eyebrow: "Engineering profile",
    title: "A Computer Engineer focused on practical, intelligent technology.",
    description:
      "This page frames the portfolio as one path: engineering foundations, backend and API work, data analysis, machine learning and system-level curiosity.",
    visualEyebrow: "Visual identity",
    visualTitle:
      "Software, data and intelligent systems in one engineering view.",
    visualDescription:
      "The new visual layer supports the portfolio message without turning the page into only text: systems, dashboards, data signals and glass objects now carry the same premium language.",
    summaryEyebrow: "Professional summary",
    summaryTitle:
      "More than writing code: understanding systems and creating value.",
    timelineEyebrow: "Timeline",
    timelineTitle:
      "A clear path from engineering foundations to AI-focused product work.",
    hardSkillsEyebrow: "Hard skills",
    hardSkillsTitle: "Technical tools and engineering practice.",
    softSkillsEyebrow: "Soft skills",
    softSkillsTitle: "Working habits that support growth.",
  },
  tr: {
    eyebrow: "Mühendislik profili",
    title: "Pratik ve akıllı teknolojiye odaklanan bir Bilgisayar Mühendisi.",
    description:
      "Bu sayfa portfolyoyu tek bir yol olarak çerçeveler: mühendislik temeli, backend ve API çalışmaları, veri analizi, makine öğrenmesi ve sistem merakı.",
    visualEyebrow: "Görsel kimlik",
    visualTitle:
      "Yazılım, veri ve akıllı sistemler tek bir mühendislik bakışında.",
    visualDescription:
      "Yeni görsel katman sayfayı yalnızca metinden ibaret bırakmadan portfolyo mesajını destekler: sistemler, dashboard’lar, veri sinyalleri ve glass objeler aynı premium dili taşır.",
    summaryEyebrow: "Profesyonel özet",
    summaryTitle:
      "Kod yazmanın ötesinde: sistemleri anlamak ve değer üretmek.",
    timelineEyebrow: "Zaman çizelgesi",
    timelineTitle:
      "Mühendislik temelinden yapay zeka odaklı ürün çalışmasına uzanan net bir yol.",
    hardSkillsEyebrow: "Teknik yetkinlikler",
    hardSkillsTitle: "Teknik araçlar ve mühendislik pratiği.",
    softSkillsEyebrow: "Kişisel yetkinlikler",
    softSkillsTitle: "Gelişimi destekleyen çalışma alışkanlıkları.",
  },
} as const;

function getMergedCopyItems<T extends Record<string, unknown>>(
  items: T[],
  translations: Partial<T>[],
  locale: Locale,
) {
  return locale === "tr"
    ? items.map((item, index) => ({ ...item, ...translations[index] }))
    : items;
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const copy = aboutPageCopy[locale] ?? aboutPageCopy[defaultLocale];
  const localizedProfileCards = getMergedCopyItems(
    profileCards,
    trProfileCards,
    locale,
  );
  const localizedFocusAreas = getMergedCopyItems(
    focusAreas,
    trFocusAreas,
    locale,
  );
  const localizedTimelineItems = getMergedCopyItems(
    timelineItems,
    trTimelineItems,
    locale,
  );
  const localizedProfessionalSummary =
    locale === "tr" ? trProfessionalSummary : professionalSummary;
  const localizedSoftSkills = locale === "tr" ? trSoftSkills : softSkills;

  return (
    <main>
      <Section
        className="about-skin section-skin"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {localizedProfileCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal
                delay={index * 0.08}
                direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
                key={card.title}
              >
                <article className="glass-panel h-full rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <IconTile
                    className="mb-5"
                    icon={Icon}
                    iconClassName="size-5"
                    size="xl"
                    tone={card.tone}
                  />
                  <h2 className="text-xl font-semibold tracking-tight">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="about-generated-visual glass-panel mt-8 overflow-hidden rounded-lg">
            <div className="about-generated-visual__media">
              <Image
                src={generatedAssets.profilePremium.src}
                alt={generatedAssets.profilePremium.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="object-cover"
              />
              <div className="about-generated-visual__overlay" />
              <Image
                src={generatedAssets.realisticGlassObject.src}
                alt=""
                width={320}
                height={320}
                aria-hidden="true"
                className="about-generated-visual__object"
              />
            </div>
            <div className="about-generated-visual__copy">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {copy.visualEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                {copy.visualTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                {copy.visualDescription}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {copy.summaryEyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {copy.summaryTitle}
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                {localizedProfessionalSummary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {localizedFocusAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <Reveal delay={index * 0.06} key={area.title}>
                <article className="glass-panel h-full rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <IconTile
                    className="mb-5"
                    icon={Icon}
                    iconClassName="size-5"
                    size="lg"
                    tone={area.tone}
                  />
                  <h2 className="text-base font-semibold tracking-tight">
                    {area.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {area.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {copy.timelineEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                {copy.timelineTitle}
              </h2>
            </div>
            <Timeline items={localizedTimelineItems} />
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <IconTile icon={Code2} iconClassName="size-5" tone="blue" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      {copy.hardSkillsEyebrow}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      {copy.hardSkillsTitle}
                    </h2>
                  </div>
                </div>
                <StaggerList className="flex flex-wrap gap-2">
                  {hardSkills.map((skill) => (
                    <StaggerItem key={skill}>
                      <TechBadge>{skill}</TechBadge>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <IconTile
                    icon={UsersRound}
                    iconClassName="size-5"
                    tone="pink"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                      {copy.softSkillsEyebrow}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      {copy.softSkillsTitle}
                    </h2>
                  </div>
                </div>
                <StaggerList className="flex flex-wrap gap-2">
                  {localizedSoftSkills.map((skill) => (
                    <StaggerItem key={skill}>
                      <TechBadge className="border-accent/25 bg-accent/5 dark:border-accent/30 dark:bg-accent/10">
                        {skill}
                      </TechBadge>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
