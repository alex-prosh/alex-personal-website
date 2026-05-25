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
