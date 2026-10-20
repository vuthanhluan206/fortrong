const main=document.querySelector('main'),intro=document.querySelector('.intro'),button=document.querySelector('#unwrap'),card=document.querySelector('.card');
const letter=document.querySelector('#letter'),envelopeButton=document.querySelector('#open-envelope'),foldButton=document.querySelector('#read-again');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let timeline=[],openingTimer,autoOpenTimer,expanding=false;
function isMobile(){return matchMedia('(max-width: 760px)').matches;}
function later(fn,delay){const id=setTimeout(fn,reduced?30:delay);timeline.push(id);return id;}
function fitLetter(){
 if(!letter.clientHeight)return;
 for(let size=12;size>=9;size-=.25){
  letter.style.setProperty('--letter-size',size+'px');
  if(letter.scrollHeight<=letter.clientHeight+1)break;
 }
}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(fitLetter).observe(letter);
if(document.fonts)document.fonts.ready.then(fitLetter);

function closeCard(){clearTimeout(openingTimer);clearTimeout(autoOpenTimer);card.classList.remove('open');letter.inert=true;letter.scrollTop=0;envelopeButton.disabled=false;envelopeButton.setAttribute('aria-expanded','false');foldButton.hidden=true;}
function openCard(){
 if(card.classList.contains('open'))return;
 clearTimeout(autoOpenTimer);card.classList.add('open');envelopeButton.disabled=true;envelopeButton.setAttribute('aria-expanded','true');
 openingTimer=later(()=>{fitLetter();letter.inert=false;foldButton.hidden=false;},isMobile()?7000:5900);
}
function revealGift(){
 document.body.classList.add('revealed');main.inert=false;intro.hidden=true;fitLetter();
 if(isMobile()){
  document.body.classList.add('mobile-bouquet-focus');
  later(()=>{
   document.body.classList.remove('mobile-bouquet-focus');document.body.classList.add('mobile-letter-ready');
   autoOpenTimer=later(openCard,1800);
  },2800);
 }else autoOpenTimer=later(openCard,1800);
}
function expandGarden(){if(expanding)return;expanding=true;document.body.classList.add('expanded');button.disabled=true;later(revealGift,3400);}
function startIntro(){
 timeline.forEach(clearTimeout);timeline=[];expanding=false;closeCard();main.inert=true;intro.hidden=false;button.disabled=false;
 document.body.classList.remove('expanded','revealed','mobile-bouquet-focus','mobile-letter-ready');document.body.classList.add('scene-ready');later(expandGarden,3000);
}
button.addEventListener('click',expandGarden);envelopeButton.addEventListener('click',openCard);
foldButton.addEventListener('click',()=>{closeCard();envelopeButton.focus({preventScroll:true});});
document.querySelector('.replay').addEventListener('click',startIntro);
startIntro();

