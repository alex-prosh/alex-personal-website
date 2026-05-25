# Personal Website Design Spec
**Date:** 2026-05-24
**Author:** Alex Pro

## Overview

A multi-page personal website for a robotics PhD researcher targeting both academic and industry audiences. Clean, professional, and easy to maintain. Hosted on Vercel with a custom domain via Squarespace DNS.

## Goals

- Serve as a professional home base for both academic peers and industry/recruiters
- Showcase research projects and publications
- Host a blog for technical writing
- Provide a downloadable CV

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Blog:** MDX (Markdown with optional React component embeds)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** Custom domain via Squarespace DNS

All pages are statically generated at build time. No database or server required.

## Visual Design

**Aesthetic:** Warm minimal — off-white backgrounds, warm brown/copper accents, clean sans-serif typography.

**Palette:**
- Background: `#fafaf7`
- Primary text: `#1c1c1c`
- Secondary text: `#7a6a55`
- Accent: `#b07d4a`
- Borders: `#e8e4dc`
- Card background: `#ffffff`

**Typography:** System sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`) for UI. Serif optional for long-form blog post body text.

**Nav:** Sticky top bar, frosted glass blur effect, name on left, page links on right. Active page highlighted in accent color.

## Site Structure

```
/                     → Home / About
/research             → Research projects
/publications         → Publications list
/blog                 → Blog post index
/blog/[slug]          → Individual blog post
/cv                   → CV page with PDF download
```

## Pages

### Home / About (`/`)
- Hero: photo, name, title + affiliation, 2–3 sentence bio
- Social links: GitHub, Google Scholar, Twitter/X, Email (anti-scraper — assembled client-side via JS, never in raw HTML)
- Featured research: 2–3 project cards linking to `/research`
- Recent blog posts: last 3 posts linking to `/blog`
- Footer: name, institution, email (same anti-scraper treatment)

### Research (`/research`)
- Grid of project cards
- Each card: title, tag (e.g. Perception, Control, Learning), short description, links to paper / demo / code
- Data source: `/content/research.ts` (typed TypeScript array)

### Publications (`/publications`)
- Grouped by year, reverse chronological
- Each entry: authors, title, venue, links to PDF / arXiv / project page
- Equal contribution (`*`) notation supported
- Data source: `/content/publications.ts`

### Blog (`/blog`)
- List of posts: title + date, reverse chronological
- Individual posts at `/blog/[slug]` rendered from MDX files in `/content/blog/`
- MDX supports embedded React components (video players, interactive demos, etc.)

### CV (`/cv`)
- Prominent PDF download button
- Optionally: inline rendered CV sections (education, experience, awards, skills)
- PDF stored in `/public/cv.pdf`

## Project File Structure

```
/app
  layout.tsx              ← root layout with NavBar + Footer
  page.tsx                ← Home/About
  /research/page.tsx
  /publications/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /cv/page.tsx

/components
  NavBar.tsx
  Footer.tsx
  ProjectCard.tsx
  PublicationEntry.tsx
  BlogPostCard.tsx
  ObfuscatedEmail.tsx     ← client component, assembles email in JS

/content
  research.ts             ← typed array of projects
  publications.ts         ← typed array of publications
  /blog/*.mdx             ← blog posts

/public
  cv.pdf
  /images                 ← photos, project images
```

## Key Implementation Notes

- **Email anti-scraping:** All email addresses rendered via `<ObfuscatedEmail />`, a client component that builds the address string in JavaScript. The raw email never appears in server-rendered HTML.
- **Static generation:** All pages use `generateStaticParams` / static rendering. No runtime server needed.
- **Blog MDX:** Use `@next/mdx` with `gray-matter` for frontmatter (title, date, tags). Posts live as files in `/content/blog/` and are imported statically.
- **Deployment:** Push to GitHub → auto-deploy on Vercel. Custom domain pointed via Squarespace DNS (CNAME record).

## Out of Scope

- Contact form (email link is sufficient)
- CMS / admin UI (content edited directly in code)
- Comments on blog posts
- RSS feed (can be added later)
- Dark mode (warm minimal light theme only)
