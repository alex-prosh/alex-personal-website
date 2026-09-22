import { render, within } from '@testing-library/react'
import ScoreMatrix from './ScoreMatrix'
import { abcTasks } from '@/content/abc-tasks'
import { rubricScores, successRates, type ScoreTable } from '@/content/abc-scores'

const table: ScoreTable = {
  methods: ['Ours', 'Theirs†'],
  bareMax: null,
  rows: [
    { slug: '02_bottles_bin', scores: { Ours: { value: '5.6 ± 0.0 of 6', n: 2 } } },
    { label: 'Task without rollouts', scores: { 'Theirs†': { value: '0.77 ± 0.16', n: null } } },
  ],
}

describe('ScoreMatrix', () => {
  it('renders a column per method and a row per task', () => {
    const { getAllByRole } = render(<ScoreMatrix table={table} tasks={abcTasks} />)
    expect(getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['Task', 'Ours', 'Theirs†'])
    expect(getAllByRole('row')).toHaveLength(3)
  })

  it('links tasks that have sample rollouts and leaves the rest as plain text', () => {
    const { getByRole, getByText, queryByRole } = render(<ScoreMatrix table={table} tasks={abcTasks} />)
    expect(getByRole('link', { name: 'Bottles in bin' })).toHaveAttribute('href', '#02_bottles_bin')
    expect(getByText('Task without rollouts')).toBeInTheDocument()
    expect(queryByRole('link', { name: 'Task without rollouts' })).toBeNull()
  })

  it('shows the score with its n, and a dot where nothing is reported', () => {
    const { getAllByRole } = render(<ScoreMatrix table={table} tasks={abcTasks} />)
    const [, bottles, whiteboard] = getAllByRole('row')
    expect(within(bottles).getAllByRole('cell').map((c) => c.textContent)).toEqual(['5.6 ± 0.0 of 6 (2)', '·'])
    expect(within(whiteboard).getAllByRole('cell').map((c) => c.textContent)).toEqual(['·', '0.77 ± 0.16'])
  })
})

describe('ScoreMatrix task labels', () => {
  const labelled: ScoreTable = {
    methods: ['Ours'],
    bareMax: 100,
    rows: [
      { slug: '03_chips_shelf', scores: { Ours: { value: '50 ± 5', n: 2 } } },
      { slug: 'cards_out_of_holder', scores: { Ours: { value: '50 ± 5', n: 2 } } },
    ],
  }

  it('shows training hours under each task, keeping the source flag', () => {
    const { getAllByRole } = render(<ScoreMatrix table={labelled} tasks={abcTasks} />)
    const [chips, cardsOut] = getAllByRole('rowheader')
    expect(chips).toHaveTextContent('Chips on shelf')
    expect(chips).toHaveTextContent('1.6 h ⚠')
    expect(cardsOut).toHaveTextContent('106.3 h')
    expect(cardsOut).not.toHaveTextContent('⚠')
  })

  it('does not link a task that has no sample rollouts', () => {
    const { getByRole, queryByRole } = render(<ScoreMatrix table={labelled} tasks={abcTasks} />)
    expect(getByRole('link', { name: 'Chips on shelf' })).toBeInTheDocument()
    expect(queryByRole('link', { name: 'Credit cards out of holder' })).toBeNull()
  })
})

describe('ScoreMatrix meters', () => {
  it('draws the mean as a share of max, with the ± range clipped to the scale', () => {
    const { getByRole } = render(<ScoreMatrix table={table} tasks={abcTasks} />)
    const meter = getByRole('img', { name: '93% of max, range 93% to 93%' })
    expect(meter.querySelector('.meter-fill')).toHaveStyle({ width: '93%' })

    const wide: ScoreTable = {
      methods: ['Ours'],
      bareMax: 100,
      rows: [{ label: 'Wide', scores: { Ours: { value: '80 ± 28', n: 2 } } }],
    }
    const r = render(<ScoreMatrix table={wide} tasks={abcTasks} />)
    const clipped = r.getByRole('img', { name: '80% of max, range 52% to 100%' })
    expect(clipped.querySelector('.meter-range')).toHaveStyle({ left: '52%', width: '48%' })
  })

  it('draws nothing when the max is unknown', () => {
    const { getAllByRole } = render(<ScoreMatrix table={table} tasks={abcTasks} />)
    expect(getAllByRole('img')).toHaveLength(1)
  })
})

describe.each([
  ['successRates', successRates],
  ['rubricScores', rubricScores],
])('%s data', (_name, data) => {
  const slugs = new Set(abcTasks.map((t) => t.slug))

  it('only references tasks that exist', () => {
    for (const row of data.rows) {
      if (row.slug) expect(slugs).toContain(row.slug)
      else expect(row.label).toBeTruthy()
    }
  })

  it('only scores methods that have a column', () => {
    for (const row of data.rows) {
      for (const method of Object.keys(row.scores)) expect(data.methods).toContain(method)
    }
  })
})
