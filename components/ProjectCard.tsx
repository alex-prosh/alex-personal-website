import type { Project } from '@/types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-border rounded-lg p-5 bg-white flex gap-4 items-start">
      <span className="text-[10px] bg-[#f0ece4] text-muted px-2 py-1 rounded whitespace-nowrap mt-0.5 flex-shrink-0">
        {project.tag}
      </span>
      <div>
        <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
        <p className="text-xs text-muted leading-relaxed mb-3">{project.description}</p>
        <div className="flex gap-4">
          {project.links.paper && (
            <a href={project.links.paper} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Paper →
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Demo →
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} className="text-xs text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Code →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
