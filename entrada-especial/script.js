const slots = document.querySelector('#date-slots');
const status = document.querySelector('#status');
const toast = document.querySelector('#success-toast');
const keypad = document.querySelector('.keypad');
const continueArea = document.querySelector('#continue-area');
const openBook = document.querySelector('#open-book');

// Altere somente esta constante se quiser trocar a data secreta.
const SPECIAL_DATE = '19072026';
const MAX_DIGITS = 8;
const digits = [];
let unlocked = false;
let toastTimer;

for (let index = 0; index < MAX_DIGITS; index += 1) {
  const slot = document.createElement('span');
  slot.className = 'slot';
  slot.setAttribute('aria-hidden', 'true');
  slots.append(slot);
}

function updateStatus(message, type = '') {
  status.textContent = message;
  status.classList.toggle('is-error', type === 'error');
  status.classList.toggle('is-success', type === 'success');
}

function render() {
  [...slots.children].forEach((slot, index) => {
    slot.textContent = digits[index] || '';
    slot.classList.toggle('filled', Boolean(digits[index]));
  });

  const value = digits.join('');
  document.querySelector('.date-display').setAttribute(
    'aria-label',
    value ? `Data digitada: ${value}` : 'Nenhuma data digitada',
  );

  if (!value) {
    updateStatus('Digite a data para abrir a surpresa.');
  } else if (value.length < MAX_DIGITS) {
    updateStatus(`Faltam ${MAX_DIGITS - value.length} números.`);
  } else if (value === SPECIAL_DATE) {
    unlock();
  } else {
    unlocked = false;
    continueArea.classList.remove('ready');
    continueArea.setAttribute('aria-hidden', 'true');
    updateStatus('Essa não é a data secreta. Tente novamente.', 'error');
  }
}

function unlock() {
  if (unlocked) return;
  unlocked = true;
  continueArea.classList.add('ready');
  continueArea.setAttribute('aria-hidden', 'false');
  updateStatus('Perfeito. Agora abra a nossa história. 💌', 'success');
  clearTimeout(toastTimer);
  toast.classList.add('visible');
  toast.setAttribute('aria-hidden', 'false');
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.setAttribute('aria-hidden', 'true');
  }, 2300);
  setTimeout(() => continueArea.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}

function addDigit(value) {
  if (unlocked || digits.length >= MAX_DIGITS) return;
  digits.push(value);
  render();
}

function removeDigit() {
  if (unlocked) return;
  digits.pop();
  render();
}

keypad.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'backspace') removeDigit();
  else addDigit(button.dataset.key);
});

document.addEventListener('keydown', (event) => {
  if (/^\d$/.test(event.key)) addDigit(event.key);
  if (event.key === 'Backspace') removeDigit();
});

openBook.addEventListener('click', () => {
  if (!unlocked) return;
  sessionStorage.setItem('foralissa:unlocked', 'true');
  window.location.href = 'memories.html';
});

render();
