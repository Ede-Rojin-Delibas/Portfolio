export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "portfolio-locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const i18n = {
  en: {
    language: {
      label: "Language",
      current: "EN",
      next: "TR",
      title: "Switch language",
      ariaLabel: "Switch language to Turkish",
    },
    navbar: {
      brandSubtitle: "Intelligent systems",
      cta: "Let's talk",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      mobileCta: "Start a conversation",
      items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    footer: {
      brandTitle: "Ede-Rojin Systems",
      brandSubtitle: "Computer engineering portfolio",
      description:
        "Computer engineering portfolio for practical software, backend systems, data analysis, machine learning and intelligent technology solutions.",
      stats: [
        { label: "Case studies", value: "10" },
        { label: "Focus areas", value: "4" },
        { label: "Open to build", value: "Now" },
      ],
      explore: "Explore",
      nav: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
      locationTitle: "Remote-friendly",
      locationBody:
        "Based in Turkiye, open to software, AI and data-focused collaborations.",
      social: {
        oldPortfolio: "Old Portfolio",
        contact: "Contact",
      },
      closing: "Built for clarity, continuous learning and practical impact.",
    },
    projectsPage: {
      eyebrow: "Systems library",
      title: "Project case studies across software, AI, data and systems.",
      description:
        "Search and filter the work by category, title, stack or description. Each card is framed around the problem, the engineering approach and the value of the output.",
      visualEyebrow: "Case-study system",
      visualTitle:
        "Filter the work by what it proves: software, data, AI and systems thinking.",
      visualDescription:
        "The project library now uses stronger visual covers so each case study feels intentional before the visitor opens the detail page.",
    },
    projectExplorer: {
      searchLabel: "Search projects",
      resultsLabel: (shown: number, total: number) =>
        `${shown} of ${total} projects shown`,
      categoriesLabel: (count: number) => `${count} categories`,
      reset: "Reset",
      searchPlaceholder: "Search projects...",
      searchPrefix: "Search",
      dynamicLabel: "Dynamic search lane",
      dynamicDescription:
        "This temporary category is created from your current search and matches project titles, descriptions, outcomes and tech stacks.",
      matches: "matches",
      empty: "No projects matched that search. Try another keyword or category.",
      recommendedEyebrow: "Recommended next",
      recommendedTitle: "Related projects you may want to compare.",
      recommendedDescription:
        "These are selected from shared categories, similar technologies and the words in your current search.",
      categoryLabels: {
        All: "All",
      },
      categoryAliases: {
        Portfolio: "portfolio personal showcase portfolyo kisisel site",
        "AI & Data":
          "ai artificial intelligence data machine learning ml yapay zeka veri makine ogrenmesi analiz",
        "Productivity Systems":
          "productivity calendar assistant verimlilik takvim asistan planlama",
        "Backend Systems":
          "backend api server systems architecture sunucu sistem mimari",
      },
    },
    blogPage: {
      eyebrow: "Engineering notes",
      title: "Writing about software, data, AI and the systems behind them.",
      description:
        "Short English articles about engineering growth, data analysis, machine learning, architecture, IT foundations and product-minded software work.",
      featuredArticle: "Featured article",
      sideCards: [
        {
          label: "Articles",
          value: "8",
          detail: "English posts aligned with the portfolio identity.",
        },
        {
          label: "Main topics",
          value: "8",
          detail: "Career, data, AI, ML, systems, architecture and IT.",
        },
        {
          label: "Format",
          value: "Static",
          detail: "Fast, SEO-friendly and easy to maintain.",
        },
      ],
    },
    blogExplorer: {
      searchLabel: "Search articles",
      resultsLabel: (shown: number, total: number) =>
        `${shown} of ${total} articles shown`,
      categoriesLabel: (count: number) => `${count} categories`,
      reset: "Reset",
      searchPlaceholder: "Search blog posts...",
      searchPrefix: "Search",
      dynamicLabel: "Dynamic reading lane",
      dynamicDescription:
        "This temporary category is created from your search and scans article titles, topics, summaries and content.",
      matches: "matches",
      empty: "No blog posts matched that search. Try another keyword or category.",
      recommendedEyebrow: "Recommended next",
      recommendedTitle: "Related articles to keep the reading path alive.",
      recommendedDescription:
        "These suggestions are selected from shared categories, overlapping topics and the words in your current search.",
      categoryLabels: {
        All: "All",
      },
      categoryAliases: {
        "AI Systems": "ai artificial intelligence systems yapay zeka sistemler",
        Data: "data veri analysis analiz eda visualization gorsellestirme",
        "Machine Learning":
          "machine learning ml makine ogrenmesi model preprocessing evaluation",
        "Backend Systems": "backend api systems sunucu sistemler",
        Architecture: "architecture mimari oop clean code temiz kod",
        "Career Management": "career kariyer growth gelisim learning ogrenme",
        "IT & Systems": "it systems networking linux cloud ag sistem bulut",
        "Product Thinking": "product urun ux problem outcome surec",
      },
    },
  },
  tr: {
    language: {
      label: "Dil",
      current: "TR",
      next: "EN",
      title: "Dili değiştir",
      ariaLabel: "Dili İngilizce olarak değiştir",
    },
    navbar: {
      brandSubtitle: "Akıllı sistemler",
      cta: "Konuşalım",
      openMenu: "Navigasyon menüsünü aç",
      closeMenu: "Navigasyon menüsünü kapat",
      mobileCta: "İletişime geç",
      items: [
        { label: "Ana Sayfa", href: "/" },
        { label: "Hakkımda", href: "/about" },
        { label: "Projeler", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "İletişim", href: "/contact" },
      ],
    },
    footer: {
      brandTitle: "Ede-Rojin Systems",
      brandSubtitle: "Bilgisayar mühendisliği portfolyosu",
      description:
        "Yazılım, backend sistemleri, veri analizi, makine öğrenmesi ve akıllı teknoloji çözümlerine odaklanan bilgisayar mühendisliği portfolyosu.",
      stats: [
        { label: "Vaka çalışması", value: "10" },
        { label: "Odak alanı", value: "4" },
        { label: "Üretime açık", value: "Şimdi" },
      ],
      explore: "Keşfet",
      nav: [
        { label: "Ana Sayfa", href: "/" },
        { label: "Hakkımda", href: "/about" },
        { label: "Projeler", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "İletişim", href: "/contact" },
      ],
      locationTitle: "Uzaktan çalışmaya uygun",
      locationBody:
        "Türkiye merkezli; yazılım, yapay zeka ve veri odaklı iş birliklerine açık.",
      social: {
        oldPortfolio: "Eski Portfolyo",
        contact: "İletişim",
      },
      closing: "Netlik, sürekli öğrenme ve pratik etki için tasarlandı.",
    },
    projectsPage: {
      eyebrow: "Sistem kütüphanesi",
      title: "Yazılım, yapay zeka, veri ve sistem odaklı proje çalışmaları.",
      description:
        "Çalışmaları kategoriye, başlığa, teknoloji yığınına veya açıklamaya göre ara ve filtrele. Her kart problem, yaklaşım ve ortaya çıkan değer etrafında kurgulandı.",
      visualEyebrow: "Vaka çalışması sistemi",
      visualTitle:
        "Projeleri neyi kanıtladığına göre filtrele: yazılım, veri, yapay zeka ve sistem düşüncesi.",
      visualDescription:
        "Proje kütüphanesi daha güçlü görsel kapaklarla destekleniyor; böylece her çalışma detay sayfasına girmeden önce bile daha bilinçli hissediliyor.",
    },
    projectExplorer: {
      searchLabel: "Proje ara",
      resultsLabel: (shown: number, total: number) =>
        `${shown}/${total} proje gösteriliyor`,
      categoriesLabel: (count: number) => `${count} kategori`,
      reset: "Sıfırla",
      searchPlaceholder: "Proje ara...",
      searchPrefix: "Arama",
      dynamicLabel: "Dinamik arama alanı",
      dynamicDescription:
        "Bu geçici kategori mevcut aramana göre oluşur; proje başlıkları, açıklamaları, çıktıları ve teknoloji yığınları içinde arama yapar.",
      matches: "eşleşme",
      empty: "Bu aramayla eşleşen proje bulunamadı. Başka bir kelime veya kategori dene.",
      recommendedEyebrow: "Sıradaki öneriler",
      recommendedTitle: "Karşılaştırabileceğin ilgili projeler.",
      recommendedDescription:
        "Bu öneriler ortak kategoriler, benzer teknolojiler ve mevcut arama kelimelerine göre seçilir.",
      categoryLabels: {
        All: "Tümü",
        Portfolio: "Portfolyo",
        "AI & Data": "Yapay Zeka & Veri",
        "Productivity Systems": "Verimlilik Sistemleri",
        "Backend Systems": "Backend Sistemleri",
      },
      categoryAliases: {
        Portfolio: "portfolio portfolyo kisisel site personal showcase",
        "AI & Data":
          "ai artificial intelligence data machine learning ml yapay zeka veri makine ogrenmesi analiz",
        "Productivity Systems":
          "productivity calendar assistant verimlilik takvim asistan planlama",
        "Backend Systems":
          "backend api server systems architecture sunucu sistem mimari",
      },
    },
    blogPage: {
      eyebrow: "Mühendislik notları",
      title: "Yazılım, veri, yapay zeka ve bunların arkasındaki sistemler üzerine yazılar.",
      description:
        "Mühendislik gelişimi, veri analizi, makine öğrenmesi, mimari, IT temelleri ve ürün odaklı yazılım üzerine kısa yazılar.",
      featuredArticle: "Öne çıkan yazı",
      sideCards: [
        {
          label: "Yazılar",
          value: "8",
          detail: "Portfolyo kimliğiyle uyumlu teknik yazılar.",
        },
        {
          label: "Ana konular",
          value: "8",
          detail: "Kariyer, veri, yapay zeka, ML, sistemler, mimari ve IT.",
        },
        {
          label: "Format",
          value: "Statik",
          detail: "Hızlı, SEO dostu ve bakımı kolay.",
        },
      ],
    },
    blogExplorer: {
      searchLabel: "Yazı ara",
      resultsLabel: (shown: number, total: number) =>
        `${shown}/${total} yazı gösteriliyor`,
      categoriesLabel: (count: number) => `${count} kategori`,
      reset: "Sıfırla",
      searchPlaceholder: "Blog yazısı ara...",
      searchPrefix: "Arama",
      dynamicLabel: "Dinamik okuma alanı",
      dynamicDescription:
        "Bu geçici kategori aramana göre oluşur; yazı başlıkları, konuları, özetleri ve içerikleri içinde arama yapar.",
      matches: "eşleşme",
      empty: "Bu aramayla eşleşen blog yazısı bulunamadı. Başka bir kelime veya kategori dene.",
      recommendedEyebrow: "Sıradaki öneriler",
      recommendedTitle: "Okuma yolunu sürdürecek ilgili yazılar.",
      recommendedDescription:
        "Bu öneriler ortak kategoriler, benzer konular ve mevcut arama kelimelerine göre seçilir.",
      categoryLabels: {
        All: "Tümü",
        "AI Systems": "Yapay Zeka Sistemleri",
        Data: "Veri",
        "Machine Learning": "Makine Öğrenmesi",
        "Backend Systems": "Backend Sistemleri",
        Architecture: "Mimari",
        "Career Management": "Kariyer Yönetimi",
        "IT & Systems": "IT & Sistemler",
        "Product Thinking": "Ürün Düşüncesi",
      },
      categoryAliases: {
        "AI Systems": "ai artificial intelligence systems yapay zeka sistemler",
        Data: "data veri analysis analiz eda visualization gorsellestirme",
        "Machine Learning":
          "machine learning ml makine ogrenmesi model preprocessing evaluation",
        "Backend Systems": "backend api systems sunucu sistemler",
        Architecture: "architecture mimari oop clean code temiz kod",
        "Career Management": "career kariyer growth gelisim learning ogrenme",
        "IT & Systems": "it systems networking linux cloud ag sistem bulut",
        "Product Thinking": "product urun ux problem outcome surec",
      },
    },
  },
} as const;

export function getI18n(locale: Locale) {
  return i18n[locale] ?? i18n[defaultLocale];
}
