# ui-designing — Nestlancer chrome lab

Repository for the Nestlancer **header & footer lab**: research into 134 captured live sites, then
**100 header variants (H001–H100)** and **100 footer variants (F001–F100)** built from the repo's own
measured design tokens.

| What | Where |
|---|---|
| Master prompt / brief | `header-footer-prompt.md` |
| Design truth (read-only, 17 screenshots) | `Nestlancer-public-screenshots/public/*.webp` |
| The 200 variants | `chrome-lab/headers/**`, `chrome-lab/footers/**` |
| Tokens + shared primitives | `chrome-lab/tokens/`, `chrome-lab/runtime/` |
| Gallery (200 isolated iframes) | `chrome-lab/gallery/index.html` |
| Research artifacts | `research/sites.json`, `research/motion-index.json`, `research/pattern-index.json` |
| Docs | `docs/RESEARCH-GATE.md`, `docs/REFERENCE-CONTRACTS.md`, `docs/QA-REPORT.md`, `docs/RESEARCH-NOTES.md` |
| Tooling | `tools/capture.mjs`, `tools/analyse.mjs`, `tools/axes.mjs`, `tools/generate.mjs`, `tools/qa.mjs` |

## Quick start

```bash
# view the lab (any static server, from the repo root)
python3 -m http.server 8123        # → http://localhost:8123/  (redirects to the gallery)
                                   # → or chrome-lab/headers/H001/ … any variant directly

# rebuild all 200 variants from the axis solver, then verify every gate
node tools/generate.mjs
node tools/qa.mjs                  # exits non-zero if a gate fails (13 gates, incl. G13 browser-serve)
```

Every page renders the locked Nestlancer fonts (Fraunces · Inter · IBM Plex Mono) via one Google
Fonts `<link>` with full offline fallbacks, links `chrome-lab/runtime/demo.css` for the demo shell
around each chrome, and works over any static server from the repo root — see the **browser-serve
contract (§0C)** in `header-footer-prompt.md`.

## Mounting one variant

```html
<header data-chrome="H034" data-theme="dark" data-page="pricing"></header>
<footer data-chrome="F017" data-theme="light"></footer>
```

Load `chrome-lab/tokens/tokens.css`, `chrome-lab/runtime/chrome.css`, the variant's own
`style.css` / `script.js` (plus `runtime/chrome-motion.js`) and the chrome mounts itself. Every rule is
scoped to `[data-chrome="<ID>"]`, so nothing leaks into the host page; with JS disabled the chrome still
renders and navigates.

See `chrome-lab/README.md` for the six-axis model, the mobile strategies and the token contract, and
`docs/QA-REPORT.md` for the gate results (including the honest note on which gates are static-only).
