import {
  BrainCircuit,
  Code2,
  Component,
  Database,
  Gauge,
  Network,
} from "lucide-react";
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

export function TechStack() {
  return (
    <Section
      eyebrow="Engineering toolkit"
      title="A practical stack for software, data and intelligent systems."
      description="The technologies are grouped by engineering purpose: backend work, data analysis, machine learning, system fundamentals and user-facing delivery."
      className="pt-8"
    >
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
                  <h3 className="font-semibold tracking-tight">{group.title}</h3>
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
