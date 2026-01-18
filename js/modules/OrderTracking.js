/**
 * OrderTracking (OOP) - encapsulates the entire "Xem tiến trình" UX
 * Drop-in override:
 *  - Load this file AFTER script.js.
 *  - It will override global functions:
 *      window.viewOrderTracking(orderId)
 *      window.closeOrderTrackingModal()
 *      window.toggleDirections()
 *  - It uses globals from script.js: orders, showNotification, formatDate, etc.
 */
(function () {
  class OrderTracking {
    constructor() {
      this.modalId = 'order-tracking-modal';
      this.routingControl = null;
      this.mapInstance = null;
      this.directionsPanelSelector = '#order-tracking-modal .leaflet-routing-container';
      // Default warehouse (TP.HCM)
      this.warehouseName = 'Kho trung tâm TP.HCM';
      this.warehouseCoords = [10.772726, 106.698804];
    }

    open(orderId) {
      const order = (window.orders || []).find((o) => o.id === orderId && window.currentUser && o.userId === window.currentUser.id);
      if (!order) {
        this._notify('Không tìm thấy đơn hàng.', 'error');
        return;
      }

      // If no coords, try geocode address first, then reopen automatically
      const deliveryAddress = order.deliveryAddress || 'Địa chỉ chưa xác định';
      let deliveryCoords = order.deliveryCoords || null;

      if (!deliveryCoords && deliveryAddress && deliveryAddress !== 'Địa chỉ chưa xác định') {
        this._withLoading(true);
        this._geocode(deliveryAddress)
          .then((coords) => {
            this._withLoading(false);
            if (!coords) {
              this._notify('Không tìm thấy tọa độ cho địa chỉ giao hàng.', 'warning');
              return;
            }
            // persist back to orders
            order.deliveryCoords = coords;
            const idx = window.orders.findIndex((o) => o.id === order.id);
            if (idx > -1) {
              window.orders[idx] = order;
              localStorage.setItem('orders', JSON.stringify(window.orders));
            }
            // reopen now that we have coords
            this.open(order.id);
          })
          .catch(() => {
            this._withLoading(false);
            this._notify('Lỗi khi tìm tọa độ giao hàng.', 'error');
          });
        return;
      }

      // Build UI
      const html = this._buildTrackingHtml(order, deliveryAddress);
      let modal = document.getElementById(this.modalId);
      if (!modal) {
        modal = document.createElement('div');
        modal.id = this.modalId;
        modal.className = 'modal';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-content order-tracking-modal-content" style="max-width: 900px; width: 95%; max-height: 92vh;">
          <span class="close-modal" onclick="closeOrderTrackingModal()">&times;</span>
          ${html}
        </div>
      `;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';

      // Initialize map after mount
      setTimeout(() => {
        this._initMap(deliveryCoords, deliveryAddress);
        // Initialize directions toggle button state (if routing control exists)
        setTimeout(() => this._setupDirectionsToggle(), 300);
      }, 100);
    }

    close() {
      const modal = document.getElementById(this.modalId);
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      // Clean up map/routing control
      this._disposeMap();
    }

    toggleDirections() {
      const panel = document.querySelector(this.directionsPanelSelector);
      const btn = document.getElementById('toggle-directions-btn');
      if (!panel || !btn) return;

      const isHidden = panel.style.display === 'none' || getComputedStyle(panel).display === 'none';
      if (isHidden) {
        panel.style.display = '';
        btn.textContent = 'Tắt hướng dẫn';
      } else {
        panel.style.display = 'none';
        btn.textContent = 'Hiện hướng dẫn';
      }
    }

    // ----------------- Internals -----------------

    _buildTrackingHtml(order, deliveryAddress) {
      const status = order.status || 'pending';
      const states = ['pending', 'shipped', 'delivered'];
      const label = {
        pending: 'Đang xử lý',
        shipped: 'Đang giao hàng',
        delivered: 'Đã giao hàng',
      };

      return `
        <div class="order-tracking-modal">
          <h3>Tiến trình đơn hàng: ${order.id}</h3>
          <div class="route-toolbar" style="display:flex; justify-content:flex-end; gap:.5rem; margin-bottom:.5rem;">
            <button id="toggle-directions-btn" type="button" class="map-btn">Tắt hướng dẫn</button>
          </div>
          <div id="delivery-map" style="height: 480px; border-radius: 12px; margin-bottom: 1rem; border: 1px solid var(--border-color);"></div>

          <div class="tracking-status-section">
            <h4>Trạng thái đơn hàng</h4>
            <div class="tracking-status-options">
              ${states
                .map(
                  (k) => `
                <label class="tracking-status-option ${status === k ? 'active' : ''}">
                  <input type="radio" name="tracking-status" value="${k}" ${status === k ? 'checked' : ''} disabled>
                  <span class="status-indicator"></span>
                  <span class="status-text">${label[k]}</span>
                </label>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="delivery-info">
            <h4>Thông tin người giao hàng</h4>
            <div class="delivery-person">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar người giao hàng" class="delivery-avatar">
              <div class="delivery-details">
                <p><strong>Tên:</strong> Nguyễn Văn Gì Đó</p>
                <p><strong>Điện thoại:</strong> 0123 456 789</p>
                <p><strong>Phương tiện:</strong> Xe máy số 59-TA 123.45</p>
              </div>
            </div>

            <h4>Hành trình giao hàng</h4>
            <ol class="delivery-route">
              <li>${this.warehouseName}</li>
              <li>${deliveryAddress || 'Địa chỉ giao hàng chưa xác định'}</li>
            </ol>

            <p><strong>Vị trí hiện tại:</strong> ${this.warehouseName}</p>
          </div>

          <button onclick="closeOrderTrackingModal()" class="close-tracking-btn">Đóng</button>
        </div>
      `;
    }

    _initMap(deliveryCoords, deliveryAddress) {
      const mapEl = document.getElementById('delivery-map');
      if (!mapEl || !window.L) return;

      // Clean up existing
      this._disposeMap();

      const center = deliveryCoords || this.warehouseCoords;
      const map = L.map('delivery-map').setView(center, 13);
      this.mapInstance = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Markers
      const whMarker = L.marker(this.warehouseCoords)
        .bindPopup(`<strong>Điểm xuất phát:</strong><br>${this.warehouseName}`)
        .addTo(map);

      if (deliveryCoords) {
        const destMarker = L.marker(deliveryCoords)
          .bindPopup(`<strong>Địa chỉ giao hàng:</strong><br>${deliveryAddress}`)
          .addTo(map);

        // Routing with LRM if available
        if (L.Routing && L.Routing.control) {
          const router = L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
          });

          const control = L.Routing.control({
            waypoints: [L.latLng(this.warehouseCoords[0], this.warehouseCoords[1]), L.latLng(deliveryCoords[0], deliveryCoords[1])],
            router,
            routeWhileDragging: false,
            showAlternatives: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null,
            lineOptions: { styles: [{ color: '#2563eb', weight: 4, opacity: 0.8 }] },
          })
            .on('routesfound', (e) => {
              const coords = e.routes[0].coordinates;
              map.fitBounds(L.latLngBounds(coords).pad(0.1));
            })
            .on('routingerror', () => {
              this._notify('Không tìm được lộ trình. Dùng đường thẳng.', 'warning');
              L.polyline([this.warehouseCoords, deliveryCoords], { color: '#2563eb', weight: 4, opacity: 0.8 }).addTo(map);
              map.fitBounds(L.latLngBounds([this.warehouseCoords, deliveryCoords]).pad(0.1));
            })
            .addTo(map);

          this.routingControl = control;
        } else {
          // Fallback polyline
          L.polyline([this.warehouseCoords, deliveryCoords], { color: '#2563eb', weight: 4, opacity: 0.8 }).addTo(map);
          map.fitBounds(L.latLngBounds([this.warehouseCoords, deliveryCoords]).pad(0.1));
        }

        // fit both markers
        const group = new L.featureGroup([whMarker, destMarker]);
        map.fitBounds(group.getBounds().pad(0.1));
      } else {
        // No destination coords yet
        map.setView(this.warehouseCoords, 15);
      }
    }

    _disposeMap() {
      try {
        if (this.routingControl && this.mapInstance) {
          this.mapInstance.removeControl(this.routingControl);
        }
        this.routingControl = null;
        if (this.mapInstance) {
          this.mapInstance.remove();
        }
      } catch (_) {}
      this.mapInstance = null;
    }

    _setupDirectionsToggle() {
      const btn = document.getElementById('toggle-directions-btn');
      if (!btn) return;
      const container = document.querySelector(this.directionsPanelSelector);
      if (container) {
        btn.disabled = false;
        const hidden = container.style.display === 'none' || getComputedStyle(container).display === 'none';
        btn.textContent = hidden ? 'Hiện hướng dẫn' : 'Tắt hướng dẫn';
        btn.onclick = () => this.toggleDirections();
      } else {
        btn.textContent = 'Không có hướng dẫn';
        btn.disabled = true;
      }
    }

    _geocode(address) {
      return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && data[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          return null;
        })
        .catch(() => null);
    }

    _withLoading(show) {
      const el = document.getElementById('loading');
      if (!el) return;
      el.style.display = show ? 'flex' : 'none';
    }

    _notify(message, type = 'success', title = '') {
      if (typeof window.showNotification === 'function') {
        window.showNotification(message, type, title);
      } else {
        // Fallback
        alert(message);
      }
    }
  }

  // Singleton
  const tracking = new OrderTracking();

  // Override legacy globals so existing buttons still work
  window.viewOrderTracking = (orderId) => tracking.open(orderId);
  window.closeOrderTrackingModal = () => tracking.close();
  window.toggleDirections = () => tracking.toggleDirections();

  // Optional: expose instance
  window.OrderTracking = tracking;
})();