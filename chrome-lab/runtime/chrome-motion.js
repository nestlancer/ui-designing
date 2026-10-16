/* Nestlancer Chrome Lab — shared motion runtime (Phase 1).
   Implements §3.6 primitives m-01…m-40 as OPT-IN data attributes:
     data-motion="m-01" on the chrome root wires the behaviour.
   A per-variant script.js may also use window.NLMotion helpers.
   Global reduced-motion short-circuit: every effect checks
   matchMedia('(prefers-reduced-motion: reduce)') and no-ops when set.
   One rAF loop maximum per page (shared ticker). */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function reduced() { return !!(reduce && reduce.matches); }

  // shared rAF ticker (max one loop per page)
  var tickers = [];
  var running = false;
  function loop(t) {
    for (var i = 0; i < tickers.length; i++) tickers[i](t);
    if (tickers.length) requestAnimationFrame(loop); else running = false;
  }
  function addTicker(fn) {
    tickers.push(fn);
    if (!running) { running = true; requestAnimationFrame(loop); }
    return function () {
      var i = tickers.indexOf(fn);
      if (i > -1) tickers.splice(i, 1);
    };
  }

  function q(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  var api = { reduced: reduced, addTicker: addTicker, q: q };
  window.NLMotion = api;

  function init(root) {
    var chrome = root.querySelector('[data-chrome]') || root;
    var id = chrome.getAttribute('data-chrome') || '';
    var motions = (chrome.getAttribute('data-motion') || '').split(/\s+/).filter(Boolean);

    // m-01 sticky-shrink / m-03 glass / m-04 transparent→solid — one scroll probe
    if (motions.some(function (m) { return m === 'm-01' || m === 'm-03' || m === 'm-04' || m === 'm-13' || m === 'm-32'; })) {
      var lastY = window.scrollY, hideT = null;
      var onScroll = function () {
        var y = window.scrollY;
        if (reduced()) return;
        if (motions.indexOf('m-01') > -1 || motions.indexOf('m-03') > -1 || motions.indexOf('m-04') > -1) {
          chrome.setAttribute('data-scrolled', y > 24 ? 'true' : 'false');
          if (motions.indexOf('m-04') > -1) chrome.setAttribute('data-solid', y > 120 ? 'true' : 'false');
        }
        if (motions.indexOf('m-13') > -1) {
          var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          chrome.style.setProperty('--scroll-p', String(Math.min(1, y / max)));
        }
        if (motions.indexOf('m-02') > -1) {
          if (y > lastY + 6 && y > 160) chrome.setAttribute('data-hide', 'true');
          else if (y < lastY - 6) chrome.setAttribute('data-hide', 'false');
        }
        lastY = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // m-02 hide-down / show-up (own listener when sole motion)
    if (motions.indexOf('m-02') > -1 && !motions.some(function (m) { return m === 'm-01' || m === 'm-03' || m === 'm-04'; })) {
      var prev = window.scrollY;
      window.addEventListener('scroll', function () {
        if (reduced()) return;
        var y = window.scrollY;
        if (y > prev + 6 && y > 160) chrome.setAttribute('data-hide', 'true');
        else if (y < prev - 6) chrome.setAttribute('data-hide', 'false');
        prev = y;
      }, { passive: true });
    }

    // m-11 command palette
    var palette = root.querySelector('[data-palette]');
    if (palette) {
      var openPalette = function (open) {
        palette.setAttribute('data-open', open ? 'true' : 'false');
        var input = palette.querySelector('input');
        if (open && input) input.focus();
      };
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openPalette(palette.getAttribute('data-open') !== 'true');
        }
        if (e.key === 'Escape' && palette.getAttribute('data-open') === 'true') {
          openPalette(false);
          var trg = root.querySelector('[data-palette-trigger]');
          if (trg) trg.focus();
        }
      });
      q(root, '[data-palette-trigger]').forEach(function (b) {
        b.addEventListener('click', function () { openPalette(palette.getAttribute('data-open') !== 'true'); });
      });
      palette.addEventListener('click', function (e) {
        if (e.target === palette) openPalette(false);
      });
    }

    // disclosures: burger / drawer / overlay / mega / accordion
    q(root, '[data-disclosure]').forEach(function (btn) {
      var target = root.querySelector('#' + btn.getAttribute('aria-controls'));
      if (!target) return;
      var setState = function (open) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        target.setAttribute('data-open', open ? 'true' : 'false');
        if (open) {
          var f = target.querySelector('a,button,input,[tabindex]');
          if (f) f.focus();
        } else {
          btn.focus();
        }
      };
      btn.addEventListener('click', function () {
        setState(btn.getAttribute('aria-expanded') !== 'true');
      });
      target.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setState(false);
      });
    });

    // m-17 announcement dismiss
    var ann = root.querySelector('[data-announce]');
    if (ann) {
      var key = 'nl-announce-' + id;
      try { if (localStorage.getItem(key) === 'off') ann.setAttribute('data-dismissed', 'true'); } catch (_) {}
      var close = ann.querySelector('[data-announce-close]');
      if (close) close.addEventListener('click', function () {
        ann.setAttribute('data-dismissed', 'true');
        try { localStorage.setItem(key, 'off'); } catch (_) {}
      });
    }

    // m-23 back-to-top
    var totop = root.querySelector('[data-totop]');
    if (totop) {
      window.addEventListener('scroll', function () {
        totop.setAttribute('data-show', window.scrollY > window.innerHeight * 0.6 ? 'true' : 'false');
      }, { passive: true });
      totop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
      });
    }

    // m-26 count-up
    var counters = q(root, '[data-count-to]');
    if (counters.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          if (reduced()) return;
          var el = en.target, to = parseFloat(el.getAttribute('data-count-to')) || 0;
          var t0 = performance.now();
          (function step(t) {
            var p = Math.min(1, (t - t0) / 1200);
            var e = 1 - Math.pow(1 - p, 4); /* easeOutExpo-ish */
            el.textContent = Math.round(to * e).toLocaleString('en-IN');
            if (p < 1) requestAnimationFrame(step);
          })(t0);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    }

    // m-19 footer reveal (IO fallback for animation-timeline)
    var rev = q(root, '[data-reveal]');
    if (rev.length && 'IntersectionObserver' in window && !CSS.supports('animation-timeline: view()')) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.setAttribute('data-in', 'true'); io2.unobserve(en.target); }
        });
      }, { threshold: 0.15 });
      rev.forEach(function (el) { io2.observe(el); });
    }

    // m-18 rotating status word
    var rot = root.querySelector('[data-rotate]');
    if (rot && !reduced()) {
      var words = (rot.getAttribute('data-rotate') || '').split('|').filter(Boolean);
      var wi = 0;
      if (words.length > 1) setInterval(function () {
        wi = (wi + 1) % words.length;
        rot.setAttribute('data-flip', 'true');
        setTimeout(function () {
          rot.textContent = words[wi];
          rot.setAttribute('data-flip', 'false');
        }, 200);
      }, 4000);
    }

    // m-34 email capture → success morph
    q(root, 'form[data-morph]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button');
        if (btn) { btn.setAttribute('data-done', 'true'); btn.textContent = 'Subscribed ✓'; }
        var input = form.querySelector('input');
        if (input) input.disabled = true;
      });
    });

    // m-22 / m-37 accordion (details-style buttons)
    q(root, '[data-acc]').forEach(function (btn) {
      var panel = root.querySelector('#' + btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('data-open', open ? 'true' : 'false');
      });
    });

    // m-35 segmented control thumb
    var seg = root.querySelector('[data-seg]');
    if (seg) {
      var thumb = seg.querySelector('.seg__thumb');
      var items = q(seg, '[role="tab"]');
      var move = function (i) {
        items.forEach(function (it, j) {
          it.setAttribute('aria-selected', j === i ? 'true' : 'false');
          it.tabIndex = j === i ? 0 : -1;
        });
        if (thumb && items[i]) thumb.style.transform = 'translateX(' + (items[i].offsetLeft) + 'px)';
        if (thumb) thumb.style.width = items[i].offsetWidth + 'px';
      };
      items.forEach(function (it, i) {
        it.addEventListener('click', function () { move(i); });
      });
      if (items.length) requestAnimationFrame(function () { move(0); });
    }

    // pause infinite animations when tab hidden (§5.3)
    document.addEventListener('visibilitychange', function () {
      var hidden = document.hidden;
      q(root, '[data-motion]').forEach(function (el) {
        el.style.animationPlayState = hidden ? 'paused' : '';
      });
    });

    // theme toggle (m-12) — demo pages
    q(root, '[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        var apply = function () {
          document.documentElement.setAttribute('data-theme', cur);
          btn.setAttribute('aria-pressed', cur === 'dark' ? 'true' : 'false');
        };
        if (document.startViewTransition && !reduced()) document.startViewTransition(apply);
        else apply();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(document); });
  else init(document);
})();
