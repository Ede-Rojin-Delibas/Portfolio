import {
  blogPosts,
  featuredBlogPost,
  type BlogPost,
} from "@/data/blog";
import {
  featuredProjects,
  projects,
  type Project,
} from "@/data/projects";
import type { Locale } from "@/data/i18n";

type ProjectTranslation = Partial<
  Pick<
    Project,
    | "title"
    | "description"
    | "demoLabel"
    | "role"
    | "problem"
    | "approach"
    | "outcome"
    | "highlights"
    | "screenshots"
  >
>;

type BlogPostTranslation = Partial<
  Pick<
    BlogPost,
    | "title"
    | "excerpt"
    | "readTime"
    | "topics"
    | "hero"
    | "content"
  >
>;

const trProjectTranslations: Record<string, ProjectTranslation> = {
  "ede-rojin-portfolio": {
    title: "Ede-Rojin Portfolyosu",
    description:
      "Next.js, motion, proje filtreleme, tema değişimi ve doğrulamalı iletişim akışıyla geliştirilmiş dark-first akıllı sistemler portfolyosu.",
    role: "Portfolyo Geliştirici",
    problem:
      "Teknik yetenekleri, proje çalışmalarını ve iletişim akışını tek bir profesyonel deneyimde gösterecek bir portfolyo gerekiyordu.",
    approach:
      "Ortak proje verisi, animasyonlu bölümler, tema desteği ve doğrulamalı form yapısıyla responsive bir Next.js arayüzü geliştirildi.",
    outcome:
      "Aranabilir, responsive, tema değiştirebilen ve doğrulamalı iletişim akışına sahip bir proje vitrini oluşturuldu.",
    highlights: [
      "Hydration güvenli dark/light tema ve responsive navigasyon",
      "Animasyonlu hero, scroll reveal bölümleri ve etkileşimli proje kartları",
      "Reusable TypeScript componentleriyle aranabilir proje kütüphanesi",
    ],
    screenshots: [
      {
        title: "Hero yüzeyi",
        description:
          "Büyük tipografi, glass navigation, parlayan arka plan ve ana CTA aksiyonları.",
      },
      {
        title: "Proje keşif alanı",
        description:
          "Ortak proje verisiyle çalışan arama, kategori filtreleri ve animasyonlu kartlar.",
      },
    ],
  },
  "legacy-data-portfolio": {
    title: "Önceki Veri Portfolyosu",
    description:
      "Veri bilimi, yapay zeka sistemleri ve analitik vaka çalışmalarına odaklanan önceki kişisel portfolyo.",
    role: "Portfolyo Tasarımcısı",
    problem:
      "Önceki çalışmaların veri ve yapay zeka ilgisini anlatan herkese açık bir portfolyo yüzeyine ihtiyacı vardı.",
    approach:
      "Seçili analitik ve makine öğrenmesi projeleri sade bir GitHub Pages portfolyosu içinde düzenlendi.",
    outcome:
      "Yeni profesyonel vaka çalışması yapısını besleyen herkese açık bir portfolyo temeli oluşturuldu.",
    highlights: [
      "Veri ve yapay zeka merkezli kişisel yönü tanıtır",
      "Makine öğrenmesi ve analitik projelerini bir araya getirir",
      "GitHub Pages ile yayına alınmıştır",
    ],
    screenshots: [
      {
        title: "Giriş sayfası",
        description:
          "Veri bilimi ve yapay zeka yönünü anlatan kişisel hero bölümü.",
      },
      {
        title: "Vaka kartları",
        description:
          "Sentetik veri, duygu analizi ve müşteri analitiği için proje önizlemeleri.",
      },
    ],
  },
  "synthetic-data-generator": {
    title: "Sentetik Veri Üretici",
    description:
      "Sentetik veri setleri üretmek, kalite metriklerini karşılaştırmak ve hassas veri süreçlerini korumak için Flask tabanlı bir sistem.",
    role: "Makine Öğrenmesi Geliştirici",
    problem:
      "Ekiplerin analiz ve test için gerçekçi veriye ihtiyacı olduğunda hassas veri setleriyle çalışmak riskli olabilir.",
    approach:
      "Veri yükleme, sentetik veri üretme ve kalite metriklerini karşılaştırma adımlarını içeren Flask tabanlı bir akış tasarlandı.",
    outcome:
      "Üretim, değerlendirme ve indirilebilir çıktılar içeren uçtan uca sentetik veri iş akışı oluşturuldu.",
    highlights: [
      "Yüklenen gerçek veri setlerinden sentetik veri üretir",
      "İstatistiksel benzerlik ve ML etkinliği metrikleriyle kaliteyi karşılaştırır",
      "Kullanıcı, yükleme ve indirme akışlarını içeren tam bir web deneyimi sunar",
    ],
    screenshots: [
      {
        title: "Üretim akışı",
        description:
          "Veri seti yükleme, model seçimi ve sentetik çıktı hazırlama adımları.",
      },
      {
        title: "Kalite değerlendirme",
        description:
          "İstatistiksel benzerlik, korelasyon ve kategori kapsamı için metrik panelleri.",
      },
    ],
  },
  "sentiment-analysis": {
    title: "Duygu Analizi",
    description:
      "Sosyal medya metin sinyallerini sınıflandıran ve görüş verisini okunabilir içgörülere dönüştüren bir NLP projesi.",
    role: "Yapay Zeka & Veri Geliştirici",
    problem:
      "Yapılandırılmamış sosyal medya metinlerini otomatik duygu sinyalleri olmadan hızlı okumak zordur.",
    approach:
      "Metin işleme, sınıflandırma ve içgörü çıkarımı için notebook tabanlı bir NLP akışı hazırlandı.",
    outcome:
      "Ham metinler okunabilir duygu kategorilerine ve portfolyo sunumuna uygun analiz notlarına dönüştürüldü.",
    highlights: [
      "Sosyal medya metinlerini duygu sinyalleri için işler",
      "Şeffaf analiz için notebook tabanlı keşif kullanır",
      "Yapılandırılmamış metni okunabilir bulgulara dönüştürür",
    ],
    screenshots: [
      {
        title: "Metin işleme akışı",
        description:
          "Girdi hazırlığı, duygu etiketleme ve notebook analiz akışı.",
      },
      {
        title: "İçgörü özeti",
        description:
          "Pozitif, nötr ve negatif görüş desenleri için okunabilir çıktı.",
      },
    ],
  },
  "customer-churn-prediction": {
    title: "Müşteri Kaybı Tahmini",
    description:
      "Müşteri kaybı riskini tahmin etmeye ve elde tutma kararlarını desteklemeye odaklanan bir makine öğrenmesi vaka çalışması.",
    role: "Makine Öğrenmesi Geliştirici",
    problem:
      "Müşteri kaybı kararları, hangi kullanıcıların ayrılabileceğini ve nedenini gösteren daha net sinyallere ihtiyaç duyar.",
    approach:
      "Keşifsel analiz ve makine öğrenmesi pratiğiyle müşteri kaybı bir karar destek problemi olarak ele alındı.",
    outcome:
      "Davranış desenleri, risk sinyalleri ve elde tutma düşüncesi etrafında bir churn tahmin vaka çalışması oluşturuldu.",
    highlights: [
      "Churn problemini iş kararı destek alanı olarak çerçeveler",
      "Müşteri davranışını anlamak için keşifsel analiz kullanır",
      "Model çıktısını elde tutma stratejisiyle ilişkilendirir",
    ],
    screenshots: [
      {
        title: "Müşteri analizi",
        description:
          "Modelleme öncesi özellik keşfi ve davranış desenleri.",
      },
      {
        title: "Tahmin görünümü",
        description:
          "Elde tutma kararlarını desteklemek için risk odaklı çıktı.",
      },
    ],
  },
  "e-commerce-platform": {
    title: "E-Ticaret Analitik Platformu",
    description:
      "Müşteri davranışı, ürün desenleri ve e-ticaret karar sinyallerini anlamaya yönelik keşifsel analitik projesi.",
    role: "Veri Analisti",
    problem:
      "E-ticaret davranış verisi ürün, müşteri ve satın alma desenleriyle ilgili değerli sinyalleri gizleyebilir.",
    approach:
      "Ticaret sinyallerini belirlemek için keşifsel veri analizi ve görselleştirme yaklaşımları uygulandı.",
    outcome:
      "Müşteri davranışı etrafında analitik bir vaka çalışmasıyla gerekli dinamik proje route yapısı tamamlandı.",
    highlights: [
      "Müşteri davranışını okumak için keşifsel veri analizi kullanır",
      "Satın alma desenleri ve e-ticaret performans sinyallerine odaklanır",
      "Gerekli /projects/e-commerce-platform dinamik route örneğini içerir",
    ],
    screenshots: [
      {
        title: "Davranış özeti",
        description:
          "Satın alma desenleri, müşteri segmentleri ve temel ticaret metrikleri.",
      },
      {
        title: "E-ticaret sinyalleri",
        description:
          "Vaka çalışması formatında ürün, müşteri ve dönüşüm analizi.",
      },
    ],
  },
  "remote-work-calendar": {
    title: "Uzaktan Çalışma Takvim Asistanı",
    description:
      "Günlük hedefler, akıllı zaman blokları, odak rutinleri ve ilerleme raporu fikirleri içeren uzaktan çalışma üretkenlik asistanı.",
    role: "Ürün Geliştirici",
    demoLabel: "Proje README",
    problem:
      "Uzaktan çalışanlar hedefler, zaman blokları ve odak rutinleri etrafında daha net bir yapıya ihtiyaç duyar.",
    approach:
      "Günlük planlama, Pomodoro rutinleri, duygu durumu ve ilerleme raporu etrafında üretkenlik kavramları tasarlandı.",
    outcome:
      "Planlama UX’ini yapay zeka destekli odak önerileriyle bağlayan bir uzaktan çalışma asistanı konsepti ortaya kondu.",
    highlights: [
      "Günlük işi hedefler, görevler ve zaman bloklarıyla planlar",
      "Yapay zeka destekli odak, duygu ve enerji önerilerini keşfeder",
      "Uzaktan çalışma üretkenliğini kullanıcı merkezli bir akış olarak ele alır",
    ],
    screenshots: [
      {
        title: "Planlama yüzeyi",
        description:
          "Uzaktan çalışma rutinleri için günlük hedefler, yapılacaklar ve önerilen çalışma blokları.",
      },
      {
        title: "Odak asistanı",
        description:
          "Pomodoro, enerji takibi ve haftalık ilerleme raporu konseptleri.",
      },
    ],
  },
  "code-generation-models": {
    title: "Kod Üretim Modelleri",
    description:
      "Açık lisanslı GitHub kodlarını düzenleme ve açık kaynak kod üretim modellerini fine-tune etme üzerine araştırma odaklı proje.",
    role: "Yapay Zeka Geliştirici",
    demoLabel: "Proje README",
    problem:
      "Kod üretim modellerinin faydalı olabilmesi için düzenlenmiş veri, fine-tuning planı ve değerlendirme adımları gerekir.",
    approach:
      "Açık lisanslı kod toplama, ön işleme, LoRA/PEFT fine-tuning kavramları ve demo planlaması incelendi.",
    outcome:
      "Veri seti akışından değerlendirmeye kadar kod modeli deneyleri için bir yapay zeka iş akışı belgelendi.",
    highlights: [
      "Model eğitimi için açık lisanslı GitHub kodlarını düzenler",
      "PEFT ve LoRA gibi fine-tuning kavramlarını kullanır",
      "Kod üretim kalitesi için değerlendirme ve demo planı içerir",
    ],
    screenshots: [
      {
        title: "Veri seti akışı",
        description:
          "Repo toplama, ön işleme ve kaynak takibi olan veri seti akışı.",
      },
      {
        title: "Model iş akışı",
        description:
          "Kod LLM projesi için fine-tuning, değerlendirme ve demo yapısı.",
      },
    ],
  },
  "yks-ranking-predictor": {
    title: "YKS Sıralama Tahminleyici",
    description:
      "Türkiye üniversite sınavı hazırlığında deneme netlerinden sınav sıralaması tahmin eden makine öğrenmesi sistemi.",
    role: "Makine Öğrenmesi Geliştirici",
    demoLabel: "Proje README",
    problem:
      "YKS’ye hazırlanan öğrenciler deneme netlerinden sıralama tahmini yapmanın pratik bir yoluna ihtiyaç duyar.",
    approach:
      "TYT/AYT girdileri ve eğitim performansı verileri etrafında sıralama tahmini modeli kurgulandı.",
    outcome:
      "API odaklı tahmin mantığına sahip bir eğitim analitiği vaka çalışması oluşturuldu.",
    highlights: [
      "TYT ve AYT net değerlerinden sıralama tahminini destekler",
      "Eğitim performansı sinyallerini modellemek için geçmiş sınav verilerini kullanır",
      "Tahmin mantığını API odaklı bir sistem olarak paketler",
    ],
    screenshots: [
      {
        title: "Tahmin girdisi",
        description:
          "Sıralama tahmini için sınav net alanları ve alan bazlı girdiler.",
      },
      {
        title: "Model çıktısı",
        description:
          "Öğrenci karar desteği için tasarlanmış tahmini sıralama sonucu.",
      },
    ],
  },
  "onion-architecture-api": {
    title: "Onion Architecture API",
    description:
      "Onion Architecture prensipleriyle katmanlı backend tasarımı pratiği yapmak için C# ve ASP.NET proje koleksiyonu.",
    role: "Backend Geliştirici",
    demoLabel: "Proje README",
    problem:
      "Backend pratiğinde domain, application ve infrastructure sorumlulukları arasında net ayrım gerekir.",
    approach:
      "C# ve ASP.NET örnekleri Onion Architecture prensipleri ve entity tabanlı API yapısıyla çalışıldı.",
    outcome:
      "Katmanlı sistem düşüncesini gösteren bir backend mimarisi vaka çalışması oluşturuldu.",
    highlights: [
      "Domain, application ve infrastructure sorumluluklarını ayırır",
      "Farklı model örnekleriyle API yapısı pratiği yapar",
      "Frontend ve veri projelerinin ötesinde backend temellerini gösterir",
    ],
    screenshots: [
      {
        title: "Katmanlı yapı",
        description:
          "Domain, service ve API klasörlerinin sorumluluk ayrımıyla düzenlenmesi.",
      },
      {
        title: "API pratiği",
        description:
          "Backend mimarisi pratiği için kullanılan entity modelleri ve endpoint’ler.",
      },
    ],
  },
};

const trBlogTranslations: Record<string, BlogPostTranslation> = {
  "building-practical-intelligent-systems": {
    title: "Pratik Akıllı Sistemler Kurmak",
    excerpt:
      "Yazılım mühendisliği, veri analizi ve makine öğrenmesinin tek bir pratik mühendislik yönü olarak nasıl birlikte çalışabileceği.",
    readTime: "5 dk okuma",
    topics: ["Yazılım", "Yapay Zeka", "Veri", "Sistemler"],
    hero: {
      label: "Odak",
      metric: "Yazılım + Veri + Yapay Zeka",
    },
    content: [
      "Pratik akıllı sistemler, bir projeye yalnızca yapay zeka etiketi eklenerek oluşmaz. Yazılım, veri ve kullanıcı ihtiyacı net bir mühendislik amacıyla bağlandığında oluşur.",
      "Yazılım katmanı sisteme yapı kazandırır. Verinin nasıl hareket ettiğini, kullanıcının ürünle nasıl etkileştiğini ve yeni özellikler eklendikçe uygulamanın nasıl sürdürülebilir kalacağını belirler.",
      "Veri katmanı sisteme kanıt sağlar. İyi analiz, model eklenmeden önce desenleri, riskleri ve fırsatları görünür hale getirir. Bu katman olmadan makine öğrenmesi tahmine dönüşebilir.",
      "Akıllı katman gerçek bir iş akışını iyileştirmelidir. Yararlı bir model, kişinin daha iyi karar vermesine yardım eden bir şeyi tahmin eder, önerir, sınıflandırır veya özetler.",
      "Benim büyümek istediğim portfolyo yönü tam olarak bu: güvenilir yazılım, düşünülmüş veri çalışması ve net değer üreten akıllı özellikler.",
    ],
  },
  "turning-data-into-engineering-decisions": {
    title: "Veriyi Mühendislik Kararlarına Dönüştürmek",
    excerpt:
      "Ham veri setlerinden içgörüye, özellik seçimlerine ve ürün yönüne ilerlemek için pratik bir yaklaşım.",
    readTime: "5 dk okuma",
    topics: ["EDA", "Pandas", "Görselleştirme", "Karar Verme"],
    hero: {
      label: "Veri bakışı",
      metric: "Çıktıdan önce içgörü",
    },
    content: [
      "Veri, bir kararı değiştirdiğinde değerli hale gelir. Bir grafik ancak ekibin ne olduğunu ve sonrasında ne yapılması gerektiğini anlamasına yardım ediyorsa yararlıdır.",
      "Keşifsel veri analizi ilk mühendislik adımıdır. Eksik değerleri, aykırı değerleri, dağılımları, ilişkileri ve modelleme sürecini yönlendirecek sinyalleri bulmaya yardım eder.",
      "İyi bir veri akışı belirsizliği de anlatmalıdır. Her desen özellik olmaya yetecek kadar güçlü değildir ve her metrik durumun tamamını açıklamaz.",
      "Veri çalışması ürün düşüncesiyle bağlandığında neyin geliştirileceğini önceliklendirmek kolaylaşır. Amaç her grafiği göstermek değil, önemli olanı görünür kılmaktır.",
      "Bu yüzden veri analizini mühendisliğin bir parçası olarak görüyorum: teknik bilgiyi pratik yöne dönüştürür.",
    ],
  },
  "machine-learning-workflows-that-stay-understandable": {
    title: "Anlaşılır Kalan Makine Öğrenmesi Akışları",
    excerpt:
      "Ön işleme, değerlendirme ve açık iletişimin neden model seçimi kadar önemli olduğu.",
    readTime: "6 dk okuma",
    topics: ["Makine Öğrenmesi", "Ön İşleme", "Değerlendirme", "Scikit-learn"],
    hero: {
      label: "ML akışı",
      metric: "Okunabilir modeller",
    },
    content: [
      "Bir makine öğrenmesi akışı girdiden sonuca kadar anlaşılır olmalıdır. Adımlar net değilse iyi bir skor bile güvenilmesi zor bir çıktı üretebilir.",
      "Ön işleme birçok önemli kararın verildiği yerdir. Eksik değerleri ele almak, kategorileri kodlamak, özellikleri ölçeklemek ve veriyi doğru bölmek final modelin kalitesini değiştirebilir.",
      "Model değerlendirme tek bir sorudan fazlasına cevap vermelidir. Accuracy yararlı olabilir ama precision, recall, hata analizi ve confusion matrix çoğu zaman gerçek davranışı daha iyi açıklar.",
      "En iyi akış her zaman en karmaşık olan değildir. Basit bir baseline, daha gelişmiş bir yöntemin gerçekten değer katıp katmadığını gösterebilir.",
      "Portfolyo projelerinde makine öğrenmesinin yalnızca final tahmin olarak değil, düşünülmüş bir süreç olarak görünmesini istiyorum.",
    ],
  },
  "why-backend-fundamentals-still-matter": {
    title: "Backend Temelleri Neden Hâlâ Önemli",
    excerpt:
      "API’ler, mimari, veri akışı ve portfolyo projelerinde bile sistem düşüncesinin neden önemli olduğu.",
    readTime: "4 dk okuma",
    topics: ["REST API", "Mimari", "Sistemler", "Öğrenme"],
    hero: {
      label: "Temel",
      metric: "Temiz API’ler",
    },
    content: [
      "Backend temelleri, uygulamaların veriyi nasıl hareket ettirdiğini, kuralları nasıl yönettiğini ve zaman içinde nasıl sürdürülebilir kaldığını anlamama yardım eder.",
      "Küçük projeler bile sorumluluklar ayrıldığında ve API davranışı tahmin edilebilir olduğunda daha anlaşılır hale gelir.",
      "API’ler aynı zamanda iletişim araçlarıdır. Frontend, veritabanı ve dış servislerin birbirleriyle nasıl konuşacağını tanımlar.",
      "Backend dikkatli tasarlandığında debug daha az yorucu olur ve yeni özellikler daha az riskli hissedilir.",
      "Bu yüzden portfolyomda yalnızca görsel arayüzleri değil, çalışmanın arkasındaki sistem düşüncesini de göstermek istiyorum.",
    ],
  },
  "architecture-is-a-learning-tool": {
    title: "Mimari Bir Öğrenme Aracıdır",
    excerpt:
      "Mimari düşüncenin kodu düzenlemeye, karmaşayı azaltmaya ve mühendislik kararlarını açıklamaya nasıl yardım ettiği.",
    readTime: "5 dk okuma",
    topics: ["Mimari", "OOP", "Sürdürülebilirlik", "Temiz Kod"],
    hero: {
      label: "Mimari",
      metric: "Yapı netlik üretir",
    },
    content: [
      "Mimari yalnızca büyük ekiplerin ihtiyacı olan bir şey gibi görünebilir; ama bireysel projeler için de güçlü bir öğrenme aracıdır.",
      "Kodun yapısı olduğunda her sorumluluğun nereye ait olduğunu anlamak kolaylaşır. Veri erişimi, iş mantığı, validasyon ve sunum aynı yerde yaşamamalıdır.",
      "İyi mimari aşırı mühendislik anlamına gelmez. Projeyi anlaşılır ve esnek kılacak kadar yapı seçmek anlamına gelir.",
      "Katmanlı mimari veya sorumluluk ayrımı gibi desenler, geliştiricinin yalnızca ne yaptığını değil neden o şekilde yaptığını açıklamasına yardım eder.",
      "Benim için mimari daha net düşünmenin ve mühendislik tercihlerini daha özgüvenli anlatmanın bir yoludur.",
    ],
  },
  "career-management-for-growing-engineers": {
    title: "Gelişen Mühendisler İçin Kariyer Yönetimi",
    excerpt:
      "Öğrenme yönü, proje seçimleri ve profesyonel mühendislik kimliği kurma üzerine pratik bir düşünce.",
    readTime: "5 dk okuma",
    topics: ["Kariyer", "Öğrenme", "Portfolyo", "Gelişim Zihniyeti"],
    hero: {
      label: "Kariyer",
      metric: "Yön duygusuyla öğren",
    },
    content: [
      "Kariyer yönetimi, nasıl bir mühendise dönüştüğünü anlamakla başlar. Yön olmadan öğrenme rastgele araç biriktirmeye dönüşebilir.",
      "Güçlü bir portfolyo bir desen göstermelidir. Birinin ilgi alanlarını, problem çözme tarzını ve bundan sonra yapmak istediğin işi anlamasına yardım etmelidir.",
      "Projeler gelişimi yönetmenin en iyi yollarından biridir çünkü öğrenmeyi kanıta dönüştürür. Bitmiş bir proje disiplin, teknik beceri ve iletişim gösterir.",
      "İlerlemeyi düzenli gözden geçirmek de önemlidir. Hangi konular tekrar ediyor? Hangi beceriler daha derin pratik istiyor? Hangi projeler mühendislik kimliğini en güçlü anlatıyor?",
      "Hedefim çok yönlü bir mühendis olarak büyümek: kod yazabilen, veri analiz edebilen, sistemleri anlayabilen ve bilinçli şekilde gelişmeye devam eden biri olmak.",
    ],
  },
  "it-foundations-behind-modern-software": {
    title: "Modern Yazılımın Arkasındaki IT Temelleri",
    excerpt:
      "Ağ, Linux, bulut kavramları ve altyapı farkındalığının yazılım mühendislerini neden güçlendirdiği.",
    readTime: "4 dk okuma",
    topics: ["Ağ", "Linux", "Bulut", "Altyapı"],
    hero: {
      label: "Sistemler",
      metric: "Yazılım altyapıya ihtiyaç duyar",
    },
    content: [
      "Modern yazılım tek başına çalışmaz. Ağlara, sunuculara, işletim sistemlerine, veritabanlarına ve deployment ortamlarına bağlıdır.",
      "IT temellerini anlamak mühendislerin daha iyi sorular sormasına yardım eder. Uygulama nerede barındırılıyor? Trafik ona nasıl ulaşıyor? Bir istek başarısız olduğunda ne oluyor?",
      "Linux becerileri özellikle değerlidir çünkü birçok geliştirme ve deployment ortamı Unix benzeri sistemler etrafında kuruludur.",
      "Bulut kavramları kodu gerçek teslimatla bağlar. Depolama, compute, ağ ve izleme gibi alanlar bir ürünün güvenilirliğini etkiler.",
      "Bu temeller yazılım mühendisliğini daha bütünlüklü hale getirir çünkü uygulamanın arkasındaki ortamı görünür kılar.",
    ],
  },
  "from-projects-to-product-thinking": {
    title: "Projelerden Ürün Düşüncesine",
    excerpt:
      "Problem, süreç ve sonuç odağıyla portfolyo projelerini daha yararlı hissettirmenin yolları.",
    readTime: "5 dk okuma",
    topics: ["Projeler", "Ürün", "UX", "Mühendislik"],
    hero: {
      label: "Ürün bakışı",
      metric: "Problem -> Süreç -> Sonuç",
    },
    content: [
      "Bir proje çözdüğü problemi anlattığında daha etkileyici hale gelir. Ziyaretçi projenin neden var olduğunu hızlıca anlamalıdır.",
      "Süreç de önemlidir. Hangi veri kullanıldı? Hangi teknolojiler seçildi? Hangi trade-off’lar ortaya çıktı? Bu detaylar projeyi gerçek hissettirir.",
      "Sonuç final katmandır. Bir portfolyo kartı yalnızca araçları listelememeli; çalışmanın ne ürettiğini ve ne öğrenildiğini açıklamalıdır.",
      "Ürün düşüncesi teknik projelerin değerlendirilmesini kolaylaştırır. Uygulamayı kullanıcı değeriyle bağlar.",
      "Kendi portfolyom için istediğim yön bu: her proje yalnızca screenshot ve tech stack değil, küçük bir vaka çalışması gibi hissettirmeli.",
    ],
  },
};

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale !== "tr") {
    return project;
  }

  const translation = trProjectTranslations[project.slug];

  if (!translation) {
    return project;
  }

  return {
    ...project,
    ...translation,
    screenshots:
      translation.screenshots?.map((screenshot, index) => ({
        ...project.screenshots[index],
        ...screenshot,
      })) ?? project.screenshots,
  };
}

export function getLocalizedProjects(locale: Locale): Project[] {
  return projects.map((project) => getLocalizedProject(project, locale));
}

export function getLocalizedFeaturedProjects(locale: Locale): Project[] {
  return featuredProjects.map((project) =>
    getLocalizedProject(project, locale),
  );
}

export function getLocalizedBlogPost(
  post: BlogPost,
  locale: Locale,
): BlogPost {
  if (locale !== "tr") {
    return post;
  }

  const translation = trBlogTranslations[post.slug];

  if (!translation) {
    return post;
  }

  return {
    ...post,
    ...translation,
    hero: {
      ...post.hero,
      ...translation.hero,
    },
  };
}

export function getLocalizedBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.map((post) => getLocalizedBlogPost(post, locale));
}

export function getLocalizedFeaturedBlogPost(locale: Locale): BlogPost {
  return getLocalizedBlogPost(featuredBlogPost, locale);
}
