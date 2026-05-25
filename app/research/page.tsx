import type { Metadata } from 'next'
import { projects } from '@/content/research'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: 'Research · Alex Pro' }

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Research</h1>
      <p className="text-sm text-muted mb-10">
        Projects in perception, planning, and learning-based control.
      </p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
