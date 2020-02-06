const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button');
let countdown;


function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  clearInterval(countdown);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
    displayEndTime(then);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const display = `${mins}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const formattedHours = hours > 12 ? (hours - 12) : hours;
  const minutes = end.getMinutes();
  const formattedMinutes = minutes < 10 ? ('0' + minutes) : minutes;
  endTime.textContent = `Be back at ${formattedHours}:${formattedMinutes}`;
}

function startTimer() {
  timer(parseInt(this.dataset.time));
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
});