import {
  BrainCircuit,
  Code2,
  Component,
  Database,
  Gauge,
  Network,
} from "lucide-react";
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

export function TechStack() {
  return (
    <Section
      chapter="02"
      eyebrow="Engineering toolkit"
      title="A practical stack for software, data and intelligent systems."
      description="The technologies are grouped by engineering purpose: backend work, data analysis, machine learning, system fundamentals and user-facing delivery."
      className="tech-skin section-skin"
    >
      <div className="mb-6 grid gap-5 md:mb-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal direction="left">
          <div className="glass-panel relative min-h-80 overflow-hidden rounded-lg p-5 md:p-6">
            <div className="tech-pattern-visual absolute inset-0" />
            <div className="technical-grid absolute inset-0 opacity-25" />
            <div className="relative grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Brand icon map
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  Real tool logos for{" "}
                  <AuroraText>software, AI and data</AuroraText>.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  This area now uses recognizable technology logos instead of
                  generic line icons, closer to the GitHub profile style.
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
                Circular progress
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Focus distribution
              </h3>
            </div>
            <div className="grid gap-4">
              {progressItems.map((item) => (
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
        {techGroups.map((group, index) => {
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
