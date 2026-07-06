import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/container";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
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
    <footer className="footer-skin relative overflow-hidden border-t border-border/70 bg-background/80 py-12 backdrop-blur-xl">
      <div className="technical-grid absolute inset-0 opacity-25" />
      <Container
        size="wide"
        className="relative grid gap-10 lg:grid-cols-[1.1fr_0.7fr_1fr] lg:items-start"
      >
        <div className="max-w-xl">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative grid size-11 place-items-center overflow-hidden rounded-md border border-primary/35 bg-primary/10 font-mono text-sm font-semibold text-primary">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              E/R
            </span>
            <span>
              <span className="block font-semibold tracking-tight">
                Ede-Rojin Systems
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Computer engineering portfolio
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Computer engineering portfolio for practical software, backend
            systems, data analysis, machine learning and intelligent technology
            solutions.
          </p>

          <div className="mt-6 grid max-w-lg gap-2 sm:grid-cols-3">
            {[
              { label: "Case studies", value: "10", icon: Code2 },
              { label: "Focus areas", value: "4", icon: Cpu },
              { label: "Open to build", value: "Now", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-md border border-border/70 bg-background/55 p-3"
                >
                  <Icon className="mb-3 size-4 text-primary" />
                  <p className="text-lg font-semibold tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <nav className="grid gap-2 text-sm" aria-label="Footer navigation">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Explore
          </p>
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

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="max-w-sm rounded-lg border border-border/70 bg-background/60 p-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Remote-friendly</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Based in Turkiye, open to software, AI and data-focused
                  collaborations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
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
                  className="group/social inline-flex h-10 items-center gap-2 rounded-md border border-border/70 bg-background/55 px-3 text-sm text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4 transition group-hover/social:text-primary" />
                  {item.label}
                  {item.href.startsWith("http") ? (
                    <ArrowUpRight className="size-3.5 transition group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" />
                  ) : null}
                </Link>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Built for clarity, continuous learning and practical impact.
          </p>
        </div>
      </Container>
    </footer>
  );
}
