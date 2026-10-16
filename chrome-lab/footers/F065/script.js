/* Nestlancer chrome F065 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='F065';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

q('[data-count-to]').forEach(function(el){
  if(reduced())return;
  var done=false;
  function run(){
    if(done)return;done=true;
    var to=parseFloat(el.getAttribute('data-count-to'))||0,t0=performance.now();
    (function step(t){
      var p=Math.min(1,(t-t0)/1200),e=1-Math.pow(1-p,4);
      el.textContent=Math.round(to*e).toLocaleString('en-IN');
      if(p<1)requestAnimationFrame(step);
    })(t0);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run();io.disconnect();}});},{threshold:.4});
    io.observe(el);
  }else run();
});

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
