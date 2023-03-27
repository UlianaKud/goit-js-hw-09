import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const amountInput = document.querySelector('input[name="amount"]');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const handleSubmit = e => {
  e.preventDefault();
  const amount = amountInput.value;
  const delay = firstDelay.value;
  const step = delayStep.value;

  if (+amount <= 0 || +delay <= 0 || +step <= 0) {
    Notiflix.Notify.failure(`❌ All values should be greater than zero!`);
    return;
  }

  for (let index = 0; index < amount; index++) {
    createPromise(index + 1, +delay + +step * index)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

form.addEventListener('submit', handleSubmit);
