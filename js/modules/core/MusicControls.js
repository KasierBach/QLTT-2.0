/**
 * MusicControls - provides global toggleMusicControls() independent of script.js
 * Works with element: #background-music-controls (created by background-music.js consumer)
 * Keeps legacy inline onclick="toggleMusicControls()" working after removing script.js.
 */
(function () {
  'use strict';

  function toggle() {
    try {
      const container = document.getElementById('background-music-controls');
      if (!container) {
        if (typeof window.showNotification === 'function') {
          window.showNotification('Không tìm thấy điều khiển nhạc nền', 'warning');
        }
        return;
      }
      if (container.style.display === 'none' || getComputedStyle(container).display === 'none') {
        container.style.display = 'flex';
      } else {
        container.style.display = 'none';
      }
    } catch (_) {}
  }

  // Expose legacy global
  window.toggleMusicControls = toggle;
})();