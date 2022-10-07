import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  btnSubmit: document.querySelector('.form'),
};

function createPromise(i, delayValue) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ i, delayValue });
      } else {
        reject({ i, delayValue });
      }
    }, delayValue);
  });
}

refs.btnSubmit.addEventListener('submit', evt => {
  evt.preventDefault();
  let delayValue = Number(refs.delay.value);
  let stepValue = Number(refs.step.value);
  let amountValue = Number(refs.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ i, delayValue }) => {
        return Notify.success(`Fulfilled promise ${i} in ${delayValue}ms`);
      })
      .catch(({ i, delayValue }) => {
        return Notify.failure(`Rejected promise ${i} in ${delayValue}ms`);
      });
    delayValue += stepValue;
  }
});
