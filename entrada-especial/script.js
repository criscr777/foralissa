const slots = document.querySelector('#date-slots');
const status = document.querySelector('#status');
const toast = document.querySelector('#success-toast');
const keypad = document.querySelector('.keypad');
const continueArea = document.querySelector('#continue-area');
const openBook = document.querySelector('#open-book');
const digits = [];
const maxDigits = 8;
const correctDate = '19072026';
let unlocked = false;
let toastTimer;
for (let index = 0; index < maxDigits; index += 1) { const slot = document.createElement('span'); slot.className = 'slot'; slot.setAttribute('aria-hidden', 'true'); slots.append(slot); }
function render() {
  [...slots.children].forEach((slot,index)=>{slot.textContent=digits[index]||'';slot.classList.toggle('filled',Boolean(digits[index]));});
  const value=digits.join('');
  if(!value) status.textContent='Digite uma data para continuar';
  else if(value.length<maxDigits) status.textContent=`${maxDigits-value.length} números restantes`;
  else if(value===correctDate) unlockBook();
  else { unlocked=false; continueArea.classList.remove('ready'); continueArea.setAttribute('aria-hidden','true'); status.textContent='Essa não é a data. Tente novamente'; }
}
function unlockBook(){ if(unlocked)return; unlocked=true; status.textContent='Data confirmada. Agora você pode prosseguir.'; continueArea.classList.add('ready'); continueArea.setAttribute('aria-hidden','false'); clearTimeout(toastTimer); toast.classList.add('visible'); toast.setAttribute('aria-hidden','false'); toastTimer=setTimeout(()=>{toast.classList.remove('visible');toast.setAttribute('aria-hidden','true');},2200); }
function addDigit(value){if(digits.length<maxDigits&&!unlocked) {digits.push(value);render();}}
function removeDigit(){if(!unlocked){digits.pop();render();}}
keypad.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.action==='backspace')removeDigit();else addDigit(button.dataset.key);});
document.addEventListener('keydown',event=>{if(/^\d$/.test(event.key))addDigit(event.key);if(event.key==='Backspace')removeDigit();});
openBook.addEventListener('click',()=>{if(unlocked)window.location.href='memories-enhanced.html';});
render();
