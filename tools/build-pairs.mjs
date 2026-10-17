// Builds chrome-lab/: assets, 20 pairs (header.html, footer.html, index.html, pair.json) and the gallery.
// Run from the repo root:  node tools/build-pairs.mjs
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, BOOT, JS_THEME } from './pairs/kit.mjs';
import A from './pairs/a.mjs';
import B from './pairs/b.mjs';
import C from './pairs/b2.mjs';
import D from './pairs/d.mjs';
import { gallery } from './pairs/gallery.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lab = join(root, 'chrome-lab');
const pairs = [...A, ...B, ...C, ...D];
const write = (p, s) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, s); };

// ---- assets: real logos copied byte-for-byte; mark-only = bird/nest/dot paths cut from the real SVG
for (const t of ['light', 'dark']) copyFileSync(join(root, `logo-full-${t}.svg`), join(lab, 'assets', `logo-full-${t}.svg`));
for (const t of ['light', 'dark']) {
  const src = readFileSync(join(root, `logo-full-${t}.svg`), 'utf8');
  const paths = src.match(/<path [^>]*\/>/g);
  const MARK = [0, 1, 2, 6, 14, 15]; // bird (3), teal dot, nest swoosh (2) — everything left of the "N"
  write(join(lab, 'assets', `logo-mark-${t}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535 544" width="535" height="544"><g transform="translate(0,544) scale(0.1,-0.1)">${MARK.map((i) => paths[i]).join('')}</g></svg>\n`);
}

const skip = '<a class="skip" href="#main">Skip to content</a>';
const sample = (tall) => `
<main class="demo${tall ? ' demo--tall' : ''}" id="main">
  <p class="eyebrow">FIG · PORTAL</p>
  <h1>Product studio + client portal.</h1>
  <p>Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
  <p>₹4,28,500 payments · ₹4.2L milestone · Payouts cleared 1/3</p>
</main>`;
const uniq = (a) => [...new Set(a.filter(Boolean).map((s) => s.trim()))].join('\n');
const page = ({ title, p, css, body, js }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${title}</title>
<script>${BOOT}</script>
<style>${css}</style>
</head>
<body>
${body}
<script>${js}</script>
</body>
</html>
`;
const tidy = (s) => s.replace(/\n{3,}/g, '\n\n').trim();

for (const p of pairs) {
  const dir = join(lab, 'pairs', `${p.id}-${p.slug}`);
  const css = (...parts) => '\n' + tidy([BASE, p.vars, p.extra, p.shared, ...parts].filter(Boolean).join('\n')) + '\n';
  const h = p.hhtml(), f = p.fhtml(), fp = p.fhtml({ paired: true });
  // in the combined page, drop footer rules that are byte-identical to a header rule (single-line rules only)
  const hl = new Set(p.hcss.split('\n').map((l) => l.trim()).filter((l) => l.endsWith('}')));
  const fcssPair = p.fcss.split('\n').filter((l) => !hl.has(l.trim())).join('\n');
  const hero = p.hero ? p.hero() : '';
  write(join(dir, 'header.html'), page({
    title: `${p.id} ${p.name} — header`, p, css: css(p.hcss),
    body: `${skip}\n${hero ? '' : ''}${h}\n${p.hdemo ? p.hdemo() : sample(true)}`,
    js: '\n' + uniq([JS_THEME, p.hjs()]) + '\n',
  }));
  write(join(dir, 'footer.html'), page({
    title: `${p.id} ${p.name} — footer`, p, css: css(p.fcss, p.fpage),
    body: `${skip}\n${p.fdemo ? p.fdemo() : sample(false)}\n${f}`,
    js: '\n' + uniq([JS_THEME, p.fjs()]) + '\n',
  }));
  write(join(dir, 'index.html'), page({
    title: `${p.id} ${p.name} — header + footer pair`, p, css: css(p.hcss, fcssPair, p.ppage),
    body: `${skip}\n${h}\n${p.hdemo ? p.hdemo() : sample(true)}\n${fp}`,
    js: '\n' + uniq([JS_THEME, p.hjs(), p.fjs()]) + '\n',
  }));
  write(join(dir, 'pair.json'), JSON.stringify({
    id: p.id, name: p.name, skin: p.skin, header: p.header, footer: p.footer,
    signature_motion: p.motion, references: p.refs, dna: p.dna,
  }, null, 2) + '\n');
}
write(join(lab, 'index.html'), gallery(pairs));
console.log(`built ${pairs.length} pairs`);
