import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayInputRef = document.querySelector('input[name="delay"]');
const stepInputRef = document.querySelector('input[name="step"]');
const amountInputRef = document.querySelector('input[name="amount"]');

formRef.addEventListener('submit', formSubmitHandle);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfill promise ${position + 1} in ${delay}ms`);
      } else {
        reject(`❌ Reject promise ${position + 1} in ${delay}ms`);
      }
    }, delay);
  });
}

function formSubmitHandle(evt) {
  evt.preventDefault();

  for (let i = 0; i < amountInputRef.value; i += 1) {
    const delay = Number(delayInputRef.value) + i * Number(stepInputRef.value);

    createPromise(i, delay)
      .then(res => Notiflix.Notify.success(res))
      .catch(rej => Notiflix.Notify.failure(rej));
  }
}
