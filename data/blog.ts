export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  status: "Draft" | "Published";
  topics: string[];
  hero: {
    label: string;
    metric: string;
  };
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-practical-intelligent-systems",
    title: "Building practical intelligent systems",
    excerpt:
      "A personal note on connecting software engineering, data analysis and machine learning into one practical engineering direction.",
    date: "2026-07-06",
    readTime: "4 min read",
    category: "Engineering Mindset",
    status: "Draft",
    topics: ["Software", "AI", "Data", "Systems"],
    hero: {
      label: "Focus",
      metric: "Software + Data + AI",
    },
    content: [
      "My portfolio is shaped around one idea: useful technology comes from understanding both the software layer and the systems behind it.",
      "I am interested in backend applications, data analysis, machine learning workflows and interfaces that make technical output easier to understand.",
      "This blog will become a space where I write about what I build, what I learn and how I connect different engineering topics into practical projects.",
    ],
  },
  {
    slug: "synthetic-data-as-a-learning-project",
    title: "Synthetic data as a learning project",
    excerpt:
      "How a synthetic data workflow can teach privacy, data quality, model evaluation and practical backend thinking at the same time.",
    date: "2026-07-06",
    readTime: "5 min read",
    category: "AI & Data",
    status: "Draft",
    topics: ["Synthetic Data", "Flask", "Pandas", "Evaluation"],
    hero: {
      label: "Project lens",
      metric: "Data quality",
    },
    content: [
      "Synthetic data is interesting because it connects technical modeling with real privacy concerns.",
      "A strong workflow needs more than data generation. It also needs upload handling, preprocessing, quality comparison and clear output for the user.",
      "For me, this kind of project is valuable because it combines machine learning curiosity with backend structure and product thinking.",
    ],
  },
  {
    slug: "why-backend-fundamentals-still-matter",
    title: "Why backend fundamentals still matter",
    excerpt:
      "A short reflection on APIs, architecture, data flow and why system thinking matters even when building portfolio projects.",
    date: "2026-07-06",
    readTime: "3 min read",
    category: "Backend Systems",
    status: "Draft",
    topics: ["REST API", "Architecture", "Systems", "Learning"],
    hero: {
      label: "Foundation",
      metric: "Clean APIs",
    },
    content: [
      "Backend fundamentals help me understand how applications actually move data, handle rules and stay maintainable over time.",
      "Even small projects become clearer when responsibilities are separated and API behavior is predictable.",
      "This is why I want my portfolio to show not only visual interfaces, but also the system thinking behind the work.",
    ],
  },
];

export const featuredBlogPost = blogPosts[0];
