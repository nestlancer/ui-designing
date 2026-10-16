
/* H093 — Edge icon-rail + minimal bar · signature motion m-12 (Theme cross-fade (light to dark)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="H093"]');
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
  addEventListener('scroll', () => { root.classList.toggle('is-released', scrollY > innerHeight * 1.5); }, { passive: true });
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
  
  
  /* segmented control */
  root.querySelectorAll('.segmented').forEach(g => g.addEventListener('click', e => { const btn = e.target.closest('button'); if (!btn) return; g.querySelectorAll('button').forEach(b => { b.setAttribute('aria-selected', 'false'); b.setAttribute('aria-pressed', 'false'); }); btn.setAttribute('aria-selected', 'true'); btn.setAttribute('aria-pressed', 'true'); }));
  /* mobile accordion groups + bottom-bar "More" trigger the same panel */
  root.querySelectorAll('.mAcc__group').forEach(g => {
    const head = g.querySelector('.mAcc__head');
    head && head.addEventListener('click', () => { const open = g.classList.toggle('is-open'); head.setAttribute('aria-expanded', String(open)); });
  });
  const more = root.querySelector('.bottomBar__more');
  
  if (!reduced) {
    /* m-12 theme cross-fade 300ms via View Transitions */
  }
})();