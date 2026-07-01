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
      "A dark-first developer portfolio built with Next.js, motion, project filtering, theme switching and a validated contact workflow.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
      "React Hook Form",
      "Zod",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Portfolio",
    demo: "https://portfolio-tan-theta-86.vercel.app",
    featured: true,
    accent: "blue",
    role: "Frontend Developer",
    year: "2026",
    highlights: [
      "Hydration-safe dark/light theme with responsive navigation",
      "Animated hero, scroll reveal sections and interactive project cards",
      "Searchable project library with reusable TypeScript components",
    ],
    screenshots: [
      {
        title: "Hero surface",
        description:
          "Large typography, glass navigation, glowing background and primary CTA actions.",
      },
      {
        title: "Project explorer",
        description:
          "Search, category filters and animated cards powered by shared project data.",
      },
    ],
  },
  {
    slug: "legacy-data-portfolio",
    title: "Legacy Data Portfolio",
    category: "Portfolio",
    description:
      "A previous portfolio focused on data science, AI systems and analytics case studies with a personal introduction.",
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Data Science"],
    github: "https://github.com/Ede-Rojin-Delibas/Ede-Rojin-Delibas.github.io",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "cyan",
    role: "Portfolio Designer",
    year: "2026",
    highlights: [
      "Introduces a data and AI centered personal brand",
      "Collects selected machine learning and analytics projects",
      "Deployed publicly with GitHub Pages",
    ],
    screenshots: [
      {
        title: "Landing page",
        description:
          "Personal hero section with a data science and AI systems direction.",
      },
      {
        title: "Case study cards",
        description:
          "Project previews for synthetic data, sentiment analysis and customer analytics.",
      },
    ],
  },
  {
    slug: "synthetic-data-generator",
    title: "Synthetic Data Generator",
    category: "AI Systems",
    description:
      "A Flask-based system for generating synthetic datasets, comparing quality metrics and protecting sensitive data workflows.",
    tech: ["Python", "Flask", "SDV", "SDMetrics", "Pandas", "Data Privacy"],
    github: "https://github.com/Ede-Rojin-Delibas/Final-Project",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "indigo",
    role: "Machine Learning Developer",
    year: "2025",
    highlights: [
      "Generates synthetic data from uploaded real datasets",
      "Compares quality with statistical similarity and ML efficacy metrics",
      "Includes user, upload and download flows for a full web workflow",
    ],
    screenshots: [
      {
        title: "Generation workflow",
        description:
          "Dataset upload, model selection and synthetic output preparation.",
      },
      {
        title: "Quality evaluation",
        description:
          "Metric panels for statistical similarity, correlation and category coverage.",
      },
    ],
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "Data Science",
    description:
      "A social media sentiment analysis project that classifies text signals and turns opinion data into readable insights.",
    tech: ["Python", "Jupyter Notebook", "NLP", "Text Classification", "Pandas"],
    github: "https://github.com/Ede-Rojin-Delibas/Sentiment-Analysis",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: false,
    accent: "blue",
    role: "Data Science Developer",
    year: "2025",
    highlights: [
      "Processes social media text for sentiment signals",
      "Uses notebook-based exploration for transparent analysis",
      "Turns unstructured text into portfolio-friendly findings",
    ],
    screenshots: [
      {
        title: "Text pipeline",
        description:
          "Input preparation, sentiment labeling and notebook analysis flow.",
      },
      {
        title: "Insight summary",
        description:
          "Readable output for positive, neutral and negative opinion patterns.",
      },
    ],
  },
  {
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    category: "Machine Learning",
    description:
      "A machine learning case study focused on predicting churn risk and supporting customer retention decisions.",
    tech: [
      "Python",
      "Machine Learning",
      "Jupyter Notebook",
      "Customer Analytics",
      "Model Evaluation",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Machine-Learning",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: false,
    accent: "cyan",
    role: "Machine Learning Developer",
    year: "2025",
    highlights: [
      "Frames churn as a business decision support problem",
      "Uses exploratory analysis to understand customer behavior",
      "Connects model output to retention strategy",
    ],
    screenshots: [
      {
        title: "Customer analysis",
        description:
          "Feature exploration and behavior patterns before modeling.",
      },
      {
        title: "Prediction view",
        description:
          "Risk-oriented output designed to support retention decisions.",
      },
    ],
  },
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Analytics Platform",
    category: "E-commerce",
    description:
      "An exploratory analytics project for understanding customer behavior, product patterns and e-commerce decision signals.",
    tech: ["Python", "EDA", "Data Visualization", "Customer Behavior", "Analytics"],
    github: "https://github.com/Ede-Rojin-Delibas/Ede-Rojin-Delibas.github.io",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "indigo",
    role: "Data Analyst",
    year: "2025",
    highlights: [
      "Uses exploratory data analysis to read customer behavior",
      "Focuses on purchase patterns and e-commerce performance signals",
      "Added with the required /projects/e-commerce-platform dynamic route",
    ],
    screenshots: [
      {
        title: "Behavior overview",
        description:
          "Purchase patterns, customer segments and core commerce metrics.",
      },
      {
        title: "E-commerce signals",
        description:
          "Product, customer and conversion analysis in a case-study format.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
