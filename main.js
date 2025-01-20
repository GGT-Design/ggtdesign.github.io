document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle_btn")
  const toggleBtnIcon = document.querySelector(".toggle_btn i")
  const offCanvasMenu = document.getElementById("offcanvasMenu");
  const closeBtn = document.querySelector(".close_btn i");

  const minute = document.querySelector('.minutenzeiger');
  const stunde = document.querySelector('.stundenzeiger');
  const totalisatorLinks = document.querySelector('.totalisator-links');
  const messschieber = document.querySelector('.messschieber');

  let sekundenVerlauf = 0;
  let minutenVerlauf = 0;
  let stundenVerlauf = 0;

  let isDragging = false;
  let currentAngle = 0;

  function toggleOffCanvas() {
    offCanvasMenu.classList.toggle('open');

    const isOpen = offCanvasMenu.classList.contains("open");
    toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark": "fa-solid fa-bars";
  }
  
  function closeOffCanvas() {
    offCanvasMenu.classList.remove('open');
    toggleBtnIcon.classList = "fa-solid fa-bars";
  }

  toggleBtn.addEventListener("click", toggleOffCanvas);
  closeBtn.addEventListener("click", closeOffCanvas);

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

  messschieber.addEventListener('mousedown', (e) => {
    if (isDragging) return;
    isDragging = true;
    messschieber.style.transition = 'none';
  
    const rect = messschieber.getBoundingClientRect();
  
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  
    const transform = window.getComputedStyle(messschieber).transform;
  
    let matrix = transform.match(/matrix\(([^)]+)\)/);
  
    if (matrix) {
      let values = matrix[1].split(', ');
      let a = parseFloat(values[0]);
      let b = parseFloat(values[1]);
      currentAngle = Math.atan2(b, a);
    }
  
    const startAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) - currentAngle;
  
    function onMouseMove(e) {
      if (!isDragging) return;
      let newAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) - startAngle;
      messschieber.style.transform = `rotate(${newAngle}rad)`;
    }
  
    function onMouseUp() {
      isDragging = false;
      currentAngle = parseFloat(messschieber.style.transform.match(/rotate\(([^)]+)rad\)/)[1]);
      messschieber.style.transition = 'transform 0.5s ease';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});
