const grid = document.getElementById('grid');
const counts = document.getElementById('counts');
const search = document.getElementById('search');
const themeSel = document.getElementById('themeSel');
let manifest = null;
let filter = 'all';

async function load() {
  try { manifest = await (await fetch('./manifest.json')).json(); } catch { manifest = null; }
  const headerIds = manifest?.headers.map(h => h.id) ?? Array.from({ length: 100 }, (_, i) => `H${String(i + 1).padStart(3, '0')}`);
  const footerIds = manifest?.footers.map(f => f.id) ?? Array.from({ length: 100 }, (_, i) => `F${String(i + 1).padStart(3, '0')}`);
  const familyOf = new Map([...(manifest?.headers ?? []), ...(manifest?.footers ?? [])].map(e => [e.id, e.family]));
  const axesOf = new Map([...(manifest?.headers ?? []), ...(manifest?.footers ?? [])].map(e => [e.id, e.axes]));
  const all = [...headerIds.map(id => ({ id, kind: 'header' })), ...footerIds.map(id => ({ id, kind: 'footer' }))];

  function render() {
    const q = (search?.value || '').trim().toLowerCase();
    const theme = themeSel?.value || 'light';
    document.documentElement.dataset.theme = theme;
    const wanted = all.filter(({ id, kind }) => {
      if (filter === 'header' && kind !== 'header') return false;
      if (filter === 'footer' && kind !== 'footer') return false;
      if (filter === 'dark' && theme !== 'dark') return false;
      if (!q) return true;
      const fam = (familyOf.get(id) || '').toLowerCase();
      const axes = JSON.stringify(axesOf.get(id) || '').toLowerCase();
      return id.toLowerCase().includes(q) || fam.includes(q) || axes.includes(q);
    });
    grid.innerHTML = '';
    for (const { id, kind } of wanted) {
      const card = document.createElement('article');
      card.className = 'card';
      const axes = axesOf.get(id) || {};
      card.innerHTML = `<header><b>${id}</b><span class="meta">${familyOf.get(id) || kind}</span>
        <a class="open" href="../${kind}s/${id}/index.html?theme=${theme}" target="_blank" rel="noopener">open ↗</a></header>
        <p class="axes">${Object.entries(axes).map(([k, v]) => `${k.replace(/^A\d_/, '')}: ${v}`).join(' · ')}</p>
        <iframe loading="lazy" title="${id}" class="${kind === 'footer' ? 'tall' : ''}" src="../${kind}s/${id}/index.html?theme=${theme}"></iframe>`;
      grid.append(card);
    }
    counts.textContent = `${wanted.length} shown · headers ${headerIds.length}/100 · footers ${footerIds.length}/100 · theme ${theme}`;
  }

  document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); filter = btn.dataset.f; render();
  }));
  search?.addEventListener('input', render);
  themeSel?.addEventListener('change', render);
  render();
}
load();
