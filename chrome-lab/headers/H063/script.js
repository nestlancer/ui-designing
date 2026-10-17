/* Nestlancer chrome H063 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='H063';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

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

var rot=root.querySelector('[data-rotate]');
if(rot&&!reduced()){
  var words=(rot.getAttribute('data-rotate')||'').split('|').filter(Boolean),wi=0;
  if(words.length>1)setInterval(function(){
    wi=(wi+1)%words.length;
    rot.setAttribute('data-flip','true');
    setTimeout(function(){rot.textContent=words[wi];rot.setAttribute('data-flip','false');},200);
  },4000);
}

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
