import type { Metadata } from 'next'
import Link from 'next/link'
import { abcTasks } from '@/content/abc-tasks'
import { rubricScores, successRates } from '@/content/abc-scores'
import EpisodeGallery from './EpisodeGallery'
import ScoreMatrix from './ScoreMatrix'
import TaskName from './TaskName'

export const metadata: Metadata = { title: 'ABC Task Comparison · Alex Proshkin' }

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--gold)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  margin: '0 0 16px',
  fontWeight: 400,
}

const tableNote: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--subtitle)',
  lineHeight: 1.6,
  margin: '14px 0 64px',
  maxWidth: 620,
}

export default function AbcTaskComparisonPage() {
  const withRollouts = abcTasks.filter((t) => t.samples.length > 0)
  const sampleCount = withRollouts.reduce((n, t) => n + t.samples.length, 0)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>
      <div id="bio-upper">
        <p>
          <Link href="/internal">Internal</Link> · Evals
        </p>
      </div>

      <div style={{ margin: '56px min(14%, 200px) 80px' }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 14px', lineHeight: 1.1 }}>ABC Task Comparison</h1>
        <p style={{ fontSize: 16, color: 'var(--subtitle)', lineHeight: 1.6, maxWidth: 620, margin: '0 0 56px' }}>
          ABC tasks side by side: success rate and rubric score per method, with the variation in each, followed by{' '}
          {sampleCount} sample rollouts across {withRollouts.length} tasks.
        </p>

        <h2 style={sectionLabel}>Success rate</h2>
        <ScoreMatrix table={successRates} tasks={abcTasks} />
        <p style={tableNote}>
          Percent, as mean ± variation with n in parentheses. The bar is the mean out of 100; the thin line under it
          spans mean ± variation. A dot means not reported. Task names link to their sample
          rollouts below.
        </p>

        <h2 style={sectionLabel}>Rubric score</h2>
        <ScoreMatrix table={rubricScores} tasks={abcTasks} />
        <p style={tableNote}>
          Mean ± variation out of each method&rsquo;s own max, with n in parentheses; some methods report percent
          progress instead. Bars show the mean as a share of that max, so they compare across methods. How ABC awards points is in the next table.
        </p>

        <h2 style={sectionLabel}>Rubric scoring</h2>
        <div style={{ overflowX: 'auto', marginBottom: 64 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col" className="num">Max score</th>
                <th scope="col">How points are earned</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {abcTasks.map((task) => (
                <tr key={task.slug}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <TaskName task={task} />
                  </td>
                  <td className="num">
                    {task.rubric ? task.rubric.max : '—'}
                    {task.rubric?.maxNote && <span className="note">{task.rubric.maxNote}</span>}
                  </td>
                  <td style={{ lineHeight: 1.6 }}>{task.rubric ? task.rubric.criteria : '—'}</td>
                  <td className="source">{task.rubric?.source ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={sectionLabel}>Sample rollouts</h2>
        <EpisodeGallery tasks={withRollouts} />
      </div>
    </div>
  )
}
