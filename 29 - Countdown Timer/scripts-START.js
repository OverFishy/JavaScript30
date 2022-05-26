let COUNTDOWN;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any excisting timer running
  clearInterval(COUNTDOWN);

  const now = Date.now()
  const then = now + seconds * 1000;
  displayTimeLeft(seconds) //to display the first second
  displayEndTime(then);

    COUNTDOWN = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if timer is done
    if (secondsLeft < 0) {
      clearInterval(COUNTDOWN);
      return
    };

    // display seconds
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const reminderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
  document.title = display;
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours()
  const minutes = end.getMinutes()
  endTime.textContent = `Be back at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60)
  this.reset()
})
