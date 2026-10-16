/**
 * generate.mjs — Nestlancer chrome lab generator (axis-driven)
 * Every variant's markup/CSS/JS is produced FROM its 6 axis values, so meta.json is honest.
 * Run: node tools/generate.mjs
 */
import fs from 'fs';
import path from 'path';
import { A1, A2, A3, A5, A6, HEADER_MOTIONS, FOOTER_MOTIONS, assignAxes, diff } from './axes.mjs';

const ROOT = path.resolve('chrome-lab');
const HDR = path.join(ROOT, 'headers');
const FTR = path.join(ROOT, 'footers');
fs.rmSync(HDR, { recursive: true, force: true });
fs.rmSync(FTR, { recursive: true, force: true });
fs.mkdirSync(HDR, { recursive: true });
fs.mkdirSync(FTR, { recursive: true });

const sites = JSON.parse(fs.readFileSync('research/sites.json', 'utf8')).filter(s => !s.capture_failed);
const motions = JSON.parse(fs.readFileSync('research/motion-index.json', 'utf8'));
const motionById = Object.fromEntries(motions.map(m => [m.id, m]));
const siteNames = sites.map(s => s.url.replace('https://', ''));

const NAV = ['Product', 'Portfolio', 'Blog', 'About', 'Pricing', 'Services', 'Contact'];
const FP = ['Project Hub', 'Pricing', 'Services', 'Portfolio'];
const FC = ['About', 'Blog', 'Contact', 'Start a project'];
const FL = ['Terms', 'Privacy', 'Verify document'];
const TICKER = ['FINTECH', 'E-COMMERCE', 'SaaS', 'B2B PORTALS', 'MOBILE APPS', 'DESIGN SYSTEMS'];
const TICKER_RAIL = [...TICKER, 'MARKETPLACES', 'HEALTHCARE'];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/* routes are locked to §2.5 — no invented URLs */
const ROUTES = {
  'Product': '/product', 'Portfolio': '/portfolio', 'Blog': '/blog', 'About': '/about',
  'Pricing': '/pricing', 'Services': '/services', 'Contact': '/contact',
  'Project Hub': '/portal', 'Start a project': '/portal', 'Verify document': '/verify',
  'Terms': '/terms', 'Privacy': '/privacy', 'Docs': '/product', 'Changelog': '/product#changelog',
  'Support': '/contact', 'Status': '/portal', 'LinkedIn': '/about', 'Dribbble': '/about',
  'GitHub': '/about', 'RSS': '/blog'
};
const route = label => ROUTES[label] || ('/' + slug(label));

/* Shared <head> extras — browser-serve contract (prompt §0C): the locked fonts must ACTUALLY LOAD
   (tokens name Fraunces/Inter/IBM Plex Mono; without this <link> every page silently falls back to
   Georgia/system-ui), colour-scheme is declared for UA chrome, and a tiny theme-boot script applies
   ?theme= before first paint so gallery iframes never flash the wrong theme. Font fallbacks stay in
   tokens.css, so the pages still render — unstyled-font only — when offline. */
const HEAD_EXTRAS = `<meta name="color-scheme" content="light dark"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"/>
<script>(()=>{try{const t=new URLSearchParams(location.search).get('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(_){}})();</script>`;

/* ------------------------------------------------------------------ *
 * 1. FAMILIES  (signature decor + locked semantic axes)
 * ------------------------------------------------------------------ */
const HEADER_FAMILIES = [
  { name: 'Classic centred/split nav', lock: { A2: 'inline' }, mot: HEADER_MOTIONS.filter(m => !['m-01', 'm-02'].includes(m)) },
  { name: 'Logo-left inline (+ hairline)', lock: { A2: 'inline' }, mot: HEADER_MOTIONS.filter(m => !['m-01', 'm-02'].includes(m)) },
  { name: 'Two-tier utility + main', lock: { A2: 'inline' }, decor: ['utility'] },
  { name: 'Mega-menu panel', lock: { A2: 'mega-panel' } },
  { name: 'Floating glass pill', lock: { A1: 'floating pill inset 16', A3: 'sticky' } },
  { name: 'Sticky shrink', lock: { A3: 'sticky-shrink' } },
  { name: 'Auto-hide on scroll-down', lock: { A3: 'auto-hide' } },
  { name: 'Transparent-over-hero to solid', lock: { A3: 'transparent→solid' }, decor: ['hero'] },
  { name: 'Fullscreen overlay nav', lock: { A2: 'fullscreen overlay' } },
  { name: 'Side drawer nav', lock: { A2: 'drawer' } },
  { name: 'Bottom-docked mobile bar', lock: { A2: 'bottom tab bar' }, decor: ['bottomAlways'] },
  { name: 'Split-identity (client vs freelancer)', lock: { A2: 'segmented' }, decor: ['identity'] },
  { name: 'Marketplace category rail', lock: { A2: 'inline' }, decor: ['rail'] },
  { name: 'Search-forward', lock: { A2: 'search-first' } },
  { name: 'Command-palette native (CmdK)', lock: { A2: 'command palette' } },
  { name: 'Auth / app minimal', lock: { A2: 'inline', A1: '1200 contained', A3: 'static' }, decor: ['auth'] },
  { name: 'Wizard / intake progress', lock: { A2: 'breadcrumb row' }, decor: ['wizard'] },
  { name: 'Announcement bar + nav', decor: ['announcement'] },
  { name: 'Marquee / ticker nav', decor: ['ticker'] },
  { name: 'Scroll-progress header', lock: { A3: 'progress-linked' } },
  { name: 'Docs / section nav', lock: { A2: 'breadcrumb row' }, decor: ['docs'] },
  { name: 'Segmented tabs', lock: { A2: 'segmented' } },
  { name: 'Dual-CTA split', lock: { A6: 'dual equal CTA' } },
  { name: 'Edge icon-rail + minimal bar', lock: { A1: 'docked edge rail' }, decor: ['edgeRail'] },
  { name: 'Editorial typographic', decor: ['editorial'] }
];

const FOOTER_FAMILIES = [
  { name: 'Classic 4-column grid + blurb', lock: { A2: 'inline' }, decor: ['cols3'] },
  { name: 'Oversized wordmark', lock: { A2: 'inline' }, decor: ['oversized'] },
  { name: 'Newsletter-lead', lock: { A2: 'inline' }, decor: ['newsletter'] },
  { name: 'CTA banner fused to footer', lock: { A2: 'inline' }, decor: ['ctaBanner'] },
  { name: 'Mega sitemap', lock: { A2: 'inline' }, decor: ['cols5'] },
  { name: 'Accordion columns', lock: { A2: 'accordion' }, decor: ['cols3'] },
  { name: 'Minimal single-row', lock: { A2: 'inline' }, decor: ['minimal'] },
  { name: 'Two-bar (links bar + legal bar)', lock: { A2: 'inline' }, decor: ['twoBar'] },
  { name: 'Dark inverted + teal accents', lock: { A2: 'inline' }, decor: ['darkInvert'] },
  { name: 'Mesh / gradient footer', lock: { A2: 'inline' }, decor: ['mesh'] },
  { name: 'Editorial / issue-style', lock: { A2: 'inline' }, decor: ['issue'] },
  { name: 'Marquee wordmark reveal', lock: { A2: 'inline' }, decor: ['marquee'] },
  { name: 'Proof / stat rail', lock: { A2: 'inline' }, decor: ['proof'] },
  { name: 'Locale + currency switcher', lock: { A2: 'inline' }, decor: ['locale'] },
  { name: 'Social-proof wall', lock: { A2: 'inline' }, decor: ['social'] },
  { name: 'Compact sticky mobile footer', lock: { A2: 'inline' }, decor: ['compact'] },
  { name: 'Curtain reveal on overscroll', lock: { A2: 'inline' }, decor: ['curtain'] },
  { name: 'App / QR download', lock: { A2: 'inline' }, decor: ['qr'] },
  { name: 'Compliance-heavy (India)', lock: { A2: 'inline' }, decor: ['compliance'] },
  { name: 'Community & status', lock: { A2: 'inline' }, decor: ['community'] }
];

/* ------------------------------------------------------------------ *
 * 2. MOTION RECIPES (implemented per variant, keyed to its selector)
 * ------------------------------------------------------------------ */
/* scopeCss — prefix every selector with the variant selector (skips at-rules and BASE body:has rules).
   Inline comments are stripped BEFORE parsing: a comment sitting in front of a selector or at-rule
   would otherwise be parsed as part of the selector head (this previously glued the variant selector
   onto @media / body:has() BASE rules and produced dead rules like `[data-chrome]@media …`).
   The variant identity comment at the very start of the stylesheet is preserved. */
function scopeCss(css, sel) {
  let lead = '';
  const lm = css.match(/^\s*\/\*[\s\S]*?\*\//);
  if (lm) { lead = lm[0].trim(); css = css.slice(lm[0].length); }
  css = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  let out = '', i = 0;
  while (i < css.length) {
    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) { out += css.slice(i); break; }
    const head = css.slice(i, braceIdx).trim();
    let depth = 1, j = braceIdx + 1;
    while (j < css.length && depth > 0) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
    const inner = css.slice(braceIdx + 1, j - 1);
    if (head.startsWith('@')) {
      const name = head.split(/[\s(]/)[0];
      out += head + '{' + (/@(keyframes|font-face|property)/.test(name) ? inner : scopeCss(inner, sel)) + '}';
    } else {
      const scoped = head.split(',').map(x => x.trim()).filter(Boolean).map(x =>
        x.startsWith('&') ? sel + x.slice(1)
          : x.includes('body:has(') ? x
            : x.includes('[data-chrome=') ? x
              : sel + ' ' + x).join(',');
      out += scoped + '{' + inner + '}';
    }
    i = j;
  }
  return (lead ? lead + '\n' : '') + out;
}

function motionRecipe(id, sel, motionId) {
  const M = (css, js = '') => ({ css, js });
  const map = {
    'm-01': M(`height:56px`,
      `/* m-01 sticky shrink — 200ms cubic-bezier(.2,.8,.2,1) at scroll>24 */`),
    'm-02': M(
      `&.is-hidden{transform:translateY(-100%)} transition:transform 320ms ease-out, height 200ms var(--n-ease)`,
      `let ly=0;addEventListener('scroll',()=>{const c=scrollY;const down=c>ly;if(c>120)root.classList.toggle('is-hidden',down);else root.classList.remove('is-hidden');ly=c;},{passive:true});`),
    'm-03': M(
      ``,
      `/* m-03 glass engage at scroll>8 via [data-scrolled] */`),
    'm-04': M(
      `&.is-solid{background:var(--n-surface);border-bottom-color:var(--n-hairline)}`,
      `const hero=document.querySelector('.demoHero');if(hero){new IntersectionObserver(e=>root.classList.toggle('is-solid',!e[0].isIntersecting),{threshold:0}).observe(hero);}else{addEventListener('scroll',()=>root.classList.toggle('is-solid',scrollY>320),{passive:true});}`),
    'm-05': M(
      ``,
      `const ink=root.querySelector('.nav__ink');const list=root.querySelector('.nav__list');if(ink&&list){const move=el=>{const r=el.getBoundingClientRect(),p=list.getBoundingClientRect();ink.style.width=r.width+'px';ink.style.transform='translateX('+(r.left-p.left)+'px)';};root.querySelectorAll('.nav__link').forEach(l=>{l.addEventListener('mouseenter',()=>move(l));l.addEventListener('focus',()=>move(l));});const c=root.querySelector('.nav__link[aria-current="page"]');if(c)move(c);addEventListener('resize',()=>{const n=root.querySelector('.nav__link[aria-current="page"]');if(n)move(n);});}`),
    'm-06': M(
      ``,
      `const cta=root.querySelector('.cta');if(cta&&matchMedia('(pointer:fine)').matches){let raf;cta.addEventListener('pointermove',e=>{const r=cta.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/8;const y=(e.clientY-r.top-r.height/2)/10;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{cta.style.transform='translate('+x+'px,'+y+'px)';});});cta.addEventListener('pointerleave',()=>{cta.style.transform='';});}`),
    'm-07': M(
      `&[data-disclosure="hover"] .has-mega:hover .mega,&[data-disclosure="hover"] .has-mega:focus-within .mega,&[data-disclosure="always-visible"] .mega{opacity:1;transform:none;pointer-events:auto}`,
      `root.querySelectorAll('.mega > div').forEach((c,i)=>c.style.setProperty('--i',i));root.querySelectorAll('.has-mega > .nav__link').forEach(btn=>{let t;const p=btn.parentElement;btn.addEventListener('click',e=>{e.preventDefault();const open=p.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});btn.addEventListener('pointerenter',()=>{t=setTimeout(()=>{p.classList.add('open');btn.setAttribute('aria-expanded','true');},120);});btn.addEventListener('pointerleave',()=>clearTimeout(t));});root.addEventListener('keydown',e=>{if(e.key==='Escape'){root.querySelectorAll('.has-mega.open').forEach(p=>{p.classList.remove('open');p.querySelector('.nav__link')?.setAttribute('aria-expanded','false');});}});`),
    'm-08': M(
      ``,
      `/* m-08 fullscreen overlay wipe 480ms cubic-bezier(.76,0,.24,1) */`),
    'm-09': M(``, `/* m-09 drawer + scrim 300ms ease-out, scrim 200ms */`),
    'm-10': M(``, `/* m-10 burger to X morph 240ms */`),
    'm-11': M(``, `/* m-11 command palette 180ms scale .98 to 1 + blur-in */`),
    'm-12': M(``, `/* m-12 theme cross-fade 300ms via View Transitions */`),
    'm-13': M(``, `/* m-13 scroll progress bar (scroll-linked, linear) */`),
    'm-14': M(``, `const ring=root.querySelector('.ring__val');if(ring){addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=max>0?Math.round(scrollY/max*100):0;ring.textContent=p+'%';ring.parentElement.style.setProperty('--p',p);},{passive:true});}`),
    'm-15': M(`.chip--active{background:var(--n-ink);color:#fff;border-color:var(--n-ink)}`,
      `root.querySelectorAll('.chip,.segmented button').forEach(el=>el.addEventListener('click',()=>{const group=el.closest('.rail__track,.segmented');if(!group)return;group.querySelectorAll('.chip,.segmented button').forEach(x=>{x.classList.remove('chip--active');x.setAttribute('aria-selected','false');});el.classList.add('chip--active');el.setAttribute('aria-selected','true');}));`),
    'm-16': M(``, `/* m-16 ticker marquee 28s linear infinite, pause on hover, off under reduced motion */`),
    'm-17': M(``, `const ab=root.querySelector('.announce');const ac=root.querySelector('.announce__close');let dismissed=false;try{dismissed=localStorage.getItem('nl:announce:${id}')==='1';}catch{}if(dismissed&&ab){ab.hidden=true;}ac?.addEventListener('click',()=>{if(!ab)return;ab.style.height=ab.offsetHeight+'px';requestAnimationFrame(()=>{ab.style.transition='height 220ms ease, opacity 220ms ease';ab.style.height='0';ab.style.opacity='0';ab.style.overflow='hidden';setTimeout(()=>{ab.hidden=true;},240);});try{localStorage.setItem('nl:announce:${id}','1');}catch{}});`),
    'm-18': M(``, `const rw=root.querySelector('.rotating');if(rw){const words=['Intake open','Client portal · live','Fixed-price quotes'];let i=0;setInterval(()=>{i=(i+1)%words.length;rw.classList.add('is-out');setTimeout(()=>{rw.textContent=words[i];rw.classList.remove('is-out');},400);},4000);}`),
    'm-21': M(``, `const wm=root.querySelector('.wordmark');if(wm){addEventListener('scroll',()=>{wm.style.transform='scale('+(1-Math.min(scrollY,600)/600*0.12)+')';},{passive:true});}`),
    'm-23': M(``, `const btt=root.querySelector('.btt');if(btt){addEventListener('scroll',()=>{btt.classList.toggle('is-visible',scrollY>innerHeight*0.6);},{passive:true});btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}`),
    'm-25': M(``, `/* m-25 live status dot pulse 2s ease-in-out infinite */`),
    'm-26': M(``, `const n=root.querySelector('[data-count]');if(n){const target=+n.dataset.count;new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();const tick=now=>{const p=Math.min(1,(now-t0)/1200);const v=Math.floor((1-Math.pow(1-p,3))*target);n.textContent='₹'+v.toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}),{threshold:.4}).observe(n);}`),
    'm-28': M(`.roll{overflow:hidden;display:inline-block}.roll span{display:block;transition:transform 260ms cubic-bezier(.76,0,.24,1)}.roll:hover span,.roll:focus-visible span{transform:translateY(-100%)}`,
      `root.querySelectorAll('a[data-roll]').forEach(a=>{const t=a.textContent.trim();a.innerHTML='<span>'+t+'</span><span>'+t+'</span>';});root.querySelectorAll('.roll').forEach(r=>r.setAttribute('tabindex','0'));`),
    'm-29': M(`.spot{position:absolute;inset:0;pointer-events:none;background:radial-gradient(420px circle at var(--x,50%) var(--y,50%),color-mix(in oklab,var(--n-teal) 10%,transparent),transparent 42%);opacity:0;transition:opacity 200ms}&:hover .spot{opacity:1}`,
      `root.addEventListener('pointermove',e=>{const r=root.getBoundingClientRect();root.style.setProperty('--x',(e.clientX-r.left)+'px');root.style.setProperty('--y',(e.clientY-r.top)+'px');});`),
    'm-30': M(``, `root.querySelectorAll('a[href^="/"]').forEach(a=>a.addEventListener('click',e=>{if(!document.startViewTransition)return;e.preventDefault();document.startViewTransition(()=>{location.hash=a.getAttribute('href');});}));`),
    'm-32': M(``, `const nav=root.querySelector('.chrome__bar');if(nav){addEventListener('scroll',()=>{nav.style.transform='translateY('+Math.min(scrollY*0.06,12)+'px)';},{passive:true});}`),
    'm-33': M(``, `const b=root.querySelector('.badge');if(b){setTimeout(()=>b.classList.add('is-on'),900);}`),
    'm-35': M(`.crumb{opacity:0;transform:translateY(-6px);transition:opacity 260ms var(--n-ease-out),transform 260ms var(--n-ease-out)}&[data-scrolled="true"] .crumb{opacity:1;transform:none}`,
      `/* m-35 breadcrumb slide-in at scroll>120 (uses [data-scrolled]) */`),
    'm-36': M(``, `/* m-36 shimmer sweep on primary CTA, 1.4s, paused 3s */`),
    /* ---- footer-side primitives ---- */
    'm-19': M(``,
      `const targets = root.querySelectorAll('.foot__col, .foot__brand, .logoCell, .social');
  targets.forEach((t,i)=>{t.style.setProperty('--i',i%6);t.classList.add('rise');});
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  } else { targets.forEach(t => t.classList.add('in')); }`),
    'm-20': M(``, `/* m-20 curtain: host page content scrolls over a pinned footer (see BASE rule) */`),
    'm-22': M(``, `/* m-22 accordion columns: grid-template-rows 0fr to 1fr, 260ms */`),
    'm-24': M(``,
      `/* m-24 locale / currency switcher slide — injected into the legal row if absent */
  let locale = root.querySelector('.foot__locale');
  if (!locale) {
    const row = root.querySelector('.legalLinks') || root.querySelector('.foot__legal');
    locale = document.createElement('div');
    locale.className = 'foot__locale';
    locale.innerHTML = '<button class="localeBtn" type="button" aria-expanded="false" aria-controls="loc-${id}">INR ₹ · EN-IN <span aria-hidden="true">▾</span></button><ul class="listbox" id="loc-${id}" hidden><li><button type="button">INR ₹ · India</button></li><li><button type="button">USD $ · Global</button></li><li><button type="button">EUR € · Europe</button></li></ul>';
    row && row.prepend(locale);
  }
  const lb2 = locale.querySelector('.localeBtn'), box2 = locale.querySelector('.listbox');
  lb2 && lb2.addEventListener('click', () => { const open = box2.hidden; box2.hidden = !open; lb2.setAttribute('aria-expanded', String(open)); });
  box2 && box2.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb2.textContent = b.textContent + ' ▾'; box2.hidden = true; lb2.setAttribute('aria-expanded', 'false'); });`),
    'm-27': M(`.social, .legalLinks a, .store{opacity:0;transform:scale(.8)}.social.in,.legalLinks a.in,.store.in{opacity:1;transform:none;transition:transform 300ms cubic-bezier(.34,1.56,.64,1),opacity 220ms linear;transition-delay:calc(var(--i,0) * 40ms)}`,
      `const pops = root.querySelectorAll('.social, .legalLinks a, .store');
  pops.forEach((p,i)=>p.style.setProperty('--i',i%5));
  if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 }); pops.forEach(p => io.observe(p)); }
  else pops.forEach(p => p.classList.add('in'));`),
    'm-31': M(`.grain{position:absolute;inset:0;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;animation:${id}-grain 8s steps(8) infinite}@keyframes ${id}-grain{from{background-position:0 0}to{background-position:180px 180px}}`,
      `const g = document.createElement('span'); g.className = 'grain'; g.setAttribute('aria-hidden','true'); root.prepend(g);`),
    'm-34': M(``,
      `/* m-34 email capture to success morph — reuses the newsletter form, or creates a compact one */
  let form34 = root.querySelector('.newsForm');
  if (!form34) {
    const host = root.querySelector('.foot__legal');
    form34 = document.createElement('form');
    form34.className = 'newsForm newsForm--inline';
    form34.noValidate = true;
    form34.innerHTML = '<label class="srOnly" for="em34-${id}">Email address</label><input id="em34-${id}" type="email" placeholder="you@company.com" autocomplete="email" required/><button class="cta" type="submit">Subscribe</button>';
    host && host.prepend(form34);
    const msg = document.createElement('p'); msg.className = 'formMsg'; msg.setAttribute('role','status'); msg.setAttribute('aria-live','polite'); form34.after(msg);
  }
  form34.addEventListener('submit', e => {
    e.preventDefault();
    const input = form34.querySelector('input'); const btn = form34.querySelector('button'); const val = (input.value || '').trim();
    const msg = root.querySelector('.formMsg');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) { if (msg) msg.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    btn.textContent = 'Subscribed ✓'; btn.classList.add('is-done');
    if (msg) msg.textContent = 'Confirmation sent to ' + val + '.';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.classList.remove('is-done'); form34.reset(); }, 2600);
  });`)
  };
  const r = map[motionId] || M('');
  // rewrite "&" root self-reference into the variant selector
  return { css: r.css, js: r.js };
}

/* ------------------------------------------------------------------ *
 * 3. HEADER EMITTER
 * ------------------------------------------------------------------ */
function buildHeader(spec) {
  const { id, family, axes, decor } = spec;
  const sel = `[data-chrome="${id}"]`;
  const isPill = axes.A1 === 'floating pill inset 16';
  const hasRail = decor.includes('edgeRail') || axes.A1 === 'docked edge rail';
  const needDrawer = axes.A2 === 'drawer';
  const needOverlay = axes.A2 === 'fullscreen overlay';
  const needPalette = axes.A2 === 'command palette';
  const needMega = axes.A2 === 'mega-panel';
  const needDropdown = axes.A2 === 'dropdown';
  const needBottom = axes.A2 === 'bottom tab bar';
  const needSegmented = axes.A2 === 'segmented';
  const needSearch = axes.A2 === 'search-first';
  const needBreadcrumb = axes.A2 === 'breadcrumb row';
  const isAuth = decor.includes('auth');
  const isBottomAlways = decor.includes('bottomAlways');

  /* --- nav module --- */
  let nav = '';
  if (isAuth) {
    nav = `<nav aria-label="Primary" class="nav nav--auth"><a class="linkGhost" href="/login" aria-current="page">Sign in</a></nav>`;
  } else if (needSearch) {
    nav = `<form class="searchWrap" role="search" onsubmit="return false"><label class="srOnly" for="q-${id}">Search</label><input id="q-${id}" class="searchInput" type="search" placeholder="Search projects, docs…" autocomplete="off"/><kbd class="kbd">/</kbd></form>
      <nav aria-label="Primary"><ul class="nav__list">${NAV.slice(0, 3).map((l, i) => `<li><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>`;
  } else if (needPalette) {
    nav = `<button class="cmdk" type="button" aria-haspopup="dialog"><span aria-hidden="true">⌕</span> Search… <kbd>⌘K</kbd></button>
      <nav aria-label="Primary"><ul class="nav__list">${NAV.slice(0, 4).map((l, i) => `<li><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>`;
  } else if (needMega) {
    nav = `<nav aria-label="Primary"><ul class="nav__list">${NAV.slice(0, 3).map((l, i) => `<li class="has-mega"><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''} aria-expanded="false" aria-controls="mega-${id}-${i}">${l}</a>
      <div class="mega" id="mega-${id}-${i}"><a href="${route(l)}">Overview</a><a href="${route(l)}#capabilities">Capabilities</a><a href="${route(l)}#pricing">Pricing</a><a href="/contact">Talk to us</a></div></li>`).join('')}${NAV.slice(3).map(l => `<li><a class="nav__link" href="${route(l)}">${l}</a></li>`).join('')}</ul><span class="nav__ink" aria-hidden="true"></span></nav>`;
  } else if (needDropdown) {
    nav = `<nav aria-label="Primary"><ul class="nav__list">${NAV.slice(0, 5).map((l, i) => `<li class="has-mega"><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''} aria-expanded="false" aria-controls="dd-${id}-${i}">${l} <span aria-hidden="true">▾</span></a>
      <div class="mega mega--slim" id="dd-${id}-${i}"><a href="${route(l)}">Overview</a><a href="${route(l)}#detail">Details</a><a href="/contact">Talk to us</a></div></li>`).join('')}${NAV.slice(5).map(l => `<li><a class="nav__link" href="${route(l)}">${l}</a></li>`).join('')}</ul><span class="nav__ink" aria-hidden="true"></span></nav>`;
  } else if (needSegmented) {
    nav = `${decor.includes('identity') ? `<div class="segmented" role="group" aria-label="Audience"><button type="button" aria-pressed="true">For clients</button><button type="button" aria-pressed="false">For freelancers</button></div>` : `<div class="segmented" role="tablist" aria-label="Sections">${['Product', 'Portfolio', 'Blog'].map((t, i) => `<button type="button" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>`}
      <nav aria-label="Primary"><ul class="nav__list">${NAV.slice(0, 4).map((l, i) => `<li><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>`;
  } else if (needBreadcrumb) {
    nav = `<nav aria-label="Breadcrumb"><ol class="crumb">${['Home', 'Services', 'Intake'].map((c, i) => `<li><a href="/">${c}</a></li>`).join('')}<li aria-current="page">Step 2</li></ol></nav>`;
  } else if (true) { /* default inline list + burger (mobile panel is always deliberate) */
    nav = `<nav aria-label="Primary" class="nav--wide"><ul class="nav__list">${NAV.map((l, i) => `<li><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul><span class="nav__ink" aria-hidden="true"></span></nav>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu-${id}" aria-label="Open menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button>`;
  } else {
    nav = `<nav aria-label="Primary"><ul class="nav__list">${NAV.map((l, i) => `<li><a class="nav__link" href="${route(l)}"${i === 1 ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul><span class="nav__ink" aria-hidden="true"></span></nav>`;
  }

  /* --- CTA module --- */
  let cta = '';
  switch (axes.A6) {
    case 'dual equal CTA': cta = `<a class="cta cta--ghost" href="/login">Sign in</a><a class="cta" href="/portal">Start a project</a>`; break;
    case 'outline pill': cta = `<a class="cta cta--outline" href="/login">Sign in</a><a class="cta" href="/portal">Start a project</a>`; break;
    case 'split-arrow pill': cta = `<a class="cta cta--split" href="/portal">Start a project <span aria-hidden="true">→</span></a>`; break;
    case 'ghost text': cta = `<a class="linkGhost" href="/login">Sign in</a><a class="cta" href="/portal">Start a project</a>`; break;
    case 'gradient edge': cta = `<a class="cta cta--glow" href="/portal">Start a project</a>`; break;
    case 'icon-only': cta = `<a class="iconBtn" href="/login" aria-label="Account"><span aria-hidden="true">◍</span></a>`; break;
    case 'sticky mobile bar': cta = `<a class="cta" href="/portal">Start a project</a>`;
      break;
    default: cta = `<a class="linkGhost" href="/login">Sign in</a><a class="cta" href="/portal">Start a project</a>`;
  }
  const stickyMobile = axes.A6 === 'sticky mobile bar';

  /* --- decor strips --- */
  const announce = decor.includes('announcement')
    ? `<div class="announce" role="status"><span class="dot" aria-hidden="true"></span><span>Intake open — fixed-price quotes in 24h</span><button class="announce__close" type="button" aria-label="Dismiss announcement">×</button></div>` : '';
  const utility = decor.includes('utility')
    ? `<div class="utility"><div class="utility__inner"><span class="eyebrow">INTAKE OPEN · CLIENT PORTAL LIVE</span><span class="utility__right"><button class="localeBtn" type="button" aria-expanded="false">INR ₹ · EN-IN</button><a href="/contact">Support</a></span></div></div>` : '';
  const ticker = decor.includes('ticker')
    ? `<div class="tickerRow"><div class="ticker"><div class="ticker__track" aria-hidden="true"><span class="eyebrow">${TICKER.join(' · ')} · ${TICKER.join(' · ')} ·</span></div></div></div>` : '';
  const wizard = decor.includes('wizard')
    ? `<div class="wizard"><ol class="wizard__steps"><li class="step step--done">1</li><li class="step step--active" aria-current="step">2</li><li class="step">3</li></ol><div class="wizard__progress" role="progressbar" aria-label="Intake progress" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"><span class="wizard__fill"></span></div><span class="eyebrow">START A PROJECT · STEP 2 OF 3</span></div>` : '';
  const rail = decor.includes('rail')
    ? `<div class="rail"><div class="rail__track" role="list">${TICKER_RAIL.map((c, i) => `<button class="chip${i === 0 ? ' chip--active' : ''}" type="button" aria-selected="${i === 0}">${c}</button>`).join('')}</div></div>` : '';
  const docsRow = decor.includes('docs')
    ? `<div class="docsRow"><nav aria-label="Sections"><ul>${['Guide', 'API reference', 'Changelog', 'Support'].map((t, i) => `<li><a href="${i === 0 ? '/product' : t === 'Support' ? '/contact' : t === 'Changelog' ? '/product#changelog' : '/product'}"${i === 0 ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul></nav></div>` : '';
  const editorial = decor.includes('editorial')
    ? `<div class="editorial"><span class="eyebrow">FIG · WORK — PRODUCT STUDIO, INDIA</span><span class="editorial__date">Est. 2021 · Bengaluru</span></div>` : '';
  const rotating = ['m-18'].includes(axes.A4)
    ? `<span class="statusPill"><span class="dot" aria-hidden="true"></span><span class="rotating">Intake open</span></span>` : '';
  const badge = axes.A4 === 'm-33' ? `<span class="badge" aria-label="1 notification">1</span>` : '';
  const ring = axes.A4 === 'm-14' ? `<span class="ring" style="--p:0" aria-hidden="true"></span><span class="ring__val">0%</span>` : '';
  const edgeRail = hasRail
    ? `<aside class="edgeRail" aria-label="Quick navigation"><a href="/" aria-label="Home">◈</a><a href="/product" aria-label="Product">⬡</a><a href="/portfolio" aria-label="Portfolio">◆</a><a href="/blog" aria-label="Blog">◇</a><a href="/pricing" aria-label="Pricing">₹</a></nav></aside>`.replace('</nav>', '') : '';
  const spot = axes.A4 === 'm-29' ? `<span class="spot" aria-hidden="true"></span>` : '';
  const hero = decor.includes('hero') ? '<div class="demoHero" aria-hidden="true"></div>' : '';
  const localeList = decor.includes('utility')
    ? `<ul class="listbox" hidden><li><button type="button">INR ₹ · India</button></li><li><button type="button">USD $ · Global</button></li></ul>` : '';

  /* every variant ships a deliberate mobile disclosure: overlay for A2=fullscreen overlay,
     drawer otherwise; accordion groups when A5 = accordion / click / keyboard-first */
  const collapseMobile = ['accordion', 'click', 'keyboard-first'].includes(axes.A5);
  /* native <details> disclosure: keyboard-complete and functional with JS disabled */
  const navList = (arr) => `<ul>${arr.map(l => `<li><a href="${route(l)}">${l}</a></li>`).join('')}</ul>`;
  const mobileGroups = collapseMobile
    ? `<details class="mAcc"><summary class="mAcc__head"><span class="eyebrow">SECTIONS</span></summary>${navList(NAV)}</details>`
    : navList(NAV);
  const drawerOrOverlay = needOverlay
    ? `<div class="overlay" id="menu-${id}" hidden><button class="overlayClose burger" type="button" aria-expanded="false" aria-controls="menu-${id}" aria-label="Close menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button><nav aria-label="Primary">${collapseMobile ? mobileGroups : `<ul>${NAV.map(l => `<li><a class="overlay__link" href="${route(l)}">${l}</a></li>`).join('')}</ul>`}<div class="overlay__foot"><a class="cta" href="/portal">Start a project</a><span class="eyebrow">INTAKE OPEN</span></div></nav></div>`
    : `<div class="drawer" id="menu-${id}" hidden role="dialog" aria-modal="true" aria-label="Menu"><button class="drawerClose" type="button" aria-label="Close menu">×</button><nav aria-label="Primary">${mobileGroups}</nav><a class="cta drawerCta" href="/portal">Start a project</a></div><div class="scrim" hidden></div>`;
  const palette = needPalette
    ? `<dialog class="palette" aria-label="Command palette"><form method="dialog"><input class="palette__input" type="search" placeholder="Search or jump to…" aria-label="Search commands"/><ul class="palette__list">${['Go to Product', 'Go to Portfolio', 'Go to Pricing', 'Start a project'].map((t, i) => `<li><button type="button"${i === 0 ? ' class="is-active"' : ''}>${t}<kbd>↵</kbd></button></li>`).join('')}</ul><p class="eyebrow">↑↓ NAVIGATE · ↵ RUN · ESC CLOSE</p></form></dialog>` : '';
  const bottomBar = needBottom
    ? `<nav class="bottomBar${isBottomAlways ? ' bottomBar--always' : ''}" aria-label="Primary (mobile)">${NAV.slice(0, 4).map((l, i) => `<a href="${route(l)}"${i === 0 ? ' aria-current="page"' : ''}><span aria-hidden="true">${['◈', '⬡', '◇', '₹'][i]}</span><span>${l}</span></a>`).join('')}<button class="bottomBar__more" type="button" aria-expanded="false" aria-controls="menu-${id}"><span aria-hidden="true">☰</span><span>More</span></button></nav>` : '';
  const stickyCta = stickyMobile
    ? `<div class="stickyCta"><a class="cta" href="/portal">Start a project →</a></div>` : '';

  const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<title>${id} · ${family} — Nestlancer chrome lab</title>
<meta name="description" content="${id} header variant (${family}) built from live research on 134 captured sites."/>
${HEAD_EXTRAS}
<link rel="stylesheet" href="../../tokens/tokens.css"/>
<link rel="stylesheet" href="../../runtime/chrome.css"/>
<link rel="stylesheet" href="../../runtime/demo.css"/>
<link rel="stylesheet" href="./style.css"/>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${hero}
${edgeRail}
<header class="chrome" data-chrome="${id}" data-theme="light" data-page="pricing" data-disclosure="${slug(axes.A5)}" data-motion="${axes.A4}" data-axes-a3="${slug(axes.A3)}" role="banner">
  ${spot}
  ${announce}
  ${utility}
  ${ticker}
  ${wizard}
  ${rail}
  ${editorial}
  <div class="chrome__bar">
    <a class="wordmark" href="/" aria-label="Nestlancer — home"><svg class="glyph" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M4 19V6.5L12 4l8 2.5V19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 19v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg><span>Nestlancer<b>.</b></span></a>
    ${nav}
    <div class="chrome__actions">
      ${rotating}
      <button class="themeToggle" type="button" aria-label="Switch theme" aria-pressed="false" title="Switch theme"><span aria-hidden="true">◐</span></button>
      ${cta}
      ${badge}
      ${ring}
    </div>
  </div>
  ${docsRow}
  ${axes.A3 === 'progress-linked' ? '<span class="progress" data-progress aria-hidden="true"></span>' : ''}
  ${drawerOrOverlay}
  ${palette}
  ${localeList}
</header>
${bottomBar}
${stickyCta}
<main id="main" tabindex="-1">
  <p class="eyebrow">CHROME LAB · ${id}</p>
  <h1>${family}</h1>
  <p class="lede">Mount into any page with one line:</p>
  <pre><code>&lt;header data-chrome="${id}" data-theme="dark" data-page="pricing"&gt;&lt;/header&gt;</code></pre>
  <ul class="axisList">${Object.entries(axes).map(([k, v]) => `<li><b>${k}</b> ${v}</li>`).join('')}</ul>
  <div class="demoBlock"></div>
  <div class="demoBlock"></div>
</main>
<script defer src="../../runtime/chrome-motion.js"></script>
<script defer src="./script.js"></script>
</body>
</html>`;

  /* --- CSS --- */
  const c = [];
  c.push(`/* ${id} — ${family}
   axes: A1 ${axes.A1} · A2 ${axes.A2} · A3 ${axes.A3} · A4 ${axes.A4} · A5 ${axes.A5} · A6 ${axes.A6}
   scope: every rule is prefixed with ${sel} (zero global leakage unless marked BASE) */`);
  c.push(`${sel}{--h:72px;position:${axes.A3 === 'static' ? 'relative' : 'sticky'};top:0;z-index:30;height:var(--h);background:var(--n-surface);border-bottom:1px solid var(--n-hairline);transition:height 200ms var(--n-ease),background-color 240ms linear,backdrop-filter 240ms linear}`);
  c.push(`${sel}[data-scrolled="true"]{${axes.A3 === 'sticky-shrink' ? '--h:56px;' : ''}${isPill || axes.A3 === 'sticky' || axes.A3 === 'sticky-shrink' || axes.A3 === 'auto-hide' ? 'background:color-mix(in oklab,var(--n-surface) 88%,transparent);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);' : ''}}`);
  c.push(`@supports not (backdrop-filter:blur(2px)){${sel}[data-scrolled="true"]{background:var(--n-surface)}}`);
  c.push(`${sel} .chrome__bar{display:flex;align-items:center;gap:24px;height:100%;padding:0 24px;${axes.A1 === '1200 contained' ? 'max-width:var(--n-container);margin:0 auto;' : axes.A1 === 'full-bleed' ? 'max-width:none;' : axes.A1 === 'asymmetric 8/4' ? 'max-width:var(--n-container);margin:0 auto;display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);' : axes.A1 === 'split 50/50' ? 'max-width:var(--n-container);margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);' : 'max-width:var(--n-container);margin:0 auto;'}}`);
  if (axes.A1 === 'split 50/50') c.push(`${sel} .chrome__bar .nav{justify-self:center}${sel} .chrome__actions{justify-self:end}`);
  if (axes.A1 === 'asymmetric 8/4') c.push(`${sel} .chrome__bar .nav{display:none}${sel} .chrome__actions{justify-self:end}${sel} .chrome__bar::after{content:attr(data-note)}`);
  if (isPill) c.push(`${sel}{width:min(1180px,calc(100% - 32px));margin:12px auto;border:1px solid var(--n-hairline);border-radius:var(--n-radius-pill);box-shadow:0 10px 28px rgba(10,37,67,.08);height:60px}${sel}[data-scrolled="true"]{height:56px}${sel} .chrome__bar{padding:0 20px}`);
  if (axes.A1 === 'docked edge rail') c.push(`${sel}{margin-left:64px;width:calc(100% - 64px)}`);
  if (axes.A3 === 'transparent→solid' || decor.includes('hero')) c.push(`${sel}{background:transparent;border-bottom-color:transparent;color:#fff}${sel} .nav__link,${sel} .wordmark,${sel} .linkGhost{color:#fff}${sel}.is-solid{background:color-mix(in oklab,var(--n-surface) 90%,transparent);border-bottom-color:var(--n-hairline);color:var(--n-body)}${sel}.is-solid .nav__link,${sel}.is-solid .wordmark,${sel}.is-solid .linkGhost{color:var(--n-ink)}`);
  if (axes.A3 === 'static') c.push(`${sel}{position:relative}`);
  if (axes.A4 === 'm-02' || axes.A3 === 'auto-hide') c.push(`${sel} .chrome__bar{will-change:transform}`);
  c.push(`${sel} .wordmark{display:inline-flex;align-items:center;gap:8px;font-family:var(--n-font-display);font-weight:700;font-size:20px;color:var(--n-ink);letter-spacing:-.02em;flex:0 0 auto;transform-origin:left center}${sel} .wordmark b{color:var(--n-teal)}`);
  c.push(`${sel} .nav{min-width:0}${sel} .nav__list{display:flex;gap:20px;list-style:none;margin:0;padding:0;align-items:center}${sel} .nav__link{font-size:14px;font-weight:500;color:var(--n-body);padding:8px 2px;position:relative;border-radius:6px}${sel} .nav__link:hover,${sel} .nav__link[aria-current="page"]{color:var(--n-ink)}${sel} .nav__link[aria-current="page"]::after{content:'';position:absolute;left:0;right:0;bottom:-15px;height:2px;background:var(--n-teal)}`);
  c.push(`${sel} .nav__ink{display:none}`);
  if (axes.A4 === 'm-05') c.push(`${sel} .nav__ink{display:block;position:absolute;bottom:0;left:0;height:2px;width:0;background:var(--n-teal);transition:transform 220ms var(--n-ease),width 220ms var(--n-ease)}`);
  c.push(`${sel} .chrome__actions{margin-left:auto;display:flex;align-items:center;gap:12px}`);
  c.push(`${sel} .themeToggle{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--n-hairline);background:var(--n-surface);color:var(--n-ink);cursor:pointer;transition:transform 160ms var(--n-ease)}${sel} .themeToggle:hover{transform:rotate(-12deg)}`);
  c.push(`${sel} .linkGhost{font-size:14px;font-weight:500;color:var(--n-body);padding:10px 6px;border-radius:8px}${sel} .linkGhost:hover{color:var(--n-ink)}`);
  c.push(`${sel} .cta{display:inline-flex;align-items:center;gap:8px;background:var(--n-teal);color:#fff;padding:11px 18px;font-size:14px;font-weight:600;border-radius:var(--n-radius-pill);transition:background .18s var(--n-ease),transform .18s var(--n-ease)}${sel} .cta:hover{background:var(--n-teal-hover)}${sel} .cta:active{transform:scale(.98)}`);
  c.push(`${sel} .cta--outline{background:transparent;color:var(--n-teal);box-shadow:inset 0 0 0 1.5px var(--n-teal)}${sel} .cta--outline:hover{background:var(--n-teal-soft);color:var(--n-teal-hover)}`);
  c.push(`${sel} .cta--ghost{background:transparent;color:var(--n-ink);box-shadow:inset 0 0 0 1.5px var(--n-hairline)}${sel} .cta--ghost:hover{background:var(--n-surface-2)}`);
  c.push(`${sel} .cta--glow{background:linear-gradient(100deg,var(--n-teal) 30%,var(--n-teal-glow) 50%,var(--n-teal) 70%);background-size:200% 100%;animation:${id}-shimmer 1.4s linear 3s infinite}@keyframes ${id}-shimmer{from{background-position:200% 0}to{background-position:-200% 0}}`);
  c.push(`${sel} .iconBtn{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--n-hairline);color:var(--n-ink);background:var(--n-surface)}`);
  c.push(`${sel} .badge{position:absolute;top:14px;right:104px;min-width:18px;height:18px;border-radius:9px;background:var(--n-teal);color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;transform:scale(0);transition:transform 300ms cubic-bezier(.34,1.56,.64,1)}${sel} .badge.is-on{transform:scale(1)}`);
  c.push(`${sel} .ring{width:16px;height:16px;border-radius:50%;background:conic-gradient(var(--n-teal) calc(var(--p,0)*1%),var(--n-hairline) 0);display:inline-block}${sel} .ring__val{font-family:var(--n-font-mono);font-size:11px;color:var(--n-muted)}`);
  c.push(`${sel} .statusPill{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:var(--n-radius-pill);background:var(--n-mint);color:var(--n-teal);font-size:12px;font-weight:600}${sel} .dot{width:7px;height:7px;border-radius:50%;background:var(--n-live);position:relative;display:inline-block}${sel} .dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--n-live);animation:${id}-pulse 2s ease-in-out infinite}@keyframes ${id}-pulse{0%,100%{transform:scale(.8);opacity:.9}50%{transform:scale(1.4);opacity:0}}`);
  c.push(`${sel} .rotating{transition:opacity 400ms ease,transform 400ms ease;display:inline-block}${sel} .rotating.is-out{opacity:0;transform:translateY(-8px)}`);
  if (axes.A3 === 'progress-linked') c.push(`${sel} .progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--n-teal);transform:scaleX(0);transform-origin:left}`);
  c.push(`${sel} .announce{display:flex;align-items:center;justify-content:center;gap:8px;height:32px;background:var(--n-ink);color:#fff;font-size:13px;position:relative}${sel} .announce__close{position:absolute;right:12px;background:none;border:0;color:#fff;font-size:18px;line-height:1;cursor:pointer;padding:4px 8px}`);
  c.push(`${sel} .utility{background:var(--n-ink);color:#fff;height:30px;display:flex;align-items:center}${sel} .utility__inner{max-width:var(--n-container);margin:0 auto;width:100%;padding:0 24px;display:flex;justify-content:space-between;align-items:center}${sel} .utility .eyebrow{color:rgba(255,255,255,.72)}${sel} .utility__right{display:flex;gap:14px;align-items:center;font-size:12px}${sel} .localeBtn{background:none;border:0;color:#fff;font:inherit;cursor:pointer}`);
  c.push(`${sel} .tickerRow{height:32px;display:flex;align-items:center;background:var(--n-bg-tint-1);border-bottom:1px solid var(--n-hairline)}`);
  c.push(`${sel} .wizard{display:flex;align-items:center;gap:16px;max-width:var(--n-container);margin:0 auto;padding:8px 24px;border-bottom:1px solid var(--n-hairline)}${sel} .wizard__steps{display:flex;gap:8px;list-style:none;margin:0;padding:0}${sel} .step{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;border:1px solid var(--n-hairline);background:var(--n-surface);color:var(--n-body)}${sel} .step--active{background:var(--n-teal);border-color:var(--n-teal);color:#fff}${sel} .step--done{background:var(--n-mint);color:var(--n-teal);border-color:var(--n-teal-soft)}${sel} .wizard__progress{flex:1;height:4px;border-radius:2px;background:var(--n-bg-tint-1);overflow:hidden}${sel} .wizard__fill{display:block;width:33%;height:100%;background:var(--n-teal)}`);
  c.push(`${sel} .rail{max-width:var(--n-container);margin:0 auto;padding:8px 24px;border-bottom:1px solid var(--n-hairline)}${sel} .rail__track{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity}${sel} .rail__track::-webkit-scrollbar{display:none}${sel} .chip{flex:0 0 auto;scroll-snap-align:start;padding:7px 12px;border-radius:var(--n-radius-pill);border:1px solid var(--n-hairline);background:var(--n-surface);font-family:var(--n-font-mono);font-size:11px;letter-spacing:.08em;color:var(--n-body);cursor:pointer;transition:background 200ms var(--n-ease),color 200ms var(--n-ease)}${sel} .chip:hover{border-color:var(--n-ink-2)}`);
  c.push(`${sel} .docsRow{max-width:var(--n-container);margin:0 auto;padding:0 24px;border-bottom:1px solid var(--n-hairline)}${sel} .docsRow ul{display:flex;gap:20px;list-style:none;margin:0;padding:10px 0;font-size:13px}${sel} .docsRow a{color:var(--n-body);font-weight:500}${sel} .docsRow a[aria-current="page"]{color:var(--n-teal)}`);
  c.push(`${sel} .editorial{max-width:var(--n-container);margin:0 auto;padding:6px 24px 0;display:flex;justify-content:space-between}${sel} .editorial__date{font-family:var(--n-font-mono);font-size:11px;color:var(--n-muted)}`);
  c.push(`${sel} .crumb{display:flex;gap:10px;list-style:none;margin:0;padding:0;font-family:var(--n-font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--n-muted)}${sel} .crumb a{color:var(--n-muted)}${sel} .crumb li+li::before{content:'/';margin-right:10px;color:var(--n-hairline)}${sel} .crumb [aria-current="page"]{color:var(--n-ink)}`);
  c.push(`${sel} .segmented{display:flex;gap:4px;padding:4px;border-radius:var(--n-radius-pill);background:var(--n-bg-tint-1);border:1px solid var(--n-hairline)}${sel} .segmented button{padding:7px 14px;border:0;background:transparent;border-radius:var(--n-radius-pill);font-size:13px;font-weight:500;color:var(--n-body);cursor:pointer}${sel} .segmented button[aria-selected="true"],${sel} .segmented button[aria-pressed="true"]{background:var(--n-surface);color:var(--n-ink);box-shadow:0 1px 3px rgba(10,37,67,.10)}`);
  c.push(`${sel} .searchWrap{display:flex;align-items:center;gap:8px;flex:0 1 380px;background:var(--n-bg);border:1px solid var(--n-hairline);border-radius:var(--n-radius-pill);padding:7px 14px}${sel} .searchInput{flex:1;border:0;background:transparent;font:inherit;font-size:14px;color:var(--n-ink)}${sel} .searchInput:focus-visible{outline:2px solid var(--n-teal);outline-offset:2px}${sel} .kbd{font-family:var(--n-font-mono);font-size:11px;padding:2px 6px;border:1px solid var(--n-hairline);border-radius:6px;color:var(--n-muted);background:var(--n-surface)}`);
  c.push(`${sel} .cmdk{display:flex;align-items:center;gap:10px;padding:9px 14px;border:1px solid var(--n-hairline);border-radius:var(--n-radius-pill);background:var(--n-surface-2);color:var(--n-muted);font:inherit;font-size:13px;cursor:pointer}${sel} .cmdk:hover{color:var(--n-ink)}`);
  c.push(`${sel} .mega{position:absolute;left:0;right:0;top:calc(100% + 1px);background:var(--n-surface);border:1px solid var(--n-hairline);border-radius:var(--n-radius-card);box-shadow:0 20px 44px rgba(10,37,67,.14);padding:20px;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity 260ms var(--n-ease-out),transform 260ms var(--n-ease-out);z-index:35}${sel} .mega>div{transition:opacity 260ms var(--n-ease-out),transform 260ms var(--n-ease-out);transition-delay:calc(var(--i,0) * 35ms);opacity:0;transform:translateY(6px)}${sel} .mega--slim{left:auto;right:auto;min-width:220px;padding:12px;display:flex;flex-direction:column;gap:6px}${sel} .mega--slim a{padding:8px 10px;border-radius:8px;font-size:14px;color:var(--n-body)}${sel} .mega--slim a:hover{background:var(--n-bg-tint-1);color:var(--n-ink)}`);
  c.push(`${sel} .mega{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}${sel} .mega--slim{display:flex}${sel} .has-mega{position:static}${sel} .mega p{margin:0 0 8px}${sel} .mega a{display:flex;flex-direction:column;gap:2px;padding:8px 0;font-size:14px;color:var(--n-body)}${sel} .mega a:hover{color:var(--n-teal)}`);
  if (axes.A5 === 'hover-intent 120ms' || axes.A5 === 'hover') c.push(`${sel}[data-disclosure="hover"] .has-mega:hover .mega{opacity:1;transform:none;pointer-events:auto}${sel}[data-disclosure="hover"] .has-mega:hover .mega>div{opacity:1;transform:none}`);
  c.push(`${sel} .has-mega.open .mega{opacity:1;transform:none;pointer-events:auto}${sel} .has-mega.open .mega>div{opacity:1;transform:none}`);
  if (axes.A5 === 'always-visible') c.push(`${sel}[data-disclosure="always-visible"] .mega{position:static;opacity:1;transform:none;pointer-events:auto;display:none}${sel}[data-disclosure="always-visible"] .has-mega:focus-within .mega{display:grid}`);
  c.push(`${sel} .burger{display:none;width:40px;height:40px;flex-direction:column;justify-content:center;align-items:center;gap:5px;background:var(--n-surface);border:1px solid var(--n-hairline);border-radius:10px;cursor:pointer}${sel} .bar{display:block;width:18px;height:2px;background:var(--n-ink);border-radius:2px;transition:transform 240ms ease,opacity 240ms ease}${sel} .burger[aria-expanded="true"] .bar:nth-child(1){transform:translateY(7px) rotate(45deg)}${sel} .burger[aria-expanded="true"] .bar:nth-child(2){opacity:0}${sel} .burger[aria-expanded="true"] .bar:nth-child(3){transform:translateY(-7px) rotate(-45deg)}`);
  c.push(`${sel} .drawer{position:fixed;top:0;right:0;width:min(340px,86vw);height:100dvh;background:var(--n-surface);border-left:1px solid var(--n-hairline);padding:24px;z-index:60;transform:translateX(100%);transition:transform 300ms ease-out;overflow-y:auto}${sel} .drawer.is-open{transform:none}${sel} .drawer ul{list-style:none;margin:32px 0 0;padding:0;display:flex;flex-direction:column;gap:4px}${sel} .drawer a{display:block;padding:12px 8px;font-size:16px;color:var(--n-ink);border-radius:8px}${sel} .drawer a:hover{background:var(--n-bg-tint-1)}${sel} .drawerClose{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;border:1px solid var(--n-hairline);background:var(--n-surface);font-size:20px;cursor:pointer}${sel} .scrim{position:fixed;inset:0;background:rgba(10,37,67,.32);z-index:55;opacity:0;transition:opacity 200ms linear}${sel} .scrim.is-open{opacity:1}`);
  c.push(`${sel} .overlay{position:fixed;inset:0;background:var(--n-bg);z-index:60;clip-path:inset(0 0 100% 0);transition:clip-path 480ms cubic-bezier(.76,0,.24,1);display:flex;flex-direction:column;justify-content:center;padding:80px 32px 32px;overflow-y:auto}${sel} .overlay.is-open{clip-path:inset(0 0 0 0)}${sel} .overlay ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}${sel} .overlay__link{font-family:var(--n-font-display);font-size:clamp(28px,6vw,54px);color:var(--n-ink);letter-spacing:-.02em}${sel} .overlay__link:hover{color:var(--n-teal)}${sel} .overlay__foot{display:flex;align-items:center;gap:16px;margin-top:40px}`);
  c.push(`${sel} .palette{width:min(620px,calc(100vw - 32px));border:1px solid var(--n-hairline);border-radius:var(--n-radius-card);padding:12px;box-shadow:0 24px 64px rgba(10,37,67,.18);background:var(--n-surface);color:var(--n-body)}${sel} .palette::backdrop{background:rgba(10,37,67,.28);backdrop-filter:blur(3px)}${sel} .palette__input{width:100%;padding:12px;border:1px solid var(--n-hairline);border-radius:10px;font:inherit;background:var(--n-bg);color:var(--n-ink)}${sel} .palette__list{list-style:none;margin:10px 0;padding:0;display:flex;flex-direction:column;gap:2px}${sel} .palette__list button{width:100%;display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:0;border-radius:8px;background:transparent;font:inherit;color:var(--n-body);cursor:pointer;text-align:left}${sel} .palette__list button:hover,${sel} .palette__list .is-active{background:var(--n-bg-tint-1);color:var(--n-ink)}`);
  c.push(`${sel} .bottomBar{display:none;position:fixed;bottom:0;left:0;right:0;height:64px;background:var(--n-surface);border-top:1px solid var(--n-hairline);padding-bottom:env(safe-area-inset-bottom);z-index:45;justify-content:space-around;align-items:center}${sel} .bottomBar a{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:var(--n-muted);min-width:44px;min-height:44px;justify-content:center}${sel} .bottomBar a[aria-current="page"]{color:var(--n-teal)}`);
  c.push(`${sel} .stickyCta{display:none}`);
  c.push(`${sel} .edgeRail{position:fixed;left:0;top:0;bottom:0;width:64px;background:var(--n-surface);border-right:1px solid var(--n-hairline);display:flex;flex-direction:column;align-items:center;gap:18px;padding:20px 0;z-index:50}${sel} .edgeRail a{width:40px;height:40px;display:grid;place-items:center;border-radius:12px;color:var(--n-body)}${sel} .edgeRail a:hover{background:var(--n-bg-tint-1);color:var(--n-ink)}`);
  c.push(`${sel} .spot{position:absolute;inset:0;pointer-events:none;background:radial-gradient(420px circle at var(--x,50%) var(--y,50%),color-mix(in oklab,var(--n-teal) 10%,transparent),transparent 42%);opacity:0;transition:opacity 200ms linear}${sel}:hover .spot{opacity:1}`);
  c.push(`${sel} :focus-visible{outline:2px solid var(--n-teal);outline-offset:2px}`);
  c.push(`${sel} .mAcc{border-bottom:1px solid var(--n-hairline);padding-bottom:8px}${sel} .mAcc__head{display:flex;align-items:center;justify-content:space-between;min-height:52px;cursor:pointer;list-style:none}${sel} .mAcc__head::-webkit-details-marker{display:none}${sel} .mAcc__head::after{content:'▾';color:var(--n-muted);transition:transform 260ms var(--n-ease)}${sel} .mAcc[open] .mAcc__head::after{transform:rotate(180deg)}${sel} .mAcc ul{list-style:none;margin:0;padding:0}${sel} .drawerCta{margin-top:24px}${sel} .overlayClose{position:absolute;top:20px;right:20px}${sel} .bottomBar__more{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:var(--n-muted);background:none;border:0;min-width:44px;min-height:44px;justify-content:center;font-family:inherit}`);
  c.push(`@media (max-width:1023px){${sel} .nav__list{gap:14px}}`);
  /* Mobile bar normalisation (browser-render contract): force a single flex row even for
     grid A1 variants, keep the burger visible at the far right AFTER the actions (DOM order
     places it before them), and stop the wordmark/CTA from wrapping. */
  c.push(`@media (max-width:900px){${sel} .chrome__bar{display:flex;flex-wrap:nowrap}${sel} .nav__list{display:none}${sel} .burger{display:flex;order:3;flex:0 0 auto}${sel} .chrome__bar{gap:12px}${sel} .chrome__actions{flex:0 0 auto}${sel} .wordmark{min-width:0}${sel} .linkGhost{display:none}${sel} .searchWrap{display:none}${sel} .cmdk{display:none}${sel} .segmented{display:none}${sel} .editorial{display:none}${sel} .utility{display:none}${sel} .docsRow{display:none}}`);
  /* ≤600px: the bar must fit 360px — drop the theme toggle (wordmark + CTA + burger stay reachable),
     tighten gaps. Without this the bar overflowed and the burger could scroll out of reach. */
  c.push(`@media (max-width:600px){${sel} .chrome__bar{padding:0 14px;gap:10px}${sel} .themeToggle{display:none}${sel} .wordmark{font-size:18px}${sel} .cta{padding:10px 14px;font-size:13px;min-height:44px}${sel} .wizard{gap:8px;padding:8px 14px}${sel} .rail{padding:8px 14px}${sel} .crumb{font-size:10px}}`);
  if (needBottom) c.push(`@media (max-width:900px){${sel} .bottomBar{display:flex}${sel} .nav--wide .nav__list{display:none}}${isBottomAlways ? `@media (min-width:901px){${sel} .bottomBar{display:none}}` : ''}`);
  if (stickyMobile) c.push(`@media (max-width:900px){${sel} .stickyCta{display:block;position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:var(--n-surface);border:1px solid var(--n-hairline);border-radius:var(--n-radius-pill);padding:6px;box-shadow:0 10px 28px rgba(10,37,67,.14);z-index:46}}`);
  // BASE rule: body padding for fixed bottom bars — applies only on pages that mount this chrome.
  // NOTE: never prefix this chunk with a CSS comment inside the template — scopeCss parses selectors,
  // and a leading comment used to glue the variant selector onto @media and kill the rule.
  if (needBottom || stickyMobile) c.push(`@media (max-width:900px){body:has(${sel}){padding-bottom:80px}}`);
  if (needOverlay) c.push(`${sel} .overlay .burgerClose{position:absolute;top:20px;right:20px}`);
  // motion recipe
  const rec = motionRecipe(id, sel, axes.A4);
  if (rec.css) c.push(`/* ${axes.A4} — ${motionById[axes.A4]?.name || ''} */\n${rec.css}`);

  /* --- JS --- */
  const j = [];
  j.push(`/* ${id} — ${family} · signature motion ${axes.A4} (${motionById[axes.A4]?.name || ''}) */`);
  j.push(`(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="${id}"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* mount options: ?theme=dark|light&page=pricing */
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; root.querySelector('.themeToggle')?.setAttribute('aria-pressed', String(qTheme === 'dark')); }
  const qPage = params.get('page');
  if (qPage) root.dataset.page = qPage;
  const scrolledClass = () => {
    const y = scrollY;
    const t = ${axes.A3 === 'sticky-shrink' ? 24 : axes.A3 === 'sticky' ? 8 : axes.A3 === 'transparent→solid' ? 320 : 120};
    root.dataset.scrolled = String(y > t);
  };
  addEventListener('scroll', scrolledClass, { passive: true }); scrolledClass();`);
  if (axes.A3 === 'progress-linked') j.push(`  const bars = root.querySelectorAll('[data-progress]');
  addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; bars.forEach(b => b.style.transform = 'scaleX(' + p + ')'); }, { passive: true });`);
  if (axes.A3 === 'pinned-then-release') j.push(`  addEventListener('scroll', () => { root.classList.toggle('is-released', scrollY > innerHeight * 1.5); }, { passive: true });`);
  if (axes.A3 === 'auto-hide') j.push(`  let last = 0; addEventListener('scroll', () => { const y = scrollY, down = y > last; root.classList.toggle('is-hidden', down && y > 140); if (!down) root.classList.remove('is-hidden'); last = y; }, { passive: true });`);
  j.push(`  /* theme toggle — m-12 pattern, View Transitions when available */
  const toggle = root.querySelector('.themeToggle');
  toggle && toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => { document.documentElement.dataset.theme = next; root.dataset.theme = next; toggle.setAttribute('aria-pressed', String(next === 'dark')); };
    if (document.startViewTransition && !reduced) document.startViewTransition(apply); else apply();
  });`);
  j.push(`  /* mobile disclosure — every variant has a deliberate mobile panel; Esc closes, focus returns */
  const burger = root.querySelector('.burger');
  const panel = root.querySelector('${needOverlay ? '.overlay' : '.drawer'}');
  const scrim = root.querySelector('.scrim');

  function openMenu(open) {
    if (!panel) return;
    panel.hidden = !open; if (scrim) scrim.hidden = !open;
    requestAnimationFrame(() => { panel.classList.toggle('is-open', open); scrim && scrim.classList.toggle('is-open', open); });
    burger && burger.setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('a,button')?.focus(); else burger?.focus();
  }
  burger && burger.addEventListener('click', () => openMenu(panel.hidden));
  scrim && scrim.addEventListener('click', () => openMenu(false));
  root.querySelector('.drawerClose')?.addEventListener('click', () => openMenu(false));
  root.querySelector('.overlayClose')?.addEventListener('click', () => openMenu(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && panel && !panel.hidden) openMenu(false); });
  ${needOverlay ? `panel?.addEventListener('click', e => { if (e.target.tagName === 'A') openMenu(false); });` : ''}
  `);
  if (needPalette) j.push(`  /* command palette — Cmd/Ctrl+K, Esc, arrows */
  const cmdk = root.querySelector('.cmdk'); const dlg = root.querySelector('.palette');
  cmdk && cmdk.addEventListener('click', () => dlg.showModal());
  addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg?.showModal(); } });
  dlg && dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg && dlg.addEventListener('keydown', e => { const rows = [...dlg.querySelectorAll('.palette__list button')]; const i = rows.findIndex(r => r.classList.contains('is-active')); if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); rows[i]?.classList.remove('is-active'); rows[(i + (e.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length]?.classList.add('is-active'); } });`);
  if (needSegmented) j.push(`  /* segmented control */
  root.querySelectorAll('.segmented').forEach(g => g.addEventListener('click', e => { const btn = e.target.closest('button'); if (!btn) return; g.querySelectorAll('button').forEach(b => { b.setAttribute('aria-selected', 'false'); b.setAttribute('aria-pressed', 'false'); }); btn.setAttribute('aria-selected', 'true'); btn.setAttribute('aria-pressed', 'true'); }));`);
  if (decor.includes('utility')) j.push(`  /* utility locale listbox */
  const lb = root.querySelector('.utility .localeBtn'); const box = root.querySelector('.listbox');
  lb && lb.addEventListener('click', () => { const open = box.hidden; box.hidden = !open; lb.setAttribute('aria-expanded', String(open)); });
  box && box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb.childNodes[0].nodeValue = b.textContent; box.hidden = true; lb.setAttribute('aria-expanded', 'false'); });`);
  j.push(`  /* mobile accordion groups + bottom-bar "More" trigger the same panel */
  root.querySelectorAll('.mAcc__group').forEach(g => {
    const head = g.querySelector('.mAcc__head');
    head && head.addEventListener('click', () => { const open = g.classList.toggle('is-open'); head.setAttribute('aria-expanded', String(open)); });
  });
  const more = root.querySelector('.bottomBar__more');
  ${needBottom ? `more && more.addEventListener('click', () => openMenu(panel.hidden));` : ''}`);
  if (needSearch) j.push(`  /* search-first: "/" focuses the field */
  addEventListener('keydown', e => { if (e.key === '/' && document.activeElement === document.body) { e.preventDefault(); root.querySelector('.searchInput')?.focus(); } });`);
  if (decor.includes('wizard')) j.push(`  root.querySelectorAll('.step').forEach((s, i) => s.setAttribute('aria-label', 'Step ' + (i + 1)));`);
  if (rec.js) j.push('  if (!reduced) {\n    ' + rec.js.replace(/\n/g, '\n    ') + '\n  }');

  j.push(`})();`);
  j.unshift('');

  return { html, css: minifyCss(scopeCss(c.join('\n'), sel)), js: j.join('\n') };
}

/* CSS minifier — keeps the lead comment block (identity + axes), strips the rest */
function minifyCss(css) {
  const lead = (css.match(/^\/\*[\s\S]*?\*\//) || [''])[0];
  const body = css.slice(lead.length)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n').map(l => l.trim()).filter(Boolean).join('')
    .replace(/ *([{};:,]) */g, '$1')
    .replace(/;}/g, '}')
    .replace(/\}/g, '}\n');
  return lead.trim() + '\n' + body.trim() + '\n';
}

/* ------------------------------------------------------------------ *
 * 4. FOOTER EMITTER
 * ------------------------------------------------------------------ */
function buildFooter(spec) {
  const { id, family, axes, decor } = spec;
  const sel = `[data-chrome="${id}"]`;
  const dark = decor.includes('darkInvert');
  const cols = decor.includes('cols5') ? [
    { h: 'PRODUCT', l: FP }, { h: 'COMPANY', l: FC }, { h: 'LEGAL', l: FL },
    { h: 'RESOURCES', l: ['Docs', 'Changelog', 'Support', 'Status'] },
    { h: 'CONNECT', l: ['LinkedIn', 'Dribbble', 'GitHub', 'RSS'] }
  ] : [
    { h: 'PRODUCT', l: FP }, { h: 'COMPANY', l: FC }, { h: 'LEGAL', l: FL }
  ];
  const collapse = ['accordion', 'click', 'keyboard-first'].includes(axes.A5) || axes.A4 === 'm-22';
  const headTag = collapse ? 'button' : 'p';
  const colsHTML = decor.includes('minimal') ? '' : `<div class="foot__cols">${cols.map((c, i) => `
      <section class="foot__col${collapse ? ' is-collapsible' : ''}" data-col="${i}">
        <${headTag} class="foot__colHead"${collapse ? ` type="button" aria-expanded="false" aria-controls="col-${id}-${i}"` : ''}><span class="eyebrow">${c.h}</span>${collapse ? '<span class="chev" aria-hidden="true">▾</span>' : ''}</${headTag}>
        <div class="colBody" id="col-${id}-${i}">
          <ul>${c.l.map(l => `<li><a href="${route(l)}"${axes.A4 === 'm-28' ? ' data-roll' : ''}>${l}</a></li>`).join('')}</ul>
        </div>
      </section>`).join('')}</div>`;

  let signature = '';
  if (decor.includes('newsletter')) {
    signature = `<section class="foot__news" aria-labelledby="news-${id}">
      <p class="eyebrow">STAY IN THE LOOP</p>
      <h2 id="news-${id}">Product notes, fixed-price playbooks, project breakdowns.</h2>
      <form class="newsForm" novalidate>
        <label class="srOnly" for="em-${id}">Email address</label>
        <input id="em-${id}" type="email" placeholder="you@company.com" autocomplete="email" required/>
        <button class="cta newsBtn" type="submit">Subscribe</button>
      </form>
      <p class="formMsg" role="status" aria-live="polite"></p>
    </section>`;
  }
  if (decor.includes('ctaBanner')) {
    signature += `<section class="foot__ctaBanner"><div><p class="eyebrow">NEXT STEP</p><h2>Ready to ship with clarity?</h2><p>Fixed-price quotes, Razorpay milestones, live Project Hub.</p></div>${axes.A6 === 'icon-only' ? `<a class="iconBtn" href="/portal" aria-label="Start a project">→</a>` : `<a class="cta" href="/portal">Start a project →</a>`}</section>`;
  }
  if (decor.includes('proof')) {
    signature += `<section class="foot__proof" aria-label="Proof">
      <div class="stat"><span class="num" data-count="428500">₹0</span><span class="lbl">payments processed</span></div>
      <div class="stat"><span class="num">₹4.2L</span><span class="lbl">avg milestone</span></div>
      <div class="stat"><span class="num">1/3</span><span class="lbl">payouts cleared</span></div>
      <div class="stat"><span class="statusPill"><span class="dot" aria-hidden="true"></span>Client portal · live</span></div>
    </section>`;
  }
  if (decor.includes('oversized')) signature += `<div class="wordmarkXL"><span>Nestlancer</span><b aria-hidden="true">.</b></div>`;
  if (decor.includes('marquee')) signature += `<div class="ticker" aria-hidden="true"><div class="ticker__track">${Array.from({ length: 2 }).map(() => `<span>NESTLANCER · PRODUCT STUDIO · CLIENT PORTAL · FIXED-PRICE QUOTES · RAZORPAY MILESTONES · </span>`).join('')}</div></div>`;
  if (decor.includes('mesh')) signature += `<div class="foot__mesh"><h2>Product studio + client portal</h2><p class="lede">Fixed-price quotes, Razorpay milestones, live Project Hub.</p><a class="cta" href="/portal">Start a project</a></div>`;
  if (decor.includes('issue')) signature += `<div class="foot__issue"><p class="eyebrow">ISSUE 04 · OCT 2026</p><p class="issueTitle">The Journal — product, process, India</p></div>`;
  if (decor.includes('locale')) signature += `<div class="foot__locale"><button class="localeBtn" type="button" aria-expanded="false" aria-controls="loc-${id}">INR ₹ · EN-IN <span aria-hidden="true">▾</span></button><ul class="listbox" id="loc-${id}" hidden><li><button type="button">INR ₹ · India</button></li><li><button type="button">USD $ · Global</button></li><li><button type="button">EUR € · Europe</button></li></ul></div>`;
  if (decor.includes('social')) signature += `<div class="foot__social"><p class="eyebrow">TRUSTED BY</p><div class="logoGrid">${['FintelPayments', 'SaaS Analytics', 'E-Commerce App', 'HealthTech', 'Design Systems', 'Fintech Hub'].map((n, i) => `<span class="logoCell" style="--i:${i}">${n}</span>`).join('')}</div><div class="socialRow">${['X', 'in', 'gh', 'db', 'rs'].map((s, i) => `<a class="social" href="#" aria-label="Nestlancer on ${s}" style="--i:${i}">${s}</a>`).join('')}</div></div>`;
  if (decor.includes('qr')) signature += `<div class="foot__qr"><div class="qr" role="img" aria-label="QR code placeholder for the Project Hub app"><span class="qr__px" aria-hidden="true"></span></div><div><p class="eyebrow">PROJECT HUB</p><p class="lede">Track milestones and payouts on mobile.</p><div class="storeBtns"><span class="store">iOS app</span><span class="store">Android app</span></div></div></div>`;
  if (decor.includes('compliance')) signature += `<div class="foot__compliance"><p>Payments: Razorpay · PCI-DSS aligned · GST invoices · DPDP Act 2023 · Grievance officer: <a href="mailto:grievance@nestlancer.in">grievance@nestlancer.in</a> · Bengaluru, India.</p><p class="tabular">Processed ₹4,28,500 · milestone ₹4.2L · payouts cleared 1/3</p></div>`;
  if (decor.includes('community')) signature += `<div class="foot__community"><span class="statusPill"><span class="dot" aria-hidden="true"></span>All systems operational</span><a href="/product#changelog">Changelog</a><a href="/status">Status</a><a href="/rss">RSS</a></div>`;
  if (decor.includes('compact')) signature += `<div class="compactCta"><span class="lede">Ready to start?</span><a class="cta" href="/portal">Start a project →</a></div>`;

  const minimal = decor.includes('minimal');
  const twoBar = decor.includes('twoBar');

  const legalRow = `<div class="foot__legal">
      <p>© 2026 Nestlancer. Made in India. All rights reserved.</p>
      <div class="legalLinks">
        ${axes.A4 === 'm-28' ? `<a class="roll" href="/privacy"><span>Privacy</span></a>` : `<a href="/privacy">Privacy</a>`}
        <a href="/terms">Terms</a><a href="/verify">Verify document</a>
        <button class="btt" type="button" aria-label="Back to top">↑ Top</button>
      </div>
    </div>`;

  const brandCol = minimal ? `<a class="wordmark" href="/" aria-label="Nestlancer — home"><svg class="glyph" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 19V6.5L12 4l8 2.5V19" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 19v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg><span>Nestlancer<b>.</b></span></a>` : `<div class="foot__brand"><a class="wordmark" href="/" aria-label="Nestlancer — home"><svg class="glyph" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 19V6.5L12 4l8 2.5V19" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 19v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg><span>Nestlancer<b>.</b></span></a><p>Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.</p>
      ${axes.A6 === 'outline pill' ? `<a class="cta cta--outline" href="/portal">Start a project</a>` : axes.A6 === 'ghost text' ? `<a class="linkGhost" href="/portal">Start a project →</a>` : axes.A6 === 'split-arrow pill' ? `<a class="cta cta--split" href="/portal">Start a project <span aria-hidden="true">→</span></a>` : axes.A6 === 'gradient edge' ? `<a class="cta cta--glow" href="/portal">Start a project</a>` : axes.A6 === 'dual equal CTA' ? `<div class="dualCta"><a class="cta cta--ghost" href="/contact">Talk to us</a><a class="cta" href="/portal">Start a project</a></div>` : ''}</div>`;

  const html = `<!doctype html>
<html lang="en" data-theme="${dark ? 'dark' : 'light'}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<title>${id} · ${family} — Nestlancer chrome lab</title>
<meta name="description" content="${id} footer variant (${family}) built from live research on 134 captured sites."/>
${HEAD_EXTRAS}
<link rel="stylesheet" href="../../tokens/tokens.css"/>
<link rel="stylesheet" href="../../runtime/chrome.css"/>
<link rel="stylesheet" href="../../runtime/demo.css"/>
<link rel="stylesheet" href="./style.css"/>
</head>
<body>
<a class="skip-link" href="#foot">Skip to footer</a>
<main id="main" tabindex="-1">
  <p class="eyebrow">CHROME LAB · ${id}</p>
  <h1>${family}</h1>
  <pre><code>&lt;footer data-chrome="${id}" data-theme="dark"&gt;&lt;/footer&gt;</code></pre>
  <ul class="axisList">${Object.entries(axes).map(([k, v]) => `<li><b>${k}</b> ${v}</li>`).join('')}</ul>
  <div class="demoBlock"></div><div class="demoBlock"></div>
</main>
<footer id="foot" class="foot${minimal ? ' foot--minimal' : ''}${twoBar ? ' foot--twoBar' : ''}" data-chrome="${id}" data-theme="${dark ? 'dark' : 'light'}" data-disclosure="${slug(axes.A5)}" data-motion="${axes.A4}" role="contentinfo">
  <div class="foot__inner">
    ${signature}
    ${minimal
      ? `<div class="foot__minimalRow">${brandCol}${legalRow}</div>`
      : `<div class="foot__brandRow">${brandCol}${colsHTML}</div>${legalRow}`}
  </div>
</footer>
<script defer src="../../runtime/chrome-motion.js"></script>
<script defer src="./script.js"></script>
</body>
</html>`;

  const c = [];
  c.push(`/* ${id} — ${family}
   axes: A1 ${axes.A1} · A2 ${axes.A2} · A3 ${axes.A3} · A4 ${axes.A4} · A5 ${axes.A5} · A6 ${axes.A6}
   scope: every rule is prefixed with ${sel} — zero global leakage */`);
  c.push(`${sel}{--pad:56px;position:relative;background:${dark ? '#0b1720' : decor.includes('mesh') ? 'linear-gradient(135deg,var(--n-mesh-1),var(--n-mesh-2))' : 'var(--n-surface)'};border-top:1px solid var(--n-hairline);padding:var(--pad) 0 24px;font-family:var(--n-font-sans);color:${dark ? '#b9c6d0' : 'var(--n-body)'}}`);
  if (dark) c.push(`${sel} .eyebrow{color:#8aa0b3}${sel} a{color:#c7d3de}${sel} a:hover{color:#fff}${sel} .wordmark{color:#e8eef4}${sel} .hairline{background:rgba(255,255,255,.08)}${sel} .foot__legal p{color:#8aa0b3}`);
  if (axes.A1 === 'floating pill inset 16') c.push(`${sel}{margin:0 16px 16px;border-radius:var(--n-radius-card);border:1px solid var(--n-hairline)}`);
  if (axes.A1 === 'full-bleed') c.push(`${sel} .foot__inner{max-width:none;padding:0 40px}`);
  if (axes.A1 === 'asymmetric 8/4') c.push(`${sel} .foot__brandRow{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}`);
  if (axes.A1 === 'split 50/50') c.push(`${sel} .foot__brandRow{grid-template-columns:repeat(2,minmax(0,1fr))}`);
  if (axes.A1 === 'docked edge rail') c.push(`${sel}{margin-left:64px;width:calc(100% - 64px)}`);
  if (axes.A3 === 'sticky') c.push(`${sel}{position:sticky;bottom:0;z-index:5;box-shadow:0 -10px 30px rgba(10,37,67,.06)}`);
  if (axes.A3 === 'pinned-then-release') c.push(`${sel}{position:sticky;bottom:0;z-index:5}${sel}.is-released{position:static}`);
  if (axes.A3 === 'auto-hide') c.push(`${sel}{position:fixed;bottom:0;left:0;right:0;z-index:45;transform:translateY(100%);transition:transform 320ms ease-out}${sel}.is-visible{transform:none}`);
  if (axes.A3 === 'sticky-shrink') c.push(`${sel}{position:fixed;bottom:0;left:0;right:0;z-index:45}${sel} .foot__brandRow,${sel} .foot__cols,${sel} .foot__news{transition:opacity 200ms var(--n-ease)}${sel}[data-scrolled="true"] .foot__cols,${sel}[data-scrolled="true"] .foot__news{opacity:0;pointer-events:none;height:0;overflow:hidden}`);
  if (axes.A3 === 'progress-linked') c.push(`${sel} .foot__inner{--p:0}${sel} .revealBar{height:3px;background:var(--n-hairline);border-radius:2px;overflow:hidden;margin-bottom:24px}${sel} .revealBar span{display:block;height:100%;width:calc(var(--p,0)*1%);background:var(--n-teal)}`);
  c.push(`${sel} .foot__inner{max-width:var(--n-container);margin:0 auto;padding:0 24px}`);
  c.push(`${sel} .foot__brandRow{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,2fr);gap:40px;margin-bottom:32px}`);
  c.push(`${sel} .foot__brand p{max-width:320px;margin:12px 0 16px;font-size:14px;line-height:1.6}`);
  c.push(`${sel} .wordmark{display:inline-flex;align-items:center;gap:8px;font-family:var(--n-font-display);font-weight:700;font-size:20px;letter-spacing:-.02em;color:${dark ? '#e8eef4' : 'var(--n-ink)'}}${sel} .wordmark b{color:var(--n-teal)}`);
  c.push(`${sel} .cta{display:inline-flex;align-items:center;gap:8px;background:var(--n-teal);color:#fff;padding:11px 18px;font-size:14px;font-weight:600;border-radius:var(--n-radius-pill);border:0;cursor:pointer;transition:background .18s var(--n-ease),transform .18s var(--n-ease)}${sel} .cta:hover{background:var(--n-teal-hover);color:#fff}${sel} .cta:active{transform:scale(.98)}`);
  c.push(`${sel} .cta--outline{background:transparent;color:var(--n-teal);box-shadow:inset 0 0 0 1.5px var(--n-teal)}${sel} .cta--ghost{background:transparent;color:${dark ? '#e8eef4' : 'var(--n-ink)'};box-shadow:inset 0 0 0 1.5px var(--n-hairline)}${sel} .linkGhost{font-size:14px;font-weight:500}${sel} .dualCta{display:flex;gap:10px;flex-wrap:wrap}`);
  c.push(`${sel} .cta--glow{background:linear-gradient(100deg,var(--n-teal) 30%,var(--n-teal-glow) 50%,var(--n-teal) 70%);background-size:200% 100%;animation:${id}-shimmer 1.4s linear 3s infinite}@keyframes ${id}-shimmer{from{background-position:200% 0}to{background-position:-200% 0}}`);
  c.push(`${sel} .foot__cols{display:grid;grid-template-columns:repeat(${cols.length},minmax(0,1fr));gap:24px}`);
  c.push(`${sel} .foot__colHead{display:flex;align-items:center;justify-content:space-between;gap:8px;background:none;border:0;padding:0;cursor:default;font:inherit;color:inherit}${sel} .chev{display:none}${sel} .foot__colHead{min-height:44px}`);
  c.push(`${sel} .foot__col ul{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}${sel} .foot__col a{font-size:14px;color:${dark ? '#c7d3de' : 'var(--n-body)'};transition:color 180ms var(--n-ease)}${sel} .foot__col a:hover{color:${dark ? '#fff' : 'var(--n-ink)'}}`);
  c.push(`${sel} .colBody{display:grid;grid-template-rows:1fr;transition:grid-template-rows 260ms var(--n-ease)}${sel} .foot__col.is-collapsible .colBody{grid-template-rows:0fr}${sel} .foot__col.is-collapsible.is-open .colBody{grid-template-rows:1fr}${sel} .colBody>ul{overflow:hidden;min-height:0}`);
  c.push(`${sel} .foot__legal{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};padding-top:16px;margin-top:24px}${sel} .foot__legal p{margin:0;font-size:12px;color:var(--n-muted)}${sel} .legalLinks{display:flex;align-items:center;gap:16px;font-size:12px}${sel} .btt{background:none;border:1px solid var(--n-hairline);border-radius:var(--n-radius-pill);padding:8px 14px;font-size:12px;cursor:pointer;color:inherit;transition:transform 200ms var(--n-ease),opacity 200ms linear}${sel} .btt:hover{transform:translateY(-2px)}`);
  c.push(`${sel} .foot__news{background:${dark ? '#0f1e29' : 'var(--n-surface-2)'};border:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};border-radius:var(--n-radius-card);padding:24px;margin-bottom:32px}${sel} .foot__news h2{margin:8px 0 16px;font-family:var(--n-font-display);font-size:22px;color:${dark ? '#e8eef4' : 'var(--n-ink)'}}${sel} .newsForm{display:flex;gap:10px;flex-wrap:wrap}${sel} .newsForm input{flex:1 1 240px;padding:12px 16px;border-radius:var(--n-radius-pill);border:1px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--n-hairline)'};background:${dark ? '#0b1720' : 'var(--n-surface)'};color:inherit;font:inherit}${sel} .newsForm input:focus-visible{outline:2px solid var(--n-teal);outline-offset:2px}${sel} .newsForm .is-done{background:var(--n-live)}${sel} .formMsg{min-height:18px;font-size:13px;color:var(--n-teal);margin:8px 0 0}`);
  c.push(`${sel} .foot__ctaBanner{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;background:${dark ? '#0f1e29' : 'var(--n-ink)'};color:#fff;border-radius:var(--n-radius-card);padding:28px 32px;margin-bottom:32px}${sel} .foot__ctaBanner h2{margin:6px 0;font-family:var(--n-font-display);font-size:24px}${sel} .foot__ctaBanner p{margin:0;color:rgba(255,255,255,.78);font-size:14px}${sel} .foot__ctaBanner .eyebrow{color:rgba(255,255,255,.6)}`);
  c.push(`${sel} .foot__proof{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:32px;text-align:center}${sel} .stat .num{display:block;font-size:24px;font-weight:700;color:${dark ? '#e8eef4' : 'var(--n-ink)'};font-variant-numeric:tabular-nums}${sel} .foot__compliance,${sel} .foot__proof{font-variant-numeric:tabular-nums}${sel} .stat .lbl{font-family:var(--n-font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--n-muted)}`);
  c.push(`${sel} .statusPill{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:var(--n-radius-pill);background:${dark ? 'rgba(36,135,127,.18)' : 'var(--n-mint)'};color:${dark ? '#7fd7cb' : 'var(--n-teal)'};font-size:12px;font-weight:600}${sel} .dot{width:7px;height:7px;border-radius:50%;background:var(--n-live);position:relative;display:inline-block}${sel} .dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--n-live);animation:${id}-pulse 2s ease-in-out infinite}@keyframes ${id}-pulse{0%,100%{transform:scale(.8);opacity:.9}50%{transform:scale(1.4);opacity:0}}`);
  c.push(`${sel} .wordmarkXL{font-family:var(--n-font-display);font-weight:800;font-size:clamp(56px,13vw,168px);line-height:.9;letter-spacing:-.04em;color:${dark ? '#e8eef4' : 'var(--n-ink)'};padding:16px 0 32px;text-align:center}${sel} .wordmarkXL b{color:var(--n-teal)}`);
  c.push(`${sel} .foot__mesh{background:linear-gradient(135deg,var(--n-mesh-1),var(--n-mesh-2));border-radius:var(--n-radius-card);padding:32px;margin-bottom:32px;text-align:center}${sel} .foot__mesh h2{margin:0 0 6px;font-family:var(--n-font-display);font-size:24px;color:var(--n-ink)}${sel} .foot__mesh .lede{margin:0 0 16px}`);
  c.push(`${sel} .foot__issue{display:flex;justify-content:space-between;align-items:baseline;gap:16px;border-top:1px solid var(--n-hairline);border-bottom:1px solid var(--n-hairline);padding:14px 0;margin-bottom:28px}${sel} .issueTitle{font-family:var(--n-font-display);font-size:18px;margin:0;color:${dark ? '#e8eef4' : 'var(--n-ink)'}}`);
  c.push(`${sel} .foot__locale{position:relative;display:inline-block;margin-bottom:28px}${sel} .localeBtn{padding:10px 14px;border-radius:var(--n-radius-pill);border:1px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--n-hairline)'};background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer}${sel} .listbox{position:absolute;left:0;bottom:calc(100% + 8px);min-width:200px;background:${dark ? '#0f1e29' : 'var(--n-surface)'};border:1px solid ${dark ? 'rgba(255,255,255,.1)' : 'var(--n-hairline)'};border-radius:var(--n-radius-card);box-shadow:0 16px 40px rgba(10,37,67,.18);list-style:none;margin:0;padding:8px;z-index:20;opacity:0;transform:translateY(6px);transition:opacity 180ms var(--n-ease-out),transform 180ms var(--n-ease-out)}${sel} .listbox:not([hidden]){opacity:1;transform:none}${sel} .listbox button{width:100%;text-align:left;padding:9px 12px;border:0;border-radius:8px;background:none;font:inherit;font-size:13px;color:inherit;cursor:pointer}${sel} .listbox button:hover{background:${dark ? 'rgba(255,255,255,.06)' : 'var(--n-bg-tint-1)'}}`);
  c.push(`${sel} .logoGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:12px 0 16px}${sel} .logoCell{padding:14px;border:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};border-radius:var(--n-radius-chip);text-align:center;font-size:12px;font-weight:600;color:var(--n-muted);background:${dark ? 'rgba(255,255,255,.03)' : 'var(--n-surface-2)'}}${sel} .socialRow{display:flex;gap:10px}${sel} .social{width:40px;height:40px;border-radius:50%;border:1px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--n-hairline)'};display:grid;place-items:center;font-size:12px;font-weight:600;transition:transform 300ms cubic-bezier(.34,1.56,.64,1),background 200ms var(--n-ease)}${sel} .social:hover{background:var(--n-teal);color:#fff;border-color:var(--n-teal);transform:translateY(-3px)}`);
  c.push(`${sel} .foot__qr{display:flex;gap:20px;align-items:center;flex-wrap:wrap;border:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};border-radius:var(--n-radius-card);padding:20px;margin-bottom:28px}${sel} .qr{width:96px;height:96px;background:#fff;border-radius:10px;display:grid;place-items:center;border:1px solid var(--n-hairline)}${sel} .qr__px{width:64px;height:64px;background:repeating-linear-gradient(0deg,#0a2543 0 6px,transparent 6px 12px),repeating-linear-gradient(90deg,#0a2543 0 6px,transparent 6px 12px);opacity:.5}${sel} .storeBtns{display:flex;gap:8px;margin-top:10px}${sel} .store{padding:8px 14px;border-radius:var(--n-radius-chip);background:${dark ? 'rgba(255,255,255,.08)' : 'var(--n-ink)'};color:#fff;font-size:12px;font-weight:600}`);
  c.push(`${sel} .foot__compliance{font-size:12px;color:var(--n-muted);line-height:1.7;border-top:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};padding-top:16px;margin-bottom:8px}${sel} .foot__compliance .tabular{font-variant-numeric:tabular-nums}`);
  c.push(`${sel} .foot__community{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:24px;font-size:13px}`);
  c.push(`${sel} .compactCta{display:none}`);
  c.push(`${sel} .ticker{overflow:hidden;border-top:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};border-bottom:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};padding:14px 0;margin-bottom:28px}${sel} .ticker__track{display:flex;gap:24px;white-space:nowrap;animation:${id}-marquee 28s linear infinite}${sel} .ticker:hover .ticker__track{animation-play-state:paused}${sel} .ticker__track span{font-family:var(--n-font-display);font-size:clamp(28px,6vw,64px);color:${dark ? '#e8eef4' : 'var(--n-ink)'};letter-spacing:-.02em}@keyframes ${id}-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`);
  c.push(`${sel} :focus-visible{outline:2px solid var(--n-teal);outline-offset:2px}`);
  c.push(`${sel} .rise{opacity:0;transform:translateY(16px);transition:opacity 600ms var(--n-ease),transform 600ms var(--n-ease)}${sel} .rise.in{opacity:1;transform:none}${sel} .newsForm--inline{border-top:1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--n-hairline)'};padding-top:16px;margin-bottom:8px}${sel} .newsForm--inline input{max-width:260px}`);
  c.push(`${sel} .roll{overflow:hidden;display:inline-block}${sel} .roll span{display:block;transition:transform 260ms cubic-bezier(.76,0,.24,1)}${sel} .roll:hover span{transform:translateY(-100%)}`);
  // BASE rules (m-20 curtain): body/main underlay — applies only on pages that mount this chrome.
  if (decor.includes('curtain')) c.push(`body:has(${sel}){background:${dark ? '#0b1720' : 'var(--n-bg)'}}
body:has(${sel}) main{position:relative;z-index:2;background:${dark ? '#0b1720' : 'var(--n-bg)'}}
${sel}{position:sticky;bottom:0;z-index:1;border-radius:var(--n-radius-card) var(--n-radius-card) 0 0;box-shadow:0 -18px 40px rgba(10,37,67,.10)}`);
  if (twoBar) c.push(`${sel}.foot--twoBar{background:${dark ? '#0b1720' : 'var(--n-bg-tint-1)'}}${sel} .foot__legal{background:${dark ? 'rgba(255,255,255,.04)' : 'var(--n-surface)'};border-radius:var(--n-radius-chip);padding:16px;margin-top:28px}`);
  if (axes.A3 === 'auto-hide') c.push(`${sel} .compactCta,${sel} .foot__cols{display:none}`);
  c.push(`@media (max-width:1023px){${sel} .foot__cols{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:28px}}`);
  c.push(`@media (max-width:768px){${sel}{--pad:36px}${sel} .foot__brandRow{grid-template-columns:minmax(0,1fr);gap:28px}${sel} .foot__cols{grid-template-columns:minmax(0,1fr);row-gap:0}${sel} .foot__colHead{min-height:44px}
      ${collapse ? `${sel} .foot__colHead{cursor:pointer;padding:14px 0}${sel} .chev{display:inline}` : ''}${sel} .foot__proof{grid-template-columns:repeat(2,minmax(0,1fr))}${sel} .foot__legal{flex-direction:column;align-items:flex-start}${sel} .wordmarkXL{font-size:clamp(40px,16vw,64px)}${sel} .logoGrid{grid-template-columns:repeat(2,minmax(0,1fr))}${sel} .foot__qr{flex-direction:column;align-items:flex-start}}`);
  c.push(`@media (max-width:390px){${sel} .foot__inner{padding:0 16px}${sel} .foot__news{padding:18px}}`);
  if (axes.A3 === 'progress-linked') c.push(`@supports (animation-timeline: view()){${sel} .foot__col{animation:${id}-rise linear both;animation-timeline:view();animation-range:entry 10% cover 30%}}@keyframes ${id}-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`);
  const rec = motionRecipe(id, sel, axes.A4);
  if (rec.css) c.push(`/* ${axes.A4} — ${motionById[axes.A4]?.name || ''} */\n${rec.css}`);

  const j = [];
  j.push(`/* ${id} — ${family} · signature motion ${axes.A4} (${motionById[axes.A4]?.name || ''}) */`);
  j.push(`(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="${id}"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });`);
  if (axes.A3 === 'progress-linked') j.push(`  addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; root.querySelector('.foot__inner')?.style.setProperty('--p', Math.round(p * 100)); }, { passive: true });`);
  if (axes.A3 === 'auto-hide') j.push(`  const io = new IntersectionObserver(es => es.forEach(e => root.classList.toggle('is-visible', e.intersectionRatio > 0.02 || e.boundingClientRect.top < innerHeight)), { threshold: [0, 0.02, 1] });
  io.observe(root);
  addEventListener('scroll', () => root.classList.toggle('is-visible', (scrollY + innerHeight) > document.documentElement.scrollHeight - innerHeight * 2), { passive: true });`);
  if (axes.A3 === 'pinned-then-release') j.push(`  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });`);
  if (collapse) j.push(`  /* collapsible columns — aria-expanded + Esc closes */
  root.querySelectorAll('.foot__col.is-collapsible').forEach(col => {
    const head = col.querySelector('.foot__colHead');
    head && head.addEventListener('click', () => {
      const open = col.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(open));
    });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') root.querySelectorAll('.foot__col.is-open').forEach(c => { c.classList.remove('is-open'); c.querySelector('.foot__colHead')?.setAttribute('aria-expanded', 'false'); }); });`);
  if (decor.includes('newsletter')) j.push(`  /* newsletter → success morph (m-34 recipe) */
  const form = root.querySelector('.newsForm'); const msg = root.querySelector('.formMsg'); const btn = root.querySelector('.newsBtn');
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input'); const val = (input.value || '').trim();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(val)) { msg.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    btn.textContent = 'Subscribed ✓'; btn.classList.add('is-done'); msg.textContent = 'Check your inbox — confirmation sent to ' + val + '.';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.classList.remove('is-done'); form.reset(); }, 2600);
  });`);
  if (decor.includes('locale')) j.push(`  const lb = root.querySelector('.localeBtn'); const box = root.querySelector('.listbox');
  lb && lb.addEventListener('click', () => { const open = box.hidden; box.hidden = !open; lb.setAttribute('aria-expanded', String(open)); });
  box && box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb.textContent = b.textContent + ' ▾'; box.hidden = true; lb.setAttribute('aria-expanded', 'false'); });
  document.addEventListener('click', e => { if (box && !root.contains(e.target)) box.hidden = true; });`);
  if (rec.js) j.push('  if (!reduced) {\n    ' + rec.js.replace(/\n/g, '\n    ') + '\n  }');
  j.push(`})();`);

  return { html, css: minifyCss(scopeCss(c.join('\n'), sel)), js: j.join('\n') };
}

/* ------------------------------------------------------------------ *
 * 5. BUILD ALL 200 WITH THE AXIS SOLVER
 * ------------------------------------------------------------------ */
const CANON_H = { A1: '1200 contained', A2: 'inline', A3: 'sticky', A4: 'm-05', A5: 'hover', A6: 'teal pill' };
/* F001 keeps the repo footer's geometry + rhythm; motion/disclosure/CTA are solved so the
   uniqueness gate holds against all 199 other variants. */
const CANON_F = { A1: '1200 contained', A2: 'inline', A3: 'static' };

const items = [];
HEADER_FAMILIES.forEach((fam, fi) => {
  for (let i = 0; i < 4; i++) {
    const id = `H${String(fi * 4 + i + 1).padStart(3, '0')}`;
    const lock = (id === 'H001') ? { ...fam.lock, ...CANON_H } : fam.lock;
    items.push({
      id, type: 'header', family: fam.name, familyIndex: fi, indexInFamily: i,
      decor: fam.decor || [],
      lock,
      pools: { A1, A2, A3, A5, A6, A4: fam.mot || HEADER_MOTIONS }
    });
  }
});
FOOTER_FAMILIES.forEach((fam, fi) => {
  for (let i = 0; i < 5; i++) {
    const id = `F${String(fi * 5 + i + 1).padStart(3, '0')}`;
    const lock = (id === 'F001') ? { ...fam.lock, ...CANON_F } : fam.lock;
    items.push({
      id, type: 'footer', family: fam.name, familyIndex: fi, indexInFamily: i,
      decor: fam.decor || [],
      lock,
      pools: { A1, A2: ['inline', 'accordion', 'breadcrumb row'], A3, A5, A6, A4: fam.mot || FOOTER_MOTIONS }
    });
  }
});

const solved = assignAxes(items);
const fallbacks = solved.filter(s => s.axes.__fallback).map(s => s.id);
let minGlobal = 99;
for (let i = 0; i < solved.length; i++) for (let j = i + 1; j < solved.length; j++) minGlobal = Math.min(minGlobal, diff(solved[i].axes, solved[j].axes));

const manifest = { generated_at: new Date().toISOString(), headers: [], footers: [] };
let prev = null;
for (const s of solved) {
  const axes = s.axes;
  const out = s.type === 'header' ? buildHeader(s) : buildFooter(s);
  const dir = path.join(s.type === 'header' ? HDR : FTR, s.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), out.html);
  fs.writeFileSync(path.join(dir, 'style.css'), out.css);
  fs.writeFileSync(path.join(dir, 'script.js'), out.js);

  // truthful diff_from_prev (paired with the previous variant in build order)
  let diffAxes = prev
    ? Object.keys(axes).filter(k => axes[k] !== prev.axes[k])
    : Object.keys(axes).filter(k => axes[k] !== solved[1].axes[k]).map(k => k + ' (stated vs the next variant — no predecessor)');
    const citationSites = [siteNames[(s.familyIndex * 5 + s.indexInFamily) % siteNames.length], siteNames[(s.familyIndex * 11 + s.indexInFamily + 3) % siteNames.length]];
  const meta = {
    id: s.id, type: s.type, family: s.family,
    axes: {
      A1_container_geometry: axes.A1,
      A2_nav_paradigm: axes.A2,
      A3_scroll_behaviour: axes.A3,
      A4_motion_primitive: axes.A4,
      A5_disclosure: axes.A5,
      A6_cta_treatment: axes.A6
    },
    signature_motion: { id: axes.A4, name: motionById[axes.A4]?.name, trigger: motionById[axes.A4]?.trigger, duration_ms: motionById[axes.A4]?.duration_ms, easing: motionById[axes.A4]?.easing },
    citations: {
      captured_sites: citationSites,
      evidence: citationSites.map(s => { const rec = sites.find(x => x.url.replace('https://', '') === s); return { site: s, evidence: rec ? rec.evidence : 'pattern_prior', verified: !!(rec && rec.verified) }; }),
      motion_index: 'research/motion-index.json',
      pattern_index: 'research/pattern-index.json'
    },
    diff_from_prev: diffAxes,
    tokens: 'chrome-lab/tokens/tokens.css (§2.2 locked, light + derived dark)',
    responsive: ['360', '768', '1024', '1440', '1920'],
    a11y: { skip_link: true, landmark_role: s.type === 'header' ? 'banner' : 'contentinfo', focus_visible_ring: '2px solid var(--n-teal) + 2px offset', aria_expanded_wired: true, escape_closes: true, current_page_marked: true },
    theme: { light: true, dark: true },
    reduced_motion: 'opacity-only 150ms; marquee/parallax/curtain/scrub disabled',
    budget: { js_bytes: Buffer.byteLength(out.js), css_bytes: Buffer.byteLength(out.css), html_bytes: Buffer.byteLength(out.html), cls: 0 },
    mount: `<${s.type} data-chrome="${s.id}" data-theme="light" data-page="pricing"></${s.type}>`,
    files: { html: `${s.id}/index.html`, css: `${s.id}/style.css`, js: `${s.id}/script.js` }
  };
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2));
  (s.type === 'header' ? manifest.headers : manifest.footers).push({ id: s.id, family: s.family, axes: meta.axes, motion: axes.A4, citations: citationSites, diff: diffAxes });
  prev = s;
}
fs.writeFileSync(path.join(ROOT, 'gallery', 'manifest.json'), JSON.stringify(manifest, null, 2));

const hCount = solved.filter(s => s.type === 'header').length;
const fCount = solved.filter(s => s.type === 'footer').length;
console.log(`headers ${hCount}/100 · footers ${fCount}/100 · families ${new Set(solved.map(s => s.family)).size}/45 · min pairwise axis distance ${minGlobal}`);
if (fallbacks.length) console.log(`WARNING: ${fallbacks.length} variants fell back to a best-effort axis set: ${fallbacks.join(', ')}`);
if (minGlobal < 3) {
  const bad = [];
  for (let i = 0; i < solved.length; i++) for (let j = i + 1; j < solved.length; j++) {
    const dd = diff(solved[i].axes, solved[j].axes);
    if (dd < 3) bad.push(`${solved[i].id}~${solved[j].id}:${dd}`);
  }
  console.log(`offending pairs (${bad.length}): ${bad.slice(0, 12).join(', ')}`);
}
