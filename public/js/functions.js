function calculateYearsDifference(date) {
  const currentDate = new Date();
  const daysDifference = Math.floor(
    (currentDate - date) / (24 * 60 * 60 * 1000)
  );
  const years = Math.floor(daysDifference / 365);
  const dayRemaining = daysDifference > 365 ? daysDifference - 365 : 0;

  return { years, days: dayRemaining };
}

function counterHtml(element, targetVal, time) {
  let targetValue = targetVal;
  let currentValue = 0;
  let increment = 1;
  let interval = time;
  let counterInterval;

  function updateCounter() {
    element.text(currentValue);
    if (currentValue < targetValue) {
      currentValue += increment;
    } else {
      clearInterval(counterInterval);
    }
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counterInterval = setInterval(updateCounter, interval);
        observer.disconnect();
      }
    });
  });

  // Observa el elemento
  observer.observe(element[0]);
}

export { calculateYearsDifference, counterHtml };
