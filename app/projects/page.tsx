import type { Metadata } from "next";
import Image from "next/image";
import { generatedAssets } from "@/data/generated-assets";
import { getI18n } from "@/data/i18n";
import { getLocalizedProjects } from "@/data/localized-content";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse searchable and filterable computer engineering projects across backend development, data analysis, machine learning and intelligent systems.",
};

export default async function ProjectsPage() {
  const locale = await getServerLocale();
  const copy = getI18n(locale).projectsPage;
  const localizedProjects = getLocalizedProjects(locale);

  return (
    <main>
      <Section
        className="projects-library-skin section-skin"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      >
        <Reveal>
          <div className="projects-library-visual glass-panel mb-8 overflow-hidden rounded-lg">
            <div className="projects-library-visual__media">
              <Image
                src={generatedAssets.projectShowcase.src}
                alt={generatedAssets.projectShowcase.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="object-cover"
                priority
              />
              <div className="projects-library-visual__overlay" />
            </div>
            <div className="projects-library-visual__copy">
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
        <ProjectExplorer locale={locale} projects={localizedProjects} />
      </Section>
    </main>
  );
}
