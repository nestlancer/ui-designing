/* chrome-motion.js — one runtime for m-01…m-36, data-attribute opt-in */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  // m-01 / m-03 : glass + shrink at threshold
  addEventListener('scroll', () => {
    const y = scrollY;
    document.querySelectorAll('[data-motion*="m-01"],[data-motion*="m-03"]').forEach(el=>{
      const thr = el.dataset.threshold ? parseInt(el.dataset.threshold,10) : (el.dataset.motion.includes('m-01')?24:8);
      el.dataset.scrolled = String(y > thr);
    });
    // m-13 progress
    document.querySelectorAll('[data-progress]').forEach(bar=>{
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max>0 ? scrollY/max : 0;
      bar.style.transform = `scaleX(${p})`;
    });
  }, {passive:true});

  // m-02 hide-down/show-up
  let lastY = 0;
  addEventListener('scroll', () => {
    const cur = scrollY;
    const down = cur > lastY;
    document.querySelectorAll('[data-motion*="m-02"]').forEach(el=>{
      if (cur > 120) el.classList.toggle('is-hidden', down);
      else el.classList.remove('is-hidden');
    });
    lastY = cur;
  }, {passive:true});

  // global: pause when hidden
  document.addEventListener('visibilitychange', () => {
    document.querySelectorAll('[data-motion]').forEach(el=>{
      el.style.animationPlayState = document.hidden ? 'paused' : '';
    });
  });
})();
