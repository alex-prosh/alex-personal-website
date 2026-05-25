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
