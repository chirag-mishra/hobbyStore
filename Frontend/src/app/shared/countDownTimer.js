ls_countDown = (futureTime, presentTime) => {
  let countDownDate = new Date(futureTime).getTime();
  let now = new Date(presentTime).getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let time = days + "  :  " + hours + "  :  " + minutes + "  :  " + seconds;
  if (distance < 0) {
    time = "false";
  }
  return time;
};

countDownTimer = {
  countDown: ls_countDown
}