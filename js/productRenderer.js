function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <a href="#" class="view-details">查看详情</a>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="price">￥${product.price.toFixed(2)}</span>
                    <span class="downloads"><i class="fas fa-download"></i> ${product.downloads}</span>
                </div>
            </div>
        </div>
    `;
}

function renderProducts(containerId, products, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let productsToRender = products;
    if (limit) {
        productsToRender = products.filter(p => p.isHot).slice(0, limit);
    }

    container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
} 