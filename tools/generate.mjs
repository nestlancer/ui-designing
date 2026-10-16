#!/usr/bin/env node
/* Nestlancer Chrome Lab — variant generator.
   Emits 100 headers (H001–H100) + 100 footers (F001–F100) from per-family
   modules. CSS is assembled ONLY from modules the emitted HTML uses, then
   scoped to [data-chrome="ID"] — comments are stripped BEFORE selector
   substitution (G13). No megatemplate, no framework CDN (§5.8). */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { COPY, wordmark, icon, themeToggle, burger, cta, navList, navListWithDropdown, statusPill, eyebrow, tickerRow, searchBox, demoShell, pageHead, glyph, socialRow, legalLine } from './lib/atoms.mjs';
import { skinCSS, SKIN_NOTES, SKINS } from './lib/skins.mjs';
import { HEADER_EMITTERS, mobileCSS, baseCss } from './lib/headers.mjs';
import { FOOTER_EMITTERS } from './lib/footers.mjs';
import { HEADER_FAMILIES, FOOTER_FAMILIES } from './lib/variants.mjs';
import * as JS from './lib/jsbits.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lab = join(root, 'chrome-lab');

const JS_MAP = {
  JS_DISCLOSE: JS.JS_DISCLOSE, JS_THEME: JS.JS_THEME, JS_SCROLL: JS.JS_SCROLL,
  JS_PROGRESS: JS.JS_PROGRESS, JS_ANNOUNCE: JS.JS_ANNOUNCE, JS_PALETTE: JS.JS_PALETTE,
  JS_COUNT: JS.JS_COUNT, JS_REVEAL: JS.JS_REVEAL, JS_TOTOP: JS.JS_TOTOP,
  JS_MORPH: JS.JS_MORPH, JS_ACC: JS.JS_ACC, JS_SEG: JS.JS_SEG, JS_ROTATE: JS.JS_ROTATE,
  JS_MAGNET: JS.JS_MAGNET, JS_SPOTLIGHT: JS.JS_SPOTLIGHT, JS_TABS_ANIM: JS.JS_TABS_ANIM,
  JS_HOVERINTENT: JS.JS_HOVERINTENT, JS_VIS: JS.JS_VIS,
};

const STATE_CLASSES = new Set(['is-open', 'is-on', 'is-current', 'is-scrolled', 'is-solid', 'is-hidden']);
const ANIM_CLASSES = {
  'ticker__row': 'animation:none !important; transform:none !important;',
  'wm-xl__t': 'animation:none !important; transform:none !important;',
  'soc': 'animation:none !important;',
  'badge': 'animation:none !important; transform:none !important;',
  'mega__col': 'animation:none !important; transform:none !important;',
  'seg__thumb': 'transform:none !important;',
  'progress__bar': 'transform:scaleX(var(--scroll-p,0)) !important;',
  'drawer': 'transform:none !important;',
  'overlay': 'clip-path:none !important;',
  'totop': 'transform:none !important;',
  'facc__panel': 'transition:none !important;',
  'h-bar': 'transform:none !important;',
};

/* ---------- CSS plumbing (G13-safe) ---------- */
function splitRules(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    const at = css.indexOf('{', i);
    if (at === -1) break;
    const head = css.slice(i, at).trim();
    let depth = 1, j = at + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    out.push({ head, body: css.slice(at + 1, j - 1) });
    i = j;
  }
  return out;
}

function classesInSelector(sel) {
  const found = [];
  const re = /\.([a-zA-Z_][\w-]*)/g;
  let m;
  while ((m = re.exec(sel))) found.push(m[1]);
  return found;
}

function filterCSS(css, usedClasses) {
  const rules = splitRules(css);
  const kept = [];
  for (const r of rules) {
    if (r.head.startsWith('@keyframes')) { kept.push(`${r.head}{${r.body}}`); continue; }
    if (r.head.startsWith('@media') || r.head.startsWith('@supports')) {
      const inner = filterCSS(r.body, usedClasses).trim();
      if (inner) kept.push(`${r.head}{${inner}}`);
      continue;
    }
    const cls = classesInSelector(r.head);
    const dead = cls.filter(c => !usedClasses.has(c) && !STATE_CLASSES.has(c));
    if (cls.length && dead.length) continue; // drop rule with unused classes (§5.8)
    kept.push(`${r.head}{${r.body.trim()}}`);
  }
  return kept.join('\n');
}

function deadRatio(css) {
  const rules = splitRules(css);
  let total = 0, dead = 0;
  const used = cssUsedClasses(css);
  return { used };
}
function cssUsedClasses(css) {
  const set = new Set();
  for (const r of splitRules(css)) {
    if (r.head.startsWith('@keyframes')) continue;
    if (r.head.startsWith('@media') || r.head.startsWith('@supports')) {
      for (const c of cssUsedClasses(r.body)) set.add(c);
      continue;
    }
    for (const c of classesInSelector(r.head)) set.add(c);
  }
  return set;
}

function scopeCSS(css, id) {
  let s = String(css || '');
  s = s.replace(/\/\*[\s\S]*?\*\//g, ''); // comments FIRST — never glue to selector heads (G13)
  s = s.replaceAll('%%S%%', `[data-chrome="${id}"] `);
  s = s.replaceAll('%%K%%', `k-${id}-`);
  return s;
}

function htmlClasses(html) {
  const set = new Set();
  const re = /class="([^"]*)"/g;
  let m;
  while ((m = re.exec(html))) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) set.add(c);
  }
  return set;
}

function countNodes(html) {
  return (html.match(/<[a-zA-Z][^>]*>/g) || []).filter(t => !t.startsWith('</') && !t.endsWith('/>')).length;
}

/* ---------- build one variant ---------- */
function buildVariant(type, id, family, v, indexInFamily, prevAxes) {
  const emitter = (type === 'header' ? HEADER_EMITTERS : FOOTER_EMITTERS)[family.n];
  const cfg = {
    id, type,
    familyName: family.name,
    familySig: family.sig,
    signature: v.sig,
    A7: family.skin,
    skinNotes: SKIN_NOTES[family.skin],
    refs: family.cite,
    axes: {
      A1: v.A1, A2: family.A2, A3: v.A3, A4: v.A4, A5: v.A5, A6: v.A6, A7: family.skin,
    },
    opts: v.opts || {},
  };
  const out = emitter(v, id);
  const html = out.html;
  const usedClasses = htmlClasses(html);

  // assemble owned CSS from modules actually present
  const skinMod = skinCSS(family.skin, type === 'header' ? 'header' : 'footer');
  const familyMods = (out.css || []).filter(Boolean).join('\n');
  const mobileMod = mobileCSS(v.mobile, v);
  const rawCss = [skinMod, familyMods, mobileMod].join('\n');
  const filtered = filterCSS(rawCss, usedClasses);

  // per-variant reduced-motion overrides — every style.css carries a reduce block (G6)
  const rmLines = [
    `%%S%%[data-reveal]{ opacity:1 !important; transform:none !important; transition:opacity .15s linear !important; }`,
    `%%S%%*{ animation:none !important; transition-duration:.15s !important; }`,
  ];
  for (const [cls, rule] of Object.entries(ANIM_CLASSES)) {
    if (usedClasses.has(cls)) rmLines.push(`%%S%%.${cls}{ ${rule} }`);
    if (usedClasses.has('wm-xl') && cls === 'wm-xl__t') { /* covered */ }
  }
  const rmBlock = `\n@media (prefers-reduced-motion: reduce){\n${rmLines.join('\n')}\n}`;

  let style = scopeCSS(filtered + rmBlock, id);
  const base = baseCss(id, v.mobile, v);
  if (base) style += `\n${base}\n`;
  style = `/* Nestlancer Chrome Lab — ${id} owned stylesheet (§5.8). A7 skin: ${family.skin}. */\n` + style;

  // dead-class report (style.css classes not in HTML, ignoring state classes)
  const cssCls = cssUsedClasses(filtered + rmBlock);
  let dead = 0, total = 0;
  for (const c of cssCls) {
    total++;
    if (!usedClasses.has(c) && !STATE_CLASSES.has(c)) dead++;
  }
  const deadPct = total ? Math.round((dead / total) * 100) : 0;

  // script.js — only the blocks this chrome needs
  const jsParts = (out.js || []).map(n => JS_MAP[n]).filter(Boolean);
  const script = JS.compose(id, jsParts);
  const jsGz = gzipSync(Buffer.from(script)).length;

  // demo page
  const chromeHtml = out.html;
  const demo = demoShell(cfg);
  const body = type === 'header'
    ? `<a class="nl-skip" href="#main">Skip to content</a>\n${chromeHtml}\n${demo}\n<script src="script.js" defer></script>`
    : `<a class="nl-skip" href="#main">Skip to content</a>\n${demo}\n${chromeHtml}\n<script src="script.js" defer></script>`;
  const htmlPage = `<!doctype html>
<html lang="en">
<head>
${pageHead(cfg)}
<link rel="stylesheet" href="../../tokens/tokens.css"/>
<link rel="stylesheet" href="../../runtime/chrome.css"/>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="../../runtime/demo.css"/>
</head>
<body>
${body}
</body>
</html>
`;

  // diff_from_prev: which of the 7 axes changed vs the previous variant of this type
  let diffFromPrev;
  if (prevAxes) {
    const all = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
    diffFromPrev = all.filter(a => prevAxes[a] !== cfg.axes[a]);
  } else {
    diffFromPrev = ['baseline'];
  }

  const meta = {
    id, type, family: `F${String(family.n).padStart(2, '0')}`,
    family_name: family.name,
    family_signature: family.sig,
    A1_container: v.A1, A2_nav: family.A2, A3_scroll: v.A3, A4_motion: v.A4,
    A5_disclosure: v.A5, A6_cta: v.A6, A7_surface_skin: family.skin,
    skin_notes: SKIN_NOTES[family.skin],
    signature_motion: v.sig,
    motion_ids: [v.A4],
    references: family.cite,
    pattern_refs: family.patterns,
    diff_from_prev: diffFromPrev,
    mobile_strategy: v.mobile,
    budget: {
      css_bytes: Buffer.byteLength(style),
      css_exception: null,
      dom_nodes: countNodes(chromeHtml),
      js_bytes: Buffer.byteLength(script),
      js_gzip_bytes: jsGz,
      dead_class_pct: deadPct,
    },
    reduced_motion: 'opacity-only 150ms; signature transform/marquee/scrub disabled (G6)',
    mount: `<${type} data-chrome="${id}" data-theme="dark" data-page="pricing"></${type}>`,
    research_basis: 'research/sites.json + research/motion-index.json (Phase R)',
  };

  return { id, type, style, script, htmlPage, meta, deadPct, cfg };
}

/* ---------- run ---------- */
const headerResults = [];
const footerResults = [];
const manifest = [];

function emitAll(kind, families, emitterPool, results, prefix) {
  let prevAxes = null;
  for (const family of families) {
    family.variants.forEach((v, i) => {
      const num = kind === 'header' ? (family.n - 1) * 4 + i + 1 : (family.n - 1) * 5 + i + 1;
      const id = `${prefix}${String(num).padStart(3, '0')}`;
      const built = buildVariant(kind, id, family, v, i, prevAxes);
      prevAxes = built.meta ? {
        A1: built.meta.A1_container, A2: built.meta.A2_nav, A3: built.meta.A3_scroll,
        A4: built.meta.A4_motion, A5: built.meta.A5_disclosure, A6: built.meta.A6_cta,
        A7: built.meta.A7_surface_skin,
      } : null;
      const dir = join(lab, kind === 'header' ? 'headers' : 'footers', id);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), built.htmlPage);
      writeFileSync(join(dir, 'style.css'), built.style);
      writeFileSync(join(dir, 'script.js'), built.script);
      writeFileSync(join(dir, 'meta.json'), JSON.stringify(built.meta, null, 1));
      results.push(built);
      manifest.push({
        id, type: kind,
        family: built.meta.family,
        family_name: family.name,
        signature_motion: built.meta.signature_motion,
        A7_surface_skin: family.skin,
        A2_nav: family.A2,
      });
    });
    // per-batch discipline: family complete before the next
    console.log(`  ${prefix}${String((family.n - 1) * (kind === 'header' ? 4 : 5) + 1).padStart(3, '0')}-` +
      `${prefix}${String(family.n * (kind === 'header' ? 4 : 5)).padStart(3, '0')} ${family.name} [${family.skin}] done`);
  }
}

console.log('GENERATE — headers');
emitAll('header', HEADER_FAMILIES, HEADER_EMITTERS, headerResults, 'H');
console.log('GENERATE — footers');
emitAll('footer', FOOTER_FAMILIES, FOOTER_EMITTERS, footerResults, 'F');

manifest.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
writeFileSync(join(lab, 'gallery', 'manifest.json'), JSON.stringify(manifest, null, 1));

const hdrCssMax = Math.max(...headerResults.map(r => r.meta.budget.css_bytes));
const ftrCssMax = Math.max(...footerResults.map(r => r.meta.budget.css_bytes));
const deadMax = Math.max(...[...headerResults, ...footerResults].map(r => r.deadPct));
const jsGzMax = Math.max(...[...headerResults, ...footerResults].map(r => r.meta.budget.js_gzip_bytes));
const nodesMaxH = Math.max(...headerResults.map(r => r.meta.budget.dom_nodes));
const nodesMaxF = Math.max(...footerResults.map(r => r.meta.budget.dom_nodes));

console.log('\nGENERATE SUMMARY');
console.log(`headers: ${headerResults.length} · footers: ${footerResults.length}`);
console.log(`header style.css max: ${hdrCssMax} B (budget 8192) · footer max: ${ftrCssMax} B (budget 7168)`);
console.log(`dead-class max: ${deadMax}% (budget 15%)`);
console.log(`script.js gzip max: ${jsGzMax} B (budget 12288)`);
console.log(`DOM nodes max: header ${nodesMaxH} (90) · footer ${nodesMaxF} (140)`);
console.log(`wrote chrome-lab/headers/H001-H100, chrome-lab/footers/F001-F100, gallery/manifest.json`);
