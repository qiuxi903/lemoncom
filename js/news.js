document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('newsGrid');
    const pagination = document.querySelector('.pagination');
    const categoryBtns = document.querySelectorAll('.category-btn');
    let currentPage = 1;
    let currentCategory = 'all';

    // 渲染分页
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / newsConfig.itemsPerPage);
        let paginationHTML = '';
        
        // 添加上一页按钮
        paginationHTML += `<a href="#" class="prev-page ${currentPage === 1 ? 'disabled' : ''}">&laquo;</a>`;
        
        // 添加页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `<a href="#" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        // 添加下一页按钮
        paginationHTML += `<a href="#" class="next-page ${currentPage === totalPages ? 'disabled' : ''}">&raquo;</a>`;
        
        pagination.innerHTML = paginationHTML;
        
        // 添加事件监听
        pagination.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.classList.contains('disabled')) return;
                
                if (this.classList.contains('prev-page')) {
                    currentPage--;
                } else if (this.classList.contains('next-page')) {
                    currentPage++;
                } else {
                    currentPage = parseInt(this.textContent);
                }
                
                renderNews();
            });
        });
    }

    // 渲染新闻
    function renderNews() {
        const startIndex = (currentPage - 1) * newsConfig.itemsPerPage;
        const endIndex = startIndex + newsConfig.itemsPerPage;
        
        let filteredNews = newsData;
        if (currentCategory !== 'all') {
            filteredNews = newsData.filter(news => news.category === currentCategory);
        }
        
        const newsToShow = filteredNews.slice(startIndex, endIndex);
        newsGrid.innerHTML = newsToShow.map(news => createNewsCard(news)).join('');
        
        renderPagination(filteredNews.length);
        
        // 滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 分类按钮点击事件
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            currentPage = 1;
            renderNews();
        });
    });

    // 初始化渲染
    renderNews();
}); 