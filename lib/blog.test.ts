import { getBlogPosts, getBlogPost } from './blog'

describe('getBlogPosts', () => {
  it('returns an array of post metadata', async () => {
    const posts = await getBlogPosts()
    expect(Array.isArray(posts)).toBe(true)
    posts.forEach((post) => {
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
    })
  })

  it('returns posts sorted newest first', async () => {
    const posts = await getBlogPosts()
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date) >= new Date(posts[i].date)).toBe(true)
    }
  })
})

describe('getBlogPost', () => {
  it('returns content and meta for a valid slug', async () => {
    const result = await getBlogPost('sample-post')
    expect(result).not.toBeNull()
    expect(result!.meta.title).toBeDefined()
    expect(result!.content).toBeDefined()
  })

  it('returns null for an unknown slug', async () => {
    const result = await getBlogPost('does-not-exist-xyz')
    expect(result).toBeNull()
  })
})
