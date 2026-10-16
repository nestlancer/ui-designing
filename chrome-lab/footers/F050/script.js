/* F050 — Mesh / gradient footer · signature motion m-26 (Proof-stat count-up) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F050"]');
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
  if (!reduced) {
    const n=root.querySelector('[data-count]');if(n){const target=+n.dataset.count;new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();const tick=now=>{const p=Math.min(1,(now-t0)/1200);const v=Math.floor((1-Math.pow(1-p,3))*target);n.textContent='₹'+v.toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}),{threshold:.4}).observe(n);}
  }
})();