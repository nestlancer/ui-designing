import { NAV, COLS, BLURB, LEGAL, ic, logo, themeBtn, list, cols, burger, BURGER_CSS, jsMenu, jsScrolled } from './kit.mjs';
import { jsPanel } from './b2.mjs';

const segCss = `
.seg{display:inline-flex;padding:2px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface)}
.seg button{min-height:28px;padding:0 12px;border:0;border-radius:var(--pill);background:none;color:var(--body);font:600 12px/1 var(--font);cursor:pointer;transition:background-color .18s ease-out,color .18s ease-out}
.seg button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}`;
const segHtml = `<div class="seg" role="group" aria-label="Currency"><button type="button" aria-pressed="true">INR ₹</button><button type="button" aria-pressed="false">USD $</button></div>`;
const segJs = `
document.querySelectorAll('.seg').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});});});`;

// ───────────────────────── P16 · Dock ─────────────────────────
const dock = [['Product', 'home'], ['Portfolio', 'layers'], ['Blog', 'pen'], ['Pricing', 'tag'], ['Contact', 'send']];
const P16 = {
  id: 'P16', slug: 'dock', name: 'Bottom dock', skin: 'elevated',
  refs: ['linear.app', 'airbnb.com'],
  motion: 'Active dock tab raises its icon 2 px and a teal indicator slides in (180 ms); the footer CTA strip rises 12 px on first reveal',
  header: 'Slim top bar; below 760 px the navigation becomes a five-tab bottom dock with safe-area padding.',
  footer: 'Compact footer that pins a “Start a project” strip just above the dock on mobile.',
  dna: 'Both halves are thumb-zone chrome: raised white bars with an upward shadow, 56 px targets and the same teal indicator — the footer strip sits on top of the dock.',
  vars: ':root{--w:1200px;--dock:0px}@media (max-width:759px){:root{--dock:72px}}',
  fpage: '@media (max-width:759px){:root{--dock:0px}}',
  hcss: `
.hd{position:sticky;top:0;z-index:50;background:var(--surface);box-shadow:0 1px 0 var(--line),0 6px 18px rgba(10,37,67,.05)}
.hd__in{display:flex;align-items:center;gap:16px;max-width:var(--w);height:60px;margin:0 auto;padding:0 16px}
.hd__nav{display:none}
.hd__act{display:flex;align-items:center;gap:10px;margin-left:auto}
.hd__act .btn{min-height:40px;padding:0 16px}
.dock{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;gap:2px;padding:6px 8px calc(6px + env(safe-area-inset-bottom));background:var(--surface);box-shadow:0 -8px 24px rgba(10,37,67,.10)}
.dock a{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:56px;border-radius:var(--card);font-size:11px;font-weight:600;color:var(--muted);transition:color .18s ease-out}
.dock a .ic{transition:transform .18s ease-out}
.dock a::before{content:"";position:absolute;top:0;left:50%;width:24px;height:3px;margin-left:-12px;border-radius:3px;background:var(--teal);transform:scaleX(0);transition:transform .18s ease-out}
.dock a[aria-current]{color:var(--ink)}
.dock a[aria-current] .ic{transform:translateY(-2px)}
.dock a[aria-current]::before{transform:scaleX(1)}
@media (max-width:759px){body{padding-bottom:var(--dock)}}
@media (min-width:760px){
  .hd__in{height:64px}
  .hd__nav{display:block;margin-left:12px}
  .hd__list{display:flex;gap:2px}
  .hd__list a{display:block;padding:8px 12px;border-radius:var(--chip);font-size:14px;transition:background-color .18s ease-out,color .18s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--surface-2);color:var(--ink)}
  .dock{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 30 })}
    <nav class="hd__nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn" href="#">Start a project</a></div>
  </div>
  <nav class="dock" aria-label="Primary mobile">${dock.map(([t, i]) => `<a href="#"${t === 'Product' ? ' aria-current="page"' : ''}>${ic(i, 22)}${t}</a>`).join('')}</nav>
</header>`,
  hjs: () => '',
  fcss: `
.ft{max-width:var(--w);margin:0 auto;padding:36px 16px calc(var(--dock) + 84px);border-radius:24px 24px 0 0;background:var(--surface);box-shadow:0 -8px 24px rgba(10,37,67,.08)}
.ft__row{display:flex;flex-wrap:wrap;gap:20px 32px;align-items:center;justify-content:space-between}
.ft__links{display:flex;flex-wrap:wrap;gap:0 6px}
.ft__links a{display:block;padding:12px 10px;font-size:14px;font-weight:500;border-radius:var(--chip);transition:background-color .18s ease-out,color .18s ease-out}
.ft__links a:hover{background:var(--surface-2);color:var(--ink)}
.ft__legal{margin:20px 0 0;padding-top:18px;border-top:1px solid var(--line);font-size:13px}
.pin{position:fixed;left:12px;right:12px;bottom:calc(var(--dock) + 12px + env(safe-area-inset-bottom));z-index:55;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:560px;margin:0 auto;padding:8px 8px 8px 18px;border-radius:var(--pill);background:var(--band);color:var(--band-text);box-shadow:var(--shadow);font-size:14px;animation:rise .4s .2s cubic-bezier(.2,.8,.2,1) both}
.pin p{display:flex;align-items:center;gap:8px;margin:0;font-weight:500}
.pin .dot{width:7px;height:7px;border-radius:50%;background:var(--live)}
.pin .btn{min-height:44px}
@keyframes rise{from{opacity:0;transform:translateY(12px)}}
@media (min-width:760px){.ft{padding:40px 24px 28px}.pin{position:static;display:none}}
@media (min-width:760px){.ft{margin-top:0}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__row">
    ${logo({ h: 32 })}
    <nav class="ft__links" aria-label="Footer">${[...COLS.PRODUCT.slice(0, 3), 'About', 'Blog', 'Contact', ...COLS.LEGAL].map((t) => `<a href="#">${t}</a>`).join('')}</nav>
  </div>
  <p class="ft__legal">${LEGAL}</p>
  <div class="pin"><p><span class="dot" aria-hidden="true"></span>Intake open</p><a class="btn" href="#">Start a project ${ic('arrow-right', 16)}</a></div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P17 · Palette ─────────────────────────
const palItems = [...NAV, 'Project Hub', 'Start a project', 'Sign in', 'Terms', 'Privacy', 'Verify document'];
const palCss = `
.kbd{display:inline-block;padding:3px 6px;border:1px solid var(--line);border-radius:6px;background:var(--surface-2);font:500 11px/1 var(--mono);color:var(--muted)}`;
const P17 = {
  id: 'P17', slug: 'palette', name: 'Command palette', skin: 'glass',
  refs: ['linear.app', 'clerk.com'],
  motion: 'Palette scales in from 97 % with a 180 ms fade; the status dot pulses every 2.4 s',
  header: 'Glass bar with a “Search… ⌘K” pill; ⌘K / Ctrl K opens a keyboard-driven palette that is also the mobile navigation.',
  footer: 'Glass card on a mint wash with live status pills (Intake open, Client portal · live) and a ⌘K hint that opens the same palette.',
  dna: 'Glass surfaces and the ⌘K keycap are shared: the header search pill and the footer hint are the same control, and status pills use the same dot.',
  vars: ':root{--w:1160px;--glass:color-mix(in srgb,var(--surface) 70%,transparent)}',
  shared: palCss,
  hcss: `
.hd{position:sticky;top:0;z-index:50;background:var(--surface);border-bottom:1px solid var(--line)}
@supports (backdrop-filter:blur(2px)){.hd{background:var(--glass);-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4)}}
.hd__in{display:flex;align-items:center;gap:18px;max-width:var(--w);height:68px;margin:0 auto;padding:0 20px}
.hd__nav{display:none}
.hd__act{display:flex;align-items:center;gap:10px;margin-left:auto}
.srch{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 10px 0 14px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);color:var(--muted);font:400 14px/1 var(--font);cursor:pointer;transition:border-color .16s ease-out}
.srch:hover{border-color:var(--teal)}
.srch__t,.srch .kbd{display:none}
.hd__cta{display:none}
.pal{position:fixed;inset:0;z-index:100;display:grid;align-items:start;justify-items:center;padding:12vh 16px 0;visibility:hidden;opacity:0;background:rgba(10,37,67,.35);transition:opacity .18s ease-out,visibility 0s .18s}
.pal.is-on{visibility:visible;opacity:1;transition-delay:0s}
.pal__box{width:min(560px,100%);max-height:70vh;overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);border-radius:var(--card);background:var(--surface);box-shadow:0 24px 60px rgba(10,37,67,.28);transform:scale(.97);transition:transform .18s ease-out}
.pal.is-on .pal__box{transform:none}
.pal__f{display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:1px solid var(--line);color:var(--muted)}
.pal__f input{flex:1;height:54px;border:0;background:none;color:var(--ink);font:400 16px/1 var(--font)}
.pal__f input:focus{outline:0}
.pal__l{overflow:auto;padding:8px}
.pal__l a{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:0 12px;border-radius:var(--chip);color:var(--ink);font-size:15px}
.pal__l a[aria-selected="true"]{background:var(--teal-soft)}
.pal__e{padding:20px;text-align:center;font-size:14px}
@media (min-width:760px){
  .srch{min-width:230px;margin-left:auto}
  .srch__t{display:block;flex:1;text-align:left}
  .srch .kbd{display:inline-block}
  .hd__act{margin-left:0}
}
@media (min-width:1000px){
  .hd__nav{display:block}
  .hd__list{display:flex;gap:2px}
  .hd__list a{display:block;padding:8px 10px;border-radius:var(--pill);font-size:14px;transition:background-color .16s ease-out,color .16s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--mint);color:var(--ink)}
  .hd__cta{display:inline-flex}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 32 })}
    <nav class="hd__nav" aria-label="Primary">${list('hd__list', NAV.slice(0, 5), 'Product')}</nav>
    <button type="button" class="srch" data-pal aria-haspopup="dialog" aria-label="Search and jump to a page">${ic('search', 18)}<span class="srch__t">Search…</span><span class="kbd" aria-hidden="true">⌘K</span></button>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a></div>
  </div>
  <div class="pal" id="pal" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="pal__box">
      <div class="pal__f">${ic('search', 18)}<label class="sr" for="pal-q">Search pages</label><input id="pal-q" type="text" placeholder="Jump to a page…" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="pal-l"><span class="kbd" aria-hidden="true">Esc</span></div>
      <div class="pal__l" id="pal-l" role="listbox" aria-label="Pages">${palItems.map((t) => `<a href="#" role="option" aria-selected="false">${t}${ic('arrow-right', 16)}</a>`).join('')}<p class="pal__e" hidden>No match — try “Pricing” or “Contact”.</p></div>
    </div>
  </div>
</header>`,
  hjs: () => palJs,
  fcss: `
.ft{padding:56px 20px 24px;background:linear-gradient(180deg,var(--bg),var(--mesh-1))}
.ft__in{max-width:var(--w);margin:0 auto}
.ft__card{padding:32px 28px 24px;border:1px solid var(--line);border-radius:20px;background:var(--surface)}
@supports (backdrop-filter:blur(2px)){.ft__card{background:var(--glass);-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4)}}
.ft__grid{display:grid;gap:32px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:14px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:10px}
.ft__col a{font-size:15px;transition:color .16s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.stat{display:flex;flex-wrap:wrap;gap:8px 10px;margin-top:32px;padding-top:20px;border-top:1px solid var(--line)}
.pill{display:inline-flex;align-items:center;gap:8px;min-height:32px;padding:0 12px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);font-size:13px;font-weight:500;color:var(--ink)}
.dot{width:7px;height:7px;border-radius:50%;background:var(--live);box-shadow:0 0 0 0 rgba(34,160,107,.6);animation:ping 2.4s ease-out infinite}
@keyframes ping{70%,100%{box-shadow:0 0 0 7px rgba(34,160,107,0)}}
button.pill{display:none;cursor:pointer;color:var(--muted);margin-left:auto}
@media (min-width:760px){button.pill{display:inline-flex}}
button.pill:hover{border-color:var(--teal)}
.ft__bar{margin-top:20px;font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){.ft__card{padding:40px 44px 28px}.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: (o = {}) => `
<footer class="ft" role="contentinfo">
  <div class="ft__in"><div class="ft__card">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 36 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="stat">
      <span class="pill"><span class="dot" aria-hidden="true"></span>Intake open</span>
      <span class="pill"><span class="dot" aria-hidden="true"></span>Client portal · live</span>
      <button type="button" class="pill" data-pal aria-haspopup="dialog">Press <span class="kbd">⌘K</span> to search</button>
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div></div>
  ${o.paired ? '' : palMarkup()}
</footer>`,
  fjs: () => palJs,
};
function palMarkup() {
  return `<div class="pal" id="pal" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="pal__box">
      <div class="pal__f">${ic('search', 18)}<label class="sr" for="pal-q">Search pages</label><input id="pal-q" type="text" placeholder="Jump to a page…" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="pal-l"><span class="kbd" aria-hidden="true">Esc</span></div>
      <div class="pal__l" id="pal-l" role="listbox" aria-label="Pages">${palItems.map((t) => `<a href="#" role="option" aria-selected="false">${t}${ic('arrow-right', 16)}</a>`).join('')}<p class="pal__e" hidden>No match — try “Pricing” or “Contact”.</p></div>
    </div>
  </div>`;
}
// the footer-only page needs the palette CSS too
P17.fcss += `
.pal{position:fixed;inset:0;z-index:100;display:grid;align-items:start;justify-items:center;padding:12vh 16px 0;visibility:hidden;opacity:0;background:rgba(10,37,67,.35);transition:opacity .18s ease-out,visibility 0s .18s}
.pal.is-on{visibility:visible;opacity:1;transition-delay:0s}
.pal__box{width:min(560px,100%);max-height:70vh;overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);border-radius:var(--card);background:var(--surface);box-shadow:0 24px 60px rgba(10,37,67,.28);transform:scale(.97);transition:transform .18s ease-out}
.pal.is-on .pal__box{transform:none}
.pal__f{display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:1px solid var(--line);color:var(--muted)}
.pal__f input{flex:1;height:54px;border:0;background:none;color:var(--ink);font:400 16px/1 var(--font)}
.pal__f input:focus{outline:0}
.pal__l{overflow:auto;padding:8px}
.pal__l a{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:0 12px;border-radius:var(--chip);color:var(--ink);font-size:15px}
.pal__l a[aria-selected="true"]{background:var(--teal-soft)}
.pal__e{padding:20px;text-align:center;font-size:14px}`;
var palJs = `
(function(){
  var pal=document.getElementById('pal'),q=document.getElementById('pal-q'),opts=[].slice.call(pal.querySelectorAll('[role=option]')),empty=pal.querySelector('.pal__e'),last=null,idx=0;
  function vis(){return opts.filter(function(o){return !o.hidden;});}
  function mark(){var v=vis();opts.forEach(function(o){o.setAttribute('aria-selected','false');});if(v[idx])v[idx].setAttribute('aria-selected','true');}
  function set(o){
    pal.classList.toggle('is-on',o);
    if(o){last=document.activeElement;q.value='';filter();setTimeout(function(){q.focus();},30);}
    else if(last){last.focus();}
  }
  function filter(){var t=q.value.trim().toLowerCase();opts.forEach(function(o){o.hidden=t&&o.textContent.toLowerCase().indexOf(t)<0;});idx=0;empty.hidden=vis().length>0;mark();}
  document.querySelectorAll('[data-pal]').forEach(function(b){b.addEventListener('click',function(){set(true);});});
  q.addEventListener('input',filter);
  pal.addEventListener('click',function(e){if(e.target===pal||e.target.closest('[role=option]'))set(false);});
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();set(!pal.classList.contains('is-on'));return;}
    if(!pal.classList.contains('is-on'))return;
    var v=vis();
    if(e.key==='Escape'){set(false);}
    else if(e.key==='ArrowDown'){e.preventDefault();idx=Math.min(idx+1,v.length-1);mark();}
    else if(e.key==='ArrowUp'){e.preventDefault();idx=Math.max(idx-1,0);mark();}
    else if(e.key==='Enter'&&v[idx]){e.preventDefault();set(false);}
    else if(e.key==='Tab'){e.preventDefault();}
  });
})();`;

// ───────────────────────── P18 · Progress ─────────────────────────
const stat = (id) => `
<ul class="proof" aria-label="Proof">
  <li><b class="num" data-count="428500" data-pre="₹" data-fmt="in">₹4,28,500</b><span>payments</span></li>
  <li><b class="num" data-count="4.2" data-pre="₹" data-suf="L" data-dec="1">₹4.2L</b><span>milestone</span></li>
  <li><b class="num">1/3</b><span>Payouts cleared</span></li>
</ul>`;
const P18 = {
  id: 'P18', slug: 'progress', name: 'Scroll progress', skin: 'solid',
  refs: ['medium.com', 'theverge.com'],
  motion: 'A 2 px teal line scrubs left→right with scroll (linear, no easing); footer figures count up once in 700 ms',
  header: 'Sticky solid bar with a 2 px teal reading-progress line along its bottom edge and a FIG · PORTAL label.',
  footer: 'A proof rail (₹4,28,500 · ₹4.2L · Payouts cleared 1/3) with a teal rule that draws in, above compact columns.',
  dna: 'Teal is spent as a single 2 px line that measures something — reading progress at the top, the proof rule at the bottom — on flat solid surfaces with mono labels.',
  vars: ':root{--w:1200px}',
  hcss: `
.hd{position:sticky;top:0;z-index:50;background:var(--surface);border-bottom:1px solid var(--line)}
.hd__prog{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--teal);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:68px;margin:0 auto;padding:0 20px}
.hd__fig{display:none;margin:0;padding-left:20px;border-left:1px solid var(--line);font:500 11px/1 var(--mono);letter-spacing:.14em;color:var(--muted)}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px 0;font-weight:500}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:1000px){
  .hd__fig{display:block}
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none;margin-left:8px}
  .hd__list{display:flex;gap:2px}
  .hd__list a{padding:8px 12px;font-size:14px;transition:color .16s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{color:var(--ink)}
  .burger{display:none}
}
@media (min-width:640px) and (max-width:999px){.burger{display:grid}}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 32 })}
    <p class="hd__fig">FIG · PORTAL</p>
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
  <div class="hd__prog" aria-hidden="true"></div>
</header>`,
  hjs: () => jsMenu('.hd') + `
(function(){
  var h=document.querySelector('.hd');
  function f(){var m=document.documentElement.scrollHeight-innerHeight;h.style.setProperty('--p',m>0?Math.min(scrollY/m,1):0);}
  addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f();
})();`,
  fcss: `
.ft{background:var(--bg);border-top:1px solid var(--line)}
.ft__in{max-width:var(--w);margin:0 auto;padding:0 20px 24px}
.proof{display:grid;grid-template-columns:1fr;position:relative;padding:32px 0;border-bottom:1px solid var(--line)}
.proof::before{content:"";position:absolute;left:0;right:0;top:-1px;height:2px;background:var(--teal);transform-origin:0 50%;transform:scaleX(0);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.ft.is-in .proof::before{transform:none}
.proof li{display:flex;align-items:baseline;gap:12px;padding:8px 0}
.proof b{color:var(--ink);font-size:clamp(28px,4vw,44px);font-weight:600;line-height:1.1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.proof span{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.ft__grid{display:grid;gap:32px;grid-template-columns:1fr 1fr;padding-top:36px}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:14px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:10px}
.ft__col a{font-size:15px;transition:color .16s ease-out}
.ft__col a:hover{color:var(--ink)}
.ft__bar{margin-top:40px;padding-top:20px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:760px){.proof{grid-template-columns:repeat(3,1fr)}.proof li{flex-direction:column;gap:8px;padding:0 24px;border-left:1px solid var(--line)}.proof li:first-child{padding-left:0;border-left:0}}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    ${stat()}
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 36 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => `
(function(){
  var ft=document.querySelector('.ft'),still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(n,el){var d=+el.dataset.dec||0,s=el.dataset.fmt==='in'?n.toLocaleString('en-IN',{maximumFractionDigits:0}):n.toFixed(d);return (el.dataset.pre||'')+s+(el.dataset.suf||'');}
  function run(){
    ft.classList.add('is-in');
    if(still)return;
    ft.querySelectorAll('[data-count]').forEach(function(el){
      var to=+el.dataset.count,t0=null;
      function step(t){t0=t0||t;var k=Math.min((t-t0)/700,1),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e,el);if(k<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    });
  }
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){run();io.disconnect();}},{threshold:.25});io.observe(ft);}else run();
})();`,
};

// ───────────────────────── P19 · Locale ─────────────────────────
const locale = (id) => `<label class="sr" for="${id}">Language</label><select id="${id}" class="sel"><option>English · India</option><option>English · US</option></select>`;
const P19 = {
  id: 'P19', slug: 'locale', name: 'Two-tier locale', skin: 'dual',
  refs: ['wise.com', 'booking.com'],
  motion: 'Currency segment swaps its pressed state in 180 ms; selects get a teal focus ring',
  header: 'Two stacked surfaces: a grey utility tier (status, language, INR / USD) above the white main bar.',
  footer: 'Columns on white, closed by the same grey tier carrying language, INR / USD and the Razorpay line.',
  dna: 'Dual surface: the grey utility tier with the language select and the INR / USD segment sits above the main bar in the header and below the columns in the footer.',
  vars: ':root{--w:1200px}',
  shared: `${segCss}
.sel{height:32px;padding:0 28px 0 12px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);color:var(--ink);font:500 12px/1 var(--font);cursor:pointer}
.sel:focus-visible{outline:2px solid var(--teal);outline-offset:2px}
.tier{background:var(--surface-2);border-bottom:1px solid var(--line)}
.tier__in{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:var(--w);min-height:44px;margin:0 auto;padding:6px 20px;font-size:12px}
.tier__l,.tier__r{display:flex;align-items:center;gap:12px;margin:0}
.tier__l{font-weight:500;color:var(--ink)}
.tier__r{flex-wrap:wrap;justify-content:flex-end;margin-left:auto}`,
  hcss: `
.hd{position:relative}
.hd__bar{background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px 0;font-weight:500}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__cta{display:none}
.hd .tier__l{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}.hd .tier__l{display:flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:2px}
  .hd__list a{padding:8px 12px;font-size:14px;border-radius:var(--chip);transition:background-color .18s ease-out,color .18s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:var(--surface-2);color:var(--ink)}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="tier"><div class="tier__in">
    <p class="tier__l">${ic('globe', 16)}<span>Intake open</span><span>· Made in India</span></p>
    <div class="tier__r">${locale('lang-h')}${segHtml}</div>
  </div></div>
  <div class="hd__bar"><div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div></div>
</header>`,
  hjs: () => jsMenu('.hd') + segJs,
  fcss: `
.ft{background:var(--surface);border-top:1px solid var(--line)}
.ft__in{max-width:var(--w);margin:0 auto;padding:56px 20px 44px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;transition:color .18s ease-out}
.ft__col a:hover{color:var(--ink);background:none;text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.ft .tier{border-bottom:0;border-top:1px solid var(--line)}
.ft .tier__in{flex-wrap:wrap;padding:10px 20px}
.ft .tier__l{font-weight:400;color:var(--body)}
.ft__legal{max-width:var(--w);margin:0 auto;padding:14px 20px 18px;font-size:12px}
.ft__legal p{margin:0}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in"><div class="ft__grid">
    <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
    ${cols('ft__col', 'eyebrow')}
  </div></div>
  <div class="tier"><div class="tier__in">
    <p class="tier__l">${ic('shield', 16)}<span>Payments via Razorpay milestones</span></p>
    <div class="tier__r">${locale('lang-f')}${segHtml}</div>
  </div></div>
  <div class="tier ft__legal-wrap"><div class="ft__legal"><p>${LEGAL}</p></div></div>
</footer>`,
  fjs: () => segJs,
};

// ───────────────────────── P20 · Split ─────────────────────────
const gutter = 'max(20px,calc((100vw - var(--w)) / 2))';
const P20 = {
  id: 'P20', slug: 'split', name: 'Split 50/50', skin: 'tint',
  refs: ['upwork.com', 'fiverr.com'],
  motion: 'Both CTAs share one hover: 2 px lift and a teal ring in 180 ms — neither is the “primary”',
  header: 'Bar split 50/50: surface with logo + nav on the left, tint half on the right with equal-weight Sign in and Start a project.',
  footer: 'Footer split 50/50: tint half with the same two equal buttons, surface half with the link columns.',
  dna: 'The page is cut down the middle in both halves — surface | tint — and the same pair of equal-width buttons lives on the tint side of each.',
  vars: ':root{--w:1200px}',
  shared: `
.duo{display:grid;gap:10px;width:100%}
.duo .btn{min-height:48px;padding:0 24px;transition:transform .18s ease-out,box-shadow .18s ease-out,background-color .18s ease-out}
.duo .btn:hover{transform:translateY(-2px);box-shadow:0 0 0 3px var(--teal-soft)}
.duo .btn--ghost{background:var(--surface)}
.duo .btn--ghost:hover{background:var(--surface)}
@media (min-width:480px){.duo{grid-template-columns:1fr 1fr}}`,
  hcss: `
.hd{position:relative;border-bottom:1px solid var(--line)}
.hd__grid{display:grid;grid-template-columns:1fr}
.hd__l{display:flex;align-items:center;gap:16px;height:72px;padding:0 20px;background:var(--surface)}
.hd__r{display:none;align-items:center;gap:14px;height:72px;padding:0 ${gutter} 0 28px;background:var(--tint)}
.hd__r .duo{max-width:340px;margin-left:auto}
.hd__nav{display:none}
.hd__mob{display:flex;align-items:center;gap:10px;margin-left:auto}
.hd__menu{display:none;padding:8px 20px 22px;background:var(--surface);border-top:1px solid var(--line)}
.is-open .hd__menu{display:block}
.hd__menu a:not(.btn){display:block;padding:14px 0;font-weight:500}
.hd__menu .duo{margin-top:12px;grid-template-columns:1fr}
${BURGER_CSS}
@media (min-width:1100px){
  .hd__grid{grid-template-columns:1fr 1fr}
  .hd__l{padding-left:${gutter}}
  .hd__r{display:flex}
  .hd__nav{display:block}
  .hd__list{display:flex;gap:0}
  .hd__list a{display:block;padding:8px 9px;font-size:14px;transition:color .16s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{color:var(--ink)}
  .hd__mob,.hd__menu{display:none!important}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__grid">
    <div class="hd__l">
      ${logo({ h: 32 })}
      <nav class="hd__nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
      <div class="hd__mob">${themeBtn()}${burger('menu')}</div>
    </div>
    <div class="hd__r">${themeBtn()}<div class="duo"><a class="btn btn--ghost" href="#">Sign in</a><a class="btn" href="#">Start a project</a></div></div>
  </div>
  <div class="hd__menu" id="menu">${NAV.map((t) => `<a href="#"${t === 'Product' ? ' aria-current="page"' : ''}>${t}</a>`).join('')}<div class="duo"><a class="btn btn--ghost" href="#">Sign in</a><a class="btn" href="#">Start a project</a></div></div>
</header>`,
  hjs: () => jsMenu('.hd'),
  fcss: `
.ft{border-top:1px solid var(--line)}
.ft__grid{display:grid;grid-template-columns:1fr}
.ft__l{padding:48px 20px;background:var(--tint)}
.ft__r{padding:48px 20px;background:var(--surface)}
.ft__l h2{max-width:14ch;margin:0 0 12px;color:var(--ink);font-size:clamp(30px,4vw,44px);line-height:1.1;letter-spacing:-.02em}
.ft__l p{max-width:36ch;margin:0 0 28px}
.ft__l .duo{max-width:380px}
.ft__cols{display:grid;gap:28px;grid-template-columns:1fr 1fr;margin-top:32px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;transition:color .16s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.ft__bar{padding:16px 20px;border-top:1px solid var(--line);background:var(--surface);font-size:13px}
.ft__bar p{margin:0;max-width:var(--w);margin:0 auto}
@media (min-width:900px){
  .ft__grid{grid-template-columns:1fr 1fr}
  .ft__l{padding:72px 48px 72px ${gutter}}
  .ft__r{padding:72px ${gutter} 72px 48px}
  .ft__cols{grid-template-columns:repeat(3,1fr)}
  .ft__bar{padding:16px ${gutter}}
  .ft__bar p{max-width:none;margin:0}
}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__grid">
    <div class="ft__l">
      <h2>Ready to ship with clarity?</h2>
      <p>${BLURB}</p>
      <div class="duo"><a class="btn btn--ghost" href="#">Sign in</a><a class="btn" href="#">Start a project</a></div>
    </div>
    <div class="ft__r">
      ${logo({ h: 36 })}
      <div class="ft__cols">${cols('ft__col', 'eyebrow')}</div>
    </div>
  </div>
  <div class="ft__bar"><p>${LEGAL}</p></div>
</footer>`,
  fjs: () => '',
};

export default [P16, P17, P18, P19, P20];
