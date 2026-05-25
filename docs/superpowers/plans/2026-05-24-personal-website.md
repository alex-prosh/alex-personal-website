# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page personal website for a robotics PhD researcher with research, publications, blog, and CV sections.

**Architecture:** Next.js 14 App Router with static generation, Tailwind CSS for styling, and `next-mdx-remote` for file-based MDX blog posts. All content is stored as TypeScript data files or MDX files — no database or CMS. Email addresses are rendered client-side only to prevent scraping.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-mdx-remote, gray-matter, Jest, React Testing Library

---

## File Map

```
/app
  layout.tsx                    ← root layout: NavBar + children + Footer
  globals.css                   ← Tailwind base + custom CSS variables
  page.tsx                      ← Home / About page
  /research/page.tsx            ← Research projects page
  /publications/page.tsx        ← Publications list page
  /blog/page.tsx                ← Blog post index
  /blog/[slug]/page.tsx         ← Individual blog post
  /cv/page.tsx                  ← CV + PDF download

/components
  NavBar.tsx                    ← sticky top nav
  Footer.tsx                    ← site footer with obfuscated email
  ObfuscatedEmail.tsx           ← 'use client' — builds email in JS only
  ProjectCard.tsx               ← research project card
  PublicationEntry.tsx          ← single publication row
  BlogPostCard.tsx              ← blog post list item

/content
  research.ts                   ← typed Project[] data
  publications.ts               ← typed Publication[] data
  /blog/
    sample-post.mdx             ← example blog post

/lib
  blog.ts                       ← read MDX files, parse frontmatter, list posts

/types
  index.ts                      ← Project, Publication, BlogPostMeta types

/public
  cv.pdf                        ← placeholder CV PDF

next.config.ts                  ← Next.js config
tailwind.config.ts              ← Tailwind config
jest.config.ts                  ← Jest config
jest.setup.ts                   ← jest-dom matchers
```

---

## Task 1: Bootstrap Next.js project

**Files:**
- Replace: `package.json`
- Replace: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Delete: `src/index.ts` (leftover scaffold)

- [ ] **Step 1: Install dependencies**

```bash
npm install next@14 react react-dom
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install gray-matter next-mdx-remote
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
npm install -D @types/jest @types/gray-matter
```

- [ ] **Step 2: Replace package.json**

```json
{
  "name": "alex-personal-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "next": "14",
    "react": "^18",
    "react-dom": "^18",
    "gray-matter": "^4.0.3",
    "next-mdx-remote": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/gray-matter": "^4.0.3",
    "tailwindcss": "^3",
    "postcss": "^8",
    "autoprefixer": "^10",
    "jest": "^29",
    "jest-environment-jsdom": "^29",
    "@testing-library/react": "^14",
    "@testing-library/jest-dom": "^6",
    "@types/jest": "^29"
  }
}
```

- [ ] **Step 3: Replace tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {}

export default config
```

- [ ] **Step 5: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fafaf7',
        accent: '#b07d4a',
        muted: '#7a6a55',
        border: '#e8e4dc',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: Create jest.config.ts**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 8: Create jest.setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Delete old scaffold file**

```bash
rm src/index.ts
rmdir src
```

- [ ] **Step 10: Verify Next.js starts**

```bash
npm run dev
```

Expected: server starts at http://localhost:3000 (404 is fine — no pages yet)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js with Tailwind and Jest"
```

---

## Task 2: Define shared TypeScript types

**Files:**
- Create: `types/index.ts`
- Create: `types/index.test.ts`

- [ ] **Step 1: Write the failing type test**

Create `types/index.test.ts`:

```ts
import type { Project, Publication, BlogPostMeta } from './index'

describe('Project type', () => {
  it('accepts a valid project', () => {
    const p: Project = {
      title: 'My Robot',
      description: 'It walks.',
      tag: 'Locomotion',
      links: { paper: 'https://arxiv.org/abs/1234' },
    }
    expect(p.title).toBe('My Robot')
  })
})

describe('Publication type', () => {
  it('accepts a valid publication', () => {
    const pub: Publication = {
      year: 2025,
      title: 'Learning to Walk',
      authors: ['Alex Pro', 'Co Author'],
      venue: 'ICRA 2025',
      links: { pdf: 'https://example.com/paper.pdf' },
    }
    expect(pub.year).toBe(2025)
  })
})

describe('BlogPostMeta type', () => {
  it('accepts valid frontmatter', () => {
    const meta: BlogPostMeta = {
      slug: 'my-post',
      title: 'My Post',
      date: '2026-05-01',
    }
    expect(meta.slug).toBe('my-post')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- types/index.test.ts
```

Expected: FAIL — cannot find module `./index`

- [ ] **Step 3: Create types/index.ts**

```ts
export interface Project {
  title: string
  description: string
  tag: string
  links: {
    paper?: string
    demo?: string
    code?: string
  }
}

export interface Publication {
  year: number
  title: string
  authors: string[]
  venue: string
  equalContribution?: boolean
  links: {
    pdf?: string
    arxiv?: string
    project?: string
  }
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags?: string[]
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- types/index.test.ts
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add types/
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Content data files

**Files:**
- Create: `content/research.ts`
- Create: `content/publications.ts`

- [ ] **Step 1: Create content/research.ts**

Replace placeholder text with your real projects. Add as many entries as needed following this shape:

```ts
import type { Project } from '@/types'

export const projects: Project[] = [
  {
    title: 'Contact-Implicit Motion Planning for Dexterous Manipulation',
    description:
      'A unified framework for planning through contact using learned object representations and differentiable simulation.',
    tag: 'Perception',
    links: {
      paper: 'https://arxiv.org/abs/XXXX.XXXXX',
      demo: 'https://youtube.com/watch?v=XXXX',
      code: 'https://github.com/alex-prosh/XXXX',
    },
  },
  {
    title: 'Adaptive Locomotion on Deformable Terrain',
    description:
      'Reinforcement learning policies that generalize across sand, mud, and gravel without terrain-specific fine-tuning.',
    tag: 'Control',
    links: {
      paper: 'https://arxiv.org/abs/XXXX.XXXXX',
      demo: 'https://youtube.com/watch?v=XXXX',
    },
  },
]
```

- [ ] **Step 2: Create content/publications.ts**

```ts
import type { Publication } from '@/types'

export const publications: Publication[] = [
  {
    year: 2025,
    title: 'Contact-Implicit Motion Planning for Dexterous Manipulation',
    authors: ['Alex Pro', 'Collaborator One', 'Collaborator Two'],
    venue: 'ICRA 2025',
    links: {
      pdf: 'https://example.com/paper.pdf',
      arxiv: 'https://arxiv.org/abs/XXXX.XXXXX',
    },
  },
  {
    year: 2024,
    title: 'Adaptive Locomotion on Deformable Terrain',
    authors: ['Alex Pro', 'Collaborator Three'],
    venue: 'CoRL 2024',
    equalContribution: false,
    links: {
      pdf: 'https://example.com/paper2.pdf',
    },
  },
]
```

- [ ] **Step 3: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat: add research and publications data"
```

---

## Task 4: ObfuscatedEmail component

**Files:**
- Create: `components/ObfuscatedEmail.tsx`
- Create: `components/ObfuscatedEmail.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/ObfuscatedEmail.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import ObfuscatedEmail from './ObfuscatedEmail'

describe('ObfuscatedEmail', () => {
  it('renders a mailto link', () => {
    const { getByRole } = render(
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    )
    const link = getByRole('link')
    expect(link).toHaveAttribute('href', 'mailto:pro@berkeley.edu')
  })

  it('displays the assembled email address', () => {
    const { getByText } = render(
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    )
    expect(getByText('pro@berkeley.edu')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- ObfuscatedEmail.test.tsx
```

Expected: FAIL — cannot find module `./ObfuscatedEmail`

- [ ] **Step 3: Create components/ObfuscatedEmail.tsx**

```tsx
'use client'

interface Props {
  user: string
  domain: string
  className?: string
}

export default function ObfuscatedEmail({ user, domain, className }: Props) {
  const email = `${user}@${domain}`
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- ObfuscatedEmail.test.tsx
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ObfuscatedEmail.tsx components/ObfuscatedEmail.test.tsx
git commit -m "feat: add ObfuscatedEmail client component"
```

---

## Task 5: NavBar component

**Files:**
- Create: `components/NavBar.tsx`
- Create: `components/NavBar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/NavBar.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import NavBar from './NavBar'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

describe('NavBar', () => {
  it('renders all nav links', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('About')).toBeInTheDocument()
    expect(getByText('Research')).toBeInTheDocument()
    expect(getByText('Publications')).toBeInTheDocument()
    expect(getByText('Blog')).toBeInTheDocument()
    expect(getByText('CV')).toBeInTheDocument()
  })

  it('renders the site name', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('Alex Pro')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- NavBar.test.tsx
```

Expected: FAIL — cannot find module `./NavBar`

- [ ] **Step 3: Create components/NavBar.tsx**

```tsx
import Link from 'next/link'

const links = [
  { label: 'About', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
]

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 h-14">
        <Link href="/" className="text-sm font-semibold text-[#1c1c1c] tracking-tight">
          Alex Pro
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- NavBar.test.tsx
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/NavBar.tsx components/NavBar.test.tsx
git commit -m "feat: add NavBar component"
```

---

## Task 6: Footer + root layout + globals.css

**Files:**
- Create: `components/Footer.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
import ObfuscatedEmail from './ObfuscatedEmail'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-3xl px-6 py-6 flex justify-between items-center">
        <span className="text-xs text-muted">Alex Pro · UC Berkeley</span>
        <ObfuscatedEmail
          user="pro"
          domain="berkeley.edu"
          className="text-xs text-muted hover:text-accent transition-colors"
        />
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #fafaf7;
}

body {
  background-color: var(--background);
  color: #1c1c1c;
}
```

- [ ] **Step 3: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Alex Pro',
  description: 'Robotics researcher at UC Berkeley',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify the dev server renders a page with nav and footer**

```bash
npm run dev
```

Open http://localhost:3000. You should see the NavBar and Footer with a blank main area (404 error content is fine).

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx app/layout.tsx app/globals.css
git commit -m "feat: add root layout with NavBar and Footer"
```

---

## Task 7: Home / About page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import Link from 'next/link'
import { projects } from '@/content/research'
import { getBlogPosts } from '@/lib/blog'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'

export default async function HomePage() {
  const recentPosts = (await getBlogPosts()).slice(0, 3)
  const featuredProjects = projects.slice(0, 2)

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="flex gap-10 items-start pt-16 pb-12">
        <div
          className="w-28 h-28 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-light"
          style={{ background: 'linear-gradient(135deg, #d4c9b8, #b07d4a)' }}
          aria-label="Profile photo placeholder"
        >
          A
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Alex Pro</h1>
          <p className="text-sm text-accent font-medium mb-4">
            PhD Researcher · UC Berkeley
          </p>
          <p className="text-sm text-[#4a4a4a] leading-relaxed mb-5">
            I build robots that can perceive and act in unstructured environments.
            My research focuses on perception, motion planning, and learning-based
            control for manipulation and locomotion tasks.
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'GitHub', href: 'https://github.com/alex-prosh' },
              { label: 'Google Scholar', href: '#' },
              { label: 'Twitter', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-muted border border-border rounded px-3 py-1 hover:border-accent hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
            <ObfuscatedEmail
              user="pro"
              domain="berkeley.edu"
              className="text-xs text-muted border border-border rounded px-3 py-1 hover:border-accent hover:text-accent transition-colors"
            />
          </div>
        </div>
      </section>

      <hr className="border-border mb-10" />

      {/* Featured Research */}
      <section className="mb-14">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-5">
          Featured Research
        </p>
        <div className="flex flex-col gap-3">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="border border-border rounded-lg p-5 bg-white flex gap-4 items-start"
            >
              <span className="text-[10px] bg-[#f0ece4] text-muted px-2 py-1 rounded whitespace-nowrap mt-0.5 flex-shrink-0">
                {project.tag}
              </span>
              <div>
                <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  {project.links.paper && (
                    <a href={project.links.paper} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      Paper →
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      Demo →
                    </a>
                  )}
                  {project.links.code && (
                    <a href={project.links.code} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      Code →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/research" className="text-xs text-accent mt-4 inline-block hover:underline">
          All research →
        </Link>
      </section>

      <hr className="border-border mb-10" />

      {/* Recent Posts */}
      <section className="mb-14">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-5">
          Recent Posts
        </p>
        <div>
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex justify-between items-baseline py-3 border-b border-[#f0ece4] hover:text-accent transition-colors group"
            >
              <span className="text-sm group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <span className="text-xs text-[#b4a898] whitespace-nowrap ml-4">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="text-xs text-accent mt-4 inline-block hover:underline">
          All posts →
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify page renders in dev**

```bash
npm run dev
```

Open http://localhost:3000. This will error until `lib/blog.ts` exists (next task). That's expected.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home/about page"
```

---

## Task 8: Blog library + sample post

**Files:**
- Create: `lib/blog.ts`
- Create: `lib/blog.test.ts`
- Create: `content/blog/sample-post.mdx`

- [ ] **Step 1: Write the failing test**

Create `lib/blog.test.ts`:

```ts
import { getBlogPosts, getBlogPost } from './blog'
import path from 'path'

describe('getBlogPosts', () => {
  it('returns an array of post metadata', async () => {
    const posts = await getBlogPosts()
    expect(Array.isArray(posts)).toBe(true)
    posts.forEach((post) => {
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
    })
  })

  it('returns posts sorted newest first', async () => {
    const posts = await getBlogPosts()
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date) >= new Date(posts[i].date)).toBe(true)
    }
  })
})

describe('getBlogPost', () => {
  it('returns content and meta for a valid slug', async () => {
    const result = await getBlogPost('sample-post')
    expect(result).not.toBeNull()
    expect(result!.meta.title).toBeDefined()
    expect(result!.content).toBeDefined()
  })

  it('returns null for an unknown slug', async () => {
    const result = await getBlogPost('does-not-exist-xyz')
    expect(result).toBeNull()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- lib/blog.test.ts
```

Expected: FAIL — cannot find module `./blog`

- [ ] **Step 3: Create content/blog/sample-post.mdx**

```mdx
---
title: Why contact-rich manipulation is still an open problem
date: 2026-05-01
tags: [manipulation, planning]
---

Contact-rich manipulation — grasping, inserting, pivoting, sliding — remains one of the hardest problems in robotics. Here's why.

## The core difficulty

When a robot finger touches an object, the contact geometry changes discontinuously. This makes differentiating through contact hard, which breaks most gradient-based planners.

## Current approaches

Three main families of approaches exist today...
```

- [ ] **Step 4: Create lib/blog.ts**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPostMeta } from '@/types'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts: BlogPostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: data.tags as string[] | undefined,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getBlogPost(
  slug: string
): Promise<{ meta: BlogPostMeta; content: string } | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: data.tags as string[] | undefined,
    },
    content,
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- lib/blog.test.ts
```

Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add lib/blog.ts lib/blog.test.ts content/blog/sample-post.mdx
git commit -m "feat: add blog library and sample post"
```

---

## Task 9: ProjectCard + Research page

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `app/research/page.tsx`

- [ ] **Step 1: Create components/ProjectCard.tsx**

```tsx
import type { Project } from '@/types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-border rounded-lg p-5 bg-white flex gap-4 items-start">
      <span className="text-[10px] bg-[#f0ece4] text-muted px-2 py-1 rounded whitespace-nowrap mt-0.5 flex-shrink-0">
        {project.tag}
      </span>
      <div>
        <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
        <p className="text-xs text-muted leading-relaxed mb-3">{project.description}</p>
        <div className="flex gap-4">
          {project.links.paper && (
            <a href={project.links.paper} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Paper →
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Demo →
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Code →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/research/page.tsx**

```tsx
import type { Metadata } from 'next'
import { projects } from '@/content/research'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: 'Research · Alex Pro' }

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Research</h1>
      <p className="text-sm text-muted mb-10">
        Projects in perception, planning, and learning-based control.
      </p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify page renders in dev**

```bash
npm run dev
```

Open http://localhost:3000/research. Should show all projects.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectCard.tsx app/research/page.tsx
git commit -m "feat: add research page and ProjectCard component"
```

---

## Task 10: PublicationEntry + Publications page

**Files:**
- Create: `components/PublicationEntry.tsx`
- Create: `app/publications/page.tsx`

- [ ] **Step 1: Create components/PublicationEntry.tsx**

```tsx
import type { Publication } from '@/types'

interface Props {
  publication: Publication
}

export default function PublicationEntry({ publication }: Props) {
  return (
    <div className="py-4 border-b border-[#f0ece4] last:border-0">
      <h3 className="text-sm font-medium mb-1">{publication.title}</h3>
      <p className="text-xs text-muted mb-2">
        {publication.authors.join(', ')}
        {publication.equalContribution && ' (* equal contribution)'}
      </p>
      <p className="text-xs text-muted italic mb-2">{publication.venue}</p>
      <div className="flex gap-4">
        {publication.links.pdf && (
          <a href={publication.links.pdf} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            PDF →
          </a>
        )}
        {publication.links.arxiv && (
          <a href={publication.links.arxiv} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            arXiv →
          </a>
        )}
        {publication.links.project && (
          <a href={publication.links.project} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Project →
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/publications/page.tsx**

```tsx
import type { Metadata } from 'next'
import { publications } from '@/content/publications'
import PublicationEntry from '@/components/PublicationEntry'

export const metadata: Metadata = { title: 'Publications · Alex Pro' }

export default function PublicationsPage() {
  const years = [...new Set(publications.map((p) => p.year))].sort(
    (a, b) => b - a
  )

  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <h1 className="text-2xl font-semibold tracking-tight mb-10">Publications</h1>
      {years.map((year) => (
        <div key={year} className="mb-10">
          <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-4">
            {year}
          </p>
          {publications
            .filter((p) => p.year === year)
            .map((pub) => (
              <PublicationEntry key={pub.title} publication={pub} />
            ))}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Verify page renders in dev**

Open http://localhost:3000/publications. Should show publications grouped by year.

- [ ] **Step 4: Commit**

```bash
git add components/PublicationEntry.tsx app/publications/page.tsx
git commit -m "feat: add publications page and PublicationEntry component"
```

---

## Task 11: Blog index + BlogPostCard

**Files:**
- Create: `components/BlogPostCard.tsx`
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Create components/BlogPostCard.tsx**

```tsx
import Link from 'next/link'
import type { BlogPostMeta } from '@/types'

interface Props {
  post: BlogPostMeta
}

export default function BlogPostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex justify-between items-baseline py-4 border-b border-[#f0ece4] hover:text-accent transition-colors group"
    >
      <span className="text-sm group-hover:text-accent transition-colors">
        {post.title}
      </span>
      <span className="text-xs text-[#b4a898] whitespace-nowrap ml-4">
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
      </span>
    </Link>
  )
}
```

- [ ] **Step 2: Create app/blog/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = { title: 'Blog · Alex Pro' }

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Blog</h1>
      <p className="text-sm text-muted mb-10">
        Writing on robotics, research, and things I find interesting.
      </p>
      <div>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify page renders in dev**

Open http://localhost:3000/blog. Should list the sample post.

- [ ] **Step 4: Commit**

```bash
git add components/BlogPostCard.tsx app/blog/page.tsx
git commit -m "feat: add blog index page and BlogPostCard component"
```

---

## Task 12: Blog post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/blog/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getBlogPosts } from '@/lib/blog'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return {}
  return { title: `${post.meta.title} · Alex Pro` }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-2xl px-6 pt-14 pb-20">
      <p className="text-xs text-muted mb-3">
        {new Date(post.meta.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight mb-10">
        {post.meta.title}
      </h1>
      <article className="prose prose-sm max-w-none text-[#1c1c1c]">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
```

- [ ] **Step 2: Verify blog post renders in dev**

Open http://localhost:3000/blog/sample-post. Should render the sample post content.

- [ ] **Step 3: Commit**

```bash
git add app/blog/
git commit -m "feat: add individual blog post page with MDX rendering"
```

---

## Task 13: CV page

**Files:**
- Create: `app/cv/page.tsx`
- Create: `public/cv.pdf` (placeholder — replace with your actual CV)

- [ ] **Step 1: Add a placeholder CV PDF**

```bash
# Create a placeholder — replace with your real CV
touch public/cv.pdf
```

- [ ] **Step 2: Create app/cv/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CV · Alex Pro' }

export default function CVPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-semibold tracking-tight">CV</h1>
        <a
          href="/cv.pdf"
          download
          className="text-sm text-white bg-accent hover:bg-[#9a6a3a] transition-colors px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>

      <section className="mb-10">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-4">
          Education
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">PhD, Robotics</span>
              <span className="text-xs text-muted">2023 – present</span>
            </div>
            <p className="text-xs text-muted">UC Berkeley</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-4">
          Experience
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Research Intern</span>
              <span className="text-xs text-muted">Summer 2024</span>
            </div>
            <p className="text-xs text-muted">Company Name</p>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Verify page renders in dev**

Open http://localhost:3000/cv. Should show the CV page with download button.

- [ ] **Step 4: Commit**

```bash
git add app/cv/page.tsx public/cv.pdf
git commit -m "feat: add CV page with PDF download"
```

---

## Task 14: Production build + Vercel deploy

**Files:**
- Modify: `.gitignore` (add `.next`, `.superpowers`)

- [ ] **Step 1: Update .gitignore**

Add these lines to `.gitignore`:

```
.next/
.superpowers/
```

- [ ] **Step 2: Run production build to verify no errors**

```bash
npm run build
```

Expected: Build completes with no TypeScript or Next.js errors. All pages listed as static (`○`).

- [ ] **Step 3: Run all tests one final time**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: update gitignore for Next.js and Vercel deploy"
```

- [ ] **Step 5: Push to GitHub and connect to Vercel**

1. Push your repo: `git push origin main`
2. Go to https://vercel.com → New Project → import your GitHub repo
3. Vercel auto-detects Next.js — no config needed. Click Deploy.
4. Once deployed, go to Project Settings → Domains → add your custom domain
5. In Squarespace Domains, add a CNAME record: `www` → `cname.vercel-dns.com`

- [ ] **Step 6: Verify live site**

Open your custom domain. All 5 pages should load. Verify:
- [ ] Email does not appear in page source (`view-source:` in browser)
- [ ] `/blog/sample-post` renders correctly
- [ ] PDF download works on `/cv`
