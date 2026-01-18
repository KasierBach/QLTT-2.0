/**
 * RecentlyViewedService - provides addRecentlyViewed() and renderRecentlyViewed()
 * Independent from script.js; safe to include on pages that want the "Đã xem gần đây" grid.
 *
 * Exposes globals:
 *  - window.addRecentlyViewed(product)
 *  - window.renderRecentlyViewed()
 *
 * Requirements:
 *  - Container with id="recently-viewed-grid" on the page (optional; no-op if missing)
 *  - window.products if you want to create cards via ProductListService; otherwise falls back to a minimal card
 */
(function () {
  'use strict';

  class RecentlyViewedService {
    constructor(storageKey = 'recentlyViewed') {
      this.key = storageKey;
    }

    _load() {
      try {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : [];
      } catch (_) {
        return [];
      }
    }

    _save(list) {
      try {
        localStorage.setItem(this.key, JSON.stringify(list || []));
      } catch (_) {}
    }

    // Keep structure consistent with legacy: minimal snapshot of product
    _snapshot(product) {
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        badge: product.badge,
        rating: product.rating,
        reviewCount: product.reviewCount,
      };
    }

    add(product) {
      if (!product || typeof product.id === 'undefined') return;
      const items = this._load();
      const snap = this._snapshot(product);
      if (!snap) return;

      const filtered = items.filter((it) => it.id !== product.id);
      filtered.unshift(snap);
      const limited = filtered.slice(0, 12);

      this._save(limited);
      window.recentlyViewed = limited;
      this.render();
    }

    _createCard(p) {
      // Prefer full ProductListService card if available
      if (window.ProductListService && typeof window.ProductListService.createCard === 'function') {
        try {
          return window.ProductListService.createCard(p);
        } catch (_) {}
      }
      // Fallback compact card
      const fmt = window.formatPrice || ((v) => v);
      const div = document.createElement('div');
      div.className = 'product-card';
      div.style.cursor = 'pointer';
      div.onclick = function () {
        if (typeof window.viewProductDetails === 'function') {
          window.viewProductDetails(p.id);
        }
      };
      div.innerHTML = `
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        </div>
        <div class="product-info">
          <h3 class="product-title">${p.name}</h3>
          <div class="product-price">
            <span class="current-price">${fmt(p.price)}</span>
            ${p.originalPrice ? `<span class="original-price">${fmt(p.originalPrice)}</span>` : ''}
          </div>
        </div>
      `;
      return div;
    }

    render() {
      const grid = document.getElementById('recently-viewed-grid');
      if (!grid) return;

      const items = this._load();
      grid.innerHTML = '';
      if (!items.length) {
        grid.innerHTML = '<div style="grid-column:1 / -1; text-align:center; color: var(--text-secondary); padding: 1rem;">Chưa có sản phẩm nào</div>';
        return;
      }

      items.slice(0, 8).forEach((p) => {
        const card = this._createCard(p);
        if (card) grid.appendChild(card);
      });
    }

    // Legacy bridge
    installGlobals() {
      const self = this;
      window.addRecentlyViewed = function (product) { self.add(product); };
      window.renderRecentlyViewed = function () { self.render(); };
    }
  }

  if (!window.RecentlyViewedService) {
    window.RecentlyViewedService = new RecentlyViewedService();
  }
  try {
    window.RecentlyViewedService.installGlobals();
  } catch (_) {}
})();