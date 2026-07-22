import { generatedAssets, type GeneratedAsset } from "@/data/generated-assets";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  status: "Draft" | "Published";
  tone: "blue" | "cyan" | "emerald" | "violet" | "pink" | "amber" | "slate";
  topics: string[];
  hero: {
    label: string;
    metric: string;
  };
  image: GeneratedAsset;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-practical-intelligent-systems",
    title: "Building Practical Intelligent Systems",
    excerpt:
      "How software engineering, data analysis and machine learning can work together as one practical engineering direction.",
    date: "2026-07-21",
    readTime: "5 min read",
    category: "AI Systems",
    status: "Published",
    tone: "blue",
    topics: ["Software", "AI", "Data", "Systems"],
    hero: {
      label: "Focus",
      metric: "Software + Data + AI",
    },
    image: generatedAssets.mlArticleVisual,
    content: [
      "Practical intelligent systems are not created by adding an AI label to a project. They are built when software, data and user needs are connected with a clear engineering purpose.",
      "The software layer gives the system structure. It defines how data moves, how users interact with the product and how the application remains maintainable as new features are added.",
      "The data layer gives the system evidence. Good analysis helps reveal patterns, risks and opportunities before a model is introduced. Without this layer, machine learning can become guesswork.",
      "The intelligent layer should improve a real workflow. A useful model predicts, recommends, classifies or summarizes something that helps a person make a better decision.",
      "For me, this is the portfolio direction I want to grow into: reliable software, thoughtful data work and intelligent features that create clear value.",
    ],
  },
  {
    slug: "turning-data-into-engineering-decisions",
    title: "Turning Data into Engineering Decisions",
    excerpt:
      "A practical approach to moving from raw datasets to insight, feature choices and product direction.",
    date: "2026-07-21",
    readTime: "5 min read",
    category: "Data",
    status: "Published",
    tone: "cyan",
    topics: ["EDA", "Pandas", "Visualization", "Decision Making"],
    hero: {
      label: "Data lens",
      metric: "Insight before output",
    },
    image: generatedAssets.dataAnalysisCover,
    content: [
      "Data becomes valuable when it changes a decision. A chart is useful only if it helps a team understand what is happening and what should happen next.",
      "Exploratory data analysis is the first engineering step. It helps identify missing values, outliers, distributions, relationships and signals that may guide later modeling work.",
      "A good data workflow should also communicate uncertainty. Not every pattern is strong enough to become a feature, and not every metric explains the full situation.",
      "When data work is connected to product thinking, it becomes easier to prioritize what to build. The goal is not to show every possible chart, but to reveal what matters.",
      "This is why I see data analysis as part of engineering: it turns technical information into practical direction.",
    ],
  },
  {
    slug: "machine-learning-workflows-that-stay-understandable",
    title: "Machine Learning Workflows That Stay Understandable",
    excerpt:
      "Why preprocessing, evaluation and clear communication matter as much as model selection.",
    date: "2026-07-21",
    readTime: "6 min read",
    category: "Machine Learning",
    status: "Published",
    tone: "violet",
    topics: ["Machine Learning", "Preprocessing", "Evaluation", "Scikit-learn"],
    hero: {
      label: "ML workflow",
      metric: "Readable models",
    },
    image: generatedAssets.machineLearningWorkflow,
    content: [
      "A machine learning workflow should be understandable from input to result. If the steps are unclear, even a good score can be difficult to trust.",
      "Preprocessing is where many important decisions happen. Handling missing values, encoding categories, scaling features and splitting data correctly can change the quality of the final model.",
      "Model evaluation should answer more than one question. Accuracy may be useful, but precision, recall, error analysis and confusion matrices often explain the real behavior better.",
      "The best workflow is not always the most complex one. A simple baseline can reveal whether a more advanced method is actually adding value.",
      "For portfolio projects, I want machine learning to be visible as a thoughtful process, not only as a final prediction.",
    ],
  },
  {
    slug: "why-backend-fundamentals-still-matter",
    title: "Why Backend Fundamentals Still Matter",
    excerpt:
      "APIs, architecture, data flow and why system thinking matters even when building portfolio projects.",
    date: "2026-07-21",
    readTime: "4 min read",
    category: "Backend Systems",
    status: "Published",
    tone: "emerald",
    topics: ["REST API", "Architecture", "Systems", "Learning"],
    hero: {
      label: "Foundation",
      metric: "Clean APIs",
    },
    image: generatedAssets.backendSystems,
    content: [
      "Backend fundamentals help me understand how applications actually move data, handle rules and stay maintainable over time.",
      "Even small projects become clearer when responsibilities are separated and API behavior is predictable. A clean route, a clear service layer and consistent responses make the whole system easier to extend.",
      "APIs are also communication tools. They define how the frontend, database and external services talk to each other.",
      "When a backend is designed carefully, debugging becomes less painful and new features feel less risky.",
      "This is why I want my portfolio to show not only visual interfaces, but also the system thinking behind the work.",
    ],
  },
  {
    slug: "architecture-is-a-learning-tool",
    title: "Architecture Is a Learning Tool",
    excerpt:
      "How architectural thinking helps organize code, reduce confusion and explain engineering decisions.",
    date: "2026-07-21",
    readTime: "5 min read",
    category: "Architecture",
    status: "Published",
    tone: "slate",
    topics: ["Architecture", "OOP", "Maintainability", "Clean Code"],
    hero: {
      label: "Architecture",
      metric: "Structure creates clarity",
    },
    image: generatedAssets.architectureCover,
    content: [
      "Architecture can sound like something only large teams need, but it is also a learning tool for individual projects.",
      "When code has structure, it becomes easier to understand where each responsibility belongs. Data access, business logic, validation and presentation should not all live in the same place.",
      "Good architecture does not mean overengineering. It means choosing enough structure to make the project understandable and flexible.",
      "Patterns such as layered architecture or clean separation of concerns help a developer explain not only what was built, but why it was built that way.",
      "For me, architecture is a way to think more clearly and communicate engineering choices with confidence.",
    ],
  },
  {
    slug: "career-management-for-growing-engineers",
    title: "Career Management for Growing Engineers",
    excerpt:
      "A practical reflection on learning direction, project choices and building a professional engineering identity.",
    date: "2026-07-21",
    readTime: "5 min read",
    category: "Career Management",
    status: "Published",
    tone: "pink",
    topics: ["Career", "Learning", "Portfolio", "Growth Mindset"],
    hero: {
      label: "Career",
      metric: "Learn with direction",
    },
    image: generatedAssets.careerGrowth,
    content: [
      "Career management starts with understanding what kind of engineer you are becoming. Without direction, learning can turn into collecting random tools.",
      "A strong portfolio should show a pattern. It should help someone understand your interests, your problem-solving style and the type of work you want to do next.",
      "Projects are one of the best ways to manage growth because they turn learning into evidence. A finished project shows discipline, technical ability and communication.",
      "It is also important to review progress regularly. Which topics keep appearing? Which skills need deeper practice? Which projects communicate the strongest version of your engineering identity?",
      "My goal is to grow as a versatile engineer: someone who can write code, analyze data, understand systems and keep improving with purpose.",
    ],
  },
  {
    slug: "it-foundations-behind-modern-software",
    title: "IT Foundations Behind Modern Software",
    excerpt:
      "Why networking, Linux, cloud concepts and infrastructure awareness make software engineers stronger.",
    date: "2026-07-21",
    readTime: "4 min read",
    category: "IT & Systems",
    status: "Published",
    tone: "amber",
    topics: ["Networking", "Linux", "Cloud", "Infrastructure"],
    hero: {
      label: "Systems",
      metric: "Software needs infrastructure",
    },
    image: generatedAssets.itSystems,
    content: [
      "Modern software does not run in isolation. It depends on networks, servers, operating systems, databases and deployment environments.",
      "Understanding IT foundations helps engineers ask better questions. Where is the application hosted? How does traffic reach it? What happens when a request fails?",
      "Linux skills are especially valuable because many development and deployment environments are built around Unix-like systems.",
      "Cloud concepts also help connect code to real delivery. Storage, compute, networking and monitoring all influence how reliable a product becomes.",
      "These foundations make software engineering more complete because they reveal the environment behind the application.",
    ],
  },
  {
    slug: "from-projects-to-product-thinking",
    title: "From Projects to Product Thinking",
    excerpt:
      "How to make portfolio projects feel more useful by focusing on problem, process and outcome.",
    date: "2026-07-21",
    readTime: "5 min read",
    category: "Product Thinking",
    status: "Published",
    tone: "blue",
    topics: ["Projects", "Product", "UX", "Engineering"],
    hero: {
      label: "Product lens",
      metric: "Problem -> Process -> Outcome",
    },
    image: generatedAssets.projectShowcase,
    content: [
      "A project becomes more impressive when it explains the problem it solves. The visitor should quickly understand why the project exists.",
      "The process matters too. What data was used? Which technologies were chosen? What tradeoffs appeared? These details make the project feel real.",
      "Outcome is the final layer. A portfolio card should not only list tools; it should explain what the work produced and what was learned.",
      "Product thinking helps technical projects become easier to evaluate. It connects implementation to user value.",
      "This is the direction I want for my own portfolio: each project should feel like a small case study, not just a screenshot with a tech stack.",
    ],
  },
];

export const featuredBlogPost = blogPosts[0];
