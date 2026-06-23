import { Mail } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main>
      <Section
        eyebrow="Contact"
        title="A working contact form comes next."
        description="Bugün navigation ve layout içinde Contact route'unu kırmadan hazırlıyoruz. Sonraki aşamada React Hook Form, Zod ve EmailJS ya da Resend entegrasyonunu buraya ekleyeceğiz."
      >
        <div className="glass-panel rounded-lg p-6">
          <Button asChild className="rounded-md">
            <a href="mailto:hello@example.com">
              <Mail className="size-4" />
              Send email
            </a>
          </Button>
        </div>
      </Section>
    </main>
  );
}
