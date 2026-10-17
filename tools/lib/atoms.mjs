/* Shared HTML atoms + locked copy bank (§2.4). Recreate wordmark as inline SVG —
   never import the real logo, never trace a competitor mark. */

export const COPY = {
  wordmark: 'Nestlancer',
  blurb: 'Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.',
  nav: ['Product', 'Portfolio', 'Blog', 'About', 'Pricing', 'Services', 'Contact'],
  navRoutes: { Product: '/product', Portfolio: '/portfolio', Blog: '/blog', About: '/about', Pricing: '/pricing', Services: '/services', Contact: '/contact' },
  signIn: 'Sign in',
  startCta: 'Start a project',
  intake: 'Intake open',
  portalLive: 'Client portal · live',
  figPortal: 'FIG · PORTAL',
  legal: '© 2026 Nestlancer. Made in India. All rights reserved.',
  footerCols: {
    PRODUCT: [['Project Hub', '/portal'], ['Pricing', '/pricing'], ['Services', '/services'], ['Portfolio', '/portfolio']],
    COMPANY: [['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact'], ['Start a project', '/contact']],
    LEGAL: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Verify document', '/verify']],
  },
  eyebrows: { work: 'FIG · WORK', portal: 'FIG · PORTAL', start: 'FIG · START', product: 'PRODUCT', company: 'COMPANY', legal: 'LEGAL' },
  proof: { payments: '₹4,28,500', milestone: '₹4.2L', payout: 'Payouts cleared 1/3' },
  ticker: ['FINTECH', 'E-COMMERCE', 'SaaS', 'B2B PORTALS', 'MOBILE APPS', 'DESIGN SYSTEMS', 'MARKETPLACES', 'HEALTHCARE'],
  portfolio: ['FintelPayments Hub', 'SaaS Analytics Platform', 'E-Commerce Mobile App', 'HealthTech'],
  ctaChecks: ['Reply under 2m', 'Fixed-price quotes', 'No subscriptions', 'Milestone-based'],
};

export function glyph(cls = 'wm__g') {
  return `<svg class="${cls}" width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M6 22c4-1 7-4 9-8 1 3 3 5 6 6-3 2-6 3-9 3-2 0-4 0-6-1z" style="fill:var(--n-teal-deep)"/><path d="M15 14c2-4 5-7 9-8-1 4-2 7-5 9-1 1-3 1-4-1z" style="fill:var(--n-ink)"/></svg>`;
}

export function wordmark(extra = '') {
  return `<a class="wm ${extra}" href="/" aria-label="Nestlancer home">${glyph()}<span class="wm__txt">Nestlancer<span class="wm__dot">.</span></span></a>`;
}

export function icon(name) {
  const s = 'aria-hidden="true" focusable="false"';
  switch (name) {
    case 'sun': return `<svg ${s} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
    case 'moon': return `<svg ${s} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/></svg>`;
    case 'search': return `<svg ${s} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/></svg>`;
    case 'arrow': return `<svg ${s} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>`;
    case 'chevron': return `<svg ${s} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>`;
    case 'globe': return `<svg ${s} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>`;
    case 'check': return `<svg ${s} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg>`;
    case 'bolt': return `<svg ${s} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>`;
    case 'menu': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`;
    case 'close': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>`;
    case 'user': return `<svg ${s} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>`;
    case 'home': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 11 8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>`;
    case 'grid': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>`;
    case 'folder': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
    case 'doc': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h6m-6 4h6"/></svg>`;
    case 'dots': return `<svg ${s} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>`;
    default: return '';
  }
}

export function themeToggle(cls = 'th') {
  return `<button type="button" class="${cls}" data-theme-toggle aria-pressed="false" aria-label="Toggle color theme"><span class="${cls}__i">${icon('sun')}</span></button>`;
}

export function burger(id, cls = 'burger') {
  return `<button type="button" class="${cls}" data-disclosure aria-expanded="false" aria-controls="${id}" aria-label="Open menu"><span class="${cls}__b"></span><span class="${cls}__b"></span><span class="${cls}__b"></span></button>`;
}

export function cta(kind = 'teal-pill', label = COPY.startCta, cls = 'cta') {
  switch (kind) {
    case 'outline-pill': return `<a class="${cls} ${cls}--outline" href="/contact">${label}</a>`;
    case 'split-arrow-pill': return `<a class="${cls} ${cls}--split" href="/contact"><span>${label}</span>${icon('arrow')}</a>`;
    case 'ghost-text': return `<a class="${cls} ${cls}--ghosttext" href="/contact">${label}</a>`;
    case 'dual-equal': return `<a class="${cls} ${cls}--dual" href="/login">${COPY.signIn}</a><a class="${cls} ${cls}--dual ${cls}--dual-b" href="/contact">${label}</a>`;
    case 'gradient-edge': return `<a class="${cls} ${cls}--grad" href="/contact">${label}</a>`;
    case 'icon-only': return `<a class="${cls} ${cls}--icon" href="/contact" aria-label="${label}">${icon('arrow')}</a>`;
    case 'sticky-mobile-bar': return `<a class="${cls}" href="/contact">${label}</a>`;
    default: return `<a class="${cls}" href="/contact">${label}</a>`;
  }
}

export function navList(mods = '') {
  return `<ul class="nav__list ${mods}">` + COPY.nav.map((n, i) =>
    `<li class="nav__item"><a class="nav__link${i === 0 ? ' is-current' : ''}" href="${COPY.navRoutes[n]}"${i === 0 ? ' aria-current="page"' : ''}>${n}</a></li>`).join('') + '</ul>';
}

export function navListWithDropdown() {
  return `<ul class="nav__list nav__list--dd">` + COPY.nav.map((n, i) => {
    if (i > 2) return `<li class="nav__item"><a class="nav__link" href="${COPY.navRoutes[n]}">${n}</a></li>`;
    const panelId = 'dd-' + n.toLowerCase();
    return `<li class="nav__item nav__item--dd">
      <button type="button" class="nav__link nav__dd-btn" data-disclosure aria-expanded="false" aria-controls="${panelId}">${n}${icon('chevron')}</button>
      <div class="dd" id="${panelId}" data-open="false">
        <div class="dd__col"><p class="nl-eyebrow">${COPY.eyebrows.product}</p>
          <a href="/product">Project Hub</a><a href="/pricing">Pricing</a><a href="/services">Services</a></div>
        <div class="dd__col"><p class="nl-eyebrow">${COPY.eyebrows.work}</p>
          <a href="/portfolio">Portfolio</a><a href="/blog">Blog</a><a href="/about">About</a></div>
        <div class="dd__tile"><p class="nl-eyebrow">${COPY.figPortal}</p><p class="dd__tile-t">${COPY.portalLive}</p></div>
      </div></li>`;
  }).join('') + '</ul>';
}

export function statusPill(label = COPY.intake, cls = 'pill') {
  return `<span class="${cls}"><span class="nl-dot"></span>${label}</span>`;
}

export function eyebrow(text, cls = 'nl-eyebrow') {
  return `<p class="${cls}">${text}</p>`;
}

export function tickerRow(cls = 'ticker') {
  const items = COPY.ticker.slice(0, 4).map(t => `<span class="${cls}__t">${t}</span>`).join('<span class="${cls}__sep" aria-hidden="true">·</span>');
  return `<div class="${cls}" aria-label="Industries served"><div class="${cls}__row">${items}<span class="${cls}__sep" aria-hidden="true">·</span>${items}</div></div>`;
}

export function footerLinksCol(title, links, cls = 'fcol') {
  return `<div class="${cls}">${eyebrow(title, 'fcol__h')}<ul class="${cls}__list">${links.map(([t, r]) => `<li><a class="${cls}__link" href="${r}">${t}</a></li>`).join('')}</ul></div>`;
}

export function legalLine(cls = 'legal') {
  return `<p class="${cls}__line nl-num">${COPY.legal}</p>`;
}

export function socialRow(cls = 'soc') {
  const labels = ['X', 'in', 'gh', 'yt', 'ig'];
  return `<ul class="${cls}">` + labels.map((l, i) =>
    `<li><a class="${cls}__a" href="#" aria-label="Nestlancer on ${l}"><span aria-hidden="true">${l}</span></a></li>`).join('') + '</ul>';
}

export function searchBox(cls = 'search') {
  return `<form class="${cls}" role="search" action="/search"><label class="nl-vh" for="q-${cls}">Search Nestlancer</label><span class="${cls}__i">${icon('search')}</span><input id="q-${cls}" class="${cls}__in" type="search" name="q" placeholder="Search the Project Hub…" autocomplete="off"/></form>`;
}

export function demoShell(cfg) {
  const chips = Object.entries(cfg.axes).map(([k, v]) => `<li><b>${k}</b> ${v}</li>`).join('');
  return `<main id="main" class="nl-demo${cfg.type === 'footer' ? ' nl-demo--footer' : ''}">
    ${eyebrow(cfg.type === 'header' ? 'NESTLANCER · HEADER LAB' : 'NESTLANCER · FOOTER LAB', 'nl-demo__eyebrow')}
    <h1>${cfg.id} — ${cfg.familyName}</h1>
    <p class="nl-demo__sub">${cfg.familySig}. Signature motion: <strong>${cfg.signature}</strong>. Drop-in mount below; scroll the placeholders to see scroll behaviour.</p>
    <div class="nl-demo__grid">
      <section class="nl-demo__card"><h2>Mount API</h2>
        <pre>&lt;${cfg.type} data-chrome="${cfg.id}" data-theme="dark" data-page="pricing"&gt;&lt;/${cfg.type}&gt;</pre>
        <ul class="nl-chips">${chips}</ul>
      </section>
      <section class="nl-demo__card"><h2>A7 surface skin</h2>
        <p><strong>${cfg.A7}</strong> — ${cfg.skinNotes}</p>
        <h2>References</h2>
        <p>${cfg.refs.map(r => '<code>' + r + '</code>').join(' · ')}</p>
      </section>
    </div>
    <div class="nl-block"><h3>Scroll placeholder — surface rhythm</h3><p>Fixed-price quotes, Razorpay milestones, live Project Hub. This block keeps the page tall enough for sticky, hide-on-scroll, and progress behaviours to show their thresholds.</p><p>${COPY.blurb}</p></div>
    <div class="nl-block"><h3>Scroll placeholder — milestone truth</h3><p class="nl-num">${COPY.proof.payments} payments · ${COPY.proof.milestone} milestone · ${COPY.proof.payout}</p><p>${COPY.ctaChecks.join(' · ')}</p></div>
    <div class="nl-block"><h3>Scroll placeholder — work</h3><p>${COPY.portfolio.join(' · ')}</p></div>
  </main>`;
}

export function pageHead(cfg) {
  return `<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${cfg.id} — ${cfg.familyName} · Nestlancer Chrome Lab</title>
<meta name="color-scheme" content="light dark"/>
<script id="theme-boot">(()=>{try{const q=new URLSearchParams(location.search);const t=q.get('theme');document.documentElement.dataset.theme=(t==='light')?'light':'dark';}catch(_){document.documentElement.dataset.theme='dark';}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"/>
`;
}
