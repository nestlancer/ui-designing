# Nestlancer Header & Footer Lab — Master Prompt v4
### Research 100 world-ranked sites → design 20 matched header + footer pairs

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the `ui-designing` repo open.
> It replaces `header-footer-prompt.md` (v3: 100 + 100 variants, 200 sites, 14 gates). v3 produced too many files, headers and footers that did not match each other, an invented logo, and code that did not feel like the repo's own `example-header.html` / `example-footer.html`. v4 fixes those four things on purpose.

---

## 1. YOUR ROLE

You are, at the same time:

1. **A creative artist and art director.** You give each design a concept, a mood, a shape language and one memorable moment. You make bold, tasteful choices. You do not fill a grid with recolours.
2. **A senior UI designer.** You think in hierarchy, rhythm, spacing, contrast, type scale and states (hover, focus, active, open, scrolled, empty, error).
3. **A front-end craftsperson.** You write small, readable, accessible HTML + CSS + a little JS, in the spirit of the two example files in this repo.
4. **A research analyst.** You study 100 real, world-ranked sites as *data*, extract patterns, and never copy their identity.
5. **A harsh design critic.** You look at every result in a real browser and reject anything that looks like a generic template wearing a teal button.

## 2. THE MISSION (read twice)

| Stage | Quantity | Output |
|---|---|---|
| **Research** | **100** world-ranked sites | `research/top-100.json`, `research/sites-100.json`, `docs/RESEARCH-NOTES.md`, `research/patterns.md` |
| **Design & build** | **20 headers + 20 footers = 20 PAIRS** (`P01` … `P20`) | `chrome-lab/pairs/Pnn-name/` + `chrome-lab/index.html` gallery |

**The pair rule — the most important rule in this file.** Header `P07` and footer `P07` are designed *together*, as one system, with one concept. A stranger who sees only the header and only the footer must say "same site, same designer". A header that looks like one product and a footer that looks like another is a **failed pair**, even if each half is good on its own.

**Research wide, build narrow.** 100 sites go in; 20 pairs come out. Quality per pair beats quantity. Never build more than 20 headers or 20 footers.

## 3. READ FIRST — in this order, before any design

1. **`example-header.html` and `example-footer.html`** (repo root). They define the *craft standard*. Notice and match:
   - one self-contained file each: `<style>` + markup + a few lines of `<script>` only where needed;
   - CSS custom properties at the top, mobile-first, one `@media (min-width…)` block for desktop;
   - BEM-style names (`navbar__link`, `footer-wave__heading`) and short comments that explain *why*;
   - accessibility built in: `aria-label`, `aria-controls`, `aria-expanded`, `:focus-visible`, real `<ul>/<li>`, `role="banner"` / `role="contentinfo"`;
   - nothing decorative that isn't used: no dead CSS, no framework, no CDN.
   Your files must feel **hand-written in that same spirit** — but in the Nestlancer brand (§4), not the examples' generic blue.
2. **`logo-full-light.svg` and `logo-full-dark.svg`** (repo root). This is the real Nestlancer logo (bird-in-nest mark + wordmark). Render it and look at it.
3. **`Nestlancer-public-screenshots/public/*.webp`** (17 files, 2880 px wide = 1440 CSS px @2×). Open `013-marketing-homepage.webp` and crop the header and footer at full size. Also open `015-marketing-contact.webp` (short footer), `009-privacy.webp` (legal footer) and `006-login.webp` (auth header). Note gutters, the 72 px header height, the 1200 px container, pill radius, hairline weight and the 11 px mono eyebrows.
4. This prompt, end to end.

**Touch only your own output folders.** You create files inside `chrome-lab/`, `research/`, `docs/` and `tools/`. You never edit `example-header.html`, `example-footer.html`, the logos, `Nestlancer-public-screenshots/`, or any prompt file.

## 4. BRAND SYSTEM — locked

### 4.1 Logo (the rule earlier runs broke)
- **Use the real logo files.** `logo-full-light.svg` (indigo `#272A7A` + teal `#16B6A5`) on light surfaces; `logo-full-dark.svg` (white + teal) on dark surfaces. Insert with `<img src="…" alt="Nestlancer" width height>`; swap between light/dark with a `data-theme` rule or `<picture>` + `prefers-color-scheme`.
- **Sizes:** 24–40 px high in headers; any size (up to a page-wide wordmark) in footers. Aspect ratio is 1973 : 544 (≈ 3.63 : 1) — always set both `width` and `height` to avoid layout shift.
- **Mark-only** (bird, nest and the teal dot — no letters) is allowed for compact places: mobile bars, auth headers, dock bars, minimal footers. Produce `chrome-lab/assets/logo-mark-light.svg` / `-dark.svg` by **selecting the bird / nest / dot `<path>` elements that sit left of the "N" in the real SVG** (render the result and check it) — never by redrawing. (In the current files the mark is `<path>` index 0, 1, 2, 6, 14, 15 with `viewBox="0 0 535 544"`; confirm by rendering.)
- **Forbidden:** inventing a glyph or a leaf, typesetting "Nestlancer." in a serif as a fake logo, recolouring the logo, stretching it, adding outlines/shadows/gradients, placing the indigo logo on a navy or teal surface (use the dark logo there).
- Copy both logos byte-for-byte into `chrome-lab/assets/`; every page references them by **relative path**.

### 4.2 Icons
- **One inline-SVG icon set**, used by every header and every footer: 24 × 24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true" focusable="false"`. Icon-only buttons carry an `aria-label`.
- Minimum glyphs: sun, moon, menu, close, search, arrow-right, chevron-down, mail, globe, check, external, linkedin, github, x — plus what your concepts need (home, layers, pen, tag, send, shield, rupee…).
- Written **once** in a shared snippet/generator and reused — never re-drawn per file, never different stroke weights between a pair's header and footer.
- Touch targets ≥ 44 px on mobile. No emoji. No icon-font or icon CDN. Social marks are simple monochrome strokes, never a brand-logo sprite.

### 4.3 Tokens (measured from the screenshots; use `var(--…)`, no new hues)
```css
:root{
  --bg:#f9fbfc; --surface:#ffffff; --surface-2:#f4f8f9; --tint:#edf4f6; --mint:#eef7f5;
  --mesh-1:#d8e8e9; --mesh-2:#daeaeb;
  --ink:#0a2543; --ink-2:#123a5e; --body:#4a5c6e; --muted:#5f7080; --line:#e3ebe9;
  --teal:#24877f; --teal-hover:#1c6f68; --teal-soft:#d9ece9; --glow:#3fb8ab; --live:#22a06b;
  --btn:#1f7a73;                 /* CTA fill: the measured teal nudged so white 15px/600 text passes AA */
  --band:#0a2543; --band-text:#e8eef4; --band-body:#b9c6d0; --band-line:rgba(255,255,255,.12);
  --shadow:0 8px 28px rgba(10,37,67,.10);
  --pill:999px; --card:14px; --chip:8px;
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
}
[data-theme="dark"]{            /* derived, never invented */
  --bg:#0b1720; --surface:#0f1e29; --surface-2:#12242f; --tint:#102530; --mint:#10272a;
  --mesh-1:#12303a; --mesh-2:#0f2a33;
  --ink:#e8eef4; --ink-2:#d3dde6; --body:#b9c6d0; --muted:#8aa0b3; --line:rgba(255,255,255,.08);
  --teal:#2fa59b; --teal-hover:#3fb8ab; --teal-soft:#14343a;
  --band:#06111a; --shadow:0 8px 28px rgba(0,0,0,.45);
}
```
- `--muted` is `#5f7080`, not the screenshot grey `#7b8b99`: the measured grey fails AA at 11–13 px. For small teal *text* on light surfaces use `--teal-hover` or `--btn`, never `--teal`.
- **Typography:** one clean geometric sans (the screenshots are sans — **no serif display face**). Use the `--font` stack; **no web-font download, no `<link>` to a font CDN**; the files must render offline. Footer column heads: 11 px, mono, uppercase, `letter-spacing:.14em`, `--muted`. Nothing under 11 px; body ≥ 14 px; ₹ figures use `font-variant-numeric:tabular-nums`.
- **Each standalone file defines its own `:root` tokens** (like the examples), so any single file opens alone and renders correctly.
- **Theme:** light by default, dark must be genuinely good. A tiny inline script applies `?theme=dark|light` before first paint (falling back to the OS setting) and sets `data-theme` on `<html>`.
- **Hard bans:** a second brand hue, purple/neon, Bootstrap / Tailwind / Bulma / any CSS-framework CDN, any external request, gradient soup, glass over dense text, 3D flourishes.

### 4.4 Locked copy (reuse; never invent features, clients, prices or certifications)
- **Nav:** Product · Portfolio · Blog · About · Pricing · Services · Contact
- **Actions:** `Sign in` · `Start a project` · `Preview the portal` · theme toggle · search · status pill `Intake open` · `Client portal · live`
- **Blurb:** `Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.`
- **Footer columns:** PRODUCT — Project Hub, Pricing, Services, Portfolio · COMPANY — About, Blog, Contact, Start a project · LEGAL — Terms, Privacy, Verify document
- **Legal line:** `© 2026 Nestlancer. Made in India. All rights reserved.`
- **Eyebrows:** `FIG · WORK`, `FIG · PORTAL`, `FIG · START`, `PRODUCT`, `COMPANY`, `LEGAL`
- **Proof numbers (the only ones allowed):** `₹4,28,500` payments · `₹4.2L` milestone · `Payouts cleared 1/3`
- **Ticker:** FINTECH · E-COMMERCE · SaaS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES · HEALTHCARE
- **CTA line:** `Ready to ship with clarity?`
- **Routes:** `/` `/product` `/portfolio` `/blog` `/about` `/pricing` `/services` `/contact` `/login` `/register` `/terms` `/privacy` `/verify`
- Currency: INR primary (en-IN grouping), USD secondary.

## 5. PHASE 1 — RESEARCH: 100 WORLD-RANKED SITES

**Goal:** understand how the best sites solve header and footer problems — structure, density, scroll behaviour, motion, mobile collapse — so your 20 concepts are informed and varied. Research never decides the brand; the brand is §4.

### 5.1 Build the list first — `research/top-100.json`
Do this live; **memory is not a ranking.**
1. Fetch **at least two** ranking sources and print their URLs: Similarweb Top Websites · Semrush Top Websites · Cloudflare Radar domains · Wikipedia "List of most-visited websites".
2. Write **exactly 100** objects:
   ```json
   { "rank": 1, "host": "google.com", "rank_source": "similarweb-global-2026-10",
     "tier": "global-top-100", "bucket": "B", "suitable": true, "skip_reason": null }
   ```
3. **Eligible:** hosts on a fetched global ranking (`global-top-100` / `global-top-200`), or a household, category-defining brand with a public marketing site (`category-world-leader`, e.g. stripe.com, airbnb.com) — allowed only to fill chrome-rich gaps once ranked hosts are exhausted.
4. **Banned:** NSFW, gambling, malware, personal blogs, obscure startups, invented domains, CodePen/demo pads.
5. **Skip & replace:** bot-wall, geo-block, `robots.txt` disallow, login-only shell. Log `suitable:false` + reason and take the **next suitable ranked** host (or a same-bucket world leader). Never a random site.
6. Print: `TOP-100 LOCKED — sources: … · global-tier: <n> · category-leader-tier: <n> · skipped: <n>`.

### 5.2 Cover the range — twelve buckets (≈ 8 per bucket, host-deduped, total 100)
A Marketplaces & freelance (amazon, etsy, upwork, fiverr, toptal, dribbble…) · B Big-tech platforms (google, microsoft, apple, meta, linkedin, github…) · C Dev tools & infra (vercel, cloudflare, atlassian, figma, notion, linear…) · D Fintech & payments (paypal, stripe, wise, razorpay, revolut, coinbase…) · E SaaS marketing (canva, slack, zoom, shopify, hubspot, mailchimp…) · F Editorial & media (nytimes, bbc, theguardian, economist, theverge, medium…) · G Brand / agency leaders (nike, airbnb, tesla, pentagram, awwwards…) · H E-commerce & retail (walmart, ikea, zara, nike, sephora…) · I Travel & mobility (booking, expedia, uber, kayak…) · J AI products (openai, anthropic, perplexity, huggingface…) · K Consumer platforms (netflix, discord, pinterest, twitch…) · L India & APAC leaders (flipkart, swiggy, zomato, paytm, zerodha, groww, naver…).
Expand from the live rankings; treat these as seeds, not a fixed list.

### 5.3 Study each site — `research/sites-100.json`
For **every** site, actually open it (fetch the page; use a browser if you have one) and record, in one compact object:
- identity: `host`, `rank`, `rank_source`, `tier`, `bucket`, `verified` (true only if fetched live this run), `capture_failed`;
- **header:** layout (logo position, nav count, CTA count, utility strip? search? mega/drawer/overlay?), height at 1440, scroll behaviour (static / sticky / shrink / auto-hide / transparent→solid) with the px trigger if you measured it, mobile collapse (burger / drawer / bottom bar / none);
- **footer:** structure (columns, newsletter, CTA band, oversized wordmark, status, locale, legal density), surface (light / dark / tint / gradient), reveal or motion;
- **motion note:** the *one* notable animation, with duration + easing + trigger if measurable (browser: `document.getAnimations()` and a scroll probe; no browser: read the CSS transitions/keyframes in the fetched source);
- **one-line insight** — the idea worth borrowing, in your own words.
Public chrome only: no logins, no form submissions, no paywalls, honour `robots.txt` and rate limits. **Never copy** logos, icons, illustrations or proprietary copy.

### 5.4 Animation vocabulary
Live sites show *what*; recipe libraries show *how* (codepen.io, uiverse.io, hover.css, animate.style, motion.dev, gsap.com, magicui.design, ui.aceternity.com, flowbite.com blocks). Use them only to learn *how to build* a motion — they do **not** count toward the 100.
Extract a short list of **measured primitives** into `research/patterns.md` (aim for 20+), each with `name · trigger · duration · easing · where seen`. Typical examples: sticky shrink, hide-on-scroll-down, glass engage after 8 px, transparent→solid, sliding nav underline / segmented thumb, mega-panel with child stagger, full-screen overlay, side drawer + scrim, ⌘K palette, scroll-progress line, ticker/marquee, announcement collapse, footer column stagger, count-up, accordion via `grid-template-rows`, oversized-wordmark reveal.

### 5.5 Synthesis — `research/patterns.md` and `docs/RESEARCH-NOTES.md`
- `docs/RESEARCH-NOTES.md`: **one line per site** — `rank · host · header/footer insight · rank-source URL` (100 lines).
- `research/patterns.md`: cluster the 100 into **≥ 15 header archetypes and ≥ 12 footer archetypes** (name, 2–3 example hosts, when it works, when it fails), plus the motion primitives. This file is the *input* to Phase 2.

### 5.6 Research gate (print it; do not start Phase 2 until it passes)
```
## RESEARCH GATE
Ranking sources fetched: <names + URLs>
top-100.json: 100/100 · unranked/random hosts: 0
Attempted: <n>   Captured (verified live): <n>/100   Skipped: <n> (reasons)
Bucket coverage: A<n> B<n> C<n> D<n> E<n> F<n> G<n> H<n> I<n> J<n> K<n> L<n>
Header archetypes: <n> (≥15)   Footer archetypes: <n> (≥12)   Motion primitives: <n> (≥20)
Gate: PASS / FAIL
```
If fewer than 100 are captured, substitute the next ranked host and keep going. Be honest: sites you could not open are listed as skipped — never fabricated.

## 6. PHASE 2 — CREATIVE DIRECTION: 20 CONCEPTS

Now stop researching and **think like an artist.** Turn the archetypes into 20 distinct design concepts, one per pair.

### 6.1 Write a Concept Card per pair (print all 20 before any code)
```
P07 · "Quiet Signal"
Mood: calm · confident · warm            Shape language: soft rectangles, 14 px corners, one teal pill
Concept: an announcement that never shouts — the teal strip opens the page and closes it.
Header: dismissible teal Intake-open bar above a mint nav bar
Footer: CTA card on mint, columns, closed by a teal legal strip
Pair DNA: (see 6.2)
Signature moment: the announcement collapses in 220 ms and stays dismissed
Research basis: stripe.com (announce bar), webflow.com (CTA band) — from sites-100.json
```
Rules for the 20 concepts:
- Each concept must differ from every other on **≥ 3 of these 5 axes**, one of which must be geometry or skin: **A) layout geometry** (full-bleed · 1200 contained · floating pill · split 50/50 · asymmetric · centred · rail) · **B) nav paradigm** (inline · dropdown · mega · overlay · drawer · bottom tabs · segmented · search-first · command palette) · **C) scroll behaviour** (static · sticky · shrink · auto-hide · transparent→solid · progress-linked) · **D) surface skin** (§6.3) · **E) CTA treatment** (teal pill · outline · split-arrow · text link · dual-equal · icon-only · sticky mobile bar). Recolouring or reordering links is **not** a difference.
- Use **≥ 9 different surface skins** across the 20, and never give two neighbouring pairs the same skin.
- Cover the range the research showed: at least 3 minimal, 3 dense/informational, 3 bold/expressive, 2 dark-native, 2 editorial, 2 mobile-first, 2 conversion-led.
- Name each concept (a short evocative title), not just a structure.

### 6.2 The Pair DNA (six decisions made once, obeyed by both halves)
| DNA item | Both halves must share |
|---|---|
| **Skin** | the same surface recipe and tonal family |
| **Geometry** | the same container width, inset and corner-radius family |
| **Rule language** | hairlines, shadows, thick rules or none — the same one |
| **Type voice** | link weight, case, tracking, eyebrow style |
| **CTA & accent usage** | the same button shape; teal spent the same way |
| **Signature motion** | one movement family in both (e.g. underline-draw, lift, slide, fade) |
Plus: the same icon set and stroke, the same logo treatment, the same hover/focus behaviour.
**Pair test:** put the header and footer side by side, cover the logo. If they could be re-paired with a different concept without anyone noticing, the pair fails — rebuild the footer from the DNA; don't just tweak it.

### 6.3 Surface skins (compose the §4.3 tokens only)
`solid` (surface + hairline) · `glass` (translucent + `backdrop-filter:blur(14px) saturate(1.4)` with an opaque `@supports` fallback; never animate the blur) · `ink` (navy band, light text) · `tint` (mint/tint wash) · `mesh` (`--mesh-1 → --mesh-2`) · `elevated` (soft shadow, no border) · `editorial` (transparent, rules and type only) · `dual` (two stacked surfaces of different tone) · `invert` (whole chrome dark on a light page).
Contrast stays AA after every skin choice; never navy text on an ink band.

### 6.4 Suggested starting roster (adapt freely — replace up to 6 if research gives you stronger ideas)
| # | ID | Header | Matching footer | Skin |
|---|---|---|---|---|
| 1 | P01-classic | logo left, 7 inline links, theme toggle, Sign in, teal pill (the repo baseline) | brand + blurb + 3 columns, legal row | solid |
| 2 | P02-glass | sticky; blur engages after 8 px | columns on a mesh wash, glass legal capsule | glass |
| 3 | P03-ink | navy utility strip + white main bar | navy footer closed by the same strip | ink |
| 4 | P04-pill | floating pill, inset 16 | floating rounded card | elevated |
| 5 | P05-centered | centred logo, links each side | centred stack | solid |
| 6 | P06-editorial | heavy top rule, ruled nav row, text CTA | rule-divided columns | editorial |
| 7 | P07-announce | dismissible announcement + tinted nav | CTA card + teal strip | tint |
| 8 | P08-mega | mega panel with icon tiles | the same tiles above a 6-column sitemap | solid |
| 9 | P09-search | search field is the centre | newsletter-led (same pill field) | tint |
| 10 | P10-auth | logo + one round icon button | one-line minimal | editorial |
| 11 | P11-segmented | sliding segmented nav | ticker + segmented legal links | tint |
| 12 | P12-dark | dark-native bar, glow hairline | dark footer, glow accents | invert |
| 13 | P13-mesh | transparent over hero → solid | mesh footer with big CTA | mesh |
| 14 | P14-overlay | burger → giant full-screen links | oversized logo footer | editorial |
| 15 | P15-drawer | right drawer + accordions | accordion columns | solid |
| 16 | P16-dock | slim top bar + bottom tab bar | compact footer + pinned CTA | elevated |
| 17 | P17-palette | ⌘K search pill + palette | status pills + ⌘K hint | glass |
| 18 | P18-progress | 2 px reading-progress line | proof rail with count-up | solid |
| 19 | P19-locale | utility tier with INR/USD + language | locale tier + Razorpay line | dual |
| 20 | P20-split | 50/50 split with equal CTAs | 50/50 split footer | tint |

## 7. PHASE 3 — BUILD

### 7.1 Output layout
```
chrome-lab/
  index.html                         ← gallery: 20 cards, header strip over its footer strip, light/dark switch
  assets/  logo-full-light.svg  logo-full-dark.svg  logo-mark-light.svg  logo-mark-dark.svg
  pairs/
    P01-classic/
      header.html    ← standalone page: the header (like example-header.html)
      footer.html    ← standalone page: the footer (like example-footer.html)
      index.html     ← header + short sample content + footer, as they ship together
      pair.json      ← id, name, skin, header (1 line), footer (1 line), signature_motion, references (2 hosts), dna (1 sentence)
research/  top-100.json  sites-100.json  patterns.md
docs/      RESEARCH-NOTES.md
index.html (repo root)               ← redirects to chrome-lab/
```
- You may write a small generator (`tools/build-pairs.mjs` plus a few modules) so the shared pieces — tokens, logo markup, icon set, JS snippets — exist **once**. The generator emits plain, readable files; it must never emit one giant stylesheet scoped 20 times.
- **Relative paths only** (works from `python3 -m http.server`, from `file://`, and under any sub-path). Zero external requests.

### 7.2 Craft rules (the "example files" standard)
- Each standalone page: `<!DOCTYPE html>`, `<style>` (tokens + only the CSS this markup uses), the header or footer, a tiny `<script>` only if needed (menu toggle, scroll flag, palette…). Files reference no shared stylesheet at runtime so each opens alone.
- **No dead CSS:** every class in the stylesheet is used by that HTML. **No megatemplate.** Write each pair's CSS for its own markup.
- Mobile-first; breakpoints chosen by the design, not by habit. Comments say *why*.
- Budgets: each standalone file ≤ 16 KB including the shared ~4.5 KB base; a pair's own CSS typically 3–7 KB; JS ≤ ~40 lines per half; DOM ≤ 90 nodes (header) / 120 (footer); CLS 0 (reserve height; sticky/fixed chrome must not shift content).
- Standalone pages accept `?theme=dark|light` and `?frame` (hides the sample content so the gallery can show only the chrome).
- Sample content between header and footer uses only the locked copy (§4.4).

### 7.3 Accessibility (WCAG 2.2 AA, both themes)
Skip link first and visible on focus · exactly one `<header role="banner">` and one `<footer role="contentinfo">` per page · landmarks labelled · nav built from real `<ul>/<li>` · current page marked `aria-current="page"` · every disclosure has `aria-expanded` + `aria-controls`; `Esc` closes and returns focus to the trigger; fullscreen overlays, drawers and palettes trap focus · `:focus-visible` ring `2px solid var(--teal)` + 2 px offset (`outline:none` is banned) · contrast ≥ 4.5:1 body / 3:1 large · targets ≥ 24 px, 44 px on mobile chrome · no duplicate IDs inside a page.

### 7.4 Responsive
No horizontal scroll at **360 / 768 / 1024 / 1440 / 1920**; chrome ≤ 88 px tall at ≥ 1024; container capped at the pair's width; text ≥ 13 px at 360; bottom bars honour `env(safe-area-inset-bottom)`; the mobile layout is a *designed* collapse (drawer, dock, overlay, stacked columns) — not "hamburger by default".

### 7.5 Motion
- **One signature moment per pair**, shared in spirit by header and footer; micro-interactions 120–200 ms ease-out; open/close 200–320 ms `cubic-bezier(.2,.8,.2,1)`; entrances ≤ 600 ms with 40–60 ms stagger.
- Animate `transform`, `opacity`, `color`, `background-color`, `border-color`, `clip-path`, `filter` — plus `grid-template-rows` for accordions. Never animate `height/width/top/left/margin` or `backdrop-filter`.
- `@media (prefers-reduced-motion: reduce)`: no marquee, no slide/scale/scroll-linked effects — opacity ≤ 150 ms only.

### 7.6 Build order
Work in four batches of five pairs (P01–P05, P06–P10, P11–P15, P16–P20). For each pair: write its Concept Card and DNA → **header** → **footer from the same DNA** → `index.html` → `pair.json`. Finish and critique a batch before starting the next. Never stub a pair, never write "same as above".

## 8. PHASE 4 — LOOK, CRITIQUE, FIX

Serve the repo (`python3 -m http.server 8123` from the root) and **look at every pair in a browser** at 1440 and 390 px, light and dark (never judge from source alone). Ask as a harsh art director:
1. Does it look like Nestlancer (calm, generous, trustworthy, teal + navy) — or like a generic template with a teal button?
2. **Pair test:** do header and footer read as one design? If not, rebuild the footer from the DNA.
3. **Glance test:** open the gallery with the IDs covered. Can you tell any two pairs apart in under two seconds? If two look alike, change their skin or geometry — not their hue.
4. Is there exactly one signature moment, and is it *seen*?
5. Is the real logo used correctly on every surface, light and dark? Are icons consistent in stroke and size within each pair?
6. Is every label legible at 11–13 px? Does anything wrap badly at 360 px?
7. Are the menus, drawer, overlay and palette operable by keyboard (Tab, Esc, arrows) and do they return focus?
Fix and re-render (max 3 loops per pair); list leftovers honestly.

**Verification checklist (compact — run over all 20 and fix failures):**
- 20 headers + 20 footers, IDs `P01`–`P20` contiguous, each pair passes the pair test.
- Real logo files used; no invented glyph; icons from the one set; no emoji.
- Only §4.3 tokens; no framework, no CDN, no external request; copy only from §4.4.
- No console errors, no 404s, no duplicate IDs, one banner + one contentinfo per page, no horizontal scroll at 360 / 768 / 1440.
- Keyboard + reduced-motion checked; AA contrast in light and dark.
- No dead CSS; file sizes within budget.
If the environment has no browser, say so plainly and run a static check instead — never write "browser-verified" without a browser.

## 9. DELIVERY

- Everything must exist in the **downloadable workspace**, not only in a scratch sandbox. Write straight into the repo tree. Size budget ≈ 128 MB total; the 20 pairs are < 2 MB. Raw research crops, if you keep any, go in `research/raw/` (git-ignored, ≤ 30 MB, `.webp`, quality ≤ 70) — drop them first if space is tight. Forbidden: `node_modules/`, browser caches, full-page screenshots of 100 sites, duplicated repo copies, zip blobs.
- Sync after every batch of five pairs.
- **End-of-turn report (print every time you stop):**
```
## DELIVERY REPORT
Research: top-100 locked YES/NO · sites verified <n>/100 · archetypes H<n>/F<n> · motion primitives <n>
Pairs built: <n>/20  (headers <n>/20 · footers <n>/20 — same IDs)
Skins used: <list> (<n> distinct)     Pair test: <n>/20 pass     Glance test: PASS/FAIL
Logo: real files used YES · invented glyph NONE     Icons: one inline set YES
Browser look (1440/390, light/dark): DONE at localhost:8123 / NO-BROWSER
Files: chrome-lab/index.html · chrome-lab/pairs/P01-…/{header,footer,index}.html … · research/*.json · docs/RESEARCH-NOTES.md
Flagged for review: <IDs + reason, or none>
```

## 10. REFUSAL RULES
- Do not start designing until `top-100.json` is locked and ≥ 100 ranked sites are captured (or honestly listed as skipped with ranked substitutes).
- Do not pad research with random, unranked or obscure URLs, and do not claim a site was studied if it was not opened.
- Do not build more than 20 headers or 20 footers; do not build a header without its matching footer (or the reverse).
- Do not redraw, recolour or replace the Nestlancer logo; do not use emoji or an icon CDN.
- Do not add Bootstrap / Tailwind / any CSS framework, a font CDN, or any external request.
- Do not ship recolours as different designs; do not stub, `TODO`, or "same as above".
- Do not invent copy, clients, prices, certifications or features outside §4.4.
- Do not edit `example-header.html`, `example-footer.html`, the logos, `Nestlancer-public-screenshots/`, or any prompt file.
- Do not claim completion while any item in the §8 checklist is failing.

## 11. START COMMAND — do these in order
1. Read `example-header.html`, `example-footer.html`, both logos and screenshots 013 / 015 / 009 / 006. Print: the tokens you measured, the logo files you will use, and three craft habits you will copy from the examples.
2. **Phase 1:** fetch ≥ 2 live ranking sources → lock `research/top-100.json` → study all 100 sites → write `sites-100.json`, `RESEARCH-NOTES.md`, `patterns.md` → print the Research Gate.
3. **Phase 2:** print 20 Concept Cards (each with its Pair DNA) and the skin/axis spread.
4. Set up `chrome-lab/assets/` (real logos + mark-only cuts) and the shared icon set.
5. **Phase 3:** build P01–P05, then look, critique and fix; continue in batches of five through P20.
6. Build the gallery `chrome-lab/index.html` (20 cards, light/dark switch) and the repo-root redirect.
7. **Phase 4:** serve, look at all 20 at 1440 / 390 in both themes, run the checklist, fix.
8. Print the Delivery Report. If context runs short: finish the current batch, sync everything, and hand off the exact next pair ID — never leave a half-written pair behind.

---

### Operator notes
- **Pair looks mismatched?** *"P12 fails the pair test — rebuild its footer from the pair DNA."*
- **Logo or icons wrong?** *"Use the real logo-full-light/dark.svg and the single icon set — nothing redrawn."*
- **Too busy?** *"Cut P09's CSS back to the example files' style — remove anything the HTML doesn't use."*
- **Swap a concept:** *"Replace P14 with a docs-style breadcrumb header + sitemap footer, same pair rules."*
- **Freeze:** *"P01–P05 are approved — never regenerate them."*
