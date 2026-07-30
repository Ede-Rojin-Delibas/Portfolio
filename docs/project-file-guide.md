# Portfolio Project File Guide

Bu rehber, projede bir hata aldiginda hangi dosyanin/kategorinin sorumlu olabilecegini hizlica anlaman icin hazirlandi.

## 1. Klasor Haritasi

### Root

- `app/`: Next.js App Router sayfalari, layout dosyalari ve API route'lari burada durur. Console'da route, page, layout veya hydration hatasi gorursen genelde ilk bakilacak yerdir.
- `components/`: Tekrar kullanilan React componentleri burada durur. Navbar, footer, kartlar, admin formlari, animasyonlar ve UI parcalari bu katmandadir.
- `data/`: Statik/fallback icerikler, i18n metinleri, proje/blog seed kaynaklari ve admin rol tanimlari burada durur.
- `lib/`: Yardimci fonksiyonlar, backend servisleri, database baglantisi, session, permission ve public content okuma katmani burada durur.
- `prisma/`: Database schema ve migration dosyalari burada durur. DB alanlari, enumlar veya migration hatalarinda buraya bakilir.
- `public/`: Tarayicidan direkt erisilebilen image, svg, glb ve statik asset dosyalaridir.
- `scripts/`: Tek seferlik komutlar veya seed islemleri icin script dosyalaridir.
- `types/`: Ortak TypeScript tip dosyalaridir.
- `docs/`: Proje dokumantasyonu ve plan dosyalaridir.
- `.next/`: Next.js build/dev ciktisidir. Elle duzenlenmez.
- `node_modules/`: NPM paketleri burada durur. Elle duzenlenmez.
- `.git/`: Git versiyon gecmisi. Elle duzenlenmez.
- `.agents/`, `.codex/`: Agent/IDE yardimci dosyalari. Uygulama runtime'inin ana parcasi degildir.
- `tmp/`: Gecici calisma dosyalari icindir.
- `.npm-cache/`: NPM cache alanidir. Elle duzenlenmez.

## 2. Root Dosyalari

- `.env.example`: Gerekli environment variable ornekleri. DB URL, session secret gibi bilgilerin hangi isimle yazilacagini gosterir.
- `AGENTS.md`: Bu projede agent'in nasil davranacagini anlatan yerel talimat dosyasi.
- `CLAUDE.md`: Baska agent/yardimci arac icin proje notlari olabilir.
- `README.md`: Projenin genel tanitimi, kurulum ve deploy aciklamalari.
- `package.json`: Proje scriptleri ve dependency listesi. `npm run build`, `npm run lint`, `db:migrate` gibi komutlar buradan gelir.
- `package-lock.json`: Kurulu paketlerin kesin versiyon kilidi. Elle duzenlenmez.
- `next.config.ts`: Next.js ayarlari. Image/domain/runtime gibi framework ayarlari burada olur.
- `tsconfig.json`: TypeScript derleme ayarlari ve path alias mantigi.
- `eslint.config.mjs`: Kod kalite/lint kurallari.
- `postcss.config.mjs`: Tailwind/PostCSS pipeline ayarlari.
- `components.json`: shadcn/ui component sistemi icin konfigurasyon.
- `prisma.config.ts`: Prisma'nin schema ve migration ayarlarini okudugu config.
- `next-dev.out.log`, `next-dev.err.log`: Dev server log dosyalari. Hata ararken son server ciktisini gormek icin kullanilir.

## 3. App Router Dosyalari

- `app/layout.tsx`: Tum sitenin kok layout'u. Navbar/footer/theme provider gibi her sayfayi saran yapi buradadir. Hydration veya global metadata hatalarinda bakilir.
- `app/template.tsx`: Sayfa gecis hissi icin route degisimlerinde yeniden render edilen wrapper. Page transition animasyonlariyla ilgilidir.
- `app/page.tsx`: Home sayfasi. Hero, engineering statement, tech stack, featured projects ve CTA gibi ana bolumleri birlestirir.
- `app/globals.css`: Global Tailwind stilleri, tema renkleri, background efektleri ve ortak CSS class'lari.
- `app/favicon.ico`: Tarayici sekmesindeki favicon.
- `app/fonts/*.woff2`: Geist font dosyalari. Tipografi veya Turkce karakter gorunumunde font kaynaklarina bakilir.

### Public Sayfalar

- `app/about/page.tsx`: About sayfasi. Egitim, deneyim, yetkinlikler, timeline ve lanyard gorseli gibi profil iceriklerini kullanir.
- `app/contact/page.tsx`: Contact sayfasi. Iletisim formu, sosyal linkler ve contact visual/card yapisini birlestirir.
- `app/projects/page.tsx`: Projects liste sayfasi. Arama, kategori filtreleme, oneriler ve proje kartlari burada gorulur.
- `app/projects/[slug]/page.tsx`: Dinamik proje detay sayfasi. URL'deki slug'a gore tek proje detayini getirir.
- `app/blog/page.tsx`: Blog liste/explorer sayfasi. Blog arama, filtreleme ve oneriler burada gorulur.
- `app/blog/[slug]/page.tsx`: Dinamik blog detay sayfasi. Secilen blog yazisi ve ilgili oneriler burada gosterilir.

### Admin Sayfalari

- `app/admin/page.tsx`: Admin dashboard ana sayfasi. Genel durum ve yonetim girisi.
- `app/admin/login/page.tsx`: Admin giris sayfasi.
- `app/admin/register/page.tsx`: Admin kayit sayfasi. Yeni hesaplar pending olarak olusur.
- `app/admin/users/page.tsx`: Kullanici onay kuyrugu, rol degistirme, suspend/reactivate akisi.
- `app/admin/projects/page.tsx`: Proje CRUD, edit, delete ve Super Admin publish review alani.
- `app/admin/posts/page.tsx`: Blog CRUD, edit, delete ve Super Admin publish review alani.
- `app/admin/messages/page.tsx`: Contact formdan gelen mesajlari listeleme ve status degistirme.
- `app/admin/translations/page.tsx`: Machine draft / reviewed translation kayitlarini yonetme.
- `app/admin/audit-logs/page.tsx`: Admin islemlerinin audit log kayitlarini gosterir.
- `app/admin/roles/page.tsx`: Roller ve permission modelini aciklar.
- `app/admin/settings/page.tsx`: Database'deki site ayar kayitlarini gosterir.
- `app/admin/trash/page.tsx`: `ARCHIVED` proje/blog kayitlarini ayri alanda gosterir.
- `app/admin/[section]/page.tsx`: Henuz ozel sayfasi olmayan admin modulleri icin dinamik plan/placeholder sayfasi.

### API Route Dosyalari

- `app/api/health/route.ts`: Basit saglik kontrol endpoint'i.
- `app/api/contact/route.ts`: Public contact form submission endpoint'i. React Hook Form/Zod hatalarinda buraya bakilir.
- `app/api/admin/session/route.ts`: Aktif admin session bilgisini dondurur.
- `app/api/admin/auth/login/route.ts`: Admin login endpoint'i.
- `app/api/admin/auth/logout/route.ts`: Admin logout endpoint'i ve cookie/session temizligi.
- `app/api/admin/auth/register/route.ts`: Admin kayit endpoint'i. Super Admin bootstrap ve pending user akisi burada baslar.
- `app/api/admin/users/route.ts`: Admin kullanicilari listeleme API'si.
- `app/api/admin/users/[id]/route.ts`: Kullanici approve/reject/suspend/reactivate/role update API'si.
- `app/api/admin/projects/route.ts`: Proje listeleme ve yeni proje olusturma API'si.
- `app/api/admin/projects/[id]/route.ts`: Proje guncelleme/silme API'si.
- `app/api/admin/blog/route.ts`: Blog listeleme ve yeni blog olusturma API'si.
- `app/api/admin/blog/[id]/route.ts`: Blog guncelleme/silme API'si.
- `app/api/admin/messages/route.ts`: Contact mesajlarini admin panelde listeleme.
- `app/api/admin/messages/[id]/route.ts`: Mesaj status guncelleme API'si.
- `app/api/admin/audit-logs/route.ts`: Audit log listeleme API'si.
- `app/api/admin/translations/draft/route.ts`: Translation draft olusturma API'si.
- `app/api/admin/translations/[id]/review/route.ts`: Translation kaydini reviewed yapma API'si.

## 4. Components

### Layout

- `components/layout/navbar.tsx`: Public site navbar'i. Linkler, aktif route, language/theme/CTA alanlari.
- `components/layout/footer.tsx`: Public site footer'i. Sosyal linkler, alt navigasyon ve kapanis gorsel dili.
- `components/layout/page-transition.tsx`: Framer Motion/Motion route gecis animasyonu.
- `components/layout/site-background.tsx`: Global background katmanlari, aurora/grid/glow efektleri.
- `components/layout/site-chrome.tsx`: Site genel cerceve/chrome yapisi.

### Sections

- `components/sections/hero.tsx`: Home hero metni, CTA'lar, tech badges ve hero visual yerlesimi.
- `components/sections/hero-visual.tsx`: Hero icindeki mockup/3D/gorsel panel.
- `components/sections/engineering-statement.tsx`: Kimlik ve engineering point of view bolumu.
- `components/sections/engineering-layers.tsx`: Scroll storytelling / layered engineering anlatimi.
- `components/sections/tech-stack.tsx`: Teknoloji gruplari, brand icon cloud/map ve tech stack bolumu.
- `components/sections/featured-projects.tsx`: Home'daki secili proje kartlari ve yatay scroll akisi.
- `components/sections/system-stack.tsx`: Sistem/stack gorsel anlatimi.
- `components/sections/call-to-action.tsx`: Home sonundaki contact/CTA bolumu.

### Shared

- `components/shared/container.tsx`: Sayfa genisligini standartlastiran responsive container.
- `components/shared/section.tsx`: Section spacing, eyebrow, title ve description standardi.
- `components/shared/reveal.tsx`: Scroll reveal animasyon wrapper'i.
- `components/shared/stagger-list.tsx`: Cocuk elemanlari sirayla animasyonlu gosteren wrapper.
- `components/shared/animated-text.tsx`: Hero/heading text reveal animasyonlari.
- `components/shared/tech-badge.tsx`: Teknoloji etiketleri/badge gorunumu.
- `components/shared/brand-icons.tsx`: Gercek marka/teknoloji ikonlarini mapleyen component.
- `components/shared/icon-tile.tsx`: Renkli ikon kutucuklari.
- `components/shared/parallax-card.tsx`: Hover/parallax hissi veren kart wrapper'i.
- `components/shared/wheel-scroll.tsx`: Mouse wheel ile yatay scroll davranisi.
- `components/shared/animation-effects.tsx`: Mouse glow, floating effects gibi ortak animasyon efektleri.
- `components/shared/shader-flow.tsx`: Shader/flow tarzi background gecis component'i.
- `components/shared/lanyard.tsx`: Three.js tabanli lanyard/kimlik karti gorseli.

### Projects

- `components/projects/project-card.tsx`: Proje karti. Link, hover, tech badge ve preview bilgileri.
- `components/projects/project-explorer.tsx`: Projects sayfasinda arama, filtreleme ve onerilen projeler mantigi.
- `components/projects/project-gallery.tsx`: Proje kartlarini daha gorsel/galeri formatinda gosteren component.

### Blog

- `components/blog/blog-explorer.tsx`: Blog arama, kategori filtreleme ve onerilen yazilar mantigi.
- `components/blog/blog-post-icon.tsx`: Blog kartlari/detaylari icin kategoriye gore ikon secimi.

### Contact

- `components/contact/contact-form.tsx`: React Hook Form + Zod ile contact form ve success state.
- `components/contact/contact-map-card.tsx`: Contact sayfasindaki location/map tarzi gorsel kart.

### About

- `components/about/timeline.tsx`: Egitim/deneyim timeline animasyonu.

### Admin

- `components/admin/admin-shell.tsx`: Admin layout, sidebar, aktif kullanici ve protected CMS cercevesi.
- `components/admin/login-form.tsx`: Admin login formu.
- `components/admin/register-form.tsx`: Admin register formu.
- `components/admin/logout-button.tsx`: Admin logout islemi.
- `components/admin/user-action-controls.tsx`: Kullanici approve/reject/suspend/reactivate/role update butonlari.
- `components/admin/project-create-form.tsx`: Proje create/edit formu.
- `components/admin/project-delete-button.tsx`: Proje silme butonu.
- `components/admin/blog-post-form.tsx`: Blog create/edit formu.
- `components/admin/blog-post-delete-button.tsx`: Blog silme butonu.
- `components/admin/content-status-button.tsx`: Project/blog publish/archive status degistirme butonu.
- `components/admin/message-status-button.tsx`: Contact mesaj status degistirme butonu.
- `components/admin/translation-action-button.tsx`: Translation review aksiyon butonu.

### UI ve i18n

- `components/ui/button.tsx`: shadcn Button component'i.
- `components/ui/input.tsx`: shadcn Input component'i.
- `components/ui/textarea.tsx`: shadcn Textarea component'i.
- `components/ui/form.tsx`: shadcn form helper componentleri.
- `components/ui/card.tsx`: shadcn Card component'i.
- `components/ui/badge.tsx`: shadcn Badge component'i.
- `components/theme-provider.tsx`: Dark/light theme provider.
- `components/theme-toggle.tsx`: Tema degistirme butonu.
- `components/i18n/language-toggle.tsx`: TR/EN dil secici.

## 5. Data

- `data/projects.ts`: Statik/fallback proje icerigi.
- `data/blog.ts`: Statik/fallback blog icerigi.
- `data/localized-content.ts`: Sayfa metinlerinin TR/EN karsiliklari.
- `data/i18n.ts`: Dil sabitleri ve ceviri yardimci verileri.
- `data/generated-assets.ts`: Uretilen gorsellerin hangi bolumlerde kullanilabilecegine dair asset map.
- `data/admin-access.ts`: Admin roller, permissionlar ve sidebar nav tanimlari.
- `data/admin-content.ts`: Admin dashboard veya plan iceriklerinde kullanilan statik yardimci veri.

## 6. Lib

- `lib/utils.ts`: `cn` gibi className birlestirme yardimcilari.
- `lib/server-locale.ts`: Server tarafinda aktif locale/dil bilgisini okuma.
- `lib/translation-guard.ts`: Ceviri ve fallback mantigi icin koruyucu helperlar.
- `lib/blog-recommendations.ts`: Blog detay/listelerinde ilgili yazilari onerme mantigi.
- `lib/content/projects.ts`: Public site icin DB'den published projeleri okur, yoksa static fallback kullanir.
- `lib/content/blog.ts`: Public site icin DB'den published bloglari okur, yoksa static fallback kullanir.

### Backend

- `lib/backend/prisma.ts`: Prisma client/database baglantisi.
- `lib/backend/session.ts`: Admin session cookie olusturma, okuma ve silme.
- `lib/backend/password.ts`: Password hash/verify yardimcilari.
- `lib/backend/permissions.ts`: Role-permission kontrolu ve admin route korumasi.
- `lib/backend/auth-errors.ts`: Backend hatalarini guvenli response formatina cevirir.
- `lib/backend/admin-user-input.ts`: Admin user update payload Zod schema'si.
- `lib/backend/project-input.ts`: Project create/update Zod schema'si.
- `lib/backend/blog-input.ts`: Blog create/update Zod schema'si.
- `lib/backend/contact-input.ts`: Contact form Zod schema'si.
- `lib/backend/translation-input.ts`: Translation draft/review Zod schema'si.
- `lib/backend/contracts.ts`: Admin/backend route kontratlarini dokumante eden veri.

## 7. Prisma

- `prisma/schema.prisma`: Database modelleri, enumlar ve iliskiler. Model alan hatalari, migration ve Prisma type sorunlarinda ilk bakilacak dosya.
- `prisma/migrations/migration_lock.toml`: Migration provider kilidi.
- `prisma/migrations/20260727152000_init/migration.sql`: Ilk database tablolarini olusturan migration.
- `prisma/migrations/20260729100953_add_project_highlights/migration.sql`: Project highlight/screenshot gibi ek alanlari getiren migration.

## 8. Scripts ve Types

- `scripts/seed-content.ts`: Statik project/blog icerigini database'e seed etmek icin kullanilir.
- `types/projects.ts`: Proje tipleri veya project data yapisi icin ortak TypeScript tipleri.

## 9. Public Assets

- `public/*.svg`: Next/Vercel/file/globe/window gibi temel SVG assetleri.
- `public/images/readme-hero.svg`: README icin hero gorseli.
- `public/images/ai-engineering-hero.png`, `ai-data-pattern.png`, `abstract-3d-object.png`, `code-dashboard-mockup.png`, `hero-glass-crystal.png`: Ana site gorsel dili icin kullanilan premium/abstract assetler.
- `public/images/hero-assets/`: Hero bolumunde denenebilecek/aktarilabilecek Recraft AI assetleri.
- `public/images/background-assets/`: Background texture ve bolum gecislerinde kullanilabilecek assetler.
- `public/images/generated-images/`: Blog, project, about, contact ve background icin uretilen yeni gorseller.
- `public/images/projects/`: Proje detaylari ve kartlari icin proje bazli gorseller.
- `public/assets/lanyard/card.glb`: Lanyard component'inin 3D kart modeli.
- `public/assets/lanyard/lanyard.png`: Lanyard band texture gorseli.

## 10. Hata Aldiginda Ilk Bakilacak Yer

- `Hydration failed`: `app/layout.tsx`, `components/theme-provider.tsx`, `components/theme-toggle.tsx`, client/server component ayrimi.
- `404 page not found`: `app/.../page.tsx`, dinamik route klasoru `[slug]` veya `[id]`.
- `400 Bad Request`: ilgili `app/api/.../route.ts` ve `lib/backend/*-input.ts` Zod schema dosyasi.
- `401 Unauthorized`: `lib/backend/session.ts`, login route, cookie/session durumu.
- `403 Forbidden`: `lib/backend/permissions.ts`, `data/admin-access.ts`, kullanicinin role/permission durumu.
- `Prisma/database error`: `.env`, `prisma.config.ts`, `lib/backend/prisma.ts`, `prisma/schema.prisma`, migration dosyalari.
- `Form submit calismiyor`: ilgili form component'i, fetch endpoint'i, API route ve validation schema.
- `Style bozuk`: `app/globals.css`, Tailwind class'lari, ilgili component.
- `Gorsel gelmiyor`: `public/images/...`, image path'in `/images/...` ile baslamasi, `next/image` kullanimi.
- `Admin sidebar item gorunmuyor`: `data/admin-access.ts` permission tanimi ve `lib/backend/permissions.ts`.
- `Public blog/proje gorunmuyor`: kaydin `PUBLISHED` status'te olup olmadigi ve `lib/content/blog.ts` / `lib/content/projects.ts`.

## 11. Bilmen Gereken Temel Terimler

- Component: UI'nin tekrar kullanilabilir parcasi. Ornek: Navbar, ProjectCard, ContactForm.
- Props: Component'e disaridan verilen veri. Ornek: `title`, `project`, `canPublish`.
- State: Component'in kendi icinde degisen verisi. Ornek: form loading durumu.
- Hook: React'te state, router veya effect kullanmani saglayan fonksiyon. Ornek: `useState`, `useRouter`.
- Client Component: Tarayicida calisan component. Basinda `"use client"` olur.
- Server Component: Server'da render edilen component. Database okumak icin uygundur.
- Route: URL'ye karsilik gelen dosya yolu. Ornek: `app/blog/page.tsx` -> `/blog`.
- Dynamic Route: URL parametresi alan route. Ornek: `app/projects/[slug]/page.tsx`.
- API Endpoint: Frontend'in `fetch` ile istek attigi backend route. Ornek: `/api/admin/blog`.
- Payload: API'ye gonderilen veri paketi.
- Response: API'nin geri dondurdugu cevap.
- Status Code: HTTP sonuc kodu. `200` basarili, `400` veri hatali, `401` giris yok, `403` yetki yok, `500` server hatasi.
- Zod Schema: Gelen verinin dogru formatta olup olmadigini kontrol eden validation yapisi.
- Prisma: TypeScript ile database'e guvenli sekilde erismeyi saglayan ORM.
- ORM: Database tablosunu kod icinde model gibi kullanmani saglayan katman.
- Migration: Database yapisinda yapilan degisikligin versiyonlu SQL kaydi.
- Model: Prisma'da database tablosunu temsil eden yapi.
- Enum: Sadece belirli degerlere izin veren tip. Ornek: `ACTIVE`, `PENDING`, `SUSPENDED`.
- CRUD: Create, Read, Update, Delete islemleri.
- Session: Giris yapan kullanicinin oturum kaydi.
- Cookie: Tarayicida saklanan kucuk veri; admin session token burada durur.
- Permission: Bir aksiyonu yapma izni. Ornek: `posts.publish`.
- Role: Permission paketidir. Ornek: `SUPER_ADMIN`, `EDITOR`.
- Hydration: Server'da uretilen HTML'in client tarafinda React tarafindan canlandirilmasi.
- Revalidation: Veri degisince Next.js'in ilgili sayfa cache'lerini yenilemesi. Ornek: `revalidatePath`.
- Fallback Data: Database bossa veya okunamazsa kullanilan yedek statik veri.
- z-index: UI katman sirasi. Bir sey butonlarin ustune binip tiklamayi engelliyorsa akla gelir.
- Tailwind Class: CSS'i class isimleriyle yazma bicimi. Ornek: `rounded-md`, `text-muted-foreground`.
