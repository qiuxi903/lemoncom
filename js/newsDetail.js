document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取新闻ID
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'));

    // 查找当前新闻
    const currentNews = newsData.find(news => news.id === newsId);
    if (!currentNews) {
        window.location.href = 'news.html';
        return;
    }

    // 更新页面标题
    document.title = `${currentNews.title} - 企业官网`;

    // 填充新闻内容
    document.getElementById('newsTitle').textContent = currentNews.title;
    document.getElementById('newsCategory').textContent = currentNews.categoryName;
    document.getElementById('newsDate').textContent = currentNews.date;
    document.getElementById('newsImage').src = currentNews.image;
    document.getElementById('newsImage').alt = currentNews.title;
    document.getElementById('newsContent').innerHTML = currentNews.content;

    // 处理上一篇和下一篇
    const currentIndex = newsData.findIndex(news => news.id === newsId);
    const prevNews = newsData[currentIndex - 1];
    const nextNews = newsData[currentIndex + 1];

    const prevNewsLink = document.getElementById('prevNews');
    const nextNewsLink = document.getElementById('nextNews');

    if (prevNews) {
        prevNewsLink.href = `news-detail.html?id=${prevNews.id}`;
    } else {
        prevNewsLink.style.visibility = 'hidden';
    }

    if (nextNews) {
        nextNewsLink.href = `news-detail.html?id=${nextNews.id}`;
    } else {
        nextNewsLink.style.visibility = 'hidden';
    }
}); 