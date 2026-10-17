import { NAV, COLS, BLURB, LEGAL, TICKER, ic, logo, themeBtn, list, cols, burger, BURGER_CSS, jsMenu, jsScrolled } from './kit.mjs';

// ───────────────────────── P11 · Segmented ─────────────────────────
const trackCss = `
.trk{position:relative}
.trk__thumb{display:none}
@media (min-width:900px){
  .trk{display:inline-flex;padding:4px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface-2)}
  .trk ul{display:flex}
  .trk a{position:relative;z-index:1;display:block;padding:8px 14px;border-radius:var(--pill);font-size:14px;font-weight:500;transition:color .2s ease-out}
  .trk a:hover,.trk a[aria-current]{color:var(--ink)}
  .trk a[aria-current]{background:var(--surface);box-shadow:0 1px 2px rgba(10,37,67,.12)}
  .trk.is-js a[aria-current]{background:none;box-shadow:none}
  .trk.is-js .trk__thumb{display:block;position:absolute;z-index:0;top:4px;bottom:4px;left:0;width:var(--tw,0);transform:translateX(var(--tx,0));border-radius:var(--pill);background:var(--surface);box-shadow:0 1px 2px rgba(10,37,67,.12);transition:transform .22s cubic-bezier(.2,.8,.2,1),width .22s cubic-bezier(.2,.8,.2,1)}
}`;
const P11 = {
  id: 'P11', slug: 'segmented', name: 'Segmented', skin: 'tint',
  refs: ['vercel.com', 'linear.app'],
  motion: 'A pill thumb glides between links (220 ms, cubic-bezier .2,.8,.2,1); the footer ticker scrolls 40 s linear and pauses on hover',
  header: 'Nav is one segmented track with a sliding pill thumb that follows hover and focus.',
  footer: 'Domain ticker (marquee) in the same track language, then a legal bar whose links are a mini segmented track.',
  dna: 'The rounded “track” (surface-2 pill, 1 px hairline, white thumb) is the one component of both halves: nav in the header, legal links and ticker in the footer.',
  vars: ':root{--w:1200px}',
  shared: trackCss,
  hcss: `
.hd{position:relative;background:var(--bg);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;padding:8px 20px 20px;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__cta{display:none}
@media (max-width:899px){.hd__nav a{display:block;padding:14px 0;font-weight:500}}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;box-shadow:none;background:none;margin:0 auto}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary"><div class="trk"><span class="trk__thumb" aria-hidden="true"></span>${list('', NAV, 'Product').replace('<ul class="">', '<ul>')}</div></nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd') + `
document.querySelectorAll('.trk').forEach(function(t){
  var th=t.querySelector('.trk__thumb'),links=[].slice.call(t.querySelectorAll('a')),cur=t.querySelector('[aria-current]')||links[0];
  function go(a){t.style.setProperty('--tx',a.offsetLeft+'px');t.style.setProperty('--tw',a.offsetWidth+'px');}
  function init(){t.classList.add('is-js');go(cur);}
  links.forEach(function(a){['mouseenter','focus'].forEach(function(ev){a.addEventListener(ev,function(){go(a);});});});
  t.addEventListener('mouseleave',function(){go(cur);});
  t.addEventListener('focusout',function(){go(cur);});
  addEventListener('resize',function(){go(cur);});
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(init);
});`,
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--bg)}
.tick{overflow-x:auto;border-bottom:1px solid var(--line);background:var(--tint);scrollbar-width:none}
.tick__row{display:flex;gap:10px;width:max-content;padding:14px 10px;animation:tick 40s linear infinite}
.tick:hover .tick__row{animation-play-state:paused}
.tick__row span{padding:8px 16px;border:1px solid var(--line);border-radius:var(--pill);background:var(--surface);font:500 11px/1 var(--mono);letter-spacing:.14em;color:var(--ink)}
@keyframes tick{to{transform:translateX(calc(-50% - 5px))}}
@media (prefers-reduced-motion:reduce){.tick__row{animation:none}}
.ft__in{max-width:var(--w);margin:0 auto;padding:48px 20px 24px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;transition:color .2s ease-out}
.ft__col a:hover{color:var(--ink)}
.ft__bar{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between;margin-top:44px;padding-top:20px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
.ft__bar .trk{display:inline-flex}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}
@media (max-width:899px){.ft__bar .trk ul{display:flex;flex-wrap:wrap;gap:2px}.ft__bar .trk a{padding:12px 12px}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="tick" role="group" aria-label="Domains we build for"><div class="tick__row">${TICKER.map((t) => `<span>${t}</span>`).join('')}${TICKER.map((t) => `<span aria-hidden="true">${t}</span>`).join('')}</div></div>
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p>
      <nav class="trk" aria-label="Legal"><span class="trk__thumb" aria-hidden="true"></span>${list('', COLS.LEGAL).replace('<ul class="">', '<ul>')}</nav></div>
  </div>
</footer>`,
  fjs: () => `
document.querySelectorAll('.ft .trk').forEach(function(t){
  var th=t.querySelector('.trk__thumb'),links=[].slice.call(t.querySelectorAll('a'));
  function go(a){t.style.setProperty('--tx',a.offsetLeft+'px');t.style.setProperty('--tw',a.offsetWidth+'px');}
  if(!matchMedia('(min-width:900px)').matches)return;
  t.classList.add('is-js');go(links[0]);t.style.setProperty('--tw','0px');
  links.forEach(function(a){['mouseenter','focus'].forEach(function(ev){a.addEventListener(ev,function(){t.classList.add('is-on');go(a);});});});
  t.addEventListener('mouseleave',function(){t.style.setProperty('--tw','0px');});
});`,
};

// ───────────────────────── P12 · Dark ─────────────────────────
const glowLine = 'linear-gradient(90deg,transparent,var(--glow) 30%,var(--teal) 70%,transparent)';
const P12 = {
  id: 'P12', slug: 'dark', name: 'Dark native', skin: 'invert',
  refs: ['github.com', 'supabase.com'],
  motion: 'A teal-glow underline grows from the centre of each link (200 ms); footer links slide a → in',
  header: 'Always-dark navy bar with white logo, light links and a teal-glow gradient hairline, even on light pages.',
  footer: 'Always-dark navy footer with the same glow hairline, mint-glow eyebrows and → link hover.',
  dna: 'The page is inverted to the band navy in both halves, framed by the same teal-glow gradient hairline and the same centre-growing glow hover.',
  vars: ':root{--w:1200px;--hair:' + glowLine + '}',
  hcss: `
.hd{position:relative;background:var(--band);color:var(--band-body)}
.hd::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--hair)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:0;right:0;top:100%;z-index:5;padding:8px 20px 20px;background:var(--band);border-bottom:1px solid var(--band-line)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px 0;font-weight:500;color:var(--band-text)}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd .iconbtn{border-color:var(--band-line);color:var(--band-text)}
.hd .iconbtn:hover{background:rgba(255,255,255,.08)}
.hd__cta{display:none;background:var(--glow);color:#06111a}
.hd__cta:hover{background:#fff}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;border:0;background:none}
  .hd__list{display:flex;gap:2px}
  .hd__list a{position:relative;padding:8px 12px;font-size:14px;color:var(--band-body);transition:color .2s ease-out}
  .hd__list a::after{content:"";position:absolute;left:12px;right:12px;bottom:2px;height:2px;border-radius:2px;background:var(--glow);box-shadow:0 0 10px var(--glow);transform:scaleX(0);transition:transform .2s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{color:#fff}
  .hd__list a:hover::after,.hd__list a[aria-current]::after{transform:scaleX(1)}
  .burger{display:none}
}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34, mode: 'dark' })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hjs: () => jsMenu('.hd'),
  fcss: `
.ft{position:relative;background:var(--band);color:var(--band-body)}
.ft::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:var(--hair)}
.ft__in{max-width:var(--w);margin:0 auto;padding:60px 20px 28px}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft .eyebrow{color:var(--glow)}
.ft__col ul{display:grid;gap:12px}
.ft__col a{display:inline-flex;gap:0;align-items:center;font-size:15px;color:var(--band-text);transition:color .2s ease-out}
.ft__col a::after{content:"→";width:0;overflow:hidden;opacity:0;color:var(--glow);transition:width .2s ease-out,opacity .2s ease-out,margin .2s ease-out}
.ft__col a:hover{color:#fff}
.ft__col a:hover::after{width:1.2em;margin-left:6px;opacity:1}
.ft__bar{display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;margin-top:48px;padding-top:22px;border-top:1px solid var(--band-line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 40, mode: 'dark' })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p><p>Intake open</p></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P13 · Mesh ─────────────────────────
const P13 = {
  id: 'P13', slug: 'mesh', name: 'Mesh over hero', skin: 'mesh',
  refs: ['airbnb.com', 'lusion.co'],
  motion: 'Header turns from transparent to solid after 40 px (240 ms colour fade); footer CTA button lifts 2 px on hover',
  header: 'Fixed and transparent over the mesh hero; becomes solid surface with a hairline after 40 px of scroll.',
  footer: 'The same mesh gradient as the hero, closing the page with a large CTA and the columns on top of it.',
  dna: 'One mesh gradient (mesh-1 → mesh-2) is the hero behind the header and the ground of the footer — the page starts and ends in the same wash.',
  vars: ':root{--w:1200px;--mesh:linear-gradient(150deg,var(--mesh-1),var(--mesh-2) 55%,var(--bg))}',
  hcss: `
.hd{position:fixed;top:0;left:0;right:0;z-index:50;border-bottom:1px solid transparent;transition:background-color .24s linear,border-color .24s linear,box-shadow .24s linear}
.hd[data-scrolled]{background:var(--surface);border-bottom-color:var(--line);box-shadow:var(--shadow)}
.hd__in{display:flex;align-items:center;gap:20px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__nav{display:none;position:absolute;left:12px;right:12px;top:calc(100% + 4px);padding:10px;border-radius:var(--card);background:var(--surface);box-shadow:var(--shadow)}
.is-open .hd__nav{display:block}
.hd__list a{display:block;padding:14px;font-weight:500;border-radius:var(--chip)}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd .iconbtn{background:color-mix(in srgb,var(--surface) 60%,transparent)}
.hd__cta{display:none}
${BURGER_CSS}
@media (min-width:640px){.hd__cta{display:inline-flex}}
@media (min-width:900px){
  .hd__nav{display:block;position:static;padding:0;box-shadow:none;background:none}
  .hd__list{display:flex;gap:2px}
  .hd__list a{padding:8px 14px;font-size:14px;color:var(--ink-2);transition:color .18s ease-out,background-color .18s ease-out}
  .hd__list a:hover,.hd__list a[aria-current]{background:color-mix(in srgb,var(--surface) 70%,transparent)}
  .burger{display:none}
}
/* demo hero so the transparent state has something to sit on */
.hero{padding:150px 24px 110px;min-height:72vh;background:var(--mesh)}
.hero__c{max-width:720px;margin:0 auto}
.hero h1{margin:0 0 12px;color:var(--ink);font-size:clamp(32px,5vw,52px);line-height:1.1;letter-spacing:-.02em}
[data-frame] .hero{min-height:0;height:140px;padding:0}
[data-frame] .hero__c{display:none}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34 })}
    <nav class="hd__nav" id="nav" aria-label="Primary">${list('hd__list', NAV, 'Product')}</nav>
    <div class="hd__act">${themeBtn()}<a class="btn hd__cta" href="#">Start a project</a>${burger('nav')}</div>
  </div>
</header>`,
  hdemo: () => `
<main id="main">
  <section class="hero"><div class="hero__c"><p class="eyebrow">FIG · START</p><h1>Product studio + client portal.</h1><p>${BLURB}</p></div></section>
  <div class="demo demo--tall"><p>Scroll: the header turns solid after 40 px.</p></div>
</main>`,
  hjs: () => jsMenu('.hd') + jsScrolled('.hd', 40),
  fcss: `
.ft{background:var(--mesh)}
.ft__in{max-width:var(--w);margin:0 auto;padding:80px 20px 28px}
.cta{max-width:760px;margin:0 auto 72px;text-align:center}
.cta h2{margin:0 0 14px;color:var(--ink);font-size:clamp(32px,5vw,52px);line-height:1.1;letter-spacing:-.02em}
.cta p{margin:0 0 26px;font-size:17px}
.cta__act{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.cta .btn:not(.btn--ghost){min-height:52px;padding:0 28px;box-shadow:0 10px 24px rgba(31,122,115,.28);transition:transform .2s ease-out,background-color .18s ease-out}
.cta .btn:not(.btn--ghost):hover{transform:translateY(-2px)}
.cta .btn--ghost{min-height:52px;background:color-mix(in srgb,var(--surface) 70%,transparent)}
.ft__grid{display:grid;gap:36px;grid-template-columns:1fr 1fr;padding-top:36px;border-top:1px solid color-mix(in srgb,var(--ink) 12%,transparent)}
.ft__brand{grid-column:1/-1}
.ft__brand p{max-width:34ch;margin:16px 0 0;font-size:15px}
.ft__col ul{display:grid;gap:12px}
.ft__col a{font-size:15px;transition:color .18s ease-out}
.ft__col a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--teal)}
.ft__bar{margin-top:44px;font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){.ft__grid{grid-template-columns:1.5fr 1fr 1fr 1fr}.ft__brand{grid-column:auto}}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <section class="cta" aria-labelledby="cta-h">
      <h2 id="cta-h">Ready to ship with clarity?</h2>
      <p>Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      <div class="cta__act"><a class="btn" href="#">Start a project ${ic('arrow-right', 16)}</a><a class="btn btn--ghost" href="#">Preview the portal</a></div>
    </section>
    <div class="ft__grid">
      <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
      ${cols('ft__col', 'eyebrow')}
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── shared panel JS (overlay / drawer) ─────────────────────────
export const jsPanel = (rootSel, panelSel, closeSel) => `
(function(){
  var root=document.querySelector('${rootSel}'),open=root.querySelector('[data-menu-btn]'),panel=root.querySelector('${panelSel}'),close=root.querySelector('${closeSel}');
  var scrim=root.querySelector('.scrim');
  function set(o){
    root.classList.toggle('is-open',o);open.setAttribute('aria-expanded',o);
    document.documentElement.style.overflow=o?'hidden':'';
    if(o){setTimeout(function(){close.focus();},60);}else{open.focus();}
  }
  open.addEventListener('click',function(){set(true);});
  close.addEventListener('click',function(){set(false);});
  if(scrim)scrim.addEventListener('click',function(){set(false);});
  root.addEventListener('keydown',function(e){
    if(!root.classList.contains('is-open'))return;
    if(e.key==='Escape'){set(false);return;}
    if(e.key!=='Tab')return;
    var f=[].slice.call(panel.querySelectorAll('a,button,summary')).filter(function(x){return x.offsetParent!==null;});
    if(!f.length)return;
    var a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
    else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
  });
})();`;

// ───────────────────────── P14 · Overlay ─────────────────────────
const P14 = {
  id: 'P14', slug: 'overlay', name: 'Fullscreen overlay', skin: 'editorial',
  refs: ['cuberto.com', 'pentagram.com'],
  motion: 'Overlay links rise 24 px and fade in with a 45 ms stagger (400 ms each); footer logo scales up from 97 % as it scrolls into view',
  header: 'Only the logo and a “Menu” button; it opens a full-viewport overlay with giant numbered links, focus-trapped, Esc to close.',
  footer: 'Oversized full logo across the page, links in a single row above it, legal line below.',
  dna: 'Scale is the system: giant type in the overlay, a giant logo in the footer, with nothing but hairlines around it.',
  vars: ':root{--w:1280px}',
  hcss: `
.hd{background:var(--bg);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;justify-content:space-between;max-width:var(--w);height:80px;margin:0 auto;padding:0 24px}
.hd__act{display:flex;align-items:center;gap:10px}
.menu{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 18px;border:1px solid var(--ink);border-radius:var(--pill);background:none;font:600 14px/1 var(--font);color:var(--ink);cursor:pointer;transition:background-color .18s ease-out,color .18s ease-out}
.menu:hover{background:var(--ink);color:var(--bg)}
.ov{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;visibility:hidden;opacity:0;background:var(--bg);transition:opacity .3s ease-out,visibility 0s .3s}
.is-open .ov{visibility:visible;opacity:1;transition-delay:0s}
.ov__top{display:flex;align-items:center;justify-content:space-between;max-width:var(--w);width:100%;height:80px;margin:0 auto;padding:0 24px;flex:none}
.ov__list{flex:1;display:flex;flex-direction:column;justify-content:center;max-width:var(--w);width:100%;margin:0 auto;padding:0 24px;overflow:auto}
.ov__list li{border-bottom:1px solid var(--line);opacity:0;transform:translateY(24px);transition:opacity .4s ease-out,transform .4s cubic-bezier(.2,.8,.2,1)}
.is-open .ov__list li{opacity:1;transform:none;transition-delay:calc(var(--i) * 45ms + 80ms)}
.ov__list a{display:flex;align-items:baseline;gap:18px;padding:clamp(8px,1.6vh,16px) 0;color:var(--ink);font-weight:600;font-size:clamp(30px,6.4vh,64px);line-height:1.1;letter-spacing:-.02em;transition:color .18s ease-out,padding-left .2s ease-out}
.ov__list a span{font:500 12px/1 var(--mono);letter-spacing:.14em;color:var(--muted)}
.ov__list a:hover{color:var(--teal-hover);padding-left:10px}
.ov__foot{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between;max-width:var(--w);width:100%;margin:0 auto;padding:20px 24px 28px;flex:none}
.ov__foot p{margin:0;max-width:44ch;font-size:15px}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 36 })}
    <div class="hd__act">${themeBtn()}<button type="button" class="menu" data-menu-btn aria-expanded="false" aria-controls="ov">Menu ${ic('menu', 18)}</button></div>
  </div>
  <div class="ov" id="ov" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="ov__top">${logo({ h: 36 })}<button type="button" class="menu ov__x">Close ${ic('close', 18)}</button></div>
    <nav aria-label="Primary"><ul class="ov__list">${NAV.map((t, i) => `<li style="--i:${i}"><a href="#"${t === 'Product' ? ' aria-current="page"' : ''}><span>0${i + 1}</span>${t}</a></li>`).join('')}</ul></nav>
    <div class="ov__foot"><p>${BLURB}</p><a class="btn" href="#">Start a project ${ic('arrow-right', 16)}</a></div>
  </div>
</header>`,
  hjs: () => jsPanel('.hd', '.ov', '.ov__x'),
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--bg)}
.ft__in{max-width:var(--w);margin:0 auto;padding:44px 24px 28px}
.ft__links{display:flex;flex-wrap:wrap;gap:4px 28px;padding-bottom:36px}
.ft__links a{padding:8px 0;font-weight:500;color:var(--ink);transition:color .18s ease-out}
.ft__links a:hover{color:var(--teal-hover);text-decoration:underline;text-underline-offset:5px}
.ft__big{display:block;padding:24px 0 32px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.ft__big img{width:100%;max-width:none;height:auto;transform-origin:left center}
@supports (animation-timeline:view()){
  .ft__big img{animation:grow linear both;animation-timeline:view();animation-range:entry 0% entry 100%}
  @keyframes grow{from{transform:scale(.97)}to{transform:none}}
}
.ft__bar{display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between;padding-top:20px;font-size:13px}
.ft__bar p{margin:0}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <nav class="ft__links" aria-label="Footer">${[...NAV, ...COLS.LEGAL].map((t) => `<a href="#">${t}</a>`).join('')}</nav>
    <a class="logo ft__big" href="#" aria-label="Nestlancer home"><img class="logo__l" src="../../assets/logo-full-light.svg" width="1973" height="544" alt="Nestlancer"><img class="logo__d" src="../../assets/logo-full-dark.svg" width="1973" height="544" alt=""></a>
    <div class="ft__bar"><p>${LEGAL}</p><p>${BLURB}</p></div>
  </div>
</footer>`,
  fjs: () => '',
};

// ───────────────────────── P15 · Drawer ─────────────────────────
const accordionCss = `
.acc{border-bottom:1px solid var(--line)}
.acc summary{display:flex;align-items:center;justify-content:space-between;min-height:48px;cursor:pointer;list-style:none}
.acc summary::-webkit-details-marker{display:none}
.acc summary .ic{transition:transform .2s ease-out}
.acc[open] summary .ic{transform:rotate(180deg)}
.acc ul{display:grid;gap:2px;padding:0 0 14px}
.acc li a{display:block;padding:8px 0;font-size:15px;color:var(--body);transition:color .16s ease-out,padding-left .16s ease-out}
.acc li a:hover{color:var(--ink);padding-left:6px}`;
const P15 = {
  id: 'P15', slug: 'drawer', name: 'Side drawer', skin: 'solid',
  refs: ['gov.uk', 'ikea.com'],
  motion: 'Drawer slides in from the right in 280 ms with a fading scrim; accordion chevrons rotate 180° (200 ms)',
  header: 'Logo, Sign in, CTA and a burger; the burger opens a right drawer with accordion sections, scrim, focus trap and Esc.',
  footer: 'Accordion columns built from the drawer’s own <details> pattern; always open on desktop, collapsible on mobile.',
  dna: 'Accordions are the structure of both halves — the drawer’s Product / Company / Legal sections reappear as the footer’s columns with the same summary row and chevron.',
  vars: ':root{--w:1200px}',
  shared: accordionCss,
  hcss: `
.hd{background:var(--surface);border-bottom:1px solid var(--line)}
.hd__in{display:flex;align-items:center;gap:16px;max-width:var(--w);height:72px;margin:0 auto;padding:0 20px}
.hd__act{display:flex;align-items:center;gap:12px;margin-left:auto}
.hd__sign,.hd__cta{display:none}
.scrim{position:fixed;inset:0;z-index:90;visibility:hidden;opacity:0;background:rgba(10,37,67,.45);transition:opacity .28s ease-out,visibility 0s .28s}
.is-open .scrim{visibility:visible;opacity:1;transition-delay:0s}
.dr{position:fixed;top:0;right:0;bottom:0;z-index:100;display:flex;flex-direction:column;width:min(400px,100%);visibility:hidden;transform:translateX(100%);background:var(--surface);border-left:1px solid var(--line);box-shadow:var(--shadow);transition:transform .28s cubic-bezier(.2,.8,.2,1),visibility 0s .28s}
.is-open .dr{visibility:visible;transform:none;transition-delay:0s}
.dr__head{display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 20px;border-bottom:1px solid var(--line);flex:none}
.dr__body{flex:1;overflow:auto;padding:8px 20px}
.dr__body .acc summary{font-weight:600;color:var(--ink)}
.dr__foot{display:grid;gap:10px;padding:16px 20px 24px;border-top:1px solid var(--line);flex:none}
.dr__foot .btn{width:100%}
@media (min-width:640px){.hd__cta{display:inline-flex}.hd__sign{display:block;font-weight:600;font-size:14px;color:var(--ink)}}`,
  hhtml: () => `
<header class="hd" role="banner">
  <div class="hd__in">
    ${logo({ h: 34 })}
    <div class="hd__act">${themeBtn()}<a class="hd__sign" href="#">Sign in</a><a class="btn hd__cta" href="#">Start a project</a>
      <button type="button" class="iconbtn" data-menu-btn aria-expanded="false" aria-controls="dr" aria-label="Open menu">${ic('menu', 20)}</button></div>
  </div>
  <div class="scrim" aria-hidden="true"></div>
  <div class="dr" id="dr" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="dr__head">${logo({ h: 30 })}<button type="button" class="iconbtn dr__x" aria-label="Close menu">${ic('close', 20)}</button></div>
    <nav class="dr__body" aria-label="Primary">
      ${Object.entries(COLS).map(([h, l], i) => `<details class="acc"${i === 0 ? ' open' : ''}><summary>${h[0] + h.slice(1).toLowerCase()} ${ic('chevron-down', 18)}</summary>${list('', l).replace('<ul class="">', '<ul>')}</details>`).join('')}
    </nav>
    <div class="dr__foot"><a class="btn" href="#">Start a project ${ic('arrow-right', 16)}</a><a class="btn btn--ghost" href="#">Sign in</a></div>
  </div>
</header>`,
  hjs: () => jsPanel('.hd', '.dr', '.dr__x'),
  fcss: `
.ft{border-top:1px solid var(--line);background:var(--bg)}
.ft__in{max-width:var(--w);margin:0 auto;padding:44px 20px 24px}
.ft__brand p{max-width:34ch;margin:16px 0 28px;font-size:15px}
.ft .acc summary{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.ft .acc:first-of-type{border-top:1px solid var(--line)}
.ft__bar{margin-top:32px;padding-top:20px;border-top:1px solid var(--line);font-size:13px}
.ft__bar p{margin:0}
@media (min-width:900px){
  .ft__top{display:grid;grid-template-columns:1.5fr 3fr;gap:36px}
  .ft__brand p{margin-bottom:0}
  .ft__cols{display:grid;grid-template-columns:repeat(3,1fr);gap:36px}
  .ft .acc{border:0}
  .ft .acc:first-of-type{border-top:0}
  .ft .acc summary{pointer-events:none;min-height:0;margin-bottom:16px}
  .ft .acc summary .ic{display:none}
  .ft .acc ul{gap:10px;padding:0}
  .ft .acc li a{padding:0}
}`,
  fhtml: () => `
<footer class="ft" role="contentinfo">
  <div class="ft__in">
    <div class="ft__top">
      <div class="ft__brand">${logo({ h: 38 })}<p>${BLURB}</p></div>
      <nav class="ft__cols" aria-label="Footer">
        ${Object.entries(COLS).map(([h, l]) => `<details class="acc"><summary>${h} ${ic('chevron-down', 18)}</summary>${list('', l).replace('<ul class="">', '<ul>')}</details>`).join('')}
      </nav>
    </div>
    <div class="ft__bar"><p>${LEGAL}</p></div>
  </div>
</footer>`,
  fjs: () => `
(function(){
  var mq=matchMedia('(min-width:900px)'),acc=document.querySelectorAll('.ft .acc');
  function sync(){acc.forEach(function(d){d.open=mq.matches;});}
  mq.addEventListener('change',sync);sync();
})();`,
};

export default [P11, P12, P13, P14, P15];
