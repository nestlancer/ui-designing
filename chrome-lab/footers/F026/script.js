/* Nestlancer chrome F026 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='F026';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

q('[data-acc]').forEach(function(btn){
  var p=root.querySelector('#'+btn.getAttribute('aria-controls'));
  if(!p)return;
  btn.addEventListener('click',function(){
    var o=btn.getAttribute('aria-expanded')!=='true';
    btn.setAttribute('aria-expanded',o?'true':'false');
    p.setAttribute('data-open',o?'true':'false');
  });
});

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
