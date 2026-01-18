/**
 * ProductListService - OOP implementation for products listing, filters, sorting, search, view toggle, and load-more.
 * It overrides legacy globals so existing HTML event handlers keep working while removing dependencies on script.js.
 */
(function () {
  'use strict';

  class ProductListService {
    constructor() {
      this._selectors = {
        grid: 'products-grid',
        loadMoreBtn: 'load-more-btn',
        searchInput: 'search-input',
        searchSuggestions: 'search-suggestions',
        sortSelect: 'sort-select',
        minPrice: 'min-price',
        maxPrice: 'max-price',
        minPriceDisplay: 'min-price-display',
        maxPriceDisplay: 'max-price-display',
      };

      // Internal UI state (replacing legacy globals: currentView/currentFilter/currentSort/displayedProducts)
      this.currentView = 'grid';
      this.currentFilter = 'all';
      this.currentSort = 'default';
      this.displayed = 8;
    }

    // --------- DOM helpers ---------
    get gridEl() {
      return document.getElementById(this._selectors.grid);
    }
    get loadMoreBtnEl() {
      return document.getElementById(this._selectors.loadMoreBtn);
    }
    get searchInputEl() {
      return document.getElementById(this._selectors.searchInput);
    }
    get searchSuggestionsEl() {
      return document.getElementById(this._selectors.searchSuggestions);
    }
    get sortSelectEl() {
      return document.getElementById(this._selectors.sortSelect);
    }
    get minPriceEl() {
      return document.getElementById(this._selectors.minPrice);
    }
    get maxPriceEl() {
      return document.getElementById(this._selectors.maxPrice);
    }

    // Graceful base products getter
    _baseProducts() {
      return typeof window.products !== 'undefined' && Array.isArray(window.products) ? window.products : [];
    }

    // --------- Render (replaces displayProducts) ---------
    render(productsToShow) {
      const grid = this.gridEl;
      if (!grid) return;

      const source = Array.isArray(productsToShow) ? productsToShow : this.getFiltered();
      const slice = source.slice(0, Math.max(0, this.displayed));

      grid.innerHTML = '';
      if (slice.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p style="color: var(--text-secondary);">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
        `;
        if (this.loadMoreBtnEl) this.loadMoreBtnEl.style.display = 'none';
        return;
      }

      slice.forEach((p) => {
        const card = this.createCard(p);
        if (card) grid.appendChild(card);
      });

      if (this.loadMoreBtnEl) this.loadMoreBtnEl.style.display = source.length > this.displayed ? 'block' : 'none';

      this.animateCards();
    }

    // --------- Card factory (replaces createProductCard) ---------
    createCard(product) {
      try {
        const wl = Array.isArray(window.wishlist) ? window.wishlist : [];
        const cl = Array.isArray(window.compareList) ? window.compareList : [];
        const isInWishlist = wl.some((item) => item.id === product.id);
        const isInCompare = cl.some((item) => item.id === product.id);
        const discountPercent = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        const card = document.createElement('div');
        card.className = `product-card ${this.currentView === 'list' ? 'list-view' : ''}`;
        card.setAttribute('data-category', product.category);

        card.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-actions-overlay">
              <button class="action-btn" onclick="toggleWishlistItem(${product.id})" title="${isInWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}">
                <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
              </button>
              <button class="action-btn" onclick="toggleCompareItem(${product.id})" title="${isInCompare ? 'Xóa khỏi so sánh' : 'Thêm vào so sánh'}">
                <i class="fas fa-balance-scale ${isInCompare ? 'text-blue-500' : ''}"></i>
              </button>
              <button class="action-btn" onclick="quickView(${product.id})" title="Xem nhanh">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${
              product.rating
                ? `
                <div class="product-rating">
                  <div class="stars">
                    ${this._generateStars(product.rating)}
                  </div>
                  <span class="rating-text">(${product.reviewCount || 0} đánh giá)</span>
                </div>
              `
                : ''
            }
            <div class="product-price" style="font-size: 0.95rem;">
              <span class="current-price" style="font-size: 1.2rem;">${(window.formatPrice || ((v)=>v))(product.price)}</span>
              ${
                product.originalPrice
                  ? `
                    <span class="original-price" style="font-size: 1.2rem;">${(window.formatPrice || ((v)=>v))(product.originalPrice)}</span>
                    <span class="discount-percent" style="font-size: 1rem;">-${discountPercent}%</span>
                  `
                  : ''
              }
            </div>
            <div class="product-actions">
              <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Thêm vào giỏ
              </button>
              <button class="view-details" onclick="viewProductDetails(${product.id})">
                <i class="fas fa-eye"></i> Chi tiết
              </button>
            </div>
          </div>
        `;
        return card;
      } catch (e) {
        console.warn('createCard error:', e);
        return null;
      }
    }

    _generateStars(rating) {
      const full = Math.floor(rating);
      const half = rating % 1 !== 0;
      const empty = 5 - full - (half ? 1 : 0);
      let html = '';
      for (let i = 0; i < full; i++) html += '<i class="fas fa-star star"></i>';
      if (half) html += '<i class="fas fa-star-half-alt star"></i>';
      for (let i = 0; i < empty; i++) html += '<i class="far fa-star star empty"></i>';
      return html;
    }

    // --------- Animation (replaces animateProductCards) ---------
    animateCards() {
      const cards = document.querySelectorAll('.product-card');
      if (!cards.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      });

      cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
      });
    }

    // --------- Filtering/sorting/data (replaces getFilteredProducts/handleFilter/handleSort/handlePriceFilter) ---------
    getFiltered() {
      const base = this._baseProducts().slice();

      // Category filter
      let filtered = this.currentFilter !== 'all' ? base.filter((p) => p.category === this.currentFilter) : base;

      // Price filter
      const min = parseInt(this.minPriceEl?.value || '0', 10);
      const max = parseInt(this.maxPriceEl?.value || '50000000', 10);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);

      // Sort
      switch (this.currentSort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          // original order
          break;
      }

      return filtered;
    }

    onFilter(e) {
      const target = e?.target || e?.currentTarget;
      this.currentFilter = target?.getAttribute('data-filter') || 'all';
      this.displayed = 8;

      document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
      if (target && target.classList) target.classList.add('active');

      this._withLoading(() => this.render(this.getFiltered()));
    }

    onSort(e) {
      this.currentSort = e?.target?.value || 'default';
      this._withLoading(() => this.render(this.getFiltered()));
    }

    onPriceFilter() {
      const min = parseInt(this.minPriceEl?.value || '0', 10);
      const max = parseInt(this.maxPriceEl?.value || '0', 10);
      const minDisp = document.getElementById('min-price-display');
      const maxDisp = document.getElementById('max-price-display');
      if (minDisp) minDisp.textContent = (window.formatPrice || ((v)=>v))(min);
      if (maxDisp) maxDisp.textContent = (window.formatPrice || ((v)=>v))(max);
      this.render(this.getFiltered());
    }

    setView(view) {
      this.currentView = view || 'grid';

      document.querySelectorAll('.view-btn').forEach((btn) => btn.classList.remove('active'));
      const active = document.querySelector(`[data-view="${this.currentView}"]`);
      if (active) active.classList.add('active');

      const grid = this.gridEl;
      if (grid) grid.className = `products-grid ${this.currentView === 'list' ? 'list-view' : ''}`;

      this.render(this.getFiltered());
    }

    loadMore() {
      this.displayed += 8;
      this.render(this.getFiltered());
    }

    // --------- Search (replaces initializeSearch/handleSearch/showSearchSuggestions/selectSuggestion/hideSearchSuggestions) ---------
    buildSearchIndex() {
      if (!this._baseProducts().length) return;
      window.searchIndex = this._baseProducts().map((p) => ({
        id: p.id,
        searchText: `${p.name} ${p.description} ${p.category}`.toLowerCase(),
      }));
    }

    searchHandler(e) {
      const term = (e?.target?.value || '').toLowerCase().trim();

      if (!term.length) {
        this.hideSuggestions();
        this.render(this.getFiltered());
        return;
      }

      if (term.length >= 2) {
        this.showSuggestions(term);
      }

      const filtered = this._baseProducts().filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      );

      this.render(filtered);
      this._withLoading(() => {});
    }

    showSuggestions(searchTerm = '') {
      const el = this.searchSuggestionsEl;
      if (!el) return;
      if (!searchTerm || searchTerm.length < 2) {
        el.style.display = 'none';
        return;
      }

      const list = this._baseProducts()
        .filter((p) => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm))
        .slice(0, 5);

      if (list.length === 0) {
        el.innerHTML = `
          <div class="suggestion-item" style="justify-content: center; color: var(--text-secondary);">
            Không tìm thấy sản phẩm nào
          </div>
        `;
        el.style.display = 'block';
        return;
      }

      el.innerHTML = list
        .map(
          (p) => `
            <div class="suggestion-item" onclick="selectSuggestion('${p.name.replace(/'/g, "\\'")}')">
              <div>
                <strong>${p.name}</strong>
                <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
                  ${p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                </div>
              </div>
              <div style="font-weight: 600; color: var(--accent-color);">
                ${(window.formatPrice || ((v)=>v))(p.price)}
              </div>
            </div>
        `,
        )
        .join('');
      el.style.display = 'block';
    }

    selectSuggestionByName(productName) {
      const input = this.searchInputEl;
      if (input) input.value = productName || '';
      this.hideSuggestions();
      this.searchHandler({ target: { value: productName || '' } });
    }

    hideSuggestions(e) {
      const el = this.searchSuggestionsEl;
      if (!el) return;
      if (!e || !e.target || !e.target.closest || !e.target.closest('.search-container')) {
        el.style.display = 'none';
      }
    }

    // --------- Legacy globals bridge ---------
    installGlobals() {
      const self = this;
      window.displayProducts = (arr) => self.render(arr);
      window.createProductCard = (p) => self.createCard(p);
      window.generateStars = (r) => self._generateStars(r);
      window.animateProductCards = () => self.animateCards();
      window.getFilteredProducts = () => self.getFiltered();

      window.handleFilter = (e) => self.onFilter(e);
      window.handleSort = (e) => self.onSort(e);
      window.handlePriceFilter = () => self.onPriceFilter();
      window.toggleView = (v) => self.setView(v);
      window.loadMoreProducts = () => self.loadMore();

      window.initializeSearch = () => self.buildSearchIndex();
      window.handleSearch = (e) => self.searchHandler(e);
      window.showSearchSuggestions = (t) => self.showSuggestions(t);
      window.selectSuggestion = (n) => self.selectSuggestionByName(n);
      window.hideSearchSuggestions = (e) => self.hideSuggestions(e);
    }

    // --------- Helpers ---------
    _withLoading(run) {
      try {
        if (typeof window.showLoading === 'function') window.showLoading();
        setTimeout(() => {
          try {
            run();
          } finally {
            if (typeof window.hideLoading === 'function') window.hideLoading();
          }
        }, 300);
      } catch (_) {
        run();
      }
    }
  }

  // Singleton + override legacy globals immediately (module loads after script.js)
  if (!window.ProductListService) {
    window.ProductListService = new ProductListService();
  }
  // Always ensure our implementations are installed (safe if called multiple times)
  try {
    window.ProductListService.installGlobals();
  } catch (_) {}
})();
// Auto-initialize listing on pages that have #products-grid and window.products
(function () {
  function boot() {
    try {
      const grid = document.getElementById('products-grid');
      if (grid && Array.isArray(window.products) && window.products.length) {
        // Ensure legacy globals are installed (safe if already done)
        try { window.ProductListService?.installGlobals?.(); } catch (_) {}
        // Build search index and render initial list
        try { window.ProductListService?.buildSearchIndex?.(); } catch (_) {}
        try {
          const svc = window.ProductListService;
          if (svc && typeof svc.getFiltered === 'function' && typeof svc.render === 'function') {
            svc.render(svc.getFiltered());
          }
        } catch (_) {}
      }
    } catch (_) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();