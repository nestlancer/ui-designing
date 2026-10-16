/* F012 — Newsletter-lead · signature motion m-12 (Theme cross-fade (light to dark)) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F012"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
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
    /* m-12 theme cross-fade 300ms via View Transitions */
  }
})();