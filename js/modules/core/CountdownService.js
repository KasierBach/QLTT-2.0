/**
 * CountdownService - Flash Sale countdown independent of script.js
 * Looks for elements:
 *   #countdown, #hours, #minutes, #seconds
 * Auto-starts on DOMContentLoaded if elements are found.
 * Exposes:
 *   window.startCountdown() // optional manual trigger
 */
(function () {
  'use strict';

  // 24h window by default (similar to legacy)
  const FLASH_WINDOW_MS = 24 * 60 * 60 * 1000;

  function getElements() {
    const countdown = document.getElementById('countdown');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    return { countdown, hours, minutes, seconds };
  }

  function format2(n) {
    return String(n).padStart(2, '0');
  }

  function start() {
    const { countdown, hours, minutes, seconds } = getElements();
    if (!countdown || !hours || !minutes || !seconds) {
      // No countdown on this page
      return;
    }

    const flashSaleStart = Date.now();
    const flashSaleEnd = flashSaleStart + FLASH_WINDOW_MS;

    function update() {
      const now = Date.now();

      if (now < flashSaleStart) {
        countdown.style.display = 'block';
        if (hours.parentElement) hours.parentElement.style.display = 'none';
        countdown.innerHTML = '<div style="color: var(--accent-color); font-weight: 600;">Flash Sale sắp bắt đầu!</div>';
        return false;
      }

      if (now > flashSaleEnd) {
        countdown.style.display = 'block';
        if (hours.parentElement) hours.parentElement.style.display = 'none';
        countdown.innerHTML = '<div style="color: var(--accent-color); font-weight: 600;">Flash Sale đã kết thúc!</div>';
        return false;
      }

      const distance = flashSaleEnd - now;
      const h = Math.floor(distance / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.style.display = 'flex';
      if (hours.parentElement) hours.parentElement.style.display = 'flex';
      hours.textContent = format2(h);
      minutes.textContent = format2(m);
      seconds.textContent = format2(s);
      return true;
    }

    // Initial paint
    if (!update()) return;

    const timer = setInterval(() => {
      if (!update()) {
        clearInterval(timer);
      }
    }, 1000);
  }

  // Expose manual start if needed
  window.startCountdown = start;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();