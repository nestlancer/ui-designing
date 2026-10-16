/* 20 footer family emitters — same craft bar as headers (§6.2).
   Every family locks one A7 skin; HTML carries the classes its skin needs. */
import { COPY, glyph, icon, eyebrow, socialRow, statusPill, legalLine } from './atoms.mjs';

const K = (name) => `%%K%%${name}`;

const wmCSS = () => `
%%S%%.wm{ display:inline-flex; align-items:center; gap:9px; text-decoration:none; }
%%S%%.wm__txt{ font:700 21px/1 var(--n-font-display); color:var(--n-ink); letter-spacing:-.01em; }
%%S%%.wm__dot{ color:var(--n-teal); }`;

const fcolCSS = () => `
%%S%%.fcol{ min-width:0; }
%%S%%.fcol__h{ margin:0 0 12px; }
%%S%%.fcol__list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; }
%%S%%.fcol__link{
  display:inline-block; padding:5px 0;
  font:400 14px/1.45 var(--n-font-sans); color:var(--n-body); text-decoration:none;
  transition:color .15s ease-out, transform .26s cubic-bezier(.2,.8,.2,1);
}
%%S%%.fcol__link:hover{ color:var(--n-ink); transform:translateX(3px); }`;

const legalCSS = () => `
%%S%%.legal{
  display:flex; flex-wrap:wrap; gap:10px 18px; align-items:center;
  padding:16px 0; border-top:1px solid var(--n-hairline);
}
%%S%%.legal__line{ margin:0; font:400 12px/1.5 var(--n-font-sans); color:var(--n-muted); }
%%S%%.legal a{ color:var(--n-muted); text-decoration:none; }
%%S%%.legal a:hover{ color:var(--n-teal); }`;

const socCSS = () => `
%%S%%.soc{ display:flex; gap:8px; list-style:none; margin:12px 0 0; padding:0; }
%%S%%.soc__a{
  display:inline-flex; align-items:center; justify-content:center;
  width:34px; height:34px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); color:var(--n-body); text-decoration:none;
  font:600 11px/1 var(--n-font-mono);
  transition:transform .3s cubic-bezier(.2,.8,.2,1), color .15s, border-color .15s;
}
%%S%%.soc__a:hover{ color:var(--n-teal); border-color:var(--n-teal); transform:translateY(-2px); }
%%S%%.soc li{ animation:${K('pop')} .3s both; }
%%S%%.soc li:nth-child(2){ animation-delay:40ms; }
%%S%%.soc li:nth-child(3){ animation-delay:80ms; }
%%S%%.soc li:nth-child(4){ animation-delay:120ms; }
%%S%%.soc li:nth-child(5){ animation-delay:160ms; }
@keyframes ${K('pop')}{ from{ transform:scale(.8); opacity:0; } to{ transform:scale(1); opacity:1; } }`;

const newsletterCSS = () => `
%%S%%.nl-form{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0 0; }
%%S%%.nl-form input{
  flex:1; min-width:200px; height:46px; padding:0 16px;
  border-radius:var(--n-radius-pill); border:1px solid var(--n-hairline);
  background:var(--n-surface); color:var(--n-ink); font:400 14px/1 var(--n-font-sans);
}
%%S%%.nl-form input:focus{ outline:2px solid var(--n-teal); outline-offset:2px; }
%%S%%.nl-form button{
  min-height:46px; padding:0 22px; border-radius:var(--n-radius-pill); border:0;
  background:var(--n-teal); color:var(--n-white); font:600 14px/1 var(--n-font-sans); cursor:pointer;
  transition:transform .15s ease-out, background-color .15s ease-out;
}
%%S%%.nl-form button:hover{ background:var(--n-teal-hover); }
%%S%%.nl-form button[data-done="true"]{ transform:scale(.94); background:var(--n-live); }
%%S%%.nl-form__hint{ margin:10px 0 0; font:400 12px/1.5 var(--n-font-sans); color:var(--n-muted); }`;

const accCSS = () => `
%%S%%.facc__btn{
  display:flex; align-items:center; justify-content:space-between; width:100%;
  padding:14px 0; border:0; background:none; cursor:pointer;
  font:500 11px/1 var(--n-font-mono); letter-spacing:var(--n-eyebrow-ls); text-transform:uppercase; color:var(--n-muted);
}
%%S%%.facc__btn svg{ transition:transform .26s cubic-bezier(.2,.8,.2,1); }
%%S%%.facc__btn[aria-expanded="true"] svg{ transform:rotate(180deg); }
%%S%%.facc__panel{
  display:grid; grid-template-rows:0fr;
  transition:grid-template-rows .26s cubic-bezier(.2,.8,.2,1);
}
%%S%%.facc__panel[data-open="true"]{ grid-template-rows:1fr; }
%%S%%.facc__panel > div{ overflow:hidden; }`;

const statsCSS = () => `
%%S%%.stats{ display:flex; flex-wrap:wrap; gap:12px; margin:16px 0 0; }
%%S%%.stat{
  flex:1; min-width:150px; padding:14px 16px; border-radius:var(--n-radius-card);
  background:var(--n-surface-2); border:1px solid var(--n-hairline);
}
%%S%%.stat__n{
  margin:0; font:700 22px/1.1 var(--n-font-display); color:var(--n-ink);
  font-variant-numeric:tabular-nums;
}
%%S%%.stat__l{ margin:6px 0 0; font:500 11px/1.3 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase; color:var(--n-muted); }`;

const qrCSS = () => `
%%S%%.qr{ display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
%%S%%.qr__\boxed{
  width:92px; height:92px; border-radius:12px; flex:none;
  border:1px solid var(--n-hairline); background:var(--n-surface);
  display:grid; place-items:center;
  transition:transform .18s cubic-bezier(.2,.8,.2,1);
}
%%S%%.qr__box:hover{ transform:rotate(-3deg); }
%%S%%.store{
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 16px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); color:var(--n-ink); text-decoration:none;
  font:600 13px/1 var(--n-font-sans);
}
%%S%%.store:hover{ border-color:var(--n-teal); background:var(--n-mint); }`;

const localeCSS = () => `
%%S%%.locale{ display:flex; gap:8px; flex-wrap:wrap; margin:12px 0 0; }
%%S%%.locale button{
  display:inline-flex; align-items:center; gap:8px;
  padding:9px 14px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:transparent;
  color:var(--n-body); font:500 13px/1 var(--n-font-sans); cursor:pointer;
}
%%S%%.locale button.is-on, %%S%%.locale button:hover{ background:var(--n-teal-soft); border-color:var(--n-teal); color:var(--n-ink); }`;

const totopCSS = () => `
%%S%%.totop{
  position:fixed; right:22px; bottom:22px; z-index:45;
  width:48px; height:48px; border-radius:var(--n-radius-pill); border:1px solid var(--n-hairline);
  background:var(--n-surface); color:var(--n-ink); cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(10px); pointer-events:none;
  transition:opacity .2s ease-out, transform .2s cubic-bezier(.2,.8,.2,1);
  box-shadow:0 10px 30px rgba(10,37,67,.16);
}
%%S%%.totop[data-show="true"]{ opacity:1; transform:none; pointer-events:auto; }
%%S%%.totop svg{ transition:transform .2s cubic-bezier(.2,.8,.2,1); }
%%S%%.totop:hover svg{ transform:rotate(-90deg); }`;

const revealCSS = () => `
%%S%%[data-reveal]{ opacity:0; transform:translateY(16px); }
%%S%%[data-reveal][data-in="true"]{
  opacity:1; transform:none;
  transition:opacity .6s ease-out, transform .6s ease-out;
}
%%S%%[data-reveal][data-in="true"]:nth-child(2){ transition-delay:60ms; }
%%S%%[data-reveal][data-in="true"]:nth-child(3){ transition-delay:120ms; }
%%S%%[data-reveal][data-in="true"]:nth-child(4){ transition-delay:180ms; }
@supports (animation-timeline: view()){
  %%S%%[data-reveal]{ opacity:1; transform:none; animation:${K('rise')} .6s both; animation-timeline:view(); animation-range:entry 10% cover 30%; }
}
@keyframes ${K('rise')}{ from{ opacity:0; transform:translateY(16px); } to{ opacity:1; transform:none; } }`;

const curtainCSS = () => `
%%S%%.f-chrome{ position:sticky; bottom:0; z-index:0; }
%%S%%.site{ position:relative; z-index:1; }`;

const marqueeWmCSS = () => `
%%S%%.wm-xl{
  display:block; overflow:hidden; margin:8px 0 0;
}
%%S%%.wm-xl__t{
  display:inline-block; white-space:nowrap;
  font:800 clamp(48px, 11vw, 132px)/0.95 var(--n-font-display);
  letter-spacing:-.03em; color:var(--n-ink);
  animation:${K('wm')} 22s linear infinite;
}
%%S%%.wm-xl__t .wm__dot{ color:var(--n-teal); }
@keyframes ${K('wm')}{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }`;

function fChrome(id, v, inner) {
  return `<footer role="contentinfo" class="f-chrome" data-chrome="${id}" data-theme="dark" data-motion="${v.A4}">
<div class="f-inner">
${inner}
</div>
</footer>`;
}

function linkCols(kind = 'std') {
  if (kind === 'all') {
    return [
      ['PRODUCT', [['Project Hub', '/portal'], ['Pricing', '/pricing'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Product tour', '/product']]],
      ['COMPANY', [['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact'], ['Start a project', '/contact'], ['Careers', '/about']]],
      ['LEGAL', [['Terms', '/terms'], ['Privacy', '/privacy'], ['Verify document', '/verify'], ['Grievance', '/privacy']]],
      ['RESOURCES', [['Journal', '/blog'], ['Case studies', '/portfolio'], ['Status', '/portal'], ['Changelog', '/blog']]],
    ];
  }
  return Object.entries(COPY.footerCols).map(([h, links]) => [h, links]);
}

function colsHTML(cols, opts = {}) {
  return cols.map(([h, links], i) => `<div class="fcol" ${opts.reveal ? 'data-reveal' : ''}>
    ${eyebrow(h, 'fcol__h')}
    <ul class="fcol__list">${links.map(([t, r]) => `<li><a class="fcol__link" href="${r}">${t}</a></li>`).join('')}</ul>
  </div>`).join('');
}

/* ============================ FOOTER EMITTERS ============================ */
export const FOOTER_EMITTERS = {
  1(v, id) { /* Classic 4-col grid + blurb */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand" ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
        <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.social ? socialRow() : ''}
        ${v.opts.count ? `<p class="stat__n nl-num">₹<span data-count-to="428500">4,28,500</span></p><p class="stat__l">paid to freelancers</p>` : ''}
      </div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">
      ${legalLine()}
      <span class="legal__line"><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/verify">Verify</a></span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.social ? socCSS() : '', v.opts.count ? statsCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:48px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  2(v, id) { /* Oversized wordmark (ink band) */
    return {
      html: fChrome(id, v, `<div class="f-top">
    <div class="f-inner"><p class="nl-eyebrow" style="color:var(--n-on-ink-3)">${COPY.eyebrows.start} · MADE IN INDIA</p></div>
  </div>
  <div class="f-main">
    <ul class="f-links">
      ${COPY.nav.map(n => `<li><a class="fcol__link" href="${COPY.navRoutes[n]}">${n}</a></li>`).join('')}
    </ul>
    ${v.opts.marquee
        ? `<div class="wm-xl"><span class="wm-xl__t">Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span></span></div>`
        : `<div class="wm-xl wm-xl--static"><span class="wm-xl__t">Nestlancer<span class="wm__dot">.</span></span></div>`}
    <div class="legal">
      ${legalLine()}
      <span class="legal__line">${COPY.portalLive}</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [fcolCSS(), legalCSS(), marqueeWmCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-ink); color:var(--n-on-ink); }
%%S%%.f-top{ background:rgba(255,255,255,.06); }
%%S%%.f-top .f-inner{ padding:10px 24px; }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ background:transparent; padding:36px 0 10px; }
%%S%%.f-links{ display:flex; flex-wrap:wrap; gap:6px 22px; list-style:none; margin:0 0 22px; padding:0; }
%%S%%.f-links .fcol__link{ color:var(--n-on-ink-2); font-size:13px; text-transform:uppercase; letter-spacing:.08em; font-family:var(--n-font-mono); }
%%S%%.f-links .fcol__link:hover{ color:var(--n-teal-glow); }
%%S%%.wm-xl__t{ color:var(--n-white); }
%%S%%.wm-xl--static .wm-xl__t{ animation:none; }
%%S%%.legal{ border-top-color:rgba(255,255,255,.08); }
%%S%%.legal__line, %%S%%.legal a{ color:var(--n-on-ink-3); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  3(v, id) { /* Newsletter-lead */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-news">
      <div ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
        ${eyebrow(COPY.eyebrows.start, 'nl-eyebrow')}
        <h2 class="f-h2">Stay in the loop.</h2>
        <p class="f-blurb">${COPY.blurb}</p>
        <form class="nl-form" data-morph action="/subscribe" method="post">
          <label class="nl-vh" for="nl-${id}">Email address</label>
          <input id="nl-${id}" name="email" type="email" required placeholder="you@studio.in" autocomplete="email"/>
          <button type="submit">Subscribe</button>
          <p class="nl-form__hint">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
      <div class="f-news__cols">
        ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
      </div>
    </div>
    <div class="legal">
      ${legalLine()}
      <span class="legal__line"><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a></span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [fcolCSS(), legalCSS(), newsletterCSS(), v.opts.magnet ? '' : '', v.opts.count ? statsCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-bg-tint-1); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:48px 0 8px; }
%%S%%.f-news{ display:grid; grid-template-columns:1.2fr 1fr; gap:36px; align-items:start; }
%%S%%.f-news__cols{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
%%S%%.f-h2{ margin:10px 0 0; font:700 28px/1.15 var(--n-font-display); color:var(--n-ink); }
%%S%%.f-blurb{ margin:10px 0 0; max-width:38ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: ['JS_MORPH', ...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  4(v, id) { /* CTA banner fused */
    return {
      html: fChrome(id, v, `<div class="f-cta">
    <div class="f-inner f-cta__in" ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
      ${eyebrow(COPY.eyebrows.start, 'nl-eyebrow')}
      <h2 class="f-h2">Ready to ship with clarity?</h2>
      <p class="f-blurb">${COPY.blurb}</p>
      <ul class="checks">${COPY.ctaChecks.map(c => `<li>${icon('check')}${c}</li>`).join('')}</ul>
      <div class="f-cta__row">
        <a class="cta${v.opts.magnet ? '' : ''}" href="/contact" ${v.opts.magnet ? 'data-magnet' : ''}>${COPY.startCta}</a>
        <a class="cta cta--outline" href="/portal">Review the portal</a>
      </div>
    </div>
  </div>
  <div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p></div>
      ${colsHTML(linkCols())}
    </div>
    <div class="legal">${legalLine()}<span class="legal__line">Reply under 2m</span></div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-cta{
  background:
    radial-gradient(120% 180% at 15% -60%, var(--n-mesh-1), transparent 62%),
    radial-gradient(120% 180% at 90% -40%, var(--n-mesh-2), transparent 58%),
    var(--n-bg);
  border-bottom:1px solid var(--n-hairline);
  padding:52px 0 44px;
}
%%S%%.f-cta__in{ text-align:center; }
%%S%%.f-cta .f-blurb{ margin-left:auto; margin-right:auto; }
%%S%%.checks{ display:flex; flex-wrap:wrap; gap:8px 18px; justify-content:center; list-style:none; margin:16px 0 0; padding:0; }
%%S%%.checks li{ display:inline-flex; align-items:center; gap:7px; font:500 13px/1 var(--n-font-sans); color:var(--n-body); }
%%S%%.checks svg{ color:var(--n-teal); }
%%S%%.f-cta__row{ display:flex; gap:12px; justify-content:center; margin:20px 0 0; flex-wrap:wrap; }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:40px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-h2{ margin:10px 0 0; font:700 32px/1.12 var(--n-font-display); color:var(--n-ink); }
%%S%%.f-blurb{ margin:12px 0 0; max-width:46ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.cta{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  min-height:44px; padding:0 20px; border-radius:var(--n-radius-pill);
  font:600 14px/1 var(--n-font-sans); text-decoration:none; border:1px solid transparent;
  background:var(--n-teal); color:var(--n-white);
  transition:background-color .16s ease-out, transform .16s ease-out;
}
%%S%%.cta:hover{ background:var(--n-teal-hover); }
%%S%%.cta:active{ transform:scale(.98); }
%%S%%.cta--outline{ background:transparent; color:var(--n-ink); border-color:var(--n-hairline); }
%%S%%.cta--outline:hover{ background:var(--n-mint); }
%%S%%.totop svg{ transform:rotate(-90deg); }`,
        v.opts.grain ? `%%S%%.f-cta{ animation:${K('grain')} 8s steps(12) infinite; background-size:220px 160px, 260px 180px; }
@keyframes ${K('grain')}{ to{ background-position:120px 80px, -100px 60px; } }` : '',
        v.opts.totop ? totopCSS() : '', v.opts.count ? statsCSS() : '', revealCSS()].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.magnet ? ['JS_MAGNET'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  5(v, id) { /* Mega sitemap */
    return {
      html: fChrome(id, v, `${v.opts.band ? `<button type="button" class="f-band" data-totop data-show="true">Back to top ↑</button>` : ''}
  <div class="f-main">
    <div class="f-grid f-grid--mega">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.locale ? `<div class="locale"><button type="button" class="is-on">${icon('globe')} INR ₹</button><button type="button">USD $</button><button type="button">en-IN</button></div>` : ''}
      </div>
      ${colsHTML(linkCols(v.opts.cols >= 6 ? 'all' : 'std'), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line"><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/verify">Verify document</a></span>
    </div>
    ${v.opts.totop && !v.opts.band ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.locale ? localeCSS() : '', v.opts.totop && !v.opts.band ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:44px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:26px; }
%%S%%.f-grid--mega{ grid-template-columns:1.3fr repeat(${v.opts.cols >= 6 ? 4 : 3}, 1fr); }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.f-band{
  display:block; width:100%; border:0; cursor:pointer;
  padding:13px 0; background:var(--n-surface-2);
  font:600 12px/1 var(--n-font-sans); color:var(--n-body);
  border-bottom:1px solid var(--n-hairline);
  transition:color .15s ease-out, background-color .15s ease-out;
}
%%S%%.f-band:hover{ color:var(--n-ink); background:var(--n-mint); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  6(v, id) { /* Accordion columns */
    const cols = linkCols(v.opts.nested ? 'all' : 'std');
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid f-grid--acc">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p></div>
      <div class="facc">
        ${cols.map(([h, links], i) => `<section class="facc__item">
          <button type="button" class="facc__btn" data-acc aria-expanded="${i === 0}" aria-controls="acc-${id}-${i}">${h}${icon('chevron')}</button>
          <div class="facc__panel" id="acc-${id}-${i}" data-open="${i === 0}">
            <div><ul class="fcol__list">${links.map(([t, r]) => `<li><a class="fcol__link" href="${r}">${t}</a></li>`).join('')}</ul></div>
          </div>
        </section>`).join('')}
      </div>
    </div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), accCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-bg); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:40px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.2fr 1.6fr; gap:34px; align-items:start; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.facc__item{ border-top:1px solid var(--n-hairline); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: ['JS_ACC', ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  7(v, id) { /* Minimal single-row */
    return {
      html: fChrome(id, v, `<div class="f-main f-main--min">
    <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
    ${v.opts.status ? statusPill(COPY.portalLive) : `<span class="legal__line">${COPY.blurb}</span>`}
    <div class="f-min__end">
      ${v.opts.toast ? `<button type="button" class="store" data-acc aria-expanded="false" aria-controls="none-${id}">Copy link</button>` : ''}
      <span class="legal__line nl-num">${COPY.legal}</span>
      ${v.opts.totop ? `<button type="button" class="totop totop--inline" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
    </div>
  </div>`),
      css: [wmCSS(), legalCSS(), v.opts.status ? `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; padding:6px 12px;
  border-radius:var(--n-radius-pill); background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}` : '', v.opts.totop ? totopCSS() : '', `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main--min{
  display:flex; align-items:center; gap:18px; flex-wrap:wrap;
  padding:22px 0;
}
%%S%%.f-min__end{ margin-left:auto; display:flex; align-items:center; gap:14px; }
%%S%%.totop--inline{ position:static; opacity:1; transform:none; pointer-events:auto; width:40px; height:40px; }
%%S%%.totop svg{ transform:rotate(-90deg); }`,
        v.opts.toast ? `%%S%%.store{
  display:inline-flex; padding:8px 14px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:transparent; color:var(--n-body);
  font:600 12px/1 var(--n-font-sans); cursor:pointer;
}` : ''].filter(Boolean),
      js: [...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  8(v, id) { /* Two-bar */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.social ? socialRow() : ''}</div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
  </div>
  <div class="f-legal">
    <div class="f-inner f-legal__in">
      ${v.opts.locale ? `<div class="locale"><button type="button" class="is-on">${icon('globe')} INR ₹</button><button type="button">USD $</button></div>` : ''}
      ${v.opts.count ? `<p class="stat__n nl-num">₹<span data-count-to="428500">4,28,500</span> paid · <span data-count-to="3">3</span> milestones</p>` : ''}
      ${legalLine()}
      <span class="legal__line"><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a></span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.social ? socCSS() : '', v.opts.locale ? localeCSS() : '', v.opts.count ? statsCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:44px 0 28px; }
%%S%%.f-legal{ background:var(--n-bg-tint-1); }
%%S%%.f-legal__in{ padding-top:14px; padding-bottom:14px; display:flex; flex-wrap:wrap; gap:10px 18px; align-items:center; }
%%S%%.f-legal .legal{ border-top:0; padding:0; flex:1; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.stat__n{ margin:0; font:600 13px/1.2 var(--n-font-mono); color:var(--n-ink); font-variant-numeric:tabular-nums; }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  9(v, id) { /* Dark inverted + teal accents */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.status ? statusPill(COPY.portalLive) : ''}
        ${v.opts.social ? socialRow() : ''}</div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    ${v.opts.curtain ? '' : ''}
    <div class="legal">${legalLine()}
      <span class="legal__line"><a href="/status">All systems operational</a></span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.status ? `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; padding:6px 12px;
  border-radius:var(--n-radius-pill); background:rgba(36,135,127,.25); color:var(--n-teal-glow);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}
%%S%%.pill .nl-dot{ box-shadow:0 0 0 3px rgba(34,160,107,.25); }` : '',
        v.opts.social ? socCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-ink); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:52px 0 10px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-on-ink-2); }
%%S%%.wm__txt{ color:var(--n-white); }
%%S%%.fcol__link{ color:var(--n-on-ink-2); }
%%S%%.fcol__link:hover{ color:var(--n-teal-glow); transform:translateX(3px); }
%%S%%.fcol__h{ color:var(--n-on-ink-3); }
%%S%%.legal{ border-top-color:rgba(255,255,255,.08); }
%%S%%.legal__line, %%S%%.legal a{ color:var(--n-on-ink-3); }
%%S%%.legal a:hover{ color:var(--n-teal-glow); }
%%S%%.soc__a{ border-color:rgba(255,255,255,.14); color:var(--n-on-ink-2); }
%%S%%.soc__a:hover{ color:var(--n-teal-glow); border-color:var(--n-teal-glow); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  10(v, id) { /* Mesh / gradient footer */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand" ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
        <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.count ? `<p class="stat__n nl-num">₹<span data-count-to="428500">4,28,500</span></p><p class="stat__l">milestones paid</p>` : ''}
        ${v.opts.social ? socialRow() : ''}
      </div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.count ? statsCSS() : '', v.opts.social ? socCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{
  background:
    radial-gradient(130% 170% at 10% -40%, var(--n-mesh-1), transparent 62%),
    radial-gradient(130% 170% at 92% -20%, var(--n-mesh-2), transparent 58%),
    var(--n-bg);
}
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:56px 0 10px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.stat__n{ margin:14px 0 0; font:700 22px/1.1 var(--n-font-display); color:var(--n-ink); font-variant-numeric:tabular-nums; }
%%S%%.stat__l{ margin:6px 0 0; font:500 11px/1.3 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase; color:var(--n-muted); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  11(v, id) { /* Editorial / issue-style */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-issue">
      ${eyebrow('THE NESTLANCER JOURNAL', 'nl-eyebrow')}
      <p class="issue__date nl-num">Issue 12 · October 2026 · Hyderabad</p>
    </div>
    <div class="f-grid">
      <div class="f-brand" ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
        <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
      </div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line">Edited in Hyderabad · Set in Fraunces &amp; Inter</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-bg); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:44px 0 8px; }
%%S%%.f-issue{ padding:0 0 18px; border-bottom:1px solid var(--n-hairline); margin-bottom:26px; }
%%S%%.issue__date{ margin:10px 0 0; font:500 13px/1 var(--n-font-mono); letter-spacing:.12em; text-transform:uppercase; color:var(--n-ink); }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.fcol__h{ font-family:var(--n-font-display); font-size:13px; letter-spacing:.12em; color:var(--n-ink-2); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  12(v, id) { /* Marquee wordmark reveal */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid f-grid--top">
      <div class="f-brand">
        <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.magnet ? `<a class="cta" href="/contact" data-magnet>${COPY.startCta}</a>` : ''}
      </div>
      ${colsHTML(linkCols())}
    </div>
    ${v.opts.ticker ? `<div class="ticker"><div class="ticker__row">${COPY.portfolio.slice(0, 4).map(t => `<span class="ticker__t">${t}</span><span class="ticker__sep">·</span>`).join('')}${COPY.portfolio.slice(0, 4).map(t => `<span class="ticker__t">${t}</span><span class="ticker__sep">·</span>`).join('')}</div></div>` : ''}
    <div class="wm-xl">${v.opts.marquee ? `<span class="wm-xl__t">Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span> Nestlancer<span class="wm__dot">.</span></span>` : `<span class="wm-xl__t">Nestlancer<span class="wm__dot">.</span></span>`}</div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), marqueeWmCSS(), v.opts.ticker ? `
%%S%%.ticker{ overflow:hidden; margin:18px 0 6px; }
%%S%%.ticker__row{ display:flex; gap:18px; width:max-content; animation:${K('marq')} 28s linear infinite; }
%%S%%.ticker:hover .ticker__row{ animation-play-state:paused; }
%%S%%.ticker__t{ font:500 11px/1 var(--n-font-mono); letter-spacing:.14em; color:var(--n-muted); white-space:nowrap; }
%%S%%.ticker__sep{ color:var(--n-teal); }
@keyframes ${K('marq')}{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }` : '',
        v.opts.magnet ? `%%S%%.cta{
  display:inline-flex; margin-top:16px; min-height:42px; padding:0 18px;
  border-radius:var(--n-radius-pill); background:var(--n-teal); color:var(--n-white);
  font:600 14px/1 var(--n-font-sans); text-decoration:none;
  transition:transform .18s cubic-bezier(.2,.8,.2,1);
}` : '',
        v.opts.totop ? totopCSS() : '', `
%%S%%.f-chrome{ background:var(--n-surface-2); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:44px 0 8px; }
%%S%%.f-grid--top{ display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:28px; margin-bottom:18px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.opts.magnet ? ['JS_MAGNET'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  13(v, id) { /* Proof / stat rail (ink band) */
    return {
      html: fChrome(id, v, `<div class="f-top">
    <div class="f-inner f-stats">
      <div class="stat"><p class="stat__n nl-num">₹<span data-count-to="428500">4,28,500</span></p><p class="stat__l">payments processed</p></div>
      <div class="stat"><p class="stat__n nl-num">₹<span data-count-to="420000">4.2L</span></p><p class="stat__l">largest milestone</p></div>
      <div class="stat"><p class="stat__n nl-num">1 / 3</p><p class="stat__l">payouts cleared</p></div>
      <div class="stat"><p class="stat__n nl-num">2 min</p><p class="stat__l">median reply</p></div>
    </div>
  </div>
  <div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.status ? statusPill(COPY.portalLive) : ''}</div>
      ${colsHTML(linkCols())}
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line nl-num">${COPY.proof.payout}</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), statsCSS(), v.opts.status ? `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; margin-top:12px; padding:6px 12px;
  border-radius:var(--n-radius-pill); background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}` : '', v.opts.totop ? totopCSS() : '', `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-top{ padding:26px 0; }
%%S%%.f-stats{ display:flex; flex-wrap:wrap; gap:12px; }
%%S%%.f-top .stat{
  flex:1; min-width:150px; padding:14px 16px; border-radius:var(--n-radius-card);
  background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12);
}
%%S%%.f-top .stat__n{ color:var(--n-white); }
%%S%%.f-top .stat__l{ color:var(--n-on-ink-3); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:36px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: ['JS_COUNT', ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  14(v, id) { /* Locale + currency switcher */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand">
        <a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        <div class="locale" role="group" aria-label="Currency and language">
          <button type="button" class="is-on">${icon('globe')} INR ₹</button>
          <button type="button">USD $</button>
          <button type="button">en-IN</button>
        </div>
        ${v.opts.qr ? `<div class="qr"><div class="qr__box"><svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><rect x="4" y="4" width="14" height="14" style="fill:var(--n-ink)"/><rect x="38" y="4" width="14" height="14" style="fill:var(--n-ink)"/><rect x="4" y="38" width="14" height="14" style="fill:var(--n-ink)"/><rect x="26" y="26" width="6" height="6" style="fill:var(--n-ink)"/><rect x="38" y="38" width="6" height="6" style="fill:var(--n-ink)"/><rect x="46" y="26" width="6" height="6" style="fill:var(--n-ink)"/></svg></div><a class="store" href="/portal">${icon('bolt')} Project Hub</a></div>` : ''}
      </div>
      ${colsHTML(linkCols())}
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line">INR primary · USD secondary</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), localeCSS(), v.opts.qr ? qrCSS() : '', v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-bg); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:12px 24px 0; }
%%S%%.f-main{ padding:36px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  15(v, id) { /* Social-proof wall */
    return {
      html: fChrome(id, v, `<div class="f-main">
    ${eyebrow('TRUSTED BY PRODUCT TEAMS', 'nl-eyebrow')}
    <ul class="proof" ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
      ${['FintelPayments', 'Northwind SaaS', 'HealthTech Co', 'Meridian Labs', 'Orbit Retail'].map(p => `<li class="proof__t">${p}</li>`).join('')}
    </ul>
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${socialRow()}</div>
      ${colsHTML(linkCols())}
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line">Awards row · Design systems · 2026</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), socCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{
  background: color-mix(in oklab, var(--n-surface) 82%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(1.3); backdrop-filter: blur(14px) saturate(1.3);
}
@supports not (backdrop-filter: blur(2px)){ %%S%%.f-chrome{ background: var(--n-surface); } }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:44px 0 8px; }
%%S%%.proof{ display:flex; flex-wrap:wrap; gap:10px; list-style:none; margin:14px 0 30px; padding:0; }
%%S%%.proof__t{
  padding:10px 16px; border-radius:var(--n-radius-pill);
  border:1px solid var(--n-hairline); background:var(--n-surface-2);
  font:600 12px/1 var(--n-font-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--n-muted);
}
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  16(v, id) { /* Compact sticky mobile footer */
    return {
      html: fChrome(id, v, `<div class="f-main f-main--compact">
    <div class="f-grid f-grid--compact">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p></div>
      ${colsHTML(linkCols())}
    </div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>
  <div class="f-sticky">
    <a class="cta" href="/contact">${COPY.startCta}</a>
    <a class="cta cta--outline" href="/portal">Portal</a>
    ${v.opts.status ? `<span class="pill"><span class="nl-dot"></span>Live</span>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.status ? `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; padding:8px 12px;
  border-radius:var(--n-radius-pill); background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}` : '', v.opts.totop ? totopCSS() : '', `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main--compact{ padding:32px 0 6px; }
%%S%%.f-grid--compact{ display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:22px; }
%%S%%.f-blurb{ margin:12px 0 0; max-width:28ch; font:400 13px/1.55 var(--n-font-sans); color:var(--n-body); }
%%S%%.f-sticky{
  position:sticky; bottom:0; z-index:44;
  display:flex; gap:10px; align-items:center; justify-content:center;
  padding:12px 16px calc(12px + env(safe-area-inset-bottom));
  background:var(--n-surface); border-top:1px solid var(--n-hairline);
}
%%S%%.cta{
  display:inline-flex; align-items:center; justify-content:center;
  min-height:44px; padding:0 18px; border-radius:var(--n-radius-pill);
  font:600 14px/1 var(--n-font-sans); text-decoration:none;
  background:var(--n-teal); color:var(--n-white); border:1px solid transparent;
}
%%S%%.cta--outline{ background:transparent; color:var(--n-ink); border-color:var(--n-hairline); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: 'sticky-cta',
    };
  },

  17(v, id) { /* Curtain reveal on overscroll */
    return {
      html: `<div class="site"><div class="site__spacer"></div></div>` + fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${socialRow()}</div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), socCSS(), curtainCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-ink); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:56px 0 10px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-on-ink-2); }
%%S%%.wm__txt{ color:var(--n-white); }
%%S%%.fcol__link{ color:var(--n-on-ink-2); }
%%S%%.fcol__link:hover{ color:var(--n-teal-glow); }
%%S%%.fcol__h{ color:var(--n-on-ink-3); }
%%S%%.legal{ border-top-color:rgba(255,255,255,.08); }
%%S%%.legal__line{ color:var(--n-on-ink-3); }
%%S%%.soc__a{ border-color:rgba(255,255,255,.14); color:var(--n-on-ink-2); }
%%S%%.site__spacer{ height:28vh; }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  18(v, id) { /* App / QR download */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-app">
      <div ${v.A4 === 'm-19' ? 'data-reveal' : ''}>
        ${eyebrow(COPY.eyebrows.portal, 'nl-eyebrow')}
        <h2 class="f-h2">Take the Project Hub with you.</h2>
        <p class="f-blurb">${COPY.blurb}</p>
        <div class="qr">
          <div class="qr__box"><svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><rect x="4" y="4" width="14" height="14" style="fill:var(--n-ink)"/><rect x="38" y="4" width="14" height="14" style="fill:var(--n-ink)"/><rect x="4" y="38" width="14" height="14" style="fill:var(--n-ink)"/><rect x="26" y="26" width="6" height="6" style="fill:var(--n-ink)"/><rect x="38" y="38" width="6" height="6" style="fill:var(--n-ink)"/><rect x="46" y="26" width="6" height="6" style="fill:var(--n-ink)"/></svg></div>
          <a class="store" href="/portal">${icon('bolt')} iOS app</a>
          <a class="store" href="/portal">${icon('bolt')} Android app</a>
        </div>
      </div>
      <div class="f-app__cols">
        ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
      </div>
    </div>
    <div class="legal">${legalLine()}
      <span class="legal__line">QR placeholder — scan to open the portal demo</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [fcolCSS(), legalCSS(), qrCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{ background:var(--n-bg-tint-1); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:48px 0 8px; }
%%S%%.f-app{ display:grid; grid-template-columns:1.1fr 1fr; gap:36px; align-items:start; }
%%S%%.f-app__cols{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
%%S%%.f-h2{ margin:10px 0 0; font:700 26px/1.15 var(--n-font-display); color:var(--n-ink); }
%%S%%.f-blurb{ margin:10px 0 0; max-width:36ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  19(v, id) { /* Compliance-heavy (India) */
    return {
      html: fChrome(id, v, `<div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${v.opts.status ? statusPill(COPY.intake) : ''}
        ${v.opts.count ? `<p class="stat__n nl-num">₹<span data-count-to="428500">4,28,500</span></p><p class="stat__l">settled via Razorpay</p>` : ''}
      </div>
      ${colsHTML(linkCols())}
    </div>
    <ul class="comply">
      <li>Razorpay merchant</li><li>PCI-DSS aligned</li><li>GST invoicing</li><li>DPDP Act 2023</li>
      <li>Grievance officer: grievance@nestlancer.in</li>
    </ul>
  </div>
  <div class="f-legal">
    <div class="f-inner f-legal__in">
      ${legalLine()}
      <span class="legal__line nl-num">Payouts ${COPY.proof.payout.toLowerCase()}</span>
    </div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), v.opts.count ? statsCSS() : '', v.opts.status ? `
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; margin-top:12px; padding:6px 12px;
  border-radius:var(--n-radius-pill); background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}` : '', v.opts.totop ? totopCSS() : '', `
%%S%%.f-chrome{ background:var(--n-surface); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:42px 0 24px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.comply{
  display:flex; flex-wrap:wrap; gap:8px; list-style:none;
  margin:6px 0 22px; padding:0;
}
%%S%%.comply li{
  padding:7px 12px; border-radius:var(--n-radius-chip);
  background:var(--n-surface-2); border:1px solid var(--n-hairline);
  font:500 11px/1.3 var(--n-font-mono); letter-spacing:.06em; color:var(--n-muted);
}
%%S%%.f-legal{ background:var(--n-bg-tint-1); }
%%S%%.f-legal__in{ padding-top:14px; padding-bottom:14px; display:flex; flex-wrap:wrap; gap:10px 18px; align-items:center; }
%%S%%.f-legal .legal{ border-top:0; padding:0; flex:1; }
%%S%%.stat__n{ margin:14px 0 0; font:700 20px/1.1 var(--n-font-display); color:var(--n-ink); font-variant-numeric:tabular-nums; }
%%S%%.stat__l{ margin:6px 0 0; font:500 11px/1.3 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase; color:var(--n-muted); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.opts.count ? ['JS_COUNT'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },

  20(v, id) { /* Community & status */
    return {
      html: fChrome(id, v, `<div class="f-status">
    <div class="f-inner f-status__in">
      ${statusPill('All systems operational')}
      <a class="status-link" href="/blog">Changelog RSS</a>
      <a class="status-link" href="/portal">Uptime 99.9%</a>
      <a class="status-link" href="/about">Community</a>
    </div>
  </div>
  <div class="f-main">
    <div class="f-grid">
      <div class="f-brand"><a class="wm" href="/">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>
        <p class="f-blurb">${COPY.blurb}</p>
        ${socialRow()}</div>
      ${colsHTML(linkCols(), { reveal: v.A4 === 'm-19' })}
    </div>
    <div class="legal">${legalLine()}</div>
    ${v.opts.totop ? `<button type="button" class="totop" data-totop data-show="false" aria-label="Back to top">${icon('arrow')}</button>` : ''}
  </div>`),
      css: [wmCSS(), fcolCSS(), legalCSS(), socCSS(), v.opts.totop ? totopCSS() : '', revealCSS(), `
%%S%%.f-chrome{
  background: color-mix(in oklab, var(--n-surface) 82%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(1.3); backdrop-filter: blur(14px) saturate(1.3);
}
@supports not (backdrop-filter: blur(2px)){ %%S%%.f-chrome{ background: var(--n-surface); } }
%%S%%.f-status{ border-bottom:1px solid var(--n-hairline); }
%%S%%.f-status__in{ display:flex; flex-wrap:wrap; gap:10px 18px; align-items:center; padding:12px 24px; }
%%S%%.pill{
  display:inline-flex; align-items:center; gap:7px; padding:6px 12px;
  border-radius:var(--n-radius-pill); background:var(--n-teal-soft); color:var(--n-ink);
  font:500 11px/1 var(--n-font-mono); letter-spacing:.1em; text-transform:uppercase;
}
%%S%%.status-link{
  font:500 12px/1 var(--n-font-mono); letter-spacing:.08em; text-transform:uppercase;
  color:var(--n-muted); text-decoration:none;
}
%%S%%.status-link:hover{ color:var(--n-teal); }
%%S%%.f-inner{ max-width:var(--n-container); margin:0 auto; padding:0 24px; }
%%S%%.f-main{ padding:42px 0 8px; }
%%S%%.f-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:28px; }
%%S%%.f-blurb{ margin:14px 0 0; max-width:30ch; font:400 14px/1.6 var(--n-font-sans); color:var(--n-body); }
%%S%%.totop svg{ transform:rotate(-90deg); }`].filter(Boolean),
      js: [...(v.A4 === 'm-19' ? ['JS_REVEAL'] : []), ...(v.opts.totop ? ['JS_TOTOP'] : []), 'JS_VIS'],
      mobile: v.mobile,
    };
  },
};
