// Pairs P01–P05. Each pair: one concept, one DNA, header + footer built from it.
import { icon, brand, navList, js, NAV } from './lib.mjs';

const social = ['linkedin','github','x'].map(n =>
  `<a href="#" aria-label="Nestlancer on ${n==='x'?'X':n[0].toUpperCase()+n.slice(1)}">${icon(n)}</a>`).join('');

export const pairsA = [

/* ───────────────────────── P01 · Ground Floor ───────────────────────── */
{
id:'P01', slug:'P01-classic', name:'Ground Floor', skin:'solid',
refs:['stripe.com','slack.com'],
dna:'One calm white bar and one white slab — same hairlines, same underline, same pill — the baseline the other nineteen play against.',
signature:'underline-draw (180 ms ease-out, header links and footer links share the draw)',
axis:'A contained · B inline · C static · D solid · E teal pill',
headerNote:'logo left · 7 inline links · theme toggle, Sign in, teal pill · static',
footerNote:'brand + blurb + 3 eyebrow columns + hairline legal row',
header:{
css:`
.nav{background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:20px;height:64px}
/* mobile-first: list and actions wait for desktop; burger opens the panel */
.nav__list{display:none}
nav{display:none}
.actions{display:none;align-items:center;gap:6px}
.icon-btn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:0;border-radius:var(--pill);background:transparent;color:var(--ink);cursor:pointer;transition:background-color .18s ease-out}
.icon-btn:hover{background:var(--surface-2)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 12px;border-radius:var(--pill)}
.signin:hover{color:var(--teal-hover)}
/* burger + drop panel (mobile-first) */
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;margin-left:auto}
.nav__panel{border-top:1px solid var(--line);background:var(--surface);padding:8px 0 16px}
.nav__panel a:not(.btn){display:flex;align-items:center;justify-content:space-between;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
.nav__panel{padding-bottom:18px}
.nav__panel[hidden]{display:none}
/* underline-draw: the pair's signature, shared with the footer */
.nav__link{position:relative;font:500 14.5px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 12px;border-radius:6px}
.nav__link::after{content:"";position:absolute;left:12px;right:12px;bottom:4px;height:2px;border-radius:2px;background:var(--teal);transform:scaleX(0);transform-origin:left;transition:transform .18s ease-out}
.nav__link:hover::after,.nav__link:focus-visible::after{transform:scaleX(1)}
@media(min-width:1024px){
  .nav__row{height:72px;gap:4px}
  nav{display:block}
  .nav__list{display:flex;align-items:center}
  .actions{display:flex;margin-left:auto}
  .nav__toggle,.nav__panel{display:none}
}
.nav__panel .btn{width:100%;margin-top:14px}
@media(min-width:1024px){.nav__panel .btn{display:none}}`,
html:`<header class="nav" role="banner">
  <div class="container">
    <div class="nav__row">
      ${brand('brand',2)}
      <nav aria-label="Primary">${navList()}</nav>
      <div class="actions">
        <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
        <a class="signin" href="/login">Sign in</a>
        <a class="btn btn--primary" href="/contact">Start a project</a>
      </div>
      <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="menuPanel" aria-expanded="false">${icon('menu')}</button>
    </div>
  </div>
  <div class="nav__panel" id="menuPanel" hidden>
    <div class="container">
      <nav aria-label="Primary mobile">${navList()}</nav>
      <a class="btn btn--primary" href="/contact">Start a project</a>
    </div>
  </div>
</header>`,
js:[js.disclosure,js.theme,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('menuPanel'));
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line);margin-top:0}
.foot__grid{display:grid;gap:36px;padding:56px 0 40px}
.foot__blurb{font-size:14px;max-width:32ch;color:var(--body);margin:14px 0 0}
.foot__cols{display:grid;gap:28px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}
.foot__col li{margin-top:12px}
.foot__col a{position:relative;font-size:14px;color:var(--body);text-decoration:none}
.foot__col a::after{content:"";position:absolute;left:0;right:100%;bottom:-2px;height:1.5px;background:var(--teal);transition:right .18s ease-out}
.foot__col a:hover,.foot__col a:focus-visible{color:var(--ink)}
.foot__col a:hover::after,.foot__col a:focus-visible::after{right:0}
.foot__legal{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:space-between;border-top:1px solid var(--line);padding:18px 0 26px;font-size:13px;color:var(--muted)}
.soc{display:flex;gap:4px}
.soc a{display:inline-flex;width:40px;height:40px;align-items:center;justify-content:center;color:var(--muted);border-radius:var(--pill);transition:color .18s ease-out,background-color .18s ease-out}
.soc a:hover{color:var(--ink);background:var(--surface-2)}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.3fr 2fr;padding:64px 0 44px}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div>
        ${brand('brand',2)}
        <p class="foot__blurb">Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      </div>
      <div class="foot__cols">
        <nav class="foot__col" aria-label="Product"><p class="eyebrow">PRODUCT</p><ul>
          <li><a href="/product">Project Hub</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li></ul></nav>
        <nav class="foot__col" aria-label="Company"><p class="eyebrow">COMPANY</p><ul>
          <li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li><li><a href="/contact">Start a project</a></li></ul></nav>
        <nav class="foot__col" aria-label="Legal"><p class="eyebrow">LEGAL</p><ul>
          <li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify document</a></li></ul></nav>
      </div>
    </div>
    <div class="foot__legal">
      <span>© 2026 Nestlancer. Made in India. All rights reserved.</span>
      <span class="soc">${social}</span>
    </div>
  </div>
</footer>`}
},

/* ───────────────────────── P02 · Morning Mist ───────────────────────── */
{
id:'P02', slug:'P02-glass', name:'Morning Mist', skin:'glass',
headerNote:'sticky bar · glass (blur 14px) engages after 8 px · split-arrow CTA · sun toggle',
footerNote:'mesh wash · brand+blurb · 3 columns · frosted legal capsule',
refs:['vercel.com','apple.com'],
dna:'Chrome that admits the page behind it — a sticky bar that fogs over only after 8 px, and a footer on the same mesh wash with a frosted legal capsule.',
signature:'blur-engage after 8 px (background/opacity only — the blur itself is never animated)',
axis:'A contained · B inline · C sticky+glass · D glass · E split-arrow pill',
header:{
css:`
.nav{position:sticky;top:0;z-index:100;border-bottom:1px solid transparent;
  transition:background-color .2s ease-out,border-color .2s ease-out,box-shadow .2s ease-out}
.nav__row{display:flex;align-items:center;gap:16px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{position:relative;font:500 14.5px/1 var(--font);color:var(--ink);text-decoration:none;padding:26px 12px;display:inline-block}
.nav__link::after{content:"";position:absolute;left:12px;right:12px;bottom:20px;height:2px;border-radius:2px;background:var(--teal);transform:scaleX(0);transition:transform .18s ease-out}
.nav__link:hover::after{transform:scaleX(1)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.cta{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:10px 18px;border-radius:var(--pill);background:var(--btn);color:#fff;font:600 14px/1 var(--font);text-decoration:none}
.cta svg{transition:transform .15s ease-out}
.cta:hover{background:var(--teal-hover)}
.cta:hover svg{transform:translateX(3px)}
/* glass engages after 8px — colours only transition, blur is constant */
@media(min-width:900px){
  .nav.is-scrolled,.nav--force-glass{background:rgba(255,255,255,.72);border-bottom-color:var(--line);box-shadow:var(--shadow);
    backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4)}
}
@supports not (backdrop-filter:blur(1px)){
  .nav.is-scrolled,.nav--force-glass{background:var(--surface)}
}
[data-theme="dark"] .nav.is-scrolled,[data-theme="dark"] .nav--force-glass{background:rgba(15,30,41,.72)}
@media(max-width:899.9px){.nav__list li:nth-child(n+6){display:none}}
@media(min-width:900px){.actions{display:flex}.nav__list{display:flex;align-items:center;margin-left:12px}}
/* mobile panel */
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);padding:8px 20px 18px;box-shadow:var(--shadow)}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:900px){.nav__toggle,.nav__panel{display:none}}`,
html:`<header class="nav nav--force-glass" role="banner">
  <div class="container nav__row">
    ${brand('brand',2)}
    <nav aria-label="Primary"><ul class="nav__list">${NAV.map(n=>`<li><a class="nav__link" href="/${n.toLowerCase()}">${n}</a></li>`).join('')}</ul></nav>
    <div class="actions">
      <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('sun')}</button>
      <a class="cta" href="/contact">Start a project ${icon('arrow-right')}</a>
    </div>
    <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="menuPanel" aria-expanded="false">${icon('menu')}</button>
  </div>
  <div class="nav__panel" id="menuPanel" hidden>
    ${NAV.slice(5).map(n=>`<a href="/${n.toLowerCase()}">${n}</a>`).join('')}
    <a href="/login">Sign in</a>
  </div>
</header>`,
js:[js.theme,js.scroll,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('menuPanel'),{closeOnEsc:true});
</script>`]},
footer:{
css:`
.foot{background:linear-gradient(135deg,var(--mesh-1),var(--mesh-2));padding:64px 0 28px}
.foot__top{display:grid;gap:32px}
.foot__brand p{font-size:14px;max-width:30ch;margin:14px 0 0;color:var(--ink-2)}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.foot__col a{display:inline-block;font-size:14px;color:var(--ink-2);text-decoration:none;padding:4px 0;transition:color .15s ease-out}
.foot__col a:hover{color:var(--teal-hover)}
.foot__col li{margin-top:10px}
/* the frosted legal capsule — same recipe as the bar */
.capsule{margin-top:44px;border:1px solid var(--line);border-radius:var(--pill);padding:14px 22px;
  display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;justify-content:space-between;
  background:rgba(255,255,255,.55);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);
  font-size:13px;color:var(--ink-2)}
@supports not (backdrop-filter:blur(1px)){.capsule{background:var(--surface)}}
[data-theme="dark"] .capsule{background:rgba(15,30,41,.55)}
.capsule ul{display:flex;gap:18px}
.capsule a{color:var(--ink-2);text-decoration:none}
.capsule a:hover{color:var(--teal-hover)}
@media(min-width:1024px){.foot__top{grid-template-columns:1.2fr 2fr}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__top">
      <div class="foot__brand">
        ${brand('brand',2)}
        <p>Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      </div>
      <div class="foot__cols">
        <nav aria-label="Product"><p class="eyebrow">PRODUCT</p><ul class="foot__col">
          <li><a href="/product">Project Hub</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li></ul></nav>
        <nav aria-label="Company"><p class="eyebrow">COMPANY</p><ul class="foot__col">
          <li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li></ul></nav>
        <nav aria-label="Legal"><p class="eyebrow">LEGAL</p><ul class="foot__col">
          <li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify document</a></li></ul></nav>
      </div>
    </div>
    <div class="capsule">
      <span>© 2026 Nestlancer. Made in India. All rights reserved.</span>
      <ul><li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify</a></li></ul>
    </div>
  </div>
</footer>`}
},

/* ───────────────────────── P03 · Night Desk ───────────────────────── */
{
id:'P03', slug:'P03-ink', name:'Night Desk', skin:'ink',
headerNote:'navy utility strip (portal-live + sign-in) above white 72px bar · burger panel',
footerNote:'navy columns + legal row · mono close-strip (portal live · Razorpay · privacy)',
refs:['microsoft.com','razorpay.com'],
dna:'A navy utility strip opens the page and the same navy closes it — white main bar between, teal spent only on the live dot and the pill.',
signature:'strip slide (utility strips slide in 200 ms; header top-down, footer bottom-up)',
axis:'A full-bleed two-tier · B inline + utility links · C static · D ink · E teal pill + text utility links',
header:{
css:`
.util{background:var(--band);color:var(--band-body);font:500 12px/1 var(--font);animation:strip-down .2s ease-out}
@keyframes strip-down{from{transform:translateY(-100%)}to{transform:none}}
@media(prefers-reduced-motion:reduce){.util{animation:none}}
.util__row{display:flex;align-items:center;justify-content:space-between;min-height:36px;gap:16px}
.util__status{display:inline-flex;align-items:center;gap:8px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--live)}
.util__links{display:flex;gap:18px}
.util__links a{color:var(--band-body);text-decoration:none;padding:4px 0}
.util__links a:hover{color:var(--band-text)}
.nav{background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:72px}
.nav__list{display:none}
.nav__link{font:500 14.5px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 12px;border-radius:6px;transition:color .15s ease-out,background-color .15s ease-out}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover);background:var(--mint)}
.actions{display:none;align-items:center;gap:10px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 4px}
.signin:hover{color:var(--teal-hover)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{border-top:1px solid var(--line);padding:6px 0 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none}}`,
html:`<div class="util"><div class="container util__row">
  <span class="util__status"><span class="dot" aria-hidden="true"></span>Client portal · live</span>
  <nav class="util__links" aria-label="Utility"><a href="/login">Sign in</a><a href="/contact">Intake open</a></nav>
</div></div>
<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="btn btn--primary" href="/contact">Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="menuPanel" aria-expanded="false">${icon('menu')}</button>
</div>
<nav class="nav__panel container" id="menuPanel" hidden aria-label="Primary mobile">${navList()}</nav>
</header>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('menuPanel'));
</script>`]},
footer:{
css:`
.foot{background:var(--band);color:var(--band-body);margin-top:64px}
.foot__grid{display:grid;gap:32px;padding:56px 0 40px}
.foot .eyebrow{color:var(--band-body);opacity:.75}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.foot a{color:var(--band-body);text-decoration:none;font-size:14px}
.foot a:hover{color:var(--band-text)}
.foot__col li{margin-top:11px}
.foot__brand p{font-size:14px;max-width:30ch;margin:14px 0 0}
.foot__legal{border-top:1px solid var(--band-line);padding:16px 0;font-size:13px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between}
.close-strip{background:var(--band);color:var(--band-body);border-top:1px solid var(--band-line);animation:strip-up .2s ease-out}
@keyframes strip-up{from{transform:translateY(100%)}to{transform:none}}
@media(prefers-reduced-motion:reduce){.close-strip{animation:none}}
.close-strip .container{display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center;justify-content:space-between;min-height:44px;font:500 12px/1.4 var(--mono);letter-spacing:.08em;text-transform:uppercase}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.2fr 2fr}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="../../assets/logo-full-dark.svg" alt="Nestlancer" width="116" height="32">
        <p>Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      </div>
      <div class="foot__cols">
        <nav aria-label="Product"><p class="eyebrow">PRODUCT</p><ul class="foot__col">
          <li><a href="/product">Project Hub</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li></ul></nav>
        <nav aria-label="Company"><p class="eyebrow">COMPANY</p><ul class="foot__col">
          <li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li></ul></nav>
        <nav aria-label="Legal"><p class="eyebrow">LEGAL</p><ul class="foot__col">
          <li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify document</a></li></ul></nav>
      </div>
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>
<div class="close-strip"><div class="container">
  <span>Client portal · live</span><span>Payments by Razorpay</span><a href="/privacy" style="color:var(--band-body)">Privacy</a>
</div></div>`}
},

/* ───────────────────────── P04 · Orbit Card ───────────────────────── */
{
id:'P04', slug:'P04-pill', name:'Orbit Card', skin:'elevated',
headerNote:'floating pill bar (sticky, 12px inset) · 7 links · spark-prefix CTA',
footerNote:'floating 24px-radius card · brand+blurb+columns · hairline legal',
refs:['linear.app','stripe.com'],
dna:'Chrome as objects floating over the page — a pill-shaped bar casting one soft shadow, and a footer card with the same radius, shadow and 16 px inset.',
signature:'pop-lift (interactive chrome lifts −2 px with a deeper shadow, 180 ms)',
axis:'A floating inset · B inline · C sticky pill · D elevated · E icon-prefixed pill',
header:{
css:`
.wrap{position:sticky;top:12px;z-index:100;padding-inline:16px}
.bar{max-width:1160px;margin-inline:auto;background:var(--surface);border-radius:var(--pill);box-shadow:var(--shadow);
  display:flex;align-items:center;gap:6px;height:60px;padding:0 10px 0 20px;transition:box-shadow .18s ease-out}
.wrap.is-scrolled .bar{box-shadow:0 12px 34px rgba(10,37,67,.16)}
[data-theme="dark"] .wrap.is-scrolled .bar{box-shadow:0 12px 34px rgba(0,0,0,.55)}
.brand img{height:28px}
.nav__list{display:none}
.nav__link{display:inline-block;font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:11px 13px;border-radius:var(--pill);transition:background-color .18s ease-out,transform .18s ease-out}
.nav__link:hover{background:var(--surface-2);transform:translateY(-1px)}
.actions{display:none;align-items:center;gap:6px;margin-left:auto}
.icon-btn{display:inline-flex;width:42px;height:42px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill);transition:background-color .18s ease-out}
.icon-btn:hover{background:var(--surface-2)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 10px;border-radius:var(--pill)}
.cta{display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:10px 18px;border-radius:var(--pill);background:var(--btn);color:#fff;font:600 14px/1 var(--font);text-decoration:none;transition:transform .18s ease-out,box-shadow .18s ease-out,background-color .18s ease-out}
.cta:hover{background:var(--teal-hover);transform:translateY(-2px);box-shadow:0 8px 20px rgba(31,122,115,.35)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.panel{max-width:1160px;margin:8px auto 0;background:var(--surface);border-radius:20px;box-shadow:var(--shadow);padding:10px 20px 16px}
.panel[hidden]{display:none}
.panel a{display:block;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){.nav__list{display:flex}.actions{display:flex;margin-left:auto}.nav__toggle,.panel{display:none!important}}`,
html:`<div class="wrap" id="wrap"><div class="bar" role="banner">
  ${brand('brand',2)}
  <nav aria-label="Primary" style="display:contents"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="cta" href="/contact">${icon('spark')}Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
</div>
<nav class="panel" id="panel" hidden aria-label="Primary mobile">${navList()}</nav></div>`,
js:[js.theme,js.disclosure,js.scroll,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`], scrollTarget:'#wrap'},
footer:{
css:`
.foot-card{max-width:1160px;margin:56px 16px 24px;background:var(--surface);border-radius:24px;box-shadow:var(--shadow);
  padding:48px 32px 24px;transition:transform .2s ease-out,box-shadow .2s ease-out}
.foot-card:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(10,37,67,.14)}
[data-theme="dark"] .foot-card:hover{box-shadow:0 14px 40px rgba(0,0,0,.5)}
.foot-card__grid{display:grid;gap:30px}
.foot-card p{font-size:14px;max-width:32ch;margin:14px 0 0}
.foot-card__cols{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.foot-card a{color:var(--body);text-decoration:none;font-size:14px;transition:color .15s ease-out}
.foot-card a:hover{color:var(--teal-hover)}
.foot-card li{margin-top:10px}
.foot-card__legal{display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;align-items:center;border-top:1px solid var(--line);margin-top:34px;padding-top:18px;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.foot-card{margin-inline:auto;padding:56px 48px 26px}.foot-card__grid{grid-template-columns:1.2fr 2fr}}`,
html:`<footer role="contentinfo">
  <div class="foot-card">
    <div class="foot-card__grid">
      <div>
        ${brand('brand',2)}
        <p>Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      </div>
      <div class="foot-card__cols">
        <nav aria-label="Product"><p class="eyebrow">PRODUCT</p><ul>
          <li><a href="/product">Project Hub</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li></ul></nav>
        <nav aria-label="Company"><p class="eyebrow">COMPANY</p><ul>
          <li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li></ul></nav>
        <nav aria-label="Legal"><p class="eyebrow">LEGAL</p><ul>
          <li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify document</a></li></ul></nav>
      </div>
    </div>
    <div class="foot-card__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P05 · Hearth ───────────────────────── */
{
id:'P05', slug:'P05-centered', name:'Hearth', skin:'solid',
headerNote:'logo dead-centre · 4 links left · 3 links + toggle/sign-in/pill right',
footerNote:'centred mark, 7-link row, blurb, round socials, legal',
refs:['stripe.com','pentagram.com'],
dna:'Everything gathers around the nest — logo centred in the bar and in the footer, hairline symmetry, teal only on the pill.',
signature:'fade-bloom (links bloom from the centre: opacity + 1 px settle, 160 ms)',
axis:'A centred · B inline split around centre · C static · D solid · E centred pill pair',
header:{
css:`
.nav{background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;height:64px;gap:8px}
.nav__side{display:none;align-items:center;gap:2px;flex:1}
.nav__side--r{justify-content:flex-end}
.brand{position:absolute;left:50%;transform:translateX(-50%)}
.nav{position:relative}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:6px;transition:opacity .16s ease-out,transform .16s ease-out,color .16s ease-out}
.nav__link:hover{color:var(--teal-hover)}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 8px}
.cta{display:inline-flex;min-height:40px;align-items:center;padding:10px 18px;border-radius:var(--pill);background:var(--btn);color:#fff;font:600 14px/1 var(--font);text-decoration:none}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{border-top:1px solid var(--line);padding:6px 0 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 4px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){
  .nav__row{height:72px}
  .nav__side{display:flex}.nav__toggle,.nav__panel{display:none!important}
  .brand{position:static;transform:none}
  /* keep the logo truly centred regardless of side widths */
  .nav__row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
  .nav__side--l{justify-content:flex-start}.nav__side--r{justify-content:flex-end}
}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  <nav class="nav__side nav__side--l" aria-label="Primary">${['Product','Portfolio','Blog','About'].map(n=>`<a class="nav__link" href="/${n.toLowerCase()}">${n}</a>`).join('')}</nav>
  ${brand('brand',2)}
  <div class="nav__side nav__side--r">
    <nav aria-label="Secondary">${['Pricing','Services','Contact'].map(n=>`<a class="nav__link" href="/${n.toLowerCase()}">${n}</a>`).join('')}</nav>
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="cta" href="/contact">Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
</div>
<nav class="nav__panel container" id="panel" hidden aria-label="Primary mobile">${navList()}</nav>
</header>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line);text-align:center}
.foot__inner{padding:56px 0 28px}
.foot__mark{display:inline-block;margin-bottom:18px}
.foot__nav{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 22px;margin:0 0 8px}
.foot__nav a{font:500 14px/1 var(--font);color:var(--body);text-decoration:none;padding:8px 4px;transition:color .16s ease-out}
.foot__nav a:hover{color:var(--teal-hover)}
.foot__blurb{font-size:14px;max-width:46ch;margin:10px auto 22px}
.foot__soc{display:flex;justify-content:center;gap:6px;margin-bottom:26px}
.foot__soc a{display:inline-flex;width:42px;height:42px;align-items:center;justify-content:center;color:var(--muted);border:1px solid var(--line);border-radius:var(--pill);transition:color .16s ease-out,border-color .16s ease-out}
.foot__soc a:hover{color:var(--teal-hover);border-color:var(--teal)}
.foot__legal{border-top:1px solid var(--line);padding:18px 0;font-size:13px;color:var(--muted)}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container foot__inner">
    <a class="foot__mark" href="/" aria-label="Nestlancer — home"><img src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="40" height="40" class="brand__light"><img src="../../assets/logo-mark-dark.svg" alt="" width="40" height="40" aria-hidden="true" class="brand__dark"></a>
    <nav class="foot__nav" aria-label="Footer">${['Product','Portfolio','Blog','About','Pricing','Services','Contact'].map(n=>`<a href="/${n.toLowerCase()}">${n}</a>`).join('')}</nav>
    <p class="foot__blurb">Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
    <div class="foot__soc">
      <a href="#" aria-label="Nestlancer on LinkedIn">${icon('linkedin')}</a>
      <a href="#" aria-label="Nestlancer on GitHub">${icon('github')}</a>
      <a href="#" aria-label="Nestlancer on X">${icon('x')}</a>
    </div>
    <div class="foot__legal">© 2026 Nestlancer. Made in India. All rights reserved.</div>
  </div>
</footer>`}
},
];
