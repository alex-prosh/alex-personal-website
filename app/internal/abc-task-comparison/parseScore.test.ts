import { parseScore } from './parseScore'
import { rubricScores, successRates } from '@/content/abc-scores'

describe('parseScore', () => {
  it('reads points out of a stated max', () => {
    expect(parseScore('5.6 ± 0.0 of 6', null)).toEqual({ mean: 5.6, spread: 0, max: 6 })
    expect(parseScore('0.77 ± 0.16 of 1', null)).toEqual({ mean: 0.77, spread: 0.16, max: 1 })
  })

  it('reads percentages as out of 100', () => {
    expect(parseScore('68 ± 32% progress', null)).toEqual({ mean: 68, spread: 32, max: 100 })
  })

  it('uses the table max for bare numbers, and ignores a leading "about"', () => {
    expect(parseScore('70 ± 13', 100)).toEqual({ mean: 70, spread: 13, max: 100 })
    expect(parseScore('about 41 ± 28', 100)).toEqual({ mean: 41, spread: 28, max: 100 })
  })

  it('returns null when the max is unknown, so no bar is drawn', () => {
    expect(parseScore('5.6 ± 1.5', null)).toBeNull()
  })

  it('returns null for text it does not understand', () => {
    expect(parseScore('n/a', 100)).toBeNull()
  })

  it('parses every transcribed score', () => {
    const unparsed = [successRates, rubricScores].flatMap((t) =>
      t.rows.flatMap((r) => Object.values(r.scores).filter((s) => !parseScore(s.value, t.bareMax)))
    )
    expect(unparsed.map((s) => s.value)).toEqual([])
  })

  it('never yields a mean above its max', () => {
    for (const t of [successRates, rubricScores]) {
      for (const r of t.rows) {
        for (const s of Object.values(r.scores)) {
          const p = parseScore(s.value, t.bareMax)
          if (p) expect(p.mean).toBeLessThanOrEqual(p.max)
        }
      }
    }
  })
})
