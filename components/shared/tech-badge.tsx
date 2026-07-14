"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import {
  type LucideIcon,
  Activity,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Clock3,
  Cloud,
  Code2,
  Database,
  FileText,
  FlaskRound,
  FolderGit,
  Gauge,
  GitBranch,
  Hash,
  Layers,
  Lightbulb,
  Monitor,
  MonitorPlay,
  Network,
  PieChart,
  ShieldCheck,
  Sparkles,
  SquareStack,
  Terminal,
  Timer,
  Type,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TechBadgeProps = React.ComponentProps<typeof Badge> & {
  // accept either a Lucide icon component or a React node (JSX element)
  icon?: LucideIcon | React.ReactNode;
};

const techBadgeIconMap: Record<string, LucideIcon | undefined> = {
  python: Code2,
  flask: FlaskRound,
  "machine learning": BrainCircuit,
  "machine learning workflows": BrainCircuit,
  ml: BrainCircuit,
  "rest apis": Cloud,
  "rest api": Cloud,
  api: Cloud,
  sql: Database,
  "data analysis": BarChart3,
  "data visualization": PieChart,
  eda: BarChart3,
  pandas: Database,
  numpy: Code2,
  "jupyter notebook": BookOpen,
  notebook: BookOpen,
  nlp: FileText,
  "text classification": FileText,
  javascript: Code2,
  typescript: Type,
  "next.js": SquareStack,
  "tailwind css": Sparkles,
  tailwind: Sparkles,
  git: GitBranch,
  "git & github": FolderGit,
  github: FolderGit,
  ai: Sparkles,
  "backend systems": Monitor,
  "backend development": Monitor,
  "interface delivery": Monitor,
  "problem solving": Lightbulb,
  "networking fundamentals": Network,
  architecture: Layers,
  systems: Network,
  research: Lightbulb,
  "continuous learning": Sparkles,
  "self-learning": Sparkles,
  "critical thinking": Lightbulb,
  "time management": Timer,
  "data privacy": ShieldCheck,
  "customer analytics": BarChart3,
  "education analytics": BookOpen,
  "onion architecture": Layers,
  "asp.net": Monitor,
  "c#": Hash,
  html: Code2,
  css: Sparkles,
  "react hook form": BookOpen,
  zod: ShieldCheck,
  sdv: Database,
  sdmetrics: Gauge,
  "ai suggestions": Sparkles,
  "time blocking": Clock3,
  pomodoro: Timer,
  "productivity ux": Monitor,
  ux: Monitor,
  evaluation: Gauge,
  analytics: BarChart3,
  "customer behavior": BarChart3,
  "model evaluation": Gauge,
  streamlit: MonitorPlay,
  lora: Zap,
  peft: Zap,
  "llm fine-tuning": Activity,
  "api design": Cloud,
  "entity models": Layers,
  linux: Terminal,
};

const techIconImageMap: Record<string, string> = {
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  flask:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "tailwind css":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "git & github":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  linux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  pandas:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  numpy:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "scikit-learn":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "c#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "asp.net":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  opencv:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
};

const techIconAliasMap: Record<string, string> = {
  "python workflows": "python",
  "flask apis": "flask",
  "typescript ui": "typescript",
  "react interfaces": "react",
  "next.js routes": "next.js",
  "tailwind systems": "tailwind css",
  "pandas analysis": "pandas",
  "numpy arrays": "numpy",
  "scikit-learn models": "scikit-learn",
  "sql queries": "sql",
  "c# backend": "c#",
  "github delivery": "github",
  "linux basics": "linux",
};

const techBadgeToneMap: Record<string, string> = {
  python:
    "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-500/15",
  flask:
    "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:border-rose-400/25 dark:bg-rose-500/15",
  "machine learning":
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15",
  ml: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15",
  "rest apis":
    "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  "rest api":
    "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  api: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  sql: "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:border-violet-400/25 dark:bg-violet-500/15",
  "data analysis":
    "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/25 dark:bg-indigo-500/15",
  "data visualization":
    "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-700 dark:border-fuchsia-400/25 dark:bg-fuchsia-500/15",
  eda: "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:border-rose-400/25 dark:bg-rose-500/15",
  pandas:
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  numpy:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15",
  "jupyter notebook":
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/15",
  nlp: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  "text classification":
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15",
  javascript:
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/15",
  typescript:
    "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-500/15",
  "next.js":
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  "tailwind css":
    "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  git: "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  github:
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  "backend development":
    "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-500/15",
  "interface delivery":
    "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:border-violet-400/25 dark:bg-violet-500/15",
  "problem solving":
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/15",
  "data privacy":
    "border-red-500/25 bg-red-500/10 text-red-700 dark:border-red-400/25 dark:bg-red-500/15",
  "onion architecture":
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  "asp.net":
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  "c#": "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  zod: "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:border-violet-400/25 dark:bg-violet-500/15",
  "time blocking":
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/15",
  pomodoro:
    "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:border-orange-400/25 dark:bg-orange-500/15",
  "productivity ux":
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  streamlit:
    "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:bg-sky-500/15",
  "customer analytics":
    "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/25 dark:bg-indigo-500/15",
  "education analytics":
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/15",
  analytics:
    "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/25 dark:bg-indigo-500/15",
  evaluation:
    "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  ai: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-500/15",
  ux: "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/15",
  linux:
    "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:border-violet-400/25 dark:bg-violet-500/15",
};

export function getTechBadgeIcon(tech: string): LucideIcon | undefined {
  return techBadgeIconMap[tech.toLowerCase()];
}

export function getTechIconImagePath(tech: string) {
  const key = tech.toLowerCase();

  return techIconImageMap[key] ?? techIconImageMap[techIconAliasMap[key]];
}

export function getTechBadgeToneClass(tech: string): string {
  const key = tech.toLowerCase();

  return (
    techBadgeToneMap[key] ??
    techBadgeToneMap[techIconAliasMap[key]] ??
    "border-primary/25 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary-foreground"
  );
}

export function TechBadge({
  className,
  icon,
  children,
  ...props
}: TechBadgeProps) {
  const label = typeof children === "string" ? children : undefined;
  const BadgeIcon = icon;
  const imagePath = label ? getTechIconImagePath(label) : undefined;
  const toneClass = label ? getTechBadgeToneClass(label) : undefined;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 rounded-full border px-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-sm transition duration-200",
        toneClass,
        "text-foreground/85 dark:text-foreground/85",
        className,
      )}
      {...props}
    >
      {imagePath ? (
        <img
          src={imagePath}
          alt={label ?? "icon"}
          className="size-3 rounded-sm object-contain tech-badge__img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      {BadgeIcon
        ? React.isValidElement(BadgeIcon)
          ? BadgeIcon
          : typeof BadgeIcon === "function"
            ? // BadgeIcon may be a Lucide component (function component)
              React.createElement(BadgeIcon as LucideIcon, {
                className: "size-3",
              })
            : null
        : null}

      {children}
    </Badge>
  );
}
