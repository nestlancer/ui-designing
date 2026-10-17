import { NAV, COLS, BLURB, LEGAL, TICKER, ic, logo, themeBtn, list, cols, burger, BURGER_CSS, JS_THEME, jsMenu, jsScrolled } from './kit.mjs';

// ───────────────────────── P06 · Editorial ─────────────────────────
const P06 = {
  id: 'P06', slug: 'editorial', name: 'Editorial', skin: 'editorial',
  refs: ['economist.com', 'pentagram.com'],
  motion: 'Links thicken a 2 px underline from the baseline (140 ms); CTA is plain text with an arrow that slides 4 px',
  header: 'Heavy ink top rule, big logo, small mono dateline, nav row ruled above and below with hairline dividers; text-only CTA.',
  footer: 'Same heavy ink rule on top, columns divided by hairlines, ruled legal row.',
  dna: 'No filled shapes anywhere — only a 4 px ink rule, 1 px hairlines and typography; the CTA is a text link with an arrow in both halves.',
  vars: ':root{--w:1180px}',
  hcss: `
.hd{position:relative;border-top:4px solid var(--ink);background:var(--bg)}
.hd__top{display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:var(--w);margin:0 auto;padding:18px 20px}
.hd__date{display:none;margin:0;font:500 11px/1.4 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.hd__act{display:flex;align-items:center;gap:14px}
.hd__sign{display:none;font-size:14px;font-weight:600;color:var(--ink)}
.hd__nav{display:none;border-top:1px solid var(--ink);border-bottom:1px solid var(--line);background:var(--bg)}
.is-open .hd__nav{display:block}
.hd__list{max-width:var(--w);margin:0 auto;padding:0 20px}
.hd__list a{display:block;padding:14px 0;font-weight:500;border-bottom:1px solid var(--line)}
.hd__list li:last-child a{border-bottom:0}
.txt{display:none;align-items:center;gap:6px;font-weight:600;color:var(--ink)}
.txt .ic{transition:transform .14s ease-out}
.txt:hover .ic{transform:translateX(4px)}
.hd__nav .txt{display:flex;padding:14px 0}
${BURGER_CSS}
@media (min-width:640px){.hd__act .txt{display:inline-flex}.hd__nav .txt{display:none}}
@media (min-width:900px){
  .hd__date{display:block;flex:1}
  .hd__top .logo{order:0}
  .hd__top{display:grid;grid-template-columns:1fr auto 1fr}
  .hd__act{justify-content:flex-end}
  .hd__sign{display:block}
  .burger{display:none}
  .hd__nav{display:block}
  .hd__list{display:flex;justify-content:center;padding:0}
  .hd__list a{padding:13px 22px;font-size:14px;border:0;border-left:1px solid var(--line);background:linear-gradient(var(--ink),var(--ink)) 22px calc(100% - 9px)/0 2px no-repeat;transition:background-size .14s ease-out,color .14s ease-out}
  .hd__list li:last-child a{border-right:1px solid var(--line)}
  .hd__list a:hover,.hd__list a[aria-current]{color:var(--ink);background-size:calc(100% - 44px) 2px}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__top">
    <p class="hd__date">Product studio + client portal</p>
    ${logo({ h: 44 })}
    <div class="hd__act">${themeBtn()}<a class="hd__sign" href="#">Sign in</a><a class="txt" href="#">Start a project ${ic('arrow-right', 16)}</a>${burger('nav')}</div>
  </div>
  <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}<div class="hd__list"><a class="txt" href="#">Start a project ${ic('arrow-right', 16)}</a></div></nav>
</header>`,
  hjs: () => jsMenu('.hd'),
  fcss: `
.ft{border-top:4px solid var(--ink);background:var(--bg)}
.ft__in{max-width:var(--w);margin:0 auto;padding:44px 20px 24px}
.ft__grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line)}
.ft__brand{grid-column:1/-1;padding:28px 0}
.ft__brand p{max-width:36ch;margin:14px 0 0;font-size:15px}
.ft__col{padding:22px 16px 28px 0;border-top:1px solid var(--line)}
.ft__col ul{display:grid;gap:10px}
.ft__col a{font-size:15px;text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:2px;text-underline-offset:5px;transition:text-decoration-color .14s ease-out,color .14s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration-color:var(--ink)}
.ft__bar{display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;justify-content:space-between;padding-top:18px;border-top:1px solid var(--ink);font-size:13px}
.ft__bar p{margin:0}
.ft .txt{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:var(--ink)}
.ft .txt .ic{transition:transform .14s ease-out}
.ft .txt:hover .ic{transform:translateX(4px)}
@media (min-width:900px){
  .ft__grid{grid-template-columns:1.4fr 1fr 1fr 1fr;border-top:0}
  .ft__brand{grid-column:auto;padding:0 28px 0 0}
  .ft__col{padding:0 0 28px 28px;border-top:0;border-left:1px solid var(--line)}
}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 44 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p><a class="txt" href="#">Start a project ${ic('arrow-right', 16)}</a></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P07 · Announce ─────────────────────────
const P07 = {
  id: 'P07', slug: 'announce', name: 'Announcement', skin: 'tint',
  refs: ['stripe.com', 'webflow.com'],
  motion: 'Announcement bar collapses in 220 ms when dismissed and stays dismissed; CTA button lifts on hover',
  header: 'Dismissible teal “Intake open” bar above a mint-tinted nav bar.',
  footer: 'Mint footer opening with a “Ready to ship with clarity?” CTA card, then columns, closed by a teal legal strip.',
  dna: 'Teal strip + mint tint bracket the page: the announcement bar opens it and the teal legal strip closes it; both carry “Intake open”.',
  vars: ':root{--w:1200px}',
  hcss: `
.hd{position:relative}
.ann{display:grid;grid-template-rows:1fr;background:var(--btn);color:#fff;transition:grid-template-rows .22s cubic-bezier(.2,.8,.2,1)}
.ann[hidden]{display:none}
.ann.is-gone{grid-template-rows:0fr}
.ann__row{overflow:hidden}
.ann__in{display:flex;align-items:center;justify-content:center;gap:12px;max-width:var(--w);min-height:44px;margin:0 auto;padding:0 52px 0 16px;font-size:14px;position:relative}
.ann__more{display:none}
@media (min-width:640px){.ann__in{padding:0 52px}.ann__more{display:inline}}
.ann__in p{margin:0}
.ann__in a{display:inline-flex;align-items:center;gap:6px;font-weight:600;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.ann__x{position:absolute;right:6px;top:0;display:grid;place-items:center;width:44px;height:44px;border:0;background:none;color:#fff;cursor:pointer}
.ann :focus-visible{outline-color:#fff}
.hd__bar{background:var(--mint);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--mint);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px 0;font-weight:500}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:4px}
  .hd__list a{padding:8px 12px;font-size:14px;border-radius:var(--chip);transition:background-color .18s ease-out,color .18s ease-out}
  .hd__list a:hover{background:var(--teal-soft);color:var(--ink)}
  .hd__list a[aria-current]{color:var(--ink);background:var(--teal-soft)}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="ann" id="ann"><div class="ann__row"><div class="ann__in">
    <p><strong>Intake open</strong><span class="ann__more"> · fixed-price quotes, milestone-based.</span></p>
    <a href="#">Start a project ${ic('arrow-right', 14)}</a>
    <button type="button" class="ann__x" aria-label="Dismiss announcement">${ic('close', 18)}</button>
  </div></div></div>
  <div class="hd__bar"><div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div></div>
</header>`,
  hjs: () => jsMenu('.hd') + `
(function(){
  var a=document.getElementById('ann'),k='nl-ann-dismissed';
  try{if(localStorage.getItem(k)){a.hidden=true;return;}}catch(e){}
  a.querySelector('.ann__x').addEventListener('click',function(){
    a.classList.add('is-gone');setTimeout(function(){a.hidden=true;},230);
    try{localStorage.setItem(k,'1');}catch(e){}
  });
})();`,
  fcss: `
.ft{background:var(--mint);border-top:1px solid var(--line)}
.ft__in{max-width:var(--w);margin:0 auto;padding:48px 20px 40px}
.cta{display:grid;gap:20px;padding:28px;border:1px solid var(--line);border-radius:var(--card);background:var(--surface)}
.cta h2{margin:0;color:var(--ink);font-size:clamp(24px,3vw,32px);line-height:1.2;letter-spacing:-.02em}
.cta p{margin:6px 0 0;font-size:15px}
.cta__act{display:flex;flex-wrap:wrap;gap:12px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr;margin-top:48px}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;transition:color .18s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.strip{background:var(--btn);color:#fff}
.strip__in{display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;justify-content:space-between;max-width:var(--w);min-height:52px;margin:0 auto;padding:10px 20px;font-size:13px}
.strip p{margin:0}
.strip strong{font-weight:600}
@media (min-width:900px){
  .cta{grid-template-columns:1fr auto;align-items:center;padding:32px 36px}
  .ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}
  .ft__brand{grid-column:auto}
}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <section class="cta" aria-labelledby="cta-h">
      <div><h2 id="cta-h">Ready to ship with clarity?</h2><p>Fixed-price quotes, Razorpay milestones, live Project Hub.</p></div>
      <div class="cta__act"><a class="btn" href="#">Start a project ${ic('arrow-right', 16)}</a><a class="btn btn--ghost" href="#">Preview the portal</a></div>
    </section>
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
  </div>
  <div class="strip"><div class="strip__in"><p>${LEGAL}</p><p><strong>Intake open</strong></p></div></div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P08 · Mega ─────────────────────────
const tiles = [
  ['check', 'Fixed-price quotes', 'Know the number before work starts.'],
  ['rupee', 'Razorpay milestones', 'Pay as each milestone clears.'],
  ['hub', 'Live Project Hub', 'Follow progress in the client portal.'],
];
const P08 = {
  id: 'P08', slug: 'mega', name: 'Mega menu', skin: 'solid',
  refs: ['shopify.com', 'adobe.com'],
  motion: 'Panel fades and slides 8 px in 180 ms; tile icon chips turn teal on hover (both halves)',
  header: '“Product” opens a three-tile mega panel (icon chips) with a portal card; Esc closes and returns focus.',
  footer: 'Value-tile row repeating the panel’s icon chips above a six-column sitemap of every page.',
  dna: 'The same three icon-chip tiles — Fixed-price quotes, Razorpay milestones, Live Project Hub — are the mega panel in the header and the lead row in the footer.',
  vars: ':root{--w:1200px}',
  shared: `
.tiles{display:grid;gap:6px}
.tile{display:grid;grid-template-columns:40px 1fr;gap:4px 14px;align-items:center;padding:14px;border-radius:var(--card);transition:background-color .18s ease-out}
.tile:hover{background:var(--mint)}
.tile__i{grid-row:span 2;display:grid;place-items:center;width:40px;height:40px;border-radius:var(--chip);background:var(--teal-soft);color:var(--teal-hover);transition:background-color .18s ease-out,color .18s ease-out}
.tile:hover .tile__i{background:var(--btn);color:#fff}
.tile b{color:var(--ink);font-size:15px;font-weight:600}
.tile span{font-size:14px;color:var(--body)}`,
  hcss: `
.hd{position:relative;background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;max-height:calc(100vh - 72px);overflow:auto;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list>li>a,.hd__trg{display:flex;align-items:center;gap:6px;width:100%;padding:14px 0;border:0;background:none;font:500 16px/1.4 var(--font);color:var(--body);cursor:pointer;text-align:left}
.hd__trg .ic{transition:transform .18s ease-out}
.hd__trg[aria-expanded="true"] .ic{transform:rotate(180deg)}
.hd__trg[aria-expanded="true"],.hd__list>li>a:hover,.hd__trg:hover{color:var(--ink)}
.mega{display:none;padding:4px 0 10px}
.mega.is-on{display:block}
.mega__card{display:grid;gap:6px;margin-top:6px;padding:16px;border-radius:var(--card);background:var(--surface-2)}
.mega__card p{margin:0;font-size:14px}
.mega__card .btn{justify-self:start;min-height:40px}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;max-height:none;overflow:visible;padding:0;border:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:2px}
  .hd__list>li>a,.hd__trg{width:auto;padding:8px 12px;font-size:14px;border-radius:var(--chip)}
  .hd__list>li>a:hover,.hd__trg:hover{background:var(--surface-2)}
  .mega{position:absolute;left:0;right:0;top:100%;padding:0;border-bottom:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow)}
  .mega.is-on{animation:megain .18s ease-out}
  .mega__in{display:grid;grid-template-columns:repeat(3,1fr) 1.1fr;gap:12px;max-width:var(--w);margin:0 auto;padding:22px 20px 26px}
  .mega .tiles{display:contents}
  .mega__card{margin:0}
  .burger{display:none}
}
@keyframes megain{from{opacity:0;transform:translateY(-8px)}}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">
      <ul class="hd__list">
        <li><button type="button" class="hd__trg" aria-expanded="false" aria-controls="mega">Product ${ic('chevron-down', 16)}</button>
          <div class="mega" id="mega"><div class="mega__in">
            <div class="tiles">${tiles.map(([i, t, d]) => `<a class="tile" href="#"><span class="tile__i">${ic(i, 20)}</span><b>${t}</b><span>${d}</span></a>`).join('')}</div>
            <div class="mega__card"><p class="eyebrow">FIG · PORTAL</p><p>Client portal · live</p><a class="btn" href="#">Preview the portal</a></div>
          </div></div></li>
        ${NAV.slice(1).map((t) => `<li><a href="#">${t}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd') + `
(function(){
  var t=document.querySelector('.hd__trg'),m=document.getElementById('mega');
  function set(o){t.setAttribute('aria-expanded',o);m.classList.toggle('is-on',o);}
  t.addEventListener('click',function(){set(t.getAttribute('aria-expanded')!=='true');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('is-on')){set(false);t.focus();}});
  document.addEventListener('click',function(e){if(!e.target.closest('.hd__nav'))set(false);});
})();`,
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--surface)}
.ft__in{max-width:var(--w);margin:0 auto;padding:40px 20px 24px}
.ft .tiles{padding-bottom:28px;border-bottom:1px solid var(--line)}
.ft__grid{display:grid;gap:32px 20px;grid-template-columns:1fr 1fr;padding-top:36px}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:14px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:10px}
.ft__col a{font-size:14px;transition:color .18s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.ft__bar{margin-top:36px;padding-top:20px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){
  .ft .tiles{grid-template-columns:repeat(3,1fr)}
  .ft__grid{grid-template-columns:1.4fr repeat(5,1fr)}
  .ft__brand{grid-column:auto}
}`,
  fhtml: () => {
    const sm = {
      PRODUCT: ['Project Hub', 'Pricing', 'Services'],
      WORK: ['Portfolio', 'Blog'],
      COMPANY: ['About', 'Contact', 'Start a project'],
      ACCOUNT: ['Sign in', 'Register', 'Verify document'],
      LEGAL: ['Terms', 'Privacy'],
    };
    return `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="tiles">${tiles.map(([i, t, d]) => `<a class="tile" href="#"><span class="tile__i">${ic(i, 20)}</span><b>${t}</b><span>${d}</span></a>`).join('')}</div>
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 36 })}<p>${BLURB}</p></div>
      ${Object.entries(sm).map(([h, l]) => `<nav class="ft__col" aria-label="${h[0] + h.slice(1).toLowerCase()}"><h2 class="eyebrow">${h}</h2>${list('', l).replace('<ul class="">', '<ul>')}</nav>`).join('')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`;
  },
  fjs: () => '',
};

// ───────────────────────── P09 · Search ─────────────────────────
const searchForm = (cls, ph, label, btn) => `
<form class="${cls}" role="search" action="#"><label class="sr" for="${cls}-q">${label}</label>${ic('search', 20)}
  <input id="${cls}-q" type="search" placeholder="${ph}" autocomplete="off"><button class="btn" type="submit">${btn}</button></form>`;
const pillField = `
.field{display:flex;align-items:center;gap:10px;min-width:0;max-width:100%;height:52px;padding:0 6px 0 18px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);color:var(--muted);transition:border-color .16s ease-out,box-shadow .16s ease-out}
.field:focus-within{border-color:var(--teal);box-shadow:0 0 0 3px var(--teal-soft)}
.field input{flex:1;min-width:0;height:100%;border:0;background:none;color:var(--ink);font:400 15px/1 var(--font)}
.field input:focus{outline:0}
.field input::placeholder{color:var(--muted)}
.field .btn{min-height:40px;padding:0 18px}`;
const P09 = {
  id: 'P09', slug: 'search', name: 'Search-forward', skin: 'tint',
  refs: ['airbnb.com', 'medium.com'],
  motion: 'Field ring grows in 160 ms on focus; the footer’s submit button morphs into a tick (220 ms)',
  header: 'A wide pill search field is the centre of the bar; nav links sit in a quiet second row.',
  footer: 'Newsletter-led: the same 52 px pill field (with an email input) dominates, link columns sit beneath.',
  dna: 'One 52 px pill field with a teal button is the hero element of both halves — search at the top, email capture at the bottom — on the same mint tint.',
  vars: ':root{--w:1200px}',
  shared: pillField,
  hcss: `
.hd{position:relative;background:var(--mint);border-bottom:1px solid var(--line)}
.hd__top{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;max-width:var(--w);margin:0 auto;padding:14px 20px}
.hd__top .field{order:3;flex:1 1 100%}
.hd__act{display:flex;align-items:center;gap:10px;margin-left:auto}
.hd__sign,.hd__cta{display:none}
.hd__nav{display:none;border-top:1px solid var(--line);background:var(--mint)}
.is-open .hd__nav{display:block}
.hd__list{max-width:var(--w);margin:0 auto;padding:6px 20px 14px}
.hd__list a{display:block;padding:12px 0;font-weight:500}
${BURGER_CSS}
@media (min-width:900px){
  .hd__top{flex-wrap:nowrap}
  .hd__top .field{order:0;flex:1 1 auto;max-width:560px;margin:0 auto}
  .hd__sign{display:block;font-weight:600;font-size:14px;color:var(--ink)}
  .hd__cta{display:inline-flex}
  .burger{display:none}
  .hd__nav{display:block}
  .hd__list{display:flex;justify-content:center;gap:4px;padding:0 20px 10px}
  .hd__list a{padding:6px 14px;border-radius:var(--pill);font-size:14px;transition:background-color .16s ease-out,color .16s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--surface);color:var(--ink)}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__top">
    ${logo({ h: 34 })}
    ${searchForm('field', 'Search projects, posts, pricing…', 'Search Nestlancer', 'Search')}
    <div class="hd__act">${themeBtn()}<a class="hd__sign" href="#">Sign in</a><a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
  <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
</header>`,
  hjs: () => jsMenu('.hd') + `
document.querySelector('form.field').addEventListener('submit',function(e){e.preventDefault();});`,
  fcss: `
.ft{background:var(--mint);border-top:1px solid var(--line)}
.ft__in{max-width:var(--w);margin:0 auto;padding:56px 20px 24px}
.news{display:grid;grid-template-columns:minmax(0,1fr);gap:22px;max-width:640px;margin:0 auto;text-align:center}
.news h2{margin:0;color:var(--ink);font-size:clamp(26px,3.4vw,36px);line-height:1.15;letter-spacing:-.02em}
.news p{margin:0}
.news .field{text-align:left}
.news .btn[data-ok]{background:var(--live)}
.news__note{font-size:13px;color:var(--muted)}
.ft__grid{display:grid;gap:32px;grid-template-columns:1fr 1fr;margin-top:56px;padding-top:36px;border-top:1px solid var(--line)}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:14px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:10px}
.ft__col a{font-size:15px;transition:color .16s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.ft__bar{margin-top:36px;padding-top:20px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <section class="news" aria-labelledby="news-h">
      <p class="eyebrow">BLOG</p>
      <h2 id="news-h">New posts, straight to your inbox.</h2>
      <form class="field" action="#"><label class="sr" for="news-q">Email address</label>${ic('mail', 20)}
        <input id="news-q" type="email" placeholder="you@company.com" autocomplete="email" required><button class="btn" type="submit">Subscribe</button></form>
      <p class="news__note" id="news-note" aria-live="polite">No spam. Unsubscribe any time.</p>
    </section>
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 36 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => `
(function(){
  var f=document.querySelector('.news form'),b=f.querySelector('.btn'),n=document.getElementById('news-note');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    b.setAttribute('data-ok','');b.innerHTML='${ic('check', 18).replace(/'/g, "\\'")} Subscribed';
    n.textContent='Thanks — you are on the list.';
  });
})();`,
};

// ───────────────────────── P10 · Auth ─────────────────────────
const P10 = {
  id: 'P10', slug: 'auth', name: 'Auth minimal', skin: 'editorial',
  refs: ['stripe.com', 'github.com'],
  motion: 'Round icon button rotates its glyph 20° on hover (160 ms)',
  header: 'Logo only, top-left, with one circular outline icon button top-right — the login / register chrome.',
  footer: 'One quiet row: logo mark on the left, legal line, three small links.',
  dna: 'Both halves are a single transparent row on the canvas with nothing but the logo and quiet text — chrome that disappears behind a form.',
  vars: ':root{--w:1200px}',
  hcss: `
.hd{background:transparent}
.hd__in{display:flex;align-items:center;justify-content:space-between;max-width:var(--w);height:88px;margin:0 auto;padding:0 24px}
.hd .iconbtn .ic{transition:transform .16s ease-out}
.hd .iconbtn:hover .ic{transform:rotate(20deg)}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">${logo({ h: 36 })}${themeBtn()}</div>
</header>`,
  hjs: () => '',
  fcss: `
.ft{background:transparent}
.ft__in{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:var(--w);margin:0 auto;padding:28px 24px;font-size:13px;text-align:center}
.ft__in p{margin:0}
.ft__links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 16px}
.ft__links a{padding:8px 0;color:var(--muted);transition:color .16s ease-out}
.ft__links a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px}
@media (min-width:760px){.ft__in{flex-direction:row;justify-content:space-between;text-align:left;padding:0 24px;min-height:88px}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    ${logo({ h: 32, mark: true })}
    <p>${LEGAL}</p>
    <nav class="ft__links" aria-label="Legal">${COLS.LEGAL.map((t) => `<a href="#">${t}</a>`).join('')}</nav>
  </div>
</footer>`,
  fjs: () => '',
};

export default [P06, P07, P08, P09, P10];
