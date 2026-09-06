const slots = document.querySelector('#date-slots');
const status = document.querySelector('#status');
const toast = document.querySelector('#success-toast');
const keypad = document.querySelector('.keypad');
const continueArea = document.querySelector('#continue-area');
const openBook = document.querySelector('#open-book');
const memoryBook = document.querySelector('#memory-book');
const digits = [];
const maxDigits = 8;
let unlocked = false;
let toastTimer;

for (let index = 0; index < maxDigits; index += 1) {
  const slot = document.createElement('span');
  slot.className = 'slot';
  slot.setAttribute('aria-hidden', 'true');
  slots.append(slot);
}

function isValidDate(value) {
  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4, 8));
  if (year < 1900 || year > 2200 || month < 1 || month > 12 || day < 1) return false;
  return day <= new Date(year, month, 0).getDate();
}

function unlockBook() {
  if (unlocked) return;
  unlocked = true;
  continueArea.classList.add('ready');
  continueArea.setAttribute('aria-hidden', 'false');
  memoryBook.classList.remove('locked');
  memoryBook.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => continueArea.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}

function render() {
  [...slots.children].forEach((slot, index) => {
    slot.textContent = digits[index] || '';
    slot.classList.toggle('filled', Boolean(digits[index]));
  });
  const readable = digits.join('');
  document.querySelector('.date-display').setAttribute('aria-label', readable.length ? `Data digitada: ${readable}` : 'Nenhuma data digitada');
  if (digits.length === 0) status.textContent = 'Digite uma data para continuar';
  else if (digits.length < maxDigits) status.textContent = `${maxDigits - digits.length} números restantes`;
  else if (isValidDate(readable)) { status.textContent = 'Perfeito! Essa data é especial 💖'; unlockBook(); showSuccess(); }
  else { status.textContent = 'Confira o dia e o mês digitados'; continueArea.classList.remove('ready'); continueArea.setAttribute('aria-hidden', 'true'); }
}
function addDigit(value) { if (digits.length >= maxDigits) return; digits.push(value); render(); }
function removeDigit() { digits.pop(); toast.classList.remove('visible'); toast.setAttribute('aria-hidden', 'true'); render(); }
function showSuccess() { clearTimeout(toastTimer); toast.classList.add('visible'); toast.setAttribute('aria-hidden', 'false'); toastTimer = setTimeout(() => { toast.classList.remove('visible'); toast.setAttribute('aria-hidden', 'true'); }, 2600); }
keypad.addEventListener('click', (event) => { const button = event.target.closest('button'); if (!button) return; if (button.dataset.action === 'backspace') removeDigit(); else addDigit(button.dataset.key); });
document.addEventListener('keydown', (event) => { if (/^\d$/.test(event.key)) addDigit(event.key); if (event.key === 'Backspace') removeDigit(); });
openBook.addEventListener('click', () => { toast.classList.remove('visible'); toast.setAttribute('aria-hidden', 'true'); const bookTop = memoryBook.getBoundingClientRect().top + window.scrollY; memoryBook.scrollTop = 0; window.scrollTo({ top: bookTop, behavior: 'smooth' }); window.setTimeout(() => { memoryBook.querySelector('.memory-page')?.focus({ preventScroll: true }); }, 700); });
render();
