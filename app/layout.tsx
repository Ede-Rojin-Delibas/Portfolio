import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ede-rojin.vercel.app"),
  title: {
    default: "Ede-Rojin | Frontend Portfolio",
    template: "%s | Ede-Rojin",
  },
  description:
    "Dark-first frontend portfolio built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Motion, React Hook Form and Zod.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "React Hook Form",
    "Zod",
    "Portfolio",
  ],
  authors: [{ name: "Ede-Rojin" }],
  openGraph: {
    title: "Ede-Rojin | Frontend Portfolio",
    description:
      "A dark-first developer portfolio with animated project surfaces and validated contact workflows.",
    url: "https://ede-rojin.vercel.app",
    siteName: "Ede-Rojin Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ede-Rojin | Frontend Portfolio",
    description:
      "Next.js portfolio with motion, project filtering, dark/light theme and form validation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={cn(
        "dark h-full antialiased",
        "font-sans",
      )}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
