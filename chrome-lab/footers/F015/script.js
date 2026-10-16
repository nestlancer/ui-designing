/* F015 — Newsletter-lead · signature motion m-24 (Locale / currency switcher slide) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F015"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  const io = new IntersectionObserver(es => es.forEach(e => root.classList.toggle('is-visible', e.intersectionRatio > 0.02 || e.boundingClientRect.top < innerHeight)), { threshold: [0, 0.02, 1] });
  io.observe(root);
  addEventListener('scroll', () => root.classList.toggle('is-visible', (scrollY + innerHeight) > document.documentElement.scrollHeight - innerHeight * 2), { passive: true });
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
    /* m-24 locale / currency switcher slide — injected into the legal row if absent */
      let locale = root.querySelector('.foot__locale');
      if (!locale) {
        const row = root.querySelector('.legalLinks') || root.querySelector('.foot__legal');
        locale = document.createElement('div');
        locale.className = 'foot__locale';
        locale.innerHTML = '<button class="localeBtn" type="button" aria-expanded="false" aria-controls="loc-F015">INR ₹ · EN-IN <span aria-hidden="true">▾</span></button><ul class="listbox" id="loc-F015" hidden><li><button type="button">INR ₹ · India</button></li><li><button type="button">USD $ · Global</button></li><li><button type="button">EUR € · Europe</button></li></ul>';
        row && row.prepend(locale);
      }
      const lb2 = locale.querySelector('.localeBtn'), box2 = locale.querySelector('.listbox');
      lb2 && lb2.addEventListener('click', () => { const open = box2.hidden; box2.hidden = !open; lb2.setAttribute('aria-expanded', String(open)); });
      box2 && box2.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb2.textContent = b.textContent + ' ▾'; box2.hidden = true; lb2.setAttribute('aria-expanded', 'false'); });
  }
})();