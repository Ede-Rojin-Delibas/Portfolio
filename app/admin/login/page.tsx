import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure login screen for the portfolio CMS admin area.",
};

export default function AdminLoginPage() {
  return (
    <main className="admin-skin section-skin relative grid min-h-screen overflow-hidden px-4 py-6">
      <div className="mx-auto grid w-full max-w-5xl gap-6 self-center lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="max-w-xl">
          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to portfolio
            </Link>
          </Button>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <LockKeyhole className="size-4" />
            Admin authentication
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Sign in to manage the portfolio CMS.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            The admin area will control projects, blog posts, page content,
            media, user approvals, roles and publishing workflow.
          </p>
          <div className="mt-6 rounded-lg border border-border/70 bg-background/55 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                A registered user should never access the panel until a Super
                Admin approves the account and assigns a role.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-lg p-5 md:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Secure entry
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Login
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              First we build the interface and validation. Then we connect it
              to server-side sessions and database users.
            </p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
