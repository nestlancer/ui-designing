
/* H026 — Auto-hide on scroll-down · signature motion m-07 (Mega-panel reveal + child stagger) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="H026"]');
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
    const t = 120;
    root.dataset.scrolled = String(y > t);
  };
  addEventListener('scroll', scrolledClass, { passive: true }); scrolledClass();
  let last = 0; addEventListener('scroll', () => { const y = scrollY, down = y > last; root.classList.toggle('is-hidden', down && y > 140); if (!down) root.classList.remove('is-hidden'); last = y; }, { passive: true });
  /* theme toggle — m-12 pattern, View Transitions when available */
  const toggle = root.querySelector('.themeToggle');
  toggle && toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => { document.documentElement.dataset.theme = next; root.dataset.theme = next; toggle.setAttribute('aria-pressed', String(next === 'dark')); };
    if (document.startViewTransition && !reduced) document.startViewTransition(apply); else apply();
  });
  /* mobile disclosure — every variant has a deliberate mobile panel; Esc closes, focus returns */
  const burger = root.querySelector('.burger');
  const panel = root.querySelector('.drawer');
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
  
  
  /* mobile accordion groups + bottom-bar "More" trigger the same panel */
  root.querySelectorAll('.mAcc__group').forEach(g => {
    const head = g.querySelector('.mAcc__head');
    head && head.addEventListener('click', () => { const open = g.classList.toggle('is-open'); head.setAttribute('aria-expanded', String(open)); });
  });
  const more = root.querySelector('.bottomBar__more');
  more && more.addEventListener('click', () => openMenu(panel.hidden));
  if (!reduced) {
    root.querySelectorAll('.mega > div').forEach((c,i)=>c.style.setProperty('--i',i));root.querySelectorAll('.has-mega > .nav__link').forEach(btn=>{let t;const p=btn.parentElement;btn.addEventListener('click',e=>{e.preventDefault();const open=p.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});btn.addEventListener('pointerenter',()=>{t=setTimeout(()=>{p.classList.add('open');btn.setAttribute('aria-expanded','true');},120);});btn.addEventListener('pointerleave',()=>clearTimeout(t));});root.addEventListener('keydown',e=>{if(e.key==='Escape'){root.querySelectorAll('.has-mega.open').forEach(p=>{p.classList.remove('open');p.querySelector('.nav__link')?.setAttribute('aria-expanded','false');});}});
  }
})();