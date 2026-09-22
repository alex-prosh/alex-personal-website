// Scores are kept as reported ("mean ± spread", plus units where given) rather than
// parsed, since methods report on different scales.
export interface ReportedScore {
  value: string
  n: number | null
}

export interface ScoreRow {
  // slug of an entry in abcTasks when we have sample rollouts for the task;
  // otherwise a plain label.
  slug?: string
  label?: string
  scores: Record<string, ReportedScore>
}

export interface ScoreTable {
  methods: string[]
  // Scale for values with no "of N" or "%": 100 for a percent table, null when unknown.
  bareMax: number | null
  rows: ScoreRow[]
}

export const successRates: ScoreTable = {
  methods: ['Q-Plan', 'Flex-π', 'ModAR', 'AgentPolicy', 'LIT', 'RSS-PT', 'SeeQ'],
  bareMax: 100,
  rows: [
    {
      slug: '13_fold_towels',
      scores: { ModAR: { value: '70 ± 13', n: 5 }, AgentPolicy: { value: '80 ± 28', n: 2 } },
    },
    { slug: '14_sweep_scraps', scores: { LIT: { value: '84 ± 0', n: 2 } } },
    { slug: '15_load_batteries', scores: { 'RSS-PT': { value: '85 ± 10', n: 6 } } },
    { slug: '16_screw_caps', scores: { 'RSS-PT': { value: '51 ± 24', n: 6 } } },
    { slug: '11_cards_holder', scores: { 'Q-Plan': { value: '45 ± 30', n: 3 } } },
    { slug: '05_plates_dishrack', scores: { 'Flex-π': { value: 'about 41 ± 28', n: 5 } } },
    { slug: '08_sort_legos', scores: { SeeQ: { value: '31 ± 15', n: 2 } } },
  ],
}

export const rubricScores: ScoreTable = {
  methods: ['ABC', 'PARTS', 'SARM2†', 'WARP-RM†', 'Flex-π'],
  bareMax: null,
  rows: [
    {
      slug: '02_bottles_bin',
      scores: { ABC: { value: '5.6 ± 0.0 of 6', n: 2 }, 'WARP-RM†': { value: '3.3 ± 0.5 of 4', n: 2 } },
    },
    {
      slug: '05_plates_dishrack',
      scores: { ABC: { value: '4.6 ± 0.3 of 6', n: 2 }, 'Flex-π': { value: '68 ± 32% progress', n: 5 } },
    },
    { slug: '17_erase_whiteboard', scores: { 'SARM2†': { value: '0.77 ± 0.16 of 1', n: 8 } } },
    {
      slug: '08_sort_legos',
      scores: { ABC: { value: '1.1 ± 1.1 of 4', n: 2 }, PARTS: { value: '5.6 ± 1.5 of 10', n: null } },
    },
    { slug: '18_sort_utensils', scores: { 'Flex-π': { value: '50 ± 28% progress', n: 5 } } },
    { slug: '07_fold_paperbox', scores: { ABC: { value: '2.7 ± 2.2 of 5', n: 2 } } },
    { slug: '06_unscrew_caps', scores: { ABC: { value: '1.6 ± 0.0 of 3', n: 2 } } },
    { slug: '09_earbuds_case', scores: { PARTS: { value: '48 ± 11% progress', n: 5 } } },
    { slug: '10_pen_caps', scores: { ABC: { value: '1.1 ± 0.1 of 3', n: 2 } } },
    { slug: '12_mug_flip', scores: { ABC: { value: '37 ± 5% progress', n: 2 } } },
    { slug: 'cards_out_of_holder', scores: { ABC: { value: '0.9 ± 1.2 of 5', n: 2 } } },
  ],
}
