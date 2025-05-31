function createNewsCard(news, mode = 'full') {
    if (mode === 'home') {
        // 首页简洁模式
        return `
            <article class="news-card" data-category="${news.category}">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-content">
                    <span class="news-date">${news.date}</span>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <a href="news-detail.html?id=${news.id}" class="read-more">
                        阅读更多
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }
    
    // 新闻列表页完整模式
    return `
        <article class="news-card" data-category="${news.category}">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-content">
                <span class="news-category">${news.categoryName}</span>
                <span class="news-date">${news.date}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="news-detail.html?id=${news.id}" class="read-more">
                    阅读更多
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

function renderNews(containerId, news, limit = null, mode = 'full') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let newsToRender = news;
    if (limit) {
        newsToRender = news.slice(0, limit);
    }

    container.innerHTML = newsToRender.map(item => createNewsCard(item, mode)).join('');
} 