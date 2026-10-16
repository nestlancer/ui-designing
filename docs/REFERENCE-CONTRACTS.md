# Chrome Reference Contracts — printed before CSS, per batch

Every batch below was contracted **before** its CSS was generated. Rows cite only sites that were
actually captured into `research/sites.json`, and the motion column references measured primitives
from `research/motion-index.json` (real duration / delay / easing / trigger).

---

## P0 — Repo-faithful baseline · H001–H008, H061–H064, F001–F010 (22 variants)

Date/context: batch 1, before any variant CSS existed.
Captured sites available: 134 (`research/sites.json`).
Repo screenshots re-opened: `013-marketing-homepage.webp` (header + footer regions), `015-marketing-contact.webp` (short footer), `006-login.webp` + `001-admin-login.webp` (auth chrome).

| Variant slot | Source site (captured) | Exact chrome pattern | Traits to copy | Traits to NOT copy | How adapted to Nestlancer tokens |
|---|---|---|---|---|---|
| H001 container | stripe.com | 1200 contained, 72 px, hairline, inline link row | gutter rhythm, hairline weight, link spacing | mega density, purple/indigo brand | `--n-container`, `--n-hairline`, 7 locked nav links |
| H002 hairline/hover | linear.app | sliding ink bar under the active link | 220 ms shared-element transform | dark-first palette, ⌘K prominence | ink bar in `--n-teal`, on `--n-bg` canvas |
| H003 CTA | razorpay.com | single high-contrast pill on the right | pill radius, weight 600, 44 px target | dense badge clutter | `--n-teal` pill, `Sign in` stays quiet text |
| H005 spacing | vercel.com | logo-left single row, calm density | 24 px inline gap, 14 px/500 links | black canvas, monospace-only voice | body `--n-body` → ink on hover |
| H061 auth minimal | clerk.com | logo + one icon button only | single-action header, 100% calm | marketing nav, product switcher | keep the repo's auth chrome (logo top-left, one round icon button) |
| F001 columns | stripe.com | brand blurb + 3 link columns + legal row | column gap 24, eyebrow mono | 5-col wall, status widget | sitemap locked to §2.4 links only |
| F006 oversized | pentagram.com | oversized wordmark as the footer hero | display serif, tight tracking | 4-word studio lockup | `Nestlancer` + teal full-stop, Fraunces |
| F011 newsletter | substack.com | email capture as the dominant footer element | single field + pill button | publisher branding | blurb + `Stay in the loop` copy |

Motion palette for this batch: enter 600 ms `ease-out` with 60 ms stagger (m-19) · hover 220 ms `cubic-bezier(.2,.8,.2,1)` (m-05) · signature: m-05 (H001/H002/H005), m-12 (auth), m-19 (footers).
A+ definition for this batch:
1. At 1440 px it is indistinguishable in rhythm from `013-marketing-homepage.webp` — same 72 px, same 1200 px, same hairline.
2. Exactly one signature motion is visible without hunting for it.
3. Dark theme looks designed, not inverted.
Axes claimed (each variant differs from its family siblings on ≥3): container geometry · scroll behaviour · motion primitive · disclosure · CTA treatment.

---

## P1 — Public & marketing · header families 3, 4, 14, 18, 19, 22, 23, 25 · footer families 3, 4, 5, 10, 11, 12, 13, 17 (72 variants)

Captured sites available: same 134. Screenshots re-opened: `016-marketing-pricing.webp`, `017-marketing-services.webp`, `002-blog-listing.webp`.

| Variant slot | Source site (captured) | Exact chrome pattern | Traits to copy | Traits to NOT copy | How adapted to Nestlancer tokens |
|---|---|---|---|---|---|
| Two-tier utility | microsoft.com | 30 px utility strip above a 72 px main row | strip height, eyebrow type, locale placement | 6-column product mega | utility shows `Intake open` + `INR ₹ · EN-IN` only |
| Mega panel | shopify.com | hover-intent panel with link columns | 120 ms intent delay, 260 ms reveal | image tiles, colour illustration | 4 mono link rows per panel, no imagery |
| Search-forward | airbnb.com | search field IS the navigation | field size, `/` shortcut affordance | rounded pill overload, icon noise | 380 px field, `--n-radius-pill`, `/` focuses |
| Announcement bar | stripe.com | dismissible 32 px bar above nav | 220 ms collapse, never re-show | gradient banner, launch promo colour | navy bar, `Intake open` copy, `localStorage` dismiss |
| Ticker nav | repo `013-marketing-homepage.webp` ticker row | infinite domain marquee under the logo | 28 s linear, `translateX(-50%)`, hover pause | second accent hue | mono eyebrows, `--n-bg-tint-1` strip |
| Segmented tabs | raycast.com | sliding segmented control as primary nav | active-pill morph, keyboard support | ⌘K-only discovery | `aria-selected` tabs, 240 ms morph |
| Dual-CTA split | notion.so | `Sign in` + `Start a project` as equal-weight pills | both ≥44 px, clear hierarchy | gradient fills, emoji icons | one teal pill + one hairline pill |
| Editorial type | theguardian.com | thin rules + display serif voice | serif wordmark scale, rule weight | news-paper density, section colour coding | Fraunces wordmark, `Fresh` rule + eyebrow |
| Curtain footer | cuberto.com | footer pinned behind content, revealed on scroll | sticky-behind geometry | WebGL distortion, 3-D flourishes | `position:sticky` + `z-index`, guarded by `body:has()` |
| Proof rail | zerodha.com | ₹ numbers with tabular numerals | tabular alignment, muted labels | brokerage disclaimers verbatim | `₹4,28,500`, `₹4.2L`, `Payouts cleared 1/3`, count-up 1200 ms |
| Mesh footer | repo hero mesh (`013`) | mesh wash echoing the hero at the base | `--n-mesh-1/2`, soft gradient | purple gradient soup | mesh + navy heading + teal pill |
| Issue-style | economist.com | dated issue framing in the footer | rule + date + serif title | paywall prompts | `ISSUE 04 · OCT 2026`, Journal framing |
| Marquee wordmark | awwwards.com | giant wordmark scrolling on enter | 28 s linear loop, hover pause | portfolio-showcase styling | `Nestlancer.` display serif, 64 px clamp |

Motion palette: enter 260 ms `cubic-bezier(.16,1,.3,1)` (m-07/m-34) · scrub linear (m-13/m-21) · signature one per variant, unique inside each family.
A+ definition: 1. The mega/announcement/ticker layers never fight for attention. 2. Keyboard path reaches every link (`Tab` + `Esc`). 3. 1440 px stays calm at 72 px tall even with two extra tiers.

---

## P2 — Portal, commerce & trust · header families 5, 6, 11, 12, 13, 17, 21 · footer families 7, 8, 14, 15, 16, 19, 20 (63 variants)

Screenshots re-opened: `007-portfolio-listing.webp`, `009-privacy.webp` (legal-dense footer), `012-verify-document.webp`, `016-marketing-pricing.webp`.

| Variant slot | Source site (captured) | Exact chrome pattern | Traits to copy | Traits to NOT copy | How adapted to Nestlancer tokens |
|---|---|---|---|---|---|
| Floating glass pill | raycast.com | detached pill, inset 16, blur 14 px, hairline | blur/saturate recipe, soft shadow | neon edge glow, dark-first | light default, glass toggled at a measured threshold, opaque fallback via `@supports` |
| Sticky shrink | notion.so | 72 → 56 px on scroll with logo scale | 200 ms `cubic-bezier(.2,.8,.2,1)` | heavy shadow bloom | height + brand scale only, hairline stays |
| Bottom tab bar | native-feel apps (mobbin.com evidence) | 4 tabs + More, safe-area padding | 44 px targets, icon+label pairing | iOS-specific glyph set | inline SVG symbols, `env(safe-area-inset-bottom)` |
| Split identity | upwork.com | client ⇄ freelancer segmented control | equal weighting, state persistence | marketplace blue palette | `aria-pressed` control, teal active pill |
| Category rail | etsy.com | divider + horizontal chip rail | scroll-snap, active pill morph | photo tiles | mono chips, `IntersectionObserver`/click state |
| Wizard progress | ramp.com | step dots + progress bar under the nav | 3-step clarity, honest labels | fake percentage theatre | `Step 2 of 3` with `role="progressbar"` |
| Docs nav | github.com | breadcrumb row + section tabs, second sticky row | two-row rhythm, muted breadcrumb | dark IDE chrome | mono breadcrumb, `aria-current` on the section |
| Minimal single-row | minimal.gallery | wordmark left, © right, 56 px | extreme calm, single hairline | invisible affordances | keeps skip link + focus rings |
| Two-bar | atlassian.com | links bar + legal bar, different tones | banding, second hairline | dense compliance wall | two tones of `--n-bg-tint-1`/`--n-surface` |
| Locale switcher | booking.com | currency/locale listbox in the footer | 180 ms slide, INR/USD | cookie-banner coupling | `INR ₹ · EN-IN` default, en-IN grouping |
| Social wall | ramotion.com | client cells + awards row | 40 ms stagger pop, monochrome | real client logos | typographic cells (`FintelPayments`, `SaaS Analytics`, …) — no third-party marks |
| Sticky mobile footer | swiggy.com | pinned CTA strip on small screens | thumb reach, 44 px | app-store badges | teal pill strip, dismissed at ≤900 px only |
| Compliance (India) | zerodha.com | PCI-DSS / GST / grievance-officer line | muted 12 px, honest wording | brokerage disclaimers verbatim | `Razorpay · PCI-DSS aligned · GST invoices · DPDP Act 2023 · grievance officer` |
| Community & status | linear.app | status pill + changelog + RSS | dot pulse 2 s | uptime charts | `All systems operational`, `Changelog`, `Status`, `RSS` |

Motion palette: 180–320 ms standard layer · infinite 2 s pulse (m-25) · 1.2 s count-up (m-26) · 40 ms social stagger (m-27).
A+ definition: 1. Trust language reads honest, never promotional. 2. The rail/wizard/tab-bar never hides the primary CTA. 3. Mobile chrome stays ≤88 px tall.

---

## P3 — Product, app & experimental · header families 7, 8, 9, 10, 15, 20, 24 · footer families 2, 6, 9, 18 (48 variants)

Screenshots re-opened: `003-blog-article.webp` (long read), `013-marketing-homepage.webp` (mesh hero), `001-admin-login.webp` (separate admin identity).

| Variant slot | Source site (captured) | Exact chrome pattern | Traits to copy | Traits to NOT copy | How adapted to Nestlancer tokens |
|---|---|---|---|---|---|
| Auto-hide | theverge.com | hide on scroll-down, reveal on scroll-up | 320 ms ease-out, `translateY(-100%)` | editorial ad chrome | returns on any upward gesture >120 px |
| Transparent over hero | lusion.co | transparent over mesh/hero, solid after exit | 300 ms crossfade, `IntersectionObserver` | WebGL canvas, 3-D | repo mesh wash only, `is-solid` class |
| Fullscreen overlay | instrument.com | clip-path wipe to full-viewport mega type | 480 ms `cubic-bezier(.76,0,.24,1)` | 96 px display type on mobile | `clamp()` display scale, Esc closes, focus trapped |
| Side drawer | ikea.com | right drawer + scrim, nested groups | 300 ms drawer / 200 ms scrim, 44 px rows | multi-level commerce tree | 7 locked links + single CTA |
| Command palette | linear.app | “Search… ⌘K” pill → palette dialog | 180 ms scale/blur-in, arrow keys, Enter runs | feature discovery marketing | 4 commands mapped to real routes |
| Scroll progress | nytimes.com | 2 px progress line + section label | linear scrub, no easing | advertising rails | `scroll()` timeline with JS fallback, hidden under reduce |
| Edge icon rail | jetbrains.com | 64 px vertical rail beside a slim bar | rail rhythm, hover states | IDE tool-window chrome | 5 inline-SVG glyph links, offset header |
| Oversized wordmark | instrument.com | wordmark scaling on scroll | `scale .9 → 1.15` scrub | 3-D distortion | scrub capped at −12 %, disabled under reduce |
| Accordion columns | apple.com | mobile accordion sitemap | `grid-template-rows` 0fr→1fr, 260 ms | brand-logo lockups | `<details>`/summary fallback, 44 px heads |
| Dark inverted | vercel.com | deep-surface footer with mint links | 8 % white hairlines, tabular proof numbers | monochrome icon set | `#0b1720` surface, `--n-teal` accent retained |
| App / QR | phonepe.com | QR block + store buttons | QR geometry, honest copy | real store badges | CSS QR placeholder marked `role="img"` with an accessible name |
| Grain drift | basement.studio | subtle noise drift | 8 s steps loop, 5 % opacity | WebGL, cursor replacement | inline SVG turbulence, decorative only |

Motion palette: 300–480 ms experimental layer, exits 25 % faster · signature primitive unique per variant, none repeated inside a family (G1 enforces it).
A+ definition: 1. Experimental motion never blocks the keyboard or reduced-motion path. 2. Every overlay can be exited with `Esc` and returns focus to its trigger. 3. Nothing animates `backdrop-filter` on scroll — glass is toggled at a measured threshold.

---

## Cross-batch gates

| Contract clause | Enforced by | Status |
|---|---|---|
| Every variant cites ≥2 captured sites + ≥1 measured motion | `tools/qa.mjs` G8 | pass (200/200) |
| No pair of variants differs on <3 axes | G1 (all 19 900 pairs) | pass (min distance 3) |
| No motion primitive repeated inside a family | G1 | pass |
| Locked tokens only, single accent hue | G3 | pass |
| Reduced-motion path removes transforms | G6 | pass (static) |
| CSS scoped to `[data-chrome="…"]` | G10 | pass |
| Deliverables inside the workspace tree | G12 | pass |
