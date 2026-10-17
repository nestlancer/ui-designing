# Nestlancer Header & Footer Lab — Master Prompt v5 · CHROME LOCKED
### Re-run of v4 after the client review: no research, no new concepts — build only what `MANUAL-REVIEW-CHART.md` ticked, then recombine it

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the `ui-designing` repo open.
> v4 researched 100 sites and produced 20 pairs. The client reviewed them in `MANUAL-REVIEW-CHART.md` and ticked
> **3 headers and 3 footers**. v5 exists because that review is finished: its job is to *delete* everything else,
> *rebuild* the lab from the approved patterns only, and prove the approved halves recombine.
> The brand system, tokens, icon set, logo rules, craft, a11y and motion rules are **inherited from v4 §4 and §7 unchanged** — that file stays the reference.

---

## 1. YOUR ROLE

Art director and front-end craftsperson, now working as a **production designer**: you are not exploring, you are
locking. Judgment is spent on *consistency between approved pieces*, not on new ideas.

## 2. THE MISSION (read twice)

| Stage | Do | Do not |
|---|---|---|
| **1 · Prune** | Delete every header/footer the chart did not tick — folders, generator modules, metadata, gallery cards, links in docs | Leave a rejected pattern reachable from any page |
| **2 · Rebuild** | Re-emit the lab from the ticked halves only, as reviewed: same markup, same CSS, same tokens | Redesign an approved half, change a hue, add a feature |
| **3 · Combine** | Build the approved pairing pages: approved header + approved footer on one page, **chrome only** | Write body content, hero, cards, testimonials, "sample" sections |
| **4 · Verify** | Static check every emitted file; fix what fails | Claim a browser look you did not do |

**Selection is data, not opinion.** `MANUAL-REVIEW-CHART.md` → `tools/lock.mjs` → `tools/build-lab.mjs`.
Never re-derive the ticks from memory, and never edit the ticked CSS to taste.

## 3. READ FIRST

1. `MANUAL-REVIEW-CHART.md` — the ticks, the "After the review" section, the combo list.
2. `header-footer-prompt-v4.md` §3 (examples + real logo), §4 (brand, tokens, icons, locked copy), §7 (craft, a11y, responsive, motion).
3. `tools/chrome-approved.mjs` — the six surviving halves, verbatim from the reviewed build.
4. `tools/lock.mjs` — `REVIEW` (what was kept/deleted) and `COMBOS` (which page wears which pair).
5. `tools/lib.mjs` — tokens, base, icon set, logo markup, JS snippets. Shared, once, no fork.

## 4. THE LOCKED SELECTION

| Half | ID | Name | Skin | Chart | Page |
|---|---|---|---|---|---|
| Header | P01 | Ground Floor | solid | ✓ | `chrome-lab/approved/P01-classic/header.html` |
| Header | P02 | Morning Mist | glass | ✓ | `chrome-lab/approved/P02-glass/header.html` |
| Header | P04 | Orbit Card | elevated | ✓✓ ★ | `chrome-lab/approved/P04-pill/header.html` |
| Footer | P01 | Ground Floor | solid | ✓ | `chrome-lab/approved/P01-classic/footer.html` |
| Footer | P04 | Orbit Card | elevated | ✓✓ ★ | `chrome-lab/approved/P04-pill/footer.html` |
| Footer | P05 | Hearth | solid | ✓ | `chrome-lab/approved/P05-centered/footer.html` |

Everything else from v4 is **deleted** — P03 and P06–P20 (both halves), P02's footer, P05's header, and their
generator modules. History keeps them (`git show f713edf:…`); the working tree must not.

## 5. COMBOS — the point of this run

3 headers × 3 footers = 9 possible systems. Ship the five below (the other four are listed as unbuilt in `lock.mjs`):

| Combo | Header | Footer | Why this one |
|---|---|---|---|
| C01 Ground Truth | P01 | P01 | the approved pair, chrome-only — the control |
| C02 Orbit Suite | P04 | P04 | the client favourite, both halves |
| C03 Mist over Orbit | P02 | P04 | glass sticky bar, floating card close |
| C04 Ground & Hearth | P01 | P05 | quietest: solid over centred |
| C05 Orbit over Hearth | P04 | P05 | favourite bar, second approved footer |

**Anatomy of a combo page** (`chrome-lab/combos/Cnn-name/index.html`) — exactly, in order:
1. `<a class="skip-link" href="#main">` · 2. the approved `<header role="banner">` markup, verbatim ·
3. `<main class="stage" id="main">` holding **one** mono caption line naming the pairing · 4. the approved
`<footer role="contentinfo">` markup, verbatim · 5. the header's JS (menu/scroll/theme) and the footer's JS.
Nothing else. No nav sections, no hero, no sample content, no page-note, no fake body.

The stage exists for two reasons only: it gives `#main` a target, and it gives a sticky/floating bar something
to behave against. It is `min-height:60vh`, centred, one line of type, and it is hidden by `?frame=1` so the
gallery can show header directly over footer.

**The bridge rule.** Two approved DNAs meet on one page; the usual clash is the rails, not the colour. If the
header and footer sit on different container widths, add the single-line fix the combo needs and say why:
```css
.container{max-width:1160px}   /* P04 floats at 1160 px — the other half must match it */
```
One declaration, at most, per combo. Never restyle the other half's components, never add a hue, never add a
shadow the source pair did not have.

**Cross-talk guard.** Before shipping a combo, diff the class selectors of the two stylesheets: any class
styled by both halves is a collision — resolve it by scoping (`X` only inside `.foot-card`), not by `!important`.
No duplicate `id`s, one `banner`, one `contentinfo`.

## 6. OUTPUT

```
chrome-lab/
  index.html                     ← gallery: 3 header cards · 3 footer cards · 5 combo cards · light/dark switch
  approved/Pnn-slug/header.html  footer.html  index.html(only when both halves ticked)  chrome.json
  combos/Cnn-slug/index.html     combo.json
  assets/                        ← the four real logo files, unchanged
tools/  lib.mjs  chrome-approved.mjs  lock.mjs  build-lab.mjs  check-lab.mjs
MANUAL-REVIEW-CHART.md           ← selection lists filled in, "After the review" section, current page map
docs/CONCEPTS.md                 ← status line: which concepts survived
```
- The HTML is generated. **Edit `tools/chrome-approved.mjs` / `tools/lock.mjs`, run `node tools/build-lab.mjs`, never hand-edit a page.**
- Relative paths only, zero external requests, every file opens alone from `file://`.
- `?theme=dark|light` and `?frame=1` on every emitted page; framed chrome pages post their real height so gallery cards fit.

## 7. VERIFICATION — static, honest

`node tools/check-lab.mjs` must exit 0. It proves, per page: no external request / no framework / no emoji ·
one `banner` + one `contentinfo` where the page carries both · no duplicate `id` · every local `src`/`href`
resolves on disk · ≤ 16 KB per file, ≤ 132 DOM nodes · no `outline:none` · no class styled by both halves ·
declared bridge present · `chrome.json` / `combo.json` valid and matching the lock · **no reference to any
deleted pair anywhere in `chrome-lab/`**.

This sandbox has no browser: say `NO-BROWSER` and run the static pass rather than claiming a look-test. Where
the code shows a defect inherited from v4 (a state class the JS never lands on the right element, a logo rule
overridden by the base `img{height:auto}`), fix it in `chrome-approved.mjs` — the fix, not a new design.

## 8. REFUSAL RULES

- Do not research, fetch, or "get inspiration" from any site. v4's research is the research.
- Do not create a new header, footer, skin, hue, icon style, or copy line. Locked copy is v4 §4.4 only.
- Do not resurrect a deleted pair, and do not keep a rejected half "just in case" — `chrome-lab/` holds approved chrome only.
- Do not pad a combo page with content to make it look like a page. Header + footer. Caption at most.
- Do not redraw, recolour or replace the logo; do not use an icon CDN, a CSS framework, or a font `<link>`.
- Do not edit `example-header.html`, `example-footer.html`, the logos, `Nestlancer-public-screenshots/`, or the v4 prompt.
- Do not ship with `check-lab.mjs` failing, or with an approved half silently restyled.

## 9. START COMMAND — in order

1. Read `MANUAL-REVIEW-CHART.md`, `tools/lock.mjs`, `tools/chrome-approved.mjs`. Print the six surviving halves and the six deletions.
2. Prune: delete `chrome-lab/pairs/`, `tools/pairs-*.mjs`, `tools/build-pairs.mjs`; keep the ticked CSS in one module (`chrome-approved.mjs`) so a rebuild cannot resurrect the rest.
3. Write `tools/build-lab.mjs` (approved pages + combos + gallery) and `tools/check-lab.mjs`.
4. Build, run the static check, fix, rebuild until it exits 0.
5. Update `MANUAL-REVIEW-CHART.md` (selection lists, after-review map) and `docs/CONCEPTS.md` (survivor status).
6. Print the Delivery Report.

```
## DELIVERY REPORT
Pruned: <n> pair folders · <n> generator modules · rejected halves: <list>
Approved chrome built: <n> headers / <n> footers (from <ids>) — CSS unchanged: YES/FIXED <what>
Combos: C01–C05 pages (chrome only, no body content) · bridges applied: <list or none>
Pair-language check: cross-talk classes 0 · duplicate ids 0 · banner/contentinfo OK
Links: 0 broken · external requests 0 · file sizes <n> KB max
Browser look: NO-BROWSER (static check only) — gallery served at localhost:8123 for human review
Files: <paths>
Flagged for review: <unbuilt combos + any tension the client should judge, or none>
```

---

### Operator notes
- **Want another pairing?** *"Add `P02+P01` to `COMBOS` in tools/lock.mjs and rebuild."*
- **Want a rejected concept back?** *"Restore P12 from f713edf as a header only, same lock rules."*
- **Client wants the combo to be a real page?** *"Give C03 a body section set — that is a different prompt, not this one."*
- **Freeze:** *"P01, P02(H), P04, P05(F) are approved chrome — never restyle them, only recombine them."*
