import type { AbcTask } from '@/content/abc-tasks'

export function formatHours(task: AbcTask) {
  return `${task.hours.toFixed(1)} h${task.hoursFlag ? ' ⚠' : ''}`
}

// Task name, linked to its rollouts when it has any, with its ABC training hours underneath.
export default function TaskName({ task }: { task: AbcTask }) {
  return (
    <>
      {task.samples.length > 0 ? <a href={`#${task.slug}`}>{task.name}</a> : task.name}
      <span className="hours">{formatHours(task)}</span>
    </>
  )
}
