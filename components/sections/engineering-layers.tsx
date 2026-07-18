import { ArrowRight, Braces, Database, Sparkles } from "lucide-react";
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

export function EngineeringLayers() {
  return (
    <Section
      className="story-skin section-skin"
      chapter="04"
      eyebrow="Scroll story"
      title="Three layers turn technical work into a complete portfolio experience."
      description="This section breaks the page rhythm: instead of another card grid, it explains the engineering flow from software foundation to data signals and interface delivery."
      containerSize="wide"
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal direction="left">
          <div className="story-sticky-panel glass-panel rounded-lg p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Portfolio architecture
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Not just pages. A small{" "}
              <AuroraText>engineering narrative</AuroraText>.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              The site works better when every section has a distinct purpose:
              introduction, stack, story, projects, writing and contact.
            </p>

            <div className="story-orbit mt-8" aria-hidden="true">
              <span>Code</span>
              <span>Data</span>
              <span>AI</span>
              <span>UI</span>
            </div>
          </div>
        </Reveal>

        <StaggerList className="grid gap-4" staggerDelay={0.11}>
          {layers.map((layer) => {
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
                Next stop: project cards show how these layers become concrete
                case studies.
              </p>
              <a
                href="#featured-projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Jump to projects
                <ArrowRight className="size-4" />
              </a>
            </div>
          </StaggerItem>
        </StaggerList>
      </div>
    </Section>
  );
}
