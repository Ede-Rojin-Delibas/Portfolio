import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/data/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;

  return isLocale(locale) ? locale : defaultLocale;
}
