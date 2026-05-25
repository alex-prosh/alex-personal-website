import type { Project } from '@/types'

export const projects: Project[] = [
  {
    title: 'Contact-Implicit Motion Planning for Dexterous Manipulation',
    description:
      'A unified framework for planning through contact using learned object representations and differentiable simulation.',
    tag: 'Perception',
    links: {
      paper: 'https://arxiv.org/abs/XXXX.XXXXX',
      demo: 'https://youtube.com/watch?v=XXXX',
      code: 'https://github.com/alex-prosh/XXXX',
    },
  },
  {
    title: 'Adaptive Locomotion on Deformable Terrain',
    description:
      'Reinforcement learning policies that generalize across sand, mud, and gravel without terrain-specific fine-tuning.',
    tag: 'Control',
    links: {
      paper: 'https://arxiv.org/abs/XXXX.XXXXX',
      demo: 'https://youtube.com/watch?v=XXXX',
    },
  },
]
