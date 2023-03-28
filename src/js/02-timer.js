import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const daysContainer = document.querySelector('[data-days]');
const hoursContainer = document.querySelector('[data-hours]');
const minutesContainer = document.querySelector('[data-minutes]');
const secondsContainer = document.querySelector('[data-seconds]');

startButton.setAttribute('disabled', 'disabled');
let selectedDate;
let presentDate;
let ms;
let timerId = null;

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    selectedDate = selectedDates[0].getTime();

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled', 'disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

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

const addLeadingZero = value => {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  }

  return value;
};

const setTextContent = (elem, value) => {
  elem.textContent = value;
}

const runTimer = () => {
  presentDate = new Date().getTime();
  ms = selectedDate - presentDate;
  const { days, hours, minutes, seconds } = convertMs(ms);
  setTextContent(daysContainer, addLeadingZero(days));
  setTextContent(hoursContainer, addLeadingZero(hours));
  setTextContent(minutesContainer, addLeadingZero(minutes));
  setTextContent(secondsContainer, addLeadingZero(seconds));
}

const handleCountdown = () => {
  runTimer();
  timerId = setInterval(() => {
    runTimer();
    if (ms < 1000) {
      clearInterval(timerId);
      startButton.setAttribute('disabled', 'disabled');
    }
  }, 1000);
};
startButton.addEventListener('click', handleCountdown);
