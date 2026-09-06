const frame=document.querySelector('#bookFrame');
frame.addEventListener('load',()=>{
  const doc=frame.contentDocument; const book=doc?.querySelector('.memory-book'); if(!book)return;
  const css=doc.createElement('link'); css.rel='stylesheet'; css.href='enhanced.css'; doc.head.appendChild(css);
  const first=doc.querySelector('.page-home .photo-home');
  if(first){const old=first.querySelector('img');const video=doc.createElement('video');video.className='home-video';video.autoplay=true;video.muted=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.poster=old?.src||'';const source=doc.createElement('source');source.src='../assets/videos/primeiro-video.mp4';source.type='video/mp4';video.appendChild(source);first.replaceChildren(video);}
  if(doc.querySelector('.proposal-page'))return;
  const proposal=doc.createElement('article'); proposal.className='memory-page proposal-page'; proposal.setAttribute('aria-label','Pedido de namoro');
  proposal.innerHTML=`<div class="proposal-inner"><h1 class="proposal-title">Quer namorar comigo, Alissa?</h1><div class="proposal-actions"><button class="proposal-btn proposal-yes" type="button">Sim</button><button class="proposal-btn proposal-no" type="button">Não</button></div></div>`;
  book.appendChild(proposal);
  const no=proposal.querySelector('.proposal-no'),yes=proposal.querySelector('.proposal-yes');let noScale=1,yesScale=1;
  function moveNo(e){e?.preventDefault();const area=proposal.querySelector('.proposal-actions');const x=55+Math.random()*Math.max(1,area.clientWidth-110);const y=35+Math.random()*Math.max(1,area.clientHeight-70);noScale=Math.max(.35,noScale-.14);yesScale=Math.min(1.7,yesScale+.11);no.style.left=`${x}px`;no.style.top=`${y}px`;no.style.transform=`translate(-50%,-50%) scale(${noScale})`;yes.style.transform=`scale(${yesScale})`;}
  no.addEventListener('pointerdown',moveNo);no.addEventListener('mouseenter',moveNo);no.addEventListener('touchstart',moveNo,{passive:false});
  yes.addEventListener('click',()=>{no.remove();yes.style.transform='scale(1.18)';celebrate(doc);startLoveSong(doc);});
  const pages=[...book.querySelectorAll('.memory-page')];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-active',entry.isIntersecting)),{root:book,threshold:.58});pages.forEach(p=>observer.observe(p));
  doc.querySelectorAll('.tiny-quote,.about-copy h2,.about-copy p,.overlay-note,.red-note,.grid-message,.you-me-copy,.anniversary-copy,.date-note,.favorite-card,.final-note').forEach(el=>el.classList.add('typewriter-reveal'));
});
function celebrate(doc){const symbols=['♥','♥','✦','✧','·','♡'];for(let i=0;i<70;i++){const p=doc.createElement('span');p.className='celebration-piece';p.textContent=symbols[Math.floor(Math.random()*symbols.length)];p.style.left=`${Math.random()*100}vw`;p.style.setProperty('--drift',`${Math.round(Math.random()*180-90)}px`);p.style.setProperty('--spin',`${Math.round(Math.random()*720-360)}deg`);p.style.animationDuration=`${2.8+Math.random()*2.7}s`;doc.body.appendChild(p);setTimeout(()=>p.remove(),6000);}}
function startLoveSong(doc){const audio=doc.createElement('audio');audio.src='../assets/music/a-droga-do-amor.mp3';audio.preload='auto';audio.volume=.85;doc.body.appendChild(audio);audio.play().catch(()=>{});}
