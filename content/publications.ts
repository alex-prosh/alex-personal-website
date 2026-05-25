import type { Publication } from '@/types'

export const publications: Publication[] = [
  {
    year: 2025,
    title: 'Contact-Implicit Motion Planning for Dexterous Manipulation',
    authors: ['Alex Pro', 'Collaborator One', 'Collaborator Two'],
    venue: 'ICRA 2025',
    links: {
      pdf: 'https://example.com/paper.pdf',
      arxiv: 'https://arxiv.org/abs/XXXX.XXXXX',
    },
  },
  {
    year: 2024,
    title: 'Adaptive Locomotion on Deformable Terrain',
    authors: ['Alex Pro', 'Collaborator Three'],
    venue: 'CoRL 2024',
    equalContribution: false,
    links: {
      pdf: 'https://example.com/paper2.pdf',
    },
  },
]
