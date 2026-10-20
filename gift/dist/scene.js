const sceneHost=document.querySelector('.scene-art');
const palette=['#ed786e','#f5b96b','#e9a1b0','#f4d768','#fff0c1','#d85d61'];
const flowerDefs=palette.map((color,index)=>'<g id="tulip-'+index+'"><path d="M0 0 Q-3 -21 1 -40" fill="none" stroke="#527b46" stroke-width="2.2"/><path d="M-1 -3 Q-19 -16 -15 -32 Q-2 -24 -1 -3M1 -1 Q17 -14 16 -25 Q4 -22 1 -1" fill="#7eaa58" stroke="#547e44" stroke-width=".8"/><path d="M1 -37 C-14 -37 -16 -50 -11 -59 L-4 -54 L1 -63 L6 -54 L13 -59 C18 -45 12 -36 1 -37Z" fill="'+color+'" stroke="#885e48" stroke-width=".8"/><path d="M1 -38 Q-5 -47 -4 -54M2 -39 Q9 -47 6 -54" fill="none" stroke="#fff9df" stroke-opacity=".6" stroke-width="1.2"/></g>').join('');
function flower(x,y,size,color){
 return '<use href="#tulip-'+color+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') scale('+size.toFixed(2)+')"/>';
}
function tree(x,y,size,phase){
 return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') scale('+size.toFixed(2)+')"><g class="garden-tree" style="--phase:-'+phase.toFixed(2)+'s"><path d="M0 4 Q2 -32 -2 -69 M0 -35 L-20 -51 M-1 -45 L18 -62" fill="none" stroke="#8f7351" stroke-width="4" stroke-linecap="round"/><path d="M-35 -48 Q-43 -70 -23 -76 Q-17 -95 2 -84 Q21 -96 29 -76 Q47 -68 35 -48 Q24 -32 1 -39 Q-22 -31 -35 -48Z" fill="#8fb872" stroke="#648c5c" stroke-width="1.2"/><path d="M-29 -55 Q-23 -78 -7 -72 M-2 -78 Q15 -83 26 -63 M4 -47 Q21 -61 34 -53" fill="none" stroke="#c3d99a" stroke-width="5" stroke-linecap="round" opacity=".75"/></g></g>';
}
function renderScene(){
 const w=window.innerWidth,h=window.innerHeight;
 let seed=47;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const ground=h*.78,fw=Math.min(w*.48,h*.4),fh=fw*2/3,fx=w*.76-fw/2,fy=h*.94;
 let flowers='',foreground='',trees='';
 for(let i=0;i<17;i++){
  const x=(i+random()*.55)*w/16;
  trees+=tree(x,ground+17,Math.min(w/1350,h/850)*(.6+random()*.55),random()*9);
 }
 const rows=18,columns=Math.max(32,Math.min(96,Math.round(w/20)));
 for(let row=0;row<rows;row++){
  const depth=row/(rows-1),y=ground+10+depth*(h-ground+25),size=(.14+depth*.55)*Math.min(1.2,h/800);
  let rowFlowers='';
  for(let col=0;col<columns;col++){
   const x=(col+random())*w/columns;
   rowFlowers+=flower(x,y,size,Math.floor(random()*palette.length));
  }
  const strip='<g class="flower-row" style="--phase:-'+(row*.23).toFixed(2)+'s;--wind:'+(5+depth*7).toFixed(1)+'deg">'+rowFlowers+'</g>';
  if(y>fy)foreground+=strip;
  else flowers+=strip;
 }
 const frontCount=Math.max(28,Math.min(64,Math.round(w/25)));
 let frontTulips='';
 for(let i=0;i<frontCount;i++){
  const x=(i+random()*.7)*w/frontCount;
  frontTulips+=flower(x,h+12,.9+random()*.35,Math.floor(random()*palette.length));
 }
 foreground+='<g class="flower-row front-tulip-row" style="--phase:-1.1s;--wind:11deg">'+frontTulips+'</g>';
 const leftGroups=Array.from({length:3},()=>[]);
 for(let i=0;i<18;i++){
  const x=w*(.025+random()*.21),y=h+8-random()*9;
  leftGroups[i%3].push(flower(x,y,.92+random()*.46,Math.floor(random()*palette.length)));
 }
 const leftTulips=leftGroups.map((group,index)=>'<g class="left-tulip-cluster left-tulip-cluster-'+(index+1)+'" style="--phase:-'+(index*.72).toFixed(2)+'s">'+group.join('')+'</g>').join('');
 const footLine=fy-fh*.12;
 sceneHost.innerHTML='<svg class="garden-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><defs>'+flowerDefs+'<clipPath id="front-flowers"><rect x="0" y="'+footLine+'" width="'+w+'" height="'+(h-footLine)+'"/></clipPath></defs><path class="garden-hill garden-hill-back" d="M0 '+(ground+21)+' Q'+(w*.18)+' '+(ground-48)+' '+(w*.4)+' '+(ground+5)+' T'+(w*.77)+' '+(ground-23)+' T'+w+' '+(ground+4)+' V'+h+' H0Z" fill="#dce5af"/><path class="garden-hill" d="M0 '+(ground+25)+' Q'+(w*.25)+' '+(ground-17)+' '+(w*.48)+' '+(ground+17)+' T'+w+' '+(ground+4)+' V'+h+' H0Z" fill="#c6d895"/>'+trees+'<g class="flowers-behind">'+flowers+'</g><image class="garden-family" href="assets/family-cutout.png" x="'+fx+'" y="'+(fy-fh)+'" width="'+fw+'" height="'+fh+'" preserveAspectRatio="xMidYMax meet"/><g class="flowers-in-front" clip-path="url(#front-flowers)">'+foreground+'</g>'+leftTulips+'</svg>';
}
renderScene();
let resizeFrame;
window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(renderScene);});

