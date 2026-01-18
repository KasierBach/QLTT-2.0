/**
 * App - Aggregation façade for all services
 * Purpose:
 *  - Expose a single window.App with references to all OOP services
 *  - Provide helper methods to install legacy global shims in one place
 *  - Non-invasive: does NOT call initializeApp() and does NOT change existing behavior
 *
 * Usage:
 *  - window.App.services.Cart.add(id, qty)
 *  - window.App.installAllGlobals() // optional: routes legacy globals to façades consistently
 *  - window.App.info() // returns brief info for debugging
 */
(function () {
  'use strict';

  class App {
    constructor() {
      this.services = {
        Utils: safeRef('Utils'),
        Cart: safeRef('CartService'),
        Wishlist: safeRef('WishlistService'),
        Compare: safeRef('CompareService'),
        ProductList: safeRef('ProductListService'),
        ProductDetail: safeRef('ProductDetailService'),
        Auth: safeRef('AuthService'),
        Checkout: safeRef('CheckoutService'),
        Chat: safeRef('ChatService'),
        Notifications: safeRef('NotificationService'),
        KeyboardShortcuts: safeRef('KeyboardShortcuts')
      };
    }

    /**
     * Call installGlobals() for every service that provides it.
     * This is optional and non-default to avoid changing behavior unexpectedly.
     */
    installAllGlobals() {
      Object.values(this.services).forEach((svc) => {
        if (svc && typeof svc.installGlobals === 'function') {
          try {
            svc.installGlobals();
          } catch (e) {
            console.warn('[App.installAllGlobals] install failed for service:', svc, e);
          }
        }
      });
      return true;
    }

    /**
     * Attach a safe reference to a service if present or return null.
     * Useful for dynamic environments/pages that don't load all modules.
     */
    refresh() {
      this.services = {
        Utils: safeRef('Utils'),
        Cart: safeRef('CartService'),
        Wishlist: safeRef('WishlistService'),
        Compare: safeRef('CompareService'),
        ProductList: safeRef('ProductListService'),
        ProductDetail: safeRef('ProductDetailService'),
        Auth: safeRef('AuthService'),
        Checkout: safeRef('CheckoutService'),
        Chat: safeRef('ChatService'),
        Notifications: safeRef('NotificationService'),
        KeyboardShortcuts: safeRef('KeyboardShortcuts')
      };
      return this.services;
    }

    /**
     * Simple info useful for debugging from console.
     */
    info() {
      try {
        const keys = Object.keys(this.services);
        const present = keys.filter((k) => !!this.services[k]);
        const missing = keys.filter((k) => !this.services[k]);
        return {
          present,
          missing,
          timestamp: new Date().toISOString()
        };
      } catch (e) {
        return { error: e?.message || String(e) };
      }
    }
  }

  function safeRef(name) {
    try {
      return window[name] || null;
    } catch (_) {
      return null;
    }
  }

  if (!window.App) {
    window.App = new App();
  } else {
    // Upgrade existing App with latest services map if needed
    try {
      if (!window.App.services) {
        window.App.services = {};
      }
      window.App.refresh?.();
    } catch (_) {}
  }
})();