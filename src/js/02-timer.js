import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
// require('flatpickr/dist/themes/dark.css');

// Обираэмо кверіСелектори
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
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// -_-_-_-_-_-_-_-_-_-_-_-=-=-=-=-=-=-=-=-=-=-=-=-

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const TIMER_DEADLINE = new Date(2022, 8, 26, 21, 35);

// const timerRef = document.querySelector('.timer__items');

// const timer = {
//   intervalId: null,
//   refs: {},
//   notifyOptions: {
//     position: 'center-center',
//     backOverlay: true,
//     clickToClose: true,
//     closeButton: true,
//   },
//   start(rootSelector, deadline) {
//     const delta = deadline.getTime() - Date.now();
//     if (delta <= 0) {
//       Notify.failure(
//         'Вибраний час в минулому, виберіть дату в майбутньому!',
//         this.notifyOptions
//       );
//       return;
//     }
//     Notify.success('Відлік почався', this.notifyOptions);
//     this.getRefs(rootSelector);
//     this.intervalId = setInterval(() => {
//       const diff = deadline.getTime() - Date.now();

//       if (diff <= 1000) {
//         clearInterval(this.intervalId);
//         Notify.success('Дедлайн настав!', this.notifyOptions);
//       }

//       const data = this.convertMs(diff);
//       //   Object.entries(data).forEach(([name, value]) => {
//       //     this.refs[name].textContent = this.addLeadinZero(value);
//       //   });
//       this.refs.days.textContent = this.addLeadinZero(data.days);
//       this.refs.hours.textContent = this.addLeadinZero(data.hours);
//       this.refs.minutes.textContent = this.addLeadinZero(data.minutes);
//       this.refs.seconds.textContent = this.addLeadinZero(data.seconds);
//     }, 1000);
//   },

//   getRefs(rootSelector) {
//     // [...rootSelector.children].forEach(item => {
//     //   const { title } = item.dataset;
//     //   this.refs[title] = item;
//     // });
//     this.refs.days = rootSelector.querySelector('.js-timer__days');
//     this.refs.hours = rootSelector.querySelector('.js-timer__hours');
//     this.refs.minutes = rootSelector.querySelector('.js-timer__minutes');
//     this.refs.seconds = rootSelector.querySelector('.js-timer__seconds');
//   },
//   convertMs(diff) {
//     const days = Math.floor(diff / 1000 / 60 / 60 / 24);
//     const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
//     const minutes = Math.floor(diff / 1000 / 60) % 60;
//     const seconds = Math.floor(diff / 1000) % 60;
//     return { days, hours, minutes, seconds };
//   },
//   addLeadinZero(value) {
//     return String(value).padStart(2, '0');
//   },
// };

// // timer.start(timerRef, TIMER_DEADLINE);
// console.log(new Date('2030-03-16'));
// console.log(new Date('2030-03'));
// console.log(new Date('2018'));

// const interval1 = setInterval(function () {
//   // body
// }, 1000);

// const interval2 = setInterval(function () {
//   // body
// }, 1000);

// const interval3 = setInterval(function () {
//   // body
// }, 1000);
