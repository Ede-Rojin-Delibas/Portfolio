export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  accent: "blue" | "cyan" | "indigo";
};

export const projects: Project[] = [
  {
    slug: "ede-rojin-portfolio",
    title: "Ede-Rojin Portfolio",
    category: "Portfolio",
    description:
      "A dark-first developer portfolio with responsive sections, theme switching, shadcn/ui components and motion-led interactions.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
      "Zod",
    ],
    github: "https://github.com/",
    demo: "https://ede-rojin.vercel.app/",
    featured: true,
    accent: "blue",
  },
  {
    slug: "interactive-dashboard",
    title: "Interactive Dashboard",
    category: "Dashboard",
    description:
      "A responsive analytics surface with searchable content, animated metric cards and compact data sections.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide", "Motion"],
    github: "https://github.com/",
    demo: "https://example.com/",
    featured: true,
    accent: "cyan",
  },
  {
    slug: "commerce-ui-system",
    title: "Commerce UI System",
    category: "E-commerce",
    description:
      "A component-driven commerce interface with product filters, reusable cards and accessible UI states.",
    tech: ["React", "TypeScript", "shadcn/ui", "React Hook Form", "Zod"],
    github: "https://github.com/",
    demo: "https://example.com/",
    featured: true,
    accent: "indigo",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
