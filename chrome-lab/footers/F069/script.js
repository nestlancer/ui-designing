/* F069 — Locale + currency switcher · signature motion m-21 (Oversized wordmark scale-on-scroll) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F069"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
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
    const wm=root.querySelector('.wordmark');if(wm){addEventListener('scroll',()=>{wm.style.transform='scale('+(1-Math.min(scrollY,600)/600*0.12)+')';},{passive:true});}
  }
})();