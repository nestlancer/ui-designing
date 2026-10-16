/* F089 — App / QR download · signature motion m-28 (Link hover text roll-up (dual layer)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F089"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });
  if (!reduced) {
    root.querySelectorAll('a[data-roll]').forEach(a=>{const t=a.textContent.trim();a.innerHTML='<span>'+t+'</span><span>'+t+'</span>';});root.querySelectorAll('.roll').forEach(r=>r.setAttribute('tabindex','0'));
  }
})();