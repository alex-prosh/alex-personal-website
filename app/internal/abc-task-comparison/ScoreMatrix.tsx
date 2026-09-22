import type { AbcTask } from '@/content/abc-tasks'
import type { ScoreTable } from '@/content/abc-scores'
import { parseScore, type ParsedScore } from './parseScore'
import TaskName from './TaskName'

const pct = (x: number) => Math.round(Math.min(1, Math.max(0, x)) * 100)

// Mean as a share of max, with the ± range on a second lane. Every meter is the
// same width, so bars compare across columns and tables.
function Meter({ score }: { score: ParsedScore }) {
  const mean = pct(score.mean / score.max)
  const lo = pct((score.mean - score.spread) / score.max)
  const hi = pct((score.mean + score.spread) / score.max)
  const label = `${mean}% of max, range ${lo}% to ${hi}%`

  return (
    <span className="meter" role="img" aria-label={label} title={label}>
      <span className="meter-track">
        <span className="meter-fill" style={{ width: `${mean}%` }} />
      </span>
      <span className="meter-range" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
    </span>
  )
}

export default function ScoreMatrix({ table, tasks }: { table: ScoreTable; tasks: AbcTask[] }) {
  const bySlug = new Map(tasks.map((t) => [t.slug, t]))

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table matrix">
        <thead>
          <tr>
            <th scope="col">Task</th>
            {table.methods.map((m) => (
              <th key={m} scope="col" className="num method">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => {
            const task = row.slug ? bySlug.get(row.slug) : undefined
            return (
            <tr key={row.slug ?? row.label}>
              <th scope="row">{task ? <TaskName task={task} /> : row.label ?? row.slug}</th>
              {table.methods.map((m) => {
                const score = row.scores[m]
                if (!score) {
                  return (
                    <td key={m} className="num empty">
                      ·
                    </td>
                  )
                }
                const parsed = parseScore(score.value, table.bareMax)
                return (
                  <td key={m} className="num">
                    {score.value}
                    {(score.n !== null || parsed) && (
                      <span className="score-detail">
                        {score.n !== null && <span className="n"> ({score.n})</span>}
                        {parsed && <Meter score={parsed} />}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
