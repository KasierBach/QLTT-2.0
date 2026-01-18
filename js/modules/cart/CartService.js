/**
 * CartService - OOP implementation replacing legacy cart logic from script.js.
 * Features:
 *  - add/remove/update quantity
 *  - render cart UI
 *  - totals (subtotal/discount/total) with coupon support
 *  - toggle modal, persistence to localStorage
 *  - legacy globals bridge installed for backward compatibility
 */
(function () {
  'use strict';

  class CartService {
    constructor() {
      this._selectors = {
        modal: 'cart-modal',
        items: 'cart-items',
        count: 'cart-count',
        subtotal: 'cart-subtotal',
        total: 'cart-total',
        discountAmount: 'discount-amount',
        discountLine: 'discount-line',
        couponInput: 'coupon-input',
      };

      // Ensure initial state
      this._ensureState();
    }

    // --------- State ---------
    _ensureState() {
      try {
        // Load cart from localStorage if global not initialized
        if (!Array.isArray(window.cart)) {
          const saved = localStorage.getItem('cart');
          window.cart = saved ? JSON.parse(saved) : [];
        }
      } catch (_) {
        window.cart = Array.isArray(window.cart) ? window.cart : [];
      }

      // Applied coupon
      if (!window.appliedCoupon) {
        window.appliedCoupon = null;
      }
    }

    get _cart() {
      return Array.isArray(window.cart) ? window.cart : (window.cart = []);
    }
    set _cart(val) {
      window.cart = Array.isArray(val) ? val : [];
    }

    get _appliedCoupon() {
      return window.appliedCoupon || null;
    }
    set _appliedCoupon(c) {
      window.appliedCoupon = c || null;
    }

    // --------- DOM helpers ---------
    _el(id) {
      return document.getElementById(id);
    }
    get modalEl() { return this._el(this._selectors.modal); }
    get itemsEl() { return this._el(this._selectors.items); }
    get countEl() { return this._el(this._selectors.count); }
    get subtotalEl() { return this._el(this._selectors.subtotal); }
    get totalEl() { return this._el(this._selectors.total); }
    get discountAmountEl() { return this._el(this._selectors.discountAmount); }
    get discountLineEl() { return this._el(this._selectors.discountLine); }
    get couponInputEl() { return this._el(this._selectors.couponInput); }

    _fmtPrice(v) {
      return (window.formatPrice || ((x) => String(x)))(v);
    }

    // --------- Public API ---------
    add(productId, quantity = 1) {
      try {
        const products = Array.isArray(window.products) ? window.products : [];
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const qty = Math.max(1, parseInt(quantity, 10) || 1);

        // Basic add (no options from listing)
        const existing = this._cart.find((it) => it.id === productId);
        if (existing) {
          existing.quantity += qty;
        } else {
          this._cart.push({
            ...product,
            quantity: qty,
            // keep option fields for uniform rendering
            selectedColor: product.colors?.[0] || null,
            selectedSize: product.sizes?.[0] || null,
            selectedStorage: product.storage?.[0] || null,
            selectedMemory: product.memory?.[0] || null,
            selectedConnectivity: product.connectivity?.[0] || null,
          });
        }

        this.updateUI();
        this.save();
        if (typeof window.showNotification === 'function') {
          window.showNotification(`${product.name} đã được thêm vào giỏ hàng!`, 'success');
        }
        // Add points for user (legacy-compatible)
        if (window.currentUser && typeof window.addUserPoints === 'function') {
          window.addUserPoints(Math.floor((product.price || 0) / 100000));
        }
      } catch (e) {
        console.warn('[CartService.add] failed:', e);
      }
    }

    remove(productId) {
      try {
        this._cart = this._cart.filter((it) => it.id !== productId);
        this.updateUI();
        this.save();
        if (typeof window.showNotification === 'function') {
          window.showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
        }
      } catch (e) {
        console.warn('[CartService.remove] failed:', e);
      }
    }

    updateQuantity(productId, change) {
      try {
        const item = this._cart.find((it) => it.id === productId);
        if (!item) return;
        const delta = parseInt(change, 10) || 0;
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.remove(productId);
        } else {
          this.updateUI();
          this.save();
        }
      } catch (e) {
        console.warn('[CartService.updateQuantity] failed:', e);
      }
    }

    // --------- UI Rendering ---------
    updateUI() {
      try {
        // Update count
        const totalItems = this._cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
        if (this.countEl) {
          this.countEl.textContent = totalItems;
          this.countEl.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Items container
        const container = this.itemsEl;
        if (!container) return;

        container.innerHTML = '';

        if (this._cart.length === 0) {
          container.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
              <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
              <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Giỏ hàng trống</h3>
              <p style="margin-bottom: 1.5rem;">Thêm sản phẩm để bắt đầu mua sắm</p>
              <button onclick="try{window.CartService.toggleModal()}catch(_){document.getElementById('cart-modal').style.display='none';document.body.style.overflow='auto';}; window.location.href='products.html'"
                      style="padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 500; transition: var(--transition);">
                Khám phá sản phẩm
              </button>
            </div>
          `;
        } else {
          this._cart.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
              <img src="${item.image}" alt="${item.name}" onerror="this.src='/placeholder.svg?height=80&width=80'">
              <div class="cart-item-info">
                <div class="cart-item-title" title="${item.name}">${item.name}</div>
                <div class="cart-item-price">${this._fmtPrice(item.price)}</div>
                ${item.selectedColor ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Màu: ${item.selectedColor}</div>` : ''}
                ${item.selectedSize ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Size: ${item.selectedSize}</div>` : ''}
                ${item.selectedStorage ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Dung lượng: ${item.selectedStorage}</div>` : ''}
                ${item.selectedMemory ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">RAM: ${item.selectedMemory}</div>` : ''}
                ${item.selectedConnectivity ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Kết nối: ${item.selectedConnectivity}</div>` : ''}
                <div class="quantity-controls">
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" title="Giảm số lượng">-</button>
                  <span class="quantity-display">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" title="Tăng số lượng">+</button>
                </div>
              </div>
              <div class="remove-item" onclick="removeFromCart(${item.id})" title="Xóa sản phẩm">
                <i class="fas fa-trash"></i>
              </div>
            `;
            container.appendChild(row);
          });
        }

        this.updateTotals();
      } catch (e) {
        console.warn('[CartService.updateUI] failed:', e);
      }
    }

    updateTotals() {
      try {
        const subtotal = this._cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
        let discount = 0;

        const coupon = this._appliedCoupon;
        if (coupon) {
          if (typeof coupon.discount === 'number' && coupon.discount < 1) {
            discount = subtotal * coupon.discount;
          } else {
            discount = Number(coupon.discount || 0);
          }
        }

        const total = subtotal - discount;

        if (this.subtotalEl) this.subtotalEl.textContent = this._fmtPrice(subtotal);
        if (this.totalEl) this.totalEl.textContent = this._fmtPrice(total);

        if (this.discountAmountEl && this.discountLineEl) {
          if (discount > 0) {
            this.discountAmountEl.textContent = `-${this._fmtPrice(discount)}`;
            this.discountLineEl.style.display = 'flex';
          } else {
            this.discountLineEl.style.display = 'none';
          }
        }
      } catch (e) {
        console.warn('[CartService.updateTotals] failed:', e);
      }
    }

    applyCoupon() {
      try {
        const input = this.couponInputEl;
        if (!input) return;

        const code = (input.value || '').trim().toUpperCase();
        if (!code) {
          if (window.showNotification) window.showNotification('Vui lòng nhập mã giảm giá', 'warning');
          input.focus();
          return;
        }

        if (this._cart.length === 0) {
          if (window.showNotification) window.showNotification('Giỏ hàng trống, không thể áp dụng mã giảm giá', 'warning');
          return;
        }

        const dict = window.coupons || {};
        const coupon = dict[code];
        if (!coupon) {
          if (window.showNotification) window.showNotification('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
          input.focus();
          input.select();
          return;
        }

        const subtotal = this._cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
        if (subtotal < (coupon.minOrder || 0)) {
          if (window.showNotification) window.showNotification(`Đơn hàng tối thiểu ${this._fmtPrice(coupon.minOrder)} để sử dụng mã này`, 'warning');
          return;
        }

        if (this._appliedCoupon && this._appliedCoupon === coupon) {
          if (window.showNotification) window.showNotification('Mã giảm giá này đã được áp dụng', 'info');
          return;
        }

        this._appliedCoupon = coupon;
        this.updateTotals();
        input.value = '';
        if (window.showNotification) window.showNotification(`Áp dụng thành công: ${coupon.description || code}`, 'success');
      } catch (e) {
        console.warn('[CartService.applyCoupon] failed:', e);
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
        console.warn('[CartService.toggleModal] failed:', e);
      }
    }

    save() {
      try {
        localStorage.setItem('cart', JSON.stringify(this._cart));
      } catch (_) {}
    }

    // --------- Queries ---------
    getItems() {
      return [...this._cart];
    }
    getTotalItems() {
      return this._cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
    }
    getSubtotal() {
      return this._cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
    }
    getDiscount() {
      const subtotal = this.getSubtotal();
      const coupon = this._appliedCoupon;
      if (!coupon) return 0;
      if (typeof coupon.discount === 'number' && coupon.discount < 1) {
        return subtotal * coupon.discount;
      }
      return Number(coupon.discount || 0);
    }
    getTotal() {
      return this.getSubtotal() - this.getDiscount();
    }

    // --------- Legacy globals bridge ---------
    installGlobals() {
      const self = this;
      window.addToCart = (id, qty = 1) => self.add(id, qty);
      window.removeFromCart = (id) => self.remove(id);
      window.updateQuantity = (id, ch) => self.updateQuantity(id, ch);
      window.updateCartUI = () => self.updateUI();
      window.updateCartTotals = () => self.updateTotals();
      window.applyCoupon = () => self.applyCoupon();
      window.toggleCart = () => self.toggleModal();
      window.saveCart = () => self.save();
    }
  }

  // Singleton instance + install legacy bridges
  if (!window.CartService) {
    window.CartService = new CartService();
  }
  try {
    window.CartService.installGlobals();
  } catch (_) {}
})();