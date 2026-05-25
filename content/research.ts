import type { Project } from '@/types'

export const projects: Project[] = [
  {
    title: 'Sked.ai',
    description:
      'An AI scheduling assistant that plans your whole life, not just your work. Add classes, sleep, commute, errands, and deadlines. Skedai fits what fits, shifts what can wait, and always knows what\'s next. Top 12 AI startup on F6S, Berkeley Skydeck 2025.',
    tag: 'Startup',
    type: 'Company',
    year: 2025,
    links: {
      paper: 'https://sked.ai',
    },
  },
  {
    title: 'DRS Asset Tracker',
    description:
      'A real-time asset tracking system built for an applied engineering team. Uses C++ and Firebase to track physical assets by RFID tag across rooms, storing and querying denormalized JSON data for fast reads. Built a web interface for live inventory management.',
    tag: 'Systems',
    type: 'Project',
    year: 2023,
    links: {
      code: 'https://github.com/alex-prosh/DRS-Asset-Tracker-public',
    },
  },
  {
    title: 'In Context Learning with Vision Transformers: Case Study',
    description:
      'Explores how large transformer models can perform in-context learning using examples within prompts to execute few shot, one shot, or zero shot tasks. Extends prior work on transformers learning general function classes to the image domain, investigating their potential to learn more intricate functions such as convolutional neural networks.',
    tag: 'ML',
    year: 2025,
    venue: 'arXiv 2025',
    links: {
      paper: 'https://arxiv.org/abs/2505.20872',
    },
  },
]
