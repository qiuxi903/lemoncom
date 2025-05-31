document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'white';
        }
    });

    // 如果在首页，加载热门产品
    const homeProducts = document.getElementById('homeProducts');
    if (homeProducts) {
        renderProducts('homeProducts', productData, 3); // 只显示3个热门产品
    }

    // 加载首页新闻
    const homeNews = document.getElementById('homeNews');
    if (homeNews) {
        // 获取最新的3条新闻（newsData已经按时间排序）
        const latestNews = newsData.slice(0, 3);
        renderNews('homeNews', latestNews, null, 'home');
    }
}); 