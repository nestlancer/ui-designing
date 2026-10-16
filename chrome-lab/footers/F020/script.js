/* Nestlancer chrome F020 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='F020';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

if(!reduced()){
  q('[data-magnet]').forEach(function(el){
    var raf=0;
    el.addEventListener('pointermove',function(e){
      if(raf)return;
      raf=requestAnimationFrame(function(){
        raf=0;
        var r=el.getBoundingClientRect();
        var dx=Math.max(-6,Math.min(6,(e.clientX-(r.left+r.width/2))/3));
        var dy=Math.max(-6,Math.min(6,(e.clientY-(r.top+r.height/2))/3));
        el.style.transform='translate('+dx+'px,'+dy+'px)';
      });
    });
    el.addEventListener('pointerleave',function(){el.style.transform='';});
    el.addEventListener('pointerdown',function(){el.style.transform='scale(.98)';});
    el.addEventListener('pointerup',function(){el.style.transform='';});
  });
}

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
