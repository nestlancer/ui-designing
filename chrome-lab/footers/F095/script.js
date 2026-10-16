/* Nestlancer chrome F095 — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='F095';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);

var tt=root.querySelector('[data-totop]');
if(tt){
  window.addEventListener('scroll',function(){
    tt.setAttribute('data-show',window.scrollY>window.innerHeight*.6?'true':'false');
  },{passive:true});
  tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduced()?'auto':'smooth'});});
}

document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
})();
