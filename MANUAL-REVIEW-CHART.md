# Header & Footer Manual Review

**Status: reviewed 2026-10-17 — selection applied, chrome locked.** The ticks below are the law; see
[After the review](#after-the-review--chrome-locked-2026-10-17) for what was kept, deleted and rebuilt.

Serve gallery: `cd ui-designing && python3 -m http.server 8123` → [http://localhost:8123/chrome-lab/](http://localhost:8123/chrome-lab/)

Mark **✓** under Header / Footer for every one you like (you can pick many).

| Page | Pair | Skin | Header | Footer | Header ✓ | Footer ✓ | Notes |
|:---:|---|---|---|---|:---:|:---:|---|
| 1 | P01 Ground Floor | solid | Logo left, 7 links, Sign in, teal pill | Brand + blurb + 3 columns + legal | ✓ |✓ | |
| 2 | P02 Morning Mist | glass | Sticky glass bar (blur after 8px) | Mesh wash + frosted legal capsule | ✓ | | |
| 3 | P03 Night Desk | ink | Navy utility strip + white main bar | Navy columns + mono close-strip |  | | |
| 4 | P04 Orbit Card | elevated | Floating pill bar (inset) | Floating rounded card | ✓✓|✓✓ | |
| 5 | P05 Hearth | solid | Centred logo, links each side | Centred stack + socials | |✓ | |
| 6 | P06 Newsroom | editorial | Masthead rule + ruled nav, text CTA | Rule-divided columns | | | |
| 7 | P07 Quiet Signal | tint | Mint “Intake open” ribbon + tinted bar | CTA card on tint + teal legal strip | | | |
| 8 | P08 Directory | solid | Mega panel with 4 icon tiles | Same tiles + 6-col sitemap | | | |
| 9 | P09 Front Desk | tint | Tall white search pill | Newsletter pill + columns | | | |
| 10 | P10 Side Door | editorial | Mark + one round icon (minimal) | One-line legal | | | |
| 11 | P11 Two Lanes | tint | Segmented view-switcher | ₹ count-up + segmented proof | | | |
| 12 | P12 Night Nest | invert | Dark band + glow hairline CTA | Dark footer + glow status | | | |
| 13 | P13 Riverbed | mesh | Transparent → solid on scroll | Mesh footer + big CTA | | | |
| 14 | P14 Loud Bird | invert | Quiet bar → full-screen giant overlay | Giant links + oversized wordmark | | | |
| 15 | P15 Pocket Library | solid | Right drawer + accordions | Accordion columns | | | |
| 16 | P16 Crew Deck | elevated | Slim bar + mobile bottom dock | Compact chips + pinned CTA | | | |
| 17 | P17 Night Librarian | glass | ⌘K command palette pill | Status pills + ⌘K hint | | | |
| 18 | P18 Meter | solid | Teal reading-progress line | Proof rail with count-up | | | |
| 19 | P19 Gate Desk | dual | INR / EN utility tier + main bar | Locale + Razorpay utility tier | | | |
| 20 | P20 Twin Gates | dual | 50/50 Sign in ‖ Start a project | 50/50 mint CTA ‖ white sitemap | | | |

---

## Selected headers (list page nos)

`1 (P01) · 2 (P02) · 4 (P04 — ticked twice)`

## Selected footers (list page nos)

`1 (P01) · 4 (P04 — ticked twice) · 5 (P05)`

---

## After the review — chrome LOCKED (2026-10-17)

The table above is now the closed record. Everything not ticked was deleted from the repo; the lab
contains only approved patterns, plus five new pages that wear an approved header with an approved footer.

| Outcome | Detail |
|---|---|
| Kept | headers **P01 · P02 · P04** (P04 ★) — footers **P01 · P04 (★) · P05** |
| Deleted | `chrome-lab/pairs/` in full (P03, P06–P20) · `tools/pairs-b/c/d.mjs` · P02's footer · P05's header |
| Recover a rejected concept | `git show f713edf:chrome-lab/pairs/P12-dark/header.html` |
| Source of truth | `tools/chrome-approved.mjs` (the 6 approved halves) + `tools/lock.mjs` (the ticks + the combos) |
| Rebuild + verify | `node tools/build-lab.mjs && node tools/check-lab.mjs` |
| Gallery | `chrome-lab/index.html` — 3 header cards, 3 footer cards, 5 combo cards, light/dark |

Combo pages are **chrome only**: approved header + approved footer, no hero, no filler sections — the
gap between them is a 60 vh runway so a sticky or floating bar can be seen behaving (it hides with `?frame=1`).

## Open pages now in the repo

| Combo | Header | Footer | Page |
|:---:|---|---|---|
| C01 Ground Truth | P01 solid | P01 solid | `chrome-lab/combos/C01-ground-truth/index.html` |
| C02 Orbit Suite ★ | P04 elevated | P04 elevated | `chrome-lab/combos/C02-orbit-suite/index.html` |
| C03 Mist over Orbit | P02 glass | P04 elevated | `chrome-lab/combos/C03-mist-over-orbit/index.html` |
| C04 Ground & Hearth | P01 solid | P05 solid | `chrome-lab/combos/C04-ground-hearth/index.html` |
| C05 Orbit over Hearth | P04 elevated | P05 solid | `chrome-lab/combos/C05-orbit-hearth/index.html` |

| Approved chrome | Header page | Footer page | Whole pair |
|---|---|---|---|
| P01 Ground Floor | `chrome-lab/approved/P01-classic/header.html` | `…/footer.html` | `…/index.html` |
| P02 Morning Mist | `chrome-lab/approved/P02-glass/header.html` | cut | cut |
| P04 Orbit Card ★ | `chrome-lab/approved/P04-pill/header.html` | `…/footer.html` | `…/index.html` |
| P05 Hearth | cut | `chrome-lab/approved/P05-centered/footer.html` | cut |

Four approved pairings are still unbuilt — `P01+P04 · P02+P01 · P02+P05 · P04+P01` — say the word and
`tools/lock.mjs` gains four lines and the same two commands produce them.
