/* Gallery — isolated lazy iframes, filters, theme switch that themes page + frames. */
(function () {
  'use strict';
  var grid = document.getElementById('g-grid');
  var countEl = document.getElementById('g-count');
  var q = document.getElementById('g-search');
  var typeSel = document.getElementById('g-type');
  var skinSel = document.getElementById('g-skin');
  var famSel = document.getElementById('g-family');
  var themeBtn = document.getElementById('g-theme');

  var manifest = [];
  var theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';

  function frameSrc(id, type) {
    var base = type === 'header' ? '../headers/' : '../footers/';
    return base + id + '/index.html?theme=' + theme + '&embed=1';
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    document.querySelectorAll('iframe[data-id]').forEach(function (f) {
      f.src = frameSrc(f.getAttribute('data-id'), f.getAttribute('data-type'));
    });
  }

  themeBtn.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    var u = new URL(location.href);
    u.searchParams.set('theme', theme);
    history.replaceState(null, '', u);
    applyTheme();
  });

  function render() {
    var term = (q.value || '').trim().toLowerCase();
    var type = typeSel.value;
    var skin = skinSel.value;
    var fam = famSel.value;
    var items = manifest.filter(function (m) {
      if (type && m.type !== type) return false;
      if (skin && m.A7_surface_skin !== skin) return false;
      if (fam && String(m.family) !== fam) return false;
      if (term) {
        var hay = (m.id + ' ' + m.family_name + ' ' + m.A7_surface_skin + ' ' + m.signature_motion + ' ' + m.A2_nav).toLowerCase();
        if (hay.indexOf(term) === -1) return false;
      }
      return true;
    });
    countEl.textContent = items.length + ' / ' + manifest.length + ' variants shown · theme: ' + theme;
    grid.textContent = '';
    var frag = document.createDocumentFragment();
    items.forEach(function (m) {
      var card = document.createElement('article');
      card.className = 'g-card';
      card.innerHTML =
        '<div class="g-card__bar">' +
        '<a class="g-card__id" href="' + (m.type === 'header' ? '../headers/' : '../footers/') + m.id + '/index.html" target="_blank" rel="noopener">' + m.id + '</a>' +
        '<span class="g-card__fam">' + m.family_name + '</span>' +
        '<span class="g-chip">' + m.A7_surface_skin + '</span>' +
        '<span class="g-chip g-chip--mot">' + m.signature_motion + '</span>' +
        '</div>';
      var frame = document.createElement('iframe');
      frame.className = 'g-card__frame' + (m.type === 'footer' ? ' tall' : '');
      frame.title = m.id + ' — ' + m.family_name;
      frame.loading = 'lazy';
      frame.setAttribute('data-id', m.id);
      frame.setAttribute('data-type', m.type);
      frame.src = frameSrc(m.id, m.type);
      card.appendChild(frame);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  [q, typeSel, skinSel, famSel].forEach(function (el) {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  fetch('manifest.json').then(function (r) { return r.json(); }).then(function (data) {
    manifest = data;
    var skins = {};
    var fams = {};
    data.forEach(function (m) {
      skins[m.A7_surface_skin] = true;
      fams[m.family] = m.family_name;
    });
    Object.keys(skins).sort().forEach(function (s) {
      var o = document.createElement('option');
      o.value = s; o.textContent = s;
      skinSel.appendChild(o);
    });
    Object.keys(fams).sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); }).forEach(function (f) {
      var o = document.createElement('option');
      o.value = f; o.textContent = f + ' — ' + fams[f];
      famSel.appendChild(o);
    });
    applyTheme();
    render();
  }).catch(function (e) {
    countEl.textContent = 'manifest.json missing — run node tools/generate.mjs first (' + e + ')';
  });
})();
