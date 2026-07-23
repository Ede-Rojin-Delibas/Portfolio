import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getI18n } from "@/data/i18n";
import { getLocalizedFeaturedProjects } from "@/data/localized-content";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { WheelScroll } from "@/components/shared/wheel-scroll";
import { Button } from "@/components/ui/button";
import { getServerLocale } from "@/lib/server-locale";

export async function FeaturedProjects() {
  const locale = await getServerLocale();
  const copy =
    locale === "tr"
      ? {
          eyebrow: "Seçili sistemler",
          title: "Yazılım, veri ve akıllı sistemler üzerine vaka çalışmaları.",
          description:
            "Her kart pratik bir mühendislik problemini anlatır: neyi çözdüğü, hangi araçları kullandığı ve çalışmanın gerçek dünyadaki değere nasıl bağlandığı.",
          browse: "Tüm projeleri gör",
        }
      : {
          eyebrow: "Selected systems",
          title: "Case studies in software, data and intelligent systems.",
          description:
            "Each card presents one practical engineering problem: what it solves, which tools it uses, and how the work connects to real-world value.",
          browse: "Browse all projects",
        };
  const categoryCopy = getI18n(locale).projectExplorer;
  const showcaseProjects = getLocalizedFeaturedProjects(locale).slice(0, 5);

  return (
    <Section
      id="featured-projects"
      className="projects-showcase-skin section-skin"
      chapter="05"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <WheelScroll className="project-scroll-shell project-scroll-shell--featured">
        <div
          className="project-scroll-track"
          aria-label={categoryCopy.searchLabel}
        >
          {showcaseProjects.map((project, index) => (
            <Reveal
              className="project-scroll-item"
              delay={index * 0.08}
              direction={index % 2 === 0 ? "left" : "right"}
              key={project.slug}
            >
              <ProjectCard {...project} compactPreview locale={locale} />
            </Reveal>
          ))}
        </div>
      </WheelScroll>

      <Reveal delay={0.18}>
        <div className="mt-8 flex justify-center md:justify-start">
          <Button asChild variant="outline" className="rounded-md">
            <Link href="/projects">
              {copy.browse}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
