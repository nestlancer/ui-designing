/* F065 — Proof / stat rail · signature motion m-23 (Back-to-top orbit button) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F065"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });
  if (!reduced) {
    const btt=root.querySelector('.btt');if(btt){addEventListener('scroll',()=>{btt.classList.toggle('is-visible',scrollY>innerHeight*0.6);},{passive:true});btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}
  }
})();