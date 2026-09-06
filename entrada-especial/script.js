const slots = document.querySelector('#date-slots');
const status = document.querySelector('#status');
const toast = document.querySelector('#success-toast');
const keypad = document.querySelector('.keypad');
const proceedButton = document.querySelector('#proceed-button');
const digits = [];
const maxDigits = 8;
let valid = false;
for (let index = 0; index < maxDigits; index += 1) { const slot = document.createElement('span'); slot.className = 'slot'; slot.setAttribute('aria-hidden', 'true'); slots.append(slot); }
function render() { [...slots.children].forEach((slot,index)=>{slot.textContent=digits[index]||'';slot.classList.toggle('filled',Boolean(digits[index]));}); const readable=digits.join(''); document.querySelector('.date-display').setAttribute('aria-label',readable.length?`Data digitada: ${readable}`:'Nenhuma data digitada'); valid=digits.length===maxDigits&&readable==='19072026'; if(!digits.length) status.textContent='Digite uma data para continuar'; else if(digits.length<maxDigits) status.textContent=`${maxDigits-digits.length} números restantes`; else if(valid){status.textContent='Perfeito! Essa data é especial';showSuccess();}else status.textContent='Essa não é a data. Tente novamente'; proceedButton.classList.toggle('visible',valid); proceedButton.setAttribute('aria-hidden',String(!valid)); }
function addDigit(value){if(digits.length<maxDigits){digits.push(value);render();}}
function removeDigit(){digits.pop();toast.classList.remove('visible');toast.setAttribute('aria-hidden','true');render();}
let toastTimer; function showSuccess(){clearTimeout(toastTimer);toast.classList.add('visible');toast.setAttribute('aria-hidden','false');toastTimer=setTimeout(()=>{toast.classList.remove('visible');toast.setAttribute('aria-hidden','true');},2600);}
keypad.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.action==='backspace')removeDigit();else addDigit(button.dataset.key);});
document.addEventListener('keydown',event=>{if(/^\d$/.test(event.key))addDigit(event.key);if(event.key==='Backspace')removeDigit();});
proceedButton.addEventListener('click',()=>{if(valid)window.parent.postMessage({type:'FORALISSA_DATE_CONFIRMED'},'*');});
render();
