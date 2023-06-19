function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

stopBtnRef.disabled = true;

startBtnRef.addEventListener('click', startSwitcherHandle);
stopBtnRef.addEventListener('click', stopSwitcherHandle);

function startSwitcherHandle() {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;

  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitcherHandle() {
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;

  clearInterval(timerId);
}
