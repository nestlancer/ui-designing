// Shared kit for the 20 header+footer pairs: copy bank, icon set, logo helper,
// base CSS (tokens + a few primitives) and the tiny JS snippets.
// Everything a pair needs beyond this lives in that pair's own definition.

export const NAV = ['Product', 'Portfolio', 'Blog', 'About', 'Pricing', 'Services', 'Contact'];
export const COLS = {
  PRODUCT: ['Project Hub', 'Pricing', 'Services', 'Portfolio'],
  COMPANY: ['About', 'Blog', 'Contact', 'Start a project'],
  LEGAL: ['Terms', 'Privacy', 'Verify document'],
};
export const BLURB = 'Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.';
export const LEGAL = '© 2026 Nestlancer. Made in India. All rights reserved.';
export const TICKER = ['FINTECH', 'E-COMMERCE', 'SaaS', 'B2B PORTALS', 'MOBILE APPS', 'DESIGN SYSTEMS', 'MARKETPLACES', 'HEALTHCARE'];

// ---- one icon set: 24x24, stroke, currentColor -------------------------------
const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  external: '<path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5m0 2.5c0-1.6 1-2.5 2.3-2.5s2.2.9 2.2 2.6V16"/>',
  github: '<path d="M9 19c-4 1.2-4-2-6-2.5m12 4.5v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.600 11.600 0 0 0-6 0C6.500 3.700 5.500 4 5.500 4a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 10.400c0 4.600 2.800 5.700 5.500 6A2.700 2.700 0 0 0 8.700 18.400V21"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  home: '<path d="M4 11.5 12 5l8 6.500V19a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z"/>',
  layers: '<path d="m12 4 9 5-9 5-9-5zM3 14l9 5 9-5"/>',
  pen: '<path d="M4 20l1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19z"/>',
  tag: '<path d="M3 12.500V4h8.500l9 9a1.500 1.500 0 0 1 0 2.100l-6.400 6.400a1.500 1.500 0 0 1-2.100 0z"/><circle cx="7.500" cy="8.500" r="1.200"/>',
  send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
  user: '<circle cx="12" cy="8.500" r="3.800"/><path d="M4.500 20a7.500 7.500 0 0 1 15 0"/>',
  shield: '<path d="M12 3 5 6v5.500c0 4.300 2.900 7.700 7 9.500 4.100-1.800 7-5.200 7-9.500V6z"/><path d="m9 12 2.200 2.200L15.500 10"/>',
  rupee: '<path d="M7 5h10M7 9h10M7 5c4.500 0 6.500 1.500 6.500 4S11.500 13 7 13l7 7"/>',
  hub: '<rect x="3.500" y="4" width="17" height="16" rx="2.500"/><path d="M3.500 9h17M8.500 9v11"/>',
};
export const ic = (name, s = 18, cls = '') =>
  `<svg class="ic${cls ? ' ' + cls : ''}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

// ---- the REAL logo files (never redrawn) ------------------------------------
// o.mode: 'auto' (swap with theme) | 'dark' (always the white logo) ; o.mark: mark-only
export function logo({ h = 34, mark = false, mode = 'auto', cls = '' } = {}) {
  const ratio = mark ? 535 / 544 : 1973 / 544;
  const w = Math.round(h * ratio);
  const base = mark ? '../../assets/logo-mark-' : '../../assets/logo-full-';
  const light = `<img class="logo__l" src="${base}light.svg" width="${w}" height="${h}" alt="Nestlancer">`;
  const dark = `<img class="logo__d" src="${base}dark.svg" width="${w}" height="${h}" alt="Nestlancer">`;
  const inner = mode === 'dark' ? dark.replace('class="logo__d"', 'class="logo__d is-only"') : light + dark;
  return `<a class="logo ${cls}" href="#" aria-label="Nestlancer home">${inner}</a>`;
}

export const themeBtn = (cls = 'iconbtn') =>
  `<button type="button" class="${cls}" data-theme-toggle aria-pressed="false" aria-label="Toggle color theme">${ic('sun', 18, 'i-sun')}${ic('moon', 18, 'i-moon')}</button>`;

export const list = (cls, items, cur, itemCls = '') =>
  `<ul class="${cls}">${items
    .map((t) => `<li><a${itemCls ? ` class="${itemCls}"` : ''} href="#"${t === cur ? ' aria-current="page"' : ''}>${t}</a></li>`)
    .join('')}</ul>`;

export const cols = (cls, headCls) =>
  Object.entries(COLS)
    .map(
      ([h, ls]) =>
        `<nav class="${cls}" aria-label="${h[0] + h.slice(1).toLowerCase()}"><h2 class="${headCls}">${h}</h2>${list('', ls).replace('<ul class="">', '<ul>')}</nav>`
    )
    .join('');

// ---- base CSS: tokens + primitives every file shares ------------------------
export const BASE = `
:root{
  --bg:#f9fbfc; --surface:#ffffff; --surface-2:#f4f8f9; --tint:#edf4f6; --mint:#eef7f5;
  --mesh-1:#d8e8e9; --mesh-2:#daeaeb;
  --ink:#0a2543; --ink-2:#123a5e; --body:#4a5c6e; --muted:#5f7080; --line:#e3ebe9;
  --teal:#24877f; --teal-hover:#1c6f68; --teal-soft:#d9ece9; --glow:#3fb8ab; --live:#22a06b;
  --btn:#1f7a73;                       /* teal CTA fill, nudged for AA with white text */
  --band:#0a2543; --band-text:#e8eef4; --band-body:#b9c6d0; --band-line:rgba(255,255,255,.12);
  --shadow:0 8px 28px rgba(10,37,67,.10);
  --pill:999px; --card:14px; --chip:8px;
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
  color-scheme:light;
}
[data-theme="dark"]{
  --bg:#0b1720; --surface:#0f1e29; --surface-2:#12242f; --tint:#102530; --mint:#10272a;
  --mesh-1:#12303a; --mesh-2:#0f2a33;
  --ink:#e8eef4; --ink-2:#d3dde6; --body:#b9c6d0; --muted:#8aa0b3; --line:rgba(255,255,255,.08);
  --teal:#2fa59b; --teal-hover:#3fb8ab; --teal-soft:#14343a;
  --band:#06111a; --shadow:0 8px 28px rgba(0,0,0,.45);
  color-scheme:dark;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font:400 16px/1.5 var(--font);color:var(--body);background:var(--bg)}
[hidden]{display:none!important}
ul{list-style:none;margin:0;padding:0}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
button{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--teal);outline-offset:2px;border-radius:4px}
.skip{position:absolute;left:12px;top:-60px;z-index:1000;padding:10px 16px;border-radius:var(--chip);background:var(--ink);color:var(--bg);font-weight:600}
.skip:focus{top:12px}
.ic{flex:none}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.logo{display:inline-flex;align-items:center;flex:none}
.logo img{height:auto}
.logo__d{display:none}
[data-theme="dark"] .logo__l{display:none}
[data-theme="dark"] .logo__d,.logo__d.is-only{display:block}
.i-moon{display:none}
[data-theme="dark"] .i-sun{display:none}
[data-theme="dark"] .i-moon{display:block}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 20px;border:1px solid transparent;border-radius:var(--pill);background:var(--btn);color:#fff;font:600 15px/1 var(--font);cursor:pointer;white-space:nowrap;transition:background-color .18s ease-out,transform .18s ease-out}
.btn:hover{background:var(--teal-hover)}
.btn:active{transform:scale(.98)}
.btn--ghost{background:transparent;color:var(--ink);border-color:var(--line);box-shadow:inset 0 0 0 1px var(--line)}
.btn--ghost:hover{background:var(--mint)}
.iconbtn{display:inline-grid;place-items:center;width:44px;height:44px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--ink);cursor:pointer;transition:background-color .18s ease-out}
.iconbtn:hover{background:var(--mint)}
.eyebrow{margin:0 0 14px;font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.demo{max-width:720px;margin:0 auto;padding:64px 24px 40px}
.demo h1{margin:0 0 12px;color:var(--ink);font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-.02em}
.demo p{margin:0 0 16px}
.demo--tall{min-height:130vh}
[data-frame] .demo{display:none}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
}
`;

// ---- tiny JS snippets (progressive enhancement; pages work without them) -----
export const BOOT = `(()=>{try{const t=new URLSearchParams(location.search).get('theme');const d=document.documentElement;d.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(new URLSearchParams(location.search).has('frame'))d.dataset.frame='';}catch(e){}})();`;

export const JS_THEME = `
document.querySelectorAll('[data-theme-toggle]').forEach(function(b){
  b.setAttribute('aria-pressed',document.documentElement.dataset.theme==='dark');
  b.addEventListener('click',function(){
    var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';
    d.dataset.theme=n;b.setAttribute('aria-pressed',n==='dark');
  });
});`;

// burger toggles .is-open on the root; Esc closes and returns focus to the burger
export const jsMenu = (rootSel) => `
(function(){
  var root=document.querySelector('${rootSel}'),btn=root&&root.querySelector('[data-menu-btn]');
  if(!btn)return;
  function set(o){root.classList.toggle('is-open',o);btn.setAttribute('aria-expanded',o);}
  btn.addEventListener('click',function(){set(!root.classList.contains('is-open'));});
  root.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('is-open')){set(false);btn.focus();}});
})();`;

export const jsScrolled = (rootSel, at = 8) => `
(function(){
  var r=document.querySelector('${rootSel}');
  function f(){r.toggleAttribute('data-scrolled',scrollY>${at});}
  addEventListener('scroll',f,{passive:true});f();
})();`;

export const burger = (controls, label = 'Open menu') =>
  `<button type="button" class="burger iconbtn" data-menu-btn aria-expanded="false" aria-controls="${controls}" aria-label="${label}">${ic('menu', 20, 'i-open')}${ic('close', 20, 'i-close')}</button>`;
export const BURGER_CSS = `
.burger .i-close{display:none}
.is-open .burger .i-open{display:none}
.is-open .burger .i-close{display:block}`;
