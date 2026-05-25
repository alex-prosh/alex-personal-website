import type { Metadata } from 'next'
import { publications } from '@/content/publications'
import PublicationEntry from '@/components/PublicationEntry'

export const metadata: Metadata = { title: 'Publications · Alex Pro' }

export default function PublicationsPage() {
  const years = [...new Set(publications.map((p) => p.year))].sort(
    (a, b) => b - a
  )

  return (
    <div className="mx-auto max-w-5xl px-8 pt-12 pb-20">
      <h1 className="text-xl font-semibold mb-10">Publications</h1>
      {years.map((year) => (
        <div key={year} className="mb-10">
          <p className="text-sm font-semibold text-muted mb-4">{year}</p>
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
