"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Go to home page"
          >
            <span className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary transition group-hover:border-primary/60 group-hover:bg-primary/15">
              ER
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-sm font-semibold tracking-tight">
                Ede-Rojin
              </span>
              <span className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Frontend
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-md border border-border/70 bg-background/45 p-1 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-[6px] px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="active-nav-item"
                      className="absolute inset-0 rounded-[6px] bg-primary/10 ring-1 ring-primary/20"
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
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden rounded-md bg-primary text-primary-foreground shadow-[0_12px_30px_-16px_var(--primary)] hover:bg-primary/90 md:inline-flex"
            >
              <Link href="/contact">
                Let&apos;s talk
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-md border border-border/70 bg-background/50 md:hidden"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
              <div className="mb-4 grid gap-1 rounded-lg border border-border/70 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        active && "bg-primary/10 text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;
