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
