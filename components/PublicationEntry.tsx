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
