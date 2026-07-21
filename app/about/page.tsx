import type { Metadata } from "next";
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
import { Timeline } from "@/components/about/timeline";
import { IconTile } from "@/components/shared/icon-tile";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { StaggerItem, StaggerList } from "@/components/shared/stagger-list";
import { TechBadge } from "@/components/shared/tech-badge";

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

export default function AboutPage() {
  return (
    <main>
      <Section
        className="about-skin section-skin"
        eyebrow="Engineering profile"
        title="A Computer Engineer focused on practical, intelligent technology."
        description="This page frames the portfolio as one path: engineering foundations, backend and API work, data analysis, machine learning and system-level curiosity."
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

        <Reveal delay={0.16}>
          <div className="mt-8 glass-panel rounded-lg p-5 md:p-6">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Professional summary
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  More than writing code: understanding systems and creating
                  value.
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                {professionalSummary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {focusAreas.map((area, index) => {
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
                Timeline
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                A clear path from engineering foundations to AI-focused product
                work.
              </h2>
            </div>
            <Timeline items={timelineItems} />
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
                      Hard skills
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      Technical tools and engineering practice.
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
                      Soft skills
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      Working habits that support growth.
                    </h2>
                  </div>
                </div>
                <StaggerList className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
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
