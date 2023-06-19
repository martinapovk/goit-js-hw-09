import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnRef = document.querySelector('button[data-start]');
const countOfDaysRef = document.querySelector('span[data-days]');
const countOfHourssRef = document.querySelector('span[data-hours]');
const countOfMinutesRef = document.querySelector('span[data-minutes]');
const countOfSecondsRef = document.querySelector('span[data-seconds]');
const inputDateRef = document.querySelector('input[type="text"]');

startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnRef.disabled = true;
      return;
    }
    startBtnRef.disabled = false;
  },
};

const fp = flatpickr('input[type="text"]', options);

startBtnRef.addEventListener('click', startTimerHandle);

function startTimerHandle() {
  startBtnRef.disabled = true;
  inputDateRef.disabled = true;

  timerId = setInterval(() => {
    const timeOver = convertMs(fp.selectedDates[0] - new Date());

    countOfDaysRef.textContent = addLeadingZero(timeOver.days);
    countOfHourssRef.textContent = addLeadingZero(timeOver.hours);
    countOfMinutesRef.textContent = addLeadingZero(timeOver.minutes);
    countOfSecondsRef.textContent = addLeadingZero(timeOver.seconds);

    if (
      !timeOver.days &&
      !timeOver.hours &&
      !timeOver.minutes &&
      !timeOver.seconds
    ) {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
