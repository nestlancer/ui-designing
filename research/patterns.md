# Patterns — header & footer archetypes from the 100-site study

Compiled 2026-10-17 from `sites-100.json` (9 hosts verified live this run, 100 hosts ranked via three fetched
ranking sources). Where a pattern was **not** observed live, the "where seen" column names hosts whose *live
capture* shows it, or is marked `convention` (industry-standard pattern, not measured here). Motion durations
are **reference implementation values** from public recipe conventions (animate.style, hover.css, magicui,
flowbite blocks) — this sandbox has no browser, so nothing was measured with `document.getAnimations()`;
each primitive says which.

## Header archetypes (16)

| # | Archetype | Seen at (verified unless noted) | Works when | Fails when |
|---|---|---|---|---|
| H1 | Classic contained bar — logo left, inline links, single CTA | stripe.com, slack.com, zerodha.com | ≤7 links, one clear action | >7 links, two competing CTAs |
| H2 | Announcement ribbon above the bar | figma.com ("Config India" ribbon), vercel.com ("Read the recap") | one timely link | permanent noise |
| H3 | Utility strip + main bar (two tiers) | convention (microsoft, apple) | locale/currency/status chrome | thin sites that can't fill two tiers |
| H4 | Centred logo, links each side | convention (fashion/editorial) | brand-led pages | task-first tools |
| H5 | Floating pill / inset bar | convention (linear-style minimalism) | short pages, dark heroes | long dense pages |
| H6 | Glass sticky (blur engages after ~8 px) | convention (ios-style, vercel-adjacent) | content-rich scroll | glass over dense text (AA risk) |
| H7 | Search-first bar — the field is the nav | airbnb.com (search + AI toggle On/Off) | search is the product | content sites with shallow search |
| H8 | Mega panel with icon tiles | convention (shopify, microsoft) | many products/features | few links (overkill) |
| H9 | Full-screen overlay menu | nike.com (condensed utility + overlay paradigm) | brand/expression sites | docs/utility sites |
| H10 | Right drawer with accordions | convention (mobile-first marketing) | deep IA on mobile | desktop-first single-purpose pages |
| H11 | Bottom dock / tab bar | convention (app-like mobile web) | mobile-first products | desktop marketing |
| H12 | Command palette (⌘K) | convention (linear, vercel dashboards) | power-user tools | low-frequency visitors |
| H13 | Editorial ruled bar — type and hairlines only | convention (newspapers; zerodha's restraint is adjacent) | text-led sites | image-led commerce |
| H14 | Auth-minimal — logo + one round icon button | convention (login screens; repo's 006-login.webp) | focused task flows | anything needing navigation |
| H15 | Segmented switcher nav (sliding thumb) | slack.com (tabbed Knowledge/People/Process/Platform) | 2–4 peer views | >5 segments |
| H16 | Locale/utility tier (currency + language) | convention (amazon, ikea global retail) | multi-market sites | single-market sites |

## Footer archetypes (12)

| # | Archetype | Seen at | Works when | Fails when |
|---|---|---|---|---|
| F1 | Brand + blurb + columns + legal row | stripe.com-classic; the repo's own footer screenshot (013) | almost always | when it pretends to be a sitemap dump |
| F2 | CTA band closing into columns | slack.com stat+CTA sections; razorpay.com repeated CTA pairs | conversion-led sites | pure reference sites |
| F3 | Dark navy sitemap band | convention (vercel/linear dark closes) | dev/studio brands | airy wellness brands |
| F4 | Newsletter-led footer | convention (media: nytimes-class) | recurring audience | one-time purchasers |
| F5 | One-line minimal (auth pages) | zerodha.com closing CTA band (one line, one action) | task pages | full marketing sites |
| F6 | Mega sitemap (6 columns, all routes) | convention (ikea, microsoft) | huge catalogs | small sites (intimidating) |
| F7 | Locale/utility tier (region, currency, language) | convention (airbnb, ikea) | multi-currency products | local-only products |
| F8 | Status pill footer ("All systems live") | convention (stripe/vercel status culture) | infra/tool products | consumer content |
| F9 | Oversized wordmark reveal | convention (awwwards-class portfolios) | expressive brands | conservative fintech |
| F10 | Accordion columns (mobile collapses) | convention (responsive standard) | mobile-heavy traffic | desktop-only B2B |
| F11 | Proof/stats rail (numbers before legal) | slack.com ("5 hours saved", "35%") | trust-led sales | ad-free non-profits |
| F12 | Editorial ruled footer — hairlines & type only | zerodha.com's restraint (live capture) | editorial, calm brands | product-dense nav needs |

## Motion primitives (22) — trigger · duration · easing · where seen

No live measurement was possible (no browser in sandbox): durations are **reference values** following
public recipe conventions (animate.style: 1s entrance scale at 150 ms step ramps; hover.css: 0.3–0.4 s
ease for lifts/underlines; magicui/flowbite: 200–320 ms `cubic-bezier(.2,.8,.2,1)` panels). "Live" marks
where this run's captures show the behaviour exists.

| # | Primitive | Trigger | Reference duration/easing | Where seen |
|---|---|---|---|---|
| M1 | Sticky shrink (72→56 px) | scroll > 8 px | 200 ms ease-out | convention (apple, cloudflare) |
| M2 | Hide-on-scroll-down, show-on-up | direction change | 260 ms ease-out | convention (medium, nytimes) |
| M3 | Glass engage (bg blur+fill after 8 px) | scroll | 200 ms background-color | convention (vercel-class) |
| M4 | Transparent→solid over hero | scroll past hero top | 200 ms | convention (nike-class merch) |
| M5 | Sliding nav underline (scaleX draw) | hover/focus | 180 ms ease-out | hover.css convention |
| M6 | Segmented thumb slide | tab switch | 240 ms cubic-bezier(.2,.8,.2,1) | slack.com live (tabs) |
| M7 | Mega panel with child stagger | hover/click parent | 240 ms panel + 40 ms/child | convention (shopify-class) |
| M8 | Full-screen overlay (clip-path circle/wipe) | burger click | 320 ms cubic-bezier | nike.com paradigm (live: overlay nav) |
| M9 | Side drawer + scrim | burger click | 280 ms + fade 150 ms | convention (mobile-first) |
| M10 | ⌘K palette scale-in (0.98→1) | ⌘K / click | 200 ms ease-out | convention (linear/vercel products) |
| M11 | Scroll-progress line | scroll | transform only, 0 ms (direct) | convention (editorial longforms) |
| M12 | Ticker/marquee, pausable | load; pause button | 20–40 s linear loop | slack.com live (pausable logo wall) |
| M13 | Announcement collapse (grid-rows) | dismiss click | 220 ms ease-out | figma.com paradigm (live: ribbon) |
| M14 | Footer/column stagger on reveal | IntersectionObserver | 500 ms, 50 ms/child | convention |
| M15 | Count-up odometer | in-view once | 900–1200 ms ease-out | stripe.com live (GDP counter) |
| M16 | Accordion via grid-template-rows | disclosure click | 240 ms cubic-bezier(.2,.8,.2,1) | convention (FAQ standard) |
| M17 | Oversized wordmark reveal (translateY mask) | in-view | 600 ms cubic-bezier + 60 ms stagger | convention (awwwards-class) |
| M18 | Lift on hover (translateY(-2px)+shadow) | hover/focus | 180 ms ease-out | hover.css convention |
| M19 | Glow hairline pulse | idle, subtle | 2.4 s ease-in-out infinite, reduced-motion off | convention (dark-native brands) |
| M20 | Reading-progress + active-toc link | scroll | 0 ms transform (direct) | convention (docs) |
| M21 | Button arrow nudge (→ shifts 2–4 px) | hover | 150 ms ease-out | hover.css convention |
| M22 | Focus-ring draw on keyboard tab | :focus-visible | 120 ms opacity | convention (a11y standard) |

## What the study says (synthesis)

1. **Chrome density tracks task count.** Search-first (airbnb) and mega-panel (shopify-class) bars earn
   their complexity; zerodha proves one link and one CTA can carry a fintech. Nestlancer sits between:
   7 links, one CTA, optional utility tier.
2. **Proof belongs in chrome.** stripe (live GDP counter), slack (hours-saved stats), razorpay ("100+
   payment methods") all put numbers in and around the footer — not just the page.
3. **Motion is one gesture, not a showcase.** Every captured site spends motion on exactly one idea:
   stripe counts, slack rotates (pausably), airbnb scrolls horizontally, linear rotates headline words.
   reduced-motion respect appears where teams are mature (slack's pause control).
4. **Dark closes the day.** Dev/studio brands (vercel, linear) close pages on dark footers; consumer/retail
   (airbnb, nike) stay light and use warm pre-footer quotes.
5. **Announcements are disposable.** figma/vercel ribbons are one link + dismiss — never a second nav row.
