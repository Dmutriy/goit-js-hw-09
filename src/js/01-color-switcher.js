function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  delay: document.querySelector('input[name="delay"]'),
};

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;
let timerId = null;
refs.startBtn.addEventListener('click', evt => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  let delayValue = Number(refs.delay.value);
  //   console.log(delayValue);
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, delayValue);
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timerId);
});
