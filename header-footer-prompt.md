# Nestlancer Header & Footer Lab — Master Agent Prompt (v4 · "20 matched pairs")

> **What changed in v4 (2026-10-17) and why.** v1–v3 asked for **100 headers + 100 footers** backed by **200 captured sites**, 34 motion primitives, a Playwright harness, 14 QA gates and a generator with megatemplates. The result was *too many things*: 200 files nobody could review, headers and footers designed in two separate passes (so a header and its footer looked like strangers), an invented bird glyph + serif wordmark instead of the real Nestlancer logo, and no hand-written feel compared to `example-header.html` / `example-footer.html`.
>
> v4 fixes that with five rules:
> 1. **20 headers + 20 footers = 20 PAIRS.** Header `P07` and footer `P07` are designed together as one system and must be unmistakably the same family.
> 2. **The real logo, always.** Use `logo-full-light.svg` / `logo-full-dark.svg` from the repo root. Never redraw, trace or "recreate" it.
> 3. **Follow `example-header.html` and `example-footer.html` for craft style** — small, readable, self-contained, accessible HTML + CSS, ~1 screen of CSS per file. Not megatemplates.
> 4. **Real icons only** — one consistent inline-SVG icon set (stroke, `currentColor`), no emoji, no icon-font CDN.
> 5. **Light research, heavy design.** Look at ~20 real sites (one reference per pair), write one line each, then spend the effort on craft.
>
> **Where to run:** [Arena Agent Mode](https://arena.ai/agent) (also Cursor / Claude Code). Paste everything inside the fence below.

````
# ============================================================
# NESTLANCER HEADER & FOOTER LAB — MASTER AGENT PROMPT (v4)
# Mission: build 20 MATCHED PAIRS (20 headers + 20 footers).
#          Pair Pnn = header + footer of the SAME design family.
# Brand truth : Nestlancer-public-screenshots/public/*.webp
#               logo-full-light.svg, logo-full-dark.svg (real logo)
# Craft truth : example-header.html, example-footer.html
# ============================================================

## 0) READ FIRST — in this order, before writing anything
1. `example-header.html` and `example-footer.html` (repo root). Note what makes them good:
   - ONE file each: `<style>` + markup (+ ~15 lines of `<script>` only where needed).
   - CSS custom properties at the top; mobile-first; one `@media (min-width…)` block.
   - BEM-ish class names (`navbar__link`, `footer-wave__heading`), short comments that explain *why*.
   - Accessibility is built in: `aria-label`, `aria-controls`, `aria-expanded`, `:focus-visible`, real `<ul>/<li>`, `role="banner"` / `role="contentinfo"`.
   - Nothing decorative that is not used. No dead CSS, no frameworks, no CDN.
   Your output must **feel hand-written in that same spirit** — but styled with the Nestlancer brand (§2) instead of the examples' generic blue.
2. `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` (header + footer), `015-marketing-contact.webp` (short footer), `006-login.webp` (auth header). Crop and look at the header and footer regions at full size.
3. `logo-full-light.svg`, `logo-full-dark.svg`, and (if present) `chrome-lab/assets/*` — the real logo + the extracted mark-only files.

## 1) SCOPE — deliberately small
| Deliverable | Count |
|---|---|
| Headers | **exactly 20** (`P01`…`P20`) |
| Footers | **exactly 20** (`P01`…`P20`) — one per header, same ID |
| Gallery | **1** `chrome-lab/index.html` showing all 20 pairs (header over footer) |
| Build script (optional) | `tools/build-pairs.mjs` + a few small modules in `tools/pairs/` (kit, pair definitions, gallery) that write the files below — `node tools/build-pairs.mjs` regenerates everything |
| Research | **~20 sites** (one per pair) → `docs/RESEARCH-NOTES.md`, one line each |

**Not wanted (v1–v3 bloat — do NOT recreate):** 100/100 variant sets, 200-site capture harness, `top-200.json`, motion-index / pattern-index JSON, 14-gate QA report, family × axis matrices, per-variant `meta.json` with 25 fields, shared megatemplate stylesheet scoped 100 times, Playwright capture tooling, font CDN `<link>`s.

### File layout
```
chrome-lab/
  index.html                      ← gallery: 20 pairs, light/dark switch
  assets/
    logo-full-light.svg  logo-full-dark.svg      ← copied byte-for-byte from repo root
    logo-mark-light.svg  logo-mark-dark.svg      ← bird-in-nest only, cut from the real paths (never redrawn)
  pairs/
    P01-classic/
      header.html      ← standalone page: header only  (like example-header.html)
      footer.html      ← standalone page: footer only  (like example-footer.html)
      index.html       ← header + sample content + footer together (the pair, as it ships)
      pair.json        ← 8 fields max (§6)
    P02-glass/ … P20-split/
```
Every page uses **relative paths only** (`../../assets/logo-full-light.svg`) so it works from `python3 -m http.server`, from `file://`, and under any sub-path.

## 2) BRAND — locked
### 2.1 Logo & icons (the part earlier runs got wrong)
- **Logo = the real files.** `logo-full-light.svg` (indigo `#272A7A` + teal `#16B6A5`) on light surfaces, `logo-full-dark.svg` (white + teal) on dark surfaces. Use `<img src="…" alt="Nestlancer">` with explicit `height` (24–40 px header, up to 120+ px for oversized-wordmark footers). Swap light/dark with `<picture>` + `prefers-color-scheme` or a `data-theme` rule.
- **Mark-only** (bird-in-nest, no letters) for compact spots — mobile bars, auth headers, bottom docks: use `logo-mark-light.svg` / `logo-mark-dark.svg`. These are produced by *selecting* the bird/nest/teal-dot paths from the real SVG, never by redrawing.
- **Forbidden:** inventing a leaf/bird glyph, typesetting "Nestlancer." in a serif as a fake logo, recolouring the logo to a new hue, stretching it, adding effects/outlines, placing it on a surface where it fails contrast (indigo on navy).
- **Icons = one inline-SVG set** used in *both* header and footer of every pair: 24×24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true" focusable="false"`; icon-only buttons carry `aria-label`. Glyphs in the set: `sun`, `moon`, `menu`, `close`, `search`, `arrow-right`, `chevron-down`, `mail`, `globe`, `check`, `external`, `linkedin`, `github`, `x`, plus `home`, `layers`, `pen`, `tag`, `send` (dock tabs), `user`, `shield`, `rupee`, `hub` (tiles / compliance line) (social marks as simple monochrome strokes — never a real brand-logo sprite). Targets ≥ 40 px (≥ 44 px on mobile). No emoji. No Font Awesome / icon-font CDN.

### 2.2 Tokens (measured from the screenshots — use `var(--…)`, no new hues)
```css
:root{
  --bg:#f9fbfc;  --surface:#ffffff;  --surface-2:#f4f8f9;  --tint:#edf4f6;  --mint:#eef7f5;
  --mesh-1:#d8e8e9;  --mesh-2:#daeaeb;
  --ink:#0a2543;  --ink-2:#123a5e;  --body:#4a5c6e;  --muted:#5f7080;  --line:#e3ebe9;
  --teal:#24877f;  --teal-hover:#1c6f68;  --teal-soft:#d9ece9;  --glow:#3fb8ab;  --live:#22a06b;
  --btn:#1f7a73;                      /* CTA fill: teal nudged so white 15 px/600 text passes AA (4.3 → 5.1:1) */
  --band:#0a2543;  --band-text:#e8eef4;  --band-body:#b9c6d0;  --band-line:rgba(255,255,255,.12);  /* ink bands */
  --shadow:0 8px 28px rgba(10,37,67,.10);
  --pill:999px;  --card:14px;  --chip:8px;
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
}
/* dark = derived, never invented */
[data-theme="dark"]{
  --bg:#0b1720; --surface:#0f1e29; --surface-2:#12242f; --tint:#102530; --mint:#10272a;
  --mesh-1:#12303a; --mesh-2:#0f2a33;
  --ink:#e8eef4; --ink-2:#d3dde6; --body:#b9c6d0; --muted:#8aa0b3; --line:rgba(255,255,255,.08);
  --teal:#2fa59b; --teal-hover:#3fb8ab; --teal-soft:#14343a;   /* same hue, lifted for contrast */
  --band:#06111a; --shadow:0 8px 28px rgba(0,0,0,.45);
}
```
- **Type is sans** (the screenshots are a clean geometric sans). No serif display face, **no web-font download** — `var(--font)` with the system fallbacks keeps files offline-safe like the examples. Footer column heads: 11 px / uppercase / `letter-spacing:.14em` / `var(--muted)` (`PRODUCT`, `COMPANY`, `LEGAL`). Nothing under 11 px; body ≥ 14 px; ₹ numbers `font-variant-numeric:tabular-nums`.
- `--muted` is `#5f7080`, not the screenshot's `#7b8b99`: the measured grey fails AA at 11–13 px, so it was darkened (same hue). Use `--teal-hover`/`--btn` — never `--teal` — for small teal *text* on light surfaces.
- **Every file must define its own tokens** (copy the block above into each file's `<style>`), exactly like the examples define `:root` — so each `header.html` / `footer.html` opens alone and renders correctly.
- Dark must be good, not an afterthought: set via `?theme=dark` (tiny inline script) **and** `data-theme` on `<html>`; light is the default.

### 2.3 Locked copy (reuse; never invent product features, clients or prices)
- Nav: **Product · Portfolio · Blog · About · Pricing · Services · Contact**
- Actions: `Sign in` · `Start a project` · theme toggle · search · status pill `Intake open`
- Blurb: `Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.`
- Footer columns — **PRODUCT**: Project Hub, Pricing, Services, Portfolio · **COMPANY**: About, Blog, Contact, Start a project · **LEGAL**: Terms, Privacy, Verify document
- Legal line: `© 2026 Nestlancer. Made in India. All rights reserved.`
- Proof numbers (the only ones allowed): `₹4,28,500` payments · `₹4.2L` milestone · `Payouts cleared 1/3`
- Ticker: FINTECH · E-COMMERCE · SaaS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES · HEALTHCARE
- CTA line: `Ready to ship with clarity?`
- Routes: `/` `/product` `/portfolio` `/blog` `/about` `/pricing` `/services` `/contact` `/login` `/register` `/terms` `/privacy` `/verify`

## 3) THE PAIR CONTRACT — header and footer are ONE design
Each pair has a **Pair DNA**: six decisions made **once** and obeyed by both halves.

| DNA item | Meaning | Example (P04 floating pill) |
|---|---|---|
| **Skin** | surface recipe (§4) | glass-white pill on mint wash |
| **Geometry** | container width, inset, radius family | 1120 px, 16 px inset, `--radius-pill` ↔ `--radius-card` |
| **Rule/border language** | hairline / none / shadow / thick rule | soft shadow, no hairlines |
| **Type voice** | weight + case + spacing of links and heads | 500 links, mono caps heads |
| **CTA & accent usage** | how teal is spent | one teal pill; footer uses a teal-soft chip |
| **Signature motion** | exactly one, same *family* of movement in both halves | 220 ms ease-out lift on hover; footer links lift 2 px |

**The pair test (do it for every pair):** screenshot the header and footer, hide the logo → a stranger must say "same site, same designer". If the footer could be bolted under a different pair's header without anyone noticing, the pair **fails** — redo the footer from the DNA, don't tweak.

Concretely both halves must share: identical `:root` token overrides for the pair, the same surface family, the same corner radius family, the same link hover behaviour, the same icon set/size, the same CTA button shape, and the same container width.

## 4) SURFACE SKINS (compose §2.2 tokens only)
`solid` (surface + hairline) · `glass` (translucent surface + `backdrop-filter:blur(14px) saturate(1.4)` + opaque `@supports` fallback) · `ink` (navy `#0a2543`/dark surface band, light text) · `tint` (`--tint`/`--mint` wash) · `mesh` (`--mesh-1→--mesh-2` gradient) · `elevated` (soft shadow, no border) · `editorial` (transparent, hairline rules only) · `dual` (two stacked surfaces of different tone) · `invert` (whole chrome dark even on light page).
Rules: AA contrast in both themes; no purple/neon/gradient soup; never animate `backdrop-filter`; neighbouring pairs must not share a skin.

## 5) THE 20 PAIRS (roster — build in this order, 5 per batch)
Each row = one header **and** its matching footer. Axes below are what must differ between pairs.

| # | ID | Header | Footer (matched) | Skin | Reference idea (look at it live) |
|---|---|---|---|---|---|
| 1 | P01-classic | logo left · 7 inline links · theme toggle · Sign in · teal pill — repo baseline | 4-col: brand+blurb · Product · Company · Legal, hairline, legal row | solid | the repo screenshots |
| 2 | P02-glass | sticky, translucent, blur engages after 8 px scroll | same columns on a soft mesh wash, glass legal bar | glass | linear.app, vercel.com |
| 3 | P03-ink | navy utility strip (`Intake open` · INR/USD) + white main bar | navy footer, light text; the same strip closes the page as its legal bar | ink | apple.com, microsoft.com |
| 4 | P04-pill | detached floating pill, inset 16, centred | floating rounded card footer, inset 16 | elevated | raycast.com, stripe.com |
| 5 | P05-centered | logo centred, 3 links each side, hairline under | centred stack: logo, one link row, legal | solid | nytimes.com, aesop.com |
| 6 | P06-editorial | thick top rule, small-caps nav, thin rules | rule-separated columns, ruled legal row | editorial | economist.com, pentagram.com |
| 7 | P07-announce | dismissible teal `Intake open` bar + classic nav | `Ready to ship with clarity?` CTA band fused to columns | tint | stripe.com, webflow.com |
| 8 | P08-mega | `Product` opens a 3-column panel with icons | mega sitemap: 5–6 dense columns | solid | shopify.com, adobe.com |
| 9 | P09-search | wide inline search field is the centre of the bar | newsletter-lead: email field dominant (`Get new posts from the Blog`) | tint | airbnb.com, medium.com |
| 10 | P10-auth | logo mark + one circular icon button (login/register chrome) | single-row minimal: mark left, legal line right | editorial | repo `006-login` |
| 11 | P11-segmented | sliding segmented-pill nav | domain ticker (marquee) + legal bar | tint | vercel.com, repo ticker row |
| 12 | P12-dark | dark-native bar, teal accents | dark-inverted footer, mint links | invert | github.com, supabase.com |
| 13 | P13-mesh | transparent over mesh hero → solid on scroll | mesh footer with big CTA | mesh | airbnb.com, lusion.co |
| 14 | P14-overlay | burger only → full-screen overlay with large links | oversized full logo, links above it | editorial | studio sites, cuberto.com |
| 15 | P15-drawer | right-hand drawer + scrim | accordion columns (`details`/`summary`) | solid | e-commerce, gov.uk |
| 16 | P16-dock | slim top bar + bottom tab bar on mobile | compact footer + pinned mobile CTA strip | elevated | native-feel web apps |
| 17 | P17-palette | `Search… ⌘K` pill → palette overlay | status footer: `Intake open`, `Client portal · live` pills | glass | linear.app, clerk.com |
| 18 | P18-progress | 2 px scroll-progress line on top of the bar | proof rail: ₹4,28,500 · ₹4.2L · Payouts cleared 1/3 above columns | solid | medium.com, theverge.com |
| 19 | P19-locale | two-tier: utility row with INR/USD + language, main row below | locale/currency switcher + Razorpay line | dual | wise.com, booking.com |
| 20 | P20-split | 50/50 split: logo+nav left, equal `Sign in` / `Start a project` right | 50/50 split: CTA left, links right | tint | upwork.com, fiverr.com |

Pairs differ from each other on **≥ 3 of 5 axes: layout geometry · nav paradigm · scroll behaviour · surface skin · CTA treatment** — and at least one must be geometry or skin. Recolouring is not a difference.

## 6) EACH PAIR'S FILES
- `header.html` — standalone, like `example-header.html`: `<!DOCTYPE html>`, `<style>` with tokens + header CSS, `<header role="banner">`, tiny `<script>` only for disclosure/scroll. Shows the header with a short tall spacer so scroll behaviour can be seen.
- `footer.html` — standalone, like `example-footer.html`: tokens + footer CSS, `<footer role="contentinfo">`, a short spacer above.
- `index.html` — both together between a short sample `<main>` (H1 + 2 paragraphs from the copy bank). **This is what a pair looks like in use.**
- `pair.json` — **only**: `id`, `name`, `skin`, `header` (one line), `footer` (one line), `signature_motion`, `references` (2 hostnames), `dna` (one sentence: what makes the two halves a pair).
- Budgets: each standalone file ≤ 16 KB **including** the shared token/primitive block (~4.5 KB) — i.e. a pair's own header or footer CSS stays around 3–7 KB; JS ≤ 40 lines per half (command palette / overlay may reach ~45); DOM ≤ 90 / 120 nodes. Zero external requests. Zero frameworks.
- Standalone pages accept `?theme=dark|light` (applied before first paint, defaults to the OS setting) and `?frame` (hides the sample content so the gallery can show only the chrome).

## 7) QUALITY RULES (compact — replaces the 14 gates)
1. **Pair** — passes the pair test (§3) for every one of the 20.
2. **Brand** — real logo files, only §2.2 tokens, icons from the one set, copy only from §2.3.
3. **Craft** — reads like the examples: no dead CSS (every class used), comments say why, mobile-first, ≤ 1 media block per breakpoint concern.
4. **A11y** — skip link, exactly one `banner` and one `contentinfo`, `aria-expanded`/`aria-controls` on every disclosure, `Esc` closes + returns focus, `:focus-visible` ring `2px solid var(--teal)` + 2 px offset (`outline:none` banned), `aria-current="page"` on the current link, AA contrast in light **and** dark.
5. **Responsive** — no horizontal scroll at 360 / 768 / 1024 / 1440; 44 px targets on mobile; footer columns stack calmly; chrome ≤ 88 px tall at 1024+.
6. **Motion** — one signature per pair, 120–320 ms, transform/opacity only; `@media (prefers-reduced-motion: reduce)` removes marquees, slides and scroll effects (opacity ≤ 150 ms only). No layout-shift on scroll (CLS 0).

## 8) WORKFLOW
1. **Orient** (§0). Print: tokens you measured, the logo files you will use, the 3 things you will copy from the examples' craft.
2. **Quick research (≤ 30 min of effort, not the main job).** For each pair, open its reference sites (§5), note *one* header idea and *one* footer idea in `docs/RESEARCH-NOTES.md` (`P07 · stripe.com · announce bar collapses in 220 ms · CTA band merges into columns`). No capture harness, no screenshots archive. Never copy logos, icons, illustrations or sentences.
3. **Foundation.** Copy the two real logos into `chrome-lab/assets/`; cut the two mark-only files from the real paths; write the icon set once (reuse it, don't redraw per file).
4. **Build in batches of 5 pairs** (P01–P05, P06–P10, P11–P15, P16–P20). For each pair: write the *Pair DNA* line first → header → **footer from the same DNA** → `index.html` → `pair.json`.
5. **Look at it.** `python3 -m http.server 8123` from the repo root, open each `pairs/Pnn-*/index.html` at 1440 px and 390 px, light and dark. Fix what looks like "a generic template wearing teal". If the sandbox has no browser, say so plainly — never write "browser-verified" without a browser.
6. **Gallery** `chrome-lab/index.html`: one card per pair (header strip over footer strip, `loading="lazy"` iframes of the pair's `index.html`), a light/dark switch that passes `?theme=`, link to each standalone `header.html` / `footer.html`. Repo-root `index.html` redirects to it.
7. **Finish** with the short report (§9).

## 9) END-OF-TURN REPORT (short)
```
Pairs built: <n>/20 (headers <n>/20 · footers <n>/20 — same IDs)
Logo: real files used YES/NO · invented glyph: NONE
Icons: one inline set YES/NO
Pair test: <n>/20 pass   Browser look: DONE at localhost:8123 / NO-BROWSER
Files: chrome-lab/pairs/P01-…/{header,footer,index}.html … + chrome-lab/index.html
Flagged: <IDs + reason or none>
```

## 10) REFUSAL RULES
- Do not build more than 20 headers or 20 footers. Do not build a header without its matching footer (or vice-versa).
- Do not redraw, recolour, or replace the Nestlancer logo; do not use emoji or a CDN icon font as icons.
- Do not add Bootstrap / Tailwind / any CSS framework, a font CDN, or any external request.
- Do not ship recolours as different pairs; do not stub, `TODO`, or write "same as above".
- Do not invent copy, clients, prices, certifications or features outside §2.3.
- Never edit anything under `Nestlancer-public-screenshots/`.

## 11) START COMMAND
1. Read `example-header.html`, `example-footer.html`, the logo SVGs, and screenshots 013 / 015 / 006.
2. Set up `chrome-lab/assets/` (real logos + mark-only cuts) and the shared icon set.
3. Build **P01–P05** (header → matching footer → pair page → pair.json), look at them in a browser, fix, then continue P06 → P20 in batches of 5.
4. Gallery + root redirect + `docs/RESEARCH-NOTES.md` (20 lines). Print the §9 report.
````

---

## Operator notes
- **Review is easy now:** open `chrome-lab/index.html` — 20 cards, each a header + footer pair. If any card's footer looks like a different site from its header, say: *"P12 fails the pair test — rebuild its footer from the pair DNA."*
- **Logo wrong?** *"Use the real logo-full-light/dark.svg — no redrawn glyph."*
- **Too busy / too heavy?** *"Cut P09 CSS to the example's style — remove anything not used by the HTML."*
- **Swap one pair:** *"Replace P14 with a pair built around a docs breadcrumb header + sitemap footer."*
- **Freeze:** *"P01–P05 approved — never regenerate them."*

## What v4 fixes vs v3
| v3 run | v4 |
|---|---|
| 100 headers + 100 footers = 200 things to review | **20 pairs** (20 + 20) |
| Header and footer designed separately → mismatched | **Pair DNA + pair test** (§3) |
| Invented bird glyph + serif wordmark | **Real logo SVGs** + mark-only cuts, never redrawn |
| Icons ad hoc / missing | One inline-SVG icon set shared by every header and footer |
| Megatemplate CSS, 14 KB+ stylesheets | Example-style, hand-written, ≤ 16 KB files incl. the shared base block |
| 200-site capture, 34 motion primitives, 14 gates, QA matrices | ~20 reference notes, 6 compact quality rules |
| Fraunces/Inter/Plex via Google Fonts link | System/Inter sans stack, zero external requests |
