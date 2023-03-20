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
  const amount = amountInput.value > 0 ? amountInput.value : 0;
  const delay = firstDelay.value > 0 ? firstDelay.value : 0;
  const step = delayStep.value > 0 ? delayStep.value : 0;
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
