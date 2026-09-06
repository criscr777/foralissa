const slots = document.querySelector('#date-slots');
const status = document.querySelector('#status');
const toast = document.querySelector('#success-toast');
const keypad = document.querySelector('.keypad');
const digits = [];
const maxDigits = 8;

for (let index = 0; index < maxDigits; index += 1) {
  const slot = document.createElement('span');
  slot.className = 'slot';
  slot.setAttribute('aria-hidden', 'true');
  slots.append(slot);
}

function render() {
  [...slots.children].forEach((slot, index) => {
    slot.textContent = digits[index] || '';
    slot.classList.toggle('filled', Boolean(digits[index]));
  });

  const readable = digits.join('');
  document.querySelector('.date-display').setAttribute(
    'aria-label',
    readable.length ? `Data digitada: ${readable}` : 'Nenhuma data digitada',
  );

  if (digits.length === 0) {
    status.textContent = 'Digite uma data para continuar';
  } else if (digits.length < maxDigits) {
    status.textContent = `${maxDigits - digits.length} números restantes`;
  } else if (isValidDate(readable)) {
    status.textContent = 'Perfeito! Essa data é especial 💖';
    showSuccess();
  } else {
    status.textContent = 'Confira o dia e o mês digitados';
  }
}

function isValidDate(value) {
  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4, 8));
  if (year < 1900 || year > 2200 || month < 1 || month > 12 || day < 1) return false;
  const lastDay = new Date(year, month, 0).getDate();
  return day <= lastDay;
}

function addDigit(value) {
  if (digits.length >= maxDigits) return;
  digits.push(value);
  render();
}

function removeDigit() {
  digits.pop();
  toast.classList.remove('visible');
  toast.setAttribute('aria-hidden', 'true');
  render();
}

let toastTimer;
function showSuccess() {
  clearTimeout(toastTimer);
  toast.classList.add('visible');
  toast.setAttribute('aria-hidden', 'false');
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.setAttribute('aria-hidden', 'true');
  }, 2600);
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

render();
