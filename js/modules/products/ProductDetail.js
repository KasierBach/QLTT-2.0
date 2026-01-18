/**
 * ProductDetailService - OOP implementation for product detail modal logic
 * Purpose:
 *  - Provide a discoverable, object-oriented API without depending on script.js
 *  - Centralize detail modal actions (open/quick view, gallery, options, quantity, cart actions, tabs, close)
 *  - Keep backward compatibility by installing legacy globals
 */
(function () {
  'use strict';

  class ProductDetailService {
    constructor() {
      this._selectors = {
        modal: 'product-modal',
        detailRoot: 'product-detail',
        mainImage: 'main-product-image',
      };
    }

    // Open detail modal for a product (fully implemented)
    open(productId) {
      const products = Array.isArray(window.products) ? window.products : [];
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      try {
        if (typeof window.addRecentlyViewed === 'function') window.addRecentlyViewed(product);
      } catch (_) {}

      const productReviews = (window.reviews && window.reviews[productId]) || [];
      const averageRating =
        productReviews.length > 0
          ? productReviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / productReviews.length
          : (product.rating || 0);

      const isInWishlist = (Array.isArray(window.wishlist) ? window.wishlist : []).some((it) => it.id === product.id);
      const formatPrice = window.formatPrice || ((v) => v);

      const genStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        const empty = 5 - full - (half ? 1 : 0);
        let html = '';
        for (let i = 0; i < full; i++) html += '<i class="fas fa-star star"></i>';
        if (half) html += '<i class="fas fa-star-half-alt star"></i>';
        for (let i = 0; i < empty; i++) html += '<i class="far fa-star star empty"></i>';
        return html;
      };

      const relatedProducts =
        typeof window.getRelatedProducts === 'function'
          ? window.getRelatedProducts(product.id, product.category)
          : products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

      const productDetail = document.getElementById(this._selectors.detailRoot);
      const productModal = document.getElementById(this._selectors.modal);
      if (!productDetail || !productModal) return;

      const gallery =
        product.images && product.images.length > 1
          ? `
        <div class="product-gallery">
          ${product.images
            .map(
              (img, index) => `
            <img src="${img}" alt="${product.name}" class="gallery-thumb ${index === 0 ? 'active' : ''}"
                 onclick="changeMainImage('${img}', this)">
          `,
            )
            .join('')}
        </div>
      `
          : '';

      const discountBadge = product.originalPrice
        ? `<span class="discount-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>`
        : '';

      const featuresHtml = (product.features || [])
        .map((f) => `<span class="feature-tag"><i class="fas fa-check"></i> ${f}</span>`)
        .join('');

      const optionsBlock = `
      ${
        product.colors && product.colors.length > 1
          ? `
        <div class="option-group">
          <label class="option-label">Màu sắc:</label>
          <div class="color-options">
            ${product.colors
              .map(
                (c, idx) => `
              <button class="color-option ${idx === 0 ? 'active' : ''}" onclick="selectOption(this,'color','${c}')" title="${c}">
                <span class="color-name">${c}</span>
              </button>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      ${
        product.storage && product.storage.length > 1
          ? `
        <div class="option-group">
          <label class="option-label">Dung lượng:</label>
          <div class="storage-options">
            ${product.storage
              .map(
                (s, idx) => `
              <button class="storage-option ${idx === 0 ? 'active' : ''}" onclick="selectOption(this,'storage','${s}')">${s}</button>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      ${
        product.memory && product.memory.length > 1
          ? `
        <div class="option-group">
          <label class="option-label">RAM:</label>
          <div class="memory-options">
            ${product.memory
              .map(
                (m, idx) => `
              <button class="memory-option ${idx === 0 ? 'active' : ''}" onclick="selectOption(this,'memory','${m}')">${m}</button>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      ${
        product.connectivity && product.connectivity.length > 1
          ? `
        <div class="option-group">
          <label class="option-label">Kết nối:</label>
          <div class="connectivity-options">
            ${product.connectivity
              .map(
                (cn, idx) => `
              <button class="connectivity-option ${idx === 0 ? 'active' : ''}" onclick="selectOption(this,'connectivity','${cn}')">${cn}</button>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }
      `;

      const reviewsList =
        productReviews.length > 0
          ? productReviews
              .map(
                (r) => `
        <div class="review-item">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">${(r.userName || 'U').charAt(0).toUpperCase()}</div>
              <div class="reviewer-details">
                <div class="reviewer-name">${r.userName}</div>
                <div class="review-date">${(window.formatDate || ((d) => d))(r.date)}</div>
              </div>
            </div>
            <div class="review-rating">${genStars(r.rating)}</div>
          </div>
          <div class="review-content">${r.content}</div>
          <div class="review-actions">
            <button class="review-action" onclick="likeReview(${r.id})"><i class="fas fa-thumbs-up"></i> Hữu ích (${r.helpful})</button>
            <button class="review-action" onclick="reportReview(${r.id})"><i class="fas fa-flag"></i> Báo cáo</button>
          </div>
        </div>
      `,
              )
              .join('')
          : `
        <div class="no-reviews">
          <i class="fas fa-star"></i>
          <h4>Chưa có đánh giá nào</h4>
          <p>Hãy là người đầu tiên đánh giá sản phẩm này</p>
        </div>
      `;

      const relatedHtml = relatedProducts.length
        ? `
      <div class="related-products-section">
        <h3 class="related-title"><i class="fas fa-layer-group"></i> Sản phẩm liên quan</h3>
        <div class="related-products-grid">
          ${relatedProducts
            .map(
              (rp) => `
            <div class="related-product-card" onclick="viewProductDetails(${rp.id})">
              <div class="related-product-image">
                <img src="${rp.image}" alt="${rp.name}">
                ${rp.badge ? `<span class="related-badge">${rp.badge}</span>` : ''}
              </div>
              <div class="related-product-info">
                <h4 class="related-product-name">${rp.name}</h4>
                <div class="related-product-rating">
                  ${genStars(rp.rating || 0)} <span>(${rp.reviewCount || 0})</span>
                </div>
                <div class="related-product-price">
                  <span class="related-current-price">${formatPrice(rp.price)}</span>
                  ${rp.originalPrice ? `<span class="related-original-price">${formatPrice(rp.originalPrice)}</span>` : ''}
                </div>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    `
        : '';

      productDetail.innerHTML = `
        <div class="product-detail-header">
          <div class="product-breadcrumb">
            <span>Trang chủ</span> <i class="fas fa-chevron-right"></i> 
            <span>${product.category?.charAt(0).toUpperCase() + (product.category || '').slice(1)}</span> <i class="fas fa-chevron-right"></i> 
            <span>${product.name}</span>
          </div>
          <div class="product-sku-brand">
            <span class="product-sku">SKU: ${product.sku || ''}</span>
            <span class="product-brand">Thương hiệu: <strong>${product.brand || ''}</strong></span>
          </div>
        </div>

        <div class="product-detail-main">
          <div class="product-detail-images">
            <div class="main-image-container">
              <img src="${product.image}" alt="${product.name}" id="main-product-image">
              <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id})" title="${isInWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}">
                <i class="fas fa-heart"></i>
              </button>
            </div>
            ${gallery}
          </div>
          
          <div class="product-detail-info">
            <h1 class="product-title">${product.name}</h1>
            
            <div class="product-meta">
              <div class="product-rating-meta">
                <div class="stars">${genStars(averageRating)}</div>
                <span class="rating-score">${averageRating.toFixed(1)}</span>
                <span class="rating-count">(${productReviews.length} đánh giá)</span>
              </div>
              <div class="product-stock">
                <span class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                  <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                  ${product.inStock ? `Còn ${product.stockQuantity || 0} sản phẩm` : 'Hết hàng'}
                </span>
              </div>
            </div>
            
            <div class="product-price-section">
              <div class="price-main">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                ${discountBadge}
              </div>
              <div class="price-info">
                <span class="warranty-info"><i class="fas fa-shield-alt"></i> Bảo hành ${product.warranty || ''}</span>
                <span class="shipping-info"><i class="fas fa-truck"></i> Miễn phí vận chuyển</span>
              </div>
            </div>

            <div class="product-description-short">
              <p>${product.description || ''}</p>
            </div>

            <div class="product-features">
              <h4>Tính năng nổi bật:</h4>
              <div class="features-list">
                ${featuresHtml}
              </div>
            </div>
            
            <div class="product-options-section">
              ${optionsBlock}
            </div>
            
            <div class="product-actions-section">
              <div class="quantity-section">
                <label class="quantity-label">Số lượng:</label>
                <div class="quantity-selector">
                  <button onclick="changeQuantity(-1)" class="quantity-btn">−</button>
                  <input type="number" id="product-quantity" value="1" min="1" max="${product.stockQuantity || 10}">
                  <button onclick="changeQuantity(1)" class="quantity-btn">+</button>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="btn-add-cart ${!product.inStock ? 'disabled' : ''}" 
                        onclick="addToCartFromDetail(${product.id})" 
                        ${!product.inStock ? 'disabled' : ''}>
                  <i class="fas fa-cart-plus"></i>
                  ${product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                </button>
                <button class="btn-buy-now ${!product.inStock ? 'disabled' : ''}"
                        onclick="buyNow(${product.id})"
                        ${!product.inStock ? 'disabled' : ''}>
                  <i class="fas fa-bolt"></i>
                  Mua ngay
                </button>
              </div>
            </div>

            <div class="product-services">
              <div class="service-item">
                <i class="fas fa-truck"></i>
                <div>
                  <strong>Giao hàng miễn phí</strong>
                  <span>Đơn hàng từ 500k</span>
                </div>
              </div>
              <div class="service-item">
                <i class="fas fa-undo"></i>
                <div>
                  <strong>Đổi trả 30 ngày</strong>
                  <span>Miễn phí đổi trả</span>
                </div>
              </div>
              <div class="service-item">
                <i class="fas fa-shield-alt"></i>
                <div>
                  <strong>Bảo hành ${product.warranty || ''}</strong>
                  <span>Chính hãng toàn quốc</span>
                </div>
              </div>
              <div class="service-item">
                <i class="fas fa-headset"></i>
                <div>
                  <strong>Hỗ trợ 24/7</strong>
                  <span>Tư vấn miễn phí</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="product-detail-tabs">
          <div class="tab-navigation">
            <button class="tab-btn active" onclick="showDetailTab('description', event)">
              <i class="fas fa-align-left"></i> Mô tả chi tiết
            </button>
            <button class="tab-btn" onclick="showDetailTab('specifications', event)">
              <i class="fas fa-cogs"></i> Thông số kỹ thuật
            </button>
            <button class="tab-btn" onclick="showDetailTab('reviews', event)">
              <i class="fas fa-star"></i> Đánh giá (${productReviews.length})
            </button>
          </div>

          <div class="tab-content-container">
            <div class="tab-content active" id="description-tab">
              <div class="description-content">
                <h3>Mô tả sản phẩm ${product.name}</h3>
                <div class="description-text">
                  ${
                    product.fullDescription
                      ? product.fullDescription.split('\n').map((p) => `<p>${p}</p>`).join('')
                      : `<p>${product.description || ''}</p>`
                  }
                </div>
                ${
                  product.tags && product.tags.length > 0
                    ? `
                  <div class="product-tags">
                    <h4>Tags:</h4>
                    <div class="tags-list">
                      ${product.tags.map((tag) => `<span class="product-tag">${tag}</span>`).join('')}
                    </div>
                  </div>
                `
                    : ''
                }
              </div>
            </div>

            <div class="tab-content" id="specifications-tab">
              <div class="specifications-content">
                <h3>Thông số kỹ thuật ${product.name}</h3>
                <div class="specs-table">
                  ${Object.entries(product.specifications || {})
                    .map(
                      ([key, value]) => `
                    <div class="spec-row">
                      <div class="spec-label">${key}</div>
                      <div class="spec-value">${value}</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            </div>

            <div class="tab-content" id="reviews-tab">
              <div class="reviews-content">
                <div class="reviews-summary">
                  <div class="rating-overview">
                    <div class="overall-rating">
                      <span class="rating-number">${averageRating.toFixed(1)}</span>
                      <div class="rating-stars">${genStars(averageRating)}</div>
                      <div class="rating-text">${productReviews.length} đánh giá</div>
                    </div>
                  </div>
                </div>

                <div class="reviews-list">
                  ${reviewsList}
                </div>

                ${
                  window.currentUser
                    ? `
                  <button class="add-review-btn" onclick="showAddReviewForm(${product.id})">
                    <i class="fas fa-plus"></i> Viết đánh giá
                  </button>
                `
                    : `
                  <div class="login-to-review">
                    <p>Vui lòng <a href="#" onclick="showAuthModal('login')" class="login-link">đăng nhập</a> để đánh giá sản phẩm</p>
                  </div>
                `
                }
              </div>
            </div>
          </div>
        </div>

        ${relatedHtml}
      `;

      productModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    // Quick view (alias)
    quickView(productId) {
      return this.open(productId);
    }

    // Gallery: change main image
    changeImage(imageSrc, thumbElement) {
      try {
        const el = document.getElementById(this._selectors.mainImage);
        if (el) el.src = imageSrc;
        if (thumbElement) {
          document.querySelectorAll('.gallery-thumb').forEach((t) => t.classList.remove('active'));
          thumbElement.classList.add('active');
        }
      } catch (_) {}
    }

    // Options: color/storage/memory/connectivity
    selectOption(button, optionType, value) {
      try {
        const container = button?.parentElement;
        if (container) {
          container.querySelectorAll(`.${optionType}-option`).forEach((btn) => btn.classList.remove('active'));
        }
        if (button && button.classList) button.classList.add('active');

        // store selection on detail root
        const detailRoot = button?.closest('.product-detail');
        const target = detailRoot || document.querySelector('.product-detail');
        if (target) {
          target.setAttribute(`data-selected-${optionType}`, value);
        }
      } catch (_) {}
    }

    // Quantity controls
    changeQuantity(delta) {
      try {
        const input = document.getElementById('product-quantity');
        if (!input) return;
        const min = parseInt(input.min || '1', 10);
        const max = parseInt(input.max || '99', 10);
        let val = parseInt(input.value || '1', 10);
        if (Number.isNaN(val)) val = 1;
        val += delta || 0;
        if (val < min) val = min;
        if (val > max) val = max;
        input.value = val;
      } catch (_) {}
    }

    // Add to cart from detail
    addToCart(productId) {
      const products = Array.isArray(window.products) ? window.products : [];
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const qty = parseInt(document.getElementById('product-quantity')?.value || '1', 10) || 1;
      const detail = document.querySelector('.product-detail');
      const selectedColor = detail?.getAttribute('data-selected-color') || product.colors?.[0] || null;
      const selectedStorage = detail?.getAttribute('data-selected-storage') || product.storage?.[0] || null;
      const selectedMemory = detail?.getAttribute('data-selected-memory') || product.memory?.[0] || null;
      const selectedConnectivity = detail?.getAttribute('data-selected-connectivity') || product.connectivity?.[0] || null;

      // Prefer CartService if available (may still delegate until CartService is migrated)
      if (window.CartService && typeof window.CartService.add === 'function') {
        // If CartService.add doesn't support options yet, fallback to legacy addToCartFromDetail
        if (typeof window.addToCartFromDetail === 'function') {
          window.addToCartFromDetail(productId);
          return;
        }
      }

      // Fallback: manage global cart with options (mirrors legacy addToCartFromDetail behavior)
      try {
        const cart = Array.isArray(window.cart) ? window.cart : (window.cart = []);
        const existing = cart.find(
          (item) =>
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedStorage === selectedStorage &&
            item.selectedMemory === selectedMemory &&
            item.selectedConnectivity === selectedConnectivity,
        );
        if (existing) {
          existing.quantity += qty;
        } else {
          cart.push({
            ...product,
            quantity: qty,
            selectedColor,
            selectedStorage,
            selectedMemory,
            selectedConnectivity,
          });
        }

        if (typeof window.updateCartUI === 'function') window.updateCartUI();
        if (typeof window.saveCart === 'function') {
          window.saveCart();
        } else {
          try {
            localStorage.setItem('cart', JSON.stringify(window.cart));
          } catch (_) {}
        }
        if (typeof window.showNotification === 'function') {
          window.showNotification(`${product.name} đã được thêm vào giỏ hàng!`, 'success');
        }
      } catch (e) {
        console.warn('addToCart fallback failed:', e);
      }
    }

    // Buy now: add then proceed to checkout
    buyNow(productId) {
      this.addToCart(productId);
      try {
        if (window.CheckoutService && typeof window.CheckoutService.proceed === 'function') {
          window.CheckoutService.proceed();
          return;
        }
        if (typeof window.proceedToCheckout === 'function') {
          window.proceedToCheckout();
          return;
        }
      } catch (_) {}
    }

    // Tabs
    showTab(tabName, event) {
      try {
        document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
        if (event && event.target && event.target.classList) event.target.classList.add('active');

        document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
        const target = document.getElementById(`${tabName}-tab`);
        if (target) target.classList.add('active');
      } catch (_) {}
    }

    // Close detail modal
    close() {
      try {
        const modal = document.getElementById(this._selectors.modal);
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      } catch (_) {}
    }

    // Related products helper
    related(currentProductId, category, limit = 4) {
      if (typeof window.getRelatedProducts === 'function') {
        return window.getRelatedProducts(currentProductId, category, limit);
      }
      const products = Array.isArray(window.products) ? window.products : [];
      return products.filter((p) => p.id !== currentProductId && p.category === category).slice(0, limit);
    }

    // Optional installer: route legacy globals to this façade for consistency
    installGlobals() {
      const self = this;
      window.viewProductDetails = (id) => self.open(id);
      window.quickView = (id) => self.quickView(id);
      window.changeMainImage = (src, el) => self.changeImage(src, el);
      window.selectOption = (btn, type, val) => self.selectOption(btn, type, val);
      window.changeQuantity = (d) => self.changeQuantity(d);
      window.addToCartFromDetail = (id) => self.addToCart(id);
      window.buyNow = (id) => self.buyNow(id);
      window.showDetailTab = (name, e) => self.showTab(name, e);
      window.closeProductModal = () => self.close();
      window.getRelatedProducts = (id, cat, limit) => self.related(id, cat, limit);
    }
  }

  // Singleton instance + install legacy bridges
  if (!window.ProductDetailService) {
    window.ProductDetailService = new ProductDetailService();
  }
  try {
    window.ProductDetailService.installGlobals();
  } catch (_) {}
})();