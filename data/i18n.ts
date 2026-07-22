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
      status: "Available",
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
      title: "Dili degistir",
      ariaLabel: "Dili Ingilizce olarak degistir",
    },
    navbar: {
      brandSubtitle: "Akilli sistemler",
      status: "Musait",
      cta: "Konusalim",
      openMenu: "Navigasyon menusunu ac",
      closeMenu: "Navigasyon menusunu kapat",
      mobileCta: "Iletisime gec",
      items: [
        { label: "Ana Sayfa", href: "/" },
        { label: "Hakkimda", href: "/about" },
        { label: "Projeler", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "Iletisim", href: "/contact" },
      ],
    },
    footer: {
      brandTitle: "Ede-Rojin Systems",
      brandSubtitle: "Bilgisayar muhendisligi portfolyosu",
      description:
        "Yazilim, backend sistemleri, veri analizi, makine ogrenmesi ve akilli teknoloji cozumlerine odaklanan bilgisayar muhendisligi portfolyosu.",
      stats: [
        { label: "Vaka calismasi", value: "10" },
        { label: "Odak alani", value: "4" },
        { label: "Uretime acik", value: "Simdi" },
      ],
      explore: "Kesfet",
      nav: [
        { label: "Ana Sayfa", href: "/" },
        { label: "Hakkimda", href: "/about" },
        { label: "Projeler", href: "/projects" },
        { label: "Blog", href: "/blog" },
        { label: "Iletisim", href: "/contact" },
      ],
      locationTitle: "Uzaktan calismaya uygun",
      locationBody:
        "Turkiye merkezli; yazilim, yapay zeka ve veri odakli is birliklerine acik.",
      social: {
        oldPortfolio: "Eski Portfolyo",
        contact: "Iletisim",
      },
      closing: "Netlik, surekli ogrenme ve pratik etki icin tasarlandi.",
    },
    projectsPage: {
      eyebrow: "Sistem kutuphanesi",
      title: "Yazilim, yapay zeka, veri ve sistem odakli proje calismalari.",
      description:
        "Calismalari kategoriye, basliga, teknoloji yiginina veya aciklamaya gore ara ve filtrele. Her kart problem, yaklasim ve ortaya cikan deger etrafinda kurgulandi.",
      visualEyebrow: "Vaka calismasi sistemi",
      visualTitle:
        "Projeleri neyi kanitladigina gore filtrele: yazilim, veri, yapay zeka ve sistem dusuncesi.",
      visualDescription:
        "Proje kutuphanesi daha guclu gorsel kapaklarla destekleniyor; boylece her calisma detay sayfasina girmeden once bile daha bilincli hissediliyor.",
    },
    projectExplorer: {
      searchLabel: "Proje ara",
      resultsLabel: (shown: number, total: number) =>
        `${shown}/${total} proje gosteriliyor`,
      categoriesLabel: (count: number) => `${count} kategori`,
      reset: "Sifirla",
      searchPlaceholder: "Proje ara...",
      searchPrefix: "Arama",
      dynamicLabel: "Dinamik arama alani",
      dynamicDescription:
        "Bu gecici kategori mevcut aramana gore olusur; proje basliklari, aciklamalari, ciktilari ve teknoloji yiginlari icinde arama yapar.",
      matches: "eslesme",
      empty: "Bu aramayla eslesen proje bulunamadi. Baska bir kelime veya kategori dene.",
      recommendedEyebrow: "Siradaki oneriler",
      recommendedTitle: "Karsilastirabilecegin ilgili projeler.",
      recommendedDescription:
        "Bu oneriler ortak kategoriler, benzer teknolojiler ve mevcut arama kelimelerine gore secilir.",
      categoryLabels: {
        All: "Tumu",
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
      eyebrow: "Muhendislik notlari",
      title: "Yazilim, veri, yapay zeka ve bunlarin arkasindaki sistemler uzerine yazilar.",
      description:
        "Muhendislik gelisimi, veri analizi, makine ogrenmesi, mimari, IT temelleri ve urun odakli yazilim uzerine kisa yazilar.",
      featuredArticle: "One cikan yazi",
      sideCards: [
        {
          label: "Yazilar",
          value: "8",
          detail: "Portfolyo kimligiyle uyumlu teknik yazilar.",
        },
        {
          label: "Ana konular",
          value: "8",
          detail: "Kariyer, veri, yapay zeka, ML, sistemler, mimari ve IT.",
        },
        {
          label: "Format",
          value: "Statik",
          detail: "Hizli, SEO dostu ve bakimi kolay.",
        },
      ],
    },
    blogExplorer: {
      searchLabel: "Yazi ara",
      resultsLabel: (shown: number, total: number) =>
        `${shown}/${total} yazi gosteriliyor`,
      categoriesLabel: (count: number) => `${count} kategori`,
      reset: "Sifirla",
      searchPlaceholder: "Blog yazisi ara...",
      searchPrefix: "Arama",
      dynamicLabel: "Dinamik okuma alani",
      dynamicDescription:
        "Bu gecici kategori aramana gore olusur; yazi basliklari, konulari, ozetleri ve icerikleri icinde arama yapar.",
      matches: "eslesme",
      empty: "Bu aramayla eslesen blog yazisi bulunamadi. Baska bir kelime veya kategori dene.",
      recommendedEyebrow: "Siradaki oneriler",
      recommendedTitle: "Okuma yolunu surdurecek ilgili yazilar.",
      recommendedDescription:
        "Bu oneriler ortak kategoriler, benzer konular ve mevcut arama kelimelerine gore secilir.",
      categoryLabels: {
        All: "Tumu",
        "AI Systems": "Yapay Zeka Sistemleri",
        Data: "Veri",
        "Machine Learning": "Makine Ogrenmesi",
        "Backend Systems": "Backend Sistemleri",
        Architecture: "Mimari",
        "Career Management": "Kariyer Yonetimi",
        "IT & Systems": "IT & Sistemler",
        "Product Thinking": "Urun Dusuncesi",
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
