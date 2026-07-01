# Ede-Rojin Portfolio

Dark-first frontend portfolio built with Next.js App Router, TypeScript,
Tailwind CSS, shadcn/ui, Motion, React Hook Form and Zod.

## Features

- Responsive Home, About, Projects, Project Detail and Contact pages
- Dark/light theme toggle
- Animated headline, scroll reveal, stagger animations, hover interactions,
  page transitions and parallax cards
- Searchable and filterable project listing
- Dynamic project detail routes under `/projects/[slug]`
- Contact form validation with React Hook Form and Zod
- SEO metadata and Open Graph/Twitter metadata

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Lucide React
- Motion
- React Hook Form
- Zod

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Quality Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository on Vercel.
3. Keep the framework preset as `Next.js`.
4. Use the default build command: `npm run build`.
5. After deployment, share the generated `*.vercel.app` URL as the live demo.

If the production branch is `master`, make sure Vercel is using `master` as the
production branch in Project Settings.
