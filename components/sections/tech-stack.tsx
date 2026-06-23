import { Code2, Component, Database, Gauge, Palette, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechBadge } from "@/components/shared/tech-badge";

const techGroups = [
  {
    title: "Framework",
    icon: Code2,
    items: ["Next.js App Router", "React", "TypeScript"],
  },
  {
    title: "Interface",
    icon: Component,
    items: ["Tailwind CSS", "shadcn/ui", "Lucide React"],
  },
  {
    title: "Motion",
    icon: Gauge,
    items: ["Motion", "Scroll reveal", "Hover states"],
  },
  {
    title: "Forms",
    icon: ShieldCheck,
    items: ["React Hook Form", "Zod", "Validation"],
  },
  {
    title: "Design",
    icon: Palette,
    items: ["Dark mode", "Light mode", "Glass UI"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["Project data", "Dynamic routes", "SEO-ready"],
  },
];

export function TechStack() {
  return (
    <Section
      eyebrow="Stack"
      title="A component system that matches the brief."
      description="These badges make the required technologies visible without turning the page into a checklist."
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
