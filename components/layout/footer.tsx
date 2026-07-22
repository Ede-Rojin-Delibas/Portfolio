import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Globe,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
} from "@/components/shared/brand-icons";
import { getI18n, type Locale } from "@/data/i18n";

const statIcons = [Code2, Cpu, Sparkles];

const socialLinks = (copy: ReturnType<typeof getI18n>["footer"]) => [
  {
    label: "GitHub",
    href: "https://github.com/Ede-Rojin-Delibas",
    icon: GithubBrandIcon,
    tone: "hover:border-[#181717]/40 hover:text-[#181717] dark:hover:text-white",
  },
  {
    label: copy.social.oldPortfolio,
    href: "https://ede-rojin-delibas.github.io/",
    icon: Globe,
    tone: "hover:border-primary/45 hover:text-primary",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ede-rojin-deliba%C5%9F/",
    icon: LinkedinBrandIcon,
    tone: "hover:border-[#0A66C2]/45 hover:text-[#0A66C2]",
  },
  {
    label: copy.social.contact,
    href: "/contact",
    icon: Mail,
    tone: "hover:border-cyan-500/45 hover:text-cyan-600 dark:hover:text-cyan-300",
  },
];

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const copy = getI18n(locale).footer;

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
                {copy.brandTitle}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {copy.brandSubtitle}
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            {copy.description}
          </p>

          <div className="mt-6 grid max-w-lg gap-2 sm:grid-cols-3">
            {copy.stats.map((item, index) => {
              const Icon = statIcons[index] ?? Code2;

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
            {copy.explore}
          </p>
          {copy.nav.map((item) => (
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
                <p className="text-sm font-medium">{copy.locationTitle}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {copy.locationBody}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {socialLinks(copy).map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className={`group/social inline-flex h-10 items-center gap-2 rounded-md border border-border/70 bg-background/55 px-3 text-sm text-muted-foreground transition hover:-translate-y-0.5 hover:bg-background/80 ${item.tone}`}
                >
                  <Icon className="size-4 transition" />
                  {item.label}
                  {item.href.startsWith("http") ? (
                    <ArrowUpRight className="size-3.5 transition group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" />
                  ) : null}
                </Link>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {copy.closing}
          </p>
        </div>
      </Container>
    </footer>
  );
}
