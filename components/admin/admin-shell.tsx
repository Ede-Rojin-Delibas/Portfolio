import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LockKeyhole, Sparkles } from "lucide-react";
import { adminNavItems, adminUsers } from "@/data/admin-access";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  activePath: string;
  children: React.ReactNode;
  description: string;
  title: string;
};

export function AdminShell({
  activePath,
  children,
  description,
  title,
}: AdminShellProps) {
  const activeAdmin = adminUsers.find((user) => user.status === "active");

  return (
    <main className="admin-skin section-skin relative min-h-screen overflow-hidden px-3 py-5 md:px-6 md:py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[17rem_1fr]">
        <aside className="glass-panel h-fit rounded-lg p-3 lg:sticky lg:top-5">
          <Link href="/" className="mb-5 flex items-center gap-3 rounded-md p-2">
            <span className="grid size-10 place-items-center rounded-md border border-primary/35 bg-primary/10 font-mono text-sm font-semibold text-primary">
              E/R
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">
                Admin Studio
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="size-3 text-primary" />
                Content CMS
              </span>
            </span>
          </Link>

          <div className="mb-4 rounded-md border border-border/70 bg-background/55 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Active owner
            </p>
            <p className="mt-2 text-sm font-medium">{activeAdmin?.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Super Admin approval model
            </p>
          </div>

          <nav className="grid gap-1" aria-label="Admin navigation">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active =
                activePath === item.href ||
                (item.href !== "/admin" && activePath.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-foreground",
                    active && "bg-primary/10 text-foreground ring-1 ring-primary/20",
                  )}
                >
                  <Icon className="size-4 text-primary transition group-hover:scale-110" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 grid gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Public site
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/admin/login">
                Login flow
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="glass-panel mb-5 rounded-lg p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <LockKeyhole className="size-4" />
                  Protected CMS
                </p>
                <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                  {description}
                </p>
              </div>
              <div className="rounded-md border border-border/70 bg-background/55 px-3 py-2 text-sm text-muted-foreground">
                Static scaffold
              </div>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
