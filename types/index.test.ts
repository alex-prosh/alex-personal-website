import type { Project, Publication, BlogPostMeta } from './index'

describe('Project type', () => {
  it('accepts a valid project', () => {
    const p: Project = {
      title: 'My Robot',
      description: 'It walks.',
      tag: 'Locomotion',
      links: { paper: 'https://arxiv.org/abs/1234' },
    }
    expect(p.title).toBe('My Robot')
  })
})

describe('Publication type', () => {
  it('accepts a valid publication', () => {
    const pub: Publication = {
      year: 2025,
      title: 'Learning to Walk',
      authors: ['Alex Pro', 'Co Author'],
      venue: 'ICRA 2025',
      links: { pdf: 'https://example.com/paper.pdf' },
    }
    expect(pub.year).toBe(2025)
  })
})

describe('BlogPostMeta type', () => {
  it('accepts valid frontmatter', () => {
    const meta: BlogPostMeta = {
      slug: 'my-post',
      title: 'My Post',
      date: '2026-05-01',
    }
    expect(meta.slug).toBe('my-post')
  })
})
