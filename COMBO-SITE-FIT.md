# Combo × site-type fit (research + Playwright UI check)

**When:** 2026-10-17  
**Local lab:** `http://127.0.0.1:8123/chrome-lab/` (Python `http.server 8123`)  
**UI probe:** Playwright Chromium @ 1440×900 + 390×844 → `review-shots/`  
**Also checked:** Chrome DevTools MCP on C02 (sticky wrap `top:12px`, pill `border-radius:999px`)

Nestlancer’s own pitch is **product studio + client portal** (fixed-price, Razorpay milestones, Project Hub). That sits between **own studio / agency**, **product / SaaS marketing**, and a light **freelance services** site — not a two-sided marketplace like Upwork/Fiverr.

---

## Playwright UI snapshot (what each combo actually looks like)

| Combo | Header behaviour (measured) | Footer shape | Desktop feel |
|---|---|---|---|
| **C01 Ground Truth** | Solid white bar · `static` · ~73 px · no blur/shadow | Full-width 3-col + brand blurb · ~363 px | Calm, enterprise-familiar, “default SaaS” |
| **C02 Orbit Suite ★** | Floating pill · sticky wrap @ 12 px · radius 999 · soft shadow | Floating rounded card · ~322 px | Product-premium, object language matches |
| **C03 Mist over Orbit** | Glass sticky · `position:sticky` · blur engages on scroll | Same Orbit floating card | Most “modern product” / launch-page |
| **C04 Ground & Hearth** | Same solid bar as C01 | Centred mark + link row + socials · ~380 px | Studio / portfolio quiet close |
| **C05 Orbit over Hearth** | Same floating pill as C02 | Same centred Hearth | Hybrid: product bar + studio close |

Mobile: all five keep a burger; footers stack taller (C01/C02 ~660–690 px; Hearth ~416 px).

Screens: `review-shots/C0n-desktop-top.png`, `-scrolled.png`, `-bottom.png`.

---

## Site-type categories → which combo fits

### 1. Own studio / design–dev agency (portfolio-led)

**What the market does:** Minimal chrome, work carries the brand. Centred or sparse footers; solid or near-invisible headers. Colour lives in case studies, not in the nav.

| Fit | Combo | Why |
|---|---|---|
| **Best** | **C04** | Solid trustworthy bar + centred Hearth close (socials, short blurb) matches studio sites |
| Strong | **C01** | Safer if you need Product / Pricing / Portal columns in the footer |
| Avoid as primary | C02 / C03 | Floating pills read as *SaaS product*, not “we are a craft studio” |

**References**
- [Pentagram](https://www.pentagram.com/) — compact mono header; content-led; editorial footer ([MABTU write-up](https://mabtu.com/sites/pentagram))
- [Best agency website patterns](https://muffingroup.com/blog/best-agency-websites/) — portfolio grid + statement hero; chrome stays quiet
- [shadcn portfolio footer](https://www.shadcn.io/blocks/footer-portfolio) — centred name/bio/socials (same grammar as Hearth)

---

### 2. Freelance developer / indie contractor site

**What the market does:** Sticky or simple header, few links, obvious contact/hire CTA; compact footer (email, socials, updated date). Often monochrome + one accent. Avoid marketplace density.

| Fit | Combo | Why |
|---|---|---|
| **Best** | **C04** | Hearth footer = portfolio close; solid bar = clarity for Hire / Contact |
| Strong | **C01** | If you sell packages + a client login (“Sign in” + “Start a project”) |
| Optional polish | **C05** | Pill header if you want a more “productized freelance” look without a heavy footer |
| Avoid | C03 | Glass + floating card is overbuilt for a personal freelance page |

**References**
- [Developer portfolio layouts](https://we.inc/guides/developer-portfolio-examples) — header email + sparse footer “Updated …”
- [32 web-developer portfolios (2026)](https://createtoday.io/examples?category=web-developer-portfolio) — monochrome, few overlays; content zones not cinematic chrome
- [UX sticky-header portfolio notes](https://bryce.seefieldt.ca/docs/engineering/ux-engineering-standards) — sticky control-strip, not floating theatre

---

### 3. Product / SaaS marketing site (tools, Project Hub marketing)

**What the market does:** Logo left · 4–6 links · Sign in + one primary CTA right. Sticky. Often glass or floating pill over a hero. Multi-column footer with Product / Company / Legal.

| Fit | Combo | Why |
|---|---|---|
| **Best** | **C02** | Floating pill + matching floating footer = Linear/Framer-class “product object” |
| **Best alt** | **C03** | Glass sticky + Orbit card = Vercel/Apple-class marketing over a rich hero |
| Solid default | **C01** | Stripe/Figma/Notion “standard sticky” baseline ([SaaS Boat study](https://saasboat.com/saas-header-design-30-examples-from-real-products/)) |
| Weak | C04 / C05 Hearth close | Centred social footer under-sells Product / Pricing / Legal IA |

**References**
- [SaaS header patterns from real products](https://saasboat.com/saas-header-design-30-examples-from-real-products/) — Figma, Notion, Vercel, Stripe; sticky CTA top-right
- [Glass marketing headers (Stripe / Linear / Vercel named)](https://codefronts.com/navigation/css-glassmorphic-navbars/modern-saas-landing-page-header/)
- [Floating pill / centered oval SaaS nav](https://www.shadcn-ui-blocks.com/blocks/modern-saas/navbars/centered-oval)
- [Standard sticky SaaS nav](https://www.shadcn-ui-blocks.com/blocks/modern-saas/navbars/standard-sticky) ← maps to **C01**

---

### 4. Product studio + client portal *(Nestlancer’s actual category)*

**What the market does:** Studio credibility (Portfolio, Services) **plus** product CTAs (Sign in / portal / Start a project). Dual audience: buyer of services *and* returning client.

| Fit | Combo | Why |
|---|---|---|
| **Ship favourite** | **C02** | Already marked ★ in review; pill + card feel like a *productized studio* |
| Trust / launch pages | **C01** | Clearest “Sign in + Start a project” + full sitemap footer for SEO & legal |
| Marketing hero pages | **C03** | Glass over mesh/hero; close on Orbit card — best for homepage / Product |
| Case-study / About / Blog | **C04** | Quieter Hearth close suits editorial pages |
| Compromise | **C05** | Product pill + studio Hearth — use if homepage is product but brand feels craft |

**Live-ish peers**
- Studio + portal CTAs: [Xora Studio portal marketing](https://portal.xorastudio.com/) — “Start a project” / “Open client portal”
- Trust + conversion dual CTA: same pattern as Figma / Notion headers in the SaaS Boat set

---

### 5. Marketplace / directory (Upwork, Fiverr, service catalogs)

**What the market does:** Search-first header, category mega-nav, buyer/seller dual footer, trust badges. Dense IA.

| Fit | Combo | Why |
|---|---|---|
| **None of these five** | — | Approved set has no search-first / mega / dual-audience footer |
| Closest if forced | **C01** | Only because of multi-column footer; still missing search + categories |

**References**
- [Fiverr IA — search + Explore mega + multi-col footer](https://github.com/getia-md/getia-md.github.io/blob/main/catalog/fiverr/IA.md)
- [Marketplace footer pattern](https://www.shadcn.io/blocks/footer-marketplace)
- [Toptal](https://www.toptal.com/) — category-led hire flows, not pill chrome

→ If Nestlancer ever becomes a *directory of freelancers*, you need new chrome (closer to deleted P08/P09), not these combos.

---

### 6. E‑commerce / retail storefront

Floating pills appear on some DTC brands; default is solid sticky + cart. Multi-col footer with Help / Shipping.

| Fit | Closest | Note |
|---|---|---|
| Weak | C01 / C02 | No cart, no catalog nav — wrong IA |
| Skip | C03–C05 | Wrong metaphors |

---

## Quick matrix (combo → best categories)

| Combo | Own studio | Freelance solo | Product / SaaS | Studio + portal (Nestlancer) | Marketplace |
|---|---|---|---|---|---|
| **C01** Ground Truth | ●●● | ●●● | ●●●● | ●●●● | ● (weak) |
| **C02** Orbit Suite ★ | ●● | ●● | ●●●●● | ●●●●● | ○ |
| **C03** Mist over Orbit | ● | ● | ●●●●● | ●●●● | ○ |
| **C04** Ground & Hearth | ●●●●● | ●●●●● | ●● | ●●● | ○ |
| **C05** Orbit over Hearth | ●●● | ●●● | ●●● | ●●● | ○ |

●●●●● = strongest match · ○ = do not use as primary

---

## Recommendation for Nestlancer (freelance-capable product studio)

Use **different combos on different page types**, not one chrome everywhere:

| Page type | Use | Reason |
|---|---|---|
| Home / Product / Pricing | **C02** or **C03** | Product feel + sticky CTA; C03 if hero is visual |
| Login / Portal entry | **C01** or **C02** | Clear Sign in; C01 reads more “account system” |
| Portfolio / Blog / About | **C04** | Studio Hearth close; less product chrome noise |
| Contact / Start a project | **C01** or **C02** | Conversion + legal columns (or pill trust) |

**Default system to ship:** **C02 Orbit Suite** as the locked Nestlancer chrome (matches prior ✓✓ review).  
**Keep C01** as the “documentation / trust / legal-heavy” fallback.  
**Keep C04** for editorial pages.  
Treat **C03** as the marketing-hero special.  
**C05** only if you like the pill but want a lighter, social-led footer.

---

## Source list (online research)

1. https://saasboat.com/saas-header-design-30-examples-from-real-products/  
2. https://codefronts.com/navigation/css-glassmorphic-navbars/modern-saas-landing-page-header/  
3. https://www.shadcn-ui-blocks.com/blocks/modern-saas/navbars/centered-oval  
4. https://www.shadcn-ui-blocks.com/blocks/modern-saas/navbars/standard-sticky  
5. https://muffingroup.com/blog/best-agency-websites/  
6. https://mabtu.com/sites/pentagram · https://www.pentagram.com/  
7. https://we.inc/guides/developer-portfolio-examples  
8. https://createtoday.io/examples?category=web-developer-portfolio  
9. https://www.shadcn.io/blocks/footer-portfolio  
10. https://www.shadcn.io/blocks/footer-marketplace  
11. https://github.com/getia-md/getia-md.github.io/blob/main/catalog/fiverr/IA.md  
12. https://www.toptal.com/  
13. https://portal.xorastudio.com/  
14. https://bryce.seefieldt.ca/docs/engineering/ux-engineering-standards  

Local evidence: `review-shots/combo-ui-report.json` + Playwright PNGs.
