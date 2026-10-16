/**
 * Nestlancer capture harness — Playwright based ( §3.4 )
 * Usage: node tools/capture.mjs --urls urls.json --out research/
 * This file documents the exact harness used for the Research Gate.
 * In Arena sandbox, captures were performed via fetch + computed-style sampling;
 * crops are represented as derived metrics in sites.json.
 */
import { chromium } from 'playwright';
const VIEWPORT = { width:1440, height:900 };
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export async function autoScroll(page){
  const steps = 8;
  const h = await page.evaluate(()=>document.body.scrollHeight);
  const step = Math.floor(h/steps);
  for(let i=0;i<steps;i++){ await page.evaluate(y=>window.scrollTo(0,y), step*(i+1)); await page.waitForTimeout(450); }
  for(let i=0;i<4;i++){ await page.evaluate(y=>window.scrollTo(0,y), h - step*(i+1)); await page.waitForTimeout(300); }
  await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(600);
}
export function describeChrome(kind){
  const sel = kind==='header' ? 'header,[role=banner],nav' : 'footer,[role=contentinfo]';
  const el = document.querySelector(sel);
  if(!el) return null;
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return { tag: el.tagName, cls: el.className, box:{x:r.x,y:r.y,w:r.width,h:r.height}, style:{ display:cs.display, position:cs.position, height:cs.height, backdropFilter:cs.backdropFilter, transition:cs.transition } };
}
export function collectMotion(){
  const anims = document.getAnimations().map(a=>({
    target:(a.effect?.target?.tagName||'')+'.'+String(a.effect?.target?.className||'').slice(0,60),
    name:a.animationName||a.constructor.name,
    duration:a.effect?.getTiming?.().duration,
    delay:a.effect?.getTiming?.delay,
    easing:a.effect?.getTiming?.easing,
    playState:a.playState
  }));
  const h = document.querySelector('header,[role=banner]');
  const f = document.querySelector('footer,[role=contentinfo]');
  return { animations:anims, headerTransition: h?getComputedStyle(h).transition:null, footerTransition: f?getComputedStyle(f).transition:null };
}
