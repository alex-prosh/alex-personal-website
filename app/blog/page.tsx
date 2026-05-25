import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = { title: 'Blog · Alex Pro' }

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-5xl px-8 pt-12 pb-20">
      <h1 className="text-xl font-semibold mb-10">Writing</h1>
      <div>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
