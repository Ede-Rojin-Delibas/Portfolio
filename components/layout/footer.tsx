import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
} from "lucide-react";
import { Container } from "@/components/shared/container";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ede-Rojin-Delibas",
    icon: Code2,
  },
  {
    label: "Old Portfolio",
    href: "https://ede-rojin-delibas.github.io/",
    icon: BriefcaseBusiness,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ede-rojin-deliba%C5%9F/",
    icon: BriefcaseBusiness,
  },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr] md:items-start">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary">
              ER
            </span>
            <span className="font-semibold tracking-tight">Ede-Rojin Portfolio</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Dark-first portfolio for frontend craft, data science projects and
            AI-focused case studies built with Next.js and motion-led
            interactions.
          </p>
        </div>

        <nav className="grid gap-2 text-sm" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-fit text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-border/70 bg-background/50 px-3 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {item.label}
                  {item.href.startsWith("http") ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : null}
                </Link>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Built for performance, clarity and a little glow.
          </p>
        </div>
      </Container>
    </footer>
  );
}
