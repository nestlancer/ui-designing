/* 25 header family emitters. Each returns { html, css, js, baseCss } for ONE variant.
   CSS uses %%S%% (scope prefix) and %%K%% (keyframe prefix) placeholders — the
   generator strips comments BEFORE substituting (G13 glued-selector rule).
   Only rules for classes present in the emitted HTML are included (§5.8). */
import { COPY, wordmark, icon, themeToggle, burger, cta, navList, navListWithDropdown, statusPill, eyebrow, tickerRow, searchBox } from './atoms.mjs';

const K = (name) => `%%K%%${name}`;

/* ---------- shared module snippets (emitted only when their classes are used) ---------- */
const wmCSS = () => `
%%S%%.wm{ display:inline-flex; align-items:center; gap:9px; text-decoration:none; flex:none; }
%%S%%.wm__txt{ font:700 21px/1 var(--n-font-display); color:var(--n-ink); letter-spacing:-.01em; }
%%S%%.wm__dot{ color:var(--n-teal); }
%%S%%.wm__g{ flex:none; }`;

const navCSS = () => `
%%S%%.nav{ display:flex; align-items:center; min-width:0; }
%%S%%.nav__list{ display:flex; align-items:center; gap:2px; list-style:none; margin:0; padding:0; }
%%S%%.nav__item{ position:relative; }
%%S%%.nav__link{
  display:inline-flex; align-items:center; gap:5px;
  padding:9px 12px; border-radius:8px; border:0; background:none; cursor:pointer;
  font:500 14px/1 var(--n-font-sans); color:var(--n-body); text-decoration:none;
  transition:color .15s ease-out, background-color .15s ease-out;
}
%%S%%.nav__link:hover{ color:var(--n-ink); background:var(--n-mint); }
%%S%%.nav__link.is-current{ color:var(--n-ink); }`;

const ctaCSS = (kind) => `
%%S%%.cta{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  min-height:40px; padding:0 18px; border-radius:var(--n-radius-pill);
  font:600 14px/1 var(--n-font-sans); text-decoration:none; cursor:pointer; border:1px solid transparent;
  background:var(--n-teal); color:var(--n-white); white-space:nowrap;
  transition:background-color .16s ease-out, transform .16s ease-out, color .16s ease-out, border-color .16s ease-out, box-shadow .16s ease-out;
}
%%S%%.cta:hover{ background:var(--n-teal-hover); }
%%S%%.cta:active{ transform:scale(.98); }
%%S%%.cta--outline{ background:transparent; color:var(--n-ink); border-color:var(--n-hairline); }
%%S%%.cta--outline:hover{ background:var(--n-mint); border-color:var(--n-teal); }
%%S%%.cta--ghosttext{ background:none; color:var(--n-ink); padding:0 8px; min-height:36px; }
%%S%%.cta--ghosttext:hover{ background:none; color:var(--n-teal); }
%%S%%.cta--split svg{ transition:transform .16s ease-out; }
%%S%%.cta--split:hover svg{ transform:translateX(3px); }
%%S%%.cta--dual{ background:transparent; color:var(--n-ink); border-color:var(--n-hairline); }
%%S%%.cta--dual-b{ background:var(--n-teal); color:var(--n-white); border-color:transparent; }
%%S%%.cta--dual-b:hover{ background:var(--n-teal-hover); }
%%S%%.cta--grad{
  background:linear-gradient(120deg, var(--n-teal) 0%, var(--n-teal-glow) 100%);
  box-shadow:inset 0 0 0 1px color-mix(in oklab, var(--n-teal-glow) 60%, transparent);
}
%%S%%.cta--grad:hover{ filter:brightness(1.05); background:linear-gradient(120deg, var(--n-teal) 0%, var(--n-teal-glow) 100%); }
%%S%%.cta--icon{ width:40px; min-height:40px; padding:0; }
%%S%%.cta--sticky{ background:var(--n-teal); }`;

const thCSS = () => `
%%S%%.th{
  display:inline-flex; align-items:center; justify-content:center;
  width:40px; height:40px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:transparent; color:var(--n-ink); cursor:pointer;
  transition:background-color .15s ease-out, border-color .15s ease-out;
}
%%S%%.th:hover{ background:var(--n-mint); border-color:var(--n-teal); }`;

const burgerCSS = () => `
%%S%%.burger{
  display:none; flex-direction:column; justify-content:center; gap:5px;
  width:44px; height:44px; padding:0 11px; border-radius:10px;
  border:1px solid var(--n-hairline); background:transparent; cursor:pointer;
}
%%S%%.burger__b{ display:block; height:2px; width:100%; background:var(--n-ink); border-radius:2px; transition:transform .24s cubic-bezier(.2,.8,.2,1), opacity .2s; }
%%S%%.burger[aria-expanded="true"] .burger__b:nth-child(1){ transform:translateY(7px) rotate(45deg); }
%%S%%.burger[aria-expanded="true"] .burger__b:nth-child(2){ opacity:0; }
%%S%%.burger[aria-expanded="true"] .burger__b:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }`;

const drawerCSS = () => `
%%S%%.scrim{
  position:fixed; inset:0; background:rgba(10,37,67,.4); opacity:0; pointer-events:none;
  transition:opacity .2s ease-out; z-index:40;
}
%%S%%.scrim[data-open="true"]{ opacity:1; pointer-events:auto; }
%%S%%.drawer{
  position:fixed; top:0; right:0; bottom:0; width:min(320px, 86vw); z-index:50;
  background:var(--n-surface); border-left:1px solid var(--n-hairline);
  transform:translateX(100%); transition:transform .3s ease-out;
  padding:20px 18px; overflow:auto;
  display:flex; flex-direction:column; gap:6px;
}
%%S%%.drawer[data-open="true"]{ transform:none; }
%%S%%.drawer__h{ margin:6px 0 10px; }
%%S%%.drawer a{
  display:block; padding:12px 10px; border-radius:10px;
  font:500 15px/1.2 var(--n-font-sans); color:var(--n-ink); text-decoration:none;
}
%%S%%.drawer a:hover{ background:var(--n-mint); }`;

const overlayCSS = () => `
%%S%%.overlay{
  position:fixed; inset:0; z-index:60; background:var(--n-ink);
  display:flex; flex-direction:column; justify-content:center; padding:8vh 8vw;
  clip-path:inset(0 0 100% 0); transition:clip-path .48s cubic-bezier(.76,0,.24,1);
}
%%S%%.overlay[data-open="true"]{ clip-path:inset(0 0 0 0); }
%%S%%.overlay__list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; }
%%S%%.overlay__list a{
  font:600 clamp(28px, 5vw, 44px)/1.15 var(--n-font-display); color:var(--n-on-ink);
  text-decoration:none; display:inline-block; padding:6px 0;
  transition:color .15s ease-out, transform .15s ease-out;
}
%%S%%.overlay__list a:hover{ color:var(--n-teal-glow); transform:translateX(8px); }
%%S%%.overlay__foot{ margin-top:5vh; display:flex; gap:12px; flex-wrap:wrap; }`;

const searchCSS = () => `
%%S%%.search{
  display:flex; align-items:center; gap:10px; flex:1; min-width:0;
  height:46px; padding:0 16px; border-radius:var(--n-radius-pill);
  background:var(--n-surface-2); border:1px solid var(--n-hairline);
  transition:border-color .15s ease-out, box-shadow .15s ease-out;
}
%%S%%.search:focus-within{ border-color:var(--n-teal); box-shadow:0 0 0 3px var(--n-teal-soft); }
%%S%%.search__i{ color:var(--n-muted); display:flex; }
%%S%%.search__in{
  flex:1; min-width:0; border:0; background:none; outline:none;
  font:400 15px/1 var(--n-font-sans); color:var(--n-ink);
}
%%S%%.search__in::placeholder{ color:var(--n-muted); }`;

const utilCSS = () => `
%%S%%.h-util{
  display:flex; align-items:center; gap:14px;
  height:32px; padding:0 24px;
  font:500 11px/1 var(--n-font-mono); letter-spacing:.08em; text-transform:uppercase;
}
%%S%%.h-util .u-list{ display:flex; gap:14px; list-style:none; margin:0; padding:0; }
%%S%%.h-util a{ color:inherit; text-decoration:none; opacity:.85; }
%%S%%.h-util a:hover{ opacity:1; }
%%S%%.h-util__sp{ margin-left:auto; }`;

const pillCSS = () => `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px;
  padding:6px 12px; border-radius:var(--n-radius-pill);
  background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}`;

const tickerCSS = () => `
%%S%%.ticker{ overflow:hidden; border-bottom:1px solid var(--n-hairline); background:transparent; }
%%S%%.ticker__row{
  display:flex; gap:18px; align-items:center; width:max-content;
  padding:10px 0;
  animation:${K('marq')} 28s linear infinite;
}
%%S%%.ticker:hover .ticker__row{ animation-play-state:paused; }
%%S%%.ticker__t{ font:500 11px/1 var(--n-font-mono); letter-spacing:.14em; color:var(--n-muted); white-space:nowrap; }
%%S%%.ticker__sep{ color:var(--n-teal); }
@keyframes ${K('marq')}{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }`;

const progressCSS = () => `
%%S%%.progress{
  position:absolute; left:0; right:0; bottom:-1px; height:2px; overflow:hidden;
}
%%S%%.progress__bar{
  height:100%; background:var(--n-teal);
  transform:scaleX(var(--scroll-p, 0)); transform-origin:left center;
}`;

const chipsCSS = () => `
%%S%%.h-chips{
  display:flex; gap:8px; align-items:center; overflow-x:auto; scrollbar-width:none;
  padding:10px 0 12px;
}
%%S%%.h-chips::-webkit-scrollbar{ display:none; }
%%S%%.chip{
  flex:none; display:inline-flex; align-items:center; gap:6px;
  padding:8px 13px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:transparent;
  font:500 12px/1 var(--n-font-sans); color:var(--n-body); text-decoration:none;
  transition:background-color .24s cubic-bezier(.2,.8,.2,1), color .24s, border-color .24s, transform .24s;
}
%%S%%.chip:hover, %%S%%.chip.is-on{ background:var(--n-teal-soft); border-color:var(--n-teal); color:var(--n-ink); }
%%S%%.chip.is-on{ transform:translateY(-1px); }`;

const ddCSS = () => `
%%S%%.dd{
  position:absolute; top:calc(100% + 10px); left:0; z-index:30;
  min-width:270px; padding:16px; border-radius:var(--n-radius-card);
  background:var(--n-surface); border:1px solid var(--n-hairline);
  box-shadow:0 18px 48px rgba(10,37,67,.14);
  display:flex; gap:18px;
  opacity:0; transform:translateY(6px); pointer-events:none;
  transition:opacity .26s cubic-bezier(.2,.8,.2,1), transform .26s cubic-bezier(.2,.8,.2,1);
}
%%S%%.dd[data-open="true"]{ opacity:1; transform:none; pointer-events:auto; }
%%S%%.dd__col{ display:flex; flex-direction:column; gap:2px; min-width:110px; }
%%S%%.dd__col a{ padding:7px 8px; border-radius:8px; font:500 13px/1.2 var(--n-font-sans); color:var(--n-body); text-decoration:none; }
%%S%%.dd__col a:hover{ background:var(--n-mint); color:var(--n-ink); }
%%S%%.dd__tile{ width:150px; padding:12px; border-radius:10px; background:var(--n-mint); }
%%S%%.dd__tile-t{ margin:8px 0 0; font:600 13px/1.35 var(--n-font-sans); color:var(--n-ink); }`;

const megaCSS = (v) => `
%%S%%.mega{
  position:absolute; top:calc(100% + 8px); left:0; right:0; z-index:30;
  padding:26px 28px; border-radius:var(--n-radius-card);
  background:var(--n-surface); border:1px solid var(--n-hairline);
  box-shadow:0 24px 64px rgba(10,37,67,.16);
  display:grid; grid-template-columns:repeat(${v.opts.megaCols || 3}, minmax(0,1fr))${v.opts.tile ? ' 220px' : ''}; gap:26px;
  opacity:0; transform:translateY(8px); pointer-events:none;
  transition:opacity .26s cubic-bezier(.2,.8,.2,1), transform .26s cubic-bezier(.2,.8,.2,1);
}
%%S%%.mega[data-open="true"]{ opacity:1; transform:none; pointer-events:auto; }
%%S%%.mega__col{ display:flex; flex-direction:column; gap:3px; animation:${K('mrise')} .26s both; }
%%S%%.mega__col:nth-child(2){ animation-delay:35ms; }
%%S%%.mega__col:nth-child(3){ animation-delay:70ms; }
%%S%%.mega__col:nth-child(4){ animation-delay:105ms; }
%%S%%.mega__col a{ padding:8px 10px; margin:0 -10px; border-radius:8px; font:500 13px/1.3 var(--n-font-sans); color:var(--n-body); text-decoration:none; }
%%S%%.mega__col a:hover{ background:var(--n-mint); color:var(--n-ink); }
%%S%%.mega__tile{ padding:18px; border-radius:12px; background:linear-gradient(150deg, var(--n-mint), var(--n-teal-soft)); }
%%S%%.mega__tile h4{ margin:10px 0 6px; font:700 17px/1.25 var(--n-font-display); color:var(--n-ink); }
%%S%%.mega__tile p{ margin:0; font:400 12px/1.5 var(--n-font-sans); color:var(--n-body); }
@keyframes ${K('mrise')}{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:none; } }`;

const paletteCSS = () => `
%%S%%.palette{
  position:fixed; inset:0; z-index:70; display:flex; justify-content:center;
  background:rgba(10,37,67,.5); opacity:0; pointer-events:none;
  transition:opacity .18s ease-out;
}
%%S%%.palette[data-open="true"]{ opacity:1; pointer-events:auto; }
%%S%%.palette__\boxed{
  margin-top:12vh; width:min(560px, 92vw); height:max-content;
  background:var(--n-surface); border-radius:var(--n-radius-card);
  border:1px solid var(--n-hairline); box-shadow:0 30px 80px rgba(10,37,67,.3);
  transform:scale(.98); transition:transform .18s cubic-bezier(.2,.8,.2,1);
  overflow:hidden;
}
%%S%%.palette[data-open="true"] .palette__\boxed{ transform:scale(1); }
%%S%%.palette__in{
  display:flex; gap:10px; align-items:center; padding:16px 18px;
  border-bottom:1px solid var(--n-hairline);
}
%%S%%.palette__in input{
  flex:1; border:0; background:none; outline:none;
  font:400 16px/1 var(--n-font-sans); color:var(--n-ink);
}
%%S%%.palette__list{ list-style:none; margin:0; padding:8px; }
%%S%%.palette__list a{
  display:flex; justify-content:space-between; gap:12px;
  padding:11px 12px; border-radius:9px;
  font:500 14px/1 var(--n-font-sans); color:var(--n-ink); text-decoration:none;
}
%%S%%.palette__list a:hover{ background:var(--n-mint); }
%%S%%.palette__list kbd{
  font:500 11px/1 var(--n-font-mono); color:var(--n-muted);
  border:1px solid var(--n-hairline); border-radius:5px; padding:3px 6px;
}
%%S%%.palette__trigger{
  display:inline-flex; align-items:center; gap:10px;
  min-height:40px; padding:0 14px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:var(--n-surface-2);
  font:500 13px/1 var(--n-font-sans); color:var(--n-body); cursor:pointer;
}
%%S%%.palette__trigger kbd{
  font:500 11px/1 var(--n-font-mono); color:var(--n-muted);
  border:1px solid var(--n-hairline); border-radius:5px; padding:3px 6px;
}
%%S%%.palette__trigger:hover{ border-color:var(--n-teal); color:var(--n-ink); }`;

const segCSS = () => `
%%S%%.seg{
  position:relative; display:inline-flex; align-items:center; gap:2px;
  padding:4px; border-radius:var(--n-radius-pill);
  background:var(--n-surface-2); border:1px solid var(--n-hairline);
}
%%S%%.seg__thumb{
  position:absolute; top:4px; bottom:4px; left:0; border-radius:var(--n-radius-pill);
  background:var(--n-surface); box-shadow:0 2px 8px rgba(10,37,67,.12);
  transition:transform .24s cubic-bezier(.2,.8,.2,1), width .24s cubic-bezier(.2,.8,.2,1);
}
%%S%%.seg button, %%S%%.seg a{
  position:relative; z-index:1; border:0; background:none; cursor:pointer; text-decoration:none;
  padding:9px 16px; border-radius:var(--n-radius-pill);
  font:600 13px/1 var(--n-font-sans); color:var(--n-body);
}
%%S%%.seg [aria-selected="true"], %%S%%.seg .is-on{ color:var(--n-ink); }`;

const stepsCSS = () => `
%%S%%.steps{ display:flex; align-items:center; gap:0; list-style:none; margin:0; padding:8px 0 12px; }
%%S%%.step{ display:flex; align-items:center; gap:9px; font:500 12px/1 var(--n-font-mono); color:var(--n-muted); letter-spacing:.06em; text-transform:uppercase; }
%%S%%.step::after{
  content:''; width:44px; height:1px; background:var(--n-hairline); margin:0 14px;
}
%%S%%.step:last-child::after{ display:none; }
%%S%%.step__d{
  width:22px; height:22px; border-radius:50%; flex:none;
  border:1.5px solid var(--n-hairline); display:inline-flex; align-items:center; justify-content:center;
  font:600 10px/1 var(--n-font-mono);
}
%%S%%.step.is-on .step__d{ background:var(--n-teal); border-color:var(--n-teal); color:var(--n-white); }
%%S%%.step.is-on{ color:var(--n-ink); }`;

const tabsCSS = () => `
%%S%%.tabs{ position:relative; display:flex; gap:4px; padding:0 0 2px; }
%%S%%.tabs__a{
  padding:10px 14px; text-decoration:none;
  font:500 13px/1 var(--n-font-sans); color:var(--n-body); border-radius:8px 8px 0 0;
}
%%S%%.tabs__a:hover{ color:var(--n-ink); background:var(--n-mint); }
%%S%%.tabs__a[aria-current]{ color:var(--n-ink); }
%%S%%.tabs__ink{
  position:absolute; bottom:0; left:0; height:2px; background:var(--n-teal);
  transition:transform .22s cubic-bezier(.2,.8,.2,1), width .22s cubic-bezier(.2,.8,.2,1);
}`;

const crumbCSS = () => `
%%S%%.crumb{
  display:flex; gap:8px; align-items:center; overflow-x:auto; scrollbar-width:none;
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase; color:var(--n-muted);
}
%%S%%.crumb a{ color:inherit; text-decoration:none; white-space:nowrap; }
%%S%%.crumb a:hover{ color:var(--n-teal); }
%%S%%.crumb__sep{ opacity:.5; }`;

const railCSS = () => `
%%S%%.h-rail{
  position:fixed; left:0; top:0; bottom:0; width:64px; z-index:35;
  display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px 0;
  background:var(--n-ink); border-right:1px solid rgba(255,255,255,.08);
}
%%S%%.h-rail a{
  display:inline-flex; align-items:center; justify-content:center;
  width:44px; height:44px; border-radius:12px; color:var(--n-on-ink-2); text-decoration:none;
  transition:background-color .15s ease-out, color .15s ease-out;
}
%%S%%.h-rail a:hover, %%S%%.h-rail a.is-on{ background:rgba(255,255,255,.1); color:var(--n-white); }
%%S%%.h-rail__sp{ margin-top:auto; }`;

const announceCSS = () => `
%%S%%.announce{
  display:flex; align-items:center; gap:12px; justify-content:center;
  padding:9px 16px; font:500 12px/1.3 var(--n-font-sans);
  overflow:hidden; max-height:60px;
  transition:opacity .22s ease-out, max-height .22s ease-out, padding .22s ease-out;
}
%%S%%.announce[data-dismissed="true"]{ opacity:0; max-height:0; padding:0 16px; }
%%S%%.announce__x{
  border:0; background:none; cursor:pointer; color:inherit;
  font:600 12px/1 var(--n-font-mono); padding:6px 8px; border-radius:6px;
}
%%S%%.announce__x:hover{ background:rgba(255,255,255,.12); }`;

const bigWmCSS = () => `
%%S%%.wm__txt{ font-size:26px; }
%%S%%.h-bar[data-big] .wm__txt{ font-size:30px; letter-spacing:-.02em; }`;

const sectionLabelCSS = () => `
%%S%%.section-label{
  font:500 11px/1 var(--n-font-mono); letter-spacing:.12em; text-transform:uppercase;
  color:var(--n-muted); display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
}`;

/* mobile module (G13 rule 5: one flex row ≤900px, burger AFTER actions, ≤360px fit) */
function mobileCSS(kind, v) {
  const S = '%%S%%';
  const common900 = `
${S}.h-in{ display:flex; flex-wrap:nowrap; }
${S}.burger{ display:inline-flex; order:3; }
${S}.nav{ order:2; min-width:0; }
${S}.actions{ order:3; }`;
  const hide600 = `
${S}.th{ display:none; }
${S}.cta--ghosttext, ${S}.cta--outline{ padding:0 10px; }
${S}.wm__txt{ font-size:18px; }`;
  const strategies = {
    'burger-drawer': `${common900}
${S}.nav__list{ display:none; }
${S}.actions .cta--ghosttext{ display:none; }`,
    'burger-overlay': `${common900}
${S}.nav__list{ display:none; }`,
    'accordion-drawer': `${common900}
${S}.nav__list, ${S}.mega{ display:none; }`,
    'wrap-links': `${common900}
${S}.nav__list{ overflow-x:auto; scrollbar-width:none; flex-wrap:nowrap; }
${S}.nav__link{ padding:8px 9px; font-size:13px; white-space:nowrap; }
${S}.burger{ display:none; }`,
    'collapse-utility': `${common900}
${S}.h-util{ display:none; }
${S}.nav__list{ display:none; }`,
    'chip-scroll': `${common900}
${S}.nav__list{ display:none; }
${S}.h-chips{ padding-bottom:8px; }`,
    'search-expand': `${common900}
${S}.nav__list{ display:none; }
${S}.search{ height:42px; padding:0 12px; }
${S}.search__in{ font-size:14px; }`,
    'steps-scroll': `${common900}
${S}.nav__list{ display:none; }
${S}.step::after{ width:18px; margin:0 8px; }`,
    'segmented-scroll': `${common900}
${S}.nav__list{ display:none; }
${S}.seg{ overflow-x:auto; max-width:100%; }`,
    'bottom-bar': `${common900}
${S}.nav__list{ display:none; }
${S}.h-tabs{ display:flex; }`,
    'stack-cols': `
${S}.f-grid, ${S}.f-news, ${S}.f-app, ${S}.f-grid--mega, ${S}.f-grid--top, ${S}.f-grid--compact, ${S}.f-news__cols, ${S}.f-app__cols{ grid-template-columns:1fr; }
${S}.f-main{ padding-top:32px; }
${S}.legal{ flex-direction:column; align-items:flex-start; gap:6px; }`,
    'accordion-cols': `
${S}.f-grid, ${S}.f-news, ${S}.f-app, ${S}.f-grid--mega, ${S}.f-grid--top, ${S}.f-grid--acc{ grid-template-columns:1fr; }
${S}.f-brand{ margin-bottom:8px; }
${S}.facc__btn{ padding:12px 0; }`,
    'sticky-cta': `
${S}.f-grid, ${S}.f-grid--compact{ grid-template-columns:1fr 1fr; }
${S}.f-sticky{ position:sticky; bottom:0; }`,
  };
  return `
@media (max-width: 900px){
  ${strategies[kind] || strategies['burger-drawer']}
}
@media (max-width: 600px){
  ${hide600}
}`;
}

function baseCss(id, kind, v) {
  if (kind === 'bottom-bar' || v.mobile === 'bottom-bar') {
    return `@media (max-width: 900px){ body:has([data-chrome="${id}"]){ padding-bottom: 84px; } }`;
  }
  return '';
}

/* bar shell helper */
function bar(v, inner, opts = {}) {
  const cls = opts.big ? 'h-bar h-bar--big' : 'h-bar';
  return `<div class="${cls}"${opts.big ? ' data-big' : ''}><div class="h-in">${inner}</div></div>`;
}
function actions(v, extra = '') {
  return `<div class="actions">${extra}${themeToggle()}${cta(v.A6)}${burger('nav-' + 'ID')}</div>`;
}
function hChrome(id, v, inner, opts = {}) {
  return `<header role="banner" class="h-chrome" data-chrome="${id}" data-theme="dark" data-motion="${v.A4}"${opts.style ? ` data-style="${opts.style}"` : ''}>
${inner}
</header>`;
}

/* ============================ FAMILY EMITTERS ============================ */
export const HEADER_EMITTERS = {
  1(v, id) { /* Classic centred/split nav */
    const navId = `nav-${id}`;
    const inner = bar(v, `${wordmark()}
    <nav class="nav nav--center" aria-label="Primary">${navList()}</nav>
    <div class="actions">${statusPill()}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`);
    return {
      html: hChrome(id, v, inner),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), pillCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:18px;
}
%%S%%.nav--center{ justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; justify-content:flex-end; }`,
        v.opts.progress ? progressCSS() : ''].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  2(v, id) { /* Logo-left inline */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav nav--hug" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:64px; display:flex; align-items:center; gap:14px;
}
%%S%%.nav--hug .nav__link{ padding:8px 10px; }
%%S%%.actions{ margin-left:auto; display:flex; align-items:center; gap:10px; }`],
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  3(v, id) { /* Two-tier utility + main */
    const navId = `nav-${id}`;
    const util = v.opts.util === 'announce'
      ? `<ul class="u-list"><li>Free milestone escrow · Razorpay</li></ul><span class="h-util__sp"></span><a href="/terms">Terms</a><a href="/privacy">Privacy</a>`
      : v.opts.util === 'currency'
        ? `<ul class="u-list"><li>INR ₹ · en-IN</li><li>USD secondary</li></ul><span class="h-util__sp"></span><a href="/portal">${COPY.portalLive}</a>`
        : v.opts.util === 'progress'
          ? `<ul class="u-list"><li>Reading · Pricing guide</li></ul><span class="h-util__sp"></span><a href="/blog">Blog</a>`
          : `<ul class="u-list"><li>${COPY.intake}</li><li>Reply under 2m</li></ul><span class="h-util__sp"></span><a href="/login">${COPY.signIn}</a>`;
    return {
      html: hChrome(id, v, `<div class="h-util"><span class="nl-dot" aria-hidden="true"></span>${util}</div>` +
        bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), utilCSS(), v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  4(v, id) { /* Mega-menu panel */
    const navId = `nav-${id}`;
    const megaId = `mega-${id}`;
    const cols = [
      ['PRODUCT', 'Project Hub|/portal', 'Pricing|/pricing', 'Services|/services'],
      ['WORK', 'Portfolio|/portfolio', 'Case studies|/portfolio', 'Blog|/blog'],
      ['COMPANY', 'About|/about', 'Contact|/contact', 'Start a project|/contact'],
      ['LEGAL', 'Terms|/terms', 'Privacy|/privacy', 'Verify|/verify'],
    ].slice(0, v.opts.megaCols || 3);
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav nav--mega" aria-label="Primary">
      <ul class="nav__list">
        <li class="nav__item"><button type="button" class="nav__link is-current" data-intent aria-expanded="false" aria-controls="${megaId}">Product ${icon('chevron')}</button>
          <div class="mega" id="${megaId}" data-open="false">
            ${cols.map(([h, ...links]) => `<div class="mega__col"><p class="nl-eyebrow">${h}</p>${links.map(l => { const [t, r] = l.split('|'); return `<a href="${r}">${t}</a>`; }).join('')}</div>`).join('')}
            ${v.opts.tile ? `<div class="mega__tile"><p class="nl-eyebrow">${COPY.figPortal}</p><h4>${COPY.portalLive}</h4><p>Milestone escrow with live payment history.</p></div>` : ''}
          </div></li>
        ${COPY.nav.slice(1).map(n => `<li class="nav__item"><a class="nav__link" href="${COPY.navRoutes[n]}">${n}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), megaCSS(v), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`],
      js: ['JS_DISCLOSE', 'JS_HOVERINTENT', 'JS_THEME', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  5(v, id) { /* Floating glass pill */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${statusPill(COPY.portalLive)}${themeToggle()}<a class="cta${v.A6 === 'gradient-edge' ? ' cta--grad' : ''}${v.A6 === 'icon-only' ? ' cta--icon' : ''}" href="/contact" ${v.opts.magnet ? 'data-magnet' : ''} ${v.opts.spotlight ? '' : ''}>${v.A6 === 'icon-only' ? icon('arrow') : COPY.startCta}</a>${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`, { })),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), pillCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:14px 24px;
  min-height:64px; display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
${v.opts.spotlight ? `%%S%%.h-bar{
  background-image:radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklab, var(--n-teal-glow) 14%, transparent), transparent 70%);
  background-color:color-mix(in oklab, var(--n-surface) 72%, transparent);
}` : ''}`],
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.magnet ? ['JS_MAGNET'] : []), ...(v.opts.spotlight ? ['JS_SPOTLIGHT'] : []), 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  6(v, id) { /* Sticky shrink */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.badge ? `<span class="pill"><span class="nl-dot"></span>2 new</span>` : ''}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), v.opts.badge ? pillCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:sticky; top:0; transition:box-shadow .2s ease-out; }
%%S%%.h-in{
  --h:72px;
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--h); display:flex; align-items:center; gap:18px;
  transition:min-height .2s cubic-bezier(.2,.8,.2,1);
}
%%S%%.wm{ transform-origin:left center; transition:transform .2s cubic-bezier(.2,.8,.2,1); }
%%S%%.h-chrome[data-scrolled="true"] .h-in{ min-height:${v.opts.shrinkTo || 56}px; }
%%S%%.h-chrome[data-scrolled="true"] .wm{ transform:scale(.92); }
%%S%%.h-chrome[data-scrolled="true"] .h-bar{ box-shadow:0 8px 24px rgba(10,37,67,.08); }
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  7(v, id) { /* Auto-hide */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:sticky; top:0; transition:transform .32s ease-out; }
%%S%%.h-chrome[data-hide="true"] .h-bar{ transform:translateY(-100%); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:64px; display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_SCROLL', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  8(v, id) { /* Transparent-over-hero → solid */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark({ big: v.opts.bigWm })}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.rotate ? `<span class="pill"><span class="nl-dot"></span><span data-rotate="${COPY.intake}|${COPY.portalLive}|Reply under 2m">${COPY.intake}</span></span>` : statusPill()}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`, { big: v.opts.bigWm })),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), pillCSS(), v.opts.bigWm ? bigWmCSS() : '', `
%%S%%.h-chrome{ position:absolute; left:0; right:0; z-index:30; }
%%S%%.h-bar{
  background:transparent; border-bottom-color:transparent;
  transition:background-color .3s ease, border-color .3s ease, box-shadow .3s ease;
}
%%S%%.h-chrome[data-solid="true"] .h-bar{
  background:var(--n-surface); border-bottom-color:var(--n-hairline);
  box-shadow:0 8px 24px rgba(10,37,67,.08);
}
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.pill [data-flip="true"]{ opacity:0; transition:opacity .2s; }
%%S%%.pill [data-flip="false"]{ opacity:1; transition:opacity .2s; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_SCROLL', ...(v.opts.rotate ? ['JS_ROTATE'] : []), ...(v.opts.magnet ? ['JS_MAGNET'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  9(v, id) { /* Fullscreen overlay nav */
    const ovId = `ov-${id}`;
    return {
      html: hChrome(id, v, `<div class="h-util"><span class="nl-dot" aria-hidden="true"></span><ul class="u-list"><li>Studio index · Hyderabad</li></ul><span class="h-util__sp"></span><a href="/login">${COPY.signIn}</a></div>` + bar(v, `${wordmark()}
    <div class="actions">${statusPill()}${themeToggle()}<a class="cta${v.A6 === 'icon-only' ? ' cta--icon' : ''}" href="/contact">${v.A6 === 'icon-only' ? icon('arrow') : COPY.startCta}</a>${burger(ovId)}</div>`)
        + `<nav class="overlay" id="${ovId}" data-open="false" aria-label="Full menu">
    <p class="nl-eyebrow" style="color:var(--n-on-ink-3)">MENU</p>
    <ul class="overlay__list">${COPY.nav.map(n => `<li><a href="${COPY.navRoutes[n]}">${n}</a></li>`).join('')}</ul>
    <div class="overlay__foot"><a class="cta" href="/contact">${COPY.startCta}</a><a class="cta cta--outline" href="/login" style="color:var(--n-on-ink);border-color:rgba(255,255,255,.2)">${COPY.signIn}</a></div>
  </nav>`),
      css: [wmCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), overlayCSS(), pillCSS(), utilCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.actions{ margin-left:auto; display:flex; align-items:center; gap:10px; }`],
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.spotlight ? ['JS_SPOTLIGHT'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  10(v, id) { /* Side drawer nav */
    const drId = `dr-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.locale ? `<span class="pill">${icon('globe')} INR</span>` : ''}${themeToggle()}${cta(v.A6)}${burger(drId)}</div>`)
        + `<div class="scrim" id="sc-${id}" data-open="false"></div>
  <nav class="drawer" id="${drId}" data-open="false" aria-label="Menu">
    <p class="nl-eyebrow drawer__h">MENU</p>
    ${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}
    ${v.opts.nested ? `<p class="nl-eyebrow drawer__h">MORE</p><a href="/portal">Project Hub</a><a href="/verify">Verify document</a>` : ''}
  </nav>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), v.opts.locale ? pillCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  11(v, id) { /* Bottom-docked mobile bar */
    const tabs = [
      ['home', 'Home', '/'], ['grid', 'Work', '/portfolio'], ['folder', 'Hub', '/portal'],
      ['doc', 'Blog', '/blog'], ['user', 'Account', '/login'],
    ].slice(0, v.opts.tabs || 5);
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}`)
        + `<nav class="h-tabs" aria-label="App tabs">
    ${tabs.map(([ic, t, r], i) => `<a class="htab${i === 0 ? ' is-on' : ''}" href="${r}">${icon(ic)}<span class="htab__t">${t}</span></a>`).join('')}
  </nav>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:60px; display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.h-tabs{
  display:none; position:fixed; left:0; right:0; bottom:0; z-index:40;
  background:var(--n-surface); border-top:1px solid var(--n-hairline);
  padding:8px 8px calc(8px + env(safe-area-inset-bottom));
}
%%S%%.htab{
  flex:1; display:flex; flex-direction:column; align-items:center; gap:4px;
  min-height:52px; padding:8px 4px; border-radius:12px; text-decoration:none;
  color:var(--n-body); font:500 11px/1 var(--n-font-sans);
}
%%S%%.htab.is-on{ color:var(--n-teal); background:var(--n-mint); }
%%S%%.htab__t{ letter-spacing:.02em; }`],
      js: ['JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: 'bottom-bar',
    };
  },

  12(v, id) { /* Split-identity switcher */
    const navId = `nav-${id}`;
    const segs = (v.opts.seg || 'Client|Freelancer').split('|');
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <div class="seg" data-seg role="tablist" aria-label="Audience">
      <span class="seg__thumb" aria-hidden="true"></span>
      ${segs.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}">${s}</button>`).join('')}
    </div>
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.rotate ? `<span class="pill"><span data-rotate="Fixed-price quotes|Live Project Hub|Milestone escrow">Fixed-price quotes</span></span>` : ''}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), segCSS(), v.opts.rotate ? pillCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:16px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.pill [data-flip="true"]{ opacity:0; transition:opacity .2s; }
%%S%%.pill [data-flip="false"]{ opacity:1; transition:opacity .2s; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_SEG', 'JS_THEME', ...(v.opts.rotate ? ['JS_ROTATE'] : []), 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  13(v, id) { /* Marketplace category rail */
    const navId = `nav-${id}`;
    const cats = COPY.ticker.slice(0, 6);
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${searchBox('search search--sm')}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)
        + `<div class="h-chips" role="navigation" aria-label="Categories">
    ${cats.map((c, i) => `<a class="chip${i === 0 ? ' is-on' : ''}" href="/services">${c}</a>`).join('')}
    ${v.opts.marquee ? `<a class="chip" href="/services">+ 12 more</a>` : ''}
  </div>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), chipsCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:64px; display:flex; align-items:center; gap:14px;
}
%%S%%.nav{ flex:1; justify-content:center; min-width:0; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.search--sm{ flex:none; width:200px; height:40px; }
%%S%%.h-chips{ max-width:var(--n-container); margin:0 auto; padding-left:24px; padding-right:24px; }`],
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  14(v, id) { /* Search-forward */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    ${searchBox('search')}
    <div class="actions">${v.opts.intents ? '' : statusPill()}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)
        + (v.opts.intents ? `<div class="h-chips" aria-label="Search intents">
    ${['Projects', 'Talent', 'Milestones', 'Payments', 'Docs'].map((t, i) => `<button class="chip${i === 0 ? ' is-on' : ''}" type="button">${t}</button>`).join('')}
  </div>` : '')),
      css: [wmCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), searchCSS(), v.opts.intents ? chipsCSS() : '', v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:10px 24px;
  min-height:76px; display:flex; align-items:center; gap:14px;
}
%%S%%.search{ max-width:560px; }
%%S%%.actions{ margin-left:auto; display:flex; align-items:center; gap:10px; }
%%S%%.h-chips{ max-width:var(--n-container); margin:0 auto; padding-left:24px; padding-right:24px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  15(v, id) { /* Command palette */
    const palId = `pal-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">
      <button type="button" class="palette__trigger" data-palette-trigger aria-haspopup="dialog">${icon('search')} Search… <kbd>⌘K</kbd></button>
      ${themeToggle()}${cta(v.A6)}
    </div>`)
        + `<div class="palette" id="${palId}" data-palette data-open="false" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="palette__\boxed">
      <div class="palette__in">${icon('search')}<input type="search" placeholder="Search Nestlancer, jump to…" aria-label="Command"/></div>
      <ul class="palette__list">
        ${COPY.nav.slice(0, 5).map((n, i) => `<li><a href="${COPY.navRoutes[n]}">${n}<kbd>${i < 4 ? '⌘' + (i + 1) : '↵'}</kbd></a></li>`).join('')}
      </ul>
    </div>
  </div>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), paletteCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`],
      js: ['JS_PALETTE', 'JS_THEME', 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  16(v, id) { /* Auth / app minimal */
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <div class="actions">
      ${v.opts.status ? statusPill(COPY.intake) : ''}
      ${v.opts.rotate ? `<span class="authhint" data-rotate="Need help?|Reply under 2m|Client portal · live">Need help?</span>` : ''}
      ${v.opts.badge ? `<span class="badge" aria-label="1 notification">1</span>` : ''}
      ${themeToggle()}
      <a class="cta cta--icon cta--outline" href="/login" aria-label="${COPY.signIn}">${icon('user')}</a>
    </div>`)),
      css: [wmCSS(), ctaCSS(v.A6), thCSS(), v.opts.status ? pillCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:64px; display:flex; align-items:center; gap:14px;
}
%%S%%.actions{ margin-left:auto; display:flex; align-items:center; gap:12px; }
%%S%%.authhint{ font:500 12px/1 var(--n-font-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--n-muted); }
%%S%%.authhint[data-flip="true"]{ opacity:0; transition:opacity .2s; }
%%S%%.authhint[data-flip="false"]{ opacity:1; transition:opacity .2s; }
%%S%%.badge{
  display:inline-flex; align-items:center; justify-content:center;
  min-width:20px; height:20px; padding:0 6px; border-radius:var(--n-radius-pill);
  background:var(--n-teal); color:var(--n-white); font:600 11px/1 var(--n-font-mono);
  animation:${K('pop')} .3s cubic-bezier(.2,.8,.2,1);
}
@keyframes ${K('pop')}{ from{ transform:scale(.8); opacity:0; } to{ transform:scale(1); opacity:1; } }`].filter(Boolean),
      js: ['JS_THEME', ...(v.opts.rotate ? ['JS_ROTATE'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  17(v, id) { /* Wizard / intake progress */
    const navId = `nav-${id}`;
    const steps = ['Scope', 'Quote', 'Milestone', 'Kickoff', 'Delivery'].slice(0, v.opts.steps || 4);
    return {
      html: hChrome(id, v, `<div class="h-util"><span class="nl-dot" aria-hidden="true"></span><ul class="u-list"><li>${COPY.startCta} · step 2 of ${steps.length}</li></ul><span class="h-util__sp"></span><a href="/contact">Save &amp; exit</a></div>` +
        bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)
        + `<ol class="steps" aria-label="Intake steps">
    ${steps.map((s, i) => `<li class="step${i < 2 ? ' is-on' : ''}"><span class="step__d">${i + 1}</span>${s}</li>`).join('')}
  </ol>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), utilCSS(), stepsCSS(), v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; background:var(--n-surface); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:64px; display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.steps{ max-width:var(--n-container); margin:0 auto; padding:8px 24px 12px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  18(v, id) { /* Announcement bar + nav */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, `<div class="announce" data-announce>
    <span class="nl-dot" aria-hidden="true"></span>
    <span><strong>${COPY.intake}</strong>${v.opts.rotate ? ` — <span data-rotate="Reply under 2m|Fixed-price quotes|Milestone escrow|No subscriptions">Reply under 2m</span>` : ' — Reply under 2m, fixed-price quotes'}</span>
    ${v.opts.count ? `<span class="nl-num">· ₹<span data-count-to="428500">4,28,500</span> paid out</span>` : ''}
    <a href="/contact" style="color:inherit;text-decoration:underline">Start a project</a>
    <button type="button" class="announce__x" data-announce-close aria-label="Dismiss announcement">✕</button>
  </div>` + bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), announceCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.announce{ background:var(--n-ink); color:var(--n-on-ink); }
%%S%%.announce strong{ color:var(--n-white); }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`],
      js: ['JS_DISCLOSE', 'JS_ANNOUNCE', 'JS_THEME', ...(v.opts.rotate ? ['JS_ROTATE'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  19(v, id) { /* Marquee / ticker nav */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark({ big: v.opts.bigWm })}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${statusPill()}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile">${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`, { big: v.opts.bigWm })
        + tickerRow()
        + (v.opts.dual ? `<div class="ticker"><div class="ticker__row" style="animation-direction:reverse">${COPY.portfolio.slice(0, 3).map(t => `<span class="ticker__t">${t}</span><span class="ticker__sep">·</span>`).join('')}${COPY.portfolio.slice(0, 3).map(t => `<span class="ticker__t">${t}</span><span class="ticker__sep">·</span>`).join('')}</div></div>` : '')),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), pillCSS(), tickerCSS(), v.opts.bigWm ? bigWmCSS() : '', v.opts.progress ? progressCSS() : '', v.opts.grain ? `
%%S%%.ticker{
  background-image:radial-gradient(circle at 20% 40%, var(--n-mesh-1) 0, transparent 40%),
    radial-gradient(circle at 80% 60%, var(--n-mesh-2) 0, transparent 45%);
  background-size:220px 160px, 260px 180px;
  animation:${K('grain')} 8s steps(12) infinite;
}
@keyframes ${K('grain')}{ to{ background-position:120px 80px, -100px 60px; } }` : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  20(v, id) { /* Scroll-progress header */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark({ big: v.opts.bigWm })}
    ${v.opts.sectionLabel ? `<span class="section-label"><span class="nl-dot"></span>Now reading · Pricing</span>` : ''}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.ring ? `<span class="ring" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="10" fill="none" stroke="var(--n-hairline)" stroke-width="2"/><circle class="ring__p" cx="13" cy="13" r="10" fill="none" stroke="var(--n-teal)" stroke-width="2" stroke-dasharray="62.8" stroke-dashoffset="62.8"/></svg></span>` : ''}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`, { big: v.opts.bigWm })),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), progressCSS(), v.opts.sectionLabel ? sectionLabelCSS() : '', v.opts.bigWm ? bigWmCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ position:relative; background:var(--n-surface); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:16px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.ring__p{ transition:stroke-dashoffset .1s linear; }
%%S%%.h-chrome .ring__p{ stroke-dashoffset:calc(62.8 - 62.8 * var(--scroll-p, 0)); }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_PROGRESS', 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  21(v, id) { /* Docs / section nav */
    const navId = `nav-${id}`;
    const crumb = (v.opts.crumb || 'Docs / Project Hub / Milestones').split(' / ');
    const tabs = ['Overview', 'Milestones', 'Payments', 'Files'];
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${searchBox('search search--sm')}${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)
        + `<div class="docs-row">
    <nav class="crumb" aria-label="Breadcrumb">${crumb.map((c, i) => `<a href="/${i === 0 ? 'portal' : 'pricing'}">${c}</a>${i < crumb.length - 1 ? '<span class="crumb__sep">/</span>' : ''}`).join('')}</nav>
    <nav class="tabs" data-tabs aria-label="Sections">${tabs.map((t, i) => `<a class="tabs__a" href="/portal"${i === 1 ? ' aria-current="page"' : ''}>${t}</a>`).join('')}<span class="tabs__ink" aria-hidden="true"></span></nav>
  </div>`),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), crumbCSS(), tabsCSS(), searchCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:60px; display:flex; align-items:center; gap:14px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }
%%S%%.search--sm{ flex:none; width:180px; height:40px; }
%%S%%.docs-row{
  background:var(--n-surface-2); border-bottom:1px solid var(--n-hairline);
}
%%S%%.docs-row .crumb, %%S%%.docs-row .tabs{
  max-width:var(--n-container); margin:0 auto; padding-left:24px; padding-right:24px;
}
%%S%%.docs-row .crumb{ padding-top:12px; }
%%S%%.docs-row .tabs{ overflow-x:auto; scrollbar-width:none; }`],
      js: ['JS_DISCLOSE', 'JS_TABS_ANIM', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  22(v, id) { /* Segmented tabs */
    const navId = `nav-${id}`;
    const segs = (v.opts.seg || 'Work|Pricing|About').split('|');
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <div class="seg seg--nav" data-seg role="tablist" aria-label="Sections">
      <span class="seg__thumb" aria-hidden="true"></span>
      ${segs.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}">${s}</button>`).join('')}
    </div>
    <div class="actions">${themeToggle()}${cta(v.A6)}${burger(navId)}</div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), segCSS(), v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.seg--nav{ margin:0 auto; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_SEG', 'JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  23(v, id) { /* Dual-CTA split */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `${wordmark()}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">
      ${v.opts.badge ? `<span class="pill"><span class="nl-dot"></span>${COPY.intake}</span>` : ''}
      ${v.opts.rotate ? `<span class="pill"><span data-rotate="Reply under 2m|Fixed-price quotes|No subscriptions">Reply under 2m</span></span>` : ''}
      ${themeToggle()}
      <div class="dual">${cta('dual-equal')}</div>
      ${burger(navId)}
    </div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">MENU</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`)),
      css: [wmCSS(), navCSS(), ctaCSS('dual-equal'), thCSS(), burgerCSS(), drawerCSS(), (v.opts.badge || v.opts.rotate) ? pillCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:0 24px;
  min-height:var(--n-header-h); display:flex; align-items:center; gap:18px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:12px; }
%%S%%.dual{ display:flex; align-items:center; gap:10px; }
%%S%%.dual .cta{ min-width:120px; }
%%S%%.pill [data-flip="true"]{ opacity:0; transition:opacity .2s; }
%%S%%.pill [data-flip="false"]{ opacity:1; transition:opacity .2s; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', ...(v.opts.magnet ? ['JS_MAGNET'] : []), ...(v.opts.rotate ? ['JS_ROTATE'] : []), 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  24(v, id) { /* Edge icon-rail + slim bar */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, `<nav class="h-rail" aria-label="App rail">
    <a class="is-on" href="/">${icon('home')}<span class="nl-vh">Home</span></a>
    <a href="/portfolio">${icon('grid')}<span class="nl-vh">Work</span></a>
    <a href="/portal">${icon('folder')}<span class="nl-vh">Hub</span></a>
    <a href="/blog">${icon('doc')}<span class="nl-vh">Blog</span></a>
    <a class="h-rail__sp" href="/login">${icon('user')}<span class="nl-vh">Account</span></a>
  </nav>` + bar(v, `${wordmark()}
    ${v.opts.spotlight ? `<span class="section-label"><span class="nl-dot"></span>${COPY.portalLive}</span>` : ''}
    <nav class="nav" aria-label="Primary">${navList()}</nav>
    <div class="actions">${themeToggle()}<a class="cta${v.A6 === 'icon-only' ? ' cta--icon cta--outline' : ''}" href="/contact">${v.A6 === 'icon-only' ? icon('arrow') : COPY.startCta}</a></div>
    ${v.opts.progress ? '<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>' : ''}`)),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), railCSS(), v.opts.spotlight ? sectionLabelCSS() : '', v.opts.progress ? progressCSS() : '', `
%%S%%.h-chrome{ position:relative; z-index:30; padding-left:64px; }
%%S%%.h-bar{ background:var(--n-surface); border-bottom:1px solid var(--n-hairline); }
%%S%%.h-in{
  max-width:calc(var(--n-container) - 64px); margin:0 auto; padding:0 24px;
  min-height:56px; display:flex; align-items:center; gap:16px;
}
%%S%%.nav{ flex:1; justify-content:center; }
%%S%%.actions{ display:flex; align-items:center; gap:10px; }`].filter(Boolean),
      js: ['JS_THEME', ...(v.opts.progress ? ['JS_PROGRESS'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  25(v, id) { /* Editorial typographic */
    const navId = `nav-${id}`;
    return {
      html: hChrome(id, v, bar(v, `<a class="wm wm--big" href="/" aria-label="Nestlancer home">
      <svg class="wm__g" width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><path d="M6 22c4-1 7-4 9-8 1 3 3 5 6 6-3 2-6 3-9 3-2 0-4 0-6-1z" style="fill:var(--n-teal-deep)"/><path d="M15 14c2-4 5-7 9-8-1 4-2 7-5 9-1 1-3 1-4-1z" style="fill:var(--n-ink)"/></svg>
      <span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span>
    </a>
    <nav class="nav nav--index" aria-label="Primary">${navList()}</nav>
    <div class="actions">${v.opts.grain ? '' : statusPill()}${themeToggle()}<a class="cta${v.A6 === 'icon-only' ? ' cta--icon cta--outline' : ''}" href="/contact">${v.A6 === 'icon-only' ? icon('arrow') : 'Enquire'}</a>${burger(navId)}</div>
    <nav class="drawer" id="${navId}" data-open="false" aria-label="Mobile"><p class="nl-eyebrow drawer__h">INDEX</p>${COPY.nav.map(n => `<a href="${COPY.navRoutes[n]}">${n}</a>`).join('')}</nav>`, { big: true })),
      css: [wmCSS(), navCSS(), ctaCSS(v.A6), thCSS(), burgerCSS(), drawerCSS(), v.opts.grain ? '' : pillCSS(), `
%%S%%.h-chrome{ position:relative; z-index:30; }
%%S%%.h-bar{
  background:var(--n-bg);
  box-shadow:inset 0 -1px 0 var(--n-hairline), inset 0 -3px 0 var(--n-bg), inset 0 -4px 0 var(--n-hairline);
}
%%S%%.wm--big .wm__txt{ font-size:32px; letter-spacing:-.02em; }
%%S%%.h-in{
  max-width:var(--n-container); margin:0 auto; padding:14px 24px;
  min-height:88px; display:flex; align-items:center; gap:26px;
}
%%S%%.nav--index{ flex:1; justify-content:flex-end; }
%%S%%.nav--index .nav__link{
  border-radius:0; padding:6px 2px; margin-left:18px;
  font:500 13px/1 var(--n-font-mono); letter-spacing:.08em; text-transform:uppercase;
  border-bottom:1px solid transparent;
}
%%S%%.nav--index .nav__link:hover{ background:none; border-bottom-color:var(--n-teal); }
%%S%%.actions{ display:flex; align-items:center; gap:14px; }`].filter(Boolean),
      js: ['JS_DISCLOSE', 'JS_THEME', 'JS_SCROLL', 'JS_VIS'],
      mobile: v.mobile,
    };
  },
};

export { mobileCSS, baseCss, K };
