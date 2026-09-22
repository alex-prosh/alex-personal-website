export interface InternalPage {
  title: string
  summary: string
  tag: string
  date: string // YYYY-MM-DD
  href: string
}

// Newest first. Add an entry here plus a folder under app/internal/.
export const internalPages: InternalPage[] = [
  {
    title: 'ABC Task Comparison',
    summary: 'Success rate, rubric score, and variance per ABC task, with sample rollouts.',
    tag: 'Evals',
    date: '2026-09-21',
    href: '/internal/abc-task-comparison',
  },
]
