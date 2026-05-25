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
