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
  role: string;
  year: string;
  highlights: string[];
  screenshots: {
    title: string;
    description: string;
  }[];
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
    role: "Frontend Developer",
    year: "2026",
    highlights: [
      "Dark/light theme system with hydration-safe toggles",
      "Animated route transitions, scroll reveals and hover states",
      "Reusable project cards, section layout and tech badges",
    ],
    screenshots: [
      {
        title: "Hero surface",
        description: "Large typography, technical UI panel and CTA actions.",
      },
      {
        title: "Project grid",
        description: "Searchable cards with filters and animated layout changes.",
      },
    ],
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
    role: "UI Engineer",
    year: "2026",
    highlights: [
      "Compact data sections designed for scanning",
      "Motion-led metric cards and responsive layout",
      "Reusable dashboard surface patterns",
    ],
    screenshots: [
      {
        title: "Analytics overview",
        description: "Metric cards, data panels and visual hierarchy.",
      },
      {
        title: "Responsive data cards",
        description: "Dashboard sections adapted for mobile and tablet.",
      },
    ],
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
    role: "Component Designer",
    year: "2026",
    highlights: [
      "Filterable product list and reusable card components",
      "Accessible form states with React Hook Form and Zod",
      "Theme-ready commerce UI structure",
    ],
    screenshots: [
      {
        title: "Product listing",
        description: "Filter controls, product cards and category states.",
      },
      {
        title: "Form workflow",
        description: "Validation feedback and responsive checkout surface.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
