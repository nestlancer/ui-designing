// Pairs P06–P10 — batch 2: editorial, announcement, mega, search-first, auth-minimal.
import { icon, brand, navList, js, NAV } from './lib.mjs';

const cols = {
  product: [['Project Hub','/product'],['Pricing','/pricing'],['Services','/services'],['Portfolio','/portfolio']],
  company: [['About','/about'],['Blog','/blog'],['Contact','/contact'],['Start a project','/contact']],
  legal: [['Terms','/terms'],['Privacy','/privacy'],['Verify document','/verify']]
};
const colHTML = (c, cls='f-col') => `<nav class="${cls}" aria-label="${c[0]}"><p class="eyebrow">${c[0]}</p><ul>
${c[1].map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></nav>`;

export const pairsB = [

/* ───────────────────────── P06 · Newsroom ───────────────────────── */
{
id:'P06', slug:'P06-editorial', name:'Newsroom', skin:'editorial',
headerNote:'3px masthead rule · dated eyebrow · centred logo · ruled nav row · text CTA',
footerNote:'3px rule + double rule · ruled column links · byline row',
refs:['zerodha.com','nytimes.com'],
dna:'No fills at all — one heavy masthead rule, one hairline under the nav row, and the same double-rule bookending the footer. Teal appears only as link ink on hover.',
signature:'rule-draw (rules scaleX from the left on load/in-view, 320 ms)',
axis:'A full-bleed rules · B inline ruled row · C static · D editorial · E text CTA',
header:{
css:`
.masthead{border-top:3px solid var(--ink);background:var(--bg)}
.mast__row{display:flex;align-items:center;justify-content:space-between;min-height:60px}
.mast__date{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);display:none}
.brand img{height:30px}
/* desktop ruled nav row: the whole row is a bordered strip */
.navrow{display:none;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.navrow__inner{display:flex;align-items:center;min-height:46px;gap:2px}
.navrow .nav__link{position:relative;display:inline-block;font:500 13px/1 var(--font);letter-spacing:.02em;color:var(--ink);text-decoration:none;padding:15px 13px}
.navrow .nav__link::after{content:"";position:absolute;left:13px;right:13px;bottom:10px;height:2px;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .2s ease-out}
.navrow .nav__link:hover::after,.navrow .nav__link[aria-current]::after{transform:scaleX(1)}
.navrow .nav__link:hover{color:var(--teal-hover)}
.navrow .nav__link[aria-current]{color:var(--teal-hover)}
.navrow .nav__list{display:flex;align-items:center}
/* the rule-draw entrance */
.navrow{transform-origin:left;animation:rule-in .32s cubic-bezier(.2,.8,.2,1)}
@keyframes rule-in{from{transform:scaleX(0);opacity:.4}to{transform:none;opacity:1}}
@media(prefers-reduced-motion:reduce){.navrow{animation:none}}
.textcta{margin-left:auto;font:600 13px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:2px solid var(--teal);padding-bottom:3px}
.textcta:hover{color:var(--teal-hover)}
.util{display:flex;align-items:center;gap:4px}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer}
.panel{border-bottom:1px solid var(--line);background:var(--bg)}
.panel[hidden]{display:none}
.panel .nav__list li{border-bottom:1px solid var(--line)}
.panel .nav__link{display:flex;align-items:center;justify-content:space-between;padding:14px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none}
.panel a[href="/login"]{display:block;padding:14px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){
  .mast__row{min-height:64px}
  .mast__date{display:block}
  .navrow{display:block}
  .nav__toggle,.panel{display:none!important}
  .util .icon-btn{display:none}
}`,
html:`<div class="masthead" role="banner">
  <div class="container mast__row">
    <span class="mast__date">Product studio + client portal — est. India</span>
    ${brand('brand',2)}
    <div class="util">
      <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
      <a class="textcta" href="/contact">Start a project →</a>
      <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
    </div>
  </div>
  <div class="navrow">
    <div class="container navrow__inner">
      ${navList()}
      <a class="textcta" href="/login" style="margin-left:auto;border:none;align-self:center">Sign in</a>
    </div>
  </div>
  <nav class="panel" id="panel" hidden aria-label="Primary mobile">${navList()}<a href="/login">Sign in</a></nav>
</div>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--bg);border-top:3px solid var(--ink)}
.foot::after{content:"";display:block;border-top:1px solid var(--ink)} /* the closing double rule */
.foot__grid{display:grid;gap:30px;padding:48px 0 36px}
.foot__standfirst{font-size:15px;line-height:1.6;color:var(--ink-2);max-width:34ch;margin:14px 0 0}
.foot__cols{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.f-col li{margin-top:10px;border-bottom:1px solid var(--line)}
.f-col a{display:block;padding:7px 0;font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.byline{display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:space-between;border-top:1px solid var(--line);padding:16px 0 20px;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.1fr 2fr;padding:56px 0 40px}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div>
        ${brand('brand',2)}
        <p class="foot__standfirst">Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      </div>
      <div class="foot__cols">
        ${colHTML(['PRODUCT',cols.product])}
        ${colHTML(['COMPANY',cols.company])}
        ${colHTML(['LEGAL',cols.legal])}
      </div>
    </div>
    <div class="byline"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>FIG · WORK — ISSUE Nº 12</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P07 · Quiet Signal ───────────────────────── */
{
id:'P07', slug:'P07-announce', name:'Quiet Signal', skin:'tint',
headerNote:'dismissible mint ribbon (Intake open) over tinted sticky bar · pill CTA',
footerNote:'white CTA card (Ready to ship…) on tint · 3 columns · teal legal strip',
refs:['figma.com','stripe.com'],
dna:'An announcement that never shouts: a mint ribbon opens the page, a mint CTA card closes it, and the same 220 ms grid-rows collapse dismisses both moods.',
signature:'announce-collapse (grid-template-rows 220 ms ease-out, stays dismissed)',
axis:'A contained ribbon + bar · B inline · C sticky bar · D tint · E teal pill + ghost pair',
header:{
css:`
/* announcement ribbon — collapses via grid-template-rows, never height */
.announce{background:var(--mint);border-bottom:1px solid var(--line);display:grid;grid-template-rows:1fr;transition:grid-template-rows .22s ease-out,opacity .18s ease-out}
.announce.is-closed{grid-template-rows:0fr;opacity:0;overflow:hidden}
.announce__row{min-height:42px;display:flex;align-items:center;justify-content:center;gap:10px;overflow:hidden}
.announce__row p{margin:0;font:500 13px/1.3 var(--font);color:var(--ink-2);display:flex;align-items:center;gap:8px}
.announce__dot{width:7px;height:7px;border-radius:50%;background:var(--live);flex:none}
.announce__row a{color:var(--teal-hover);font-weight:600;text-decoration:none;border-bottom:1px solid currentColor}
.announce__close{position:absolute;right:12px;top:50%;translate:0 -50%;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:0;background:transparent;color:var(--muted);cursor:pointer;border-radius:var(--pill)}
.announce__close:hover{color:var(--ink)}
.announce__row{position:relative}
.nav{position:sticky;top:0;z-index:100;background:var(--tint);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip);transition:background-color .16s ease-out,color .16s ease-out}
.nav__link:hover,.nav__link[aria-current]{background:var(--surface);color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}}`,
html:`<div class="announce" id="announce">
  <div class="announce__row container">
    <p><span class="announce__dot" aria-hidden="true"></span>Intake open <a href="/contact">Start a project</a></p>
    <button class="announce__close" aria-label="Dismiss announcement">${icon('close')}</button>
  </div>
</div>
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
<div class="nav__panel" id="panel" hidden>${navList()}<a href="/login">Sign in</a></div>
</header>`,
js:[js.theme,js.disclosure,js.dismiss,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--tint)}
.cta-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--card);box-shadow:var(--shadow);
  padding:40px 32px;display:grid;gap:22px;justify-items:start;margin:56px 0 40px;position:relative;overflow:hidden}
.cta-card::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,var(--mint),transparent 55%);pointer-events:none}
.cta-card h2{margin:0;font-size:clamp(24px,3.4vw,32px);line-height:1.15;letter-spacing:-.02em;color:var(--ink);position:relative}
.cta-card p{margin:0;color:var(--body);font-size:15px;position:relative}
.cta-card__actions{display:flex;gap:12px;flex-wrap:wrap;position:relative}
.cta-card .eyebrow{position:relative}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));padding-bottom:44px}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
/* the teal legal strip closes the page, mirroring the opening ribbon */
.legal-strip{background:var(--btn);color:#eaf5f3}
.legal-strip .container{min-height:44px;display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center;justify-content:space-between;font:500 12px/1.4 var(--font)}
.legal-strip a{color:#eaf5f3;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.4)}
@media(min-width:1024px){.cta-card{grid-template-columns:1fr auto;align-items:center;padding:48px 48px}.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="cta-card">
      <div>
        <p class="eyebrow">FIG · START</p>
        <h2>Ready to ship with clarity?</h2>
        <p>Fixed-price studio work. Live Project Hub. Razorpay milestones. Intake is open.</p>
      </div>
      <div class="cta-card__actions">
        <a class="btn btn--primary" href="/contact">Start a project</a>
        <a class="btn btn--ghost" href="/login">Preview the portal</a>
      </div>
    </div>
    <div class="foot__cols">
      ${colHTML(['PRODUCT',cols.product])}
      ${colHTML(['COMPANY',cols.company])}
      ${colHTML(['LEGAL',cols.legal])}
    </div>
  </div>
  <div class="legal-strip"><div class="container">
    <span>© 2026 Nestlancer. Made in India. All rights reserved.</span>
    <span><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/verify">Verify</a></span>
  </div></div>
</footer>`}
},

/* ───────────────────────── P08 · Directory ───────────────────────── */
{
id:'P08', slug:'P08-mega', name:'Directory', skin:'solid',
headerNote:'Product disclosure opens a 4-tile mega panel · 6 inline links',
footerNote:'same 4 tiles over a 6-column sitemap · legal row',
refs:['canva.com','shopify.com'],
dna:'One disclosure, two sizes: the mega panel tiles the product under the bar, and the footer re-uses the identical tiles above a strict six-column sitemap.',
signature:'panel-stagger (panel fades/rises 240 ms, tiles follow 40 ms apart)',
axis:'A contained · B disclosure mega · C static · D solid · E dual pill pair',
header:{
css:`
.nav{position:relative;background:var(--surface);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:6px}
.nav__link:hover{color:var(--teal-hover)}
.nav__link[aria-current]{color:var(--teal-hover);background:var(--mint)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
/* mega trigger */
.trigger{display:inline-flex;align-items:center;gap:6px;font:500 14px/1 var(--font);color:var(--ink);background:transparent;border:0;padding:10px 11px;cursor:pointer;border-radius:6px}
.trigger svg.chev{transition:transform .2s ease-out}
.trigger[aria-expanded="true"] svg.chev{transform:rotate(180deg)}
.trigger:hover{color:var(--teal-hover)}
/* the mega panel */
.mega{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.mega[hidden]{display:none}
.mega__grid{display:grid;gap:10px;padding:20px 0 24px}
.tile{display:flex;gap:12px;align-items:flex-start;padding:14px;border:1px solid var(--line);border-radius:var(--card);text-decoration:none;background:var(--surface);
  opacity:0;transform:translateY(6px)}
.mega.is-open .tile{animation:tile-in .24s cubic-bezier(.2,.8,.2,1) forwards}
.mega.is-open .tile:nth-child(2){animation-delay:.04s}
.mega.is-open .tile:nth-child(3){animation-delay:.08s}
.mega.is-open .tile:nth-child(4){animation-delay:.12s}
@keyframes tile-in{to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.tile{opacity:1;transform:none;animation:none!important}}
.tile__icon{flex:none;width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;background:var(--teal-soft);color:var(--teal-hover)}
.tile b{display:block;font:600 14px/1.2 var(--font);color:var(--ink)}
.tile span{display:block;font:400 12.5px/1.45 var(--font);color:var(--muted);margin-top:3px}
.tile:hover{border-color:var(--teal)}
.tile:hover b{color:var(--teal-hover)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.mpanel{border-top:1px solid var(--line);padding:6px 0 14px}
.mpanel[hidden]{display:none}
.mpanel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){
  .nav__row{height:72px}
  .nav__list{display:flex}.actions{display:flex}
  .nav__toggle{display:none}
  .mpanel{display:none}
  .mega__grid{grid-template-columns:repeat(2,1fr);max-width:760px;margin-left:auto;margin-right:auto}
}`,
html:`<header class="nav" role="banner">
  <div class="container nav__row">
    ${brand('brand',2)}
    <button class="trigger" id="megaBtn" aria-expanded="false" aria-controls="mega">Product ${icon('chevron-down','chev')}</button>
    <nav aria-label="Primary"><ul class="nav__list">${NAV.slice(1).map(n=>`<li><a class="nav__link" href="/${n.toLowerCase()}">${n}</a></li>`).join('')}</ul></nav>
    <div class="actions">
      <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
      <a class="signin" href="/login">Sign in</a>
      <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
    </div>
    <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="mpanel" aria-expanded="false">${icon('menu')}</button>
  </div>
  <div class="mega" id="mega" hidden>
    <div class="container mega__grid">
      <a class="tile" href="/product"><span class="tile__icon">${icon('layers')}</span><span><b>Project Hub</b><span>Live milestones, files and approvals in one room.</span></span></a>
      <a class="tile" href="/pricing"><span class="tile__icon">${icon('rupee')}</span><span><b>Fixed-price quotes</b><span>₹4.2L milestone example, no subscriptions.</span></span></a>
      <a class="tile" href="/portfolio"><span class="tile__icon">${icon('pen')}</span><span><b>Portfolio</b><span>Fintech to healthcare shipped with clarity.</span></span></a>
      <a class="tile" href="/services"><span class="tile__icon">${icon('shield')}</span><span><b>Services</b><span>Design systems, portals and product builds.</span></span></a>
    </div>
  </div>
  <nav class="mpanel" id="mpanel" hidden aria-label="Primary mobile">${navList()}<a href="/login">Sign in</a></nav>
</header>`,
js:[js.theme,js.disclosure,`<script>
const setMega = disclosure(document.getElementById('megaBtn'),document.getElementById('mega'),{closeOnEsc:true});
document.getElementById('mega').addEventListener('transitionend',()=>{});
disclosure(document.getElementById('menuBtn'),document.getElementById('mpanel'));
const mega=document.getElementById('mega');
new MutationObserver(()=>mega.classList.toggle('is-open',megaBtn.getAttribute('aria-expanded')==='true'))
  .observe(megaBtn,{attributes:true,attributeFilter:['aria-expanded']});
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line)}
/* the same tiles, reused as a pre-footer index */
.foot__tiles{display:grid;gap:10px;padding:40px 0 8px}
.ftile{display:flex;gap:12px;align-items:center;padding:14px 16px;border:1px solid var(--line);border-radius:var(--card);text-decoration:none;transition:border-color .18s ease-out,transform .18s ease-out}
.ftile:hover{border-color:var(--teal);transform:translateY(-2px)}
.ftile__icon{flex:none;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;background:var(--teal-soft);color:var(--teal-hover)}
.ftile b{display:block;font:600 14px/1.2 var(--font);color:var(--ink)}
.ftile span{font:400 12.5px/1.4 var(--font);color:var(--muted)}
/* strict six-column sitemap */
.map{display:grid;gap:24px 20px;padding:32px 0 40px}
.map .eyebrow{grid-column:1/-1}
.map ul{display:contents}
.map li{margin:0}
.map a{font-size:13.5px;color:var(--body);text-decoration:none;border-bottom:1px solid transparent}
.map a:hover{color:var(--teal-hover);border-color:var(--teal)}
.map__head{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between}
.foot__legal{border-top:1px solid var(--line);padding:18px 0 26px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:768px){.foot__tiles{grid-template-columns:repeat(2,1fr)}.map{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.foot__tiles{grid-template-columns:repeat(4,1fr)}.map{grid-template-columns:repeat(6,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__tiles">
      <a class="ftile" href="/product"><span class="ftile__icon">${icon('layers')}</span><span><b>Project Hub</b><span>Live milestones</span></span></a>
      <a class="ftile" href="/pricing"><span class="ftile__icon">${icon('rupee')}</span><span><b>Pricing</b><span>Fixed-price quotes</span></span></a>
      <a class="ftile" href="/portfolio"><span class="ftile__icon">${icon('pen')}</span><span><b>Portfolio</b><span>Shipped work</span></span></a>
      <a class="ftile" href="/services"><span class="ftile__icon">${icon('shield')}</span><span><b>Services</b><span>How we build</span></span></a>
    </div>
    <div class="map">
      <div class="map__head"><p class="eyebrow">SITEMAP</p><a href="/" aria-label="Nestlancer home"><img src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="28" height="28" class="brand__light"><img src="../../assets/logo-mark-dark.svg" alt="" width="28" height="28" class="brand__dark" aria-hidden="true"></a></div>
      ${['Product','Portfolio','Blog','About','Pricing','Services','Contact','Login','Register','Terms','Privacy','Verify'].map(n=>`<ul><li><a href="/${n.toLowerCase().replace(' ','')}">${n}</a></li></ul>`).join('')}
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P09 · Front Desk ───────────────────────── */
{
id:'P09', slug:'P09-search', name:'Front Desk', skin:'tint',
headerNote:'tinted bar + full-width white search pill (56px) + mono category hint',
footerNote:'newsletter pill field leads 3 columns · legal row',
refs:['airbnb.com','wise.com'],
dna:'The search field is the tallest object in both halves — a white pill under the bar, the same white pill leading the footer as a newsletter desk.',
signature:'field-focus (ring grows from 1px hairline to 2px teal with a 150 ms ease, identical in both halves)',
axis:'A contained + hero field · B search-first inline · C sticky bar · D tint · E pill field + pill CTA',
header:{
css:`
.nav{position:sticky;top:0;z-index:100;background:var(--tint);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{background:var(--surface);color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
/* the hero search — the tallest chrome object */
.search{background:var(--tint);padding:18px 0 22px;border-bottom:1px solid var(--line)}
.search__field{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:var(--pill);padding:6px 6px 6px 18px;min-height:56px;min-width:0;transition:border-color .15s ease-out,box-shadow .15s ease-out}
.search__field:focus-within{border-color:var(--teal);box-shadow:0 0 0 2px var(--teal-soft)}
.search__field svg{color:var(--muted);flex:none}
.search__field input{flex:1;min-width:0;border:0;background:transparent;font:400 15px/1 var(--font);color:var(--ink)}
.search__field input::placeholder{color:var(--muted)}
.search__field input:focus{outline:none}
.search__go{flex:none;min-height:44px;padding:10px 20px;border-radius:var(--pill)}
.search__hint{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:10px 4px 0}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){
  .nav__row{height:68px}.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}
  .search__field{max-width:720px;margin-inline:auto}
}`,
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
</header>
<div class="search" role="search">
  <form class="container" action="/portfolio" role="search" aria-label="Site search">
    <div class="search__field">
      ${icon('search')}
      <label class="eyebrow" for="q" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Search work and services</label>
      <input id="q" name="q" type="search" placeholder="Search work, services, pricing…">
      <button class="btn btn--primary search__go" type="submit">Search</button>
    </div>
    <p class="search__hint">FINTECH · E-COMMERCE · SAAS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS</p>
  </form>
</div>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--tint);border-top:1px solid var(--line)}
.news{padding:52px 0 40px;display:grid;gap:20px;justify-items:start}
.news h2{margin:0;font-size:clamp(22px,3vw,28px);letter-spacing:-.02em;color:var(--ink);line-height:1.2}
.news p{margin:0;font-size:14.5px;color:var(--body);max-width:44ch}
/* the same white pill field, reused as the newsletter desk */
.news__field{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:var(--pill);padding:6px 6px 6px 18px;width:100%;max-width:520px;min-height:56px;min-width:0;transition:border-color .15s ease-out,box-shadow .15s ease-out}
.news__field:focus-within{border-color:var(--teal);box-shadow:0 0 0 2px var(--teal-soft)}
.news__field svg{color:var(--muted);flex:none}
.news__field input{flex:1;min-width:0;border:0;background:transparent;font:400 15px/1 var(--font);color:var(--ink)}
.news__field input::placeholder{color:var(--muted)}
.news__field input:focus{outline:none}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));padding:8px 0 40px}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.foot__legal{border-top:1px solid var(--line);padding:18px 0 26px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.news{padding-top:64px}.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="news">
      <p class="eyebrow">FIELD NOTES, MONTHLY</p>
      <h2>Notes on shipping client work.</h2>
      <p>One email a month from the studio — milestones, portals and pricing, no spam.</p>
      <form class="news__field" action="/register">
        ${icon('mail')}
        <label class="eyebrow" for="nl" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Email address</label>
        <input id="nl" type="email" name="email" placeholder="you@company.com" autocomplete="email">
        <button class="btn btn--primary" type="submit" style="min-height:44px;padding:10px 20px">Subscribe ${icon('arrow-right')}</button>
      </form>
    </div>
    <div class="foot__cols">
      ${colHTML(['PRODUCT',cols.product])}
      ${colHTML(['COMPANY',cols.company])}
      ${colHTML(['LEGAL',cols.legal])}
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`}
},

/* ───────────────────────── P10 · Side Door ───────────────────────── */
{
id:'P10', slug:'P10-auth', name:'Side Door', skin:'editorial',
headerNote:'one 64px row: back link · mark · round theme button',
footerNote:'single line: shield note · © · terms/privacy/verify',
refs:['zerodha.com','apple.com'],
dna:'A task door, not a lobby: the mark, one round action, and a hairline — the footer is the same recipe reduced to a single quiet line.',
signature:'quiet-press (the round button dips 1px on press; everything else stays still)',
axis:'A minimal single row · B none (task chrome) · C static · D editorial · E round icon button',
header:{
css:`
.bar{background:var(--bg);border-bottom:1px solid var(--line)}
.bar__row{display:flex;align-items:center;justify-content:space-between;min-height:64px}
.bar__back{display:inline-flex;align-items:center;gap:8px;font:500 14px/1 var(--font);color:var(--muted);text-decoration:none;padding:10px 6px}
.bar__back:hover{color:var(--ink)}
.bar__back svg{transform:scaleX(-1)} /* the arrow points home, i.e. left */
.brand img{height:34px;width:auto}
.round{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:50%;cursor:pointer;transition:transform .12s ease-out,background-color .15s ease-out}
.round:hover{background:var(--surface-2)}
.round:active{transform:translateY(1px)}
@media(min-width:1024px){.bar__row{min-height:72px}}`,
html:`<header class="bar" role="banner"><div class="container bar__row">
  <a class="bar__back" href="/">${icon('arrow-right','')}Back to nestlancer.com</a>
  <a class="brand" href="/login" aria-label="Nestlancer — sign in"><img class="brand__light" src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="34" height="34"><img class="brand__dark" src="../../assets/logo-mark-dark.svg" alt="" width="34" height="34" aria-hidden="true"></a>
  <button class="round" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
</div></header>`,
js:[js.theme]},
footer:{
css:`
.foot{background:var(--bg);border-top:1px solid var(--line)}
.foot__row{min-height:56px;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center;justify-content:space-between;padding:10px 0;font-size:13px;color:var(--muted)}
.foot__row a{color:var(--muted);text-decoration:none;border-bottom:1px solid var(--line)}
.foot__row a:hover{color:var(--teal-hover);border-color:var(--teal)}
.foot__shield{display:inline-flex;align-items:center;gap:7px}
.foot__shield svg{color:var(--teal-hover)}`,
html:`<footer class="foot" role="contentinfo"><div class="container foot__row">
  <span class="foot__shield">${icon('shield')}Secured session · Client portal</span>
  <span>© 2026 Nestlancer. Made in India.</span>
  <span><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/verify">Verify document</a></span>
</div></footer>`}
},
];
