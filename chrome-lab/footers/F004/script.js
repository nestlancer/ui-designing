/* F004 — Classic 4-column grid + blurb · signature motion m-20 (Footer curtain (content reveals it)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F004"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  const io = new IntersectionObserver(es => es.forEach(e => root.classList.toggle('is-visible', e.intersectionRatio > 0.02 || e.boundingClientRect.top < innerHeight)), { threshold: [0, 0.02, 1] });
  io.observe(root);
  addEventListener('scroll', () => root.classList.toggle('is-visible', (scrollY + innerHeight) > document.documentElement.scrollHeight - innerHeight * 2), { passive: true });
  if (!reduced) {
    /* m-20 curtain: host page content scrolls over a pinned footer (see BASE rule) */
  }
})();