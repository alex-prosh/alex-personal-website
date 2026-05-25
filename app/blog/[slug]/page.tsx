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
    <div className="mx-auto max-w-2xl px-8 pt-12 pb-20">
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
