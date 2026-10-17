/* Nestlancer chrome F012 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='F012';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

q('form[data-morph]').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var b=f.querySelector('button');
    if(b){b.setAttribute('data-done','true');b.textContent='Subscribed';}
    var i=f.querySelector('input');if(i)i.disabled=true;
  });
});

q('[data-reveal]').forEach(function(el){
  if(!('IntersectionObserver' in window)||reduced()){el.setAttribute('data-in','true');return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.setAttribute('data-in','true');io.unobserve(x.target);}});},{threshold:.15});
  io.observe(el);
});

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
