export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
  accent: "blue" | "cyan" | "indigo";
  image?: {
    src: string;
    alt: string;
  };
  role: string;
  year: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
  screenshots: {
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
  }[];
};

export const projects: Project[] = [
  {
    slug: "ede-rojin-portfolio",
    title: "Ede-Rojin Portfolio",
    category: "Portfolio",
    description:
      "A dark-first intelligent systems portfolio built with Next.js, motion, project filtering, theme switching and a validated contact workflow.",
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
    image: {
      src: "/images/projects/ede-rojin-portfolio/hero.svg",
      alt: "Preview of the personal portfolio experience with animated project cards and deep blue UI",
    },
    role: "Portfolio Developer",
    year: "2026",
    problem:
      "A portfolio needed to present technical skills, project work and contact flow in one polished experience.",
    approach:
      "Built a responsive Next.js interface with shared project data, animated sections, theme support and validated form handling.",
    outcome:
      "Built a searchable and responsive project showcase with theme switching and a validated contact flow.",
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
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Data Analysis"],
    github: "https://github.com/Ede-Rojin-Delibas/Ede-Rojin-Delibas.github.io",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "cyan",
    image: {
      src: "/images/projects/legacy-data-portfolio/hero.svg",
      alt: "Preview of the legacy data portfolio landing page and project cards",
    },
    role: "Portfolio Designer",
    year: "2026",
    problem:
      "Earlier work needed a public portfolio surface to introduce data and AI interests.",
    approach:
      "Organized selected analytics and machine learning projects into a simple GitHub Pages portfolio.",
    outcome:
      "Created a public portfolio foundation that now informs the new professional case-study structure.",
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
    category: "AI & Data",
    description:
      "A Flask-based system for generating synthetic datasets, comparing quality metrics and protecting sensitive data workflows.",
    tech: ["Python", "Flask", "SDV", "SDMetrics", "Pandas", "Data Privacy"],
    github: "https://github.com/Ede-Rojin-Delibas/Final-Project",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "indigo",
    image: {
      src: "/images/projects/synthetic-data-generator/data1.jpg",
      alt: "Preview of the synthetic data generator workflow dashboard",
    },
    role: "Machine Learning Developer",
    year: "2025",
    problem:
      "Working with sensitive datasets can be risky when teams need realistic data for analysis and testing.",
    approach:
      "Designed a Flask-based workflow for uploading datasets, generating synthetic data and comparing quality metrics.",
    outcome:
      "Produced a full synthetic data workflow with generation, evaluation and downloadable outputs.",
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
    category: "AI & Data",
    description:
      "A social media sentiment analysis project that classifies text signals and turns opinion data into readable insights.",
    tech: [
      "Python",
      "Jupyter Notebook",
      "NLP",
      "Text Classification",
      "Pandas",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Sentiment-Analysis",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: false,
    accent: "blue",
    image: {
      src: "/images/projects/sentiment-analysis/sentiments.png",
      alt: "Preview of the sentiment analysis project interface",
    },
    role: "AI & Data Developer",
    year: "2025",
    problem:
      "Unstructured social media text is difficult to read quickly without automated sentiment signals.",
    approach:
      "Prepared a notebook-based NLP workflow for text processing, classification and insight extraction.",
    outcome:
      "Turned raw text into readable sentiment categories and analysis notes for portfolio presentation.",
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
    category: "AI & Data",
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
    image: {
      src: "/images/projects/churn-prediction/churn.jpg",
      alt: "Customer churn prediction dashboard preview",
    },
    role: "Machine Learning Developer",
    year: "2025",
    problem:
      "Customer churn decisions need clearer signals about which users may leave and why.",
    approach:
      "Used exploratory analysis and machine learning practice to frame churn as a decision-support problem.",
    outcome:
      "Created a churn prediction case study focused on behavior patterns, risk signals and retention thinking.",
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
    category: "AI & Data",
    description:
      "An exploratory analytics project for understanding customer behavior, product patterns and e-commerce decision signals.",
    tech: [
      "Python",
      "EDA",
      "Data Visualization",
      "Customer Behavior",
      "Analytics",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Ede-Rojin-Delibas.github.io",
    demo: "https://ede-rojin-delibas.github.io/",
    featured: true,
    accent: "indigo",
    image: {
      src: "/images/projects/e-commerce-platform/eda.jpg",
      alt: "Preview of the e-commerce analytics platform dashboard concept",
    },
    role: "Data Analyst",
    year: "2025",
    problem:
      "E-commerce behavior data can hide useful product, customer and purchase patterns.",
    approach:
      "Applied exploratory data analysis and visualization concepts to identify commerce signals.",
    outcome:
      "Built a required dynamic project route with an analytics case study around customer behavior.",
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
  {
    slug: "remote-work-calendar",
    title: "Remote Work Calendar Assistant",
    category: "Productivity Systems",
    description:
      "A remote work productivity assistant with daily goals, smart time blocks, focus routines and progress reporting ideas.",
    tech: [
      "JavaScript",
      "Productivity UX",
      "Time Blocking",
      "Pomodoro",
      "AI Suggestions",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Calendar",
    demo: "https://github.com/Ede-Rojin-Delibas/Calendar",
    demoLabel: "Project README",
    featured: false,
    accent: "blue",
    image: {
      src: "/images/projects/remote-work-calendar/calendar.jpg",
      alt: "Preview of the remote work calendar assistant experience",
    },
    role: "Product Developer",
    year: "2026",
    problem:
      "Remote workers need clearer structure around goals, time blocks and focus routines.",
    approach:
      "Designed productivity concepts around daily planning, Pomodoro routines, mood and progress reporting.",
    outcome:
      "Outlined a remote work assistant concept that connects planning UX with AI-assisted focus suggestions.",
    highlights: [
      "Plans daily work with goals, tasks and time blocks",
      "Explores AI-assisted focus, mood and energy recommendations",
      "Frames remote work productivity as a user-centered workflow",
    ],
    screenshots: [
      {
        title: "Planning surface",
        description:
          "Daily goals, todos and suggested work blocks for remote routines.",
      },
      {
        title: "Focus assistant",
        description:
          "Pomodoro, energy tracking and weekly progress report concepts.",
      },
    ],
  },
  {
    slug: "code-generation-models",
    title: "Code Generation Models",
    category: "AI & Data",
    description:
      "A research-style project for curating permissive GitHub code and fine-tuning open-source code generation models.",
    tech: [
      "Python",
      "LLM Fine-Tuning",
      "LoRA",
      "PEFT",
      "Streamlit",
      "Evaluation",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Code-Generation-Models",
    demo: "https://github.com/Ede-Rojin-Delibas/Code-Generation-Models",
    demoLabel: "Project README",
    featured: true,
    accent: "cyan",
    image: {
      src: "/images/projects/code-generation-models/code.png",
      alt: "Preview of the code generation models dataset and fine-tuning workflow",
    },
    role: "AI Developer",
    year: "2025",
    problem:
      "Code generation models need curated data, fine-tuning plans and evaluation steps to be useful.",
    approach:
      "Explored permissive code collection, preprocessing, LoRA/PEFT fine-tuning concepts and demo planning.",
    outcome:
      "Documented an AI workflow for code model experimentation from dataset pipeline to evaluation.",
    highlights: [
      "Curates permissively licensed GitHub code for model training",
      "Uses fine-tuning concepts such as PEFT and LoRA",
      "Includes evaluation and demo planning for code generation quality",
    ],
    screenshots: [
      {
        title: "Dataset pipeline",
        description:
          "Repository ingestion, preprocessing and provenance-aware dataset flow.",
      },
      {
        title: "Model workflow",
        description:
          "Fine-tuning, evaluation and demo structure for a code LLM project.",
      },
    ],
  },
  {
    slug: "yks-ranking-predictor",
    title: "YKS Ranking Predictor",
    category: "AI & Data",
    description:
      "A machine learning system that estimates exam ranking from trial exam net scores for Turkish university exam preparation.",
    tech: [
      "Python",
      "Pandas",
      "Machine Learning",
      "API",
      "Education Analytics",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/TEKNOFEST",
    demo: "https://github.com/Ede-Rojin-Delibas/TEKNOFEST",
    demoLabel: "Project README",
    featured: false,
    accent: "indigo",
    image: {
      src: "/images/projects/yks-ranking-predictor/dash.png",
      alt: "Preview of the YKS ranking predictor dashboard",
    },
    role: "Machine Learning Developer",
    year: "2025",
    problem:
      "Students preparing for YKS need a practical way to estimate ranking from trial exam net scores.",
    approach:
      "Modeled ranking prediction around TYT/AYT inputs and education performance data.",
    outcome:
      "Built an education analytics case study with API-oriented prediction logic.",
    highlights: [
      "Supports score prediction from TYT and AYT net values",
      "Uses past exam data to model education performance signals",
      "Packages the prediction logic as an API-oriented system",
    ],
    screenshots: [
      {
        title: "Prediction input",
        description:
          "Exam net fields and branch-specific inputs for ranking estimation.",
      },
      {
        title: "Model output",
        description:
          "Estimated ranking result designed for student decision support.",
      },
    ],
  },
  {
    slug: "onion-architecture-api",
    title: "Onion Architecture API",
    category: "Backend Systems",
    description:
      "A C# and ASP.NET project collection for practicing layered backend design with Onion Architecture principles.",
    tech: [
      "C#",
      "ASP.NET",
      "Onion Architecture",
      "API Design",
      "Entity Models",
    ],
    github: "https://github.com/Ede-Rojin-Delibas/Onion-Architecture",
    demo: "https://github.com/Ede-Rojin-Delibas/Onion-Architecture",
    demoLabel: "Project README",
    featured: false,
    accent: "blue",
    image: {
      src: "/images/projects/onion-architecture/web-architecture.jpg",
      alt: "Preview of the onion architecture backend project structure",
    },
    role: "Backend Developer",
    year: "2025",
    problem:
      "Backend practice needs clear separation between domain, application and infrastructure concerns.",
    approach:
      "Practiced C# and ASP.NET examples using Onion Architecture principles and entity-based API structure.",
    outcome:
      "Created a backend architecture case study that demonstrates layered system thinking.",
    highlights: [
      "Separates domain, application and infrastructure responsibilities",
      "Practices API structure through different model examples",
      "Shows backend fundamentals beyond frontend and data projects",
    ],
    screenshots: [
      {
        title: "Layered structure",
        description:
          "Domain, service and API folders organized around separation of concerns.",
      },
      {
        title: "API practice",
        description:
          "Entity models and endpoints used to practice backend architecture.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
