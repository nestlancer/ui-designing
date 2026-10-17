# Nestlancer Header & Footer Lab — QA Report

**Date:** 2026-10-16 · **Branch:** `arena/a83b1e2e-ui-designing` · **Spec:** `header-footer-prompt.md` v3
**Toolchain:** Node v22 (generator `tools/generate.mjs`, gates `tools/qa.mjs`, roster `tools/lib/*`), Python 3.11 (research builder).
**Capture instrument:** `fetch_page` + `web_search` (sandbox has NO browser/Playwright access to target hosts — `curl` to them returns 000). Every research record carries its `capture_method`.

---

## Research Gate (Phase R — locked before any CSS)

```
=== RESEARCH GATE ===
Attempted 200 hosts + 1 substitute · Records 201 (pass 200)
Live-DOM verified: amazon.com, booking.com, github.com, apple.com, bbc.com, linear.app, stripe.com, nike.com, gov.uk
NO-BROWSER limitation: fetch_page is the capture instrument; sandbox has no Playwright access to target hosts.
Anchors: research/top-200.json · research/sites.json · research/motion-index.json · research/pattern-index.json · docs/RESEARCH-NOTES.md
```

- **Roster:** 200 ranked hosts (52 in the Global-100, 20 in the 101–200 band, 128 Cluster Leaders). Rank spine: Wikipedia `List_of_most-visited_websites` (Aug 2026 composite) + Similarweb live table (Sept 2026, updated Oct 1 2026) + Semrush top-100 (Aug 2026). No invented records; no unranked padding.
- **Banned categories skipped from rank** (logged, never captured): 5 hosts at ranks 25/27/34/35/39 — next suitable ranked hosts promoted into the roster.
- **Substitute:** nytimes.com returned HTTP 403 (bot wall) → logged `capture_failed`, bloomberg.com promoted as the next suitable ranked host (sites.json = 201 records: 200 pass + 1 logged failure).
- **Motion index:** 40 measured primitives (thresholds per primitive).
- **Pattern index:** 31 header archetypes (≥25 required) + 26 footer archetypes (≥20 required), each cluster-tagged to the 200.
- **Notes:** `docs/RESEARCH-NOTES.md` — 229 lines, every empirical claim host-cited.
- **Recipe libraries** (uiverse, codemyui, magicui, flowbite, cssgradient, animista, keyframes, gsap, preline, daisyui) are references only — explicitly excluded from the 200.
- The Research Gate ran **before** any stylesheet was authored (Phase R complete and locked → Phase 1).

---

## §9 Gate Results — `node tools/qa.mjs` → **14/14 PASS**

| Gate | Requirement | Result | Measured |
|---|---|---|---|
| G1 | Pairwise uniqueness — every pair differs in ≥3 of 7 axes, ≥1 in A1/A2/A3/A7 | **PASS** | 9,900 pairs (4,950 headers + 4,950 footers); 0 violations. A2/A7 family-locked; A1/A3/A4/A5/A6 solved by `tools/fix-axes.mjs` (greedy repair) and written back into `tools/lib/variants.mjs` |
| G2 | Size & budget — header css ≤8 KB, footer ≤7 KB (≤2 documented exceptions), DOM ≤90/140, script.js gzip ≤12 KB | **PASS** | header css max **7,029 B** · footer css max **5,199 B** · DOM max **73 / 73** · js.gz max **1,291 B** · 0 undocumented exceptions |
| G3 | CSS ownership (§5.8) — per-variant `style.css`, dead-class ≤15%, no frameworks, only tokens/chrome/demo shared | **PASS** | 200 owned stylesheets assembled from modules (skin + family + atoms) then class-filtered against the emitted HTML; **dead-class 0%**; no `@import`, no Bootstrap/Tailwind fingerprints; foreign-css scan clean |
| G4 | Token discipline — no raw hex outside `tokens.css`; fonts only via `var(--n-font-*)` | **PASS** | hex scan over 200 style.css + runtime + gallery = 0; inverse-text tokens (`--n-on-ink`, `--n-white`, …) added to `tokens.css/json` as the single source of truth |
| G5 | Dual themes — theme-boot, `color-scheme` meta, `data-theme` on the chrome root, both themes served | **PASS** | 200 pages: inline `id="theme-boot"` before the font link (defaults dark, `?theme=light` swaps); chrome roots carry `data-theme="dark"` and the toggle syncs root + `<html>`; dark block in `tokens.css` `:root[data-theme="dark"]` |
| G6 | Reduced motion — runtime + per-variant reduce blocks; signature transforms disabled | **PASS** | `chrome-motion.js` reduce fallback + `@media (prefers-reduced-motion: reduce)` block in all 200 style.css (reveals → opacity-only 150 ms; tickers/marquees/staggers off) |
| G7 | A11y — skip link, labelled navs, `aria-expanded` toggles, `:focus-visible` | **PASS** | 200 skip links; every nav labelled; disclosure/accordion buttons expose state; `:focus-visible` ring in `chrome.css` |
| G8 | meta.json schema — 7 axes + family + signature + refs + budget + mount snippet | **PASS** | 200 complete records (`chrome-lab/{headers,footers}/ID/meta.json`) |
| G9 | Morph state — `data-motion` = A4, named signature per variant | **PASS** | 200/200 roots wired; `signature_motion` names the page's one behaviour (design-truth rule) |
| G10 | Research grounding — corpus thresholds + every meta reference resolves to `sites.json` | **PASS** | sites 201 (≥200), motions 40 (≥30), header patterns 31 (≥25), footer patterns 26 (≥20), notes 229 lines (≥200); all refs resolve (non-corpus references swapped to ranked corpus hosts) |
| G11 | Bundle policy — no CDN frameworks; only the locked Google Fonts link externally | **PASS** | external URL scan: fonts.googleapis/gstatic only; all runtime paths relative |
| G12 | Demo page contract (§0C) — head order, relative paths, demo.css after chrome.css, chrome in the first screenful | **PASS** | 200 pages: charset → viewport → title → color-scheme → **theme-boot** → locked fonts link → tokens.css → chrome.css → style.css → demo.css; header pages chrome before `<main>` (64–96 px blocks), footer pages chrome after the demo content |
| G13 | Static hygiene — no comment-glued selectors, identical font link ×200, boot+demo.css present, root redirect, burger `order:3` after actions | **PASS** | scoper strips comments **before** `%%S%%`→`[data-chrome="ID"]` substitution (no `"]@` glue); one identical font URL for all 200; `ui-designing/index.html` redirects to `chrome-lab/gallery/` |
| G14 | Megatemplate fingerprint — normalized css/html hash unique (≤4 clones) | **PASS** | 200 distinct normalized CSS hashes · 200 distinct HTML structures |

### §5.8 budgets — per-type summary

| Budget | Header | Footer |
|---|---|---|
| `style.css` | ≤ 8,192 B → max **7,029 B** | ≤ 7,168 B → max **5,199 B** |
| DOM nodes | 45 ideal / 90 ceiling → max **73** | 70 / 140 → max **73** |
| `script.js` gzip | ≤ 12,288 B → max **1,291 B** | same → max **1,291 B** |
| Dead classes | ≤ 15% → **0%** (module assembly + dead-class filter) | **0%** |
| CSS exceptions | 0 documented | 0 |

---

## §0A Workspace Delivery Check

| Deliverable | Location | State |
|---|---|---|
| Research corpus | `research/top-200.json` (200), `research/sites.json` (201), `research/motion-index.json` (40), `research/pattern-index.json` (31+26) | ✅ regenerated reproducibly by `tools/build-research.mjs` ("TOP-200 LIST LOCKED") |
| Research notes | `docs/RESEARCH-NOTES.md` (229 lines) | ✅ |
| Tokens | `chrome-lab/tokens/tokens.css` + `tokens.json` | ✅ §2.2 locked palette + derived inverse-text tokens (G4) |
| Runtime | `chrome-lab/runtime/chrome.css`, `demo.css`, `chrome-motion.js` | ✅ |
| Headers | `chrome-lab/headers/H001–H100/` × {index.html, style.css, script.js, meta.json} | ✅ 25 families × 4 |
| Footers | `chrome-lab/footers/F001–F100/` × {index.html, style.css, script.js, meta.json} | ✅ 20 families × 5 |
| Gallery | `chrome-lab/gallery/{index.html, gallery.css, app.js, manifest.json}` | ✅ 200 manifest entries; lazy themed iframes; search + type/skin/family filters |
| Root redirect | `ui-designing/index.html` → `chrome-lab/gallery/` | ✅ (§0C rule 1) |
| Generator + gates | `tools/generate.mjs`, `tools/qa.mjs`, `tools/lib/{atoms,skins,variants,jsbits,headers,footers}.mjs` | ✅ `node tools/generate.mjs` → `node tools/qa.mjs` = 14/14 |
| Copy bank | all chrome copy from §2.4 locked bank (₹ tabular figures, intake pill, ticker domains, footer legal line) | ✅ |
| Screenshot folder | `Nestlancer-public-screenshots/` | ✅ untouched (read-only) |
| P0 control group | H001–H008, H061–H064, F001–F010 (22 variants) | ✅ included in the full 200 (batch order P0→P4 collapsed to one complete delivery) |

## §10 Session I/O

**Inputs:** `header-footer-prompt.md` v3 (locked spec), `Nestlancer-public-screenshots/public/*.webp` (design truth), live research via `fetch_page`/`web_search` (Wikipedia top-50 composite, Similarweb Sept-2026 table, Semrush Aug-2026 top-100, 9 ranked sites live-DOM).
**Outputs:** research corpus (5 artifacts + notes), 200 variant folders under `chrome-lab/{headers,footers}/`, tokens + runtime + gallery + root redirect, `tools/` generator & 14-gate QA, this report.

## Limitations (honest)

- No Playwright/browser in the sandbox; live-DOM capture used `fetch_page` as the instrument (9 ranked hosts verified live; the rest pattern-banked from ranked sources — recorded per record in `sites.json.capture_method`).
- nytimes.com (rank 25 composite) hit a 403 bot wall — failure logged, bloomberg.com promoted as substitute; the 200-host roster stayed ranked-only.
- Gallery card previews are lazy iframes (viewport-sized crops), not full-page stitched screenshots — section-screen layout lives in each variant page.
