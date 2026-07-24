import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { RegisterForm } from "@/components/admin/register-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Access Request",
  description:
    "Registration request screen for portfolio CMS users awaiting Super Admin approval.",
};

export default function AdminRegisterPage() {
  return (
    <main className="admin-skin section-skin relative grid min-h-screen overflow-hidden px-4 py-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 self-center lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <section className="max-w-xl">
          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link href="/admin/login">
              <ArrowLeft className="size-4" />
              Back to login
            </Link>
          </Button>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <UserPlus className="size-4" />
            Access request
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Request CMS access, then wait for approval.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            This flow protects the portfolio admin area from open registration:
            users can request access, but they cannot enter until approved.
          </p>
        </section>

        <section className="glass-panel rounded-lg p-5 md:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Pending account
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Registration
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              New accounts start as pending. The Super Admin chooses the final
              role before the user can access CMS routes.
            </p>
          </div>
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
