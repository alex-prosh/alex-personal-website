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
