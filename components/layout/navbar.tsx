"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { getI18n, type Locale } from "@/data/i18n";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const copy = getI18n(locale).navbar;

  return (
    <header className="sticky top-3 z-50 px-2">
      <Container size="wide">
        <nav className="navbar-shell glass-panel flex h-16 items-center justify-between gap-4 rounded-lg px-3 shadow-[0_18px_70px_-44px_var(--primary)] backdrop-saturate-150 md:px-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label={copy.items[0].label}
          >
            <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border border-primary/35 bg-primary/10 font-mono text-sm font-semibold text-primary transition group-hover:border-primary/60 group-hover:bg-primary/15">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              E/R
            </span>
            <span className="hidden min-w-0 leading-none sm:block">
              <span className="block text-sm font-semibold tracking-tight">
                Ede-Rojin
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="size-3 text-primary" />
                {copy.brandSubtitle}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-md border border-border/60 bg-background/50 p-1 shadow-inner md:flex">
            {copy.items.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-[6px] px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="active-nav-item"
                      className="absolute inset-0 rounded-[6px] bg-primary/10 ring-1 ring-primary/25"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="navbar-status hidden items-center gap-2 rounded-md border border-border/70 bg-background/45 px-3 py-2 text-xs font-medium text-muted-foreground lg:flex">
              <span className="navbar-status__dot" />
              {copy.status}
            </div>
            <LanguageToggle locale={locale} />
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="navbar-cta hidden h-10 rounded-md bg-foreground text-background shadow-[0_14px_34px_-18px_var(--foreground)] hover:bg-foreground/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 md:inline-flex"
            >
              <Link href="/contact">
                {copy.cta}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-md border border-border/70 bg-background/55 md:hidden"
              aria-label={
                isOpen ? copy.closeMenu : copy.openMenu
              }
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="mt-2 grid gap-1 rounded-lg border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur-xl">
                {copy.items.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        active && "bg-primary/10 text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 inline-flex items-center justify-between rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  {copy.mobileCta}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;
