import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteBackground } from "@/components/layout/site-background";
import { getServerLocale } from "@/lib/server-locale";

const geistSans = localFont({
  src: "./fonts/geist-latin-ext.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-ext.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ede-rojin.vercel.app"),
  title: {
    default: "Ede-Rojin | Computer Engineering for Intelligent Systems",
    template: "%s | Ede-Rojin",
  },
  description:
    "Computer engineering portfolio focused on practical software, backend development, data analysis, machine learning and intelligent systems.",
  keywords: [
    "Computer Engineering",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analysis",
    "Backend Development",
    "Flask",
    "Python",
    "SQL",
    "REST API",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ede-Rojin" }],
  openGraph: {
    title: "Ede-Rojin | Computer Engineering for Intelligent Systems",
    description:
      "A portfolio for practical software, backend, AI, data and system-oriented engineering work.",
    url: "https://ede-rojin.vercel.app",
    siteName: "Ede-Rojin Computer Engineering Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ede-Rojin | Computer Engineering for Intelligent Systems",
    description:
      "Computer engineering portfolio with software, AI, data and backend case studies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "dark h-full font-sans antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <SiteBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar locale={locale} />
            <div className="flex-1">{children}</div>
            <Footer locale={locale} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
