/* F020 — CTA banner fused to footer · signature motion m-25 (Live status dot pulse) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F020"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });
  if (!reduced) {
    /* m-25 live status dot pulse 2s ease-in-out infinite */
  }
})();