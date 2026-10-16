/* F042 — Dark inverted + teal accents · signature motion m-23 (Back-to-top orbit button) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F042"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; root.querySelector('.foot__inner')?.style.setProperty('--p', Math.round(p * 100)); }, { passive: true });
  if (!reduced) {
    const btt=root.querySelector('.btt');if(btt){addEventListener('scroll',()=>{btt.classList.toggle('is-visible',scrollY>innerHeight*0.6);},{passive:true});btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}
  }
})();