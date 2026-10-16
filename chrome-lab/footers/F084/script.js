/* F084 — Curtain reveal on overscroll · signature motion m-20 (Footer curtain (content reveals it)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F084"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    /* m-20 curtain: host page content scrolls over a pinned footer (see BASE rule) */
  }
})();