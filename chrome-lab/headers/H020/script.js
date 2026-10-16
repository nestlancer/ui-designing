/* Nestlancer chrome H020 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='H020';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
q('[data-disclosure]').forEach(function(btn){
  var t=root.querySelector('#'+btn.getAttribute('aria-controls'));
  if(!t)return;
  function set(open){
    btn.setAttribute('aria-expanded',open?'true':'false');
    t.setAttribute('data-open',open?'true':'false');
    root.setAttribute('data-nav-open',open?'true':'false');
    if(open){var f=t.querySelector('a,button,input');if(f)f.focus();}
    else{btn.focus();}
  }
  btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
  t.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);}
  });
});

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
