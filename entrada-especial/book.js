const book = document.querySelector('.memory-book');
const pages = [...document.querySelectorAll('.memory-page')];
const proposal = document.querySelector('.proposal-page');

if (book && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
  }, { root: book, threshold: 0.62 });
  pages.forEach((page) => observer.observe(page));
}

if (proposal) {
  const yesButton = proposal.querySelector('.proposal-yes');
  const noButton = proposal.querySelector('.proposal-no');
  let noScale = 1;
  let yesScale = 1;

  const moveNo = (event) => {
    event?.preventDefault();
    const area = proposal.querySelector('.proposal-actions');
    const padding = 50;
    const maxX = Math.max(padding, area.clientWidth - padding);
    const maxY = Math.max(70, area.clientHeight - 28);
    const nextX = padding + Math.random() * Math.max(1, maxX - padding);
    const nextY = 25 + Math.random() * Math.max(1, maxY - 25);
    noScale = Math.max(.52, noScale - .1);
    yesScale = Math.min(1.28, yesScale + .06);
    noButton.style.left = `${nextX}px`;
    noButton.style.top = `${nextY}px`;
    noButton.style.transform = `translate(-50%, -50%) scale(${noScale})`;
    yesButton.style.transform = `scale(${yesScale})`;
  };

  noButton.addEventListener('pointerdown', moveNo);
  noButton.addEventListener('mouseenter', moveNo);
  noButton.addEventListener('touchstart', moveNo, { passive: false });

  yesButton.addEventListener('click', () => {
    proposal.classList.add('accepted');
    celebrate();
  });
}

function celebrate() {
  const symbols = ['♥', '♡', '✦', '✧'];
  for (let index = 0; index < 48; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'celebration-piece';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty('--drift', `${Math.round(Math.random() * 180 - 90)}px`);
    piece.style.setProperty('--spin', `${Math.round(Math.random() * 720 - 360)}deg`);
    piece.style.animationDuration = `${2.4 + Math.random() * 2.2}s`;
    document.body.append(piece);
    window.setTimeout(() => piece.remove(), 5200);
  }
}
