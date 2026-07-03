import type { Metadata } from "next";
import { Code2, ExternalLink, MessageCircle } from "lucide-react";
import { ContactMapCard } from "@/components/contact/contact-map-card";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ede-Rojin about software engineering, data analysis, machine learning and intelligent systems projects.",
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
    value: "Open to software, AI and data projects",
    href: "/projects",
    icon: MessageCircle,
  },
];

export default function ContactPage() {
  return (
    <main>
      <Section
        eyebrow="Collaboration"
        title="Let's talk about practical technology solutions."
        description="Use this page for project ideas, collaboration opportunities, feedback or engineering conversations around software, AI and data."
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-5">
            <Reveal direction="left">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Direct links
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="rounded-md border border-border/70 bg-background/60 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-background/75"
                      >
                        <div className="mb-5 flex items-center justify-between gap-4">
                          <Icon className="size-5 text-primary" />
                          <ExternalLink className="size-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="mt-1 break-words text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <ContactMapCard />
            </Reveal>
          </div>

          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
