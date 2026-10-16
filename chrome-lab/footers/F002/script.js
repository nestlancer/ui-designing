/* F002 — Classic 4-column grid + blurb · signature motion m-16 (Ticker / marquee nav) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F002"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    /* m-16 ticker marquee 28s linear infinite, pause on hover, off under reduced motion */
  }
})();