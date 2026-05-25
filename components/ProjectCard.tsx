import type { Project } from '@/types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="py-5 border-b border-border last:border-0">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="text-sm font-medium">{project.title}</h3>
        <span className="text-xs text-muted whitespace-nowrap flex-shrink-0">{project.tag}</span>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-2">{project.description}</p>
      <div className="flex gap-3 text-sm">
        {project.links.paper && (
          <a href={project.links.paper} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">paper</a>
        )}
        {project.links.demo && (
          <a href={project.links.demo} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">demo</a>
        )}
        {project.links.code && (
          <a href={project.links.code} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">code</a>
        )}
      </div>
    </div>
  )
}
