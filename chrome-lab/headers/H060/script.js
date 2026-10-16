/* Nestlancer chrome H060 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='H060';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

var pal=root.querySelector('[data-palette]');
if(pal){
  function openPal(o){
    pal.setAttribute('data-open',o?'true':'false');
    if(o){var i=pal.querySelector('input');if(i)i.focus();}
  }
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPal(pal.getAttribute('data-open')!=='true');}
    if(e.key==='Escape'&&pal.getAttribute('data-open')==='true'){openPal(false);var t=root.querySelector('[data-palette-trigger]');if(t)t.focus();}
  });
  q('[data-palette-trigger]').forEach(function(b){b.addEventListener('click',function(){openPal(pal.getAttribute('data-open')!=='true');});});
  pal.addEventListener('click',function(e){if(e.target===pal)openPal(false);});
}

q('[data-theme-toggle]').forEach(function(btn){
  btn.addEventListener('click',function(){
    var cur=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    function apply(){
      document.documentElement.setAttribute('data-theme',cur);
      root.setAttribute('data-theme',cur);
      btn.setAttribute('aria-pressed',cur==='dark'?'true':'false');
    }
    if(document.startViewTransition&&!reduced())document.startViewTransition(apply);
    else apply();
  });
});

var lastY=window.scrollY;
function onScroll(){
  var y=window.scrollY;
  if(y>24)root.setAttribute('data-scrolled','true');else root.setAttribute('data-scrolled','false');
  if(y>120)root.setAttribute('data-solid','true');else root.setAttribute('data-solid','false');
  if(y>lastY+6&&y>160)root.setAttribute('data-hide','true');
  else if(y<lastY-6)root.setAttribute('data-hide','false');
  lastY=y;
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
