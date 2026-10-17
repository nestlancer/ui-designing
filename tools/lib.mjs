// Shared library for the pair generator — tokens, icons, logo, snippets.
// Everything here is emitted into each standalone file exactly once, so the
// generated pairs read like hand-written cousins of example-header.html.

export const TOKENS = `:root{
  --bg:#f9fbfc; --surface:#ffffff; --surface-2:#f4f8f9; --tint:#edf4f6; --mint:#eef7f5;
  --mesh-1:#d8e8e9; --mesh-2:#daeaeb;
  --ink:#0a2543; --ink-2:#123a5e; --body:#4a5c6e; --muted:#5f7080; --line:#e3ebe9;
  --teal:#24877f; --teal-hover:#1c6f68; --teal-soft:#d9ece9; --glow:#3fb8ab; --live:#22a06b;
  --btn:#1f7a73;                 /* CTA fill: measured teal nudged so white 15px/600 text passes AA */
  --band:#0a2543; --band-text:#e8eef4; --band-body:#b9c6d0; --band-line:rgba(255,255,255,.12);
  --shadow:0 8px 28px rgba(10,37,67,.10);
  --pill:999px; --card:14px; --chip:8px;
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
}
[data-theme="dark"]{            /* derived, never invented */
  --bg:#0b1720; --surface:#0f1e29; --surface-2:#12242f; --tint:#102530; --mint:#10272a;
  --mesh-1:#12303a; --mesh-2:#0f2a33;
  --ink:#e8eef4; --ink-2:#d3dde6; --body:#b9c6d0; --muted:#8aa0b3; --line:rgba(255,255,255,.08);
  --teal:#2fa59b; --teal-hover:#3fb8ab; --teal-soft:#14343a;
  --band:#06111a; --shadow:0 8px 28px rgba(0,0,0,.45);
}`;

export const BASE = `*,*::before,*::after{box-sizing:border-box}
body{margin:0;font:400 16px/1.55 var(--font);color:var(--body);background:var(--bg)}
img{max-width:100%;height:auto;display:block}
a{color:inherit}
ul{margin:0;padding:0;list-style:none}
:where(a,button,input,summary,[tabindex]):focus-visible{outline:2px solid var(--teal);outline-offset:2px;border-radius:4px}
.container{width:100%;max-width:1200px;margin-inline:auto;padding-inline:20px}
@media(min-width:1024px){.container{padding-inline:32px}}
/* Buttons — the shared CTA vocabulary; pairs restyle shape, never hue */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:12px 22px;
  border:0;border-radius:var(--pill);font:600 15px/1 var(--font);text-decoration:none;cursor:pointer;
  transition:background-color .18s ease-out,color .18s ease-out,border-color .18s ease-out,transform .18s ease-out}
.btn--primary{background:var(--btn);color:#fff}
.btn--primary:hover{background:var(--teal-hover)}
.btn--ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
.btn--ghost:hover{border-color:var(--muted)}
/* Mono eyebrow — the 11px uppercase label from the brand screenshots */
.eyebrow{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
/* Theme swap for the logo: two <img> siblings, CSS decides which shows */
.brand img{height:32px;width:auto}
.brand__dark{display:none}
[data-theme="dark"] .brand__light{display:none}
[data-theme="dark"] .brand__dark{display:inline-block}
.skip-link{position:absolute;left:16px;top:-64px;z-index:200;background:var(--surface);color:var(--ink);
  padding:10px 16px;border-radius:10px;border:1px solid var(--line);box-shadow:var(--shadow);
  font:600 14px/1 var(--font);text-decoration:none;transition:top .12s ease-out}
.skip-link:focus-visible{top:12px}`;

// Runs before first paint: ?theme=dark|light wins, else OS preference.
export const THEME_JS = `<script>
(function(){try{var p=new URLSearchParams(location.search).get('theme');
if(p!=='dark'&&p!=='light')p=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
document.documentElement.setAttribute('data-theme',p);}catch(e){}})();
</script>`;

// ?frame=1 removes the sample content so the gallery can show chrome only.
export const FRAME_JS = `<script>
if(new URLSearchParams(location.search).has('frame'))
  document.documentElement.classList.add('is-framed');
</script>`;
export const FRAME_CSS = `.is-framed .sample,.is-framed .page-note,.is-framed .spacer{display:none}`;

// ---- inline SVG icon set — 24×24, one stroke weight, aria-hidden ----
const P = {
  sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"/>',
  moon:'<path d="M20 13.2A8.1 8.1 0 0 1 10.8 4 8.1 8.1 0 1 0 20 13.2Z"/>',
  menu:'<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11"/>',
  close:'<path d="m5.5 5.5 13 13M18.5 5.5l-13 13"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  'arrow-right':'<path d="M4 12h15.2M13.6 5.6 20 12l-6.4 6.4"/>',
  'chevron-down':'<path d="m6 9.5 6 6 6-6"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5s1.3-6.1 3.9-8.5Z"/>',
  check:'<path d="m4.5 12.5 5 5L19.5 7"/>',
  external:'<path d="M14 4h6v6M20 4l-9 9M18 13.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h5.5"/>',
  linkedin:'<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V17M8 7.6v.1M12 17v-3.8c0-1.3.9-2.2 2.1-2.2 1.3 0 2 .9 2 2.2V17"/>',
  github:'<path d="M9.5 20.2c-4 1.1-4-2-5.7-2.5m12.7 4.1v-3.2c0-.9.3-1.6.8-2.1-2.8-.3-5.7-1.4-5.7-6a4.6 4.6 0 0 1 1.3-3.2 4.3 4.3 0 0 1 .1-3.1s1-.3 3.4 1.3a11.7 11.7 0 0 1 6 0C24.8 4 25.8 4.3 25.8 4.3a4.3 4.3 0 0 1 .1 3.1 4.6 4.6 0 0 1 1.3 3.2c0 4.6-2.9 5.7-5.7 6 .5.5.8 1.3.8 2.4v3.4" transform="translate(-3.5 -1.5)"/>',
  x:'<path d="M5 4.5h3.5L19 19.5h-3.5L5 4.5Z"/><path d="M18.5 4.5 12.7 11M11.5 12.9 5.5 19.5"/>',
  home:'<path d="m4 11 8-7 8 7M6 9.5V20h12V9.5"/>',
  layers:'<path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5ZM4.5 12.5 12 16.5l7.5-4M4.5 16.5 12 20.5l7.5-4"/>',
  pen:'<path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5ZM12.5 7.5l4 4"/>',
  tag:'<path d="m3.5 12 8.5 8.5 8.5-8.5L12 3.5H5a1.5 1.5 0 0 0-1.5 1.5V12Z"/><circle cx="8.5" cy="8.5" r="1.4"/>',
  send:'<path d="M21 3.5 10.5 14M21 3.5 14 21l-3.5-7L3 10.5 21 3.5Z"/>',
  shield:'<path d="M12 3 5 5.8v5.4c0 4.4 3 7.7 7 9.3 4-1.6 7-4.9 7-9.3V5.8L12 3Z"/><path d="m9 11.6 2.2 2.2L15.5 9"/>',
  rupee:'<path d="M7 4.5h10M7 8.5h10M15.5 4.5c0 4-3.4 4.5-6.5 4.5l7 10.5"/>',
  command:'<path d="M9 9h6v6H9zM9 9H7a2 2 0 1 1 2-2v2Zm6 0h2a2 2 0 1 0-2-2v2Zm0 6h2a2 2 0 1 1-2 2v-2Zm-6 0H7a2 2 0 1 0 2 2v-2Z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  status:'<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.4 2.4 4.8-5"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/>',
  doc:'<path d="M6 3.5h8l4 4V20.5H6zM14 3.5V8h4"/>',
  spark:'<path d="M12 3.5 13.8 10 20 12l-6.2 2L12 20.5 10.2 14 4 12l6.2-2L12 3.5Z"/>'
};
export const icon = (name, cls='') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name]}</svg>`;

// ---- logo markup: real files by relative path, both themes preloaded ----
export const logoFull = (depth=2, h=32) => {
  const w = Math.round(h*1973/544);
  const pre = '../'.repeat(depth)+'assets/';
  return `<img class="brand__light" src="${pre}logo-full-light.svg" alt="Nestlancer" width="${w}" height="${h}">
<img class="brand__dark" src="${pre}logo-full-dark.svg" alt="" width="${w}" height="${h}" aria-hidden="true">`;
};
export const logoMark = (depth=2, s=32) => {
  const pre = '../'.repeat(depth)+'assets/';
  return `<img class="brand__light" src="${pre}logo-mark-light.svg" alt="Nestlancer" width="${s}" height="${s}">
<img class="brand__dark" src="${pre}logo-mark-dark.svg" alt="" width="${s}" height="${s}" aria-hidden="true">`;
};
export const brand = (cls='brand', depth=2, mark=false, h=32) =>
  `<a class="${cls}" href="/" aria-label="Nestlancer — home">${mark?logoMark(depth,h):logoFull(depth,h)}</a>`;

// ---- locked copy (§4.4) ----
export const NAV = ['Product','Portfolio','Blog','About','Pricing','Services','Contact'];
export const ROUTE = h => '/'+h.toLowerCase().replace(/\s.*/,'');
export const navList = (current='Product') =>
  `<ul class="nav__list">${NAV.map(n=>`<li><a class="nav__link" href="${ROUTE(n)}"${n===current?' aria-current="page"':''}>${n}</a></li>`).join('')}</ul>`;

// ---- reusable JS snippets (kept ≤ ~40 lines per half) ----
export const js = {
  // disclosure pattern: aria-expanded + Esc returns focus (used by menus, drawers, accordions)
  disclosure: `<script>
function disclosure(btn,panel,{closeOnEsc=true,overlay=null}={}){
  const set=o=>{btn.setAttribute('aria-expanded',o);panel.hidden=!o;document.documentElement.classList.toggle('is-locked',o&&!!overlay)};
  set(false);
  btn.addEventListener('click',()=>set(btn.getAttribute('aria-expanded')!=='true'));
  if(closeOnEsc)document.addEventListener('keydown',e=>{ // Esc closes from anywhere, focus returns to the trigger
    if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus()}});
  if(overlay)overlay.addEventListener('click',()=>set(false));
  return set;
}
</script>`,
  // scroll flag: adds .is-scrolled after 8px for sticky chrome states
  scroll: `<script>
(function(){const d=document.documentElement;
addEventListener('scroll',()=>d.classList.toggle('is-scrolled',scrollY>8),{passive:true})})();
</script>`,
  // announcement dismiss with localStorage persistence
  dismiss: `<script>
(function(){const bar=document.getElementById('announce'),x=bar.querySelector('.announce__close'),KEY='nl-announce';
if(localStorage.getItem(KEY))bar.remove();
x.addEventListener('click',()=>{bar.style.setProperty('--h',bar.offsetHeight+'px');bar.classList.add('is-closed');
  localStorage.setItem(KEY,'1');setTimeout(()=>bar.remove(),240)})})();
</script>`,
  // IntersectionObserver reveal (footer/section entrances)
  reveal: `<script>
(function(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el))})();
</script>`,
  // count-up for tabular figures
  countUp: `<script>
(function(){const fmt=n=>n.toLocaleString('en-IN');
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count,red=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(red){el.textContent=fmt(end);return}
  new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();
    const t0=performance.now();
    (function step(t){const p=Math.min((t-t0)/1100,1),e=1-Math.pow(1-p,3);
      el.textContent=fmt(Math.round(end*e));if(p<1)requestAnimationFrame(step)})(t0);
  }).observe(el)})})();
</script>`,
  // reading progress line
  progress: `<script>
(function(){const bar=document.querySelector('.progress__fill');
addEventListener('scroll',()=>{const d=document.documentElement,p=d.scrollTop/(d.scrollHeight-d.clientHeight);
  bar.style.transform='scaleX('+p+')'},{passive:true})})();
</script>`,
  // segmented thumb: moves a shared thumb under the active segment
  segmented: `<script>
(function(){const seg=document.querySelector('.segmented');if(!seg)return;
const thumb=seg.querySelector('.segmented__thumb'),links=[...seg.querySelectorAll('a')];
const move=el=>{thumb.style.width=el.offsetWidth+'px';thumb.style.transform='translateX('+el.offsetLeft+'px)'};
links.forEach(a=>a.addEventListener('pointerenter',()=>move(a)));
seg.addEventListener('pointerleave',()=>move(seg.querySelector('[aria-current]')));
move(seg.querySelector('[aria-current]'))})();
</script>`,
  // segmented variant used by the footer proof rows (class .seg-row)
  segRow: `<script>
(function(){document.querySelectorAll('.seg-row').forEach(seg=>{
const thumb=seg.querySelector('.seg-row__thumb'),cells=[...seg.querySelectorAll('span')].filter(s=>!s.classList.contains('seg-row__thumb'));
if(!thumb||!cells.length)return;
const move=el=>{thumb.style.width=el.offsetWidth+'px';thumb.style.transform='translateX('+el.offsetLeft+'px)'};
cells.forEach(c=>c.addEventListener('pointerenter',()=>move(c)));
seg.addEventListener('pointerleave',()=>move(seg.querySelector('.on')));
move(seg.querySelector('.on'))})})();
</script>`,
  // palette (⌘K) — trap focus, restore focus
  palette: `<script>
(function(){
const pal=document.getElementById('palette'),openBtn=document.getElementById('paletteOpen'),scrim=document.getElementById('scrim');
let last=null;
const items=()=>[...pal.querySelectorAll('a,button')];
function show(){last=document.activeElement;
  pal.hidden=false;pal.classList.add('is-open');if(scrim){scrim.hidden=false;scrim.classList.add('is-on')}
  openBtn.setAttribute('aria-expanded','true');
  (pal.querySelector('input')||items()[0]).focus()}
function hide(){pal.hidden=true;pal.classList.remove('is-open');
  if(scrim){scrim.classList.remove('is-on');scrim.hidden=true}
  openBtn.setAttribute('aria-expanded','false');
  (last&&last!==document.body?last:openBtn).focus()}
openBtn.addEventListener('click',()=>pal.hidden?show():hide());
pal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))hide()});
if(scrim)scrim.addEventListener('click',hide);
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.hidden?show():hide()}
  if(e.key==='Escape'&&!pal.hidden)hide();
  if(e.key==='Tab'&&!pal.hidden){const f=items(),first=f[0],lastEl=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastEl.focus()}
    else if(!e.shiftKey&&document.activeElement===lastEl){e.preventDefault();first.focus()}}
  });
})();
</script>`,
  // ticker duplication for a seamless marquee (reduced-motion handled in CSS)
  ticker: `<script>
const t=document.querySelector('.ticker__track');if(t){t.innerHTML+=t.innerHTML;
  const red=matchMedia('(prefers-reduced-motion: reduce)').matches;if(red)t.style.animation='none'}
</script>`,
  // theme toggle (header icon button)
  theme: `<script>
document.getElementById('themeToggle').addEventListener('click',()=>{
  const r=document.documentElement,next=r.getAttribute('data-theme')==='dark'?'light':'dark';
  r.setAttribute('data-theme',next)});
</script>`
};
