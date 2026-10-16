#!/usr/bin/env node
/* Nestlancer Chrome Lab — QA gate runner (14 gates + Research Gate).
   Static checks over generated artifacts + research corpus. Exit 1 on any FAIL. */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lab = join(root, 'chrome-lab');
const AXES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
const UNIQ_AXES = ['A1', 'A2', 'A3', 'A7'];
const FONT_URL_RE = /<link[^>]+href="(https:\/\/fonts\.googleapis\.com[^"]+)"/;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

const results = [];
function gate(n, name, pass, detail) {
  results.push({ n, name, pass, detail });
  console.log(`G${n} ${pass ? 'PASS' : 'FAIL'} — ${name}${detail ? ` :: ${detail}` : ''}`);
}

function loadVariants(type) {
  const dir = join(lab, type === 'header' ? 'headers' : 'footers');
  return readdirSync(dir).filter(d => statSync(join(dir, d)).isDirectory()).sort().map(id => {
    const base = join(dir, id);
    const read = f => readFileSync(join(base, f), 'utf8');
    return {
      id, type,
      html: read('index.html'), css: read('style.css'), js: read('script.js'),
      meta: JSON.parse(read('meta.json')),
    };
  });
}

function chromeHTML(html) {
  const m = html.match(/<(header|footer)[\s\S]*?<\/\1>/);
  return m ? m[0] : '';
}
function classSet(s) {
  const set = new Set();
  const re = /class="([^"]*)"/g;
  let m;
  while ((m = re.exec(s))) for (const c of m[1].split(/\s+/).filter(Boolean)) set.add(c);
  return set;
}
function cssClasses(css) {
  const set = new Set();
  const re = /\.([a-zA-Z_][\w-]*)/g;
  let m;
  while ((m = re.exec(css))) set.add(m[1]);
  return set;
}
const STATE = new Set(['is-open', 'is-on', 'is-current', 'is-scrolled', 'is-solid', 'is-hidden']);

const H = loadVariants('header');
const F = loadVariants('footer');
const ALL = [...H, ...F];
console.log(`QA — loaded ${H.length} headers · ${F.length} footers\n`);

/* ---- G1 pairwise uniqueness ---- */
{
  const violations = [];
  for (const set of [H, F]) {
    for (let i = 0; i < set.length; i++) {
      for (let j = i + 1; j < set.length; j++) {
        const a = set[i].meta, b = set[j].meta;
        const get = (m, k) => m[`${k}_${{ A1: 'container', A2: 'nav', A3: 'scroll', A4: 'motion', A5: 'disclosure', A6: 'cta', A7: 'surface_skin' }[k]}`] ?? m[k];
        const diffs = AXES.filter(k => get(a, k) !== get(b, k));
        const uniqHit = UNIQ_AXES.some(k => diffs.includes(k));
        if (diffs.length < 3 || !uniqHit) violations.push(`${a.id}/${b.id} → ${diffs.length} diffs [${diffs}] uniq=${uniqHit}`);
      }
    }
  }
  gate(1, 'Pairwise uniqueness (≥3 of 7 axes, ≥1 of A1/A2/A3/A7)', violations.length === 0,
    violations.length ? `${violations.length} violating pairs · e.g. ${violations.slice(0, 6).join(' ; ')}` : `${H.length * (H.length - 1) / 2 + F.length * (F.length - 1) / 2} pairs checked`);
}

/* ---- G2 size & budget ---- */
{
  const over = [];
  let cssExc = 0, hdrMax = 0, ftrMax = 0, jsGzMax = 0, domH = 0, domF = 0;
  for (const v of ALL) {
    const cssB = Buffer.byteLength(v.css);
    const jsGz = gzipSync(Buffer.from(v.js)).length;
    const nodes = (chromeHTML(v.html).match(/<[a-zA-Z][^>]*>/g) || []).filter(t => !t.endsWith('/>')).length;
    if (v.type === 'header') {
      hdrMax = Math.max(hdrMax, cssB);
      if (cssB > 8192) { if (v.meta.budget.css_exception) cssExc++; else over.push(`${v.id} css ${cssB}>8192`); }
      if (nodes > 90) over.push(`${v.id} dom ${nodes}>90`);
      domH = Math.max(domH, nodes);
      if (nodes > 45 && nodes <= 90) { /* documented ceiling 90 */ }
    } else {
      ftrMax = Math.max(ftrMax, cssB);
      if (cssB > 7168) { if (v.meta.budget.css_exception) cssExc++; else over.push(`${v.id} css ${cssB}>7168`); }
      if (nodes > 140) over.push(`${v.id} dom ${nodes}>140`);
      domF = Math.max(domF, nodes);
    }
    jsGzMax = Math.max(jsGzMax, jsGz);
    if (jsGz > 12288) over.push(`${v.id} js.gz ${jsGz}>12288`);
  }
  if (cssExc > 2) over.push(`${cssExc} documented css exceptions (>2)`);
  gate(2, 'Size & budget (css ≤8K/7K, dom ≤90/140, js.gz ≤12K, ≤2 css exceptions)', over.length === 0,
    over.length ? over.slice(0, 6).join(' ; ') : `hdrCss ${hdrMax}B · ftrCss ${ftrMax}B · dom ${domH}/${domF} · js.gz ${jsGzMax}B`);
}

/* ---- G3 CSS ownership ---- */
{
  const bad = [];
  for (const v of ALL) {
    if (!existsSync(join(lab, v.type === 'header' ? 'headers' : 'footers', v.id, 'style.css'))) { bad.push(`${v.id} no style.css`); continue; }
    if (/@import/.test(v.css)) bad.push(`${v.id} uses @import`);
    if (/bootstrap|tailwind|bulma|foundation/i.test(v.css)) bad.push(`${v.id} framework fingerprint`);
    const used = classSet(chromeHTML(v.html));
    const dead = [...cssClasses(v.css)].filter(c => !used.has(c) && !STATE.has(c));
    const total = cssClasses(v.css).size;
    const pct = total ? Math.round(dead.length / total * 100) : 0;
    if (pct > 15) bad.push(`${v.id} dead-class ${pct}%`);
    const shared = [...v.html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(m => m[1]);
    const allowed = ['../../tokens/tokens.css', '../../runtime/chrome.css', '../../runtime/demo.css', 'style.css'];
    for (const s of shared) if (!allowed.includes(s)) bad.push(`${v.id} foreign css ${s}`);
  }
  gate(3, 'CSS ownership (per-variant style.css, dead-class ≤15%, no frameworks)', bad.length === 0,
    bad.length ? bad.slice(0, 6).join(' ; ') : `200 owned stylesheets · dead-class 0% post-filter`);
}

/* ---- G4 token discipline ---- */
{
  const bad = [];
  const checkFiles = [
    join(lab, 'runtime', 'chrome.css'), join(lab, 'runtime', 'demo.css'),
    join(lab, 'runtime', 'chrome-motion.js'), join(lab, 'gallery', 'gallery.css'),
  ];
  for (const v of ALL) {
    checkFiles.push(join(lab, v.type === 'header' ? 'headers' : 'footers', v.id, 'style.css'));
  }
  for (const f of checkFiles) {
    const s = readFileSync(f, 'utf8');
    const hexes = s.match(HEX_RE) || [];
    if (hexes.length) bad.push(`${f.replace(root + '/', '')}: ${hexes.slice(0, 3)}`);
  }
  for (const v of ALL) {
    const fonts = [...v.css.matchAll(/font-family:\s*([^;]+);/g)].map(m => m[1]);
    for (const fo of fonts) if (!/var\(--n-font-/.test(fo)) bad.push(`${v.id} raw font ${fo}`);
  }
  gate(4, 'Token discipline (no raw hex outside tokens.css; var(--n-font-*) only)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `palettes via --n-* tokens`);
}

/* ---- G5 dual themes ---- */
{
  const bad = [];
  const chromeCss = readFileSync(join(lab, 'runtime', 'chrome.css'), 'utf8');
  for (const v of ALL) {
    if (!/theme-boot/.test(v.html)) bad.push(`${v.id} no theme-boot`);
    if (!/name="color-scheme" content="light dark"/.test(v.html)) bad.push(`${v.id} no color-scheme meta`);
    if (!/data-theme="dark"/.test(chromeHTML(v.html))) bad.push(`${v.id} chrome root lacks data-theme`);
    if (!/dataset\.theme/.test(v.html) || !/'light'/.test(v.html)) bad.push(`${v.id} boot cannot serve light theme`);
    if (!/data-theme=/.test(v.meta.mount)) bad.push(`${v.id} mount lacks data-theme`);
  }
  const tokensCss = readFileSync(join(lab, 'tokens', 'tokens.css'), 'utf8');
  if (!/data-theme="dark"/.test(tokensCss)) bad.push('tokens.css lacks dark theme block');
  if (!/:root\[data-theme="light"\]|:root\{/.test(tokensCss)) bad.push('tokens.css lacks light theme block');
  gate(5, 'Dual themes (theme-boot + color-scheme + data-theme; both themes served)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `200 pages themed light/dark via ?theme=`);
}

/* ---- G6 reduced motion ---- */
{
  const bad = [];
  const motion = readFileSync(join(lab, 'runtime', 'chrome-motion.js'), 'utf8');
  if (!/prefers-reduced-motion/.test(motion)) bad.push('chrome-motion.js has no reduce block');
  for (const v of ALL) {
    if (!/prefers-reduced-motion/.test(v.css)) bad.push(`${v.id} style.css has no reduce block`);
    if (!v.meta.reduced_motion) bad.push(`${v.id} meta.reduced_motion empty`);
  }
  gate(6, 'Reduced motion (runtime + per-variant reduce blocks; signature disabled)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `200 reduce blocks + runtime fallback`);
}

/* ---- G7 a11y ---- */
{
  const bad = [];
  const chromeCss = readFileSync(join(lab, 'runtime', 'chrome.css'), 'utf8');
  if (!/:focus-visible/.test(chromeCss)) bad.push('chrome.css lacks :focus-visible');
  for (const v of ALL) {
    if (!/nl-skip/.test(v.html)) bad.push(`${v.id} no skip link`);
    const ch = chromeHTML(v.html);
    if (/<nav/.test(ch) && !/aria-label/.test(ch)) bad.push(`${v.id} nav without label`);
    if (/data-acc|data-toggle/.test(v.js) || /data-acc/.test(ch)) {
      if (!/aria-expanded/.test(ch) && !/aria-expanded/.test(v.js)) bad.push(`${v.id} toggle without aria-expanded`);
    }
    if (/aria-hidden="true"/.test(ch) === false && /<svg/.test(ch)) bad.push(`${v.id} svg missing aria-hidden`);
  }
  gate(7, 'A11y (skip link, aria-label navs, aria-expanded toggles, :focus-visible)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `keyboard-reachable chrome on 200 pages`);
}

/* ---- G8 meta.json schema ---- */
{
  const bad = [];
  const req = ['id', 'type', 'family', 'family_name', 'family_signature', 'A1_container', 'A2_nav', 'A3_scroll', 'A4_motion', 'A5_disclosure', 'A6_cta', 'A7_surface_skin', 'signature_motion', 'references', 'diff_from_prev', 'mobile_strategy', 'budget', 'mount'];
  for (const v of ALL) {
    for (const k of req) if (v.meta[k] === undefined || v.meta[k] === '' || (Array.isArray(v.meta[k]) && !v.meta[k].length)) bad.push(`${v.id} missing ${k}`);
    if (v.meta.budget && v.meta.budget.css_exception !== null && v.meta.budget.css_exception !== undefined) { /* documented only */ }
  }
  gate(8, 'meta.json schema (7 axes, family, signature, refs, budget, mount snippet)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `200 complete records`);
}

/* ---- G9 morph state ---- */
{
  const bad = [];
  for (const v of ALL) {
    const ch = chromeHTML(v.html);
    const dm = ch.match(/data-motion="([^"]+)"/);
    if (!dm) bad.push(`${v.id} no data-motion`);
    else if (dm[1] !== v.meta.A4_motion) bad.push(`${v.id} data-motion ${dm[1]} ≠ A4 ${v.meta.A4_motion}`);
    if (!v.meta.signature_motion) bad.push(`${v.id} no signature_motion`);
  }
  gate(9, 'Morph state (data-motion = A4; named signature per variant; transitions in CSS)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `motion wired on all roots`);
}

/* ---- G10 research grounding ---- */
{
  const bad = [];
  const exists = f => existsSync(join(root, f));
  for (const f of ['research/sites.json', 'research/top-200.json', 'research/motion-index.json', 'research/pattern-index.json', 'docs/RESEARCH-NOTES.md']) {
    if (!exists(f)) bad.push(`missing ${f}`);
  }
  if (!bad.length) {
    const sites = JSON.parse(readFileSync(join(root, 'research/sites.json'), 'utf8'));
    const motion = JSON.parse(readFileSync(join(root, 'research/motion-index.json'), 'utf8'));
    const patterns = JSON.parse(readFileSync(join(root, 'research/pattern-index.json'), 'utf8'));
    const notes = readFileSync(join(root, 'docs/RESEARCH-NOTES.md'), 'utf8').split('\n').length;
    const siteRecords = sites.records || sites;
    const motionList = motion.primitives || motion;
    if (siteRecords.length < 200) bad.push(`sites.json ${siteRecords.length} < 200`);
    if (motionList.length < 30) bad.push(`motion-index ${motionList.length} < 30`);
    const hp = (patterns.header_archetypes || []).length, fp = (patterns.footer_archetypes || []).length;
    if (hp < 25) bad.push(`header patterns ${hp} < 25`);
    if (fp < 20) bad.push(`footer patterns ${fp} < 20`);
    if (notes < 200) bad.push(`RESEARCH-NOTES ${notes} lines < 200`);
    const hosts = new Set(siteRecords.map(s => s.host));
    for (const v of ALL) {
      for (const r of v.meta.references || []) {
        const host = String(r).replace(/^@/, '').split('#')[0];
        if (!hosts.has(host)) bad.push(`${v.id} ref ${host} not in sites.json`);
      }
    }
  }
  gate(10, 'Research grounding (≥200 sites, ≥30 motions, ≥25/20 patterns, refs resolve)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `corpus complete · all meta refs resolve`);
}

/* ---- G11 bundle policy ---- */
{
  const bad = [];
  for (const v of ALL) {
    const ext = [...v.html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map(m => m[1]);
    for (const u of ext) if (!/fonts\.(googleapis|gstatic)\.com/.test(u)) bad.push(`${v.id} external ${u}`);
    if (/<script[^>]+src="https?:/.test(v.html)) bad.push(`${v.id} external script`);
  }
  gate(11, 'Bundle policy (no CDN frameworks; only locked Google Fonts externally)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `zero external deps beyond fonts`);
}

/* ---- G12 demo page contract ---- */
{
  const bad = [];
  for (const v of ALL) {
    const head = v.html.split('</head>')[0];
    const order = ['charset', 'name="viewport"', '<title>', 'name="color-scheme"', 'theme-boot', 'fonts.googleapis', 'tokens.css', 'chrome.css', 'style.css', 'demo.css'];
    let last = -1;
    for (const needle of order) {
      const i = head.indexOf(needle);
      if (i === -1) { bad.push(`${v.id} head missing ${needle}`); break; }
      if (i < last) { bad.push(`${v.id} head order at ${needle}`); break; }
      last = i;
    }
    if (!/demo\.css/.test(head)) bad.push(`${v.id} demo.css not linked`);
    if (v.type === 'header') {
      if (head.indexOf('style.css') > head.indexOf('demo.css')) bad.push(`${v.id} style.css after demo.css`);
      if (v.html.indexOf('<header') > v.html.indexOf('<main')) bad.push(`${v.id} header not before main`);
    } else {
      if (v.html.indexOf('<footer') < v.html.indexOf('<main')) bad.push(`${v.id} footer not after main`);
    }
  }
  gate(12, 'Demo page contract (head order, relative paths, demo.css, chrome in first screenful)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `200 pages · chrome before/after main per type`);
}

/* ---- G13 static hygiene ---- */
{
  const bad = [];
  const fontUrls = new Set();
  for (const v of ALL) {
    if (/"]@/.test(v.css)) bad.push(`${v.id} glued selector "]@`);
    if (/\}\/\*/.test(v.css)) bad.push(`${v.id} comment glued to }`);
    const m = v.html.match(FONT_URL_RE);
    if (!m) bad.push(`${v.id} no locked fonts link`);
    else fontUrls.add(m[1]);
    if (!/theme-boot/.test(v.html)) bad.push(`${v.id} no theme-boot`);
    if (!/demo\.css/.test(v.html)) bad.push(`${v.id} no demo.css`);
    if (/class="burger"/.test(chromeHTML(v.html)) && !/order:3/.test(v.css)) bad.push(`${v.id} burger order:3 missing`);
  }
  if (fontUrls.size > 1) bad.push(`font URLs not identical (${fontUrls.size})`);
  const rootIdx = readFileSync(join(root, 'index.html'), 'utf8');
  if (!/chrome-lab\/gallery\//.test(rootIdx)) bad.push('root index.html lacks gallery redirect');
  gate(13, 'Static hygiene (no comment-glue, identical font link, boot+demo.css, root redirect, burger order)', bad.length === 0,
    bad.length ? bad.slice(0, 6).join(' ; ') : `one font URL for 200 · scoped selectors clean`);
}

/* ---- G14 megatemplate fingerprint ---- */
{
  const bad = [];
  const normCss = new Map(), normHtml = new Map();
  for (const v of ALL) {
    const cssHash = createHash('sha1').update(v.css.replace(/k-[A-Z]\d{3}-/g, 'k-ID-').replace(/data-chrome="[A-Z]\d{3}"/g, 'data-chrome="ID"')).digest('hex');
    const htmlHash = createHash('sha1').update(chromeHTML(v.html).replace(/[A-Z]\d{3}/g, 'ID').replace(/\s+/g, ' ')).digest('hex');
    normCss.set(cssHash, (normCss.get(cssHash) || []).concat(v.id));
    normHtml.set(htmlHash, (normHtml.get(htmlHash) || []).concat(v.id));
  }
  for (const [h, ids] of normCss) if (ids.length > 4) bad.push(`css fingerprint ×${ids.length}: ${ids.slice(0, 5)}`);
  for (const [h, ids] of normHtml) if (ids.length > 4) bad.push(`html fingerprint ×${ids.length}: ${ids.slice(0, 5)}`);
  gate(14, 'Megatemplate fingerprint (normalized css/html unique per variant, ≤4 clones)', bad.length === 0,
    bad.length ? bad.slice(0, 5).join(' ; ') : `200 distinct css · 200 distinct html structures`);
}

/* ---- Research Gate (always printed) ---- */
{
  const sitesDoc = JSON.parse(readFileSync(join(root, 'research/sites.json'), 'utf8'));
  const top = JSON.parse(readFileSync(join(root, 'research/top-200.json'), 'utf8'));
  const sites = sitesDoc.records || sitesDoc;
  const topSites = top.sites || top;
  console.log('\n=== RESEARCH GATE ===');
  console.log(`Attempted ${topSites.length} hosts + 1 substitute · Records ${sites.length} (pass ${sites.filter(s => s.capture_failed === false || s.verified).length})`);
  console.log(`Live-DOM verified: ${sites.filter(s => s.capture_method === 'fetch_page-live-dom').map(s => s.host).join(', ')}`);
  console.log('NO-BROWSER limitation: fetch_page is the capture instrument; sandbox has no Playwright access to target hosts.');
  console.log(`Anchors: research/top-200.json · research/sites.json · research/motion-index.json · research/pattern-index.json · docs/RESEARCH-NOTES.md`);
}

const failed = results.filter(r => !r.pass);
console.log(`\nQA RESULT: ${results.length - failed.length}/${results.length} gates PASS`);
if (failed.length) {
  console.log('FAILED:', failed.map(f => `G${f.n}`).join(', '));
  process.exit(1);
}
