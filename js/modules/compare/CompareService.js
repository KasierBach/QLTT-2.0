/**
 * CompareService - OOP implementation replacing legacy compare logic from script.js.
 * Features:
 *  - toggle add/remove (max 3 items)
 *  - render compare UI section and list
 *  - persistence to localStorage
 *  - legacy globals bridge for backward compatibility
 */
(function () {
  'use strict';

  class CompareService {
    constructor() {
      this._selectors = {
        section: 'compare-section',
        list: 'compare-products',
      };
      this._ensureState();
    }

    // --------- State ---------
    _ensureState() {
      try {
        if (!Array.isArray(window.compareList)) {
          const saved = localStorage.getItem('compareList');
          window.compareList = saved ? JSON.parse(saved) : [];
        }
      } catch (_) {
        window.compareList = Array.isArray(window.compareList) ? window.compareList : [];
      }
    }

    get _list() {
      return Array.isArray(window.compareList) ? window.compareList : (window.compareList = []);
    }
    set _list(val) {
      window.compareList = Array.isArray(val) ? val : [];
    }

    // --------- DOM helpers ---------
    _el(id) {
      return document.getElementById(id);
    }
    get sectionEl() { return this._el(this._selectors.section); }
    get listEl() { return this._el(this._selectors.list); }

    _fmtPrice(v) {
      return (window.formatPrice || ((x) => String(x)))(v);
    }

    _stars(rating) {
      const r = Number(rating || 0);
      const full = Math.floor(r);
      const half = r % 1 !== 0;
      const empty = 5 - full - (half ? 1 : 0);
      let html = '';
      for (let i = 0; i < full; i++) html += '<i class="fas fa-star star"></i>';
      if (half) html += '<i class="fas fa-star-half-alt star"></i>';
      for (let i = 0; i < empty; i++) html += '<i class="far fa-star star empty"></i>';
      return html;
    }

    // --------- Public API ---------
    toggle(productId) {
      try {
        const products = Array.isArray(window.products) ? window.products : [];
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const idx = this._list.findIndex((it) => it.id === productId);
        if (idx > -1) {
          this._list.splice(idx, 1);
          if (window.showNotification) window.showNotification(`${product.name} đã được xóa khỏi danh sách so sánh`, 'info');
        } else {
          if (this._list.length >= 3) {
            if (window.showNotification) window.showNotification('Chỉ có thể so sánh tối đa 3 sản phẩm', 'warning');
            return;
          }
          this._list.push(product);
          if (window.showNotification) window.showNotification(`${product.name} đã được thêm vào danh sách so sánh`, 'success');
        }

        this.updateUI();
        this.save();

        // Re-render product grid (icons/active states) if available
        try {
          if (window.ProductListService && typeof window.ProductListService.render === 'function') {
            window.ProductListService.render(window.ProductListService.getFiltered());
          } else if (typeof window.displayProducts === 'function' && typeof window.getFilteredProducts === 'function') {
            window.displayProducts(window.getFilteredProducts());
          }
        } catch (_) {}
      } catch (e) {
        console.warn('[CompareService.toggle] failed:', e);
      }
    }

    remove(productId) {
      try {
        this._list = this._list.filter((it) => it.id !== productId);
        this.updateUI();
        this.save();

        // Re-render product grid if available
        try {
          if (window.ProductListService && typeof window.ProductListService.render === 'function') {
            window.ProductListService.render(window.ProductListService.getFiltered());
          } else if (typeof window.displayProducts === 'function' && typeof window.getFilteredProducts === 'function') {
            window.displayProducts(window.getFilteredProducts());
          }
        } catch (_) {}
      } catch (e) {
        console.warn('[CompareService.remove] failed:', e);
      }
    }

    // --------- UI Rendering ---------
    updateUI() {
      try {
        const section = this.sectionEl;
        const container = this.listEl;
        if (!section || !container) return;

        if (this._list.length > 0) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }

        container.innerHTML = '';

        this._list.forEach((product) => {
          const item = document.createElement('div');
          item.className = 'compare-item';
          // Build specs preview (first 5 pairs)
          const specs = Object.entries(product.specifications || {}).slice(0, 5).map(
            ([key, value]) => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>${key}:</span>
                <span>${value}</span>
              </div>
            `
          ).join('');

          item.innerHTML = `
            <div style="position: relative;">
              <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
              <button onclick="removeFromCompare(${product.id})" style="position: absolute; top: 10px; right: 10px; background: var(--accent-color); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <h3>${product.name}</h3>
            <div style="color: var(--accent-color); font-weight: 600; margin: 0.5rem 0;">${this._fmtPrice(product.price)}</div>
            ${
              product.rating
                ? `
                  <div style="margin-bottom: 1rem;">
                    ${this._stars(product.rating)} (${product.reviewCount || 0})
                  </div>
                `
                : ''
            }
            <div style="font-size: 0.875rem; color: var(--text-secondary);">
              ${specs}
            </div>
            <button onclick="addToCart(${product.id})" style="width: 100%; margin-top: 1rem; padding: 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
              Thêm vào giỏ
            </button>
          `;
          container.appendChild(item);
        });
      } catch (e) {
        console.warn('[CompareService.updateUI] failed:', e);
      }
    }

    // --------- Persistence ---------
    save() {
      try {
        localStorage.setItem('compareList', JSON.stringify(this._list));
      } catch (_) {}
    }

    // --------- Queries ---------
    getItems() {
      return [...this._list];
    }
    getCount() {
      return this._list.length;
    }

    // --------- Legacy bridge ---------
    installGlobals() {
      const self = this;
      window.toggleCompareItem = (id) => self.toggle(id);
      window.removeFromCompare = (id) => self.remove(id);
      window.updateCompareUI = () => self.updateUI();
      window.saveCompareList = () => self.save();
    }
  }

  // Singleton + install bridges
  if (!window.CompareService) {
    window.CompareService = new CompareService();
  }
  try {
    window.CompareService.installGlobals();
  } catch (_) {}
})();