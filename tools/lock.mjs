// The client's decision from the manual review, transcribed into data the builder can obey.
// Source of truth: MANUAL-REVIEW-CHART.md — 20 rows, one ✓ per half (✓✓ = picked with emphasis).
// Nothing here is invented: this file only mirrors the ticks in the chart.

export const REVIEW = {
  date: '2026-10-17',
  source: 'MANUAL-REVIEW-CHART.md',
  headers: ['P01', 'P02', 'P04'],              // rows 1, 2, 4
  footers: ['P01', 'P04', 'P05'],              // rows 1, 4, 5
  favourite: 'P04',                            // ✓✓ on both halves
  pairs_removed: ['P03', 'P06', 'P07', 'P08', 'P09', 'P10', 'P11', 'P12',
    'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20'],
  halves_removed: ['P02/footer', 'P05/header'],
  note: 'v4 prompt re-run with the chrome locked: no new research, no new concepts — ' +
        'only the approved patterns are built, then recombined.'
};

// Five pages that mix an approved header with an approved footer.
// Each page carries chrome only — no body sections, no hero, no filler copy.
// `bridge` is the one-line CSS fix that makes two different DNAs read as one system
// (container width is the usual clash: P04 floats at 1160 px, the rest use 1200 px).
export const COMBOS = [
  {
    id: 'C01', slug: 'C01-ground-truth', name: 'Ground Truth',
    header: 'P01', footer: 'P01', bridge: '',
    rationale: 'The approved pair, shown as chrome alone — the control every other combo is judged against.',
    tension: 'none — one DNA, hairline to hairline'
  },
  {
    id: 'C02', slug: 'C02-orbit-suite', name: 'Orbit Suite',
    header: 'P04', footer: 'P04', bridge: '',
    rationale: 'The client favourite (✓✓): pill bar and footer card are already one object language — floating, 1160 px, one soft shadow.',
    tension: 'none — both halves share the 24 px radius, shadow and inset'
  },
  {
    id: 'C03', slug: 'C03-mist-over-orbit', name: 'Mist over Orbit',
    header: 'P02', footer: 'P04',
    bridge: `.container{max-width:1160px}   /* align the 1200px glass bar with the 1160px floating card */`,
    rationale: 'Glass bar fogging over the page, closing on the floating card — the most "product" of the five.',
    tension: 'resolved by the bridge: both halves now sit on the same 1160 px rails'
  },
  {
    id: 'C04', slug: 'C04-ground-hearth', name: 'Ground & Hearth',
    header: 'P01', footer: 'P05', bridge: '',
    rationale: 'Two solid skins, both reviewed: the calm white bar above a centred hearth — quietest option, best for editorial pages.',
    tension: 'asymmetric → centred; the shared hairline keeps it calm'
  },
  {
    id: 'C05', slug: 'C05-orbit-hearth', name: 'Orbit over Hearth',
    header: 'P04', footer: 'P05',
    bridge: `.container{max-width:1160px}   /* the centred stack should sit inside the pill bar's rails */`,
    rationale: 'The favourite header on the second approved footer — floating bar, centred close. Watch: the bar floats, the slab spans edge to edge.',
    tension: 'object vs. slab — if it reads loose, C03 keeps the floating language'
  }
];

// The other four approved-vs-approved combinations, kept out of the first pass on purpose.
// Say the word and they build with the same command.
export const UNBUILT_COMBOS = ['P01+P04', 'P02+P01', 'P02+P05', 'P04+P01'];
