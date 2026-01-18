/**
 * HelpModal - provides global showHelpModal()/closeHelpModal() independent of script.js
 * Works with element: #help-modal (structure present in index.html/products.html/news.html)
 */
(function () {
  'use strict';

  function show() {
    const modal = document.getElementById('help-modal');
    if (!modal) return;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    try { document.body.style.overflow = 'hidden'; } catch (_) {}
  }

  function close() {
    const modal = document.getElementById('help-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    try { document.body.style.overflow = 'auto'; } catch (_) {}
  }

  // Expose globals (legacy-compatible)
  window.showHelpModal = show;
  window.closeHelpModal = close;
})();