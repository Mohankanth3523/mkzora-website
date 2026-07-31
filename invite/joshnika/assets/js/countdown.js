(function () {
  const TARGET_DATE = new Date("2026-08-09T13:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      document.getElementById("cd-days").textContent = "00";
      document.getElementById("cd-hours").textContent = "00";
      document.getElementById("cd-minutes").textContent = "00";
      document.getElementById("cd-seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMin = document.getElementById("cd-minutes");
    const elSec = document.getElementById("cd-seconds");

    if (elDays) elDays.textContent = String(days).padStart(2, "0");
    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMin) elMin.textContent = String(minutes).padStart(2, "0");
    if (elSec) elSec.textContent = String(seconds).padStart(2, "0");
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
})();