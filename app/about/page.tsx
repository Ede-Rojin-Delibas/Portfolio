import { BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";

const profileCards = [
  {
    title: "About me",
    icon: Sparkles,
    body: "I focus on frontend interfaces that feel clear, responsive and intentional. I like combining visual polish with reusable component systems.",
  },
  {
    title: "Education",
    icon: GraduationCap,
    body: "I keep improving my frontend foundation through project-based learning, UI research and modern React/Next.js practices.",
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
    body: "This portfolio is shaped like a product surface: routing, theme handling, motion, project data and responsive layouts work together.",
  },
];

const skills = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Motion",
  "Responsive Design",
  "React Hook Form",
  "Zod",
  "Component Architecture",
];

export default function AboutPage() {
  return (
    <main>
      <Section
        eyebrow="About"
        title="A frontend developer profile with motion, structure and a clear learning path."
        description="This page turns the basic about content into scannable sections: who I am, how I learn, what I have built and which skills shape the work."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {profileCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal
                delay={index * 0.08}
                direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
                key={card.title}
              >
                <article className="glass-panel h-full rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="mb-5 grid size-11 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
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

        <Reveal delay={0.18}>
          <div className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Skills
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Tools and habits I want the portfolio to prove.
                </h2>
              </div>

              <StaggerList className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <TechBadge>{skill}</TechBadge>
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
