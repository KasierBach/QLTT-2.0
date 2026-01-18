/**
 * WishlistService - OOP implementation replacing legacy wishlist logic from script.js.
 * Features:
 *  - toggle add/remove
 *  - render wishlist UI
 *  - toggle wishlist modal
 *  - persistence in localStorage
 *  - legacy globals bridge for backward compatibility
 */
(function () {
  'use strict';

  class WishlistService {
    constructor() {
      this._selectors = {
        modal: 'wishlist-modal',
        items: 'wishlist-items',
        count: 'wishlist-count',
      };
      this._ensureState();
    }

    // --------- State ---------
    _ensureState() {
      try {
        if (!Array.isArray(window.wishlist)) {
          const saved = localStorage.getItem('wishlist');
          window.wishlist = saved ? JSON.parse(saved) : [];
        }
      } catch (_) {
        window.wishlist = Array.isArray(window.wishlist) ? window.wishlist : [];
      }
    }

    get _wishlist() {
      return Array.isArray(window.wishlist) ? window.wishlist : (window.wishlist = []);
    }
    set _wishlist(val) {
      window.wishlist = Array.isArray(val) ? val : [];
    }

    // --------- DOM helpers ---------
    _el(id) {
      return document.getElementById(id);
    }
    get modalEl() { return this._el(this._selectors.modal); }
    get itemsEl() { return this._el(this._selectors.items); }
    get countEl() { return this._el(this._selectors.count); }

    _fmtPrice(v) {
      return (window.formatPrice || ((x) => String(x)))(v);
    }

    // --------- Public API ---------
    toggle(productId) {
      try {
        const products = Array.isArray(window.products) ? window.products : [];
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const idx = this._wishlist.findIndex((it) => it.id === productId);
        if (idx > -1) {
          // remove
          this._wishlist.splice(idx, 1);
          if (window.showNotification) window.showNotification(`${product.name} đã được xóa khỏi danh sách yêu thích`, 'info');
        } else {
          // add
          this._wishlist.push(product);
          if (window.showNotification) window.showNotification(`${product.name} đã được thêm vào danh sách yêu thích`, 'success');
        }

        this.updateUI();
        this.save();

        // If products grid exists, re-render via ProductListService (if present)
        try {
          if (window.ProductListService && typeof window.ProductListService.render === 'function') {
            window.ProductListService.render(window.ProductListService.getFiltered());
          } else if (typeof window.displayProducts === 'function' && typeof window.getFilteredProducts === 'function') {
            window.displayProducts(window.getFilteredProducts());
          }
        } catch (_) {}
      } catch (e) {
        console.warn('[WishlistService.toggle] failed:', e);
      }
    }

    remove(productId) {
      try {
        this._wishlist = this._wishlist.filter((it) => it.id !== productId);
        this.updateUI();
        this.save();

        // re-render products if needed
        try {
          if (window.ProductListService && typeof window.ProductListService.render === 'function') {
            window.ProductListService.render(window.ProductListService.getFiltered());
          } else if (typeof window.displayProducts === 'function' && typeof window.getFilteredProducts === 'function') {
            window.displayProducts(window.getFilteredProducts());
          }
        } catch (_) {}
      } catch (e) {
        console.warn('[WishlistService.remove] failed:', e);
      }
    }

    // --------- UI Rendering ---------
    updateUI() {
      try {
        // Count bubble
        if (this.countEl) {
          this.countEl.textContent = this._wishlist.length;
        }

        const container = this.itemsEl;
        if (!container) return;

        container.innerHTML = '';

        if (this._wishlist.length === 0) {
          container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
              <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
              <h3>Danh sách yêu thích trống</h3>
              <p>Thêm sản phẩm yêu thích để xem sau</p>
            </div>
          `;
          return;
        }

        this._wishlist.forEach((item) => {
          const row = document.createElement('div');
          row.className = 'wishlist-item';
          row.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
              <div class="wishlist-item-title">${item.name}</div>
              <div class="wishlist-item-price">${this._fmtPrice(item.price)}</div>
              <div class="wishlist-item-actions">
                <button class="add-to-cart-from-wishlist" onclick="addToCart(${item.id}); removeFromWishlist(${item.id});">
                  <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
                <button class="remove-from-wishlist" onclick="removeFromWishlist(${item.id})">
                  <i class="fas fa-trash"></i> Xóa
                </button>
              </div>
            </div>
          `;
          container.appendChild(row);
        });
      } catch (e) {
        console.warn('[WishlistService.updateUI] failed:', e);
      }
    }

    toggleModal() {
      try {
        const modal = this.modalEl;
        if (!modal) return;
        const isVisible = modal.style.display === 'block';
        modal.style.display = isVisible ? 'none' : 'block';
        document.body.style.overflow = isVisible ? 'auto' : 'hidden';
      } catch (e) {
        console.warn('[WishlistService.toggleModal] failed:', e);
      }
    }

    save() {
      try {
        localStorage.setItem('wishlist', JSON.stringify(this._wishlist));
      } catch (_) {}
    }

    // --------- Queries ---------
    getItems() {
      return [...this._wishlist];
    }
    getCount() {
      return this._wishlist.length;
    }

    // --------- Legacy bridge ---------
    installGlobals() {
      const self = this;
      window.toggleWishlistItem = (id) => self.toggle(id);
      window.removeFromWishlist = (id) => self.remove(id);
      window.updateWishlistUI = () => self.updateUI();
      window.toggleWishlist = () => self.toggleModal();
      window.saveWishlist = () => self.save();
    }
  }

  // Singleton + install bridges
  if (!window.WishlistService) {
    window.WishlistService = new WishlistService();
  }
  try {
    window.WishlistService.installGlobals();
  } catch (_) {}
})();