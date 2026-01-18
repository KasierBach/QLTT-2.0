/**
 * LoadingService - provides global showLoading()/hideLoading() independent of script.js
 * Works with element: #loading (present on all pages)
 */
(function () {
  'use strict';

  function show() {
    try {
      const el = document.getElementById('loading');
      if (el) el.style.display = 'flex';
    } catch (_) {}
  }

  function hide() {
    try {
      const el = document.getElementById('loading');
      if (el) el.style.display = 'none';
    } catch (_) {}
  }

  // Legacy-compatible globals
  window.showLoading = show;
  window.hideLoading = hide;
})();