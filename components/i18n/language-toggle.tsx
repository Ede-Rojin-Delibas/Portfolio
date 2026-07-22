"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getI18n,
  localeCookieName,
  type Locale,
} from "@/data/i18n";
import { Button } from "@/components/ui/button";

type LanguageToggleProps = {
  locale: Locale;
};

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const copy = getI18n(locale).language;
  const nextLocale: Locale = locale === "en" ? "tr" : "en";

  function switchLanguage() {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      title={copy.title}
      aria-label={copy.ariaLabel}
      className="h-10 rounded-md border border-border/70 bg-background/50 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
    >
      <Languages className="size-4" />
      {copy.next}
    </Button>
  );
}
