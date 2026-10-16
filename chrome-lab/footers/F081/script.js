/* F081 — Curtain reveal on overscroll · signature motion m-28 (Link hover text roll-up (dual layer)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F081"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  const io = new IntersectionObserver(es => es.forEach(e => root.classList.toggle('is-visible', e.intersectionRatio > 0.02 || e.boundingClientRect.top < innerHeight)), { threshold: [0, 0.02, 1] });
  io.observe(root);
  addEventListener('scroll', () => root.classList.toggle('is-visible', (scrollY + innerHeight) > document.documentElement.scrollHeight - innerHeight * 2), { passive: true });
  /* collapsible columns — aria-expanded + Esc closes */
  root.querySelectorAll('.foot__col.is-collapsible').forEach(col => {
    const head = col.querySelector('.foot__colHead');
    head && head.addEventListener('click', () => {
      const open = col.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(open));
    });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') root.querySelectorAll('.foot__col.is-open').forEach(c => { c.classList.remove('is-open'); c.querySelector('.foot__colHead')?.setAttribute('aria-expanded', 'false'); }); });
  if (!reduced) {
    root.querySelectorAll('a[data-roll]').forEach(a=>{const t=a.textContent.trim();a.innerHTML='<span>'+t+'</span><span>'+t+'</span>';});root.querySelectorAll('.roll').forEach(r=>r.setAttribute('tabindex','0'));
  }
})();