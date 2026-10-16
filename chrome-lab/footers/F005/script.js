/* F005 — Classic 4-column grid + blurb · signature motion m-21 (Oversized wordmark scale-on-scroll) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F005"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    const wm=root.querySelector('.wordmark');if(wm){addEventListener('scroll',()=>{wm.style.transform='scale('+(1-Math.min(scrollY,600)/600*0.12)+')';},{passive:true});}
  }
})();