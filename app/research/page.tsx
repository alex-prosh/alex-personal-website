import type { Metadata } from 'next'
import { projects } from '@/content/research'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: 'Research · Alex Pro' }

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 pt-12 pb-20">
      <h1 className="text-xl font-semibold mb-1">Research</h1>
      <p className="text-sm text-muted mb-10">
        Perception, planning, and learning-based control for robotics.
      </p>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
