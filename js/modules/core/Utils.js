/**
 * Utils - OOP singleton for common helpers
 * Exposed globally at window.Utils
 * Methods:
 *  - debounce(func, wait)
 *  - formatPrice(price)
 *  - formatDate(dateString)
 *
 * Safe legacy shims are provided so existing global functions keep working.
 */
(function () {
  'use strict';

  class Utils {
    /**
     * Returns a debounced version of the function.
     * The function will be invoked after `wait` ms from the last call.
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const that = this;
        const later = () => {
          clearTimeout(timeout);
          func.apply(that, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    /**
     * Format a number as VND currency using vi-VN locale.
     */
    formatPrice(price) {
      try {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(price);
      } catch (_) {
        // Fallback
        return `${Number(price || 0).toLocaleString('vi-VN')} đ`;
      }
    }

    /**
     * Format an ISO date string into a long vi-VN date (e.g., 1 tháng 1, 2025).
     */
    formatDate(dateString) {
      try {
        return new Date(dateString).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch (_) {
        return dateString;
      }
    }
  }

  // Create singleton
  if (!window.Utils) {
    window.Utils = new Utils();
  }

  // Legacy global shims (non-invasive) to ease gradual refactor:
  if (typeof window.debounce !== 'function') {
    window.debounce = function (func, wait) {
      return window.Utils.debounce(func, wait);
    };
  }

  if (typeof window.formatPrice !== 'function') {
    window.formatPrice = function (price) {
      return window.Utils.formatPrice(price);
    };
  }

  if (typeof window.formatDate !== 'function') {
    window.formatDate = function (dateString) {
      return window.Utils.formatDate(dateString);
    };
  }
})();