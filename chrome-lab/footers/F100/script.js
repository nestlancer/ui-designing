/* F100 — Community & status · signature motion m-26 (Proof-stat count-up) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F100"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    const n=root.querySelector('[data-count]');if(n){const target=+n.dataset.count;new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();const tick=now=>{const p=Math.min(1,(now-t0)/1200);const v=Math.floor((1-Math.pow(1-p,3))*target);n.textContent='₹'+v.toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}),{threshold:.4}).observe(n);}
  }
})();