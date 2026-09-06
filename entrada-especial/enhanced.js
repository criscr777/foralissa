const book = document.querySelector('.memory-book');
if (book) {
  const pages = [...book.querySelectorAll('.memory-page')];
  const proposal = document.createElement('article');
  proposal.className = 'memory-page proposal-page';
  proposal.setAttribute('aria-label','Pedido de namoro');
  proposal.innerHTML = `<div class="proposal-inner"><p class="proposal-kicker">e depois de tudo isso...</p><h1 class="proposal-title">Quer namorar<br>comigo, Alissa?</h1><p class="proposal-subtitle">eu já sei a resposta que eu quero ouvir, mas quero ouvir de você.</p><div class="proposal-actions"><button class="proposal-btn proposal-yes" type="button">Sim</button><button class="proposal-btn proposal-no" type="button">Não</button></div><p class="proposal-message" aria-live="polite"></p></div>`;
  book.appendChild(proposal);
  const no = proposal.querySelector('.proposal-no');
  const yes = proposal.querySelector('.proposal-yes');
  const message = proposal.querySelector('.proposal-message');
  let noScale = 1;
  let yesScale = 1;
  function moveNo(){
    const area = proposal.querySelector('.proposal-actions');
    const w = area.clientWidth;
    const h = area.clientHeight;
    const x = Math.max(58, Math.random()*(w-116));
    const y = Math.max(35, Math.random()*(h-70));
    noScale = Math.max(.34, noScale-.13);
    yesScale = Math.min(1.75, yesScale+.11);
    no.style.left = `${x}px`;
    no.style.top = `${y}px`;
    no.style.transform = `translate(-50%,-50%) scale(${noScale}) rotate(${Math.round(Math.random()*14-7)}deg)`;
    yes.style.transform = `scale(${yesScale})`;
    message.textContent = noScale < .6 ? 'acho que esse botão não quer colaborar...' : 'tem certeza?';
  }
  no.addEventListener('pointerdown', moveNo);
  no.addEventListener('mouseenter', moveNo);
  yes.addEventListener('click', () => {
    proposal.classList.add('celebrating');
    message.textContent = 'eu sabia. agora começa a nossa história.';
    no.style.display = 'none';
    yesScale = 1.22;
    yes.style.transform = 'scale(1.22)';
    celebrate();
    startLoveSong();
  });
  function celebrate(){
    const symbols=['♥','♥','✦','✧','·','♡'];
    for(let i=0;i<70;i++){
      const piece=document.createElement('span');
      piece.className='celebration-piece';
      piece.textContent=symbols[Math.floor(Math.random()*symbols.length)];
      piece.style.left=`${Math.random()*100}vw`;
      piece.style.setProperty('--drift',`${Math.round(Math.random()*180-90)}px`);
      piece.style.setProperty('--spin',`${Math.round(Math.random()*720-360)}deg`);
      piece.style.animationDuration=`${2.8+Math.random()*2.7}s`;
      document.body.appendChild(piece);
      setTimeout(()=>piece.remove(),6000);
    }
  }
  function startLoveSong(){
    // Coloque seu arquivo em assets/music/a-droga-do-amor.mp3 para tocar automaticamente.
    const audio=document.createElement('audio');
    audio.src='../assets/music/a-droga-do-amor.mp3';
    audio.preload='auto';
    audio.loop=false;
    audio.volume=.85;
    document.body.appendChild(audio);
    audio.play().catch(()=>{
      message.textContent='agora aperta novamente em “Sim” para liberar a música.';
    });
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-active', entry.isIntersecting));
  },{root:book,threshold:.58});
  pages.concat(proposal).forEach(page=>observer.observe(page));
  const textSelectors='.tiny-quote,.about-copy h2,.about-copy p,.overlay-note,.red-note,.grid-message,.you-me-copy,.anniversary-copy,.date-note,.favorite-card,.final-note';
  pages.forEach(page=>{
    page.querySelectorAll(textSelectors).forEach(el=>el.classList.add('typewriter-reveal'));
  });
}
