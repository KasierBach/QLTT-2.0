/**
 * UIGlobals - small core shims for header/menu/search behaviors independent of script.js
 * Provides:
 *  - toggleUserMenu() global
 *  - Mobile hamburger menu open/close and auto-close on outside click/link click
 *  - Smooth scroll for in-page anchors
 *  - Search suggestions: input handling (debounced), focus show, outside click hide, prevent Enter submit
 *  - Filters/sort/price input bindings for products page
 *
 * Safe to include on all pages; no-ops if elements are missing.
 */
(function () {
  'use strict';

  function $(sel, root) {
    try {
      return (root || document).querySelector(sel);
    } catch (_) {
      return null;
    }
  }
  function $all(sel, root) {
    try {
      return Array.from((root || document).querySelectorAll(sel));
    } catch (_) {
      return [];
    }
  }

  // Global: toggleUserMenu (header user avatar)
  window.toggleUserMenu = function toggleUserMenu() {
    try {
      const dropdown = $('#user-dropdown');
      if (!dropdown) return;
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
    } catch (_) {}
  };

  function bindHamburger() {
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      try {
        if (!e.target.closest('.nav-container')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      } catch (_) {}
    });

    // Close mobile menu when clicking on links
    $all('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  function bindSmoothScrollAnchors() {
    $all('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        try {
          const href = this.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (_) {}
      });
    });
  }

  // ----- Search bindings (works with ProductListService legacy globals if present) -----
  function bindSearch() {
    const searchInput = $('#search-input');
    const searchSuggestions = $('#search-suggestions');

    // Outside click hides suggestions
    document.addEventListener('click', (e) => {
      try {
        if (!e.target.closest('.search-container')) {
          if (typeof window.hideSearchSuggestions === 'function') {
            window.hideSearchSuggestions(e);
          } else if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
          }
        }
      } catch (_) {}
    });

    if (!searchInput) return;

    // Prevent Enter submit + hide suggestions
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (searchSuggestions) searchSuggestions.style.display = 'none';
      }
    });

    // Debounced input -> handleSearch
    const debounced = (fn, wait) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };

    const onInput = (e) => {
      if (typeof window.handleSearch === 'function') {
        window.handleSearch(e);
      }
    };

    searchInput.addEventListener('input', debounced(onInput, 300));

    // Focus -> show suggestions if >= 2 chars
    searchInput.addEventListener('focus', () => {
      try {
        const val = (searchInput.value || '').toLowerCase().trim();
        if (val.length >= 2) {
          if (typeof window.showSearchSuggestions === 'function') {
            window.showSearchSuggestions(val);
          }
        }
      } catch (_) {}
    });
  }

  // ----- Products page bindings (filters/sort/price) -----
  function bindProductsFilters() {
    // Filter buttons -> window.handleFilter
    $all('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (typeof window.handleFilter === 'function') {
          window.handleFilter(e);
        }
      });
    });

    // Sort select -> window.handleSort
    const sortSelect = $('#sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        if (typeof window.handleSort === 'function') {
          window.handleSort(e);
        }
      });
    }

    // Price range -> window.handlePriceFilter (debounced)
    const minPrice = $('#min-price');
    const maxPrice = $('#max-price');
    const debounced = (fn, wait) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };
    const onPriceInput = () => {
      if (typeof window.handlePriceFilter === 'function') {
        window.handlePriceFilter();
      }
    };
    if (minPrice) minPrice.addEventListener('input', debounced(onPriceInput, 500));
    if (maxPrice) maxPrice.addEventListener('input', debounced(onPriceInput, 500));
  }

  function init() {
    bindHamburger();
    bindSmoothScrollAnchors();
    bindSearch();
    bindProductsFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();