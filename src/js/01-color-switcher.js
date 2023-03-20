const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const setBodyColor = () => {
  let color = `${getRandomHexColor()}`;
  bodyEl.style.backgroundColor = color;
};

const handleChangeColor = () => {
  startButton.setAttribute('disabled', 'disabled');
  stopButton.removeAttribute('disabled', 'disabled');
  setBodyColor();
  timerId = setInterval(() => {
    setBodyColor();
  }, 1000);
};

const handleStopChanging = () => {
  clearInterval(timerId);
  startButton.removeAttribute('disabled', 'disabled');
  stopButton.setAttribute('disabled', 'disabled');
};

startButton.addEventListener('click', handleChangeColor);
stopButton.addEventListener('click', handleStopChanging);
