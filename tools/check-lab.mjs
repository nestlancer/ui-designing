// Static verification for the locked lab. The sandbox has no browser, so this is the
// honest substitute for prompt §8: structure, links, asset paths, budgets, CSS collisions.
// usage: node tools/check-lab.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chrome } from './chrome-approved.mjs';
import { COMBOS } from './lock.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const LAB = path.join(ROOT, 'chrome-lab');
const fail = [], warn = [];
const ok = (cond, msg) => { if (!cond) fail.push(msg); return cond; };
const soft = (cond, msg) => { if (!cond) warn.push(msg); };

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const abs = path.join(d, e.name);
    if (e.isDirectory()) walk(abs);
    else if (e.name.endsWith('.html')) pages.push(abs);
  }
})(LAB);

const classesIn = css => new Set([...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.([A-Za-z][\w-]*)/g)].map(m => m[1]));
const styleOf = html => (html.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];
const bodyOf = html => html.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<head>[\s\S]*?<\/head>/, '');

for (const abs of pages) {
  const rel = path.relative(ROOT, abs);
  const html = fs.readFileSync(abs, 'utf8');
  const body = bodyOf(html);
  const style = styleOf(html);

  // 1 · zero external requests (the SVG xmlns is a namespace, not a fetch)
  ok(!/src=["']https?:|href=["']https?:|@import|url\(["']?https?:/.test(html), `${rel}: external request`);
  ok(!/cdn|googleapis|jsdelivr|unpkg|tailwind|bootstrap/i.test(html), `${rel}: framework/CDN reference`);
  ok(!/[\u{1F000}-\u{1FAFF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2764}]/u.test(body), `${rel}: emoji in markup`);

  // 2 · landmarks: one banner + one contentinfo where the page carries both halves
  const banners = (body.match(/role="banner"/g) || []).length;
  const infos = (body.match(/role="contentinfo"/g) || []).length;
  const kind = rel.endsWith('index.html') && !rel.includes('approved') && !rel.includes('combos') ? 'gallery'
    : /combos\//.test(rel) ? 'combo' : /header\.html$/.test(rel) ? 'header' : /footer\.html$/.test(rel) ? 'footer' : 'pair';
  const want = kind === 'header' ? [1, 0] : kind === 'footer' ? [0, 1] : kind === 'gallery' ? [0, 0] : [1, 1];
  ok(banners === want[0] && infos === want[1], `${rel}: ${banners} banner / ${infos} contentinfo, expected ${want[0]}/${want[1]}`);
  ok(/class="skip-link" href="#main"/.test(body), `${rel}: no skip link targeting #main`);

  // 3 · duplicate ids and unresolved local refs
  const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  ok(new Set(ids).size === ids.length, `${rel}: duplicate id(s) ${ids.filter((v, i) => ids.indexOf(v) !== i).join(', ')}`);
  for (const m of body.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(#|\/|mailto:|data:)/.test(u)) continue;
    const target = path.resolve(path.dirname(abs), u.split('?')[0]);
    ok(fs.existsSync(target), `${rel}: broken local path ${u}`);
  }

  // 4 · budgets (prompt §7.2)
  if (kind !== 'gallery') ok(html.length <= 16 * 1024, `${rel}: ${(html.length / 1024).toFixed(1)} KB > 16 KB`);
  const domNodes = (body.match(/<[a-z][^>]*>/g) || []).length;
  if (kind !== 'gallery') soft(domNodes <= 132, `${rel}: ${domNodes} DOM nodes over budget`);
  soft(!/outline\s*:\s*none/.test(style), `${rel}: outline:none is banned`);

  // 5 · dead CSS — every class the page's own ruleset defines must appear in its markup
  const used = new Set([...body.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)));
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  [...scripts.matchAll(/['"]?\.?(is-[\w-]+)/g)].forEach(m => used.add(m[1]));  // state classes are added by JS
  const own = [...cssBlocksOf(rel, kind)];
  const dead = new Set();
  for (const css of own) for (const c of classesIn(css)) if (!used.has(c)) dead.add(c);
  soft(dead.size === 0, `${rel}: unused class(es) ${[...dead].join(', ')}`);

  // 6 · combos: a selector defined by both halves is cross-talk unless it is a deliberate bridge
  if (kind === 'combo') {
    const c = COMBOS.find(x => rel.includes(x.slug));
    const h = chrome.find(p => p.id === c.header), f = chrome.find(p => p.id === c.footer);
    const shared = [...classesIn(h.header.css)].filter(cl => classesIn(f.footer.css).has(cl) && cl !== 'container');
    ok(shared.length === 0, `${rel}: header and footer both style ${shared.join(', ')} — collision`);
    if (c.bridge) ok(style.includes(c.bridge.split('{')[0].trim()), `${rel}: declared bridge CSS is not in the page`);
  }
}

// the CSS the page was authored from (excludes the shared base, which several classes rely on)
function* cssBlocksOf(rel, kind) {
  if (kind === 'combo') {
    const c = COMBOS.find(x => rel.includes(x.slug));
    yield chrome.find(p => p.id === c.header).header.css;
    yield chrome.find(p => p.id === c.footer).footer.css;
    yield `.stage .stage__tag`;
    return;
  }
  const id = (rel.match(/P\d\d/) || [])[0];
  if (!id) return;
  const p = chrome.find(c => c.id === id);
  if (kind === 'header' || kind === 'pair') yield p.header.css;
  if (kind === 'footer' || kind === 'pair') yield p.footer.css;
}

// 7 · data files and generator integrity
for (const rel of ['index.html']) ok(fs.existsSync(path.join(LAB, rel)), `missing ${rel}`);
for (const p of chrome) {
  const j = path.join(LAB, 'approved', p.slug, 'chrome.json');
  ok(fs.existsSync(j), `missing metadata ${p.id}`);
  ok(fs.existsSync(path.join(LAB, 'approved', p.slug, 'header.html')) === !!p.header, `${p.id}: header.html does not match the lock`);
  ok(fs.existsSync(path.join(LAB, 'approved', p.slug, 'footer.html')) === !!p.footer, `${p.id}: footer.html does not match the lock`);
  try { JSON.parse(fs.readFileSync(j, 'utf8')); } catch { fail.push(`${p.id}: invalid JSON`); }
}
for (const c of COMBOS) {
  const j = path.join(LAB, 'combos', c.slug, 'combo.json');
  try { const o = JSON.parse(fs.readFileSync(j, 'utf8')); ok(o.header.startsWith(c.header) && o.footer.startsWith(c.footer), `${c.id}: combo.json half mismatch`); }
  catch { fail.push(`${c.id}: invalid combo.json`); }
}
// rejected concepts must not survive anywhere in the lab
const labText = pages.map(p => fs.readFileSync(p, 'utf8')).join('\n');
for (const id of ['P03', 'P06', 'P07', 'P08', 'P09', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20'])
  ok(!new RegExp(`pairs/${id}|${id}-[a-z]`).test(labText), `chrome-lab still references rejected ${id}`);

console.log(`checked ${pages.length} html file(s) in chrome-lab/`);
console.log(`failures: ${fail.length}${fail.length ? '\n  - ' + fail.join('\n  - ') : ''}`);
console.log(`warnings: ${warn.length}${warn.length ? '\n  - ' + warn.join('\n  - ') : ''}`);
process.exit(fail.length ? 1 : 0);
