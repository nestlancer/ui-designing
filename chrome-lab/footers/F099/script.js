/* F099 — Community & status · signature motion m-22 (Accordion footer columns) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F099"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });
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
    /* m-22 accordion columns: grid-template-rows 0fr to 1fr, 260ms */
  }
})();