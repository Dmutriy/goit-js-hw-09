import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

// Обираємо кверіСелектори
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// Кнопка старт по замовчуванню
refs.startBtn.disabled = false;

// Об'єкт налаштувань для Notiflix
const initNotiflix = {
  position: 'center-center',
  backOverlay: true,
  //   clickToClose: true,
  //   closeButton: true,
  pauseOnHover: true,
  timeout: 2000,
};

let selectedDate = null;

// Об'єкт налаштувань для Flatpickr
const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  selectedDate: null,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const deltaDate = selectedDate - Date.now();
    if (deltaDate <= 0) {
      return Notify.failure('Виберіть час в майбутньому', initNotiflix);
    }
  },
};

// flatpickr для вибору дати
flatpickr(refs.input, optionsFlatpickr);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  Notify.info('Відлік почато', initNotiflix);
  let intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    if (deltaTime <= 500) {
      clearInterval(intervalId);
      return Notify.success('Відлік закінчено', initNotiflix);
    }
    const reverseTimer = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(reverseTimer.days);
    refs.hours.textContent = addLeadingZero(reverseTimer.hours);
    refs.minutes.textContent = addLeadingZero(reverseTimer.minutes);
    refs.seconds.textContent = addLeadingZero(reverseTimer.seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
