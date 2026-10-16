/* F009 — Oversized wordmark · signature motion m-24 (Locale / currency switcher slide) */
(() => {
  'use strict';
  const root = document.querySelector('[data-chrome="F009"]');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const qTheme = params.get('theme');
  if (qTheme === 'dark' || qTheme === 'light') { document.documentElement.dataset.theme = qTheme; root.dataset.theme = qTheme; }
  addEventListener('scroll', () => { root.dataset.scrolled = String(scrollY > 24); }, { passive: true });
  addEventListener('scroll', () => root.classList.toggle('is-released', scrollY > innerHeight * 1.5), { passive: true });
  if (!reduced) {
    /* m-24 locale / currency switcher slide — injected into the legal row if absent */
      let locale = root.querySelector('.foot__locale');
      if (!locale) {
        const row = root.querySelector('.legalLinks') || root.querySelector('.foot__legal');
        locale = document.createElement('div');
        locale.className = 'foot__locale';
        locale.innerHTML = '<button class="localeBtn" type="button" aria-expanded="false" aria-controls="loc-F009">INR ₹ · EN-IN <span aria-hidden="true">▾</span></button><ul class="listbox" id="loc-F009" hidden><li><button type="button">INR ₹ · India</button></li><li><button type="button">USD $ · Global</button></li><li><button type="button">EUR € · Europe</button></li></ul>';
        row && row.prepend(locale);
      }
      const lb2 = locale.querySelector('.localeBtn'), box2 = locale.querySelector('.listbox');
      lb2 && lb2.addEventListener('click', () => { const open = box2.hidden; box2.hidden = !open; lb2.setAttribute('aria-expanded', String(open)); });
      box2 && box2.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lb2.textContent = b.textContent + ' ▾'; box2.hidden = true; lb2.setAttribute('aria-expanded', 'false'); });
  }
})();