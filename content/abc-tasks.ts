export interface AbcRubric {
  max: number
  maxNote?: string // qualifier shown beside the max, e.g. "pass/fail"
  criteria: string
  source?: string // where the rubric comes from, when it isn't ABC's own
}

export interface AbcTask {
  slug: string
  name: string
  // ABC training data for the task
  trainDir: string
  episodes: number
  hours: number
  hoursFlag?: boolean // marked ⚠ in the source table
  rubric: AbcRubric | null
  // Episode ids; files are <slug>__<id>.mp4 / .jpg under the media base. Empty when
  // we have no sample rollouts for the task.
  samples: string[]
}

export const MEDIA_BASE =
  (process.env.NEXT_PUBLIC_INTERNAL_MEDIA_BASE ?? '/internal-media') + '/abc-task-comparison'

export const abcTasks: AbcTask[] = [
  {
    slug: '01_fold_tshirt',
    name: 'T-shirt',
    trainDir: 'fold_and_stack_the_t_shirts',
    episodes: 11009,
    hours: 291.7,
    rubric: {
      max: 5,
      criteria:
        '+1 for pick and place, +1 for flattening, +1 for at least one proper fold, +1 for a full fold, +1 for placing it in the corner',
    },
    samples: ['001005fe', '07bf8d89', '0f514541'],
  },
  {
    slug: '02_bottles_bin',
    name: 'Bottles in bin',
    trainDir: 'put_the_plastic_bottles_in_the_bin',
    episodes: 3793,
    hours: 63.5,
    rubric: { max: 6, criteria: '+1 for each bottle in the bin' },
    samples: ['0011607f', '1881b956', '31d75cff'],
  },
  {
    slug: '03_chips_shelf',
    name: 'Chips on shelf',
    trainDir: 'place_and_organize_the_chips_bags_onto_the_shelf',
    episodes: 84,
    hours: 1.6,
    hoursFlag: true,
    rubric: {
      max: 1,
      maxNote: 'pass/fail',
      criteria: 'Picks up a chip bag first and reaches the shelf. No partial credit',
      source: 'Temporal Ratio (its only published criterion)',
    },
    samples: ['02f8762b', '600477ad', '998a0bbf'],
  },
  {
    slug: '04_snacks_bag',
    name: 'Snacks in bag',
    trainDir: 'place_the_snacks_into_the_paper_bag',
    episodes: 723,
    hours: 13.2,
    rubric: {
      max: 1,
      maxNote: 'pass/fail',
      criteria: 'Picks up a snack first and reaches the paper bag. No partial credit',
      source: 'Temporal Ratio (its only published criterion)',
    },
    samples: ['00b698bc', '57321c5c', 'a7bc7551'],
  },
  {
    slug: '05_plates_dishrack',
    name: 'Plates into dishrack',
    trainDir: 'load_the_plates_into_the_dish_rack',
    episodes: 1335,
    hours: 19.3,
    rubric: {
      max: 6,
      criteria:
        'Per plate: +1 for picking it up, +1 for getting it in the rack, +1 for placing it correctly',
    },
    samples: ['00168137', '445ba959', '80402d43'],
  },
  {
    slug: '06_unscrew_caps',
    name: 'Unscrew bottle cap',
    trainDir: 'unscrew_the_bottle_caps',
    episodes: 294,
    hours: 9.2,
    rubric: { max: 3, criteria: '+1 for lifting the bottle, +2 for unscrewing' },
    samples: ['00b079d3', '52859ecd', '9b1970d2'],
  },
  {
    slug: '07_fold_paperbox',
    name: 'Fold paper box',
    trainDir: 'fold_the_paper_box',
    episodes: 2387,
    hours: 99.5,
    rubric: {
      max: 5,
      criteria:
        '+1 for picking up the box, +1 for each folded side, +1 for the lid, +1 for the flaps',
    },
    samples: ['000c356c', '1fe65ab6', '44745519'],
  },
  {
    slug: '08_sort_legos',
    name: 'Sort LEGOs',
    trainDir: 'sort_the_legos_into_containers_by_color',
    episodes: 4458,
    hours: 96.3,
    rubric: { max: 4, criteria: '+1 for each brick in the correct bin' },
    samples: ['000c75d6', '135a1954', '25b1422d'],
  },
  {
    slug: '09_earbuds_case',
    name: 'Earbuds into case',
    trainDir: 'insert_the_wireless_bluetooth_earbuds_into_the_charging_case',
    episodes: 2095,
    hours: 76.3,
    rubric: {
      max: 3,
      criteria:
        '+1 for opening the case and holding it ready, +1 for seating the first earbud, +1 for seating the second',
      source: 'PARTS paper',
    },
    samples: ['0072c5cd', '2a5646c9', '518075f0'],
  },
  {
    slug: '10_pen_caps',
    name: 'Pen caps',
    trainDir: 'insert_the_pens_into_the_pen_caps',
    episodes: 784,
    hours: 27.1,
    rubric: { max: 3, criteria: '+1 for picking up both pen and cap, +2 for inserting' },
    samples: ['00880e9d', '5cd93f15', 'b03001b9'],
  },
  {
    slug: '11_cards_holder',
    name: 'Credit cards into holder',
    trainDir: 'put_the_credit_cards_into_the_card_holder',
    episodes: 2574,
    hours: 117.6,
    rubric: {
      max: 5,
      criteria:
        '+1 for opening the wallet, +1 for removing a card, +1 for placing it in the container',
    },
    samples: ['001553d5', '1f8de30f', '3fbb9af0'],
  },
  {
    slug: 'cards_out_of_holder',
    name: 'Credit cards out of holder',
    trainDir: 'take_the_credit_cards_out_of_the_card_holder',
    episodes: 2732,
    hours: 106.3,
    rubric: null,
    samples: [],
  },
  {
    slug: '12_mug_flip',
    name: 'Mug flip',
    trainDir: 'turn_the_mug_right_side_up',
    episodes: 660,
    hours: 16.9,
    rubric: {
      max: 2,
      maxNote: '1 per mug',
      criteria: '+1 for each mug that ends upright and resting on the table',
      source: 'ABC-Sim scoring code',
    },
    samples: ['0006fb98', '5793929d', 'a7cd4a88'],
  },
  {
    slug: '13_fold_towels',
    name: 'Fold and stack towels',
    trainDir: 'fold_and_stack_the_towels',
    episodes: 384,
    hours: 16.0,
    rubric: null,
    samples: ['0104361e', '4d9ce195', 'a26ef13e'],
  },
  {
    slug: '14_sweep_scraps',
    name: 'Sweep paper scraps',
    trainDir: 'sweep_away_the_paper_scraps_from_the_table',
    episodes: 483,
    hours: 12.0,
    rubric: null,
    samples: ['015b13be', '5e0917ee', 'a91324cb'],
  },
  {
    slug: '15_load_batteries',
    name: 'Load batteries',
    trainDir: 'load_the_batteries_into_the_remote_control',
    episodes: 1167,
    hours: 38.4,
    rubric: null,
    samples: ['0096786d', '476c634e', '939558a1'],
  },
  {
    slug: '16_screw_caps',
    name: 'Screw on bottle caps',
    trainDir: 'screw_on_the_bottle_caps',
    episodes: 370,
    hours: 12.5,
    rubric: null,
    samples: ['0045cc5d', '50c6f9c0', 'a508f6fb'],
  },
  {
    slug: '17_erase_whiteboard',
    name: 'Erase whiteboard',
    trainDir: 'erase_the_whiteboard',
    episodes: 1276,
    hours: 15.5,
    rubric: null,
    samples: ['0061f465', '4738767f', '8b9cd876'],
  },
  {
    slug: '18_sort_utensils',
    name: 'Sort eating utensils',
    trainDir: 'sort_the_eating_utensils_into_containers',
    episodes: 536,
    hours: 11.0,
    rubric: null,
    samples: ['009d32b1', '5a47aaf9', 'ad742d1c'],
  },
]
