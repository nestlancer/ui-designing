import { NAV, COLS, BLURB, LEGAL, ic, logo, themeBtn, list, cols, burger, BURGER_CSS, JS_THEME, jsMenu, jsScrolled } from './kit.mjs';

const underline = (sel) => `
${sel}{background:linear-gradient(var(--teal),var(--teal)) 0 100%/0 2px no-repeat;transition:background-size .18s ease-out,color .18s ease-out}
${sel}:hover{background-size:100% 2px;color:var(--ink)}`;

// ───────────────────────── P01 · Classic ─────────────────────────
const P01 = {
  id: 'P01', slug: 'classic', name: 'Classic', skin: 'solid',
  refs: ['nytimes.com', 'stripe.com'],
  motion: 'Teal underline draws left→right in 180 ms on every link (header and footer)',
  header: 'Logo left, 7 inline links, theme toggle, Sign in, teal pill; hairline underneath (the repo baseline).',
  footer: 'Brand + blurb and three link columns on the same 1200 px grid, hairline, legal row.',
  dna: 'Same 1200 px container, 1 px hairlines and the same sliding teal underline on links — the footer is the header’s row stretched into columns.',
  vars: ':root{--w:1200px}',
  hcss: `
.hd{position:relative;background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px 0;font-weight:500}
.hd__list a[aria-current]{color:var(--ink)}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__sign,.hd__cta{display:none}
.hd__mcta{margin-top:12px;width:100%}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:6px}
  .hd__list a{padding:8px 12px;font-size:14px}
  ${underline('.hd__list a')}
  .hd__sign{display:block;font-weight:600;font-size:14px;color:var(--ink);padding:8px 10px}
  .burger,.hd__mcta{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">
      ${list('hd__list', NAV, 'Product')}
      <a class="btn hd__mcta" href="#">Start a project ${ic('arrow-right', 16)}</a>
    </nav>
    <div class="hd__act">
      ${themeBtn()}
      <a class="hd__sign" href="#">Sign in</a>
      <a class="btn hd__cta" href="#">Start a project</a>
      ${burger('nav')}
    </div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd'),
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--bg)}
.ft__in{max-width:var(--w);margin:0 auto;padding:56px 20px 28px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;padding:2px 0}
${underline('.ft__col a')}
.ft__bar{margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){
  .ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}
  .ft__brand{grid-column:auto}
}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 40 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P02 · Glass ─────────────────────────
const P02 = {
  id: 'P02', slug: 'glass', name: 'Glass', skin: 'glass',
  refs: ['linear.app', 'vercel.com'],
  motion: 'Glass engages after 8 px of scroll: blur + hairline fade in over 240 ms; links get a soft mint pill',
  header: 'Sticky translucent bar; blur and hairline appear only after scrolling.',
  footer: 'Same columns floating on the mesh wash, with the legal row in a glass capsule.',
  dna: 'Translucent surface + 14 px blur + hairline on top of the mesh wash, pill-shaped hovers in both halves.',
  vars: ':root{--w:1160px;--glass:color-mix(in srgb,var(--surface) 72%,transparent)}',
  extra: 'body{background:linear-gradient(180deg,var(--mesh-1),var(--bg) 70%) fixed}',
  hcss: `
.hd{position:sticky;top:0;z-index:50;border-bottom:1px solid transparent;transition:background-color .24s linear,border-color .24s linear,box-shadow .24s linear}
.hd[data-scrolled]{background:var(--surface);border-bottom-color:var(--line);box-shadow:0 1px 0 var(--line)}
@supports (backdrop-filter:blur(2px)){
  .hd[data-scrolled]{background:var(--glass);-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4)}
}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:68px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:12px;right:12px;top:calc(100% + 6px);padding:10px;border:1px solid var(--line);border-radius:var(--card);background:var(--surface);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px;border-radius:var(--chip);font-weight:500}
.hd__act{display:flex;align-items:center;gap:10px;margin-left:auto}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex;min-height:40px}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:2px}
  .hd__list a{padding:8px 14px;border-radius:var(--pill);font-size:14px;transition:background-color .18s ease-out,color .18s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--mint);color:var(--ink)}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 32 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd') + jsScrolled('.hd'),
  fcss: `
.ft{padding:56px 20px 24px;background:linear-gradient(180deg,transparent,var(--mesh-2))}
.ft__in{max-width:var(--w);margin:0 auto}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:36ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:4px}
.ft__col a{display:inline-block;padding:6px 12px;margin-left:-12px;border-radius:var(--pill);font-size:15px;transition:background-color .18s ease-out,color .18s ease-out}
.ft__col a:hover{background:var(--surface);color:var(--ink)}
.ft__bar{margin-top:44px;padding:14px 22px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);font-size:13px;text-align:center}
@supports (backdrop-filter:blur(2px)){.ft__bar{background:var(--glass);-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4)}}
.ft__bar p{margin:0}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P03 · Ink band ─────────────────────────
const strip = `
<div class="strip">
  <div class="strip__in">
    <p class="strip__status"><span class="dot" aria-hidden="true"></span>Intake open</p>
    <div class="strip__r">
      <span class="strip__live">Client portal · live</span>
      <div class="seg" role="group" aria-label="Currency"><button type="button" aria-pressed="true">INR ₹</button><button type="button" aria-pressed="false">USD $</button></div>
    </div>
  </div>
</div>`;
const stripCss = `
.strip{background:var(--band);color:var(--band-text);border-bottom:2px solid var(--teal)}
.strip__in{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:var(--w);min-height:40px;margin:0 auto;padding:0 20px;font:500 12px/1 var(--font)}
.strip__status,.strip__live{margin:0;display:flex;align-items:center;gap:8px}
.strip__r{display:flex;align-items:center;gap:16px}
.strip__live{display:none;color:var(--band-body)}
.dot{width:7px;height:7px;border-radius:50%;background:var(--live);box-shadow:0 0 0 0 rgba(34,160,107,.6);animation:ping 2.4s ease-out infinite}
@keyframes ping{70%,100%{box-shadow:0 0 0 7px rgba(34,160,107,0)}}
.seg{display:inline-flex;padding:2px;border:1px solid var(--band-line);border-radius:var(--pill)}
.seg button{min-height:26px;padding:0 10px;border:0;border-radius:var(--pill);background:none;color:var(--band-body);font:600 11px/1 var(--font);cursor:pointer;transition:background-color .18s ease-out,color .18s ease-out}
.seg button[aria-pressed="true"]{background:var(--band-text);color:var(--band)}
@media (min-width:700px){.strip__live{display:flex}}`;
const segJs = `
document.querySelectorAll('.seg').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});});});`;

const P03 = {
  id: 'P03', slug: 'ink', name: 'Ink band', skin: 'ink',
  refs: ['apple.com', 'microsoft.com'],
  motion: 'Live status dot pulses every 2.4 s; INR / USD segment swaps in 180 ms',
  header: 'Navy utility strip (Intake open · INR/USD) above a white main bar.',
  footer: 'Navy footer in light text; the same utility strip closes the page as its legal bar.',
  dna: 'The navy strip with teal underline, status dot and INR/USD segment appears in both halves — header opens the page with it, footer closes with it.',
  vars: ':root{--w:1200px}',
  shared: stripCss,
  hcss: `
.hd{position:relative}
.hd__bar{background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
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
  .hd__list a:hover{background:var(--surface-2);color:var(--ink)}
  .hd__list a[aria-current]{color:var(--ink);box-shadow:inset 0 -2px 0 var(--teal);border-radius:0}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  ${strip}
  <div class="hd__bar"><div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div></div>
</header>`,
  hjs: () => jsMenu('.hd') + segJs,
  fcss: `
.ft{background:var(--band);color:var(--band-body)}
.ft__in{max-width:var(--w);margin:0 auto;padding:56px 20px 40px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft .eyebrow{color:var(--band-body)}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;color:var(--band-text);transition:color .18s ease-out}
.ft__col a:hover{color:var(--glow)}
.ft .strip{border-bottom:0;border-top:1px solid var(--band-line)}
.ft .strip__in{justify-content:space-between}
.ft__legal{margin:0;font-weight:400;color:var(--band-body)}
.ft .strip__in{flex-wrap:wrap;gap:10px 16px;padding-top:10px;padding-bottom:10px}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 40, mode: 'dark' })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
  </div>
  <div class="strip"><div class="strip__in">
    <p class="ft__legal">${LEGAL}</p>
    <div class="strip__r"><span class="strip__status"><span class="dot" aria-hidden="true"></span>Intake open</span>
      <div class="seg" role="group" aria-label="Currency"><button type="button" aria-pressed="true">INR ₹</button><button type="button" aria-pressed="false">USD $</button></div></div>
  </div></div>
</footer>`,
  fjs: () => segJs,
};

// ───────────────────────── P04 · Floating pill ─────────────────────────
const P04 = {
  id: 'P04', slug: 'pill', name: 'Floating pill', skin: 'elevated',
  refs: ['raycast.com', 'stripe.com'],
  motion: 'Pill lifts 1 px with a deeper shadow on hover; footer links nudge 3 px right (200 ms)',
  header: 'Detached floating pill, inset 16 px, soft shadow, no hairlines; sticks as you scroll.',
  footer: 'Detached floating card with the same inset, radius and shadow.',
  dna: 'Both halves are floating white shapes inset 16 px from the viewport on a mint wash — pill on top, rounded card on the bottom, same shadow.',
  vars: ':root{--w:1120px;--inset:16px}',
  extra: 'body{background:linear-gradient(180deg,var(--mint),var(--bg) 60%) fixed}',
  hcss: `
.hd{position:sticky;top:var(--inset);z-index:50;padding:0 var(--inset)}
.hd__pill{position:relative;display:flex;align-items:center;gap:12px;max-width:var(--w);height:60px;margin:var(--inset) auto 0;padding:0 8px 0 22px;border-radius:var(--pill);background:var(--surface);box-shadow:var(--shadow);transition:box-shadow .2s ease-out,transform .2s ease-out}
.hd__pill:hover{transform:translateY(-1px);box-shadow:0 14px 34px rgba(10,37,67,.14)}
.hd__nav{display:none;position:absolute;left:0;right:0;top:calc(100% + 10px);padding:10px;border-radius:var(--card);background:var(--surface);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px;border-radius:var(--chip);font-weight:500}
.hd__act{display:flex;align-items:center;gap:8px;margin-left:auto}
.hd__act .iconbtn{border:0}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;box-shadow:none;background:none;margin-left:12px}
  .hd__list{display:flex;gap:2px}
  .hd__list a{padding:8px 12px;border-radius:var(--pill);font-size:14px;transition:background-color .18s ease-out,color .18s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--mint);color:var(--ink)}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__pill">
    ${logo({ h: 30 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd__pill'),
  fcss: `
.ft{padding:48px var(--inset) var(--inset)}
.ft__card{max-width:var(--w);margin:0 auto;padding:40px 28px 24px;border-radius:28px;background:var(--surface);box-shadow:var(--shadow)}
.ft__grid{display:grid;gap:32px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:14px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:10px}
.ft__col a{display:inline-block;font-size:15px;transition:transform .2s ease-out,color .2s ease-out}
.ft__col a:hover{transform:translateX(3px);color:var(--ink)}
.ft__bar{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;margin-top:32px;padding:14px 18px;border-radius:var(--pill);background:var(--mint);font-size:13px}
.ft__bar p{margin:0}
.ft__chip{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:var(--ink)}
@media (min-width:900px){.ft__card{padding:48px 48px 28px}.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__card">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 36 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p><a class="ft__chip" href="#">Start a project ${ic('arrow-right', 14)}</a></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P05 · Centered ─────────────────────────
const L5 = NAV.slice(0, 3), R5 = NAV.slice(3);
const P05 = {
  id: 'P05', slug: 'centered', name: 'Centered', skin: 'solid',
  refs: ['nytimes.com', 'aesop.com'],
  motion: 'Letter-spaced links fade to ink with a 2 px dot appearing under them (160 ms)',
  header: 'Logo centred, three links either side, hairline beneath; spaced uppercase links.',
  footer: 'Centred stack: logo, one spaced link row, hairline, legal line.',
  dna: 'Everything sits on the centre axis; links are 12 px uppercase with .1em tracking and a dot hover in both halves.',
  vars: ':root{--w:1100px}',
  hcss: `
.hd{position:relative;background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;max-width:var(--w);height:76px;margin:0 auto;padding:0 20px}
.hd__side{display:none}
.hd__act--m{justify-self:end}
.hd__list{display:flex;align-items:center;gap:6px}
.hd__list a{position:relative;display:block;padding:10px 12px;font:600 12px/1 var(--font);letter-spacing:.1em;text-transform:uppercase;transition:color .16s ease-out}
.hd__list a::after{content:"";position:absolute;left:50%;bottom:2px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--teal);transform:scale(0);transition:transform .16s ease-out}
.hd__list a:hover,.hd__list a[aria-current]{color:var(--ink)}
.hd__list a:hover::after,.hd__list a[aria-current]::after{transform:scale(1)}
.hd__side--r{justify-content:flex-end}
.hd__act{display:flex;align-items:center;gap:8px}
.hd__mnav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;text-align:center;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__mnav{display:block}
.hd__mnav a{display:block;padding:14px 0;font:600 13px/1 var(--font);letter-spacing:.1em;text-transform:uppercase}
.hd__ph{width:1px}
${BURGER_CSS}
@media (min-width:1000px){
  .hd__in{display:flex;justify-content:space-between}
  .hd__side{display:flex;flex:1}
  .hd__ph,.burger,.hd__mnav{display:none!important}
  .hd__act--m{display:none}
}
@media (max-width:999px){.hd__act--d{display:none}}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    <nav class="hd__side" aria-label="Primary left">${list('hd__list', L5, 'Product')}</nav>
    <span class="hd__ph" aria-hidden="true"></span>
    ${logo({ h: 36 })}
    <nav class="hd__side hd__side--r" aria-label="Primary right">${list('hd__list', R5)}
      <div class="hd__act hd__act--d">${themeBtn()}</div></nav>
    <div class="hd__act hd__act--m">${themeBtn()}${burger('mnav')}</div>
  </div>
  <nav class="hd__mnav" id="mnav" aria-label="Primary mobile">${NAV.map((t) => `<a href="#">${t}</a>`).join('')}</nav>
</header>`,
  hjs: () => jsMenu('.hd'),
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--surface);text-align:center}
.ft__in{max-width:var(--w);margin:0 auto;padding:56px 20px 28px;display:grid;justify-items:center;gap:26px}
.ft__blurb{max-width:46ch;margin:0;font-size:15px}
.ft__list{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 6px}
.ft__list a{position:relative;display:block;padding:10px 12px;font:600 12px/1 var(--font);letter-spacing:.1em;text-transform:uppercase;transition:color .16s ease-out}
.ft__list a::after{content:"";position:absolute;left:50%;bottom:2px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--teal);transform:scale(0);transition:transform .16s ease-out}
.ft__list a:hover{color:var(--ink)}
.ft__list a:hover::after{transform:scale(1)}
.ft__legal{width:100%;padding-top:22px;border-top:1px solid var(--line);font-size:13px}
.ft__legal p{margin:0}
.ft__sub{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 18px;margin-top:10px}
.ft__sub a{font-size:13px;color:var(--muted)}
.ft__sub a:hover{color:var(--ink)}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    ${logo({ h: 40 })}
    <p class="ft__blurb">${BLURB}</p>
    <nav aria-label="Footer">${list('ft__list', NAV)}</nav>
    <div class="ft__legal"><p>${LEGAL}</p>
      <nav class="ft__sub" aria-label="Legal">${COLS.LEGAL.map((t) => `<a href="#">${t}</a>`).join('')}</nav></div>
  </div>
</footer>`,
  fjs: () => '',
};

export default [P01, P02, P03, P04, P05];
