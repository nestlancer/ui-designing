// Pairs P11–P15 — batch 3: segmented, dark-native, mesh hero, overlay, drawer.
import { icon, brand, navList, js, NAV } from './lib.mjs';

const cols = {
  product: [['Project Hub','/product'],['Pricing','/pricing'],['Services','/services'],['Portfolio','/portfolio']],
  company: [['About','/about'],['Blog','/blog'],['Contact','/contact'],['Start a project','/contact']],
  legal: [['Terms','/terms'],['Privacy','/privacy'],['Verify document','/verify']]
};
const colHTML = (c, cls='f-col') => `<nav class="${cls}" aria-label="${c[0]}"><p class="eyebrow">${c[0]}</p><ul>
${c[1].map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></nav>`;
const blurb = 'Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.';
const socialRow = (cls='soc') => `<div class="${cls}">
  <a href="#" aria-label="Nestlancer on LinkedIn">${icon('linkedin')}</a>
  <a href="#" aria-label="Nestlancer on GitHub">${icon('github')}</a>
  <a href="#" aria-label="Nestlancer on X">${icon('x')}</a></div>`;

export const pairsC = [

/* ───────────────────────── P11 · Two Lanes ───────────────────────── */
{
id:'P11', slug:'P11-segmented', name:'Two Lanes', skin:'tint',
headerNote:'tinted bar + segmented view-switcher (sliding teal thumb)',
footerNote:'₹4,28,500 count-up + two segmented proof rows · 3 columns',
refs:['slack.com','stripe.com'],
dna:'One control, two places: the sliding segmented thumb picks a view under the nav bar, and the same segmented rows pick proof stats in the footer.',
signature:'thumb-slide (240 ms cubic-bezier(.2,.8,.2,1) — the identical thumb in header and footer)',
axis:'A contained · B segmented switcher · C static bar · D tint · E segmented pill + ghost',
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
/* the segmented control */
.segmented{position:relative;display:inline-flex;background:var(--surface);border:1px solid var(--line);border-radius:var(--pill);padding:4px;margin:14px 0 18px;max-width:100%;overflow:auto}
.segmented__thumb{position:absolute;top:4px;bottom:4px;left:0;width:0;background:var(--btn);border-radius:var(--pill);transition:transform .24s cubic-bezier(.2,.8,.2,1),width .24s cubic-bezier(.2,.8,.2,1)}
.segmented a{position:relative;z-index:1;padding:10px 18px;min-height:40px;display:inline-flex;align-items:center;border-radius:var(--pill);font:500 13.5px/1 var(--font);color:var(--ink-2);text-decoration:none;white-space:nowrap}
.segmented a[aria-current]{color:#fff}
.segmented a:not([aria-current]):hover{color:var(--teal-hover)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(prefers-reduced-motion:reduce){.segmented__thumb{transition:none}}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}}`,
html:`<header class="nav" role="banner">
  <div class="container nav__row">
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
<div class="container" style="background:var(--tint)">
  <nav class="segmented" aria-label="Work views">
    <span class="segmented__thumb" aria-hidden="true"></span>
    <a href="/portfolio" aria-current="page">All work</a>
    <a href="/portfolio">Fintech</a>
    <a href="/portfolio">E-commerce</a>
    <a href="/portfolio">SaaS</a>
    <a href="/portfolio">Mobile apps</a>
  </nav>
</div>`,
js:[js.theme,js.disclosure,js.segmented,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`],},
footer:{
css:`
.foot{background:var(--tint);border-top:1px solid var(--line)}
.proof{display:grid;gap:14px;padding:48px 0 36px}
.proof__row{display:grid;grid-template-columns:1fr;gap:10px}
/* segmented proof rows — the header's thumb, reused */
.seg-row{position:relative;display:inline-flex;background:var(--surface);border:1px solid var(--line);border-radius:var(--pill);padding:4px;justify-self:start;max-width:100%;overflow:auto}
.seg-row__thumb{position:absolute;top:4px;bottom:4px;left:0;background:var(--teal-soft);border-radius:var(--pill);transition:transform .24s cubic-bezier(.2,.8,.2,1),width .24s cubic-bezier(.2,.8,.2,1)}
.seg-row span{position:relative;z-index:1;padding:8px 14px;font:500 12px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap;display:inline-flex;align-items:center;min-height:34px}
.seg-row span.on{color:var(--teal-hover)}
.proof__figure{font:600 30px/1.1 var(--font);letter-spacing:-.02em;color:var(--ink);font-variant-numeric:tabular-nums}
.proof__cap{font-size:13.5px;color:var(--body);margin:4px 0 0;max-width:40ch}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));padding:6px 0 36px}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--body);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.foot__legal{border-top:1px solid var(--line);padding:18px 0 26px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(min-width:1024px){.proof{grid-template-columns:1.1fr 1fr;align-items:start}.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="proof">
      <div>
        <p class="eyebrow">PROOF</p>
        <p class="proof__figure">₹<span data-count="428500">4,28,500</span></p>
        <p class="proof__cap">cleared through Razorpay milestones — payouts cleared 1/3 on the live Project Hub.</p>
      </div>
      <div class="proof__row">
        <div class="seg-row"><span class="seg-row__thumb" aria-hidden="true"></span><span class="on">MILESTONE ₹4.2L</span><span>INTAKE OPEN</span><span>PORTAL LIVE</span></div>
        <div class="seg-row"><span class="seg-row__thumb" aria-hidden="true"></span><span class="on">FINTECH</span><span>E-COMMERCE</span><span>SAAS</span><span>B2B PORTALS</span></div>
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
js:[js.countUp,js.segRow]}
},

/* ───────────────────────── P12 · Night Nest ───────────────────────── */
{
id:'P12', slug:'P12-dark', name:'Night Nest', skin:'invert',
headerNote:'navy band bar · glow hairline · glow-outline CTA · white links',
footerNote:'navy footer · glow status pill (portal live) · columns · legal',
refs:['vercel.com','linear.app'],
dna:'Dark-native chrome on a light page: the bar floats on --band with a teal glow hairline, and the footer is the same band signed with the same glow.',
signature:'glow-hairline (1px gradient line under the bar and above the legal row, subtle 2.4s pulse, static under reduced motion)',
axis:'A full-bleed dark band · B inline · C static · D invert · E glow-outline pill',
header:{
css:`
.nav{position:sticky;top:0;z-index:100;background:var(--band);color:var(--band-text);position:relative}
.nav::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--glow) 30%,var(--glow) 70%,transparent);opacity:.55;animation:glow 2.4s ease-in-out infinite}
@keyframes glow{50%{opacity:.25}}
@media(prefers-reduced-motion:reduce){.nav::after{animation:none}}
.nav__row{display:flex;align-items:center;gap:10px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--band-body);text-decoration:none;padding:10px 11px;border-radius:var(--chip);transition:color .16s ease-out,background-color .16s ease-out}
.nav__link:hover{color:var(--band-text);background:rgba(255,255,255,.06)}
.nav__link[aria-current]{color:#fff;background:rgba(63,184,171,.16)}
.actions{display:none;align-items:center;gap:10px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--band-text);cursor:pointer;border-radius:var(--pill)}
.icon-btn:hover{background:rgba(255,255,255,.06)}
.signin{font:500 14px/1 var(--font);color:var(--band-text);text-decoration:none;padding:10px 6px}
.cta{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:10px 18px;border-radius:var(--pill);
  background:transparent;color:var(--band-text);border:1px solid var(--glow);
  font:600 14px/1 var(--font);text-decoration:none;box-shadow:0 0 14px rgba(63,184,171,.25),inset 0 0 10px rgba(63,184,171,.08);transition:box-shadow .2s ease-out,background-color .2s ease-out}
.cta:hover{box-shadow:0 0 22px rgba(63,184,171,.45),inset 0 0 14px rgba(63,184,171,.12);background:rgba(63,184,171,.08)}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--band-text);cursor:pointer}
.nav__panel{position:absolute;left:0;right:0;top:100%;background:var(--band);border-bottom:1px solid var(--band-line);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--band-text);text-decoration:none;border-bottom:1px solid var(--band-line)}
@media(min-width:1024px){.nav__row{height:72px}.nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  <a class="brand" href="/" aria-label="Nestlancer — home"><img src="../../assets/logo-full-dark.svg" alt="Nestlancer" width="109" height="30"></a>
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="cta" href="/contact">Start a project</a>
  </div>
  <button class="nav__toggle" id="menuBtn" aria-label="Menu" aria-controls="panel" aria-expanded="false">${icon('menu')}</button>
</div>
<div class="nav__panel" id="panel" hidden>${navList()}<a href="/login">Sign in</a></div>
</header>`,
js:[js.theme,js.disclosure,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:var(--band);color:var(--band-body);position:relative;margin-top:0}
.foot::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--glow) 30%,var(--glow) 70%,transparent);opacity:.55}
.foot__grid{display:grid;gap:32px;padding:56px 0 40px}
.foot .eyebrow{color:var(--band-body);opacity:.75}
.foot__brand p{font-size:14px;max-width:30ch;margin:14px 0 0}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.foot a{color:var(--band-body);text-decoration:none;font-size:14px;transition:color .15s ease-out}
.foot a:hover{color:#fff}
.f-col li{margin-top:11px}
.status{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--band-text);border:1px solid var(--band-line);border-radius:var(--pill);padding:9px 14px}
.status i{width:7px;height:7px;border-radius:50%;background:var(--glow);box-shadow:0 0 8px var(--glow)}
.foot__legal{border-top:1px solid var(--band-line);padding:16px 0 24px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px}
@media(min-width:1024px){.foot__grid{grid-template-columns:1.3fr 2fr}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="../../assets/logo-full-dark.svg" alt="Nestlancer" width="116" height="32">
        <p>${blurb}</p>
        <p style="margin-top:18px"><span class="status"><i aria-hidden="true"></i>Client portal · live</span></p>
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

/* ───────────────────────── P13 · Riverbed ───────────────────────── */
{
id:'P13', slug:'P13-mesh', name:'Riverbed', skin:'mesh',
headerNote:'fixed transparent bar → surface + shrink after 8px scroll',
footerNote:'mesh wash · big CTA (Ready to ship…) · columns over hairline',
refs:['stripe.com','linear.app'],
dna:'The page opens with chrome floating transparent over the mesh and condenses to solid on scroll — the footer is the mesh itself, settling like the riverbed.',
signature:'condense-on-scroll (transparent→tint after 8 px, 200 ms; hero floats, footer grounds)',
axis:'A full-bleed hero chrome · B inline · C transparent→solid · D mesh · E teal pill + ghost',
header:{
css:`
/* transparent over the hero; condenses after 8px of scroll */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:background-color .2s ease-out,box-shadow .2s ease-out}
.nav.is-scrolled{background:var(--surface);box-shadow:var(--shadow)}
.nav__row{display:flex;align-items:center;gap:12px;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{background:rgba(255,255,255,.75);color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px;margin-left:auto}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
.signin{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px}
.nav__toggle{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
.nav__panel{position:fixed;left:0;right:0;top:64px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);padding:6px 20px 14px}
.nav__panel[hidden]{display:none}
.nav__panel a{display:block;padding:13px 2px;font:500 15px/1 var(--font);color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line)}
@media(min-width:1024px){
  .nav__row{height:72px}
  .nav.is-scrolled .nav__row{height:64px} /* the condense */
  .nav__row{transition:height .2s ease-out}
  .nav__list{display:flex}.actions{display:flex}.nav__toggle,.nav__panel{display:none!important}
}
@media(prefers-reduced-motion:reduce){.nav__row{transition:none}}`,
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
</header>`,
js:[js.theme,js.disclosure,js.scroll,`<script>
disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
</script>`]},
footer:{
css:`
.foot{background:linear-gradient(160deg,var(--mesh-1),var(--mesh-2));padding:64px 0 30px}
.foot__hero{display:grid;gap:18px;justify-items:start;padding-bottom:44px}
.foot__hero h2{margin:0;font-size:clamp(28px,4.4vw,44px);line-height:1.08;letter-spacing:-.025em;color:var(--ink);max-width:18ch}
.foot__hero p{margin:0;font-size:15.5px;color:var(--ink-2);max-width:46ch}
.foot__hero .eyebrow{color:var(--teal-hover)}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));padding:34px 0 36px;border-top:1px solid rgba(10,37,67,.12)}
.f-col li{margin-top:10px}
.f-col a{font-size:14px;color:var(--ink-2);text-decoration:none}
.f-col a:hover{color:var(--teal-hover)}
.foot__legal{display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px;color:var(--ink-2)}
@media(min-width:1024px){.foot__hero{justify-items:center;text-align:center}.foot__hero h2{max-width:22ch}.foot__cols{grid-template-columns:repeat(3,1fr)}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__hero">
      <p class="eyebrow">FIG · START</p>
      <h2>Ready to ship with clarity?</h2>
      <p>Fixed-price studio work. Live Project Hub. Razorpay milestones. Intake is open.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a class="btn btn--primary" href="/contact">Start a project</a>
        <a class="btn btn--ghost" href="/login" style="background:var(--surface)">Preview the portal</a>
      </div>
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

/* ───────────────────────── P14 · Loud Bird ───────────────────────── */
{
id:'P14', slug:'P14-overlay', name:'Loud Bird', skin:'invert',
headerNote:'quiet bar on mobile+desktop · full-screen navy overlay with giant links',
footerNote:'giant link columns · oversized wordmark reveal · legal',
refs:['nike.com','apple.com'],
dna:'On mobile the menu IS the design: a full-screen navy overlay with giant links; on desktop a quiet bar. The footer flips it — an oversized wordmark reveals under giant column links.',
signature:'wordmark-reveal (600 ms rise from a clip mask, 60 ms column stagger; overlay wipes with the same curve)',
axis:'A full-bleed overlay / giant footer · B overlay · C static · D invert (footer) · E giant text CTAs',
header:{
css:`
.nav{position:sticky;top:0;z-index:200;background:var(--bg);border-bottom:1px solid var(--line)}
.nav__row{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand img{height:30px}
.nav__list{display:none}
.nav__link{font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 11px;border-radius:var(--chip)}
.nav__link:hover,.nav__link[aria-current]{color:var(--teal-hover)}
.actions{display:none;align-items:center;gap:8px}
.icon-btn{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer;border-radius:var(--pill)}
/* full-screen overlay — the nav paradigm of this pair */
.overlay{position:fixed;inset:0;z-index:300;background:var(--band);color:var(--band-text);
  clip-path:circle(0% at calc(100% - 44px) 40px);visibility:hidden;
  transition:clip-path .32s cubic-bezier(.2,.8,.2,1),visibility 0s linear .32s}
.overlay.is-open{clip-path:circle(142% at calc(100% - 44px) 40px);visibility:visible;transition:clip-path .32s cubic-bezier(.2,.8,.2,1)}
.overlay__top{display:flex;align-items:center;justify-content:space-between;height:64px}
.overlay__links{padding:8vh 0 0}
.overlay__links a{display:block;font:600 clamp(34px,9vw,64px)/1.14 var(--font);letter-spacing:-.03em;color:var(--band-text);text-decoration:none;padding:6px 0;
  opacity:0;transform:translateY(14px)}
.overlay.is-open .overlay__links a{animation:link-up .4s cubic-bezier(.2,.8,.2,1) forwards}
.overlay.is-open .overlay__links a:nth-child(2){animation-delay:.05s}
.overlay.is-open .overlay__links a:nth-child(3){animation-delay:.1s}
.overlay.is-open .overlay__links a:nth-child(4){animation-delay:.15s}
.overlay.is-open .overlay__links a:nth-child(5){animation-delay:.2s}
.overlay.is-open .overlay__links a:nth-child(6){animation-delay:.25s}
.overlay.is-open .overlay__links a:nth-child(7){animation-delay:.3s}
@keyframes link-up{to{opacity:1;transform:none}}
.overlay__links a:hover{color:var(--glow)}
.overlay.is-locked,body:has(.overlay.is-open){overflow:hidden}
.overlay__foot{position:absolute;left:0;right:0;bottom:0;padding:20px;display:flex;justify-content:space-between;font:500 12px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--band-body)}
.burger{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:0;background:transparent;color:var(--ink);cursor:pointer}
@media(prefers-reduced-motion:reduce){
  .overlay{transition:opacity .15s ease-out;clip-path:none;opacity:0;visibility:hidden}
  .overlay.is-open{opacity:1;visibility:visible}
  .overlay__links a{animation:none;opacity:1;transform:none}}
@media(min-width:1024px){
  .nav__list{display:flex}.actions{display:flex}.burger{display:none}
  .overlay{display:none}}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login" style="font:500 14px/1 var(--font);color:var(--ink);text-decoration:none;padding:10px 6px">Sign in</a>
    <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
  </div>
  <button class="burger" id="menuBtn" aria-label="Open menu" aria-controls="overlay" aria-expanded="false">${icon('menu')}</button>
</div></header>
<div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="container overlay__top">
    <a href="/" aria-label="Nestlancer — home"><img src="../../assets/logo-full-dark.svg" alt="Nestlancer" width="109" height="30"></a>
    <button class="burger" id="overlayClose" aria-label="Close menu" style="color:var(--band-text)">${icon('close')}</button>
  </div>
  <nav class="container overlay__links" aria-label="Menu">
    ${NAV.map(n=>`<a href="/${n.toLowerCase()}">${n}</a>`).join('')}
  </nav>
  <div class="overlay__foot"><span>Client portal · live</span><span>INR ₹</span></div>
</div>`,
js:[js.theme,`<script>
const btn=document.getElementById('menuBtn'),ov=document.getElementById('overlay'),close=document.getElementById('overlayClose');
function set(o){btn.setAttribute('aria-expanded',o);ov.classList.toggle('is-open',o);document.documentElement.style.overflow=o?'hidden':''}
btn.addEventListener('click',()=>{set(true);document.getElementById('overlayClose').focus()});
close.addEventListener('click',()=>{set(false);btn.focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.classList.contains('is-open')){set(false);btn.focus()}});
ov.addEventListener('click',e=>{if(e.target.matches('a'))set(false)});
</script>`]},
footer:{
css:`
.foot{background:var(--band);color:var(--band-body);overflow:hidden}
.foot__grid{display:grid;gap:32px;padding:56px 0 8px}
.foot .eyebrow{color:var(--band-body);opacity:.75}
.foot__cols{display:grid;gap:26px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.foot__cols>nav{opacity:0;transform:translateY(16px)}
.foot__cols.is-in>nav{animation:col-up .5s cubic-bezier(.2,.8,.2,1) forwards}
.foot__cols.is-in>nav:nth-child(2){animation-delay:.06s}
.foot__cols.is-in>nav:nth-child(3){animation-delay:.12s}
@keyframes col-up{to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.foot__cols>nav{opacity:1;transform:none;animation:none!important}}
.f-col li{margin-top:11px}
.f-col a{font:500 17px/1.3 var(--font);color:var(--band-body);text-decoration:none}
.f-col a:hover{color:var(--band-text)}
/* the oversized wordmark — real logo, revealed from a clip mask */
.foot__wordmark{margin:44px 0 0;overflow:hidden}
.foot__wordmark img{width:min(92%,1080px);height:auto;margin-inline:auto;display:block;
  transform:translateY(102%);transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.foot__wordmark.is-in img{transform:none}
.foot__legal{border-top:1px solid var(--band-line);padding:16px 0 22px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px}
@media(min-width:1024px){.foot__grid{grid-template-columns:1fr 1.6fr}.foot__wordmark{margin-top:56px}}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div>
        <p class="eyebrow">NESTLANCER</p>
        <p style="font-size:14px;max-width:28ch;margin:14px 0 0">${blurb}</p>
        <p style="margin-top:18px"><a class="btn btn--primary" href="/contact" style="border:0">Start a project →</a></p>
      </div>
      <div class="foot__cols" data-reveal>
        ${colHTML(['PRODUCT',cols.product])}
        ${colHTML(['COMPANY',cols.company])}
        ${colHTML(['LEGAL',cols.legal])}
      </div>
    </div>
    <div class="foot__wordmark" data-reveal aria-hidden="true">
      <img src="../../assets/logo-full-dark.svg" alt="" width="1080" height="298">
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`,
js:[js.reveal]}
},

/* ───────────────────────── P15 · Pocket Library ───────────────────────── */
{
id:'P15', slug:'P15-drawer', name:'Pocket Library', skin:'solid',
headerNote:'solid bar · right drawer with 3 accordion sections + CTA pair',
footerNote:'accordion columns (open on desktop with eyebrow labels) · legal',
refs:['microsoft.com','ikea.com'],
dna:'The drawer owns the information architecture: slide-in panel with accordions on mobile, and the footer speaks the same accordion grammar over the same hairlines.',
signature:'accordion-rows (grid-template-rows 240 ms, shared by drawer sections and footer columns)',
axis:'A contained + drawer · B drawer accordions · C sticky bar · D solid · E text links + pill',
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
/* right drawer + scrim */
.scrim{position:fixed;inset:0;background:rgba(10,37,67,.4);opacity:0;visibility:hidden;transition:opacity .2s ease-out,visibility 0s linear .2s;z-index:298}
.scrim.is-on{opacity:1;visibility:visible;transition:opacity .2s ease-out}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(360px,88vw);background:var(--surface);z-index:299;
  transform:translateX(102%);transition:transform .28s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;overflow-y:auto}
.drawer.is-open{transform:none}
.drawer__head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--line)}
.drawer__sec{border-bottom:1px solid var(--line)}
.drawer__sec>button{width:100%;display:flex;align-items:center;justify-content:space-between;min-height:52px;padding:0 18px;border:0;background:transparent;font:600 14px/1 var(--font);color:var(--ink);cursor:pointer}
.drawer__sec>button svg{transition:transform .2s ease-out;color:var(--muted)}
.drawer__sec>button[aria-expanded="true"] svg{transform:rotate(180deg)}
.drawer__sec .acc{display:grid;grid-template-rows:0fr;transition:grid-template-rows .24s cubic-bezier(.2,.8,.2,1)}
.drawer__sec .acc>div{overflow:hidden}
.drawer__sec.open .acc{grid-template-rows:1fr}
.drawer__sec a{display:block;padding:12px 18px 12px 30px;font:500 14px/1.2 var(--font);color:var(--body);text-decoration:none}
.drawer__sec a:hover{color:var(--teal-hover)}
.drawer__cta{margin-top:auto;padding:18px;display:grid;gap:10px}
@media(prefers-reduced-motion:reduce){.drawer{transition:none}.drawer__sec .acc{transition:none}}
.nav__burger{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
@media(min-width:1024px){.nav__list{display:flex}.actions{display:flex}.nav__burger{display:none!important}}`,
html:`<header class="nav" role="banner"><div class="container nav__row">
  ${brand('brand',2)}
  <nav aria-label="Primary"><ul class="nav__list">${navList()}</ul></nav>
  <div class="actions">
    <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">${icon('moon')}</button>
    <a class="signin" href="/login">Sign in</a>
    <a class="btn btn--primary" href="/contact" style="min-height:40px;padding:10px 18px">Start a project</a>
  </div>
  <button class="nav__burger" id="menuBtn" aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${icon('menu')}</button>
</div></header>
<div class="scrim" id="scrim" hidden></div>
<nav class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer__head">
    <img class="brand__light" src="../../assets/logo-mark-light.svg" alt="Nestlancer" width="28" height="28">
    <img class="brand__dark" src="../../assets/logo-mark-dark.svg" alt="" width="28" height="28" aria-hidden="true">
    <button class="icon-btn" id="drawerClose" aria-label="Close menu">${icon('close')}</button>
  </div>
  <div class="drawer__sec open">
    <button aria-expanded="true" aria-controls="sec1">Product ${icon('chevron-down')}</button>
    <div class="acc" id="sec1"><div>
      <a href="/product">Project Hub</a><a href="/pricing">Pricing</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a>
    </div></div>
  </div>
  <div class="drawer__sec">
    <button aria-expanded="false" aria-controls="sec2">Company ${icon('chevron-down')}</button>
    <div class="acc" id="sec2"><div>
      <a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a>
    </div></div>
  </div>
  <div class="drawer__sec">
    <button aria-expanded="false" aria-controls="sec3">Legal ${icon('chevron-down')}</button>
    <div class="acc" id="sec3"><div>
      <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/verify">Verify document</a>
    </div></div>
  </div>
  <div class="drawer__cta">
    <a class="btn btn--primary" href="/contact">Start a project</a>
    <a class="btn btn--ghost" href="/login">Sign in</a>
  </div>
</nav>`,
js:[js.theme,`<script>
const btn=document.getElementById('menuBtn'),dr=document.getElementById('drawer'),scrim=document.getElementById('scrim'),x=document.getElementById('drawerClose');
function set(o){btn.setAttribute('aria-expanded',o);dr.classList.toggle('is-open',o);scrim.classList.toggle('is-on',o);scrim.hidden=!o;document.documentElement.style.overflow=o?'hidden':''}
btn.addEventListener('click',()=>{set(true);document.getElementById('drawerClose').focus()});
function close(){set(false);btn.focus()}
x.addEventListener('click',close);scrim.addEventListener('click',close);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('is-open'))close()});
dr.querySelectorAll('.drawer__sec>button').forEach(b=>b.addEventListener('click',()=>{
  const sec=b.parentElement,open=sec.classList.toggle('open');
  b.setAttribute('aria-expanded',open)}));
</script>`]},
footer:{
css:`
.foot{background:var(--surface);border-top:1px solid var(--line)}
.foot__grid{display:grid;gap:26px;padding:48px 0 36px}
.foot__brand p{font-size:14px;max-width:30ch;margin:14px 0 0}
/* the same accordion grammar */
.fsec{border-bottom:1px solid var(--line)}
.fsec>button{width:100%;display:flex;align-items:center;justify-content:space-between;min-height:52px;padding:0;border:0;background:transparent;font:600 13px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink);cursor:pointer}
.fsec>button svg{transition:transform .2s ease-out;color:var(--muted)}
.fsec>button[aria-expanded="true"] svg{transform:rotate(180deg)}
.fsec .acc{display:grid;grid-template-rows:0fr;transition:grid-template-rows .24s cubic-bezier(.2,.8,.2,1)}
.fsec .acc>div{overflow:hidden}
.fsec.open .acc{grid-template-rows:1fr}
.fsec li{margin:0}
.fsec a{display:block;padding:11px 0;font-size:14px;color:var(--body);text-decoration:none}
.fsec a:hover{color:var(--teal-hover)}
.foot__legal{border-top:1px solid var(--line);padding:18px 0 26px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:13px;color:var(--muted)}
@media(prefers-reduced-motion:reduce){.fsec .acc{transition:none}}
@media(min-width:1024px){
  .foot__grid{grid-template-columns:1.2fr 2fr}
  /* desktop: accordions rest open; the button retires and a static
     eyebrow label takes over from the data-label attribute */
  .fsec>button{display:none}
  .fsec::before{content:attr(data-label);display:block;padding:4px 0 10px;
    font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .fsec .acc,.fsec.open .acc{grid-template-rows:1fr}
  .foot__cols{display:grid;gap:24px;grid-template-columns:repeat(3,1fr)}
}`,
html:`<footer class="foot" role="contentinfo">
  <div class="container">
    <div class="foot__grid">
      <div class="foot__brand">
        ${brand('brand',2)}
        <p>${blurb}</p>
      </div>
      <div class="foot__cols">
        <div class="fsec open" data-label="Product"><button aria-expanded="true" aria-controls="f1">Product ${icon('chevron-down')}</button>
          <div class="acc" id="f1"><div><ul>
            <li><a href="/product">Project Hub</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li>
          </ul></div></div></div>
        <div class="fsec open" data-label="Company"><button aria-expanded="true" aria-controls="f2">Company ${icon('chevron-down')}</button>
          <div class="acc" id="f2"><div><ul>
            <li><a href="/about">About</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li><li><a href="/contact">Start a project</a></li>
          </ul></div></div></div>
        <div class="fsec open" data-label="Legal"><button aria-expanded="true" aria-controls="f3">Legal ${icon('chevron-down')}</button>
          <div class="acc" id="f3"><div><ul>
            <li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/verify">Verify document</a></li>
          </ul></div></div></div>
      </div>
    </div>
    <div class="foot__legal"><span>© 2026 Nestlancer. Made in India. All rights reserved.</span><span>INR ₹ · USD $</span></div>
  </div>
</footer>`,
js:[`<script>
document.querySelectorAll('.fsec>button').forEach(b=>b.addEventListener('click',()=>{
  b.setAttribute('aria-expanded',b.parentElement.classList.toggle('open'))}));
</script>`]}
},
];
