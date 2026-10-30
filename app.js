(()=>{
'use strict';
const data=window.VYZO_DATA;
if(!data)return;
document.documentElement.classList.add('js');
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const state={filter:'todos',activeProject:null,modalTrigger:null,brief:'',toastTimer:null};
const direct=data.contact.direct;
const siteHeader=$('.site-header');
const onScroll=()=>siteHeader.classList.toggle('scrolled',window.scrollY>28);
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#year').textContent=String(new Date().getFullYear());
const menuToggle=$('#menu-toggle'),mobileMenu=$('#mobile-menu');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');mobileMenu.hidden=true}
menuToggle.addEventListener('click',()=>{const isOpen=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!isOpen));menuToggle.setAttribute('aria-label',isOpen?'Abrir menu':'Fechar menu');mobileMenu.hidden=isOpen;});
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(innerWidth>1000)closeMenu()},{passive:true});
// Services: native scroll-snap, no autoplay or external dependencies.
const serviceGrid=$('#services-grid');
const serviceDots=$('#services-progress');
const servicePrev=$('#services-prev'),serviceNext=$('#services-next');
const serviceStatus=$('#services-status');
let servicesRAF=0;
const prefersLessMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serviceCards=()=>$$('.service-card',serviceGrid);
const serviceStep=()=>{
 const card=serviceCards()[0];if(!card)return 0;
 const gap=parseFloat(getComputedStyle(serviceGrid).columnGap)||0;
 return card.getBoundingClientRect().width+gap;
};
function moveServiceTo(index,focusCard=false){
 const cards=serviceCards();if(!cards.length)return;
 const next=Math.max(0,Math.min(index,cards.length-1));
 const distance=serviceStep()*next;
 serviceGrid.scrollTo({left:distance,behavior:prefersLessMotion()?'instant':'smooth'});
 if(focusCard)cards[next].focus({preventScroll:true});
 updateServiceControls();
}
function updateServiceControls(){
 servicesRAF=0;
 const max=Math.max(0,serviceGrid.scrollWidth-serviceGrid.clientWidth);
 const left=serviceGrid.scrollLeft;
 servicePrev.disabled=left<=2;
 serviceNext.disabled=left>=max-2;
 const fraction=max?Math.max(0,Math.min(1,left/max)):0;
 const currentIndex=Math.round(fraction*(data.services.length-1));
 $$('.services-dot',serviceDots).forEach((dot,i)=>{
  const chosen=i===currentIndex;
  dot.classList.toggle('active',chosen);
  dot.setAttribute('aria-current',chosen?'true':'false');
 });
 if(serviceStatus)serviceStatus.textContent='Explore os serviços: '+data.services[currentIndex].title;
}
function queueServiceControlUpdate(){
 if(servicesRAF)return;
 servicesRAF=requestAnimationFrame(updateServiceControls);
}
data.services.forEach((s,i)=>{
 const card=el('article','service-card');card.dataset.reveal='';card.dataset.revealId='service:'+s.id;
 card.id='service-'+s.id;card.tabIndex=-1;card.setAttribute('aria-label',s.title);
 const top=el('div','service-top');top.append(el('span','service-icon',s.icon));
 const title=el('h3','',s.title),desc=el('p','',s.description),tags=el('div','service-tags');
 s.tags.forEach(tag=>tags.append(el('span','',tag)));
 const button=el('button','service-action');button.type='button';button.append(el('span','','Quero este serviço'),el('span','','↗'));
 button.addEventListener('click',()=>{
  const select=$('#project-type');select.value=s.preselect;
  document.getElementById('contato').scrollIntoView({behavior:prefersLessMotion()?'instant':'smooth'});
  setTimeout(()=>select.focus({preventScroll:true}),prefersLessMotion()?0:350);
 });
 card.append(top,title,desc,tags,button);serviceGrid.append(card);
 const dot=el('button','services-dot');dot.type='button';
 dot.setAttribute('aria-label','Visualizar '+s.title);
 dot.setAttribute('aria-controls',serviceGrid.id);
 dot.addEventListener('click',()=>moveServiceTo(i));
 serviceDots.append(dot);
});
function moveService(delta){
 const step=serviceStep();if(!step)return;
 const current=Math.round(serviceGrid.scrollLeft/step);
 moveServiceTo(current+delta);
}
servicePrev.addEventListener('click',()=>moveService(-1));
serviceNext.addEventListener('click',()=>moveService(1));
serviceGrid.addEventListener('scroll',queueServiceControlUpdate,{passive:true});
serviceGrid.addEventListener('keydown',e=>{
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
  e.preventDefault();moveService(e.key==='ArrowRight'?1:-1);
 }
});
window.addEventListener('resize',queueServiceControlUpdate,{passive:true});
updateServiceControls();
// Projetos próprios e estudos autorais públicos; nenhuma marca de cliente.
const grid=$('#project-grid');
function makeImage(src,alt){const img=el('img');img.src=src;img.alt=alt;img.loading='lazy';img.decoding='async';img.onerror=()=>{img.hidden=true;const fallback=img.parentElement?.querySelector('.media-fallback');if(fallback)fallback.style.display='flex'};return img}
function renderProjects(){grid.replaceChildren();const filtered=data.projects.filter(p=>state.filter==='todos'||p.filter.includes(state.filter));
 filtered.forEach(p=>{
 const card=el('article','project-card');card.dataset.project=p.id;card.dataset.reveal='';card.dataset.revealId='project:'+p.id;
 const trigger=el('button','project-media');trigger.type='button';trigger.setAttribute('aria-label',`Ver detalhes do projeto ${p.title}`);trigger.style.width='100%';trigger.style.border='0';trigger.style.padding='0';trigger.style.textAlign='left';trigger.style.cursor='pointer';
 const img=makeImage(p.cover,p.alt);const fallback=el('span','media-fallback');fallback.style.setProperty('--fall',p.color);fallback.append(el('span','','VYZO / PROJETOS'),el('strong','',p.title));
 const open=el('span','project-open-icon','↗');open.setAttribute('aria-hidden','true');const label=el('span','project-label',p.label);trigger.append(img,fallback,label,open);trigger.addEventListener('click',()=>openProject(p.id,trigger));
 const info=el('div','project-info');const copy=el('div');copy.append(el('div','cat',p.category.toUpperCase()),el('h3','',p.title),el('p','',p.caption),el('div','project-auth',p.status));const btn=el('button','case-link','↗');btn.type='button';btn.setAttribute('aria-label',`Abrir projeto ${p.title}`);btn.addEventListener('click',()=>openProject(p.id,btn));info.append(copy,btn);card.append(trigger,info);grid.append(card);
 });
 observeReveals();
}
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{state.filter=btn.dataset.filter;$$('.filter').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});renderProjects();}));
// Six visible steps, one shared explanation; deliberately not a carousel.
const proc=$('#process-list');
const processName=$('#process-active-title'),processDescription=$('#process-active-description');
const processButtons=[];
function selectProcessStage(index,moveFocus=false){
 const step=data.process[index];if(!step)return;
 processName.textContent=step.name;
 processDescription.textContent=step.text;
 processButtons.forEach((button,i)=>{
  const active=i===index;
  button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',String(active));
  button.setAttribute('aria-current',active?'step':'false');
 });
 if(moveFocus)processButtons[index].focus();
}
data.process.forEach((step,index)=>{
 const button=el('button','process-step');button.type='button';
 button.setAttribute('aria-label','Etapa: '+step.name);
 button.setAttribute('aria-controls','process-active-description');
 const name=el('span','process-step-name',step.name);
 button.append(el('span','process-step-mark','✳'),name);
 button.addEventListener('click',()=>selectProcessStage(index));
 button.addEventListener('keydown',e=>{
  const key=e.key;
  if(!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].includes(key))return;
  e.preventDefault();
  const next=key==='Home'?0:key==='End'?data.process.length-1:
   (index+(key==='ArrowLeft'||key==='ArrowUp'?-1:1)+data.process.length)%data.process.length;
  selectProcessStage(next,true);
 });
 processButtons.push(button);proc.append(button);
});
selectProcessStage(0);
const benefits=$('#benefits');data.benefits.forEach(benefit=>{const card=el('article','benefit-card');card.dataset.reveal='';card.dataset.revealId='benefit:'+benefit.title;card.append(el('span','benefit-mark',benefit.icon),el('h3','',benefit.title),el('p','',benefit.text));benefits.append(card)});
// Progressive scroll is a standalone module in index.html; project filtering remains independent.
function observeReveals(){}
// Project case study dialog and gallery.
const backdrop=$('#case-modal'),modal=$('.modal',backdrop),modalContent=$('#modal-content'),modalClose=$('#modal-close');
function getFocusable(){return $$('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])',modal).filter(n=>n.getClientRects().length>0)}
function openProject(id,trigger){const p=data.projects.find(item=>item.id===id);if(!p)return;
 state.activeProject=p;state.modalTrigger=trigger;modalContent.replaceChildren();
 const hero=el('div','modal-hero');const heroImage=makeImage(p.cover,p.alt);heroImage.loading='eager';const fall=el('div','media-fallback');fall.style.setProperty('--fall',p.color);fall.append(el('span','','VYZO / PROJETO'),el('strong','',p.title));hero.append(heroImage,fall);
 const body=el('div','modal-body');const modalHeading=el('h2','',p.title);modalHeading.id='modal-title';body.append(el('div','modal-eyebrow',p.status.toUpperCase()+' · '+p.category.toUpperCase()),modalHeading,el('p','',p.description));
 const detail=el('div','modal-detail');const d1=el('div'),d2=el('div');d1.append(el('h3','','O que compõe o projeto'));d2.append(el('h3','','Notas do case'));const ul1=el('ul'),ul2=el('ul');p.deliverables.forEach(x=>ul1.append(el('li','',x)));p.details.forEach(x=>ul2.append(el('li','',x)));d1.append(ul1);d2.append(ul2);detail.append(d1,d2);body.append(detail);
 if(p.gallery?.length>1){const gallery=el('div','modal-gallery');p.gallery.forEach((src,i)=>{const thumb=el('button');thumb.type='button';thumb.setAttribute('aria-label',`Ver imagem ${i+1} de ${p.title}`);const im=makeImage(src,`Prévia ${i+1} do projeto ${p.title}`);thumb.append(im);thumb.addEventListener('click',()=>{heroImage.src=src;heroImage.hidden=false;heroImage.alt=im.alt;fall.style.display='none';heroImage.onerror=()=>{heroImage.hidden=true;fall.style.display='flex'};hero.scrollIntoView({behavior:'smooth',block:'nearest'});});gallery.append(thumb)});body.append(gallery)}
 const actions=el('div','modal-actions');if(p.site){const a=el('a','button button-primary','Visitar projeto publicado ↗');a.href=p.site;a.target='_blank';a.rel='noopener noreferrer';actions.append(a)}const ask=el('button','button button-ghost','Solicitar projeto semelhante ↗');ask.type='button';ask.addEventListener('click',()=>{let t='Website';if(p.filter.includes('apresentacao'))t='Apresentação profissional';else if(p.filter.includes('design'))t='Identidade visual';closeProject();$('#project-type').value=t;$('#contato').scrollIntoView({behavior:'smooth'})});actions.append(ask);body.append(actions);modalContent.append(hero,body);
 backdrop.hidden=false;document.body.classList.add('modal-open');modal.scrollTop=0;modal.focus();
}
function closeProject(){if(backdrop.hidden)return;backdrop.hidden=true;document.body.classList.remove('modal-open');state.activeProject=null;state.modalTrigger?.focus();}
modalClose.addEventListener('click',closeProject);backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeProject()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!backdrop.hidden)closeProject();else closeMenu()}if(e.key==='Tab'&&!backdrop.hidden){const nodes=getFocusable();if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
// Premium motion, progressively enhanced and disability-aware.
const tilt=$('#hero-tilt');if(tilt&&window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){const visual=$('.hero-visual');visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect();let x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateY(${(-15+x*9).toFixed(1)}deg) rotateX(${(8-y*8).toFixed(1)}deg) rotateZ(1deg)`});visual.addEventListener('pointerleave',()=>tilt.style.transform='rotateY(-15deg) rotateX(8deg) rotateZ(1deg)')}
// Non-submitting inquiry: keeps personal information exclusively in current browser form.
const form=$('#project-form'),feedback=$('#form-feedback'),textPreview=$('#brief-preview'),hint=$('#form-hint');
function validateForm(){let firstBad=null;for(const field of $$('[required]',form)){const value=field.value.trim();let valid=value.length>0;if(field.id==='client-name')valid=value.length>=2;if(field.id==='project-description')valid=value.length>=10;field.setAttribute('aria-invalid',String(!valid));if(!valid&&!firstBad)firstBad=field}if(firstBad){firstBad.focus();hint.textContent='Preencha os campos obrigatórios. A descrição precisa ter pelo menos 10 caracteres.';hint.style.color='#ff9fae';return false}hint.textContent='Seu briefing está pronto para ser preparado.';hint.style.color='';return true}
form.addEventListener('input',e=>{if(e.target.matches('input,textarea,select'))e.target.removeAttribute('aria-invalid')});
form.addEventListener('submit',e=>{e.preventDefault();if(!validateForm())return;const v=n=>form.elements[n]?.value.trim()||'';state.brief=[
  'Olá, VYZO Studio! Quero conversar sobre um projeto.',
  '',`Nome: ${v('name')}`,
  ...(v('company')?[`Marca/empresa: ${v('company')}`]:[]),
  `Contato: ${v('contact')}`,`Serviço desejado: ${v('type')}`,
  ...(v('budget')?[`Investimento aproximado: ${v('budget')}`]:[]),
  '',`Meu projeto: ${v('description')}`
 ].join('\n');textPreview.value=state.brief;feedback.hidden=false;$('#feedback-title').textContent='Seu briefing está pronto.';$('#feedback-info').textContent='Copie o resumo e envie pelo Instagram Direct. Este site não envia os dados automaticamente.';feedback.scrollIntoView({behavior:'smooth',block:'nearest'});});
async function copyBrief(){if(!state.brief)return;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(state.brief)}else{ textPreview.focus();textPreview.select();const ok=document.execCommand('copy');if(!ok)throw new Error('Cópia não disponível')}showToast('Briefing copiado! Agora envie pelo Direct.');$('#copy-brief').textContent='Copiado ✓'}catch(error){textPreview.focus();textPreview.select();showToast('Selecione e copie o texto do briefing manualmente.')}}
$('#copy-brief').addEventListener('click',copyBrief);
function showToast(text){const toast=$('#toast');toast.textContent=text;toast.hidden=false;clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>toast.hidden=true,3600)}
// Initialize only after all stateful declarations and dialog elements exist.
renderProjects();
observeReveals();
// Active navigation on scroll.
if('IntersectionObserver' in window){const watch=['sobre','servicos','portfolio','processo','contato'].map(id=>document.getElementById(id));const navigationObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){$$('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}},{rootMargin:'-20% 0px -65% 0px'});watch.forEach(node=>node&&navigationObserver.observe(node))}
})();
