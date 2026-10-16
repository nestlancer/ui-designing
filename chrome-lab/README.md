# chrome-lab — 100 headers + 100 footers for Nestlancer

A drop-in chrome system: 200 variants, each a real type (not a recolour), each generated **from its
own axis values** so `meta.json` can be machine-verified.

```
chrome-lab/
├── tokens/tokens.css · tokens.json      # measured, locked palette + derived dark theme
├── runtime/chrome.css                   # shared primitives (pill CTA, hairline, eyebrow, glass, focus ring, skip link)
├── runtime/chrome-motion.js             # opt-in data-motion runtime (m-01/m-02/m-03/m-13 helper)
├── runtime/demo.css                     # demo-page shell — styles the page AROUND each chrome (never mounted)
├── headers/H001…H100/{index.html,style.css,script.js,meta.json}
├── footers/F001…F100/{index.html,style.css,script.js,meta.json}
└── gallery/index.html · app.js · manifest.json   # 200 isolated iframes (264px headers / 600px footers), filterable
```

**Viewing in a browser:** serve the **repo root** with any static server — `python3 -m http.server 8123`
→ open `http://localhost:8123/chrome-lab/gallery/`. Variant pages load the locked Fraunces/Inter/IBM
Plex Mono fonts via one Google Fonts `<link>` (fallback stacks keep them usable offline), carry a
theme-boot script so `?theme=dark` never flashes light, and link `runtime/demo.css` so the page around
the chrome looks intentional. Mounting a variant into a real page (below) needs only tokens + chrome.css
+ style.css — demo.css is lab-only.

## Mount API (one line)

```html
<header data-chrome="H034" data-theme="dark" data-page="pricing"></header>
```

```html
<footer data-chrome="F017" data-theme="light"></footer>
```

Then load the three files for that variant:

```html
<link rel="stylesheet" href="/chrome-lab/tokens/tokens.css"/>
<link rel="stylesheet" href="/chrome-lab/runtime/chrome.css"/>
<link rel="stylesheet" href="/chrome-lab/headers/H034/style.css"/>
<script src="/chrome-lab/runtime/chrome-motion.js" defer></script>
<script src="/chrome-lab/headers/H034/script.js" defer></script>
```

Every rule in a variant's `style.css` is scoped to `[data-chrome="<ID>"]` (the only exceptions are two
`body:has([data-chrome="…"])` BASE rules — curtain and mobile bottom-bar padding — which cannot apply
unless that chrome is mounted).

## The six axes

Two variants are only *different types* if they differ on ≥3 of:

| Axis | Values |
|---|---|
| A1 container geometry | full-bleed · 1200 contained · floating pill inset 16 · split 50/50 · asymmetric 8/4 · docked edge rail |
| A2 nav paradigm | inline · dropdown · mega-panel · fullscreen overlay · drawer · bottom tab bar · segmented · breadcrumb row · search-first · command palette |
| A3 scroll behaviour | static · sticky · sticky-shrink · auto-hide · transparent→solid · progress-linked · pinned-then-release |
| A4 motion primitive | any measured `m-XX` (never repeated inside a family) |
| A5 disclosure | hover · click · keyboard-first · hover-intent 120ms · always-visible · accordion |
| A6 CTA treatment | teal pill · outline pill · split-arrow pill · ghost text · dual equal CTA · gradient edge · icon-only · sticky mobile bar |

Tree of coverage: 25 header families × 4 + 20 footer families × 5 = **200 variants across 45 families**,
with a minimum pairwise axis distance of **3** across all 19 900 pairs.

## Mobile strategy (never "hamburger by default")

| If A2 is… | Mobile behaviour |
|---|---|
| fullscreen overlay | clip-path overlay with mega type + CTA |
| drawer / inline / others | right drawer + scrim, `Esc` closes, focus returns to the burger |
| bottom tab bar | 4 tabs + `More` (opens the drawer) and safe-area padding |
| accordion / click / keyboard-first (A5) | nav groups collapse as native `<details>` — keyboard-complete, works with JS off |

## Regenerating

```bash
node tools/generate.mjs   # axis solver + emitters → all 200 variants + gallery manifest
node tools/qa.mjs         # 12 acceptance gates → docs/QA-REPORT.md (exits non-zero on failure)
```

`tools/axes.mjs` holds the solver: it assigns axis values greedily so that every pair of variants keeps
≥3 axes of distance and no family repeats a motion primitive. Locked axes express family semantics
(e.g. "Sticky shrink" locks A3), free axes are rotated by family index so families never start identical.

## Tokens

Light + dark come from `tokens/tokens.css` only: canvas `#f9fbfc`, ink `#0a2543`, teal `#24877f`
(single accent), live `#22a06b`, hairlines `#e3ebe9`, dark surface `#0b1720` / `#0f1e29` with 8 % white
hairlines. No second accent hue exists anywhere in the 200 variants (gate G3 checks every hex).
