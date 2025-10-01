function Timer() {
  const counterElement = [
    document.getElementById("days"),
    document.getElementById("hours"),
    document.getElementById("minutes"),
    document.getElementById("seconds"),
  ];

  setInterval(() => {
    updateTimer(counterElement);
  }, 1000);
}

function updateTimer(counterElement) {
  const now = new Date();
  const targetDate = new Date(
    Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59)
  ); // 31 декабря текущего года 23:59:59 UTC

  if (now > targetDate) {
    targetDate = new Date(
      Date.UTC(now.getUTCFullYear() + 1, 11, 31, 23, 59, 59)
    );
  }
  const nowUTC = Date.now();
  const timeDiff = targetDate - nowUTC;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  counterElement[0].innerHTML = days;
  counterElement[1].innerHTML = hours;
  counterElement[2].innerHTML = minutes;
  counterElement[3].innerHTML = seconds;
}

Timer();
