# Ede-Rojin Computer Engineering Portfolio

Dark-first computer engineering portfolio focused on practical software,
backend development, data analysis, machine learning and intelligent systems.
Built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Motion,
React Hook Form and Zod.

## Features

- Responsive Home, About, Projects, Project Detail and Contact pages
- Dark/light theme toggle
- Animated headline, scroll reveal, stagger animations, hover interactions, page
  transitions and parallax cards
- Searchable and filterable project listing with visible category controls
- Dynamic project detail routes under `/projects/[slug]`
- Project detail pages with description, stack, screenshots/placeholders, GitHub
  links, demo links and case-study outcomes
- Contact form validation with React Hook Form, Zod, validation errors and a
  success state
- SEO metadata and Open Graph/Twitter metadata
- Software, backend, AI, data and system-oriented projects presented under one
  coherent computer engineering narrative

## Implementation Notes

- Project data lives in `data/projects.ts` and powers both the card grid and the
  dynamic detail pages.
- Project cards highlight the problem space through an `Outcome` section so each
  project communicates value, not only tools.
- Motion is used for hero text, scroll reveal, staggered badges, project filter
  transitions, hover states, page transitions and parallax surfaces.
- The contact form uses React Hook Form for field state and Zod for schema-based
  validation before submission.
- The visual system is dark-first but supports light mode with shared color
  tokens, glass panels and responsive layout rules.

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
