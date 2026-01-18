(function () {
  'use strict';

  class ThemeService {
    constructor() {
      this.theme = (localStorage.getItem('theme') || 'light');
      this._scrollBound = false;
    }

    init() {
      try {
        this.applyTheme(this.theme);
      } catch (_) {}
      this.installGlobals();
      this.setupScrollEffects();
      this._wireBackToTop();
    }

    // Expose legacy-compatible globals so HTML onclicks keep working
    installGlobals() {
      const self = this;
      window.applyTheme = function (theme) { self.applyTheme(theme); };
      window.toggleTheme = function () { self.toggleTheme(); };
      window.scrollToTop = function () { self.scrollToTop(); };
    }

    applyTheme(theme) {
      if (!theme) theme = 'light';
      this.theme = theme;
      try {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
          icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        localStorage.setItem('theme', theme);
      } catch (_) {}
    }

    toggleTheme() {
      const next = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme(next);
    }

    setupScrollEffects() {
      if (this._scrollBound) return;
      this._scrollBound = true;

      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

        // Header background on scroll (matches legacy behavior)
        const header = document.querySelector('.header');
        if (header) {
          const isLight = (document.documentElement.getAttribute('data-theme') || 'light') === 'light';
          if (scrollTop > 100) {
            header.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(17, 24, 39, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
          } else {
            header.style.background = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.95)';
            header.style.boxShadow = 'none';
          }
        }

        // Back to top button visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
          backToTopBtn.style.display = scrollTop > 500 ? 'flex' : 'none';
        }

        // Parallax effect for hero section (if exists)
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.style.transform = 'translateY(' + (scrollTop * 0.3) + 'px)';
        }
      }, { passive: true });
    }

    _wireBackToTop() {
      const btn = document.getElementById('back-to-top');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.scrollToTop();
        });
      }
    }

    scrollToTop() {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    }
  }

  // Singleton instance + auto-init
  if (!window.ThemeService) {
    window.ThemeService = new ThemeService();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => window.ThemeService.init());
    } else {
      window.ThemeService.init();
    }
  }
})();