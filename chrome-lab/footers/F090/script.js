/* F090 — App / QR download · signature motion m-31 (Grain / noise drift) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F090"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    const g = document.createElement('span'); g.className = 'grain'; g.setAttribute('aria-hidden','true'); root.prepend(g);
  }
})();