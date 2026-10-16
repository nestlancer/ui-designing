# Nestlancer Header & Footer Lab — Master Agent Prompt (v3)

> **Why this file exists:** asking an agent for “100 different headers and 100 different footers” produces **100 recolours of one template**. The failure is always the same — URLs get listed as inspiration but never fetched, motion gets described in adjectives instead of numbers, and variants differ only in colour. This prompt makes **live research mandatory and countable** (≥100 real sites captured), forces a **written Reference Contract before any CSS**, defines “different type” as a **measurable multi-axis test**, and ends with **programmatic QA gates** that fail recolours automatically.
>
> **Pipeline:** `header-footer-prompt.md` (this file) → `research/sites.json` (≥100 captured) → `research/pattern-index.json` + `research/motion-index.json` → **100 headers (`H001–H100`) + 100 footers (`F001–F100`)** → gallery + `QA-REPORT.md`.
>
> **Where to run:** [Arena Agent Mode](https://arena.ai/agent) (also works in Cursor / Claude Code). Paste everything below the line.
>
> **v2 (2026-10-16) — the browser-serve fix.** A v1 run shipped files that were “correct on disk” but **rendered wrong in a real browser** when served with `python3 -m http.server`: the locked fonts never loaded (no `<link>` anywhere → Georgia/system-ui fallbacks), the demo page around each chrome was unstyled text flush to the viewport, gallery iframes cropped footers to 240 px, dark theme flashed light first, 13 bottom-bar/sticky-CTA headers carried a dead `[data-chrome]@media` rule and 5 curtain footers a dead body rule — all from a comment glued onto a selector head in the CSS scoper; and on mobile the burger sat next to the wordmark instead of the far right. **v2 adds §0C (Browser-Serve Contract), gate G13, `runtime/demo.css`, real font loading with offline fallbacks, theme-boot before first paint, and mobile-bar normalisation.** §5.6’s “zero external requests” is amended to *no externals beyond the one locked Google Fonts stylesheet*.
>
> **v3 (2026-10-16) — the visual-skin + owned-CSS fix.** A v2 run passed all 13 gates and still looked like **one Nestlancer bar pasted 200 times**: uniqueness was only structural (A1–A6), every `style.css` was a **megatemplate** (≈75 class selectors for ~23 classes in the HTML — drawers, megas, wizards, rails… all dead weight), surface/colour composition never varied inside the locked palette, and agents treated “no Bootstrap / no second hue” as “leave chrome visually blank / shared.” **v3 adds axis A7 (Surface skin), §5.8 CSS Ownership Contract, gate G14, an explicit ban on Bootstrap/Tailwind/framework CDNs with a requirement that each variant ships complete self-owned Nestlancer CSS**, and a gallery “glance test” that fails when two families are indistinguishable at 1440 px.

---

````
# ============================================================
# NESTLANCER HEADER & FOOTER LAB — MASTER AGENT PROMPT (v3)
# Mission: research ≥100 live sites → build 100 unique headers
#          + 100 unique footers for the Nestlancer design language
# Data/design truth: Nestlancer-public-screenshots/public/*.webp
# Runtime: Arena.ai Agent Mode (user workspace = downloadable)
# v2: §0C browser-serve + G13 (must RENDER over python http.server)
# v3: A7 surface skin + §5.8 owned CSS + G14 (must LOOK distinct;
#     no megatemplate CSS; no Bootstrap/Tailwind CDN)
# ============================================================

## 0A) ARENA AGENT MODE — USER WORKSPACE DELIVERY (CRITICAL)

You are running in Arena Agent Mode. The user recovers files from the **session Workspace** (right panel → Download ZIP, or append `/download-workspace` to the chat URL). You also have a bash sandbox — that sandbox is often **isolated**. Work left only there is **GONE** when the turn ends.

### The failure you must not cause
1. Build all 200 variants under `/tmp`, scratch dirs, or a throwaway clone.
2. Print “done — 100 headers + 100 footers shipped ✨” in chat.
3. End the turn with the workspace panel empty or stale.
4. User downloads ZIP → **no variants** → the entire run is wasted.

### Hard rules (non-negotiable)
1. **User Workspace is the source of truth.** Every deliverable must exist in the downloadable workspace tree before you claim completion.
2. **Repo layout.** Work inside the cloned repo at the workspace root:
   - `ui-designing/header-footer-prompt.md` ← this prompt (already present)
   - `ui-designing/Nestlancer-public-screenshots/public/*.webp` ← design truth (17 files, read-only)
   - `ui-designing/chrome-lab/**` ← **everything you create lands here**
   - `ui-designing/research/**` ← capture artifacts
3. **Sync after every batch of 10 variants.** Sandbox scratch is allowed for the capture harness only; every finished variant file must be written straight into the workspace tree.
4. **After every batch and before “done” — print the Workspace Delivery Check** (template at the end of §0A).
5. **Chat-only code dumps do NOT count as delivery.**
6. Never delete or modify files under `Nestlancer-public-screenshots/`.

### Workspace size budget (~128 MB) — chrome files are tiny, research is not
| Item | Budget |
|---|---|
| All 200 variants (`chrome-lab/headers|footers/**`) | **≤ 4 MB total** — each variant is 4 small text files |
| Gallery + runtime + docs | ≤ 1 MB |
| `research/raw/**` (cropped header/footer references) | **≤ 60 MB**, `.webp`, quality ≤ 70, and add to `.gitignore` |
| `research/*.json` (the real deliverable of Phase 1) | ≤ 4 MB |
| **Forbidden** | `node_modules/`, browser caches, full-page screenshots of 140 sites, duplicated repo copies, `.zip` blobs |

If you approach the cap: **keep the JSON research + all 200 variants**, and drop the raw image crops first. A run with 200 variants and no images is a **pass**; a run with 140 full-page screenshots and 31 variants is a **fail**.

### Required end-of-turn block (print every time you stop)
```
## WORKSPACE DELIVERY CHECK
User workspace root: <path>
Synced this turn: YES/NO
Deliverable files (path — size):
- ui-designing/chrome-lab/headers/H001/index.html — 3.1 KB
- ui-designing/chrome-lab/headers/H001/style.css — 2.4 KB
- ...
Counts: headers <n>/100 · footers <n>/100 · families covered <n>/45
Research: sites captured <n>/100 · primitives <n>/30
QA: gates passed <n>/14 · variants flagged <n>
Browser-serve (§0C): VERIFIED at localhost:<port> / NO-BROWSER-IN-SANDBOX (G13 static only)
Visual-skin (§5.0 A7 / G14): FAMILY GLANCE PASS / FAIL · dead-CSS max <n>%
Scratch-only leftovers cleaned: YES/NO
Approx workspace use: <estimate> / 128 MB
Download expectation: chrome-lab/ + research/*.json MUST appear in the Workspace panel / Download ZIP.
```

---

## 0B) RESEARCH GATE — 100 LIVE SITES BEFORE A SINGLE PIXEL (THIS IS THE WHOLE POINT)

The user’s requirement is explicit: **search online for a minimum of 100 live top sites, capture their unique headers and footers and their animations, then build 100 new ones based on our screenshots.**

You may **not** open a CSS file until this gate passes in User Workspace:

| Gate artifact | Required content | Pass condition |
|---|---|---|
| `research/sites.json` | one record per site (§3.4 schema) | **≥ 100** records with `capture_failed: false` |
| `research/raw/<slug>/header.webp` + `footer.webp` | cropped real chrome | ≥ 100 each (or the deliberate substitute list) |
| `research/motion-index.json` | named animation primitives with **measured** duration/easing/trigger | **≥ 30** primitives |
| `research/pattern-index.json` | clustered header + footer archetypes | **≥ 25 header archetypes, ≥ 20 footer archetypes** |
| `docs/RESEARCH-NOTES.md` | 1-line insight + URL per site | ≥ 100 lines |

**Printed at the gate (and re-printed after every batch):**
```
## RESEARCH GATE
Attempted: <n>   Captured: <n>   Skipped (robots/bot-wall/paywall): <n>
Substitutes used (same bucket): <list>
Bucket coverage: A<n> B<n> C<n> D<n> E<n> F<n> G<n> H<n> I<n> J<n> K<n> L<n>
Motion primitives discovered: <n>   Header archetypes: <n>   Footer archetypes: <n>
Gate status: PASS / FAIL
```
If `Captured < 100` → substitute same-bucket sites from §3.1 and re-run capture. Do not proceed on a partial list. Do not invent records.

---

## 0C) BROWSER-SERVE CONTRACT — THE PYTHON-SERVER TEST (RENDER, OR IT DIDN'T HAPPEN)

The user's check is brutally simple and it is **non-negotiable**:

```bash
python3 -m http.server 8123          # run from the repo root
# → http://localhost:8123/                          (redirects to chrome-lab/gallery/)
# → http://localhost:8123/chrome-lab/headers/H001/  (any variant — same rule)
# → http://localhost:8123/chrome-lab/gallery/       (all 200, filterable)
```

Everything visible there must be the **intended UI** — real fonts, styled demo page, whole footer
thumbnails, correct theme, working mobile bar. Files that are “correct” in the repo but broken here
are a **failed run**, exactly like files that never left the sandbox (§0A).

### Hard rules
1. **Serve from the repo root over any static server.** Every page and every asset reference uses
   **relative paths only** (`../../tokens/tokens.css`, never `/chrome-lab/…`), so the lab also works
   when hosted under a sub-path. A repo-root `index.html` redirects to the gallery.
2. **The locked fonts must actually load.** `tokens.css` names Fraunces / Inter / IBM Plex Mono — with
   no `<link>` the browser silently falls back to Georgia/system-ui and the whole design voice is lost.
   Every `index.html` carries this exact head block (the **only** external request allowed in the lab —
   see G7; per-variant `@font-face` is banned as CLS + duplication):
   ```html
   <meta name="color-scheme" content="light dark"/>
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"/>
   <script>(()=>{try{const t=new URLSearchParams(location.search).get('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(_){}})();</script>
   ```
   The inline theme-boot script applies `?theme=` **before first paint** — no light-flash in gallery
   iframes or mounted pages. The token fallback stacks stay, so pages still render offline (graceful
   degradation, not the design target).
3. **The demo page around the chrome is part of the deliverable.** Every variant page links
   `chrome-lab/runtime/demo.css` *after* `chrome.css`. It styles the shell around the chrome — `main`,
   the H1, the mount snippet (`pre` wraps/scrolls, never pushes the page sideways at 360 px), the axis
   chips, the scroll placeholder blocks — and declares `color-scheme`. Mounting a variant into a real
   page loads only tokens + chrome.css + style.css; **viewing** a variant in the lab must look finished
   on its own at every §5.4 width.
4. **The gallery must show the chrome, not crop it.** Header iframe ≈ 264 px, footer iframe ≈ 600 px
   (`.tall`), `loading="lazy"`. The theme switch sets `data-theme` on the gallery’s own `<html>` too, so
   the page follows the theme, not just the iframes.
5. **Mobile chrome is a layout, not a collapse.** At ≤ 900 px the bar stays one flex row
   (`display:flex;flex-wrap:nowrap` — grid A1 variants normalised), and the burger is ordered **after**
   the actions (`order:3`) so it sits far right; fixed bottom bars add their height as body padding via
   `@media (max-width:900px){body:has([data-chrome="<ID>"]){padding-bottom:80px}}`. At ≤ 600 px the bar
   must fit 360 px: the theme toggle yields to space (`display:none`) — wordmark, CTA and burger stay
   reachable; the bar never scrolls horizontally.
6. **Comments never touch selector heads in generated CSS.** A comment preceding an at-rule/selector
   used to be parsed into the selector head, producing dead rules like
   `[data-chrome="H041"]@media (max-width:900px){…}` and `[data-chrome="F081"]body:has(…)`. The scoper
   now strips comments **before** parsing; BASE rules emit as plain comment-free `body:has(…)`
   statements. When writing CSS scopers/generators by hand, keep selectors, comments and at-rules
   separable — then grep the output for `"]@media` and `]body:has` before shipping.
7. **If the run environment has no browser:** say so, run gate **G13** (`node tools/qa.mjs`) as the
   static stand-in, and hand the user the exact serve-and-look steps below. Never print
   “browser-verified” on the strength of static checks.

### Verification recipe (run before claiming “done”)
1. `node tools/generate.mjs && node tools/qa.mjs` → **14/14 gates** (G13 serve + G14 skin / CSS ownership).
2. `python3 -m http.server 8123` from the repo root → open `/` (gallery), any 3–5 variants, both
   themes, at 1440 px and 390 px.
3. Confirm with eyes, not vibes: Fraunces/Inter/Plex Mono actually rendered (not Georgia); demo shell
   styled; footer pages reveal the footer within the first screenful at 1440; gallery footer
   thumbnails whole; network tab shows **no 404s**; console shows **no errors**; no horizontal
   scrollbar; burger at the far right opens the drawer; `Esc` closes it and focus returns;
   **two different families must be distinguishable in under 2 seconds** in the gallery (G14 glance).

---

## 0) FAILURE MODES YOU MUST NOT REPEAT

| # | Failure | Why it happens | Fix in this prompt |
|---|---|---|---|
| 1 | Agent lists 100 URLs, fetches none | “inspiration” treated as optional reading | §0B hard gate on `sites.json` |
| 2 | 100 “variants” that are the same header in 100 hues | agent varies **raw hex** (1 axis) instead of **type** | §5.0 multi-axis uniqueness (A1–A7) + QA gate **G1** — note: composing locked tokens into different *skins* is required (A7), inventing new brand hues is still banned |
| 3 | 30 variants built, 70 stubbed as “same as above” | context exhaustion unmanaged | §7 batching: 10 at a time, family order, never stub |
| 4 | Motion = a paragraph of adjectives | no measurement instrument | §3.5 `getAnimations()` probe captures real ms/easing |
| 5 | Brand drift — purple gradients, second accent, Inter-only voice | reference sites’ identity leaks in | §4 KEEP list + QA gate **G3** |
| 6 | Deliverables exist only in the sandbox | isolated scratch tree | §0A sync gate + manifest |
| 7 | Invented copy — fake clients, fake ₹ amounts, fake features | model fills gaps | §2.4 locked copy bank + gate **G8** |
| 8 | Accessibility skipped (no focus ring, animations ignore reduced-motion) | a11y treated as polish | §5.3 + gates **G5/G6** |
| 9 | Header breaks the page it drops into (CLS, overlap, z-index wars) | chrome built as a demo, not an integration | §5.6 budgets + gate **G7** |
| 10 | Footer is an afterthought: one row, © only, 90 of them identical | effort spent on headers | 20 footer families with equal craft bar (§6.2) |
| 11 | Files “correct” on disk but raw/broken in the browser: fallback fonts, unstyled demo page, cropped gallery iframes, light-flash on dark theme, dead CSS rules, burger stranded mid-bar | repo never actually **served + looked at**; QA gates static-only; CSS scoper glued a comment onto a selector | §0C browser-serve contract + gate **G13** + `runtime/demo.css` + real font loading + comment-safe scoping |
| 12 | **Structure-unique but visually identical** — 200 variants pass the 6-axis test, yet every header is the same white bar + teal pill + hairline; footers share one surface recipe | uniqueness defined only as A1–A6; KEEP list misread as “never compose surfaces”; generators dump one megatemplate `style.css` onto every ID | **axis A7 Surface skin** + §5.8 CSS Ownership + gate **G14** glance test |
| 13 | **Megatemplate CSS** — each `style.css` ships rules for mega/drawer/wizard/rail/overlay/… even when that HTML is absent (~70% dead selectors); variants look “unstyled / generic framework leftovers” | one shared CSS blob + `scopeCss(id)` instead of per-variant owned stylesheets | §5.8: emit **only** selectors for classes present in that variant’s HTML; dead-selector budget ≤ 15% |
| 14 | **Missing chrome design mistaken for “no Bootstrap”** — agent ships bare markup + token variables, or reaches for Bootstrap/Tailwind CDN | confusion between “no third-party CSS framework” and “no CSS design” | §5.8 + G7: **custom Nestlancer CSS only**; Bootstrap / Tailwind / Bulma / Foundation / UIKit CDNs and utility-class frameworks are **banned**; each variant must still look finished and designed |

### Non-negotiables
- You MAY NOT write variant CSS before **§0B Research Gate** passes.
- You MAY NOT generate a family before printing a **Reference Contract** (§3.7, ≥5 rows).
- **100 headers + 100 footers, each a distinct type** — not 100 + 100 recolours **and not 100 + 100 structure-clones of one skin**.
- Every variant cites ≥2 captured sites + ≥1 measured motion primitive.
- No copied logos, images, or proprietary copy from any researched site.
- You MAY NOT mark complete until **§0A Workspace Delivery Check** passes.
- You MAY NOT claim a variant is finished until it has been **served and looked at** (§0C): `python3 -m http.server` from the repo root, opened at 1440 px and 390 px in both themes — or, in a browser-less sandbox, gate **G13** passes and the limitation is printed.
- You MAY NOT ship a variant whose `style.css` is a scoped copy of a shared megatemplate, or whose family is visually indistinguishable from another family at gallery glance (G14).
- You MAY NOT add Bootstrap, Tailwind, Bulma, Foundation, or any other CSS-framework CDN / utility runtime. Nestlancer tokens + owned per-variant CSS is the design system.

---

## 1) ROLE & QUALITY BAR

You are simultaneously:
1. **Principal product designer** — knows that chrome (header/footer) is 80% of a site’s perceived quality.
2. **Senior frontend engineer** — semantic HTML, modern CSS (`:has()`, container queries, `color-mix`, view timelines), < 12 KB JS per variant.
3. **Motion designer** — choreography with real numbers: durations, easings, staggers, triggers.
4. **Research analyst** — reads 100 sites as *data*, extracts patterns, discards styling.
5. **Design director who rejects AI-slop** — no ribbon banners, no emoji icons, no gradient soup.

### Grade scale for THIS job (chrome craft)
| Grade | Meaning |
|---|---|
| F–D | Broken, overlapping, unstyled, inaccessible — or Bootstrap/Tailwind CDN dropped in |
| C | Works, looks like a default template with a teal button — **the state we are escaping** |
| C+ | Axis-unique on paper, but gallery glance shows the **same white bar / same footer surface** on every card (v2 failure) |
| B | Clean and consistent, but forgettable; could belong to any SaaS |
| A | Production-ready Nestlancer chrome — calm, branded, responsive, intentional motion, **own surface skin**, CSS owns only what the HTML needs |
| A+ | Same, plus a signature motion that a senior designer would screenshot; family is recognisable in the gallery without reading the ID |
| **A+** | Memorable craft: reference-informed structure, confident hierarchy, signature micro-interaction, still restrained and trustworthy |

**Ship standard = A+ on every one of the 200.** A gallery where 20 variants are A+ and 180 are B is a **failed run**.

---

## 2) REPO FACTS (DO NOT INVENT STRUCTURE)

Repo to work in: `https://github.com/nestlancer/ui-designing.git` (clone it; it contains only screenshots + this prompt).

### 2.1 Design truth — 17 screenshots, 2880 px wide (= 1440 CSS px @2×)

| File | Screen | Chrome relevance |
|---|---|---|
| `013-marketing-homepage.webp` | Marketing home | **canonical header + canonical footer** + domain ticker row + pre-footer CTA |
| `014-marketing-about.webp` | About | header + footer repeat |
| `015-marketing-contact.webp` | Contact | header + **short footer** variant |
| `016-marketing-pricing.webp` | Pricing | header + footer + plan-comparison density |
| `017-marketing-services.webp` | Services | header + footer |
| `002-blog-listing.webp` | Blog listing | header + **sidebar rail** (not chrome, but informs layout) + footer |
| `003-blog-article.webp` | Blog article | header + long-read (progress bar opportunity) + footer |
| `007-portfolio-listing.webp` | Portfolio | header + footer |
| `008-portfolio-case-study.webp` | Case study | header + footer |
| `004-contact.webp` | Contact (form) | header + footer |
| `009-privacy.webp` | Privacy | header + **legal-dense footer** |
| `011-terms.webp` | Terms | header + legal footer |
| `006-login.webp` | Login | **auth chrome**: logo-only header, one icon button |
| `010-register.webp` | Register | auth chrome |
| `005-forgot-password.webp` | Forgot password | auth chrome |
| `012-verify-document.webp` | Verify document | auth chrome |
| `001-admin-login.webp` | Admin login | **admin chrome** (separate identity from public) |

### 2.2 Measured tokens — pixel-sampled from the screenshots. LOCKED. Every one of the 200 uses these.

```css
:root{
  --n-bg:#f9fbfc;            /* page canvas (dominant) */
  --n-bg-tint-1:#edf4f6; --n-bg-tint-2:#ebf3f5;
  --n-mesh-1:#d8e8e9; --n-mesh-2:#daeaeb;   /* hero wash */
  --n-surface:#ffffff; --n-surface-2:#f4f8f9;

  --n-ink:#0a2543;           /* navy: logo, H1/H2, wordmark */
  --n-ink-2:#123a5e; --n-body:#4a5c6e; --n-muted:#7b8b99;
  --n-hairline:#e3ebe9;

  --n-teal:#24877f;          /* measured from the "Start a project" pill */
  --n-teal-hover:#1c6f68; --n-teal-soft:#d9ece9;
  --n-teal-glow:#3fb8ab; --n-mint:#eef7f5;
  --n-live:#22a06b;          /* "Intake open" / "Client portal · live" dot */

  --n-font-display:"Fraunces","Instrument Serif",Georgia,serif;
  --n-font-sans:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --n-font-mono:"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace;

  --n-eyebrow: 11px/1 uppercase; letter-spacing:.14em;  /* FIG · WORK, PRODUCT, COMPANY, LEGAL */
  --n-radius-pill:999px; --n-radius-card:14px; --n-radius-chip:8px;
  --n-container:1200px; --n-header-h:72px; --n-hairline-w:1px;
}
```
**Dark theme is derived, never invented:** surfaces `#0b1720` / `#0f1e29`, body text `#b9c6d0`, hairlines 8% white, `--n-teal` stays as the accent. Never a second brand hue.

**Locked tokens ≠ one visual skin.** The palette above is the *paint box*, not a single composition. Every family must still pick a distinct **surface skin** (axis A7, §5.0) by *composing* these tokens differently — solid canvas, glass, ink invert band, mint/tint wash, mesh zone, elevated soft-shadow, hairline-only editorial, dual-surface (utility ink + main surface), etc. Inventing `#7c3aed` or a Bootstrap primary blue is forbidden; refusing to design with `--n-*` is also forbidden.

**No third-party CSS frameworks.** Do not link or vendor Bootstrap, Tailwind, Bulma, Foundation, UIKit, Materialize, Animate.css as a runtime, or any utility-class CDN. Inspiration from those sites’ *patterns* is fine (already in §3); the implementation is always custom CSS scoped to `[data-chrome="<ID>"]` using §2.2 tokens. “No Bootstrap” never means “no CSS.”

**Fonts are locked AND must load.** The three families above are the design voice. The browser-serve contract (§0C rule 2) wires the one sanctioned Google Fonts `<link>` into every page; the fallback stacks in this token block keep pages usable offline — they are a safety net, not the design. No fourth family, ever, and no per-variant `@font-face` (G7/G13 enforce).

### 2.3 Baseline structures (H001 / F001 — the repo as it exists)

```
HEADER (public, 72px, container 1200px, 1px bottom hairline)
[ bird glyph + "Nestlancer" wordmark + teal full-stop ]  [ Product · Portfolio · Blog · About ·
  Pricing · Services · Contact ]  [ ☀ theme toggle ] [ Sign in ] [ (Start a project) teal pill ]

FOOTER (public)
[ glyph+wordmark            ] [ PRODUCT      ] [ COMPANY   ] [ LEGAL            ]
[ 2-line blurb, --n-body    ] [ Project Hub  ] [ About     ] [ Terms            ]
[                           ] [ Pricing      ] [ Blog      ] [ Privacy          ]
[                           ] [ Services     ] [ Contact   ] [ Verify document  ]
[                           ] [ Portfolio    ] [ Start a…  ] [                  ]
──────────────────────── 1px hairline ────────────────────────
© 2026 Nestlancer. Made in India. All rights reserved.
```
Auth screens use a **logo-only** header (top-left) + one circular outline icon button (top-right). Admin login has its own identity — treat it as a separate chrome theme.

### 2.4 Locked copy bank — reuse these strings; do not invent product features

- **Wordmark:** `Nestlancer` (navy) + teal full-stop
- **Blurb:** `Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.`
- **Nav:** Product · Portfolio · Blog · About · Pricing · Services · Contact
- **Actions:** `Sign in` · `Start a project` · theme toggle · search · `Intake open`
- **Footer links:** Product — Project Hub, Pricing, Services, Portfolio · Company — About, Blog, Contact, Start a project · Legal — Terms, Privacy, Verify document
- **Eyebrows in-repo:** `FIG · WORK`, `FIG · PORTAL`, `FIG · START`, `PRODUCT`, `COMPANY`, `LEGAL`
- **Status pills:** `Intake open` · `Client portal · live` · `FIG · PORTAL`
- **Proof numbers (real):** `₹4,28,500` payments · `₹4.2L` milestone · `Payouts cleared 1/3`
- **Ticker domains:** FINTECH · E-COMMERCE · SaaS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES · HEALTHCARE
- **Portfolio titles:** FintelPayments Hub · SaaS Analytics Platform · E-Commerce Mobile App · HealthTech
- **Legal line:** `© 2026 Nestlancer. Made in India. All rights reserved.`
- **Locale:** INR primary (`₹`, en-IN grouping `4,28,500`), USD secondary

### 2.5 Discoverable routes
`/` `/product` `/portfolio` `/blog` `/about` `/pricing` `/services` `/contact` `/login` `/register` `/terms` `/privacy` `/verify` `/portal` `/admin`

### 2.6 Scope boundary
You are **not** redesigning pages. You are building **200 drop-in chrome systems** that mount into any of them. Ship them with a mount API so integration is one line:
```html
<header data-chrome="H034" data-theme="dark" data-page="pricing"></header>
```

---

## 3) PHASE R — REFERENCE GATE (MANDATORY BEFORE ANY DESIGN EDIT)

### 3.1 The 140 seeds — capture ≥100 live sites

Twelve buckets exist to guarantee **range**: a fintech footer and a studio footer are different species. Crawl every bucket; the hard floor is **100 successfully captured**.

| Bucket | Count | Sites |
|---|---|---|
| **A · Marketplaces & freelance** | 14 | upwork.com · fiverr.com · toptal.com · contra.com · 99designs.com · dribbble.com · behance.net · freelancer.com · peopleperhour.com · guru.com · arc.dev · weworkremotely.com · remoteok.com · wellfound.com |
| **B · Big tech / platform nav** | 12 | apple.com · store.google.com · microsoft.com · aws.amazon.com · meta.com · stripe.com · shopify.com · github.com · atlassian.com · adobe.com · ibm.com · nvidia.com |
| **C · Dev tools & infra** | 12 | vercel.com · linear.app · raycast.com · supabase.com · neon.tech · resend.com · clerk.com · railway.app · fly.io · postman.com · jetbrains.com · hashicorp.com |
| **D · Fintech & payments** | 12 | razorpay.com · wise.com · revolut.com · monzo.com · mercury.com · brex.com · ramp.com · plaid.com · squareup.com · paypal.com · cash.app · stripe.com/payments |
| **E · SaaS product marketing** | 14 | notion.so · figma.com · slack.com · zoom.us · asana.com · monday.com · clickup.com · airtable.com · miro.com · canva.com · hubspot.com · salesforce.com · intercom.com · zendesk.com |
| **F · Editorial & media** | 10 | nytimes.com · theguardian.com · bbc.com · washingtonpost.com · theverge.com · wired.com · medium.com · substack.com · bloomberg.com · economist.com |
| **G · Design galleries & studios** | 16 | awwwards.com · thefwa.com · godly.website · land-book.com · siteinspire.com · minimal.gallery · refero.design · mobbin.com · pentagram.com · instrument.com · ustwo.com · fantasy.co · ramotion.com · basicagency.com · huge.com · lusion.co |
| **H · E-commerce & retail** | 12 | nike.com · adidas.com · zara.com · uniqlo.com · allbirds.com · gymshark.com · glossier.com · aesop.com · ikea.com · wayfair.com · etsy.com · warbyparker.com |
| **I · Travel & mobility** | 8 | airbnb.com · booking.com · expedia.com · marriott.com · kayak.com · uber.com · lyft.com · tripadvisor.com |
| **J · AI labs & products** | 12 | openai.com · anthropic.com · perplexity.ai · huggingface.co · midjourney.com · runwayml.com · elevenlabs.io · suno.com · cursor.com · lovable.dev · v0.dev · character.ai |
| **K · Motion / WebGL showcases** | 8 | active-theory.com · basement.studio · obys.agency · dennissnellenberg.com · cuberto.com · akqa.com · resn.co.nz · 14islands.com |
| **L · India-origin products** | 10 | zerodha.com · cred.club · groww.in · phonepe.com · paytm.com · zomato.com · swiggy.com · flipkart.com · myntra.com · practo.com |

**Skip and substitute:** bot-walls (Apple, Amazon, Bloomberg), geo-blocks, `robots.txt` disallow. Log every skip in `sites.json` with `capture_failed: true` + `reason`, and add a same-bucket replacement so `captured ≥ 100`.

### 3.2 Recipe libraries — where the **animation** vocabulary comes from

Live sites show you *what*; these show you *how*. Fetch and study them in Phase R exactly like the product sites.

| Category | Sites | Steal for (chrome-specific) |
|---|---|---|
| **Code & snippets** | codepen.io · codemyui.com · uiverse.io · bootsnipp.com | nav underline glides, button shine/press, burger morphs, accordion footers, newsletter forms |
| **CSS animation libs** | animate.style · animista.net · hover.css · michalsnik.github.io/aos · minimamente.com/project/magic · keyframes.app | entrance vocab (adapt, never dump whole libs), hover recipes, custom keyframe curves |
| **JS motion engines** | gsap.com (ScrollTrigger) · motion.dev (motion one) · framer.com/motion · lenis.darkroom.engineering (smooth scroll) · scrollrevealjs.org | sticky shrink timelines, scroll-linked progress, curtain footers, magnetic CTA |
| **Modern UI blocks** | magicui.design · ui.aceternity.com · ui.shadcn.com · ui-layout.com · tailwindui.com | marquee, shimmer CTA, spotlight, mega-menu panels, command palette, announcement bars |
| **Header-specific sources** | header.design (when reachable) · tailscan UI blocks · flowbite.com blocks · preline.co · mambaui.com · daisyui.com | nav paradigms, drawer/overlay nav, multi-tier bars, responsive collapse patterns |
| **Surface & colour** | cssgradient.io · glassmorphism.com · neumorphism.io · oklch.com | glass engage recipes, mesh atmosphere, soft inset inputs (subtle only) |

### 3.3 Required tool actions (do them for real, per batch)

1. **Capture-run** the harness (§3.4) over unfinished buckets.
2. **WebSearch ≥6 targeted queries**, e.g.
   - `site:uiverse.io glass nav bar hover animation`
   - `sticky header shrink on scroll CSS 2025`
   - `mega menu animation stagger cubic-bezier example`
   - `footer accordion mobile grid-template-rows animation`
   - `curl footer reveal scroll-linked CSS animation-timeline`
   - `command palette ⌘K header pattern implementation`
3. **WebFetch ≥5 live pages** from §3.1 and §3.2 (docs/examples, not just homepages). Listing a URL without fetching does **not** count.
4. **Open ≥2 repo screenshots** for the batch you are about to build, at full size, and note the rhythm: gutters, pill radius, hairline weight, eyebrow spacing.
5. If a site cannot be fetched: say so, fall back to WebSearch snippets + the known pattern, and **still name the exact pattern borrowed and the source**.

### 3.4 Capture harness — `tools/capture.mjs`

For each URL: viewport `1440×900`, `deviceScaleFactor 1`, `locale en-IN`, realistic UA, max 2 concurrent pages, ≥1.5 s between same-host requests, honour `Retry-After`.

1. `goto(url, { waitUntil:'networkidle', timeout:45000 })`
2. **Scroll to trigger reveals** — `document.body.scrollHeight` in 8 steps of ~900 px with 450 ms pauses, back to `0` in 4 steps, wait 600 ms.
3. **Grab the chrome subtrees** — header: first match of `header`, `[role=banner]`, `nav`, else topmost `position:fixed|sticky` node ≤ 25 vh. Footer: `footer`, `[role=contentinfo]`, else bottom-most node > 15 vh with ≥2 `<a>` clusters.
4. **Computed styles** on the root + descendants (depth ≤ 6, nodes ≤ 400): `display, position, height, width, gap, padding, background*, color, border*, border-radius, box-shadow, font-family/size/weight/letter-spacing/text-transform, backdrop-filter, z-index, transition, transform`.
5. **Crop** `research/raw/<slug>/header.webp` (0 → headerBottom + 60 px) and `footer.webp` (footerTop − 60 → end) from a full-page shot; delete the full-page shot.
6. **Motion pass** (§3.5).
7. **Write** `research/raw/<slug>/meta.json`.

```js
import { chromium } from 'playwright';
const ctx = await chromium.launch().then(b => b.newContext({
  viewport:{width:1440,height:900}, locale:'en-IN', deviceScaleFactor:1 }));
async function capture(url){
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil:'networkidle', timeout:45000 });
  await autoScroll(page);                                    // step 2
  const header = await page.evaluate(describeChrome, 'header');
  const footer = await page.evaluate(describeChrome, 'footer');
  const motion = await page.evaluate(collectMotion);         // §3.5
  await page.screenshot({ path:`tmp/${slug(url)}.webp`, fullPage:true });
  await cropChrome(slug(url), header?.box, footer?.box);      // step 5
  await page.close();
  return { url, header, footer, motion };
}
```

**Legality & politeness:** public chrome only. No logins, no dashboards, no paywalls, no form submissions, no API keys. Store **derived metrics** (numbers, booleans, enum strings) as the primary artifact; the cropped `.webp` references stay in a git-ignored folder and are cited to their source URL in `meta.json`.

### 3.5 Motion extraction — capture physics, not vibes

```js
function collectMotion(){
  const anims = document.getAnimations().map(a => ({
    target: (a.effect?.target?.tagName||'') + '.' + String(a.effect?.target?.className||'').slice(0,60),
    name: a.animationName || a.constructor.name,
    duration: a.effect?.getTiming?.().duration,
    delay: a.effect?.getTiming?.().delay,
    easing: a.effect?.getTiming?.().easing,
    iterations: a.effect?.getTiming?.().iterations,
    fill: a.effect?.getTiming?.().fill,
    keyframes: (a.effect?.getKeyframes?.() || []).slice(0,3).map(f =>
      ({ offset:f.offset, transform:f.transform, opacity:f.opacity, filter:f.filter })),
    playState: a.playState
  }));
  const h = document.querySelector('header,[role=banner]');
  const f = document.querySelector('footer,[role=contentinfo]');
  return {
    animations: anims,
    headerTransition: h ? getComputedStyle(h).transition : null,
    headerWillChange: h ? getComputedStyle(h).willChange : null,
    footerTransition: f ? getComputedStyle(f).transition : null
  };
}
```
**Plus a scroll-timeline probe:** sample `getBoundingClientRect()` + class/inline-style of header and footer every 100 ms across a scripted 0 → 100% → 0 scroll and diff it. This is how you detect **hide-on-scroll-down / show-on-scroll-up**, **glass engage thresholds** (`blur kicks in at scrollY > 24`), **sticky-shrink triggers**, and **footer curtain reveals**. Record the trigger as a px threshold, not a guess.

Normalise everything into `research/motion-index.json` — one entry per primitive: `id, name, trigger, duration_ms, delay_ms, easing, properties_animated, seen_on_sites[…], recipe_css|recipe_js`.

### 3.6 Primitive catalogue — discover ≥30 (these 34 are the floor, add what you find)

| id | Primitive | Trigger | Physics to look for |
|---|---|---|---|
| m-01 | Sticky shrink (height + logo scale) | scroll > 24px | 200 ms `cubic-bezier(.2,.8,.2,1)` |
| m-02 | Hide-down / show-up | scroll direction | 320 ms ease-out, `translateY(-100%)` |
| m-03 | Glass engage (blur + alpha) | scroll > 8px | 240 ms linear, blur 0→14px |
| m-04 | Transparent-over-hero → solid | hero exit | 300 ms + colour crossfade |
| m-05 | Sliding nav underline / ink bar | hover · focus · route | 220 ms shared-element transform |
| m-06 | Magnetic CTA (±6 px pointer follow) | pointer move | spring, stiffness 200 / damping 18 |
| m-07 | Mega-panel reveal + child stagger | hover-intent / click | 260 ms, 35 ms stagger |
| m-08 | Fullscreen overlay wipe | burger click | 480 ms `cubic-bezier(.76,0,.24,1)`, clip-path |
| m-09 | Side drawer + scrim | burger click | 300 ms ease-out, scrim 200 ms |
| m-10 | Burger → X morph | toggle | 240 ms, two bars rotate 45° |
| m-11 | Command palette (⌘K) | keypress/click | 180 ms scale .98→1 + blur-in |
| m-12 | Theme cross-fade (light↔dark) | toggle | 300 ms, `color-scheme` + View Transitions |
| m-13 | Scroll progress bar | scroll | scroll-linked, no easing |
| m-14 | Reading-progress ring / % in header | scroll | scroll-linked |
| m-15 | Category rail, active pill morphs | intersection | 240 ms spring |
| m-16 | Ticker / marquee nav | infinite | linear 28 s, `translateX(-50%)`, pause on hover |
| m-17 | Announcement bar dismiss (+ `localStorage`) | click | 220 ms collapse |
| m-18 | Rotating CTA / status word | interval 4 s | 400 ms fade-slide |
| m-19 | Footer reveal with column stagger | IO @15% | 600 ms, 60 ms stagger |
| m-20 | Footer curtain (content reveals it) | scroll to end | `position:sticky` / clip-path |
| m-21 | Oversized wordmark scale-on-scroll | scroll-linked | `scale .9→1.15` scrub |
| m-22 | Accordion footer columns | mobile toggle | 260 ms `grid-template-rows` |
| m-23 | Back-to-top orbit button | appear after 60 vh | 200 ms spring + icon rotate |
| m-24 | Locale / currency switcher slide | click | 180 ms listbox |
| m-25 | Live status dot pulse | infinite | 2 s ease-in-out opacity+scale |
| m-26 | Proof-stat count-up | in view | 1200 ms easeOutExpo |
| m-27 | Social icon stagger pop | footer enter | 40 ms stagger, scale .8→1 |
| m-28 | Link hover text roll-up (dual layer) | hover | 260 ms translateY swap |
| m-29 | Cursor spotlight in header | pointer move | rAF radial-gradient mask |
| m-30 | View-Transition page wipe on nav | route change | 420 ms clip-path diagonal |
| m-31 | Grain / noise drift | infinite | 8 s steps, background-position |
| m-32 | Scroll-linked nav parallax | scroll | scrub ±12 px |
| m-33 | Notification badge pop | data / interval | 300 ms elastic |
| m-34 | Email capture → success morph (button→tick) | submit | 380 ms micro-pop |

### 3.7 Reference Contract — print BEFORE writing CSS for a family batch (hard gate: ≥5 rows)

```
## Chrome Reference Contract — [batch id] [families in this batch]
Date/context: ...
Live sites captured for this batch: ... (from research/sites.json)
Repo screenshots re-opened: ... (paths)

| Variant slot | Source site (captured) | Exact chrome pattern | Traits to copy | Traits to NOT copy | How adapted to Nestlancer tokens |
|---|---|---|---|---|---|
| H017 container | linear.app | detached glass pill, inset 16px, 60px tall | blur 14px, hairline, tight type | dark-first palette, purple accent | light default, --n-teal CTA, --n-ink logo |
| H018 scroll | cuberto.com | hide-down / show-up w/ shadow bloom | direction detection, 320ms | 3D distortion | hairline + soft shadow only |
| H019 CTA | magicui.design | shimmer sweep on primary once | 1.4s sweep, pause 3s | neon border | teal pill, --n-teal-glow sweep |
| H020 mobile | upwork.com | category chips collapse into drawer | chip scroll-snap | logo redesign | repo wordmark untouched |
| F041 columns | stripe.com | 5-column sitemap + status dot | eyebrow mono, dot pulse | dense legal wall | Nestlancer sitemap only |

Motion palette for this batch:
- Enter: ... ms · easing · stagger
- Hover: ... ms
- Signature (ONE per family): m-XX
- Reduced motion: opacity-only 150ms, all transforms off

A+ definition for this batch (3 bullets):
1. ...
2. ...
3. ...

Axes claimed (must differ ≥3 from every prior variant, including A7): container / paradigm / scroll / motion / disclosure / CTA / **surface skin**
A7 skin for this family: <skin id> — <one-line composition note>
```

**Hard gate:** fewer than 5 rows → you may not open a CSS file. Missing A7 skin id → you may not open a CSS file.

---

## 4) KEEP vs CHANGE

### KEEP (sacred)
- Every token in §2.2 — teal `#24877f`, navy `#0a2543`, canvas `#f9fbfc`, hairlines, pill radius, eyebrow style *(the paint box — not a single forced composition)*
- The wordmark treatment (bird glyph + navy `Nestlancer` + teal full-stop) — recreate as inline SVG; never import the real logo file into new variants, never trace a competitor’s mark
- All copy strings in §2.4; INR formatting; the legal line
- Routes in §2.5
- The calm, generous, trustworthy rhythm of the repo at 1440 px
- Not one file under `Nestlancer-public-screenshots/` may be edited
- Custom Nestlancer CSS only — no Bootstrap / Tailwind / other framework CDN

### CHANGE (required — that is the job)
- Structure: container geometry, nav paradigm, disclosure model, CTA arrangement
- **Surface skin (A7):** how those tokens are composed — solid / glass / ink band / tint / mesh / elevated / editorial / dual / invert / pill-float
- Rhythm: vertical density, gutters, type scale, eyebrow placement
- Motion: real choreography with measured timings, one signature per variant
- Mobile: a deliberate collapse strategy per variant, not “hamburger by default”
- Theme: light **and** dark for all 200
- States: hover · focus-visible · active · open · closed · scrolled · disabled · loading (newsletter) · empty (search) · error
- **CSS ownership:** each variant’s stylesheet matches its DOM (no megatemplate leftovers)

### Forbidden (anti-slop)
- Purple/indigo neon themes · gradient soup · glass over dense text · 3D flourishes
- Emoji as icons · more than one brand hue · a second typeface family beyond the §2.2 trio
- Ribbon/triangle announcement banners · autoplaying video in chrome · carousels in the header
- Copying a real logo, icon set, illustration or marketing sentence from a researched site
- 100 variants that differ only in raw hex, font weight, or link order (**uniqueness gate will catch this**)
- 100 variants that differ on axes but share one white-bar skin (**G14 will catch this**)
- Megatemplate `style.css` scoped per ID · Bootstrap/Tailwind/Bulma CDN · “unstyled chrome, tokens will handle it”
- Declaring done with 40 variants and “the rest follow the same pattern”

---

## 5) CHROME DESIGN SYSTEM CONTRACT

### 5.0 THE UNIQUENESS MANDATE — how “different type” is measured

Two variants are different types **only if they differ on ≥ 3 of these 7 axes**, and **at least one of those three must be A1, A2, A3, or A7** (structure or skin — never “motion + disclosure + CTA” alone while the bar still looks identical):

| Axis | Options |
|---|---|
| **A1 Container geometry** | full-bleed · 1200 contained · floating pill inset 16 · split 50/50 · asymmetric 8/4 · docked edge rail |
| **A2 Nav paradigm** | inline · dropdown · mega-panel · fullscreen overlay · drawer · bottom tab bar · segmented · breadcrumb row · search-first · command palette |
| **A3 Scroll behaviour** | static · sticky · sticky-shrink · auto-hide · transparent→solid · progress-linked · pinned-then-release |
| **A4 Motion primitive** | any `m-XX` from §3.6 — never the same id twice inside one family |
| **A5 Disclosure** | hover · click · keyboard-first · hover-intent 120 ms · always-visible · accordion |
| **A6 CTA treatment** | teal pill · outline pill · split-arrow pill · ghost text · dual equal CTA · gradient edge · icon-only · sticky mobile bar |
| **A7 Surface skin** *(required — this is the visual design axis)* | see recipe table below |

#### A7 Surface skin recipes (compose §2.2 tokens only — no new hues)

Every **family** locks one primary A7 skin; the 4 (header) / 5 (footer) variants inside a family may shift density or invert for dark, but must stay recognisable as that skin. Neighbouring families **must not** share the same A7 value.

| Skin id | What the chrome looks like (all colours from §2.2) |
|---|---|
| `solid-canvas` | `--n-surface` bar/footer, 1px `--n-hairline`, flat — the repo baseline |
| `glass-hairline` | `color-mix` translucent surface + `backdrop-filter` blur 12–16px + hairline + soft shadow (with `@supports` opaque fallback) |
| `ink-band` | `--n-ink` (or dark `#0b1720`) utility / announce / footer band with light text; main row may stay surface |
| `tint-wash` | `--n-bg-tint-1` / `--n-mint` wash behind bar or footer columns; teal soft accents on chips |
| `mesh-zone` | `--n-mesh-1` → `--n-mesh-2` gradient panel (footer CTA / hero-adjacent header only) |
| `elevated-soft` | solid surface + `box-shadow: 0 8px 28px rgba(10,37,67,.10)` (or dark equivalent), no heavy border |
| `editorial-rules` | transparent / canvas bg, typographic weight, hairline rules only — no filled CTA slab behind the bar |
| `dual-surface` | two stacked surfaces with different fills (e.g. ink utility 30px + surface main 72px, or surface columns + tint legal bar) |
| `invert-chrome` | whole chrome forced to dark-token surfaces even on light pages (footer “dark inverted” family; rare for headers) |
| `pill-float` | chrome itself is the floating rounded container (`--n-radius-pill` / card radius), inset from viewport, glass or solid |

**Gallery glance test (human + G14):** open the gallery at 1440 px. Cover the IDs. If you cannot tell family X from family Y in under 2 seconds, one of them must change A7 (or its structural signature), not just A4/A5.

Every variant’s `meta.json` must record all **seven** axis values (including `A7_surface_skin`), and its `diff_from_prev` field must state the three axes it changes. QA gate **G1** recomputes pairwise distance across all 200; gate **G14** enforces A7 coverage + CSS ownership.

### 5.1 Surfaces (chrome rule)
- Every variant **declares and implements** its A7 skin in `style.css` — background, border/hairline, elevation, and any band/wash must be real CSS properties, not comments in `meta.json`.
- Chrome may use **restrained glass** when A7 is `glass-hairline` or `pill-float`: `backdrop-filter: blur(12–16px) saturate(150%)` + hairline + soft shadow, always with `-webkit-` prefix and an `@supports` opaque fallback.
- **Never animate `backdrop-filter` on scroll.** Toggle it with a class at a measured threshold (m-03).
- Footers sit on a designed surface (solid, tint, mesh, invert, dual) — not an unstyled transparent block. Footer text must stay crisp at 12px.
- Page canvas behind chrome: `--n-bg` with the mesh wash only when A7 is `mesh-zone` or the family is hero-adjacent.
- **Contrast stays AA** after skin changes: ink-band / invert-chrome must use the dark-theme text tokens (or `#fff` / `#e8eef4`) on ink surfaces; never navy text on ink.

### 5.2 Typography in chrome
- Wordmark: display serif (Fraunces / Instrument Serif) or the wordmark SVG — never a third family.
- Nav links: sans, ≥14 px, weight 500, `--n-body` → `--n-ink` on hover/active.
- Eyebrows (footer column heads, section labels): mono, 11 px, uppercase, `letter-spacing .14em`, `--n-muted`.
- Numbers (₹ amounts, counts): `font-variant-numeric: tabular-nums`.
- Nothing below 11 px. Body ≥ 14 px.
- Serving the fonts is part of typography: Fraunces/Inter/Plex Mono must arrive via the one sanctioned link (§0C rule 2). If the screenshot in the browser shows Georgia, the variant is not done.

### 5.3 Accessibility contract — WCAG 2.2 AA, per variant, both themes
- Skip link first in DOM, visible on focus.
- Exactly one `<header role="banner">` and one `<footer role="contentinfo">`.
- Every disclosure: `aria-expanded` + `aria-controls`; `Escape` closes and returns focus to the trigger; focus trap inside fullscreen nav/drawer/palette.
- `:focus-visible` ring = `2px solid var(--n-teal)` + 2px offset. `outline:none` is banned.
- Contrast ≥ 4.5:1 body / 3:1 large — verified in light **and** dark.
- Targets ≥ 24×24 px (2.2 AA); 44 px preferred, mandatory on mobile chrome.
- Landmarks labelled; nav lists are real `<ul>`/`<li>`; current page marked `aria-current="page"`.
- Animations pause when the tab is hidden (`visibilitychange`).

### 5.4 Responsive contract — all 200 variants, five widths

| Width | Required behaviour |
|---|---|
| 360 | no horizontal scroll · 44 px targets · text ≥ 13 px · safe-area insets honoured |
| 768 | collapse per the variant’s declared `mobile_strategy` |
| 1024 | nav reveals, no truncation, chrome ≤ 88 px tall |
| 1440 | canonical render — must match the repo’s calm, generous rhythm |
| 1920 | container caps at `--n-container`; no stretched line lengths |

Verification = a **real render served from the repo root** (`python3 -m http.server`, §0C), not
media-query archaeology: open the variant page or the gallery and *look*. Media-query presence is
checked statically by G4; the served render is G13 + the critique loop (§8 Phase 2 step 4).

### 5.5 Motion spec (designed, not accidental)

| Layer | Spec |
|---|---|
| Micro (hover, press, toggle) | 120–200 ms, ease-out, transform/opacity only |
| Standard (open/close, scrolled state) | 200–320 ms, `cubic-bezier(.2,.8,.2,1)` |
| Entrance (footer reveal, overlay) | 300–600 ms, stagger 40–60 ms/child, max total ~700 ms |
| Scrub (progress, parallax, wordmark scale) | scroll-linked, linear, no JS rAF if `animation-timeline` is supported |
| Exits | 25% faster than entrances |
| Signature | **exactly one** per variant, named in `meta.json` |
| Reduced motion | `prefers-reduced-motion: reduce` → opacity-only 150 ms; marquees, parallax, curtains, magnetic and scrub effects **disabled entirely** (hard gate G6) |

Animate only `transform, opacity, filter, clip-path, background-color, color, border-color` — plus `grid-template-rows` for accordion footers (the single sanctioned exception). Never animate `height/width/top/left/margin`. One rAF loop maximum per page; throttle pointer effects to rAF; max 2 `will-change` targets, removed after the animation.

### 5.6 Per-variant performance budget

| Metric | Budget |
|---|---|
| JS | ≤ 12 KB gzipped (a dependency-free CSS-only build must also exist per variant) |
| DOM added | ≤ 90 nodes header · ≤ 140 footer |
| CLS | **0** — reserve exact height; sticky chrome must not reflow content |
| Paint | no full-page repaint on scroll; no per-frame layout reads |
| Network | zero external requests **except the one locked Google Fonts stylesheet** (§0C rule 2) |
| Gallery page Lighthouse | Perf ≥ 95 · A11y 100 · Best-practices ≥ 95 |

### 5.7 Google-able integration requirement
Each variant ships `index.html` (standalone demo), `style.css` (scoped to `[data-chrome="H034"]`), `script.js` (progressive enhancement, page works with JS off), and `meta.json`. Mounting must work with the one-line API in §2.6, and no variant may leak global CSS into its host page.

The standalone demo page is a **showcase, not a scaffold**: it carries the §0C head block (color-scheme meta, locked font link, theme-boot script), links `runtime/demo.css`, renders finished at every §5.4 width over `python3 -m http.server` from the repo root, and keeps every asset reference relative so the lab works under any server root.

### 5.8 CSS OWNERSHIP CONTRACT — each variant owns its look (no megatemplate, no Bootstrap)

This is the contract that failed in the v2 generator run. Read it before writing `tools/generate.mjs` or any `style.css`.

#### What “own CSS design” means
1. **The variant’s `style.css` is the source of truth for that chrome’s appearance.** It must set layout, colour/surface (A7), type scale in chrome, CTA chrome, borders/shadows, states (hover/focus/active/open/scrolled), and the mobile collapse for **that** HTML.
2. **`runtime/chrome.css` holds only true shared primitives** (skip-link, focus-ring helper, reduced-motion reminders, maybe `.eyebrow` / base `.cta` defaults). It must **not** be a 200-variant kitchen sink. If a rule is specific to a paradigm (mega, drawer, wizard…), it belongs in the variants that use it — or in a tiny optional partial that those variants `@import` — never in every `style.css`.
3. **No megatemplate.** Forbidden pattern: one giant CSS string containing every family’s selectors, then `scopeCss(css, "[data-chrome=H0xx]")` for all 100 headers. Required pattern: build CSS from the modules the HTML actually emits (bar + nav paradigm + CTA + A7 skin + mobile + signature motion). After emit, **dead-class budget ≤ 15%**:  
   `dead = class selectors in style.css whose class never appears in that variant’s index.html` (ignore pseudo-elements and state classes like `is-open` / `is-on` that JS toggles on existing nodes).
4. **No third-party CSS framework runtime.** Banned in any `index.html` / `style.css` / vendor folder: Bootstrap, Tailwind (Play CDN or built utilities as the design system), Bulma, Foundation, UIKit, Materialize, Semantic UI, Animate.css-as-dependency, Font Awesome CSS kits used as the layout system. You may study their docs for *patterns*; you implement Nestlancer CSS.
5. **Hard-coded hex outside §2.2 is still banned** (G3) — except the documented dark-theme literals already in §2.2 / tokens.css (`#0b1720`, `#0f1e29`, `#e8eef4`, `#b9c6d0`, `#8aa0b3`, `rgba(255,255,255,.08)`, `#fff` on teal CTAs). Prefer `var(--n-*)` everywhere else.
6. **`meta.json` must list `A7_surface_skin`** and a one-line `skin_notes` describing the composition (e.g. `"ink 30px utility + glass main bar"`).
7. **Byte sanity:** after dropping dead rules, header `style.css` should typically land **≤ 8 KB** and footer **≤ 7 KB** unless the paradigm truly needs more (mega + overlay). A 19 KB header stylesheet with 59 unused class selectors is an automatic G14 fail.

#### Generator / agent checklist (print per batch)
```
CSS OWNERSHIP
Variant: <ID>
A7 skin: <skin id>
Classes in HTML: <n>   Class selectors in CSS: <n>   Dead: <n> (<pct>%)
Framework CDN links: 0
Megatemplate reused: NO
Glance vs previous family: DISTINCT / SAME (if SAME → change A7 or structure before shipping)
```

---

## 6) THE 200 VARIANTS

### 6.1 Headers — 25 families × 4 variants = **100**

Each family’s 4 variants differ on container geometry, theme inversion, motion primitive and mobile collapse. **Each family also locks one A7 surface skin** (neighbouring families must differ). Assign skins across the 25 families so at least 8 of the 10 recipes in §5.0 appear. Default batch priority in brackets.

| # | Family | IDs | Structural signature | Seed inspirations | Batch |
|---|---|---|---|---|---|
| 1 | Classic centred/split nav | H001–H004 | logo left, 7 inline links, hairline | repo baseline, nytimes | **P0** |
| 2 | Logo-left inline (+ hairline) | H005–H008 | single row, calm density | repo, stripe | **P0** |
| 16 | Auth / app minimal | H061–H064 | logo + one icon button only | repo auth screens | **P0** |
| 3 | Two-tier utility + main | H009–H012 | thin utility strip (locale/currency/status) | apple, msft, aws | P1 |
| 4 | Mega-menu panel | H013–H016 | multi-column panel, feature tiles | shopify, amazon, adobe | P1 |
| 14 | Search-forward | H053–H056 | large inline search IS the nav | airbnb, booking, etsy | P1 |
| 18 | Announcement bar + nav | H069–H072 | dismissible bar (`Intake open`) | stripe, webflow | P1 |
| 19 | Marquee / ticker nav | H073–H076 | infinite domain ticker under logo | repo ticker row | P1 |
| 22 | Segmented tabs | H085–H088 | sliding segmented control as nav | repo "Product" section | P1 |
| 23 | Dual-CTA split | H089–H092 | equal-weight `Sign in` + `Start a project` | conversion SaaS | P1 |
| 25 | Editorial typographic | H097–H100 | oversized serif wordmark, thin rules | pentagram, editorial | P1 |
| 5 | Floating glass pill | H017–H020 | detached rounded container, blur, inset | linear, vercel, raycast | P2 |
| 6 | Sticky shrink | H021–H024 | 72 → 56 px, logo scales down | most SaaS | P2 |
| 11 | Bottom-docked mobile bar | H041–H044 | 4–5 icon tabs, safe-area padding | native-feel apps | P2 |
| 12 | Split-identity (client ⇄ freelancer) | H045–H048 | dual-audience switcher as the hero | upwork, fiverr, contra | P2 |
| 13 | Marketplace category rail | H049–H052 | divider + category chips/list | etsy, flipkart, myntra | P2 |
| 17 | Wizard / intake progress | H065–H068 | step dots + progress (`Start a project`) | checkout flows | P2 |
| 21 | Docs / section nav | H081–H084 | breadcrumb + tab row, second sticky row | github, stripe docs | P2 |
| 7 | Auto-hide on scroll-down | H025–H028 | `translateY(-100%)` down, returns up | medium, mobile web | P3 |
| 8 | Transparent-over-hero → solid | H029–H032 | mesh shows through, then solidifies | airbnb, lusion | P3 |
| 9 | Fullscreen overlay nav | H033–H036 | burger → full-viewport panel, mega type | studios, bucket K | P3 |
| 10 | Side drawer nav | H037–H040 | right drawer + scrim, nested accordions | e-com, dashboards | P3 |
| 15 | Command-palette native (⌘K) | H057–H060 | “Search… ⌘K” pill + palette overlay | linear, supabase, clerk | P3 |
| 20 | Scroll-progress header | H077–H080 | 2 px progress line + section label | editorial | P3 |
| 24 | Edge icon-rail + minimal bar | H093–H096 | 64 px vertical rail + slim bar | dashboards, IDE-like | P3 |

### 6.2 Footers — 20 families × 5 variants = **100**

Same craft bar as headers. **Each footer family locks one A7 skin**; use ≥6 distinct recipes across the 20 families (mesh, invert, dual-surface, tint-wash, editorial-rules, solid-canvas are natural fits).

| # | Family | IDs | Structural signature | Seed inspirations | Batch |
|---|---|---|---|---|---|
| 1 | Classic 4-column grid + blurb | F001–F005 | brand col + 3 link cols + legal row | repo baseline | **P0** |
| 3 | Newsletter-lead | F011–F015 | email capture as the dominant element | substack, medium | P1 |
| 4 | CTA banner fused to footer | F016–F020 | `Ready to ship with clarity?` merges in | SaaS, repo pre-footer | P1 |
| 5 | Mega sitemap | F021–F025 | 5–6 dense columns covering all 17 pages | amazon, apple | P1 |
| 10 | Mesh / gradient footer | F046–F050 | repo hero mesh echoed at the base | repo language | P1 |
| 11 | Editorial / issue-style | F051–F055 | serif, dated, “Journal” framing | NYT, economist | P1 |
| 12 | Marquee wordmark reveal | F056–F060 | giant wordmark scrolls on enter | bucket K | P1 |
| 13 | Proof / stat rail | F061–F065 | count-up ₹4.2L, payouts cleared | fintech | P1 |
| 17 | Curtain reveal on overscroll | F081–F085 | content slides up, footer pinned behind | bucket K | P1 |
| 7 | Minimal single-row | F031–F035 | wordmark left, © right, nothing else | minimal.gallery | P2 |
| 8 | Two-bar (links bar + legal bar) | F036–F040 | separated bands, different tones | corporate | P2 |
| 14 | Locale + currency switcher | F066–F070 | INR/USD, en-IN listbox | India products | P2 |
| 15 | Social-proof wall | F071–F075 | client logo grid + awards row | agencies | P2 |
| 16 | Compact sticky mobile footer | F076–F080 | pinned CTA strip / tab bar | mobile web | P2 |
| 19 | Compliance-heavy (India) | F091–F095 | Razorpay · PCI-DSS · GST · DPDP · grievance officer | Indian fintech | P2 |
| 20 | Community & status | F096–F100 | status pill, changelog RSS, system status | dev tools | P2 |
| 2 | Oversized wordmark | F006–F010 | giant `Nestlancer`, links above it | studios, bucket J | P3 |
| 6 | Accordion columns | F026–F030 | collapse via `grid-template-rows` | gov/edu patterns | P3 |
| 9 | Dark inverted + teal accents | F041–F045 | deep-surface bg, mint links | dev tools | P3 |
| 18 | App / QR download | F086–F090 | QR block + store buttons for Project Hub | consumer apps | P3 |

### 6.3 Batch plan

| Batch | Contents | Variants |
|---|---|---|
| **P0 — Repo-faithful** | H001–H008, H061–H064, F001–F010 | 22 |
| **P1 — Public & marketing** | header families 3,4,14,18,19,22,23,25 · footer families 3,4,5,10,11,12,13,17 | 72 |
| **P2 — Portal, commerce & trust** | header families 5,6,11,12,13,17,21 · footer families 7,8,14,15,16,19,20 | 63 |
| **P3 — Product, app & experimental** | header families 7,8,9,10,15,20,24 · footer families 2,6,9,18 | 48 |
| **P4 — Showcase polish** | elevate the best 10 headers + 10 footers to hero quality; regenerate every QA failure | — |

P0 must be **pixel-rhythm faithful** to the repo screenshots — it is the control group that proves the other 95 are deliberate departures, not drift.

---

## 7) COMPONENT ← REFERENCE MAP (APPLY LITERALLY)

| Chrome component | Study first | A+ craft goal |
|---|---|---|
| Wordmark lockup | repo screenshots, pentagram | navy + teal full-stop, optical alignment, dark-mode safe |
| Primary nav row | linear, stripe, apple | correct rhythm, hover intent, `aria-current` state |
| Mega-menu panel | shopify, adobe, tailwindui | column grid, feature tile, 35 ms child stagger, Esc to close |
| Search / ⌘K | airbnb, linear, shadcn | large inline search or palette, empty state, keyboard nav |
| Dual-audience switcher | upwork, fiverr, contra | client ⇄ freelancer segmented control, state persist |
| Category rail / chips | etsy, flipkart, myntra | scroll-snap chips, active pill morph (m-15) |
| Theme toggle | repo screenshots | sun/moon icon, View-Transition cross-fade (m-12) |
| Primary CTA | uiverse, hover.css, magicui (restrained) | teal pill, one shine sweep, press 0.98, focus ring |
| Announcement bar | stripe, webflow | dismiss + `localStorage`, 220 ms collapse, never re-show |
| Ticker / marquee | repo ticker row, magicui | 28 s linear, pause on hover, reduced-motion off |
| Footer sitemap columns | stripe, apple, atlassian | mono eyebrows, 3–6 cols, hover roll-up (m-28) |
| Newsletter form | uiverse, codemyui, substack | clear focus, inline validation, button→tick morph (m-34) |
| Legal / compliance row | zerodha, razorpay, cred | tabular ₹, DPDP/GST line, muted 12 px, never crowded |
| Social row | hover.css, bucket G | monochrome SVG icons, 40 ms stagger pop (m-27) |
| Locale / currency | booking, wise, zerodha | listbox with INR/USD + en-IN, 180 ms slide |
| Status / live pill | repo pills, linear | `Intake open` dot pulse (m-25), honest labels only |
| Back-to-top | keyframes.app, codemyui | appears after 60 vh, orbit icon rotate, spring |
| Footer reveal | cuberto, bucket K, motion.dev | IO-triggered 600 ms with column stagger, or `animation-timeline: view()` |
| Accordion footer | flowbite, preline | `grid-template-rows` collapse, chevron rotate, `aria-expanded` |
| App / QR block | consumer apps | QR + store badges as inline SVG placeholders (never real store logos) |

---

## 8) EXECUTION WORKFLOW

### Phase 0 — Orient
1. Clone `ui-designing.git`; confirm `Nestlancer-public-screenshots/public/*.webp` (17 files) and this prompt.
2. Open `013-marketing-homepage.webp` at full size and crop-open the header and footer regions. Note gutters, pill radius, hairline weight, eyebrow spacing.
3. Create the tree, write `.gitignore` (`research/raw/`, `tmp/`, `node_modules/`).
4. Confirm workspace root + free space vs the 128 MB budget.

### Phase R — Reference Gate (§3)
Complete the capture run until **≥100 sites captured**, run the motion probe, cluster patterns, print the **Research Gate** block. Then per batch: ≥6 searches, ≥5 fetches, ≥2 screenshot re-opens, and the **Reference Contract**.

### Phase 1 — Foundation (do once, before variants)
- `chrome-lab/tokens/tokens.css` + `tokens.json` from §2.2 (light + dark + reduced-motion block).
- `chrome-lab/runtime/chrome.css` — shared primitives: pill CTA, hairline, eyebrow, glass utility, focus ring, skip link, scroll-progress, `.rise` reveal, `color-scheme` per theme.
- `chrome-lab/runtime/chrome-motion.js` — one small runtime implementing m-01…m-34 as opt-in data attributes (`data-motion="m-03"`), with a global reduced-motion short-circuit.
- `chrome-lab/runtime/demo.css` — the demo-page shell (§0C rule 3): styles `main`/H1/mount snippet/axis chips/placeholder blocks around every variant page; never loaded by mounted chrome.
- `chrome-lab/gallery/index.html` + `app.js` (isolated iframes, lazy mount) **first**, so every variant is visible as you go — header frames ≈ 264 px, footer frames ≈ 600 px, theme switch themes the page itself.
- Repo-root `index.html` redirecting to `chrome-lab/gallery/` (§0C rule 1).

### Phase 2 — Variant batches (strict P0 → P4 order)
For each batch of 10:
1. Print the **Reference Contract** (≥5 rows) for that batch.
2. Build variants one family at a time — never generate two families from the same template mentally. Lock **A7 surface skin first**, then change the **container**, then the paradigm, then the motion. Emit CSS from modules for that HTML only (§5.8) — never clone a previous family’s stylesheet.
3. Write `index.html`, `style.css`, `script.js`, `meta.json` straight into the workspace tree.
4. **Critique loop** — serve the repo (`python3 -m http.server 8123`) and render at **1440 px and 390 px**, light and dark, in a real browser (never from `file://`). Ask as a harsh design director:
   - Does this look like the repo, or like a generic template wearing teal?
   - Is there exactly one signature motion, and is it *seen*?
   - Is the hierarchy confident at a glance, or busy?
   - **Cover the ID — can you name the family from the surface skin alone?** If it is “the same white bar,” fail and change A7.
   - Does `style.css` only style classes that exist in this HTML? Print the §5.8 CSS Ownership block.
   - In the browser (§0C): real fonts loaded? demo shell styled? no 404s, no console errors, no light-flash with `?theme=dark`? burger far-right and drawer working at 390 px?
   Fix, re-render, max 3 loops, then note leftovers in `QA-REPORT.md`.
5. Run gates G1, G3, G4, G5, G6, G8, **G14** on the batch before starting the next.
6. Print the **Research Gate** + **Workspace Delivery Check** counters.

### Phase 3 — QA & acceptance (full set)
Run §9's gates over all 200 programmatically. Regenerate failures (max 3 attempts each), then flag for human review with a reason.

---

## 9) QA ACCEPTANCE GATES

| # | Gate | Test | Fail → |
|---|---|---|---|
| G1 | **Uniqueness** | pairwise diff on the **7** axes ⇒ every pair differs ≥3 **and** at least one differing axis is A1/A2/A3/A7; within a family, no shared motion id; neighbouring families do not share A7 | regenerate variant |
| G2 | **Count** | exactly 100 headers + 100 footers; IDs H001–H100 / F001–F100 contiguous, no gaps, no stubs | build the missing ones |
| G3 | Brand fidelity | only §2.2 tokens (+ documented dark literals); no second accent hue; **no Bootstrap/Tailwind/framework CDN**; contrast ≥4.5:1 light **and** dark | fix tokens / strip CDN |
| G4 | Responsive | Playwright: no horizontal scroll + chrome height within budget at 360/768/1024/1440/1920 | fix layout |
| G5 | A11y | axe-core zero critical/serious; keyboard path: skip link → every action reachable · Esc closes · focus returns | fix |
| G6 | Reduced motion | with `prefers-reduced-motion: reduce` → zero transform/scroll-linked animations remain | fix |
| G7 | Performance | §5.6 budgets (JS ≤12 KB, DOM caps, CLS 0, no externals beyond the locked font link) | trim |
| G8 | Traceability | every `meta.json` cites ≥2 captured sites + ≥1 measured `m-XX`, and states `diff_from_prev` axes | add citations |
| G9 | Attribution & originality | zero copied logos, images, or proprietary copy; `docs/RESEARCH-NOTES.md` credits every source URL | strip & rewrite |
| G10 | Integration | one-line mount API works; CSS scoped, zero global leakage; page works with JS disabled | fix scoping |
| G11 | Content fidelity | all strings from §2.4; ₹ values tabular and correct; no invented features/clients | restore copy |
| G12 | Workspace delivery | §0A manifest lists real files in the workspace; `research/*.json` present; size ≤128 MB | sync & trim |
| G13 | **Browser-serve** | §0C contract, run statically by `tools/qa.mjs`: locked font link + `demo.css` + theme-boot + color-scheme meta in every page; all relative assets resolve (no 404s over `python3 -m http.server`); no malformed glued selectors; mobile burger ordered after actions; repo-root redirect present | fix & re-serve |
| G14 | **Visual skin + CSS ownership** | every `meta.json` has `A7_surface_skin` from §5.0; ≥8 distinct A7 values used across header families and ≥6 across footer families; dead-class selectors in each `style.css` ≤ 15% of class selectors (state classes on existing nodes allowed); no megatemplate fingerprint (same normalised CSS hash on >4 variants after stripping the chrome id); zero framework CDN / `bootstrap` / `tailwind` / `bulma` string hits in variant HTML/CSS; header `style.css` ≤ 8 KB and footer ≤ 7 KB unless `meta.budget.css_exception` justifies mega/overlay | rebuild CSS from modules; change A7 |

`docs/QA-REPORT.md` ends with: `gate · passed · failed · regenerated · notes` + a **family × status** table proving every family is complete (include A7 skin column).

---

## 10) SESSION I/O FORMAT

### Start of session (print all seven)
1. Confirmed: research gate status (`captured <n>/100`) and batch to be worked.
2. User workspace root path.
3. Families in this batch + variant IDs.
4. Repo screenshots re-opened for this batch.
5. The **Reference Contract** table (≥5 rows).
6. A+ definition for this batch (3 bullets) + the 7 axes claimed (incl. A7 skin).
7. Files that will exist when the batch is done.

### After each batch
- `ls` proof of the variant paths in the workspace (not the sandbox).
- Gate results for G1/G3/G4/G5/G6/G8/**G13**/**G14**.
- Updated counters: `<n>/100` headers, `<n>/100` footers · A7 skins used this batch: `<list>`.
- The §0C serve statement: “served at localhost:8123 and looked at 1440/390, both themes” — or the printed limitation that no browser exists in the sandbox.
- The CSS Ownership block for each variant in the batch.

### End of session
1. Files changed (workspace paths only).
2. Per family: variants built · inspiration cited · signature motion.
3. Critique-loop notes — what read as “C template”, what became A+.
4. **Research Gate** block.
5. **Workspace Delivery Check** block (§0A).
6. Remaining batches from §6.3.
7. Any variant flagged for human review with a reason.

### Refusal rules
- Do not proceed past Phase R without ≥100 captured sites.
- Do not ship recolours as “different types”.
- Do not ship structure-clones that share one white-bar / one footer surface (fail G14).
- Do not stub, skip, or `TODO` any variant.
- Do not use a colour, font, or asset outside §2.2; do not add Bootstrap/Tailwind/other CSS framework CDNs.
- Do not emit megatemplate CSS (dead-class rate > 15%).
- Do not leave deliverables outside the workspace tree.
- Do not claim completion while any gate in §9 is failing.
- Do not edit anything under `Nestlancer-public-screenshots/`.

---

## 11) START COMMAND

Begin now:
1. Clone `https://github.com/nestlancer/ui-designing.git`; verify 17 screenshots + this prompt.
2. Create `chrome-lab/` (tokens, runtime, headers, footers, gallery, docs), `research/`, `tools/`, `docs/`; write `.gitignore`; confirm workspace root and size budget.
3. Open `013-marketing-homepage.webp`; crop and study the real header and footer. Record measured values (you should reproduce `#24877f`, `#0a2543`, `#f9fbfc`, 72 px, 1200 px, pill CTAs).
4. Write `tools/capture.mjs` (Playwright, §3.4) and `tools/analyse.mjs`.
5. Run Phase R over §3.1 buckets until **≥100 sites captured**; extract chrome skeletons + computed styles + cropped references.
6. Run the motion probe (§3.5); build `research/motion-index.json` with **≥30 primitives** and real ms/easing/trigger values.
7. Build `research/pattern-index.json` (≥25 header archetypes, ≥20 footer archetypes) and `docs/RESEARCH-NOTES.md` (≥100 lines).
8. **Print the Research Gate block.** If it does not PASS, substitute same-bucket sites and re-run — do not continue.
9. Write `tokens.css` + `chrome.css` + `chrome-motion.js` + the gallery shell in the workspace.
10. Run **P0** (H001–H008, H061–H064, F001–F010): Reference Contract → build → critique loop at 1440/390 in both themes → gates → manifest.
11. Continue **P1 → P2 → P3 → P4**, 10 variants at a time, printing the Reference Contract and Delivery Check per batch. Never stub, never recolour.
12. Run the §0C **browser-serve sign-off**: `python3 -m http.server 8123` from the repo root → open `/`, the gallery, and 3–5 variants at 1440 px and 390 px in both themes; verify fonts, demo shell, footer thumbnails, zero 404s, zero console errors, working mobile drawer. Print the result.
13. Finish with `docs/QA-REPORT.md` (all **14** gates), the final **Workspace Delivery Check**, and the honest count: `sites captured / attempted`, `primitives`, `headers built`, `footers built`, `A7 skins used`, `gates passed`, `flagged for review`.

If context runs short: finish the current batch + foundation files, sync everything, print the manifest, and hand off with the exact next batch id — never leave a half-written variant behind.

---

## APPENDIX A — Differentiation cheat sheet (use when you feel a variant going stale)

Ask: *what would a different studio do with the same seven links?* Then change **one axis at a time** and re-render:

| Stuck on… | Rotate to |
|---|---|
| Container | full-bleed → 1200 contained → floating pill inset 16 → split 50/50 → asymmetric 8/4 → docked rail |
| Paradigm | inline → dropdown → mega → overlay → drawer → tab bar → segmented → breadcrumb → search-first → palette |
| Scroll | static → sticky → shrink → auto-hide → transparent→solid → progress-linked → pinned-then-release |
| Motion | pull a **different** `m-XX`; if the family already used one, exclude it |
| Disclosure | hover → click → keyboard-first → hover-intent 120 ms → always-visible → accordion |
| CTA | teal pill → outline pill → split-arrow pill → ghost text → dual equal CTA → gradient edge → icon-only → sticky mobile bar |
| **Surface skin (A7)** | solid-canvas → glass-hairline → ink-band → tint-wash → mesh-zone → elevated-soft → editorial-rules → dual-surface → invert-chrome → pill-float |
| Theme | force the variant to be beautiful in **dark first**, then reconcile light |
| Density | go one step calmer *or* one step denser than the repo — never both in one variant |
| CSS bloat | delete every selector whose class is not in this HTML; rebuild from modules — never scope a kitchen-sink blob |

## APPENDIX B — Ready recipes for the six most-used primitives

```css
/* m-03 glass engage — toggled by class at a measured threshold */
.chrome[data-scrolled="true"]{
  background: color-mix(in oklab, var(--n-bg) 78%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-bottom-color: var(--n-hairline);
  transition: background-color .24s linear;
}
@supports not (backdrop-filter: blur(2px)){ .chrome[data-scrolled="true"]{ background: var(--n-bg) } }

/* m-01 sticky shrink */
.chrome{ --h:72px; height:var(--h); transition: height .2s cubic-bezier(.2,.8,.2,1) }
.chrome[data-scrolled="true"]{ --h:56px }
.chrome__logo{ transform-origin:left center; transition: transform .2s cubic-bezier(.2,.8,.2,1) }
.chrome[data-scrolled="true"] .chrome__logo{ transform:scale(.92) }

/* m-05 sliding nav ink bar */
.nav__ink{ position:absolute; bottom:-1px; height:2px; background:var(--n-teal);
  transition: transform .22s cubic-bezier(.2,.8,.2,1), width .22s cubic-bezier(.2,.8,.2,1) }

/* m-25 live status dot */
.dot{ position:relative; width:7px; height:7px; border-radius:50%; background:var(--n-live) }
.dot::after{ content:''; position:absolute; inset:-4px; border-radius:50%;
  border:1px solid var(--n-live); animation: pulse 2s ease-in-out infinite }
@keyframes pulse{ 0%,100%{ transform:scale(.8); opacity:.9 } 50%{ transform:scale(1.4); opacity:0 } }

/* m-19 footer reveal (native scroll timeline, JS fallback via IntersectionObserver) */
@supports (animation-timeline: view()){
  .footer__col{ animation: rise .6s both; animation-timeline: view();
    animation-range: entry 10% cover 30% }
}
@keyframes rise{ from{ opacity:0; transform:translateY(16px) } to{ opacity:1; transform:none } }

/* m-06 magnetic CTA + press depth */
.cta{ transition: transform .18s cubic-bezier(.2,.8,.2,1) }
.cta:active{ transform: scale(.98) }

/* reduced-motion contract — global, non-negotiable (G6) */
@media (prefers-reduced-motion: reduce){
  *, *::before, *::after{
    animation-duration:.001ms !important; animation-iteration-count:1 !important;
    transition-duration:150ms !important; transition-property: opacity, color, background-color, border-color !important;
  }
  .footer__col, .nav__ink, .cta{ transform:none !important }
  [data-motion^="m-"]{ animation:none !important }
}
```
````

---

## How to use (operator notes)

### The run, end to end
1. Clone the repo (or let the agent clone it) — `Nestlancer-public-screenshots/` + `header-footer-prompt.md` must be present.
2. Paste everything between the ```` ``` ```` fences into **Arena Agent Mode** (or Cursor).
3. Watch for the **Research Gate** block first. If it prints `Captured: 64`, say: *“Research gate failed — substitute same-bucket sites until ≥100 captured, then continue.”*
4. Watch the **Workspace** panel: `chrome-lab/` should fill up batch by batch. If files only appear in chat, say: *“Sync chrome-lab to the User Workspace now — sandbox-only does not count.”*
5. **Serve it yourself before believing “done”.** In the repo root: `python3 -m http.server 8123` → open `http://localhost:8123/`. You should land in the gallery with real Fraunces/Inter/Plex Mono, styled demo pages, and whole footer thumbnails (dark toggle included). If it looks raw — Georgia everywhere, text stuck to the screen edges, cropped footers — say: *“Browser-serve contract failed — re-check §0C (font link, demo.css, glued selectors, mobile bar) and re-run `node tools/qa.mjs` until G13 passes.”*
6. **Glance the gallery for skins.** Cover the IDs. If two families look like the same white bar / same footer slab, say: *“G14 failed — assign distinct A7 surface skins and rebuild owned CSS (no megatemplate).”* Do not accept “axes differ in meta.json” as a substitute for a visible skin.
7. Read `docs/QA-REPORT.md` at the end; if G1 or G14 shows failures, ask for regeneration of exactly those IDs. All **14** gates must pass.

### Useful mid-run commands
| Goal | Say |
|---|---|
| Different flavour of a batch | `Rebuild H017–H020 with dark-first treatment, a distinct A7 skin, and a different motion primitive each.` |
| Same skin everywhere | `G14 fail — reassign A7 across families and rebuild owned style.css (no megatemplate).` |
| More range | `Add 5 footers that use m-20 curtain reveal, no duplicates of existing axes.` |
| Audit only | `Run §9 gates over the existing set and output only failures with reasons.` |
| Freeze | `Freeze F001–F010 — they're approved. Never regenerate them.` |
| Integration | `Generate the one-line mount snippets for all 100 headers against /pricing and /portal.` |

### Practical notes
- Expect **Phase R to dominate runtime** — 100+ site captures with scroll-triggering is genuinely slow. Running research and generation as separate turns is normal and keeps quality high.
- Several seeds will block automation (Apple, Amazon, Bloomberg, some airlines). That is planned for: same-bucket substitutes keep the ≥100 floor.
- The **P0 batch is a control group.** Approve it before P1 — if P0 doesn't match the repo rhythm, every later variant inherits the drift.

## What this prompt fixes vs a naive “make 100 headers” run

| Naive run | This prompt |
|---|---|
| 100 URLs listed as “inspiration”, never opened | **§0B hard gate**: ≥100 sites *captured* with `sites.json` + crops before any CSS |
| 100 recolours of one template | **7-axis uniqueness test** (incl. A7 surface skin) + QA gate G1 rejects any pair differing on <3 axes |
| Structure-unique but one shared white-bar skin | **A7 skins** + gallery glance + gate **G14** |
| Megatemplate CSS / Bootstrap CDN / “no design” | **§5.8 CSS Ownership** — custom Nestlancer CSS only, dead-class ≤15%, no framework CDN |
| Motion described in adjectives | `getAnimations()` + scroll probe capture **real ms/easing/thresholds** into `motion-index.json` |
| Footers as an afterthought (90 identical bars) | **20 footer families × 5** with the same craft bar as headers, incl. curtain, marquee, compliance, accordion, locale |
| Design drifts off-brand | **Measured tokens** pixel-sampled from the repo + gate G3 |
| 40 done, 60 “same as above” | strict **P0 → P4 batching**, 10 at a time, no stubs, gate G2 |
| Accessibility postponed | G5 (axe + keyboard) and G6 (reduced motion) are **pass/fail**, not polish |
| “Done!” with nothing in the ZIP | **§0A Workspace Delivery Check** + manifest every batch, gate G12 |
| Header breaks the host page | one-line mount API, scoped CSS, JS-off support, CLS 0, gate G10/G7 |
| Files “work” but the browser shows raw, wrong-font, broken chrome over a local server | **§0C browser-serve contract** + gate **G13** + `runtime/demo.css` + the one locked font link + comment-safe CSS scoping |
