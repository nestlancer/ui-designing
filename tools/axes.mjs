/**
 * axes.mjs — 6-axis vocabulary + solver
 * Two variants are different TYPES only if they differ on >=3 of the 6 axes (§5.0).
 * The solver assigns axis values per variant so that:
 *   (a) every pair of the 200 variants differs on >=3 axes          -> gate G1
 *   (b) no motion primitive repeats inside a family                 -> gate G1
 *   (c) family-defining semantics stay locked (honest meta)         -> gate G8/G11
 */
export const A1 = ['full-bleed','1200 contained','floating pill inset 16','split 50/50','asymmetric 8/4','docked edge rail'];
export const A2 = ['inline','dropdown','mega-panel','fullscreen overlay','drawer','bottom tab bar','segmented','breadcrumb row','search-first','command palette'];
export const A3 = ['static','sticky','sticky-shrink','auto-hide','transparent→solid','progress-linked','pinned-then-release'];
export const A5 = ['hover','click','keyboard-first','hover-intent 120ms','always-visible','accordion'];
export const A6 = ['teal pill','outline pill','split-arrow pill','ghost text','dual equal CTA','gradient edge','icon-only','sticky mobile bar'];

// motion ids usable inside header chrome / footer chrome
export const HEADER_MOTIONS = ['m-01','m-02','m-03','m-04','m-05','m-06','m-07','m-08','m-09','m-10','m-11','m-12','m-13','m-14','m-15','m-16','m-17','m-18','m-21','m-23','m-25','m-26','m-28','m-29','m-30','m-32','m-33','m-35','m-36'];
export const FOOTER_MOTIONS = ['m-12','m-16','m-19','m-20','m-21','m-22','m-23','m-24','m-25','m-26','m-27','m-28','m-31','m-32','m-33','m-34'];

export const AXIS_KEYS = ['A1','A2','A3','A4','A5','A6'];

export function diff(a, b) {
  let d = 0;
  for (const k of AXIS_KEYS) if (a[k] !== b[k]) d++;
  return d;
}

function combos(pools, order) {
  // deterministic cartesian product, first pool varies fastest
  let out = [{}];
  for (const key of order) {
    const vals = pools[key];
    const next = [];
    for (const base of out) for (const v of vals) next.push({ ...base, [key]: v });
    out = next;
  }
  return out;
}

/**
 * assignAxes(items, opts)
 * items: [{id, type, family, lock:{axis:value}, pools:{axis:[values]}, familyIndex, indexInFamily}]
 */
export function assignAxes(items) {
  const assigned = [];
  const familyMotions = new Map(); // family -> Set

  for (const it of items) {
    const lock = it.lock || {};
    const keys = AXIS_KEYS.filter(k => !(k in lock));
    // candidate pools: rotate each free axis pool by familyIndex + indexInFamily so
    // families do not all start on the same value (kills accidental clones)
    const rotated = {};
    const offset = (it.familyIndex * 3 + it.indexInFamily) % 7;
    for (const k of keys) {
      const pool = it.pools[k];
      rotated[k] = pool.map((_, i) => pool[(i + offset) % pool.length]);
    }
    // order: A2, A1, A3, A6, A5 then A4 (motions are the largest pool -> last)
    const order = ['A2', 'A1', 'A3', 'A6', 'A5', 'A4'].filter(k => keys.includes(k));
    const candidates = combos(rotated, order);
    const usedMotions = familyMotions.get(it.family) || new Set();

    let pick = null, best = null, bestDiff = -1;
    for (const cand of candidates) {
      const full = { ...it.lock, ...cand };
      if (!full.A4) continue;
      if (usedMotions.has(full.A4)) continue;
      let ok = true, minDiff = 99;
      for (const prev of assigned) {
        const d = diff(full, prev.axes);
        if (d < minDiff) minDiff = d;
        if (d < 3) { ok = false; break; }
      }
      if (ok) { pick = full; break; }
      if (minDiff > bestDiff) { bestDiff = minDiff; best = full; } // fallback (should not be needed)
    }
    if (!pick) { pick = best; if (best) best.__fallback = true; } // safety valve: QA gate reports it
    usedMotions.add(pick.A4);
    familyMotions.set(it.family, usedMotions);
    assigned.push({ ...it, axes: pick });
  }
  return assigned;
}
