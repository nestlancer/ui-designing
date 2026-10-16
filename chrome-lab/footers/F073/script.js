/* F073 — Social-proof wall · signature motion m-19 (Footer reveal with column stagger) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F073"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    const targets = root.querySelectorAll('.foot__col, .foot__brand, .logoCell, .social');
      targets.forEach((t,i)=>{t.style.setProperty('--i',i%6);t.classList.add('rise');});
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
        targets.forEach(t => io.observe(t));
      } else { targets.forEach(t => t.classList.add('in')); }
  }
})();