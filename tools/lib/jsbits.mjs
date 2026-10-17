/* Per-variant script.js building blocks. Every variant's script.js is composed
   ONLY from the blocks its chrome needs (§5.6 ≤12KB gz; works with JS off). */

export const JS_HEAD = `/* Nestlancer chrome ${'${id}'} — progressive enhancement. Page works with JS off. */
(function(){
'use strict';
var ID='${'${id}'}';
var root=document.querySelector('[data-chrome="'+ID+'"]');
if(!root)return;
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
function reduced(){return mq.matches;}
function q(s){return Array.prototype.slice.call(root.querySelectorAll(s));}
var docTheme=document.documentElement.getAttribute('data-theme');
if(docTheme)root.setAttribute('data-theme',docTheme);
`;

export const JS_TAIL = `})();
`;

export const JS_DISCLOSE = `
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
`;

export const JS_THEME = `
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
`;

export const JS_SCROLL = `
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
`;

export const JS_PROGRESS = `
function onProg(){
  var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
  root.style.setProperty('--scroll-p',String(Math.min(1,window.scrollY/max)));
}
window.addEventListener('scroll',onProg,{passive:true});
onProg();
`;

export const JS_ANNOUNCE = `
var ann=root.querySelector('[data-announce]');
if(ann){
  var key='nl-announce-'+ID;
  try{if(localStorage.getItem(key)==='off')ann.setAttribute('data-dismissed','true');}catch(e){}
  var c=ann.querySelector('[data-announce-close]');
  if(c)c.addEventListener('click',function(){
    ann.setAttribute('data-dismissed','true');
    try{localStorage.setItem(key,'off');}catch(e){}
  });
}
`;

export const JS_PALETTE = `
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
`;

export const JS_COUNT = `
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
`;

export const JS_REVEAL = `
q('[data-reveal]').forEach(function(el){
  if(!('IntersectionObserver' in window)||reduced()){el.setAttribute('data-in','true');return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.setAttribute('data-in','true');io.unobserve(x.target);}});},{threshold:.15});
  io.observe(el);
});
`;

export const JS_TOTOP = `
var tt=root.querySelector('[data-totop]');
if(tt){
  window.addEventListener('scroll',function(){
    tt.setAttribute('data-show',window.scrollY>window.innerHeight*.6?'true':'false');
  },{passive:true});
  tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduced()?'auto':'smooth'});});
}
`;

export const JS_MORPH = `
q('form[data-morph]').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var b=f.querySelector('button');
    if(b){b.setAttribute('data-done','true');b.textContent='Subscribed';}
    var i=f.querySelector('input');if(i)i.disabled=true;
  });
});
`;

export const JS_ACC = `
q('[data-acc]').forEach(function(btn){
  var p=root.querySelector('#'+btn.getAttribute('aria-controls'));
  if(!p)return;
  btn.addEventListener('click',function(){
    var o=btn.getAttribute('aria-expanded')!=='true';
    btn.setAttribute('aria-expanded',o?'true':'false');
    p.setAttribute('data-open',o?'true':'false');
  });
});
`;

export const JS_SEG = `
var seg=root.querySelector('[data-seg]');
if(seg){
  var thumb=seg.querySelector('.seg__thumb');
  var items=q('[role="tab"]');
  function move(i){
    items.forEach(function(it,j){it.setAttribute('aria-selected',j===i?'true':'false');it.tabIndex=j===i?0:-1;});
    if(thumb&&items[i]){thumb.style.transform='translateX('+items[i].offsetLeft+'px)';thumb.style.width=items[i].offsetWidth+'px';}
  }
  items.forEach(function(it,i){it.addEventListener('click',function(){move(i);});});
  if(items.length)requestAnimationFrame(function(){move(0);});
}
`;

export const JS_ROTATE = `
var rot=root.querySelector('[data-rotate]');
if(rot&&!reduced()){
  var words=(rot.getAttribute('data-rotate')||'').split('|').filter(Boolean),wi=0;
  if(words.length>1)setInterval(function(){
    wi=(wi+1)%words.length;
    rot.setAttribute('data-flip','true');
    setTimeout(function(){rot.textContent=words[wi];rot.setAttribute('data-flip','false');},200);
  },4000);
}
`;

export const JS_MAGNET = `
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
`;

export const JS_SPOTLIGHT = `
if(!reduced()){
  var sp=root.querySelector('[data-spotlight]');
  if(sp){
    var raf2=0;
    sp.addEventListener('pointermove',function(e){
      if(raf2)return;
      raf2=requestAnimationFrame(function(){
        raf2=0;
        var r=sp.getBoundingClientRect();
        sp.style.setProperty('--sx',(e.clientX-r.left)+'px');
        sp.style.setProperty('--sy',(e.clientY-r.top)+'px');
      });
    });
  }
}
`;

export const JS_TABS_ANIM = `
var tabs=root.querySelector('[data-tabs]');
if(tabs){
  var ink=tabs.querySelector('.tabs__ink');
  function inkTo(a){
    if(!ink||!a)return;
    ink.style.transform='translateX('+a.offsetLeft+'px)';
    ink.style.width=a.offsetWidth+'px';
  }
  var links=q('.tabs__a');
  links.forEach(function(a){
    a.addEventListener('mouseenter',function(){inkTo(a);});
    a.addEventListener('focus',function(){inkTo(a);});
    a.addEventListener('click',function(){
      links.forEach(function(x){x.removeAttribute('aria-current');});
      a.setAttribute('aria-current','page');
    });
  });
  var cur=tabs.querySelector('.tabs__a[aria-current]')||links[0];
  if(cur)requestAnimationFrame(function(){inkTo(cur);});
}
`;

export const JS_HOVERINTENT = `
q('[data-intent]').forEach(function(btn){
  var t=root.querySelector('#'+btn.getAttribute('aria-controls'));
  if(!t)return;
  var timer=null;
  function open(o){
    btn.setAttribute('aria-expanded',o?'true':'false');
    t.setAttribute('data-open',o?'true':'false');
  }
  btn.addEventListener('mouseenter',function(){timer=setTimeout(function(){open(true);},120);});
  btn.addEventListener('mouseleave',function(){clearTimeout(timer);timer=setTimeout(function(){open(false);},160);});
  t.addEventListener('mouseleave',function(){timer=setTimeout(function(){open(false);},160);});
  t.addEventListener('mouseenter',function(){clearTimeout(timer);});
  btn.addEventListener('click',function(){clearTimeout(timer);open(btn.getAttribute('aria-expanded')!=='true');});
  t.addEventListener('keydown',function(e){if(e.key==='Escape'){open(false);btn.focus();}});
});
`;

export const JS_VIS = `
document.addEventListener('visibilitychange',function(){
  var h=document.hidden;
  q('[data-motion]').forEach(function(el){el.style.animationPlayState=h?'paused':'';});
});
`;

export function compose(id, parts) {
  return JS_HEAD.replace(/\$\{id\}/g, id) + parts.join('') + JS_TAIL;
}
