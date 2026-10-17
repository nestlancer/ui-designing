// Builds the LOCKED lab: the approved chrome pages, the five header+footer combos, and the gallery.
// This replaces build-pairs.mjs (v4, 20 pairs of free exploration). Nothing here researches or
// invents: it renders exactly what tools/chrome-approved.mjs holds, selected by tools/lock.mjs.
//
// usage: node tools/build-lab.mjs
import fs from 'node:fs';
import path from 'node:path';
import { TOKENS, BASE, FRAME_CSS, THEME_JS, FRAME_JS } from './lib.mjs';
import { chrome } from './chrome-approved.mjs';
import { REVIEW, COMBOS, UNBUILT_COMBOS } from './lock.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const dir = p => path.join(ROOT, 'chrome-lab', p);
const byId = Object.fromEntries(chrome.map(c => [c.id, c]));

// Every page lives at chrome-lab/<group>/<slug>/<file>.html — two levels below chrome-lab/,
// so the shared assets folder is always reached with ../../assets/. Normalised here so the
// chrome can be re-hosted at another depth without editing its markup.
const DEPTH = 2;
const retarget = (html, depth = DEPTH) => html.replace(/(\.\.\/)+assets\//g, '../'.repeat(depth) + 'assets/');

const page = ({ title, css, body, js = [] }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${THEME_JS}${FRAME_JS}
<style>
${TOKENS}
${BASE}
${FRAME_CSS}
${css.trim()}
</style>
</head>
<body>
${body.trim()}
${js.join('\n')}
${AUTOSIZE}
</body>
</html>`;

// Framed pages report their own height so a gallery card fits the chrome exactly.
const AUTOSIZE = `<script>
if(document.documentElement.classList.contains('is-framed')){
  var send=function(){try{parent.postMessage({nlh:document.documentElement.scrollHeight},'*')}catch(e){}};
  addEventListener('load',send);addEventListener('resize',send);send();setTimeout(send,400);
}
</script>`;

const skip = `<a class="skip-link" href="#main">Skip to content</a>`;
const sampleHTML = `<main class="sample" id="main">
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
const write = (rel, text) => {
  const abs = path.join(ROOT, 'chrome-lab', rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, text);
  return rel;
};

/* ───────────────────────── 1. prune: only approved chrome may exist ───────────────────────── */
// v4 shipped chrome-lab/pairs/P01…P20. The review kept 6 halves of those 40 files;
// the folder is deleted outright so a rejected pattern can never be re-linked by accident.
const removed = [];
for (const obsolete of ['pairs', 'approved', 'combos']) {
  const abs = dir(obsolete);
  if (fs.existsSync(abs)) { fs.rmSync(abs, { recursive: true, force: true }); removed.push('chrome-lab/' + obsolete + '/'); }
}

/* ───────────────────────── 2. approved chrome pages ───────────────────────── */
const approved = [];
for (const p of chrome) {
  const base = `approved/${p.slug}`;
  const hjs = p.header?.js || [], fjs = p.footer?.js || [];

  if (p.header) write(`${base}/header.html`, page({
    title: `${p.id} ${p.name} — approved header`,
    css: p.header.css + '\n' + SAMPLE_CSS + '\n' + NOTE_CSS,
    body: skip + '\n' + retarget(p.header.html) + '\n' + sampleHTML + '\n' + NOTE,
    js: hjs
  }));
  if (p.footer) write(`${base}/footer.html`, page({
    title: `${p.id} ${p.name} — approved footer`,
    css: `.spacer{height:38vh}\n` + p.footer.css + '\n' + NOTE_CSS,
    body: skip + '\n<div class="spacer" aria-hidden="true"></div>\n' + retarget(p.footer.html) + '\n' + NOTE,
    js: fjs
  }));
  // a whole-pair preview only survives when BOTH halves were picked
  if (p.header && p.footer) write(`${base}/index.html`, page({
    title: `${p.id} ${p.name} — approved pair`,
    css: p.header.css + '\n' + SAMPLE_CSS + '\n' + p.footer.css,
    body: skip + '\n' + retarget(p.header.html) + '\n' + sampleHTML + '\n' + retarget(p.footer.html),
    js: [...hjs, ...fjs]
  }));

  approved.push(write(`${base}/chrome.json`, JSON.stringify({
    id: p.id, name: p.name, skin: p.skin, status: 'approved',
    review: p.verdict, header: p.headerNote || null, footer: p.footerNote || null,
    cut: p.cut || null, signature_motion: p.signature, dna: p.dna,
    axes: p.axis, references: p.refs,
    files: [p.header && 'header.html', p.footer && 'footer.html',
      p.header && p.footer && 'index.html'].filter(Boolean)
  }, null, 1) + '\n'));
}

/* ───────────────────────── 3. the five combo pages — header + footer, nothing else ───────────────── */
const STAGE_CSS = `/* The stage is not page content. It is the gap that lets a sticky or floating bar
   be seen behaving, plus a caption naming the pairing. Hidden with ?frame=1. */
.stage{min-height:60vh;display:grid;place-items:center;padding:56px 20px}
.stage__tag{font:500 11px/1.7 var(--mono);letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);text-align:center;margin:0;max-width:34ch}
.stage__tag b{color:var(--teal-hover);font-weight:600}`;
const stageHTML = c => `<main class="stage" id="main">
  <p class="stage__tag">${c.id} · ${byId[c.header].name} header <b>+</b> ${byId[c.footer].name} footer</p>
</main>`;

const combos = [];
for (const c of COMBOS) {
  const h = byId[c.header], f = byId[c.footer];
  const css = [h.header.css, STAGE_CSS, f.footer.css, c.bridge].filter(Boolean).join('\n');
  const body = [skip, retarget(h.header.html), stageHTML(c), retarget(f.footer.html)].join('\n');
  combos.push(write(`combos/${c.slug}/index.html`, page({
    title: `${c.id} ${c.name} — ${h.name} header + ${f.name} footer`,
    css, body, js: [...(h.header.js || []), ...(f.footer.js || [])]
  })));
  combos.push(write(`combos/${c.slug}/combo.json`, JSON.stringify({
    id: c.id, name: c.name, header: `${h.id} ${h.name}`, footer: `${f.id} ${f.name}`,
    skin: `${h.skin} header over ${f.skin} footer`, signature_motion: h.signature,
    bridge: c.bridge.replace(/\s+/g, ' ').trim() || 'none — both halves already share the rails',
    rationale: c.rationale, tension: c.tension,
    built_from: 'MANUAL-REVIEW-CHART.md selection · no new research'
  }, null, 1) + '\n'));
}

/* ───────────────────────── 4. gallery ───────────────────────── */
// chrome heights at 1440 (header rows) / full slab (footers); the autosize script corrects them live
const CARD_H = { P01: [76, 432], P02: [76, null], P04: [92, 452], P05: [null, 452] };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const ticks = id => id === REVIEW.favourite ? '✓✓' : '✓';
const frame = (src, h) => `<iframe title="${esc(src)}" src="${src}${src.includes('?') ? '&' : '?'}frame=1" style="height:${h}px" loading="lazy" tabindex="-1"></iframe>`;

const chromeCard = (p, half) => {
  const [h, f] = CARD_H[p.id];
  const height = half === 'header' ? h : f;
  return `<article class="card" id="${p.id}-${half}">
  <header class="card__head">
    <span class="card__id">${p.id}</span>
    <span class="card__name">${esc(p.name)}</span>
    <span class="card__skin">${p.skin}</span>
    <span class="card__tick">${ticks(p.id)} ${half}</span>
    <a class="card__open" href="approved/${p.slug}/${half}.html">open ↗</a>
  </header>
  ${frame(`approved/${p.slug}/${half}.html`, height)}
  <p class="card__sig">${esc(half === 'header' ? p.headerNote : p.footerNote)}</p>
</article>`;
};
const comboCard = c => {
  const h = byId[c.header], f = byId[c.footer];
  const [hh] = CARD_H[c.header]; const [, ff] = CARD_H[c.footer];
  return `<article class="card card--combo" id="${c.id}">
  <header class="card__head">
    <span class="card__id">${c.id}</span>
    <span class="card__name">${esc(c.name)}</span>
    <span class="card__skin">${h.skin} · ${f.skin}</span>
    <span class="card__pair">${c.header} <b>+</b> ${c.footer}</span>
    <a class="card__open" href="combos/${c.slug}/index.html">open ↗</a>
  </header>
  ${frame(`combos/${c.slug}/index.html`, hh + ff)}
  <p class="card__sig">${esc(c.rationale)}</p>
</article>`;
};

const gallery = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nestlancer Header &amp; Footer Lab — locked chrome + 5 combos</title>
${THEME_JS}
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
.intro{padding:28px 0 0;max-width:70ch}
.intro p{margin:10px 0 0;font-size:15px}
.grid{display:grid;gap:28px;padding:20px 0 8px;grid-template-columns:1fr}
@media(min-width:900px){.grid{grid-template-columns:1fr 1fr}}
section.block{padding-top:26px}
.block__head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:4px}
.block__head h2{font-size:15px;color:var(--ink);margin:0;letter-spacing:-.01em}
.block__head span{font:500 11px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--card);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column}
.card__head{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line);flex-wrap:wrap}
.card__id{font:600 12px/1 var(--mono);color:var(--teal-hover);background:var(--teal-soft);border-radius:var(--chip);padding:6px 8px}
.card__name{font:600 14px/1 var(--font);color:var(--ink)}
.card__skin{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:var(--pill);padding:5px 9px}
.card__tick{font:600 11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--teal-hover)}
.card__pair{font:500 11.5px/1 var(--mono);color:var(--muted)}
.card__pair b{color:var(--teal-hover)}
.card__open{margin-left:auto;font:500 13px/1 var(--font);color:var(--teal-hover);text-decoration:none}
.card__open:hover{text-decoration:underline}
.card iframe{border:0;width:100%;display:block;background:var(--bg)}
[data-theme="dark"] .card iframe{background:#0b1720}
.card__sig{font:500 11.5px/1.5 var(--mono);color:var(--muted);padding:10px 16px 12px;margin:0;border-top:1px solid var(--line)}
.card--combo{border-color:var(--teal-soft)}
.ledger{display:grid;gap:14px;padding:16px 0 8px;font-size:13.5px}
@media(min-width:900px){.ledger{grid-template-columns:1fr 1fr}}
.ledger div{border:1px solid var(--line);border-radius:var(--card);padding:16px 18px;background:var(--surface)}
.ledger h3{margin:0 0 8px;font:600 12px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink)}
.ledger code{font-family:var(--mono);font-size:12.5px;color:var(--teal-hover)}
footer.lab__foot{border-top:1px solid var(--line);padding:20px 0 40px;font-size:13px;color:var(--muted)}
footer.lab__foot code{font-family:var(--mono)}
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="lab__bar"><div class="container lab__row">
  <h1>Header &amp; Footer Lab — locked chrome</h1>
  <span class="lab__meta">${REVIEW.headers.length} headers · ${REVIEW.footers.length} footers · ${COMBOS.length} combos · reviewed ${REVIEW.date}</span>
  <span class="spacer"></span>
  <span class="tswitch" role="group" aria-label="Preview theme">
    <button id="tLight" aria-pressed="true">Light</button>
    <button id="tDark" aria-pressed="false">Dark</button>
  </span>
</div></div>
<main class="container" id="main">
  <div class="intro">
    <p class="eyebrow">FIG · LOCKED</p>
    <p>Twenty researched pairs went into the review; ${REVIEW.headers.length + REVIEW.footers.length} halves came out, ticked in
      <code>MANUAL-REVIEW-CHART.md</code>. The rejected chrome has been deleted, so every page below is an approved pattern —
      and every combo below is two approved patterns meeting on one page. No new research, no new concepts.</p>
  </div>

  <section class="block" aria-labelledby="h-headers">
    <div class="block__head"><h2 id="h-headers">Approved headers</h2><span>as reviewed</span></div>
    <div class="grid">
${REVIEW.headers.map(id => chromeCard(byId[id], 'header')).join('\n')}
    </div>
  </section>

  <section class="block" aria-labelledby="h-footers">
    <div class="block__head"><h2 id="h-footers">Approved footers</h2><span>as reviewed</span></div>
    <div class="grid">
${REVIEW.footers.map(id => chromeCard(byId[id], 'footer')).join('\n')}
    </div>
  </section>

  <section class="block" aria-labelledby="h-combos">
    <div class="block__head"><h2 id="h-combos">${COMBOS.length} new pages — approved header + approved footer</h2><span>chrome only, no page content</span></div>
    <div class="grid">
${COMBOS.map(comboCard).join('\n')}
    </div>
  </section>

  <section class="block" aria-labelledby="h-notes">
    <div class="ledger">
      <div>
        <h3 id="h-notes">Still unbuilt combos</h3>
        <p>${UNBUILT_COMBOS.map(x => `<code>${x}</code>`).join(' · ')} — same two commands, when you want them side by side.</p>
      </div>
      <div>
        <h3>Rebuild</h3>
        <p><code>node tools/build-lab.mjs</code> then <code>node tools/check-lab.mjs</code>. Files are generated from
        <code>tools/chrome-approved.mjs</code> + <code>tools/lock.mjs</code>; edit those, never the HTML.</p>
      </div>
    </div>
  </section>
</main>
<footer class="lab__foot container">${REVIEW.pairs_removed.length} unselected pairs (P03, P06–P20) and two unselected halves
  (P02 footer, P05 header) were removed from the repo after the review — they live in git at
  <code>f713edf</code> if the client ever wants to revisit one. Tokens from prompt §4.3, real logo files, one inline icon set.</footer>
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
  // chrome pages post their real height while framed — fit each card to it
  addEventListener('message',function(e){
    var d=e.data; if(!d||!d.nlh) return;
    for(var i=0;i<frames.length;i++) if(frames[i].contentWindow===e.source)
      frames[i].style.height=Math.min(1400,Math.max(64,d.nlh))+'px';
  });
  var q=new URLSearchParams(location.search).get('theme');
  if(q==='dark')addEventListener('load',function(){set('dark')});
})();
</script>
</body>
</html>`;

write('index.html', gallery);

/* ───────────────────────── summary ───────────────────────── */
const files = [...approved, ...combos, 'chrome-lab/index.html'];
console.log(`clean slate: ${removed.length ? removed.join(' ') : 'nothing to remove'} — rejected chrome cannot be rebuilt`);
console.log(`approved chrome: ${chrome.length} folders — ${chrome.filter(c => c.header).length} headers, ${chrome.filter(c => c.footer).length} footers`);
console.log(`combos: ${COMBOS.length} pages (${COMBOS.map(c => c.id + ' ' + c.header + '+' + c.footer).join(', ')})`);
console.log(`wrote ${files.length} files`);
