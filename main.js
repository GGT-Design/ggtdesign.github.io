document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle_btn")
  const toggleBtnIcon = document.querySelector(".toggle_btn i")
  const offCanvasMenu = document.getElementById("offcanvasMenu");

  const minute = document.querySelector('.minutenzeiger');
  const stunde = document.querySelector('.stundenzeiger');
  const stoppuhr = document.querySelector('.stoppuhrzeiger');
  const totalisatorLinks = document.querySelector('.totalisator-links');
  const totalisatorRechts = document.querySelector('.totalisator-rechts');
  const totalisatorUnten = document.querySelector('.totalisator-unten');

  let sekundenVerlauf = 0;
  let minutenVerlauf = 0;
  let stundenVerlauf = 0;
  let stoppuhrVerlauf = 0;
  let totalisatorRechtsVerlauf = 0;
  let totalisatorUntenVerlauf = 0;

  function toggleOffCanvas() {
    offCanvasMenu.classList.toggle('open');

    const isOpen = offCanvasMenu.classList.contains("open");
    toggleBtnIcon.classList = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
  }
  toggleBtn.addEventListener("click", toggleOffCanvas);

  function updateClock() {
    const now = Date.now();
    const date = new Date;
    const millisekunden = date.getMilliseconds();
    const sekunden = date.getSeconds();
    const minuten = date.getMinutes();
    const stunden = date.getHours();
    
    sekundenVerlauf = (sekunden * 6) + (millisekunden / 166.67);
    minutenVerlauf = (minuten * 6) + (sekunden / 10);
    stundenVerlauf = (stunden * 30) + (minuten / 2);

    minute.style.transform = `rotate(${minutenVerlauf}deg)`;
    stunde.style.transform = `rotate(${stundenVerlauf}deg)`;
    totalisatorLinks.style.transform = `rotate(${sekundenVerlauf}deg)`;

    if (typeof isRunning !== "undefined" && isRunning) {
      updateStoppuhr();
    }
    requestAnimationFrame(updateClock);
  }
  updateClock();
});
