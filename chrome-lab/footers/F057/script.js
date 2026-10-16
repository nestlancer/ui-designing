/* F057 — Marquee wordmark reveal · signature motion m-27 (Social icon stagger pop) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F057"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  if (!reduced) {
    const pops = root.querySelectorAll('.social, .legalLinks a, .store');
      pops.forEach((p,i)=>p.style.setProperty('--i',i%5));
      if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 }); pops.forEach(p => io.observe(p)); }
      else pops.forEach(p => p.classList.add('in'));
  }
})();