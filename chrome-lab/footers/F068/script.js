/* F068 — Locale + currency switcher · signature motion m-28 (Link hover text roll-up (dual layer)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F068"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  const lb = root.querySelector('.localeBtn'); const box = root.querySelector('.listbox');
  lb && lb.addEventListener('click', () => { const open = box.hidden; box.hidden = !open; lb.setAttribute('aria-expanded', String(open)); });
  box && box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb.textContent = b.textContent + ' ▾'; box.hidden = true; lb.setAttribute('aria-expanded', 'false'); });
  document.addEventListener('click', e => { if (box && !root.contains(e.target)) box.hidden = true; });
  if (!reduced) {
    root.querySelectorAll('a[data-roll]').forEach(a=>{const t=a.textContent.trim();a.innerHTML='<span>'+t+'</span><span>'+t+'</span>';});root.querySelectorAll('.roll').forEach(r=>r.setAttribute('tabindex','0'));
  }
})();