/* F066 — Locale + currency switcher · signature motion m-27 (Social icon stagger pop) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F066"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; root.querySelector('.foot__inner')?.style.setProperty('--p', Math.round(p * 100)); }, { passive: true });
  /* collapsible columns — aria-expanded + Esc closes */
  root.querySelectorAll('.foot__col.is-collapsible').forEach(col => {
    const head = col.querySelector('.foot__colHead');
    head && head.addEventListener('click', () => {
      const open = col.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(open));
    });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') root.querySelectorAll('.foot__col.is-open').forEach(c => { c.classList.remove('is-open'); c.querySelector('.foot__colHead')?.setAttribute('aria-expanded', 'false'); }); });
  const lb = root.querySelector('.localeBtn'); const box = root.querySelector('.listbox');
  lb && lb.addEventListener('click', () => { const open = box.hidden; box.hidden = !open; lb.setAttribute('aria-expanded', String(open)); });
  box && box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb.textContent = b.textContent + ' ▾'; box.hidden = true; lb.setAttribute('aria-expanded', 'false'); });
  document.addEventListener('click', e => { if (box && !root.contains(e.target)) box.hidden = true; });
  if (!reduced) {
    const pops = root.querySelectorAll('.social, .legalLinks a, .store');
      pops.forEach((p,i)=>p.style.setProperty('--i',i%5));
      if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 }); pops.forEach(p => io.observe(p)); }
      else pops.forEach(p => p.classList.add('in'));
  }
})();