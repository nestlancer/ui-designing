// Pairs P16–P20 — batch 4: dock, command palette, progress+proof, locale tiers, split.
import { icon, brand, navList, js, NAV } from './lib.mjs';

const cols = {
  product: [['Project Hub','/product'],['Pricing','/pricing'],['Services','/services'],['Portfolio','/portfolio']],
  company: [['About','/about'],['Blog','/blog'],['Contact','/contact'],['Start a project','/contact']],
  legal: [['Terms','/terms'],['Privacy','/privacy'],['Verify document','/verify']]
};
const colHTML = (c, cls='f-col') => `<nav class="${cls}" aria-label="${c[0]}"><p class="eyebrow">${c[0]}</p><ul>
${c[1].map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></nav>`;
const blurb = 'Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.';

export const pairsD = [

/* ───────────────────────── P16 · Crew Deck ───────────────────────── */
{
id:'P16', slug:'P16-dock', name:'Crew Deck', skin:'elevated',
headerNote:'56px slim bar · links+compact pill on desktop · 5-tab bottom dock on mobile',
footerNote:'compact: mark + blurb + chip row with one teal CTA chip',
refs:['microsoft.com','figma.com'],
dna:'App-furniture minimal: a slim utility bar up top, a thumb-reachable tab dock at the bottom on mobile — and the footer compresses to the same furniture scale with one pinned CTA.',
signature:'dock-press (active tab presses down with a teal dot rising 120 ms; footer chips press identically)',
axis:'A slim full-bleed bars · B bottom tabs (mobile) · C static · D elevated · E compact pill + dock CTA',
header:{
css:`
.top{position:sticky;top:0;z-index:100;background:var(--surface);border-bottom:1px solid var(--line)}
.top__row{display:flex;align-items:center;gap:10px;height:56px}
.brand img{height:26px}
.top__links{display:none}
.top__links a{font:500 13.5px/1 var(--font);color:var(--body);text-decoration:none;padding:10px 10px;border-radius:var(--chip)}
.top__links a:hover,.top__links a[aria-current]{color:var(--teal-hover)}
.top__actions{display:none;align-items:center;gap:6px;margin-left:auto}
.icon-btn{display:inline-flex;width:42px;height:42px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.mini{min-height:36px;padding:9px 16px;font-size:13.5px}
/* the bottom dock (mobile only) */
.dock{position:fixed;left:0;right:0;bottom:0;z-index:100;background:var(--surface);border-top:1px solid var(--line);
  padding:6px 8px calc(6px + env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(5,1fr);box-shadow:0 -6px 24px rgba(10,37,67,.06)}
.dock a{display:flex;flex-direction:column;align-items:center;gap:3px;min-height:48px;justify-content:center;font:500 10.5px/1 var(--font);letter-spacing:.02em;color:var(--muted);text-decoration:none;border-radius:10px;position:relative}
.dock a[aria-current]{color:var(--teal-hover)}
.dock a[aria-current]::before{content:"";position:absolute;top:-7px;width:18px;height:3px;border-radius:2px;background:var(--btn)}
.dock a:active{transform:translateY(1px)}
@media(prefers-reduced-motion:reduce){.dock a:active{transform:none}}
body{padding-bottom:calc(78px + env(safe-area-inset-bottom))} /* dock clearance */
@media(min-width:1024px){
  body{padding-bottom:0}
  .dock{display:none} /* the desktop keeps links in the top bar */
  .top__row{height:64px}
  .top__links{display:flex}.top__actions{display:flex}
}`,
html:`<header class="top" role="banner"><div class="container top__row">
  ${brand('brand',2,0,26)}
  <nav class="top__links" aria-label="Primary">${NAV.slice(0,5).map(n=>`<a href="/${n.toLowerCase()}"${n==='Product'?' aria-current="page"':''}>${n}</a>`).join('')}</nav>
  <div class="top__actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="btn btn--primary mini" href="/contact">Start a project</a>
  </div>
</div></header>
<nav class="dock" aria-label="Primary mobile">
  <a href="/" aria-current="page">${icon('home')}Home</a>
  <a href="/portfolio">${icon('layers')}Work</a>
  <a href="/pricing">${icon('tag')}Pricing</a>
  <a href="/blog">${icon('doc')}Blog</a>
  <a href="/contact">${icon('send')}Start</a>
</nav>`,
js:[js.theme]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line);margin-top:48px}
.foot__row{display:grid;gap:22px;padding:36px 0 28px}
.foot__id{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.foot__id p{font-size:13px;color:var(--muted);margin:0;max-width:40ch}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:9px 15px;border:1px solid var(--line);border-radius:var(--pill);font:500 13px/1 var(--font);color:var(--body);text-decoration:none;background:var(--surface);transition:border-color .15s ease-out,color .15s ease-out,transform .12s ease-out}
.chip:hover{border-color:var(--teal);color:var(--teal-hover)}
.chip:active{transform:translateY(1px)}
.chip svg{color:var(--muted)}
.chip--cta{background:var(--btn);border-color:var(--btn);color:#fff}
.chip--cta svg{color:#fff}
.chip--cta:hover{background:var(--teal-hover);color:#fff}
.foot__legal{display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:space-between;border-top:1px solid var(--line);padding:14px 0 20px;font-size:12.5px;color:var(--muted)}
@media(min-width:1024px){.foot__row{grid-template-columns:1fr auto;align-items:center;padding:40px 0 32px}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__row">
      <div class="foot__id">
        <img class="brand__light" src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="30" height="30">
        <img class="brand__dark" src="../../assets/logo-mark-dark.svg" alt="" width="30" height="30" aria-hidden="true">
        <p>${blurb}</p>
      </div>
      <div class="chips">
        <a class="chip" href="/product">${icon('layers')}Project Hub</a>
        <a class="chip" href="/pricing">${icon('rupee')}Pricing</a>
        <a class="chip" href="/portfolio">${icon('pen')}Portfolio</a>
        <a class="chip" href="/verify">${icon('shield')}Verify</a>
        <a class="chip" href="/terms">${icon('doc')}Terms</a>
        <a class="chip" href="/privacy">${icon('shield')}Privacy</a>
        <a class="chip chip--cta" href="/contact">Start a project ${icon('arrow-right')}</a>
      </div>
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P17 · Night Librarian ───────────────────────── */
{
id:'P17', slug:'P17-palette', name:'Night Librarian', skin:'glass',
headerNote:'glass sticky bar · ⌘K search pill · moon · primary pill',
footerNote:'status pills + ⌘K pill + CTA pill · 3 columns · legal',
refs:['vercel.com','linear.app'],
dna:'Answer-first chrome: a ⌘K pill opens a palette of every route, and the footer carries the same pill language as status chips with the same ⌘K hint.',
signature:'palette-scale (dialog scales 0.98→1 + fades 200 ms; scrim fades 150 ms; ⌘K everywhere)',
axis:'A contained glass bar · B command palette · C sticky · D glass · K pill chips',
header:{
css:`
.nav{position:sticky;top:0;z-index:100;border-bottom:1px solid var(--line);transition:background-color .2s ease-out}
@media(min-width:900px){.nav.is-scrolled{background:rgba(255,255,255,.72);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4)}}
@supports not (backdrop-filter:blur(1px)){.nav.is-scrolled{background:var(--surface)}}
[data-theme="dark"] .nav.is-scrolled{background:rgba(15,30,41,.72)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.kbtn{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:8px 8px 8px 14px;border:1px solid var(--line);background:var(--surface);border-radius:var(--pill);font:500 13px/1 var(--font);color:var(--muted);cursor:pointer}
.kbtn kbd{font:500 11px/1 var(--mono);border:1px solid var(--line);border-bottom-width:2px;border-radius:6px;padding:3px 6px;color:var(--ink);background:var(--surface-2)}
.kbtn:hover{border-color:var(--teal);color:var(--teal-hover)}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
/* the palette */
.scrim{position:fixed;inset:0;background:rgba(10,37,67,.45);opacity:0;visibility:hidden;transition:opacity .15s ease-out,visibility 0s linear .15s;z-index:398}
.scrim.is-on{opacity:1;visibility:visible;transition:opacity .15s ease-out}
.palette{position:fixed;left:50%;top:14vh;translate:-50% 0;width:min(560px,92vw);z-index:399;background:var(--surface);
  border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);overflow:hidden;
  opacity:0;transform:scale(.98) translateY(-6px);visibility:hidden;transition:opacity .2s ease-out,transform .2s cubic-bezier(.2,.8,.2,1),visibility 0s linear .2s}
.palette.is-open{opacity:1;transform:none;visibility:visible;transition:opacity .2s ease-out,transform .2s cubic-bezier(.2,.8,.2,1)}
.palette__head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line);color:var(--muted)}
.palette__head input{flex:1;border:0;background:transparent;font:400 15px/1 var(--font);color:var(--ink)}
.palette__head input:focus{outline:none}
.palette__head kbd{font:500 11px/1 var(--mono);border:1px solid var(--line);border-radius:6px;padding:3px 6px}
.palette__list{max-height:320px;overflow-y:auto;padding:8px}
.palette__list a{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:10px;font:500 14px/1 var(--font);color:var(--ink-2);text-decoration:none}
.palette__list a:hover,.palette__list a:focus-visible{background:var(--mint);color:var(--teal-hover);outline:none}
.palette__list a small{margin-left:auto;color:var(--muted);font:500 11px/1 var(--mono)}
.palette[hidden]{display:none}
@media(prefers-reduced-motion:reduce){.palette{transition:opacity .15s ease-out;transform:none}.palette.is-open{transform:none}}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="kbtn" id="paletteOpen" aria-haspopup="dialog" aria-expanded="false" aria-controls="palette">${icon('search')}Search<kbd>⌘K</kbd></button>
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
  </div>
</div></header>
<div class="scrim" id="scrim" hidden></div>
<div class="palette" id="palette" role="dialog" aria-modal="true" aria-label="Search everything" hidden>
  <div class="palette__head">${icon('search')}
    <input type="text" id="pq" placeholder="Search routes — try “pricing”" aria-label="Search routes">
    <kbd>esc</kbd>
  </div>
  <div class="palette__list" id="plist">
    ${[['Home','/'],['Product','/product'],['Portfolio','/portfolio'],['Blog','/blog'],['About','/about'],['Pricing','/pricing'],['Services','/services'],['Contact','/contact'],['Sign in','/login'],['Register','/register'],['Terms','/terms'],['Privacy','/privacy'],['Verify document','/verify']].map(([l,h])=>`<a href="${h}">${icon('arrow-right')}${l}<small>${h}</small></a>`).join('')}
  </div>
</div>`,
js:[js.theme,js.scroll,js.palette,`<script>
(function(){const input=document.getElementById('pq'),list=document.getElementById('plist');
input.addEventListener('input',()=>{const q=input.value.toLowerCase();
  [...list.querySelectorAll('a')].forEach(a=>{a.style.display=a.textContent.toLowerCase().includes(q)?'':'none'})});
document.getElementById('palette').addEventListener('palette-open',()=>input.focus())})();
</script>`]},
footer:{
css:`
.foot{background:linear-gradient(135deg,rgba(216,232,233,.55),rgba(218,234,235,.3));border-top:1px solid var(--line)}
@supports not (backdrop-filter:blur(1px)){.foot{background:var(--surface-2)}}
.foot__grid{display:grid;gap:30px;padding:52px 0 40px}
.status{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:9px 15px;border-radius:var(--pill);font:500 12.5px/1 var(--font);text-decoration:none;border:1px solid var(--line);background:rgba(255,255,255,.7);color:var(--ink-2)}
[data-theme="dark"] .pill{background:rgba(15,30,41,.7)}
.pill i{width:7px;height:7px;border-radius:50%;background:var(--live)}
.pill kbd{font:500 11px/1 var(--mono);border:1px solid var(--line);border-radius:6px;padding:2px 6px;color:var(--ink);background:var(--surface-2)}
.pill--btn{background:var(--btn);border-color:var(--btn);color:#fff}
.pill--btn:hover{background:var(--teal-hover)}
.pill:hover{border-color:var(--teal)}
.foot__cols{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.foot__legal{border-top:1px solid var(--line);padding:16px 24px 24px;display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.2fr 2fr}.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div>
        <p class="eyebrow">STATUS</p>
        <div class="status">
          <span class="pill"><i aria-hidden="true"></i>Client portal · live</span>
          <span class="pill">Intake open</span>
          <button class="pill" id="paletteOpenFoot" aria-haspopup="dialog" aria-controls="palette" style="cursor:pointer">Search everything <kbd>⌘K</kbd></button>
          <a class="pill pill--btn" href="/contact">Start a project ${icon('arrow-right')}</a>
        </div>
        <p style="font-size:13px;color:var(--muted);max-width:34ch;margin:16px 0 0">${blurb}</p>
      </div>
      <div class="foot__cols">
        ${colHTML(['PRODUCT',cols.product])}
        ${colHTML(['COMPANY',cols.company])}
        ${colHTML(['LEGAL',cols.legal])}
      </div>
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`,
js:[`<script>
/* the footer pill is a second legitimate trigger for the one palette */
(function(){const open=document.getElementById('paletteOpen'),foot=document.getElementById('paletteOpenFoot');
foot.addEventListener('click',()=>open.click())})();
</script>`]}
},

/* ───────────────────────── P18 · Meter ───────────────────────── */
{
id:'P18', slug:'P18-progress', name:'Meter', skin:'solid',
headerNote:'solid sticky bar with 2px teal reading-progress line',
footerNote:'proof rail: ₹4,28,500 · ₹4.2L milestone · payouts 1/3 (count-up)',
refs:['stripe.com','slack.com'],
dna:'The page measures itself: a 2px teal reading line under the bar grows with scroll, and the footer answers with a proof rail whose figures count up on arrival.',
signature:'measure (scroll-linked progress line + count-up proof — both quiet, both tabular)',
axis:'A contained · B inline · C sticky + progress-linked · D solid · E teal pill + ghost',
header:{
css:`
.nav{position:sticky;top:0;z-index:100;background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
/* the reading line — transform only, no layout cost */
.progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;overflow:hidden}
.progress__fill{display:block;height:100%;background:var(--btn);transform:scaleX(0);transform-origin:left}
.nav{position:sticky}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){.nav__toggle,.nav__panel{display:none!important}}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
</div>
<div class="nav__panel" id="panel" hidden>${navList()}<a href="/login">Sign in</a></div>
<div class="progress" aria-hidden="true"><span class="progress__fill" id="pf"></span></div>
</header>`,
js:[js.theme,js.disclosure,js.progress,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line)}
.rail{display:grid;gap:22px;padding:48px 0 36px;border-bottom:1px solid var(--line)}
.rail__item{display:grid;gap:4px;justify-items:start}
.rail__num{font:600 clamp(26px,3.4vw,36px)/1.1 var(--font);letter-spacing:-.02em;color:var(--ink);font-variant-numeric:tabular-nums}
.rail__num small{font-size:.55em;color:var(--teal-hover);font-weight:600}
.rail__cap{font-size:13px;color:var(--muted)}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));padding:34px 0 36px}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.foot__legal{display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;border-top:1px solid var(--line);padding:16px 0 24px;font-size:13px;color:var(--muted)}
@media(min-width:768px){.rail{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="rail" data-reveal>
      <div class="rail__item">
        <span class="rail__num">₹<span data-count="428500">0</span></span>
        <span class="rail__cap">payments cleared through Razorpay milestones</span>
      </div>
      <div class="rail__item">
        <span class="rail__num">₹<span data-count="420000">0</span><small> milestone</small></span>
        <span class="rail__cap">a typical fixed-price build, quoted up front</span>
      </div>
      <div class="rail__item">
        <span class="rail__num">Payouts cleared <span data-count="1">0</span>/3</span>
        <span class="rail__cap">live right now on the Project Hub</span>
      </div>
    </div>
    <div class="foot__cols">
      ${colHTML(['PRODUCT',cols.product])}
      ${colHTML(['COMPANY',cols.company])}
      ${colHTML(['LEGAL',cols.legal])}
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`,
js:[js.countUp,js.reveal]}
},

/* ───────────────────────── P19 · Gate Desk ───────────────────────── */
{
id:'P19', slug:'P19-locale', name:'Gate Desk', skin:'dual',
headerNote:'utility tier (INR ₹/EN dropdowns) above solid main bar',
footerNote:'utility tier (locale + Razorpay line) above columns + legal',
refs:['ikea.com','airbnb.com'],
dna:'Two surfaces, one idea of welcome: a light utility tier (currency, language) rides above the main bar, and the footer repeats the exact two-tier stack — utility row over legal row.',
signature:'tier-swap (the utility selects expand their 12px menus with a 200ms grid-rows drop, mirrored by the footer utility links)',
axis:'A two-tier full-bleed · B inline + select menus · C static · D dual (two stacked tones) · E pill + text utility',
header:{
css:`
.util{background:var(--surface-2);border-bottom:1px solid var(--line)}
.util__row{display:flex;align-items:center;justify-content:space-between;min-height:38px;gap:12px;font:500 12px/1 var(--font);color:var(--muted)}
.util__group{display:flex;align-items:center;gap:4px}
.util__group>span{display:inline-flex;align-items:center;gap:6px;padding:5px 8px}
.usel{position:relative}
.usel>button{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:5px 10px;border:0;background:transparent;font:500 12px/1 var(--font);color:var(--ink-2);cursor:pointer;border-radius:var(--chip)}
.usel>button:hover{background:var(--tint)}
.usel .drop{position:absolute;right:0;top:calc(100% + 4px);z-index:50;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow);min-width:150px;padding:0;display:grid;grid-template-rows:0fr;transition:grid-template-rows .2s ease-out,visibility 0s linear .2s,padding .2s ease-out;overflow:hidden;visibility:hidden}
.usel.open .drop{grid-template-rows:1fr;visibility:visible;transition:grid-template-rows .2s ease-out,visibility 0s,padding .2s ease-out;padding:6px}
.usel .drop>div{overflow:hidden}
.usel .drop a{display:block;padding:8px 10px;font:500 12.5px/1 var(--font);color:var(--ink-2);text-decoration:none;border-radius:6px}
.usel .drop a:hover{background:var(--mint);color:var(--teal-hover)}
.usel .drop a[aria-current]{color:var(--teal-hover)}
.nav{background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{border-top:1px solid var(--line);padding:6px 0 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(prefers-reduced-motion:reduce){.usel .drop{transition:none}}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}}`,
html:`<div class="util"><div class="container util__row">
  <span>Made in India · shipping worldwide</span>
  <div class="util__group">
    <div class="usel" id="cur">
      <button aria-expanded="false" aria-controls="curdrop">${icon('rupee','')}INR ₹ ${icon('chevron-down')}</button>
      <div class="drop" id="curdrop"><div>
        <a href="#" aria-current="true">INR ₹ — Indian rupee</a>
        <a href="#">USD $ — US dollar</a>
      </div></div>
    </div>
    <div class="usel" id="lang">
      <button aria-expanded="false" aria-controls="langdrop">${icon('globe','')}EN ${icon('chevron-down')}</button>
      <div class="drop" id="langdrop"><div>
        <a href="#" aria-current="true">English</a>
        <a href="#">हिन्दी</a>
      </div></div>
    </div>
  </div>
</div></div>
<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
</div>
<nav class="nav__panel container" id="panel" hidden aria-label="Primary mobile">${navList()}</nav>
</header>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
/* utility selects: one open at a time, Esc anywhere closes */
document.querySelectorAll('.usel').forEach(u=>{
  const b=u.querySelector('button');
  b.addEventListener('click',e=>{e.stopPropagation();
    const open=u.classList.toggle('open');b.setAttribute('aria-expanded',open);
    document.querySelectorAll('.usel').forEach(o=>{if(o!==u){o.classList.remove('open');o.querySelector('button').setAttribute('aria-expanded','false')}})});
});
document.addEventListener('click',()=>document.querySelectorAll('.usel.open').forEach(u=>{u.classList.remove('open');u.querySelector('button').setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.usel.open').forEach(u=>{u.classList.remove('open');u.querySelector('button').setAttribute('aria-expanded','false')})});
</script>`]},
footer:{
css:`
.foot{background:var(--surface)}
.util-foot{background:var(--surface-2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.util-foot .container{display:flex;flex-wrap:wrap;gap:10px 24px;align-items:center;justify-content:space-between;min-height:44px;font:500 12px/1.4 var(--font);color:var(--muted)}
.util-foot a{display:inline-flex;align-items:center;gap:6px;color:var(--ink-2);text-decoration:none}
.util-foot a:hover{color:var(--teal-hover)}
.foot__grid{display:grid;gap:32px;padding:48px 0 40px}
.foot .eyebrow{color:var(--muted)}
.foot__brand p{font-size:14px;max-width:30ch;margin:14px 0 0;color:var(--body)}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.f-col li{margin-top:11px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.pay{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--font);color:var(--muted)}
.pay svg{color:var(--teal-hover)}
.foot__legal{border-top:1px solid var(--line);padding:16px 24px 24px;display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.3fr 2fr}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="util-foot"><div class="container">
    <span><a href="/contact">${icon('globe')}English · INR ₹ (change)</a></span>
    <span class="pay">${icon('shield')}Payments by Razorpay · UPI, cards, netbanking</span>
  </div></div>
  <div class="container">
    <div class="foot__grid">
      <div class="foot__brand">
        ${brand('brand',2)}
        <p>${blurb}</p>
      </div>
      <div class="foot__cols">
        ${colHTML(['PRODUCT',cols.product])}
        ${colHTML(['COMPANY',cols.company])}
        ${colHTML(['LEGAL',cols.legal])}
      </div>
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P20 · Twin Gates ───────────────────────── */
{
id:'P20', slug:'P20-split', name:'Twin Gates', skin:'dual',
headerNote:'bar + 50/50 CTA gate (Sign in ‖ Start a project) with centre hairline',
footerNote:'50/50 split: mint CTA half ‖ white sitemap half · legal row',
refs:['slack.com','stripe.com'],
dna:'Everything splits 50/50: the header carries two equal CTAs across a centre hairline, and the footer mirrors it — CTA half on mint, sitemap half on white, one shared edge.',
signature:'meet-in-middle (hover fills grow from the shared centre edge outward, 200 ms, both halves)',
axis:'A split 50/50 · B inline · C static · D dual (mint/white) · E dual-equal CTAs',
header:{
css:`
.nav{background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:8px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 10px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover)}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{border-top:1px solid var(--line);padding:6px 0 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
/* the split CTA gate */
.gate{display:none;border-top:1px solid var(--line)}
.gate{display:grid;grid-template-columns:1fr;gap:0}
.gate__half{display:flex;align-items:center;justify-content:center;gap:12px;min-height:56px;padding:10px 18px;font:600 14.5px/1 var(--font);text-decoration:none;position:relative;overflow:hidden}
.gate__half::before{content:"";position:absolute;inset:0;background:var(--mint);transform:scaleX(0);transition:transform .2s ease-out;z-index:0}
.gate__half:hover::before{transform:scaleX(1)}
.gate__half>span{position:relative;display:inline-flex;align-items:center;gap:8px}
.gate__half--a{color:var(--ink);border-right:1px solid var(--line)}
.gate__half--a svg{color:var(--teal-hover)}
.gate__half--b{color:var(--teal-hover)}
.gate__half--b::before{background:var(--teal-soft)}
@media(prefers-reduced-motion:reduce){.gate__half::before{transition:none}}
@media(min-width:1024px){
  .nav__row{height:72px}.nav__list{display:flex}.nav__toggle,.nav__panel{display:none!important}
  .nav__row{justify-content:space-between}
  .gate{grid-template-columns:1fr 1fr}
  .gate__half--a{border-right:1px solid var(--line)}
}`,
html:`<header class="nav" role="banner">
  <div class="container nav__row">
    ${brand('brand',2)}
    <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
    <div style="display:flex;align-items:center;gap:6px">
      <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
      <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
    </div>
  </div>
  <nav class="nav__panel container" id="panel" hidden aria-label="Primary mobile">${navList()}</nav>
  <div class="gate container" style="padding:0">
    <a class="gate__half gate__half--a" href="/login"><span>${icon('external')}Sign in</span></a>
    <a class="gate__half gate__half--b" href="/contact"><span>Start a project ${icon('arrow-right')}</span></a>
  </div>
</header>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line)}
.foot__split{display:grid;grid-template-columns:1fr}
.foot__cta{background:var(--mint);padding:44px 24px;display:grid;gap:16px;justify-items:start;position:relative;overflow:hidden}
.foot__cta::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,var(--teal-soft),transparent 55%);opacity:.6;pointer-events:none}
.foot__cta h2{margin:0;font-size:clamp(24px,3.2vw,32px);letter-spacing:-.02em;line-height:1.15;color:var(--ink);position:relative}
.foot__cta p{margin:0;font-size:14.5px;color:var(--body);max-width:38ch;position:relative}
.foot__cta .actions{display:flex;gap:12px;flex-wrap:wrap;position:relative}
.foot__map{padding:44px 24px}
.foot__map .cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none;position:relative}
.f-col a::after{content:"";position:absolute;left:0;right:auto;bottom:-2px;width:0;height:1.5px;background:var(--teal);transition:width .2s ease-out}
.f-col a:hover{color:var(--teal-hover)}
.f-col a:hover::after{width:100%}
.foot__legal{border-top:1px solid var(--line);padding:16px 24px 24px;display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:1024px){
  .foot__split{grid-template-columns:1fr 1fr}
  .foot__cta{padding:56px 48px;border-right:1px solid var(--line)}
  .foot__map{padding:56px 48px}
  .foot__map .cols{grid-template-columns:repeat(3,1fr)}
}`,
html:`<footer class="foot" role="contentinfo">
  <div class="foot__split">
    <div class="foot__cta">
      <p class="eyebrow" style="position:relative">FIG · START</p>
      <h2>Ready to ship with clarity?</h2>
      <p>Fixed-price studio work. Live Project Hub. Razorpay milestones. Intake is open.</p>
      <div class="actions">
        <a class="btn btn--primary" href="/contact">Start a project</a>
        <a class="btn btn--ghost" href="/login">Preview the portal</a>
      </div>
    </div>
    <div class="foot__map">
      <div class="cols">
        ${colHTML(['PRODUCT',cols.product])}
        ${colHTML(['COMPANY',cols.company])}
        ${colHTML(['LEGAL',cols.legal])}
      </div>
    </div>
  </div>
  <div class="foot__legal">
    <img class="brand__light" src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="26" height="26">
    <img class="brand__dark" src="../../assets/logo-mark-dark.svg" alt="" width="26" height="26" aria-hidden="true">
    <span>© 2026 Nestlancer. Made in India. All rights reserved. · INR ₹ · USD $</span>
  </div>
</footer>`}
},
];
