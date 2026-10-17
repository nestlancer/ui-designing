// Emits plain, readable pair files — never one giant stylesheet.
// usage: node tools/build-pairs.mjs [P01 P02 …]   (default: all)
import fs from 'node:fs';
import path from 'node:path';
import { TOKENS, BASE, FRAME_CSS, THEME_JS, FRAME_JS, icon } from './lib.mjs';
import { pairsA } from './pairs-a.mjs';
import { pairsB } from './pairs-b.mjs';
import { pairsC } from './pairs-c.mjs';
import { pairsD } from './pairs-d.mjs';

const ALL = [...pairsA, ...pairsB, ...pairsC, ...pairsD];
const only = process.argv.slice(2);
const ROOT = new URL('..', import.meta.url).pathname;
const dir = p => path.join(ROOT, 'chrome-lab', p);

const page = ({ title, css, body, js = [] }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${THEME_JS}${FRAME_JS}
<style>
${TOKENS}
${BASE}${css ? '\n' + css : ''}
</style>
</head>
<body>
${body}
${js.join('\n')}
</body>
</html>`;

const skip = `<a class="skip-link" href="#main">Skip to content</a>`;
const sampleHTML = extra => `<main class="sample" id="main">
  <section class="sample__hero">
    <p class="eyebrow">FIG · WORK</p>
    <h1>Ready to ship with clarity?</h1>
    <p class="sample__blurb">Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
    <div class="sample__actions">
      <a class="btn btn--primary" href="/contact">Start a project</a>
      <a class="btn btn--ghost" href="/login">Preview the portal</a>
    </div>
  </section>
</main>`;
const SAMPLE_CSS = `.sample__hero{text-align:center;padding:88px 20px 120px}
.sample__hero .eyebrow{margin-bottom:14px}
.sample__hero h1{font-size:clamp(30px,5vw,44px);line-height:1.12;letter-spacing:-.02em;color:var(--ink);margin:0 auto;max-width:16ch}
.sample__blurb{max-width:52ch;margin:18px auto 28px;font-size:16px}
.sample__actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}`;
const NOTE = `<p class="page-note">Standalone demo — open <code>index.html</code> in this folder for header and footer together.</p>`;
const NOTE_CSS = `.page-note{text-align:center;color:var(--muted);font-size:13px;padding:18px 20px 40px}
.page-note code{font-family:var(--mono)}`;

let built = 0;
for (const p of ALL) {
  if (only.length && !only.includes(p.id)) continue;
  const pd = dir('pairs/' + p.slug);
  fs.mkdirSync(pd, { recursive: true });
  const hjs = p.header.js || [], fjs = p.footer.js || [];

  // standalone header page
  fs.writeFileSync(path.join(pd, 'header.html'), page({
    title: `${p.id} ${p.name} — header`,
    css: p.header.css + '\n' + SAMPLE_CSS + '\n' + NOTE_CSS,
    body: skip + '\n' + p.header.html + '\n' + sampleHTML() + '\n' + NOTE,
    js: hjs
  }));
  // standalone footer page
  fs.writeFileSync(path.join(pd, 'footer.html'), page({
    title: `${p.id} ${p.name} — footer`,
    css: `.spacer{height:38vh}\n` + p.footer.css + '\n' + NOTE_CSS,
    body: skip + `\n<div class="spacer" aria-hidden="true"></div>\n` + p.footer.html + '\n' + NOTE,
    js: fjs
  }));
  // pair page: header + sample + footer, both stylesheets
  fs.writeFileSync(path.join(pd, 'index.html'), page({
    title: `${p.id} ${p.name} — pair`,
    css: p.header.css + '\n' + SAMPLE_CSS + '\n' + p.footer.css,
    body: skip + '\n' + p.header.html + '\n' + sampleHTML() + '\n' + p.footer.html,
    js: [...hjs, ...fjs]
  }));
  fs.writeFileSync(path.join(pd, 'pair.json'), JSON.stringify({
    id: p.id, name: p.name, skin: p.skin, header: p.headerNote, footer: p.footerNote,
    signature_motion: p.signature, references: p.refs, dna: p.dna, axis: p.axis
  }, null, 1) + '\n');
  built++;
}
console.log(`built ${built} pair folder(s)`);

/* ───────────────────────── gallery ───────────────────────── */
// per-pair strip heights for the gallery iframes (px at 1440/390-friendly widths)
const CARD_H = {
  P01:[76,432], P02:[76,486], P03:[114,540], P04:[92,452], P05:[76,452],
  P06:[118,470], P07:[122,600], P08:[76,500], P09:[140,600], P10:[76,132],
  P11:[142,560], P12:[76,500], P13:[76,600], P14:[68,660], P15:[68,470],
  P16:[176,330], P17:[76,436], P18:[76,560], P19:[116,560], P20:[132,600]
};
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function buildGallery(list){
  const cards = list.map(p => {
    const [h,f] = CARD_H[p.id];
    const q = t => `?frame=1${t?`&theme=${t}`:''}`;
    return `<article class="card" id="${p.id}">
  <header class="card__head">
    <span class="card__id">${p.id}</span>
    <span class="card__name">${p.name}</span>
    <span class="card__skin">${p.skin}</span>
    <a class="card__open" href="pairs/${p.slug}/index.html">open pair ↗</a>
  </header>
  <iframe title="${esc(p.id)} ${esc(p.name)} header" src="pairs/${p.slug}/header.html${q('')}" style="height:${h}px" loading="lazy" tabindex="-1"></iframe>
  <iframe title="${esc(p.id)} ${esc(p.name)} footer" src="pairs/${p.slug}/footer.html${q('')}" style="height:${f}px" loading="lazy" tabindex="-1"></iframe>
  <p class="card__sig">${esc(p.signature)}</p>
</article>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nestlancer Header &amp; Footer Lab — 20 pairs</title>
<script>
(function(){try{var p=new URLSearchParams(location.search).get('theme');
if(p!=='dark'&&p!=='light')p=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
document.documentElement.setAttribute('data-theme',p);}catch(e){}})();
</script>
<style>
${TOKENS}
${BASE}
.lab__bar{position:sticky;top:0;z-index:50;background:var(--surface);border-bottom:1px solid var(--line)}
.lab__row{display:flex;align-items:center;gap:14px;min-height:60px;flex-wrap:wrap;padding-block:8px}
.lab__row h1{font-size:16px;letter-spacing:-.01em;color:var(--ink);margin:0}
.lab__row .spacer{flex:1}
.lab__meta{font:500 11px/1.5 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.tswitch{display:inline-flex;border:1px solid var(--line);border-radius:var(--pill);overflow:hidden}
.tswitch button{border:0;background:transparent;font:600 13px/1 var(--font);color:var(--muted);padding:10px 16px;min-height:40px;cursor:pointer}
.tswitch button[aria-pressed="true"]{background:var(--btn);color:#fff}
.grid{display:grid;gap:28px;padding:28px 0 64px;grid-template-columns:1fr}
@media(min-width:900px){.grid{grid-template-columns:1fr 1fr}}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--card);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column}
.card__head{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line)}
.card__id{font:600 12px/1 var(--mono);color:var(--teal-hover);background:var(--teal-soft);border-radius:var(--chip);padding:6px 8px}
.card__name{font:600 14px/1 var(--font);color:var(--ink)}
.card__skin{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:var(--pill);padding:5px 9px}
.card__open{margin-left:auto;font:500 13px/1 var(--font);color:var(--teal-hover);text-decoration:none}
.card__open:hover{text-decoration:underline}
.card iframe{border:0;width:100%;display:block;background:var(--bg)}
[data-theme="dark"] .card iframe{background:#0b1720}
.card__sig{font:500 11.5px/1.5 var(--mono);color:var(--muted);padding:10px 16px 12px;margin:0;border-top:1px solid var(--line)}
footer.lab__foot{border-top:1px solid var(--line);padding:20px 0 40px;font-size:13px;color:var(--muted)}
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="lab__bar"><div class="container lab__row">
  <h1>Header &amp; Footer Lab</h1>
  <span class="lab__meta">20 pairs · ${new Date().toISOString().slice(0,10)}</span>
  <span class="spacer"></span>
  <span class="tswitch" role="group" aria-label="Preview theme">
    <button id="tLight" aria-pressed="true">Light</button>
    <button id="tDark" aria-pressed="false">Dark</button>
  </span>
</div></div>
<main class="container" id="main">
  <div class="grid">
${cards}
  </div>
</main>
<footer class="lab__foot container">Research-backed concept lab for nestlancer.com — tokens from §4.3, real logo files, one inline icon set. Built with a generator (<code>tools/</code>); every pair folder stands alone.</footer>
<script>
(function(){
  var root=document.documentElement,frames=[].slice.call(document.querySelectorAll('iframe'));
  function strip(u){return u.split('&theme=')[0].split('?theme=')[0]}
  function set(t){
    root.setAttribute('data-theme',t);
    document.getElementById('tLight').setAttribute('aria-pressed',t==='light');
    document.getElementById('tDark').setAttribute('aria-pressed',t==='dark');
    frames.forEach(function(f){f.src=strip(f.src)+(strip(f.src).indexOf('?')>=0?'&':'?')+'theme='+t});
  }
  document.getElementById('tLight').addEventListener('click',function(){set('light')});
  document.getElementById('tDark').addEventListener('click',function(){set('dark')});
  var q=new URLSearchParams(location.search).get('theme');
  // wait for the initial frames to finish so the theme swap is a clean navigation
  if(q==='dark')addEventListener('load',function(){set('dark')});
})();
</script>
</body>
</html>`;
}
fs.writeFileSync(dir('index.html'), buildGallery(ALL.filter(p=>!only.length || only.includes(p.id))));
console.log('gallery written');
