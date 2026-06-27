import { Section } from "@/components/shared/section";

export default function AboutPage() {
  return (
    <main>
      <Section
        eyebrow="About"
        title="Frontend odaklı, detay seven ve arayüz hissini önemseyen bir geliştirici."
        description="Bu sayfa daha sonra eğitim, deneyim ve yetkinlik bölümleriyle genişleyecek. Bugün ana layout, tema ve navigation sistemini oturttuğumuz için burada şimdilik temiz bir route iskeleti bırakıyoruz."
      >
        <div className="glass-panel rounded-lg p-6 text-sm leading-7 text-muted-foreground">
          Sonraki adımda bu alana hakkımda, eğitim, deneyim ve yetkinlik
          kartlarını ekleyeceğiz.
        </div>
      </Section>
    </main>
  );
}
