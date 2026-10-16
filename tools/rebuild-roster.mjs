#!/usr/bin/env node
/* Rebuild tools/lib/variants.mjs from the last successful generate artifacts:
   per-variant meta.json (axes, mobile, sig, family data) plus
   output fingerprints for the opts flags emitters actually read. */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lab = join(root, 'chrome-lab');

function load(id, type) {
  const base = join(lab, type === 'header' ? 'headers' : 'footers', id);
  return {
    meta: JSON.parse(readFileSync(join(base, 'meta.json'), 'utf8')),
    html: readFileSync(join(base, 'index.html'), 'utf8'),
    css: readFileSync(join(base, 'style.css'), 'utf8'),
    js: readFileSync(join(base, 'script.js'), 'utf8'),
  };
}

/* family-specific opts fingerprints (only keys emitters read) */
function optsFor(v) {
  const { meta, html, css, js } = v;
  const fam = parseInt(meta.family.slice(1), 10);
  const isH = meta.type === 'header';
  const o = {};
  const has = (s, t) => s.includes(t);
  const nOf = (s, re) => (s.match(re) || []).length;

  if (isH) {
    switch (fam) {
      case 1: if (has(html, 'class="progress"')) o.progress = true; break;
      case 3: {
        if (has(html, 'Free milestone escrow')) o.util = 'announce';
        else if (has(html, 'INR ₹ · en-IN')) o.util = 'currency';
        else if (has(html, 'Reading · Pricing guide')) o.util = 'progress';
        else o.util = 'status';
        break;
      }
      case 4: {
        const m = css.match(/repeat\((\d), minmax\(0,1fr\)\)/);
        if (m) o.megaCols = parseInt(m[1], 10);
        if (has(html, 'mega__tile')) o.tile = true;
        break;
      }
      case 5: {
        if (has(html, 'data-magnet')) o.magnet = true;
        if (has(js, '--sx') || has(css, 'var(--sx')) o.spotlight = true;
        break;
      }
      case 6: {
        if (has(html, '2 new')) o.badge = true;
        const m = css.match(/data-scrolled="true"\] \.h-in\{ min-height:(\d+)px/);
        if (m && parseInt(m[1], 10) !== 56) o.shrinkTo = parseInt(m[1], 10);
        break;
      }
      case 8: if (has(css, 'font-size:26px')) o.bigWm = true; break;
      case 9: if (has(html, 'data-rotate')) o.rotate = true; break;
      case 10: {
        if (has(html, 'drawer__h">MORE')) o.nested = true;
        if (has(html, 'INR</span>') || has(html, 'globe') && has(html, 'INR')) o.locale = true;
        break;
      }
      case 11: {
        const tabs = nOf(html, /<a [^>]*class="h-tab/g);
        if (tabs) o.tabs = tabs;
        break;
      }
      case 12: {
        const seg = [...html.matchAll(/role="tab"[^>]*>([^<]+)</g)].map(m => m[1]);
        if (seg.length) o.seg = seg.join('|');
        if (has(html, 'data-rotate')) o.rotate = true;
        break;
      }
      case 13: if (has(html, '+ 12 more')) o.marquee = true; break;
      case 14: {
        if (has(html, 'h-chips')) o.intents = true;
        if (has(html, 'class="progress"')) o.progress = true;
        break;
      }
      case 16: {
        if (has(html, 'data-rotate')) o.rotate = true;
        if (has(html, 'class="badge"')) o.badge = true;
        break;
      }
      case 17: {
        const steps = nOf(html, /class="step"/g);
        if (steps) o.steps = steps;
        if (has(html, 'class="progress"')) o.progress = true;
        break;
      }
      case 18: {
        if (has(html, 'data-rotate')) o.rotate = true;
        if (has(html, 'data-count-to')) o.count = true;
        break;
      }
      case 19: {
        if (has(css, 'font-size:26px')) o.bigWm = true;
        if (has(html, 'animation-direction:reverse')) o.dual = true;
        if (has(html, 'class="progress"')) o.progress = true;
        break;
      }
      case 20: {
        if (has(html, 'section-label')) o.sectionLabel = true;
        if (has(html, 'class="ring"')) o.ring = true;
        break;
      }
      case 21: {
        const crumb = [...html.matchAll(/class="crumb"[^>]*>|class="crumb__l">([^<]+)</g)].map(m => m[1]).filter(Boolean);
        if (crumb.length) o.crumb = crumb.join(' / ');
        const tabs = nOf(html, /<a [^>]*class="h-tab/g);
        if (tabs) o.tabs = tabs;
        break;
      }
      case 22: {
        const seg = [...html.matchAll(/role="tab"[^>]*>([^<]+)</g)].map(m => m[1]);
        if (seg.length) o.seg = seg.join('|');
        if (has(html, 'class="progress"')) o.progress = true;
        break;
      }
      case 23: {
        if (has(html, 'data-magnet')) o.magnet = true;
        if (has(html, 'data-rotate')) o.rotate = true;
        if (has(html, 'Intake open') && has(html, 'class="pill"') && !has(html, 'data-rotate')) o.badge = true;
        break;
      }
      case 24: {
        if (has(html, 'section-label')) o.spotlight = true;
        if (has(html, 'class="progress"')) o.progress = true;
        if (has(html, 'data-magnet')) o.magnet = true;
        break;
      }
      case 25: {
        if (!has(css, '.pill{') && !has(css, '.pill {')) o.grain = true;
        break;
      }
    }
  } else {
    const totop = has(html, 'data-totop');
    if (totop) o.totop = true;
    switch (fam) {
      case 1: {
        if (has(html, 'class="soc"')) o.social = true;
        if (has(html, 'data-count-to')) o.count = true;
        break;
      }
      case 2: {
        if (nOf(html, /Nestlancer/g) >= 6 && has(html, 'wm-xl__t')) o.marquee = true;
        break;
      }
      case 3: if (has(html, 'data-count-to')) o.count = true; break;
      case 4: {
        if (has(html, 'data-magnet')) o.magnet = true;
        if (has(css, 'steps(12)')) o.grain = true;
        if (has(html, 'data-count-to')) o.count = true;
        break;
      }
      case 5: {
        if (has(html, 'f-band')) o.band = true;
        if (has(html, 'class="locale"')) o.locale = true;
        if (nOf(html, /class="fcol"/g) >= 4) o.cols = 6; else o.cols = 5;
        break;
      }
      case 6: if (nOf(html, /facc__item/g) >= 4) o.nested = true; break;
      case 7: {
        if (has(html, 'class="pill"')) o.status = true;
        if (has(html, 'Copy link')) o.toast = true;
        break;
      }
      case 8: {
        if (has(html, 'class="soc"')) o.social = true;
        if (has(html, 'class="locale"')) o.locale = true;
        if (has(html, 'data-count-to')) o.count = true;
        break;
      }
      case 9: {
        if (has(html, 'class="pill"')) o.status = true;
        if (has(html, 'class="soc"')) o.social = true;
        break;
      }
      case 10: {
        if (has(html, 'data-count-to')) o.count = true;
        if (has(html, 'class="soc"')) o.social = true;
        break;
      }
      case 12: {
        if (has(html, 'animation-direction:reverse') || nOf(html, /wm-xl__t/g) && has(html, 'Nestlancer') && nOf(html, /<span class="wm-xl__t">/g) >= 1) {
          if (has(html, 'Nestlancer<span class="wm__dot">.</span> Nestlancer')) o.marquee = true;
        }
        if (has(html, 'class="ticker"')) o.ticker = true;
        if (has(html, 'data-magnet')) o.magnet = true;
        break;
      }
      case 13: {
        if (has(html, 'data-count-to')) o.count = true;
        if (has(html, 'class="pill"')) o.status = true;
        break;
      }
      case 14: {
        if (has(html, 'class="locale"')) o.locale = true;
        if (has(html, 'qr__box')) o.qr = true;
        break;
      }
      case 15: if (has(html, 'class="soc"')) o.social = true; break;
      case 16: if (has(html, 'class="pill"')) o.status = true; break;
      case 17: if (has(html, 'class="soc"')) o.social = true; break;
      case 19: {
        if (has(html, 'data-count-to')) o.count = true;
        if (has(html, 'class="pill"')) o.status = true;
        break;
      }
      case 20: {
        if (has(html, 'class="pill"')) o.status = true;
        if (has(html, 'class="soc"')) o.social = true;
        break;
      }
    }
    delete o.totop;
    if (totop) o.totop = true;
  }
  return o;
}

function build(type) {
  const dir = join(lab, type === 'header' ? 'headers' : 'footers');
  const ids = readdirSync(dir).sort();
  const fams = new Map();
  for (const id of ids) {
    const v = load(id, type);
    const famKey = v.meta.family;
    if (!fams.has(famKey)) fams.set(famKey, {
      n: parseInt(famKey.slice(1), 10),
      name: v.meta.family_name,
      sig: v.meta.family_signature,
      skin: v.meta.A7_surface_skin,
      A2: v.meta.A2_nav,
      cite: v.meta.references,
      patterns: v.meta.pattern_refs,
      variants: [],
    });
    fams.get(famKey).variants.push({
      A1: v.meta.A1_container, A3: v.meta.A3_scroll, A4: v.meta.A4_motion,
      A5: v.meta.A5_disclosure, A6: v.meta.A6_cta,
      mobile: v.meta.mobile_strategy, sig: v.meta.signature_motion,
      opts: optsFor(v),
    });
  }
  return [...fams.values()].sort((a, b) => a.n - b.n);
}

const headers = build('header');
const footers = build('footer');
const count = s => s.reduce((a, f) => a + f.variants.length, 0);
if (count(headers) !== 100 || count(footers) !== 100) {
  console.error('rebuild: unexpected counts', count(headers), count(footers));
  process.exit(1);
}

function fmtObj(x) {
  const opts = Object.keys(x.opts).length
    ? `{ ${Object.entries(x.opts).map(([k, val]) => `${k}: ${typeof val === 'string' ? `'${val}'` : val}`).join(', ')} }`
    : '{}';
  return `      { A1: '${x.A1}', A3: '${x.A3}', A4: '${x.A4}', A5: '${x.A5}', A6: '${x.A6}', mobile: '${x.mobile}', sig: '${x.sig}', opts: ${opts} },`;
}
function fmtFam(f) {
  return `  {
    n: ${f.n}, name: '${f.name.replace(/'/g, "\\'")}', sig: '${f.sig.replace(/'/g, "\\'")}',
    skin: '${f.skin}', A2: '${f.A2}',
    cite: [${f.cite.map(c => `'${c}'`).join(', ')}], patterns: [${f.patterns.map(p => `'${p}'`).join(', ')}],
    variants: [
${f.variants.map(fmtObj).join('\n')}
    ],
  },`;
}

const out = `/* 200-variant roster — 7 axes per variant (§3). Regenerate with tools/rebuild-roster.mjs.
   Headers: 25 families × 4. Footers: 20 families × 5.
   A1 container · A2 nav (family) · A3 scroll · A4 motion · A5 disclosure · A6 CTA · A7 skin (family). */
export const HEADER_FAMILIES = [
${headers.map(fmtFam).join('\n')}
];

export const FOOTER_FAMILIES = [
${footers.map(fmtFam).join('\n')}
];
`;
writeFileSync(join(root, 'tools/lib/variants.mjs'), out);
console.log(`rebuild-roster: wrote ${count(headers)} header + ${count(footers)} footer variants`);
