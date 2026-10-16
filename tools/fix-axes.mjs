#!/usr/bin/env node
/* Axis solver for G1 (pairwise ≥3 of 7 axes, ≥1 of A1/A2/A3/A7).
   Mutates ONLY the A1/A3/A4/A5/A6 values in tools/lib/variants.mjs
   (A2 + A7 stay family-locked). Greedy repair + annealing. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HEADER_FAMILIES, FOOTER_FAMILIES } from './lib/variants.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const AXES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
const MUT = ['A1', 'A3', 'A4', 'A5', 'A6'];
const UNIQ = new Set(['A1', 'A2', 'A3', 'A7']);

function collect(fams, type) {
  const list = [];
  for (const fam of fams) {
    for (let i = 0; i < fam.variants.length; i++) {
      const v = fam.variants[i];
      list.push({
        type, fam: fam.n, idx: i,
        axes: { A1: v.A1, A2: fam.A2, A3: v.A3, A4: v.A4, A5: v.A5, A6: v.A6, A7: fam.skin },
      });
    }
  }
  return list;
}
const H = collect(HEADER_FAMILIES, 'header');
const F = collect(FOOTER_FAMILIES, 'footer');

const vocab = {};
for (const a of MUT) {
  vocab[a] = [...new Set([...H, ...F].map(x => x.axes[a]))];
}

function pairOK(a, b) {
  let n = 0, uniq = false;
  for (const k of AXES) if (a.axes[k] !== b.axes[k]) { n++; if (UNIQ.has(k)) uniq = true; }
  return n >= 3 && uniq;
}

function violationsOf(list) {
  const bad = [];
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      if (!pairOK(list[i], list[j])) bad.push([i, j]);
  return bad;
}

function solve(list, label) {
  let bestScore = violationsOf(list).length;
  let bestSnapshot = list.map(x => ({ ...x.axes }));
  if (bestScore === 0) { console.log(`${label}: already unique`); return true; }
  let temp = 4;
  for (let iter = 0; iter < 400000 && bestScore > 0; iter++) {
    const bad = violationsOf(list);
    const [i, j] = bad[Math.floor(Math.random() * bad.length)];
    const flip = Math.random() < 0.5 ? i : j;
    const axis = MUT[Math.floor(Math.random() * MUT.length)];
    const vals = vocab[axis];
    const old = list[flip].axes[axis];
    let changed = false;
    // try candidates that reduce involving-violations, prefer unused values
    const shuffled = vals.filter(x => x !== old).sort(() => Math.random() - 0.5);
    let before = 0;
    for (let k = 0; k < list.length; k++) if (k !== flip && !pairOK(list[flip], list[k])) before++;
    for (const cand of shuffled) {
      list[flip].axes[axis] = cand;
      let after = 0;
      for (let k = 0; k < list.length; k++) if (k !== flip && !pairOK(list[flip], list[k])) after++;
      if (after < before || (temp > 0.05 && Math.random() < 0.02)) { changed = true; break; }
    }
    if (!changed) list[flip].axes[axis] = old;
    const score = violationsOf(list).length;
    if (score < bestScore) {
      bestScore = score;
      bestSnapshot = list.map(x => ({ ...x.axes }));
      if (bestScore % 20 === 0) console.log(`${label}: ${bestScore} violating pairs left (iter ${iter})`);
    } else if (Math.random() < 0.02) {
      // revert to best known occasionally
      for (let k = 0; k < list.length; k++) Object.assign(list[k].axes, bestSnapshot[k]);
    }
    temp *= 0.99995;
  }
  if (bestScore > 0) {
    for (let k = 0; k < list.length; k++) Object.assign(list[k].axes, bestSnapshot[k]);
  }
  console.log(`${label}: final ${bestScore} violating pairs`);
  return bestScore === 0;
}

const okH = solve(H, 'headers');
const okF = solve(F, 'footers');
if (!okH || !okF) { console.error('SOLVER FAILED — variants.mjs untouched'); process.exit(1); }

/* ---- rewrite tools/lib/variants.mjs axis fields in place ---- */
const file = join(root, 'tools/lib/variants.mjs');
let text = readFileSync(file, 'utf8');
const lines = text.split('\n');
const solved = [...H, ...F];
let cursor = 0;
const lineRe = /^(\s*\{ )A1: '([^']+)', A3: '([^']+)', A4: '([^']+)', A5: '([^']+)', A6: '([^']+)',( mobile: '[^']+', sig: ')([^']*)('.*)$/;
for (let li = 0; li < lines.length; li++) {
  const m = lines[li].match(lineRe);
  if (!m) continue;
  const s = solved[cursor++];
  const sig = /^m-/.test(m[8]) ? (m[8].replace(/^m-[\w]+/, s.axes.A4)) : m[8];
  lines[li] = `${m[1]}A1: '${s.axes.A1}', A3: '${s.axes.A3}', A4: '${s.axes.A4}', A5: '${s.axes.A5}', A6: '${s.axes.A6}',${m[7]}${sig}${m[9]}`;
}
console.log(`rewrote ${cursor} variant tuples invariants.mjs`);
if (cursor !== solved.length) { console.error(`MISMATCH: ${cursor} lines vs ${solved.length} solved`); process.exit(1); }
writeFileSync(file, lines.join('\n'));
console.log('variants.mjs updated');
