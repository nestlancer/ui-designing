/* F034 — Minimal single-row · signature motion m-12 (Theme cross-fade (light to dark)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F034"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    /* m-12 theme cross-fade 300ms via View Transitions */
  }
})();