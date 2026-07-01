import type { Metadata } from "next";
import { Code2, ExternalLink, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ede-Rojin with a validated React Hook Form and Zod contact form.",
};

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/Ede-Rojin-Delibas",
    href: "https://github.com/Ede-Rojin-Delibas",
    icon: Code2,
  },
  {
    label: "Previous portfolio",
    value: "ede-rojin-delibas.github.io",
    href: "https://ede-rojin-delibas.github.io/",
    icon: ExternalLink,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ede-rojin-delibas",
    href: "https://www.linkedin.com/in/ede-rojin-deliba%C5%9F/",
    icon: ExternalLink,
  },
  {
    label: "Availability",
    value: "Open to frontend and data projects",
    href: "/projects",
    icon: MessageCircle,
  },
];

export default function ContactPage() {
  return (
    <main>
      <Section
        eyebrow="Contact"
        title="A validated contact form for project conversations."
        description="React Hook Form tracks the fields, Zod defines the rules, and the UI gives clear feedback before a real email provider is connected."
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal direction="left">
            <aside className="glass-panel rounded-lg p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Direct links
              </p>
              <div className="mt-5 grid gap-3">
                {contactLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="rounded-md border border-border/70 bg-background/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                    >
                      <Icon className="mb-5 size-5 text-primary" />
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </a>
                  );
                })}
              </div>
            </aside>
          </Reveal>

          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
