document.addEventListener('DOMContentLoaded', function() {
    // 加载所有产品
    renderProducts('allProducts', productData);

    const products = document.querySelectorAll('.product-card');
    const categoryFilter = document.querySelector('.category-filter');
    const priceFilter = document.querySelector('.price-filter');
    const searchInput = document.querySelector('.search-filter input');
    const searchButton = document.querySelector('.search-filter button');
    const pagination = document.querySelector('.pagination');
    const itemsPerPage = 6;
    let currentPage = 1;

    // 分类筛选
    categoryFilter.addEventListener('change', function() {
        const category = this.value;
        filterProducts();
    });

    // 价格排序
    priceFilter.addEventListener('change', function() {
        const sortType = this.value;
        const productsArray = Array.from(products);
        
        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('￥', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('￥', ''));
            
            if (sortType === 'low') {
                return priceA - priceB;
            } else if (sortType === 'high') {
                return priceB - priceA;
            }
            return 0;
        });

        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';
        productsArray.forEach(product => productsGrid.appendChild(product));
    });

    // 搜索功能
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        filterProducts();
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });

    // 分页功能
    function setupPagination(filteredProducts) {
        const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
        pagination.innerHTML = '';
        
        if (pageCount <= 1) {
            pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'flex';
        
        // 添加页码
        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                showPage(filteredProducts);
                
                // 更新活动页码样式
                pagination.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            });
            
            pagination.appendChild(pageLink);
        }
    }

    // 显示当前页的产品
    function showPage(filteredProducts) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        products.forEach(product => product.style.display = 'none');
        
        filteredProducts.slice(start, end).forEach(product => {
            product.style.display = 'block';
        });
    }

    // 筛选产品
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value.toLowerCase();
        
        const filteredProducts = Array.from(products).filter(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const description = product.querySelector('.product-description').textContent.toLowerCase();
            const productCategory = product.dataset.category || '';
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === '' || productCategory === category;
            
            return matchesSearch && matchesCategory;
        });
        
        currentPage = 1;
        setupPagination(filteredProducts);
        showPage(filteredProducts);
    }

    // 初始化
    setupPagination(Array.from(products));
    showPage(Array.from(products));
}); 