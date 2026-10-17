// Gallery page: 20 cards, each = header strip over its matching footer strip.
export function gallery(pairs) {
  const cards = pairs.map((p) => {
    const d = `pairs/${p.id}-${p.slug}`;
    return `
    <article class="card" id="${p.id}">
      <header class="card__top">
        <h2><span>${p.id}</span> ${p.name}</h2>
        <p class="card__skin">${p.skin}</p>
      </header>
      <div class="frame frame--h"><iframe title="${p.id} header" loading="lazy" data-src="${d}/header.html" tabindex="-1"></iframe></div>
      <div class="frame frame--f"><iframe title="${p.id} footer" loading="lazy" data-src="${d}/footer.html" tabindex="-1"></iframe></div>
      <p class="card__dna">${p.dna}</p>
      <p class="card__links"><a href="${d}/index.html">Open pair</a><a href="${d}/header.html">header.html</a><a href="${d}/footer.html">footer.html</a></p>
    </article>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Nestlancer — 20 header + footer pairs</title>
<script>(()=>{try{const t=new URLSearchParams(location.search).get('theme');document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(e){}})();</script>
<style>
:root{--bg:#f9fbfc;--surface:#fff;--ink:#0a2543;--body:#4a5c6e;--muted:#5f7080;--line:#e3ebe9;--teal:#24877f;--btn:#1f7a73;--mint:#eef7f5;--font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--mono:ui-monospace,"IBM Plex Mono",Menlo,Consolas,monospace;color-scheme:light}
[data-theme="dark"]{--bg:#0b1720;--surface:#0f1e29;--ink:#e8eef4;--body:#b9c6d0;--muted:#8aa0b3;--line:rgba(255,255,255,.1);--mint:#10272a;color-scheme:dark}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font:400 15px/1.5 var(--font);color:var(--body);background:var(--bg)}
a{color:inherit}
:focus-visible{outline:2px solid var(--teal);outline-offset:2px}
.top{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px;padding:16px 24px;background:var(--surface);border-bottom:1px solid var(--line)}
.top h1{margin:0;font-size:18px;color:var(--ink);letter-spacing:-.01em}
.top p{margin:0;font-size:13px;color:var(--muted)}
.top__sw{margin-left:auto;display:inline-flex;padding:3px;border:1px solid var(--line);border-radius:999px}
.top__sw button{min-height:32px;padding:0 14px;border:0;border-radius:999px;background:none;color:var(--body);font:600 13px/1 var(--font);cursor:pointer}
.top__sw button[aria-pressed="true"]{background:var(--btn);color:#fff}
.grid{display:grid;gap:28px;grid-template-columns:repeat(auto-fill,minmax(min(100%,560px),1fr));max-width:1560px;margin:0 auto;padding:28px 24px 64px}
.card{border:1px solid var(--line);border-radius:14px;background:var(--surface);overflow:hidden}
.card__top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:14px 18px}
.card h2{margin:0;font-size:16px;color:var(--ink)}
.card h2 span{margin-right:6px;font:500 12px/1 var(--mono);letter-spacing:.1em;color:var(--muted)}
.card__skin{margin:0;font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.frame{position:relative;overflow:hidden;border-top:1px solid var(--line);height:calc(var(--fh,200px) * var(--s,.4))}
.frame iframe{position:absolute;left:0;top:0;width:1440px;height:var(--fh,200px);border:0;transform:scale(var(--s,.4));transform-origin:0 0;background:var(--bg)}
.card__dna{margin:0;padding:12px 18px 4px;font-size:13px}
.card__links{display:flex;flex-wrap:wrap;gap:6px 16px;margin:0;padding:6px 18px 16px;font:500 13px/1.4 var(--font)}
.card__links a{color:var(--ink);text-underline-offset:3px}
</style>
</head>
<body>
<div class="top">
  <h1>Nestlancer · 20 header + footer pairs</h1>
  <p>Each card is one pair — header on top, its matching footer below. Open a pair to scroll, resize and use the menus.</p>
  <div class="top__sw" role="group" aria-label="Theme"><button type="button" data-t="light" aria-pressed="true">Light</button><button type="button" data-t="dark" aria-pressed="false">Dark</button></div>
</div>
<main class="grid">${cards}
</main>
<script>
(function(){
  var theme=document.documentElement.dataset.theme,frames=[].slice.call(document.querySelectorAll('iframe'));
  function scale(){frames.forEach(function(f){var w=f.parentNode.clientWidth;f.parentNode.style.setProperty('--s',w/1440);});}
  function src(f){return f.dataset.src+'?frame&theme='+theme;}
  function size(f){try{var h=f.contentDocument.documentElement.scrollHeight;f.parentNode.style.setProperty('--fh',Math.max(h,90)+'px');}catch(e){}}
  frames.forEach(function(f){f.addEventListener('load',function(){size(f);});});
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var f=e.target;if(!f.src||f.dataset.t!==theme){f.dataset.t=theme;f.src=src(f);}io.unobserve(f);}});},{rootMargin:'600px'}):null;
  function load(){frames.forEach(function(f){f.removeAttribute('src');f.dataset.t='';if(io)io.observe(f);else f.src=src(f);});}
  function set(t){theme=t;document.documentElement.dataset.theme=t;document.querySelectorAll('[data-t]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===t);});load();}
  document.querySelectorAll('[data-t]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===theme);b.addEventListener('click',function(){set(b.dataset.t);});});
  addEventListener('resize',scale);scale();load();
})();
</script>
</body>
</html>
`;
}
