import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
function run({reduced=false,mobile=false}={}){
 const nodes=new Map(),timers=new Map();let next=0;
 function node(key){if(!nodes.has(key)){const classes=new Set();nodes.set(key,{inert:false,hidden:false,disabled:false,attributes:{},setAttribute(k,v){this.attributes[k]=v;},classList:{add(...xs){xs.forEach(x=>classes.add(x));},remove(...xs){xs.forEach(x=>classes.delete(x));},contains(x){return classes.has(x);}},events:{},addEventListener(e,fn){this.events[e]=fn;},focus(){}});}return nodes.get(key);}
 const context={document:{querySelector:node,body:node('body'),fonts:null},ResizeObserver:undefined,matchMedia:q=>({matches:q.includes('prefers-reduced-motion')?reduced:q.includes('max-width')?mobile:false}),setTimeout:(fn,ms)=>{timers.set(++next,{fn,ms});return next;},clearTimeout:id=>timers.delete(id),Image:class{set src(v){this.onload();}}};
 function tick(delay){const entry=[...timers].find(([,t])=>t.ms===(reduced?30:delay));assert(entry,'missing timer '+delay);timers.delete(entry[0]);entry[1].fn();}
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8').replace(/^\uFEFF/,''),context);
 assert(node('main').inert);assert(!node('body').classList.contains('revealed'));assert(node('#letter').inert);
 tick(3000);assert(node('body').classList.contains('expanded'));assert(node('main').inert);
 tick(3400);assert(!node('main').inert);assert(node('body').classList.contains('revealed'));assert(node('.intro').hidden);
 if(mobile){assert(node('body').classList.contains('mobile-bouquet-focus'));tick(2800);assert(node('body').classList.contains('mobile-letter-ready'));assert(!node('body').classList.contains('mobile-bouquet-focus'));}
 tick(1800);assert(node('.card').classList.contains('open'));assert(node('#letter').inert);
 tick(mobile?7000:5900);assert(!node('#letter').inert);assert(!node('#read-again').hidden);
 node('#read-again').events.click();assert(!node('.card').classList.contains('open'));assert(node('#letter').inert);
 node('#open-envelope').events.click();assert(node('.card').classList.contains('open'));
 node('.replay').events.click();assert(node('main').inert);assert(!node('body').classList.contains('expanded'));assert(!node('.intro').hidden);
 assert.equal(timers.size,1,'replay cancels previous callbacks');
 node('#unwrap').events.click();const count=timers.size;node('#unwrap').events.click();assert.equal(timers.size,count,'skip is idempotent');
}
run();run({mobile:true});run({reduced:true,mobile:true});
const html=fs.readFileSync('dist/index.html','utf8');
for(const asset of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert(fs.existsSync('dist/'+asset[1]),asset[1]);

const sceneCode=fs.readFileSync('dist/scene.js','utf8').replace(/^\uFEFF/,'');
for(const [width,height] of [[320,568],[390,844],[844,390],[1440,900],[2560,1080]]){
 const scene={innerHTML:''};
 vm.runInNewContext(sceneCode,{
  document:{querySelector:()=>scene},
  window:{innerWidth:width,innerHeight:height,addEventListener(){}},
  cancelAnimationFrame(){},requestAnimationFrame(){}
 });
 assert(scene.innerHTML.includes('viewBox="0 0 '+width+' '+height+'"'));
 assert(!/NaN|undefined|garden-painted|garden-reference/.test(scene.innerHTML));
 assert.equal((scene.innerHTML.match(/class="garden-family"/g)||[]).length,1);
 assert(scene.innerHTML.includes('href="assets/family-cutout.png"'));
 assert.equal((scene.innerHTML.match(/class="flower-row/g)||[]).length,19);
 assert(!scene.innerHTML.includes('class="garden-flower"'),'flowers animate in rows, not hundreds of individual layers');
 assert((scene.innerHTML.match(/<use href="#tulip-/g)||[]).length<=1810,'flower count stays bounded for smooth animation');
 const bounds=scene.innerHTML.match(/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" preserveAspectRatio/);
 const [,x,y,w,h]=bounds.map(Number);
 assert(x>=0&&x+w<=width&&y>=0&&y+h<=height,'whole family fits '+width);
 assert(scene.innerHTML.indexOf('class="flowers-in-front"')>scene.innerHTML.indexOf('<image'),'foreground covers feet');
 assert(scene.innerHTML.includes('class="garden-hill garden-hill-back"'));
 assert((scene.innerHTML.match(/class="garden-tree"/g)||[]).length===17);
 assert(scene.innerHTML.includes('front-tulip-row'));
 assert.equal((scene.innerHTML.match(/class="left-tulip-cluster /g)||[]).length,3);
 assert(!scene.innerHTML.includes('bottom-foliage'));
}
assert(!/function house|pathD|function person|renderBouquet|flower-bed/.test(sceneCode));
assert(html.includes('src="assets/bouquet.png"'));
for(const file of ['bouquet','family-cutout'])assert.equal(fs.readFileSync('dist/assets/'+file+'.png').subarray(1,4).toString(),'PNG');
const css=fs.readFileSync('dist/style.css','utf8');
assert(html.includes('class="intro-title"'));
assert(html.includes('20/10')&&!html.includes('20/11'));
assert(css.includes('@keyframes intro-title'));
assert(css.includes('#read-again{position:absolute'));
assert(css.includes('grid-template-columns:1fr'));
assert(css.includes('@keyframes flower-gust'));
assert(css.includes('scale(2.35)'));
assert(css.includes('.landscape{inset:-1px'));
assert(css.includes('translate3d(-24vw,0,0) scale(2.05)'));
assert(css.includes('width:min(80vw,420px)'));
assert(css.includes('max-height:92svh'));
assert(css.includes('.mobile-bouquet-focus .heading'));
assert(css.includes('.revealed.mobile-letter-ready .letter-area'));
assert(css.includes('@keyframes tree-gust'));
assert(css.includes('@keyframes left-flower-gust'));
assert(!css.includes('@keyframes leaf-gust'));
assert(!/garden-painted|garden-reference/.test(css));
console.log('PASS: large family intro; layered wind; left tulip cluster; responsive hills and trees; full-stem flowers cover the family feet.');


