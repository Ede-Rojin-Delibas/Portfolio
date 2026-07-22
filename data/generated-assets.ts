export type GeneratedAsset = {
  src: string;
  alt: string;
};

const basePath = "/images/generated-images";

export const generatedAssets = {
  auroraBackground: {
    src: `${basePath}/a-dark-aurora-inspired-abstract-3d-background-for-.png`,
    alt: "Dark cyan and violet aurora waves.",
  },
  analyticsPanels: {
    src: `${basePath}/a-futuristic-ai-analytics-dashboard-interface-pane.png`,
    alt: "Floating AI analytics dashboard panels with charts and network nodes.",
  },
  saasDashboard: {
    src: `${basePath}/a-futuristic-ai-saas-dashboard-interface-panel--da.png`,
    alt: "Futuristic AI SaaS dashboard interface panels.",
  },
  crystalObject: {
    src: `${basePath}/a-premium-abstract-3d-crystal-object-floating-in-e.png`,
    alt: "Premium abstract crystal glass object.",
  },
  glassObject: {
    src: `${basePath}/a-premium-abstract-3d-glass-object-floating-in-emp.png`,
    alt: "Premium abstract blue and violet glass object.",
  },
  lightDataMesh: {
    src: `${basePath}/a-soft-mesh-gradient-background-for-a-data-visuali.png`,
    alt: "Soft light mesh gradient with data-inspired dot patterns.",
  },
  scrollytellingFlow: {
    src: `${basePath}/a-tall-abstract-webgl-inspired-scrollytelling-back.png`,
    alt: "Tall light cyan and pink scrollytelling flow background.",
  },
  neuralBanner: {
    src: `${basePath}/a-wide-thin-abstract-banner-of-a-neural-network-re.png`,
    alt: "Wide cyan and violet neural network wave banner.",
  },
  backendSystems: {
    src: `${basePath}/backend-systems-visual--abstract-server-nodes--api.png`,
    alt: "Abstract backend systems visual with server nodes, API routes and green signal lights.",
  },
  caseStudyHero: {
    src: `${basePath}/case-study-hero-image-for-a-software-project-detai.png`,
    alt: "Premium software project case study hero with dark interface panels.",
  },
  dataAnalysisCover: {
    src: `${basePath}/data-analysis-blog-cover--soft-light-background--f.png`,
    alt: "Soft light data analysis visual with glass charts and green data signals.",
  },
  editorialBlogCover: {
    src: `${basePath}/editorial-cover-visual-for-a-technical-blog-page--.png`,
    alt: "Editorial technical blog cover with translucent engineering layers.",
  },
  engineeringWorkspace: {
    src: `${basePath}/futuristic-engineering-workspace-scene-with-a-floa.png`,
    alt: "Futuristic engineering workspace with floating glass panels and warm reflections.",
  },
  itSystems: {
    src: `${basePath}/it-systems-visual--abstract-cloud-infrastructure--.png`,
    alt: "Abstract IT systems visual with cloud infrastructure and connected server nodes.",
  },
  machineLearningPipeline: {
    src: `${basePath}/machine-learning-project-visual--a-glowing-data-pi.png`,
    alt: "Glowing machine learning data pipeline with model nodes and cyan light trails.",
  },
  machineLearningWorkflow: {
    src: `${basePath}/machine-learning-workflow-visual--dataset-particle.png`,
    alt: "Machine learning workflow visual with dataset particles and model evaluation layers.",
  },
  mlArticleVisual: {
    src: `${basePath}/premium-abstract-visual-for-a-blog-article-about-m.png`,
    alt: "Premium abstract machine learning article visual with glass panels and data paths.",
  },
  contactPremium: {
    src: `${basePath}/premium-contact-page-visual-for-a-computer-enginee.png`,
    alt: "Premium contact page visual with a glass engineering object and soft warm glow.",
  },
  projectShowcase: {
    src: `${basePath}/premium-project-showcase-visual-for-a-software-eng.png`,
    alt: "Premium software engineering project showcase visual with layered product panels.",
  },
  realisticGlassObject: {
    src: `${basePath}/premium-realistic-3d-glass-object-for-a-computer-e.png`,
    alt: "Realistic premium 3D glass object for a computer engineering portfolio.",
  },
  profilePremium: {
    src: `${basePath}/premium-visual-for-a-computer-engineer-profile-pag.png`,
    alt: "Premium computer engineer profile visual with glass systems, soft green light and clean workspace tones.",
  },
  careerGrowth: {
    src: `${basePath}/professional-career-growth-visual-for-a-software-e.png`,
    alt: "Professional career growth visual with a soft engineering path and light interface elements.",
  },
  developerWorkspace: {
    src: `${basePath}/realistic-modern-developer-project-workspace--a-la.png`,
    alt: "Realistic modern developer workspace with laptop, code interface and warm premium lighting.",
  },
  engineeringIdentity: {
    src: `${basePath}/semi-realistic-engineering-identity-visual--floati.png`,
    alt: "Semi-realistic engineering identity visual with floating translucent interface elements.",
  },
  lightDataVisualization: {
    src: `${basePath}/soft-light-mode-abstract-data-visualization-backgr.png`,
    alt: "Soft light mode data visualization background with calm pastel engineering signals.",
  },
  architectureCover: {
    src: `${basePath}/software-architecture-blog-cover--layered-transluc.png`,
    alt: "Software architecture cover with layered translucent system blocks and clean light tones.",
  },
} satisfies Record<string, GeneratedAsset>;
