import type { Prisma } from "@prisma/client";
import { generatedAssets, type GeneratedAsset } from "@/data/generated-assets";
import {
  featuredProjects as staticFeaturedProjects,
  projects as staticProjects,
  type Project,
} from "@/data/projects";
import type { Locale } from "@/data/i18n";
import { getLocalizedProject } from "@/data/localized-content";
import { getPrisma } from "@/lib/backend/prisma";

const projectWithRelations = {
  highlights: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  screenshots: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  technologies: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  translations: true,
} satisfies Prisma.ProjectInclude;

type DbProject = Prisma.ProjectGetPayload<{
  include: typeof projectWithRelations;
}>;

function getAccent(value: string): Project["accent"] {
  if (value === "cyan" || value === "indigo") {
    return value;
  }

  return "blue";
}

function getImage(src?: string | null, alt?: string | null): GeneratedAsset | undefined {
  if (!src) {
    return undefined;
  }

  return {
    src,
    alt: alt ?? "Project visual.",
  };
}

function getReviewedProjectTranslation(project: DbProject, locale: Locale) {
  if (locale === "en") {
    return undefined;
  }

  return project.translations.find(
    (translation) =>
      translation.locale === locale && translation.status === "REVIEWED",
  );
}

function mapDbProject(project: DbProject, locale: Locale): Project {
  const image = getImage(project.imageSrc, project.imageAlt);
  const translation = getReviewedProjectTranslation(project, locale);

  return {
    accent: getAccent(project.accent),
    approach: translation?.approach ?? project.approach,
    category: project.category,
    demo: project.demo ?? undefined,
    demoLabel: project.demoLabel ?? undefined,
    description: translation?.description ?? project.description,
    featured: project.featured,
    github: project.github ?? undefined,
    highlights:
      project.highlights.length > 0
        ? project.highlights.map((highlight) => highlight.text)
        : [
            "Problem, process and outcome are documented as a case study.",
            "Technology choices are visible for quick technical review.",
            "The record is managed from the PostgreSQL-backed admin panel.",
          ],
    image,
    outcome: translation?.outcome ?? project.outcome,
    problem: translation?.problem ?? project.problem,
    role: project.role,
    screenshots:
      project.screenshots.length > 0
        ? project.screenshots.map((screenshot) => ({
            title: screenshot.title,
            description: screenshot.description,
            image: getImage(screenshot.imageSrc, screenshot.imageAlt),
          }))
        : [
            {
              title: "Project overview",
              description:
                "High-level project surface generated from the database record.",
              image: image ?? generatedAssets.caseStudyHero,
            },
            {
              title: "Implementation details",
              description:
                "Stack, links and outcome information managed through the admin CMS.",
              image: generatedAssets.projectShowcase,
            },
          ],
    slug: project.slug,
    tech: project.technologies.map((tech) => tech.label),
    title: translation?.title ?? project.title,
    year: project.year,
  };
}

async function readPublishedProjectsFromDb() {
  const prisma = getPrisma();

  return prisma.project.findMany({
    include: projectWithRelations,
    orderBy: [
      {
        featured: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    where: {
      status: "PUBLISHED",
    },
  });
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  try {
    const projects = await readPublishedProjectsFromDb();

    if (projects.length === 0) {
      return staticProjects.map((project) => getLocalizedProject(project, locale));
    }

    return projects.map((project) => {
      const mappedProject = mapDbProject(project, locale);

      return getReviewedProjectTranslation(project, locale)
        ? mappedProject
        : getLocalizedProject(mappedProject, locale);
    });
  } catch {
    return staticProjects.map((project) => getLocalizedProject(project, locale));
  }
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  const projects = await getProjects(locale);
  const featured = projects.filter((project) => project.featured);

  if (featured.length > 0) {
    return featured;
  }

  return staticFeaturedProjects.map((project) => getLocalizedProject(project, locale));
}

export async function getProjectBySlug(slug: string, locale: Locale) {
  const projects = await getProjects(locale);

  return projects.find((project) => project.slug === slug);
}

export async function getProjectStaticParams() {
  try {
    const projects = await readPublishedProjectsFromDb();

    if (projects.length === 0) {
      return staticProjects.map((project) => ({ slug: project.slug }));
    }

    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    return staticProjects.map((project) => ({ slug: project.slug }));
  }
}
