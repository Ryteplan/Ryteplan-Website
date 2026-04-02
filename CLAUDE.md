# Ryteplan Website

A Next.js 16 website integrated with Builder.io as a headless CMS.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript 5)
- **CMS**: Builder.io (`@builder.io/react`, `@builder.io/widgets`, `@builder.io/sdk`)
- **Styling**: Tailwind CSS 4, Flowbite / flowbite-react
- **Fonts**: Geist (sans + mono) via Google Fonts

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm start         # Start production server
npm run lint      # Run ESLint
```

## Project Structure

```
app/
  page.tsx              # Homepage — fetches Builder "page" model for "/"
  layout.tsx            # Root layout — fetches Builder "settings" model for metadata
  global_error.tsx      # Global error boundary
  globals.css           # Tailwind theme + global styles
  [...page]/page.tsx    # Catch-all dynamic pages from Builder "page" model
  blog/[slug]/page.tsx  # Blog posts from Builder "blog-post" model
  edit-symbol/page.tsx  # Symbol editor for Builder "symbol" model
components/
  builder.tsx           # RenderBuilderContent — client component, hydration-safe Builder renderer
lib/
  builder-settings.ts   # getBuilderSettings() — cached fetch of site-wide settings from Builder
```

## Builder.io Integration

- **API key**: `NEXT_PUBLIC_BUILDER_API_KEY` in `.env`
- **Models**: `page`, `blog-post`, `symbol`, `settings`
- **Pattern**: Pages fetch content server-side via `builder.get()`, then render client-side via `BuilderComponent`
- **Hydration**: `RenderBuilderContent` defers rendering until after hydration to avoid mismatches

## Deployment

- **Platform**: Cloudflare Workers & Pages
- **Project**: `ryteplan-website`
- **Domains**: ryteplan-website.pages.dev, ryteplan.com
- **GitHub repo**: Ryteplan/Ryteplan-Website
- **Auto-deploy**: Enabled — pushes to `main` trigger production deployments via deploy hook

## Key Conventions

- Pages use server components for data fetching; Builder rendering is client-side
- URL validation ensures Builder content matches the requested path exactly
- `@/*` path alias maps to the project root (tsconfig)
- Catch-all and blog routes use edge runtime
