/**
 * CheckoutService - OOP implementation replacing legacy checkout + map helpers from script.js
 * Features:
 *  - proceed (pre-checks: cart, auth)
 *  - open/close modal
 *  - steps: 1) Info + address + map, 2) Shipping + time, 3) Payment + order summary
 *  - validation and navigation
 *  - shipping handlers, payment handlers
 *  - map: init, select location, search address, current location, confirm selection
 *  - complete order (persists orders, clears cart, points)
 *  - legacy globals bridge installed for backward compatibility
 */
(function () {
  'use strict';

  class CheckoutService {
    constructor() {
      this._selectors = {
        modal: 'checkout-modal',
        form: 'checkout-form',
        steps: '.checkout-steps .step',
        map: 'checkout-map',
      };
      this.map = null;
      this.selectedLocation = null; // L.LatLng or {lat, lng}

      // Try load existing orders
      try {
        if (!Array.isArray(window.orders)) {
          const savedOrders = localStorage.getItem('orders');
          window.orders = savedOrders ? JSON.parse(savedOrders) : [];
        }
      } catch (_) {
        window.orders = Array.isArray(window.orders) ? window.orders : [];
      }
    }

    // -------------- DOM helpers --------------
    _el(id) {
      return document.getElementById(id);
    }
    get modalEl() {
      return this._el(this._selectors.modal);
    }
    get formEl() {
      return this._el(this._selectors.form);
    }

    // -------------- Entry points --------------
    proceed() {
      const cart = Array.isArray(window.cart) ? window.cart : [];
      if (cart.length === 0) {
        if (window.showNotification) window.showNotification('Giỏ hàng của bạn đang trống!', 'error');
        return;
      }

      if (!window.currentUser) {
        if (window.showNotification) window.showNotification('Vui lòng đăng nhập để tiếp tục', 'warning');
        if (window.AuthService && typeof window.AuthService.openAuthModal === 'function') {
          window.AuthService.openAuthModal('login');
        } else if (typeof window.showAuthModal === 'function') {
          window.showAuthModal('login');
        }
        return;
      }

      // Close cart modal (if open)
      try {
        if (typeof window.toggleCart === 'function') window.toggleCart();
      } catch (_) {}

      this.open();
    }

    open() {
      const modal = this.modalEl;
      if (!modal) return;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      this.showStep(1);
    }

    close() {
      const modal = this.modalEl;
      if (!modal) return;
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // -------------- Steps --------------
    _activateSteps(step) {
      try {
        document.querySelectorAll(this._selectors.steps).forEach((el, index) => {
          el.classList.toggle('active', index + 1 <= step);
        });
      } catch (_) {}
    }

    showStep(step) {
      this._activateSteps(step);
      const checkoutForm = this.formEl;
      if (!checkoutForm) return;

      switch (step) {
        case 1: {
          checkoutForm.innerHTML = `
            <div class="form-section">
              <h3>Thông tin giao hàng</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Họ và tên *</label>
                  <input type="text" name="fullName" value="${window.currentUser?.fullName || ''}" required>
                </div>
                <div class="form-group">
                  <label>Số điện thoại *</label>
                  <input type="tel" name="phone" value="${window.currentUser?.phone || ''}" required>
                </div>
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" value="${window.currentUser?.email || ''}" required>
              </div>
              <div class="form-group">
                <label>Địa chỉ giao hàng *</label>
                <div class="address-input-container">
                  <textarea id="address-textarea" name="address" rows="2" placeholder="Nhập địa chỉ hoặc chọn trên bản đồ" required></textarea>
                  <button type="button" class="map-search-btn" onclick="searchAddressOnMap()">
                    <i class="fas fa-search-location"></i> Tìm trên bản đồ
                  </button>
                </div>
              </div>
              <div class="map-container">
                <div id="checkout-map" style="height: 350px; border: 1px solid var(--border-color); border-radius: var(--border-radius); margin-bottom: 1rem;"></div>
                <div class="map-controls">
                  <button type="button" class="map-btn" onclick="getCurrentLocation()">
                    <i class="fas fa-location-arrow"></i> Vị trí hiện tại
                  </button>
                  <button type="button" class="map-btn" onclick="confirmMapLocation()">
                    <i class="fas fa-check"></i> Xác nhận địa chỉ
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>Ghi chú đơn hàng</label>
                <textarea name="notes" rows="2" placeholder="Ghi chú về đơn hàng (thời gian hoặc chỉ dẫn chi tiết hơn)."></textarea>
              </div>
            </div>
            <div class="checkout-actions">
              <button type="button" class="checkout-back" onclick="closeCheckoutModal()">
                <i class="fas fa-arrow-left"></i> Quay lại
              </button>
              <button type="button" class="checkout-next" onclick="validateAndContinue(2)">
                Tiếp tục <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          `;
          // Initialize map after DOM rendered
          setTimeout(() => this.initMap(), 50);
          break;
        }

        case 2: {
          checkoutForm.innerHTML = `
            <div class="form-section">
              <h3><i class="fas fa-truck"></i> Phương thức giao hàng</h3>
              <div class="shipping-options">
                <div class="shipping-method selected" data-method="standard" data-fee="0">
                  <input type="radio" name="shipping" value="standard" checked>
                  <div class="shipping-icon"><i class="fas fa-truck"></i></div>
                  <div class="shipping-info">
                    <h4>Giao hàng tiêu chuẩn</h4>
                    <p>2-3 ngày làm việc</p>
                    <span class="shipping-fee">Miễn phí</span>
                  </div>
                  <div class="shipping-time">
                    <i class="fas fa-clock"></i><span>2-3 ngày</span>
                  </div>
                </div>
                <div class="shipping-method" data-method="express" data-fee="50000">
                  <input type="radio" name="shipping" value="express">
                  <div class="shipping-icon"><i class="fas fa-shipping-fast"></i></div>
                  <div class="shipping-info">
                    <h4>Giao hàng nhanh</h4>
                    <p>1-2 ngày làm việc</p>
                    <span class="shipping-fee">50,000đ</span>
                  </div>
                  <div class="shipping-time">
                    <i class="fas fa-clock"></i><span>1-2 ngày</span>
                  </div>
                </div>
                <div class="shipping-method" data-method="same-day" data-fee="100000">
                  <input type="radio" name="shipping" value="same-day">
                  <div class="shipping-icon"><i class="fas fa-bolt"></i></div>
                  <div class="shipping-info">
                    <h4>Giao hàng trong ngày</h4>
                    <p>Trong vòng 4-6 giờ</p>
                    <span class="shipping-fee">100,000đ</span>
                  </div>
                  <div class="shipping-time">
                    <i class="fas fa-clock"></i><span>4-6 giờ</span>
                  </div>
                </div>
              </div>

              <div class="delivery-time-selector">
                <h4><i class="fas fa-calendar-alt"></i> Chọn thời gian giao hàng</h4>
                <div class="time-slots">
                  <div class="time-slot active" data-time="morning">
                    <i class="fas fa-sun"></i><span>Sáng (8:00 - 12:00)</span>
                  </div>
                  <div class="time-slot" data-time="afternoon">
                    <i class="fas fa-cloud-sun"></i><span>Chiều (13:00 - 17:00)</span>
                  </div>
                  <div class="time-slot" data-time="evening">
                    <i class="fas fa-moon"></i><span>Tối (18:00 - 21:00)</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="checkout-actions">
              <button type="button" class="checkout-back" onclick="showCheckoutStep(1)">
                <i class="fas fa-arrow-left"></i> Quay lại
              </button>
              <button type="button" class="checkout-next" onclick="showCheckoutStep(3)">
                Tiếp tục <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          `;
          setTimeout(() => this.setupShippingHandlers(), 10);
          break;
        }

        case 3: {
          const cart = Array.isArray(window.cart) ? window.cart : [];
          const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
          let discount = 0;
          const appliedCoupon = window.appliedCoupon || null;
          if (appliedCoupon) {
            discount =
              typeof appliedCoupon.discount === 'number' && appliedCoupon.discount < 1
                ? subtotal * appliedCoupon.discount
                : Number(appliedCoupon.discount || 0);
          }
          const shippingFee = this.selectedShippingFee();
          const total = subtotal - discount + shippingFee;
          const fmt = window.formatPrice || ((v) => v);

          const itemsHtml = cart
            .map(
              (item) => `
              <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                  <h4>${item.name}</h4>
                  <p>Số lượng: ${item.quantity}</p>
                  ${item.selectedColor ? `<p>Màu: ${item.selectedColor}</p>` : ''}
                </div>
                <div class="item-price">${fmt((item.price || 0) * (item.quantity || 0))}</div>
              </div>
            `,
            )
            .join('');

          checkoutForm.innerHTML = `
            <div class="form-section">
              <h3>Phương thức thanh toán</h3>
              <div class="payment-methods">
                <div class="payment-method selected">
                  <input type="radio" name="payment" value="cod" checked>
                  <div class="payment-info">
                    <h4>Thanh toán khi nhận hàng (COD)</h4>
                    <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                    <span class="payment-badge">Phổ biến</span>
                  </div>
                </div>
                <div class="payment-method">
                  <input type="radio" name="payment" value="bank">
                  <div class="payment-info">
                    <h4>Chuyển khoản ngân hàng</h4>
                    <p>Chuyển khoản qua ATM/Internet Banking</p>
                    <span class="payment-discount">Giảm 2%</span>
                  </div>
                </div>
                <div class="payment-method">
                  <input type="radio" name="payment" value="momo">
                  <div class="payment-info">
                    <h4>Ví MoMo</h4>
                    <p>Thanh toán qua ví điện tử MoMo</p>
                    <span class="payment-discount">Giảm 1%</span>
                  </div>
                </div>
                <div class="payment-method">
                  <input type="radio" name="payment" value="card">
                  <div class="payment-info">
                    <h4>Thẻ tín dụng/ghi nợ</h4>
                    <p>Visa, Mastercard, JCB</p>
                    <span class="payment-secure"><i class="fas fa-shield-alt"></i> Bảo mật</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3><i class="fas fa-receipt"></i> Tóm tắt đơn hàng</h3>
              <div class="order-summary">
                <div class="order-items">${itemsHtml}</div>
                <div class="order-totals">
                  <div class="total-row"><span>Tạm tính:</span><span>${fmt(subtotal)}</span></div>
                  ${
                    discount > 0
                      ? `<div class="total-row discount"><span>Giảm giá:</span><span>-${fmt(discount)}</span></div>`
                      : ''
                  }
                  <div class="total-row"><span>Phí vận chuyển:</span><span>${shippingFee > 0 ? fmt(shippingFee) : 'Miễn phí'}</span></div>
                  <div class="total-row final"><span>Tổng cộng:</span><span>${fmt(total)}</span></div>
                </div>
              </div>
            </div>

            <div class="checkout-actions">
              <button type="button" class="checkout-back" onclick="showCheckoutStep(2)">
                <i class="fas fa-arrow-left"></i> Quay lại
              </button>
              <button type="button" class="checkout-next primary" onclick="completeOrder()">
                <i class="fas fa-check"></i> Đặt hàng
              </button>
            </div>
          `;
          setTimeout(() => this.setupPaymentHandlers(), 10);
          break;
        }
      }
    }

    validateAndContinue(nextStep) {
      const form = this.formEl;
      if (!form) return;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value || !input.value.trim()) {
          input.style.borderColor = 'var(--accent-color)';
          isValid = false;
        } else {
          input.style.borderColor = 'var(--border-color)';
        }
      });

      if (isValid) {
        this.showStep(nextStep);
      } else {
        if (window.showNotification) window.showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'warning');
      }
    }

    // -------------- Handlers --------------
    setupShippingHandlers() {
      try {
        document.querySelectorAll('.shipping-method').forEach((method) => {
          method.addEventListener('click', function () {
            document.querySelectorAll('.shipping-method').forEach((m) => m.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
          });
        });

        document.querySelectorAll('.time-slot').forEach((slot) => {
          slot.addEventListener('click', function () {
            document.querySelectorAll('.time-slot').forEach((s) => s.classList.remove('active'));
            this.classList.add('active');
          });
        });
      } catch (_) {}
    }

    setupPaymentHandlers() {
      try {
        document.querySelectorAll('.payment-method').forEach((method) => {
          method.addEventListener('click', function () {
            document.querySelectorAll('.payment-method').forEach((m) => m.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
          });
        });
      } catch (_) {}
    }

    // -------------- Shipping fee --------------
    selectedShippingFee() {
      const selected = document.querySelector('.shipping-method.selected');
      return selected ? parseInt(selected.getAttribute('data-fee') || '0', 10) : 0;
    }

    // -------------- Map (Leaflet) --------------
    initMap() {
      setTimeout(() => {
        try {
          if (!window.L) return;
          const mapEl = document.getElementById(this._selectors.map);
          if (!mapEl) return;

          const defaultCoords = [10.762622, 106.660172]; // HCMC center
          this.map = L.map(this._selectors.map).setView(defaultCoords, 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(this.map);

          // click to select location
          this.map.on('click', (e) => {
            this.selectLocationOnMap(e.latlng);
          });

          // Try geolocation
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                this.map.setView(coords, 15);
                this.selectLocationOnMap(L.latLng(coords[0], coords[1]));
              },
              () => {},
            );
          }
        } catch (_) {}
      }, 50);
    }

    _clearExistingMarkers() {
      if (!this.map) return;
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          try {
            this.map.removeLayer(layer);
          } catch (_) {}
        }
      });
    }

    selectLocationOnMap(latlng) {
      if (!latlng) return;
      this.selectedLocation = latlng;

      // Clear old markers and add new one
      try {
        this._clearExistingMarkers();
        L.marker([latlng.lat, latlng.lng]).addTo(this.map).bindPopup('Địa chỉ giao hàng').openPopup();
      } catch (_) {}

      // Reverse geocode to fill address
      try {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
          .then((r) => r.json())
          .then((data) => {
            if (data && data.display_name) {
              const textarea = document.getElementById('address-textarea');
              if (textarea) textarea.value = data.display_name;
            }
          })
          .catch(() => {});
      } catch (_) {}
    }

    searchAddress() {
      const address = (document.getElementById('address-textarea')?.value || '').trim();
      if (!address) {
        if (window.showNotification) window.showNotification('Vui lòng nhập địa chỉ để tìm kiếm', 'warning');
        return;
      }

      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && data.length > 0) {
            const result = data[0];
            const coords = [parseFloat(result.lat), parseFloat(result.lon)];
            if (this.map) this.map.setView(coords, 15);
            if (window.L) this.selectLocationOnMap(L.latLng(coords[0], coords[1]));
            if (window.showNotification) window.showNotification('Đã tìm thấy địa chỉ trên bản đồ', 'success');
          } else {
            if (window.showNotification) window.showNotification('Không tìm thấy địa chỉ. Vui lòng thử lại.', 'error');
          }
        })
        .catch(() => {
          if (window.showNotification) window.showNotification('Lỗi khi tìm kiếm địa chỉ', 'error');
        });
    }

    useCurrentLocation() {
      if (!navigator.geolocation) {
        if (window.showNotification) window.showNotification('Trình duyệt không hỗ trợ định vị', 'error');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          if (this.map) this.map.setView(coords, 15);
          if (window.L) this.selectLocationOnMap(L.latLng(coords[0], coords[1]));
          if (window.showNotification) window.showNotification('Đã cập nhật vị trí hiện tại', 'success');
        },
        () => {
          if (window.showNotification) window.showNotification('Không thể lấy vị trí hiện tại', 'error');
        },
      );
    }

    confirmMapLocation() {
      if (this.selectedLocation) {
        if (window.showNotification) window.showNotification('Đã xác nhận địa chỉ giao hàng', 'success');
      } else {
        if (window.showNotification) window.showNotification('Vui lòng chọn địa chỉ trên bản đồ', 'warning');
      }
    }

    // -------------- Complete order --------------
    complete() {
      // Loading
      try {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'flex';
      } catch (_) {}

      // Capture delivery info
      const addressTextarea = document.querySelector('#checkout-form textarea[name="address"]');
      const deliveryAddress = addressTextarea ? addressTextarea.value.trim() : '';
      const deliveryCoords = this.selectedLocation
        ? [this.selectedLocation.lat, this.selectedLocation.lng]
        : null;

      setTimeout(() => {
        try {
          const orderId = 'DH' + Date.now();
          const cart = Array.isArray(window.cart) ? window.cart : [];
          const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

          let discount = 0;
          const appliedCoupon = window.appliedCoupon || null;
          if (appliedCoupon) {
            discount =
              typeof appliedCoupon.discount === 'number' && appliedCoupon.discount < 1
                ? subtotal * appliedCoupon.discount
                : Number(appliedCoupon.discount || 0);
          }

          const shippingFee = this.selectedShippingFee();
          const total = subtotal - discount + shippingFee;

          const order = {
            id: orderId,
            userId: window.currentUser?.id,
            items: [...cart],
            subtotal,
            discount,
            shippingFee,
            total,
            status: 'pending',
            date: new Date().toISOString(),
            appliedCoupon: appliedCoupon ? appliedCoupon.description : null,
            deliveryAddress,
            deliveryCoords,
            shippingMethod: document.querySelector('input[name="shipping"]:checked')?.value || 'standard',
            paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
          };

          // Persist order
          window.orders.push(order);
          localStorage.setItem('orders', JSON.stringify(window.orders));

          // Points
          if (window.addUserPoints) {
            window.addUserPoints(Math.floor(total / 100000));
          }

          // Clear cart + coupon + location
          window.cart = [];
          window.appliedCoupon = null;
          this.selectedLocation = null;
          if (typeof window.updateCartUI === 'function') window.updateCartUI();
          try {
            localStorage.setItem('cart', JSON.stringify([]));
          } catch (_) {}

          // Hide loading + modal
          try {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
          } catch (_) {}

          this.close();

          // Notify
          if (window.showNotification) window.showNotification('Đặt hàng thành công!', 'success', `Mã đơn hàng: ${orderId}`);

          // Alert confirmation
          setTimeout(() => {
            const fmt = window.formatPrice || ((v) => v);
            alert(
`Cảm ơn bạn đã đặt hàng!

Mã đơn hàng: ${orderId}
Tổng tiền: ${fmt(total)}
Phí vận chuyển: ${shippingFee > 0 ? fmt(shippingFee) : 'Miễn phí'}

Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.`.trim()
            );
          }, 1000);
        } catch (e) {
          try {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
          } catch (_) {}
          console.warn('[CheckoutService.complete] failed:', e);
        }
      }, 1200);
    }

    // -------------- Legacy bridge --------------
    installGlobals() {
      const self = this;
      window.proceedToCheckout = () => self.proceed();
      window.showCheckoutModal = () => self.open();
      window.closeCheckoutModal = () => self.close();
      window.showCheckoutStep = (step) => self.showStep(step);
      window.validateAndContinue = (next) => self.validateAndContinue(next);

      window.setupShippingMethodHandlers = () => self.setupShippingHandlers();
      window.setupPaymentMethodHandlers = () => self.setupPaymentHandlers();
      window.getSelectedShippingFee = () => self.selectedShippingFee();

      window.initializeCheckoutMap = () => self.initMap();
      window.selectLocationOnMap = (latlng) => self.selectLocationOnMap(latlng);
      window.searchAddressOnMap = () => self.searchAddress();
      window.getCurrentLocation = () => self.useCurrentLocation();
      window.confirmMapLocation = () => self.confirmMapLocation();

      window.completeOrder = () => self.complete();
    }
  }

  // Singleton + install bridges
  if (!window.CheckoutService) {
    window.CheckoutService = new CheckoutService();
  }
  try {
    window.CheckoutService.installGlobals();
  } catch (_) {}
})();