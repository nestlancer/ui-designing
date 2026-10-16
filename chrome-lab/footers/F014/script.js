/* F014 — Newsletter-lead · signature motion m-22 (Accordion footer columns) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F014"]');
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
  /* newsletter → success morph (m-34 recipe) */
  const form = root.querySelector('.newsForm'); const msg = root.querySelector('.formMsg'); const btn = root.querySelector('.newsBtn');
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input'); const val = (input.value || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) { msg.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    btn.textContent = 'Subscribed ✓'; btn.classList.add('is-done'); msg.textContent = 'Check your inbox — confirmation sent to ' + val + '.';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.classList.remove('is-done'); form.reset(); }, 2600);
  });
  if (!reduced) {
    /* m-22 accordion columns: grid-template-rows 0fr to 1fr, 260ms */
  }
})();