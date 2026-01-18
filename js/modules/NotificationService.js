/**
 * NotificationService - OOP wrapper for site notifications
 * Usage:
 *  - Loaded after script.js to override global showNotification
 *  - window.NotificationService.success('Message')
 *  - showNotification('Message', 'success', 'Title')  // still works, delegated
 */
(function () {
  class NotificationService {
    constructor(containerId = 'notifications') {
      this.containerId = containerId;
      this.ensureContainer();
      this.ensureKeyframes();
    }

    ensureContainer() {
      let container = document.getElementById(this.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = this.containerId;
        container.style.position = 'fixed';
        container.style.top = '100px';
        container.style.right = '20px';
        container.style.zIndex = '3000';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '0.5rem';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
      }
      this.container = container;
    }

    ensureKeyframes() {
      // Avoid duplicating styles if they already exist
      if (document.getElementById('notification-keyframes-style')) return;
      const style = document.createElement('style');
      style.id = 'notification-keyframes-style';
      style.textContent = `
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100%); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to   { opacity: 0; transform: translateX(100%); }
      }
      `;
      document.head.appendChild(style);
    }

    show(message, type = 'success', title = '') {
      const el = document.createElement('div');
      el.className = `notification ${type}`;
      el.style.padding = '1rem 1.5rem';
      el.style.borderRadius = '8px';
      el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      el.style.maxWidth = '350px';
      el.style.display = 'flex';
      el.style.alignItems = 'flex-start';
      el.style.gap = '1rem';
      el.style.animation = 'slideInRight 0.3s ease';
      el.style.pointerEvents = 'auto';
      el.style.wordWrap = 'break-word';
      el.style.color = '#fff';

      const palette = {
        success: 'var(--success-color, #10b981)',
        error: 'var(--accent-color, #ef4444)',
        warning: 'var(--warning-color, #f59e0b)',
        info: 'var(--primary-color, #2563eb)'
      };
      el.style.background = palette[type] || palette.info;

      const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      };

      el.innerHTML = `
        <div class="notification-icon" style="font-size:1.2rem;">
          <i class="${iconMap[type] || iconMap.info}"></i>
        </div>
        <div class="notification-content" style="flex:1;">
          ${title ? `<div class="notification-title" style="font-weight:600; margin-bottom:0.25rem;">${title}</div>` : ''}
          <div class="notification-message" style="font-size:0.9rem; opacity:0.95;">${message}</div>
        </div>
        <div class="notification-close" style="cursor:pointer; opacity:0.8;">
          <i class="fas fa-times"></i>
        </div>
      `;

      el.querySelector('.notification-close').addEventListener('click', () => {
        this.remove(el);
      });

      this.container.appendChild(el);

      // Auto remove after 5 seconds
      setTimeout(() => this.remove(el), 5000);
    }

    remove(el) {
      if (!el || !el.parentElement) return;
      el.style.animation = 'slideOutRight 0.25s ease';
      setTimeout(() => el.remove(), 250);
    }

    success(message, title = '') { this.show(message, 'success', title); }
    error(message, title = '') { this.show(message, 'error', title); }
    warning(message, title = '') { this.show(message, 'warning', title); }
    info(message, title = '') { this.show(message, 'info', title); }
  }

  // Expose globally
  window.NotificationService = new NotificationService();

  // Override legacy global function to delegate to OOP service
  window.showNotification = function (message, type = 'success', title = '') {
    window.NotificationService.show(message, type, title);
  };
})();