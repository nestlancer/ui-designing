/* A7 surface skins (§5.0) — compose §2.2 tokens only. Every family locks one;
   neighbouring families must differ. The skin must be REAL CSS, not a comment. */

export const SKINS = [
  'solid-canvas', 'glass-hairline', 'ink-band', 'tint-wash', 'mesh-zone',
  'elevated-soft', 'editorial-rules', 'dual-surface', 'invert-chrome', 'pill-float',
];

export const SKIN_NOTES = {
  'solid-canvas': 'flat --n-surface bar/footer + 1px --n-hairline, repo baseline discipline',
  'glass-hairline': 'color-mix translucent surface + blur 14px + hairline + soft shadow, @supports opaque fallback',
  'ink-band': '--n-ink utility band with light text; main row stays surface',
  'tint-wash': '--n-bg-tint-1 / --n-mint wash behind the chrome; teal-soft chip accents',
  'mesh-zone': '--n-mesh-1 → --n-mesh-2 gradient panel composition',
  'elevated-soft': 'solid surface + soft elevation shadow 0 8px 28px rgba(10,37,67,.10), no heavy border',
  'editorial-rules': 'canvas/transparent bg, typographic weight + double hairline rules only',
  'dual-surface': 'two stacked surfaces: utility strip different fill from main row / links band vs legal band',
  'invert-chrome': 'dark-token surfaces even on light pages (rare headers, natural footer close)',
  'pill-float': 'chrome is a floating rounded container inset from the viewport edge',
};

const GLASS_SUPPORT = `
@supports (backdrop-filter: blur(2px)){
  %%S%%.h-bar, %%S%%.f-chrome{
    background: color-mix(in oklab, var(--n-surface) 72%, transparent);
    -webkit-backdrop-filter: blur(14px) saturate(1.4);
    backdrop-filter: blur(14px) saturate(1.4);
  }
}
@supports not (backdrop-filter: blur(2px)){
  %%S%%.h-bar, %%S%%.f-chrome{ background: var(--n-surface); }
}`;

export function skinCSS(skin, kind) {
  const S = '%%S%%';
  switch (skin) {
    case 'solid-canvas':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: var(--n-surface);
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}
${kind === 'footer' ? `${S}.f-chrome{ border-bottom: 0; border-top: var(--n-hairline-w) solid var(--n-hairline); }` : ''}`;

    case 'glass-hairline':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: color-mix(in oklab, var(--n-surface) 72%, transparent);
  border-bottom: var(--n-hairline-w) solid color-mix(in oklab, var(--n-hairline) 80%, transparent);
  box-shadow: 0 12px 32px rgba(10, 37, 67, .08);
}
${GLASS_SUPPORT.replaceAll('%%S%%', S)}`;

    case 'ink-band':
      return `${S}${kind === 'header' ? '.h-util' : '.f-top'}{
  background: var(--n-ink);
  color: var(--n-on-ink);
}
${S}${kind === 'header' ? '.h-util' : '.f-top'} a{ color: var(--n-on-ink); }
${S}${kind === 'header' ? '.h-util' : '.f-top'} .nl-eyebrow{ color: var(--n-on-ink-3); }
${S}${kind === 'header' ? '.h-bar' : '.f-main'}{
  background: var(--n-surface);
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}
${kind === 'footer' ? `${S}.f-chrome{ background: var(--n-surface); border-top: var(--n-hairline-w) solid var(--n-hairline); }` : ''}`;

    case 'tint-wash':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: linear-gradient(180deg, var(--n-bg-tint-1), var(--n-bg-tint-2));
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}
${kind === 'footer' ? `${S}.f-chrome{ border-bottom: 0; border-top: var(--n-hairline-w) solid var(--n-hairline); }
${S}.f-chrome .fcol{ background: var(--n-mint); border-radius: var(--n-radius-card); padding: 12px 14px; }` : ''}`;

    case 'mesh-zone':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background:
    radial-gradient(120% 160% at 12% -40%, var(--n-mesh-1), transparent 60%),
    radial-gradient(120% 160% at 88% -30%, var(--n-mesh-2), transparent 55%),
    var(--n-surface);
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}
${kind === 'footer' ? `${S}.f-chrome{ border-bottom: 0; border-top: var(--n-hairline-w) solid var(--n-hairline); }` : ''}`;

    case 'elevated-soft':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: var(--n-surface);
  box-shadow: 0 8px 28px rgba(10, 37, 67, .10);
  border-bottom: var(--n-hairline-w) solid transparent;
}
${kind === 'footer' ? `${S}.f-chrome{ border-bottom: 0; border-top: 0; box-shadow: 0 -8px 28px rgba(10, 37, 67, .08); }` : ''}`;

    case 'editorial-rules':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: var(--n-bg);
  border-bottom: 0;
  box-shadow:
    inset 0 -1px 0 var(--n-hairline),
    inset 0 -3px 0 var(--n-bg),
    inset 0 -4px 0 var(--n-hairline);
}
${kind === 'footer' ? `${S}.f-chrome{ border-bottom: 0; box-shadow: inset 0 1px 0 var(--n-hairline), inset 0 3px 0 var(--n-bg), inset 0 4px 0 var(--n-hairline); }
${S}.f-legal{ border-top: 0; box-shadow: inset 0 1px 0 var(--n-hairline); }` : ''}`;

    case 'dual-surface':
      return kind === 'header'
        ? `${S}.h-util{
  background: var(--n-surface-2);
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}
${S}.h-bar{
  background: var(--n-surface);
  border-bottom: var(--n-hairline-w) solid var(--n-hairline);
}`
        : `${S}.f-main{
  background: var(--n-surface);
}
${S}.f-legal{
  background: var(--n-bg-tint-1);
  border-top: var(--n-hairline-w) solid var(--n-hairline);
}
${S}.f-chrome{ background: var(--n-surface); border-top: var(--n-hairline-w) solid var(--n-hairline); }`;

    case 'invert-chrome':
      return `${S}${kind === 'header' ? '.h-bar' : '.f-chrome'}{
  background: var(--n-ink);
  color: var(--n-on-ink);
  border-bottom: var(--n-hairline-w) solid rgba(255, 255, 255, .08);
}
${S}${kind === 'header' ? '.h-bar' : '.f-chrome'} .wm__txt{ color: var(--n-white); }
${S}${kind === 'header' ? '.h-bar' : '.f-chrome'} .nav__link{ color: var(--n-on-ink-2); }
${S}${kind === 'header' ? '.h-bar' : '.f-chrome'} .nav__link:hover,
${S}${kind === 'header' ? '.h-bar' : '.f-chrome'} .nav__link.is-current{ color: var(--n-white); }
${S}${kind === 'header' ? '.h-bar' : '.f-chrome'} .nl-eyebrow{ color: var(--n-on-ink-3); }
${kind === 'footer' ? `${S}.f-chrome .fcol__link{ color: var(--n-on-ink-2); }
${S}.f-chrome .fcol__link:hover{ color: var(--n-teal-glow); }
${S}.f-legal{ border-top: 1px solid rgba(255,255,255,.08); color: var(--n-on-ink-3); }` : ''}`;

    case 'pill-float':
      return `${S}${kind === 'header' ? '.h-chrome' : '.f-chrome'}{
  padding: 12px 16px 0;
}
${S}${kind === 'header' ? '.h-bar' : '.f-inner'}{
  background: var(--n-surface);
  border: var(--n-hairline-w) solid var(--n-hairline);
  border-radius: ${kind === 'header' ? 'var(--n-radius-pill)' : 'var(--n-radius-card)'};
  box-shadow: 0 10px 30px rgba(10, 37, 67, .10);
}
${kind === 'footer' ? `${S}.f-chrome{ background: var(--n-bg); border-top: 0; }
${S}.f-legal{ border-top: 0; }` : `${S}.h-chrome{ background: transparent; border-bottom: 0; }`}`;

    default:
      return '';
  }
}
