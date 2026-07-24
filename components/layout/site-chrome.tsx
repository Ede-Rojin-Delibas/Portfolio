"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { SiteBackground } from "@/components/layout/site-background";
import type { Locale } from "@/data/i18n";

type SiteChromeProps = {
  children: React.ReactNode;
  locale: Locale;
};

export function SiteChrome({ children, locale }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="relative z-10 min-h-screen">{children}</div>;
  }

  return (
    <>
      <SiteBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar locale={locale} />
        <div className="flex-1">{children}</div>
        <Footer locale={locale} />
      </div>
    </>
  );
}
