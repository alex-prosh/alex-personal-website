export interface Project {
  title: string
  description: string
  tag: string
  links: {
    paper?: string
    demo?: string
    code?: string
  }
}

export interface Publication {
  year: number
  title: string
  authors: string[]
  venue: string
  equalContribution?: boolean
  links: {
    pdf?: string
    arxiv?: string
    project?: string
  }
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags?: string[]
}
