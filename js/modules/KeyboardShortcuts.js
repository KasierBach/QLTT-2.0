/**
 * KeyboardShortcuts (OOP) - centralizes and de-duplicates global keyboard handling
 * Loads AFTER script.js and overrides window.setupKeyboardShortcuts for clarity.
 * Safe to include on all pages; it no-ops on inputs/textareas/contentEditable.
 */
(function () {
  class KeyboardShortcuts {
    constructor() {
      this._boundKeydown = this._onKeydown.bind(this);
      this._gPressed = false;
      this._gTimer = null;
      this._installed = false;
    }

    install() {
      if (this._installed) return;
      // Prevent duplicate listeners across hot reloads or multiple initializations
      if (window.__keyboardShortcutsInstalled) return;
      window.__keyboardShortcutsInstalled = true;

      document.addEventListener('keydown', this._boundKeydown);
      this._installed = true;
    }

    uninstall() {
      if (!this._installed) return;
      document.removeEventListener('keydown', this._boundKeydown);
      this._installed = false;
      window.__keyboardShortcutsInstalled = false;
    }

    _isTypingTarget(target) {
      const tag = (target && target.tagName ? target.tagName : '').toLowerCase();
      return tag === 'input' || tag === 'textarea' || (target && target.isContentEditable);
    }

    _onKeydown(e) {
      if (this._isTypingTarget(e.target)) return;

      // "/" focus search
      if (e.key === '/') {
        e.preventDefault();
        try {
          const searchInput = document.getElementById('search-input');
          if (searchInput) searchInput.focus();
        } catch (_) {}
        return;
      }

      // "t" scroll to top
      if (e.key && e.key.toLowerCase() === 't') {
        if (typeof window.scrollToTop === 'function') {
          window.scrollToTop();
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // "?" open help
      if (e.key === '?') {
        e.preventDefault();
        if (typeof window.showHelpModal === 'function') {
          window.showHelpModal();
        } else {
          const modal = document.getElementById('help-modal');
          if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
        }
        return;
      }

      // "g" combos
      if (e.key && e.key.toLowerCase() === 'g') {
        this._gPressed = true;
        clearTimeout(this._gTimer);
        this._gTimer = setTimeout(() => (this._gPressed = false), 1000);
        return;
      }

      if (this._gPressed && e.key && e.key.toLowerCase() === 'h') {
        this._gPressed = false;
        // Go home
        try {
          window.location.href = window.location.pathname.endsWith('index.html') ? '#home' : 'index.html#home';
        } catch (_) {
          window.location.href = 'index.html#home';
        }
        return;
      }

      if (this._gPressed && e.key && e.key.toLowerCase() === 'p') {
        this._gPressed = false;
        // Go products
        window.location.href = 'products.html';
        return;
      }
    }
  }

  // Singleton
  const kb = new KeyboardShortcuts();

  // Override legacy setup function so initializeApp() continues to work unchanged
  window.setupKeyboardShortcuts = function () {
    kb.install();
  };

  // Optional expose for manual control
  window.KeyboardShortcuts = kb;
})();