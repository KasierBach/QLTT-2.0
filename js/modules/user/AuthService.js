/**
 * AuthService & UserAccountService - Full OOP implementation replacing legacy auth/account logic from script.js
 * Features:
 *  - Auth modal open/close, login, register, logout
 *  - Header user UI update (avatar, points, menu states)
 *  - User Account Modal: show/hide, tab switching (profile/orders/settings)
 *  - Profile load/save
 *  - Orders: load history, cancel order, delete order(s), open tracking via OrderTracking (already implemented)
 *  - Settings load/save (email/SMS notifications, dark mode via ThemeService)
 *  - Legacy globals bridge installed for backward compatibility
 */
(function () {
  'use strict';

  class AuthService {
    constructor() {
      // Ensure global users and currentUser exist
      try {
        if (!Array.isArray(window.users)) {
          const saved = localStorage.getItem('users');
          window.users = saved ? JSON.parse(saved) : [];
        }
      } catch (_) {
        window.users = Array.isArray(window.users) ? window.users : [];
      }
      try {
        if (!window.currentUser) {
          const saved = localStorage.getItem('currentUser');
          window.currentUser = saved ? JSON.parse(saved) : null;
        }
      } catch (_) {
        window.currentUser = window.currentUser || null;
      }
    }

    // ---------- Modal open/close ----------
    openAuthModal(mode) {
      const modal = document.getElementById('auth-modal');
      if (!modal) return;
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');

      if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
      } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
      }

      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    closeAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (!modal) return;
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // ---------- Auth handlers ----------
    login(event) {
      try {
        if (event) event.preventDefault();
        const form = event?.target || document.querySelector('#login-form form');
        const fd = form ? new FormData(form) : null;
        const email = fd ? (fd.get('email') || '').toString().trim() : '';
        const password = fd ? (fd.get('password') || '').toString() : '';

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
          window.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.updateUserUI();
          this.closeAuthModal();
          if (window.showNotification) window.showNotification(`Chào mừng ${user.fullName}!`, 'success');
        } else {
          if (window.showNotification) window.showNotification('Email hoặc mật khẩu không đúng', 'error');
        }
      } catch (e) {
        console.warn('[AuthService.login] failed:', e);
      }
    }

    register(event) {
      try {
        if (event) event.preventDefault();
        const form = event?.target || document.querySelector('#register-form form');
        const fd = form ? new FormData(form) : null;
        const fullName = fd ? (fd.get('fullName') || '').toString().trim() : '';
        const email = fd ? (fd.get('email') || '').toString().trim() : '';
        const phone = fd ? (fd.get('phone') || '').toString().trim() : '';
        const password = fd ? (fd.get('password') || '').toString() : '';
        const confirmPassword = fd ? (fd.get('confirmPassword') || '').toString() : '';

        if (password !== confirmPassword) {
          if (window.showNotification) window.showNotification('Mật khẩu xác nhận không khớp', 'error');
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find((u) => u.email === email)) {
          if (window.showNotification) window.showNotification('Email đã được sử dụng', 'error');
          return;
        }

        const newUser = {
          id: Date.now(),
          fullName,
          email,
          phone,
          password,
          points: 100,
          joinDate: new Date().toISOString(),
          orders: [],
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        window.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        this.updateUserUI();
        this.closeAuthModal();
        if (window.showNotification) window.showNotification(`Chào mừng ${fullName}! Bạn nhận được 100 điểm thưởng.`, 'success');
      } catch (e) {
        console.warn('[AuthService.register] failed:', e);
      }
    }

    logout() {
      try {
        window.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUserUI();
        if (window.showNotification) window.showNotification('Đã đăng xuất thành công', 'info');
      } catch (e) {
        console.warn('[AuthService.logout] failed:', e);
      }
    }

    updateUserUI() {
      try {
        const user = window.currentUser || null;
        const userInfo = document.getElementById('user-info');
        const authButtons = document.getElementById('auth-buttons');
        const userMenuItems = document.getElementById('user-menu-items');
        const userNameEl = document.getElementById('user-name');
        const userEmailEl = document.getElementById('user-email');
        const userPointsEl = document.getElementById('user-points');
        const userAvatarEl = document.getElementById('user-avatar');

        if (user) {
          if (userInfo) userInfo.style.display = 'block';
          if (authButtons) authButtons.style.display = 'none';
          if (userMenuItems) userMenuItems.style.display = 'block';

          if (userNameEl) userNameEl.textContent = user.fullName || '';
          if (userEmailEl) userEmailEl.textContent = user.email || '';
          if (userPointsEl) userPointsEl.textContent = user.points || 0;

          const initial = (user.fullName || '').charAt(0).toUpperCase() || 'U';
          if (userAvatarEl) userAvatarEl.innerHTML = `<span style="font-weight: 600;">${initial}</span>`;
        } else {
          if (userInfo) userInfo.style.display = 'none';
          if (authButtons) authButtons.style.display = 'flex';
          if (userMenuItems) userMenuItems.style.display = 'none';
          if (userAvatarEl) userAvatarEl.innerHTML = '<i class="fas fa-user"></i>';
        }
      } catch (e) {
        console.warn('[AuthService.updateUserUI] failed:', e);
      }
    }

    // ---------- User Account Modal ----------
    showUserAccountModal() {
      const modal = document.getElementById('user-account-modal');
      if (!modal) return;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    closeUserAccountModal() {
      const modal = document.getElementById('user-account-modal');
      if (!modal) return;
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    showUserAccountTab(tabName) {
      const tabs = ['profile', 'orders', 'settings'];
      tabs.forEach((tab) => {
        const btn = document.getElementById(`tab-${tab}-btn`);
        const content = document.getElementById(`user-${tab}-tab`);
        if (btn && content) {
          if (tab === tabName) {
            btn.classList.add('active');
            content.classList.add('active');
          } else {
            btn.classList.remove('active');
            content.classList.remove('active');
          }
        }
      });

      // Load content on demand
      switch (tabName) {
        case 'profile':
          this.loadUserProfile();
          break;
        case 'orders':
          this.loadUserOrderHistory();
          break;
        case 'settings':
          this.loadUserSettings();
          break;
      }
    }

    // ---------- Profile ----------
    loadUserProfile() {
      const profileTab = document.getElementById('user-profile-tab');
      if (!profileTab) return;

      const user = window.currentUser || null;
      if (!user) {
        profileTab.innerHTML = '<p>Vui lòng đăng nhập để xem hồ sơ.</p>';
        return;
      }

      profileTab.innerHTML = `
        <form id="profile-form" class="profile-info">
          <label for="fullName">Họ và tên</label>
          <input type="text" id="fullName" name="fullName" value="${user.fullName || ''}" required>

          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="${user.email || ''}" required disabled>

          <label for="phone">Số điện thoại</label>
          <input type="tel" id="phone" name="phone" value="${user.phone || ''}" required>

          <label for="address">Địa chỉ</label>
          <textarea id="address" name="address" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố">${user.address || ''}</textarea>

          <div class="profile-buttons">
            <button type="submit" class="save-btn">Lưu</button>
            <button type="button" class="cancel-btn" onclick="showProfile()">Hủy</button>
          </div>
        </form>
      `;

      const profileForm = document.getElementById('profile-form');
      if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveUserProfile();
        });
      }
    }

    saveUserProfile() {
      const fullNameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phone');
      const addressInput = document.getElementById('address');

      if (!fullNameInput || !phoneInput || !addressInput) return;

      const user = window.currentUser || null;
      if (!user) return;

      user.fullName = (fullNameInput.value || '').trim();
      user.phone = (phoneInput.value || '').trim();
      user.address = (addressInput.value || '').trim();

      // Persist changes
      localStorage.setItem('currentUser', JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx > -1) {
        users[idx] = user;
        localStorage.setItem('users', JSON.stringify(users));
      }

      this.updateUserUI();
      if (window.showNotification) window.showNotification('Cập nhật hồ sơ thành công!', 'success');
    }

    // ---------- Orders ----------
    loadUserOrderHistory() {
      const ordersTab = document.getElementById('user-orders-tab');
      if (!ordersTab) return;

      const user = window.currentUser || null;
      if (!user) {
        ordersTab.innerHTML = '<p>Vui lòng đăng nhập để xem lịch sử đơn hàng.</p>';
        return;
      }

      const allOrders = Array.isArray(window.orders) ? window.orders : [];
      const userOrders = allOrders.filter((o) => o.userId === user.id);

      if (userOrders.length === 0) {
        ordersTab.innerHTML = '<p>Bạn chưa có đơn hàng nào.</p>';
        return;
      }

      const getStatusInfo = (status) => {
        switch (status) {
          case 'pending':
            return { label: 'Đang xử lý', color: 'var(--warning-color)' };
          case 'shipped':
            return { label: 'Đang giao hàng', color: 'var(--primary-color)' };
          case 'delivered':
            return { label: 'Đã giao hàng', color: 'var(--success-color)' };
          case 'cancelled':
            return { label: 'Đã hủy', color: 'var(--accent-color)' };
          default:
            return { label: status, color: 'var(--text-secondary)' };
        }
      };

      let html = `
        <button onclick="deleteSelectedOrders()" style="margin-bottom: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
          Xóa đơn hàng đã chọn
        </button>
        <ul class="order-history-list">
      `;
      userOrders.forEach((order) => {
        const status = getStatusInfo(order.status);
        html += `
          <li>
            <input type="checkbox" class="order-select-checkbox" data-order-id="${order.id}" style="margin-right: 0.5rem;">
            <div class="order-id">Mã đơn hàng: ${order.id}</div>
            <div class="order-date">Ngày: ${(window.formatDate || ((d) => d))(order.date)}</div>
            <div class="order-total">Tổng tiền: ${(window.formatPrice || ((v) => v))(order.total)}</div>
            <div class="order-status" style="color: ${status.color}; font-weight: 600;">
              Trạng thái: ${status.label}
            </div>
            <div class="order-actions">
              ${
                order.status !== 'cancelled' && order.status !== 'delivered'
                  ? `<button class="cancel-order-btn" onclick="cancelOrder('${order.id}')">Hủy đơn hàng</button>`
                  : ''
              }
              <button class="track-order-btn" onclick="viewOrderTracking('${order.id}')">Xem tiến trình</button>
              <button class="delete-order-btn" onclick="deleteOrder('${order.id}')" style="background: var(--accent-color); color: white; border: none; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;">
                Xóa
              </button>
            </div>
          </li>
        `;
      });
      html += '</ul>';

      ordersTab.innerHTML = html;
    }

    deleteOrder(orderId) {
      const user = window.currentUser || null;
      if (!user) return;
      if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;

      try {
        let orders = Array.isArray(window.orders) ? window.orders : [];
        orders = orders.filter((o) => !(o.id === orderId && o.userId === user.id));
        window.orders = orders;
        localStorage.setItem('orders', JSON.stringify(orders));
        this.loadUserOrderHistory();
        if (window.showNotification) window.showNotification('Đơn hàng đã được xóa thành công.', 'success');
      } catch (e) {
        console.warn('[AuthService.deleteOrder] failed:', e);
      }
    }

    deleteSelectedOrders() {
      const user = window.currentUser || null;
      if (!user) return;

      const checkboxes = document.querySelectorAll('.order-select-checkbox:checked');
      if (!checkboxes || checkboxes.length === 0) {
        alert('Vui lòng chọn ít nhất một đơn hàng để xóa.');
        return;
      }
      if (!confirm(`Bạn có chắc chắn muốn xóa ${checkboxes.length} đơn hàng đã chọn?`)) return;

      const idsToDelete = Array.from(checkboxes).map((cb) => cb.getAttribute('data-order-id'));
      try {
        let orders = Array.isArray(window.orders) ? window.orders : [];
        orders = orders.filter((o) => !(idsToDelete.includes(o.id) && o.userId === user.id));
        window.orders = orders;
        localStorage.setItem('orders', JSON.stringify(orders));
        this.loadUserOrderHistory();
        if (window.showNotification) window.showNotification(`${idsToDelete.length} đơn hàng đã được xóa thành công.`, 'success');
      } catch (e) {
        console.warn('[AuthService.deleteSelectedOrders] failed:', e);
      }
    }

    cancelOrder(orderId) {
      const user = window.currentUser || null;
      if (!user) return;
      if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;

      try {
        const orders = Array.isArray(window.orders) ? window.orders : [];
        const idx = orders.findIndex((o) => o.id === orderId && o.userId === user.id);
        if (idx === -1) {
          if (window.showNotification) window.showNotification('Không tìm thấy đơn hàng để hủy.', 'error');
          return;
        }
        if (orders[idx].status === 'delivered' || orders[idx].status === 'cancelled') {
          if (window.showNotification) window.showNotification('Đơn hàng không thể hủy.', 'warning');
          return;
        }
        orders[idx].status = 'cancelled';
        window.orders = orders;
        localStorage.setItem('orders', JSON.stringify(orders));
        if (window.showNotification) window.showNotification('Đơn hàng đã được hủy thành công.', 'success');
        this.loadUserOrderHistory();
      } catch (e) {
        console.warn('[AuthService.cancelOrder] failed:', e);
      }
    }

    // ---------- Settings ----------
    loadUserSettings() {
      const settingsTab = document.getElementById('user-settings-tab');
      if (!settingsTab) return;

      const user = window.currentUser || null;
      if (!user) {
        settingsTab.innerHTML = '<p>Vui lòng đăng nhập để xem cài đặt.</p>';
        return;
      }

      settingsTab.innerHTML = `
        <div class="settings-content">
          <div class="settings-item">
            <label for="emailNotifications">Nhận thông báo qua email</label>
            <input type="checkbox" id="emailNotifications" ${user.emailNotifications ? 'checked' : ''}>
          </div>
          <div class="settings-item">
            <label for="smsNotifications">Nhận thông báo qua SMS</label>
            <input type="checkbox" id="smsNotifications" ${user.smsNotifications ? 'checked' : ''}>
          </div>
          <div class="settings-item">
            <label for="darkModeSetting">Chế độ tối</label>
            <input type="checkbox" id="darkModeSetting" ${(localStorage.getItem('theme') || 'light') === 'dark' ? 'checked' : ''}>
          </div>
          <div class="profile-buttons">
            <button type="button" class="save-btn" onclick="saveUserSettings()">Lưu cài đặt</button>
          </div>
        </div>
      `;
    }

    saveUserSettings() {
      const user = window.currentUser || null;
      if (!user) return;

      const emailNotifications = document.getElementById('emailNotifications')?.checked || false;
      const smsNotifications = document.getElementById('smsNotifications')?.checked || false;
      const darkMode = document.getElementById('darkModeSetting')?.checked || false;

      try {
        // Update current user object + users store
        user.emailNotifications = emailNotifications;
        user.smsNotifications = smsNotifications;
        localStorage.setItem('currentUser', JSON.stringify(user));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const idx = users.findIndex((u) => u.id === user.id);
        if (idx > -1) {
          users[idx] = user;
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Apply theme
        if (darkMode) {
          if (window.applyTheme) window.applyTheme('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          if (window.applyTheme) window.applyTheme('light');
          localStorage.setItem('theme', 'light');
        }

        if (window.showNotification) window.showNotification('Cài đặt đã được lưu!', 'success');
      } catch (e) {
        console.warn('[AuthService.saveUserSettings] failed:', e);
      }
    }

    // ---------- Shortcuts to open specific tabs ----------
    showProfile() {
      this.showUserAccountModal();
      this.showUserAccountTab('profile');
    }

    showOrderHistory() {
      this.showUserAccountModal();
      this.showUserAccountTab('orders');
    }

    showSettings() {
      this.showUserAccountModal();
      this.showUserAccountTab('settings');
    }

    // ---------- Legacy bridge ----------
    installGlobals() {
      const self = this;
      window.showAuthModal = (m) => self.openAuthModal(m);
      window.closeAuthModal = () => self.closeAuthModal();
      window.handleLogin = (e) => self.login(e);
      window.handleRegister = (e) => self.register(e);
      window.logout = () => self.logout();
      window.updateUserUI = () => self.updateUserUI();

      window.showProfile = () => self.showProfile();
      window.showOrderHistory = () => self.showOrderHistory();
      window.showSettings = () => self.showSettings();

      window.showUserAccountModal = () => self.showUserAccountModal();
      window.closeUserAccountModal = () => self.closeUserAccountModal();
      window.showUserAccountTab = (t) => self.showUserAccountTab(t);

      window.loadUserProfile = () => self.loadUserProfile();
      window.saveUserProfile = () => self.saveUserProfile();
      window.loadUserOrderHistory = () => self.loadUserOrderHistory();
      window.cancelOrder = (id) => self.cancelOrder(id);
      window.deleteOrder = (id) => self.deleteOrder(id);
      window.deleteSelectedOrders = () => self.deleteSelectedOrders();

      window.loadUserSettings = () => self.loadUserSettings();
      window.saveUserSettings = () => self.saveUserSettings();
    }
  }

  // Singleton
  if (!window.AuthService) {
    window.AuthService = new AuthService();
  }
  try {
    window.AuthService.installGlobals();
  } catch (_) {}
})();