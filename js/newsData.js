const newsData = [
    {
        id: 1,
        category: 'company',
        title: 'demo',
        excerpt: '简短描述...',
        content: `
            <p>文字。。。。。</p>
            
        `,
        date: '2024-03-15',
        image: 'images/tupian.svg',
        categoryName: '公司新闻',
        isHot: true,  // 标记为热门新闻，将显示在首页
        timestamp: new Date('2024-03-15').getTime()  // 添加时间戳
    },
    {
        id: 2,
        category: 'industry',
        title: 'demo',
        excerpt: '简短描述...',
        content: `
            <p>文字：</p>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        `,
        date: '2024-03-12',
        image: 'images/tupian.svg',
        categoryName: '行业动态',
        isHot: true,
        timestamp: new Date('2024-03-12').getTime()
    },
    {
        id: 3,
        category: 'product',
        title: 'demo',
        excerpt: '简短描述...',
        content: `
            <p>test：</p>
            <ul>
                <li>新增功能1：...</li>
                <li>新增功能2：...</li>
                <li>新增功能3：...</li>
            </ul>
        `,
        date: '2024-03-10',
        image: 'images/tupian.svg',
        categoryName: '产品更新',
        timestamp: new Date('2024-03-10').getTime()
    }
    // 可以添加更多新闻数据
];

// 按时间戳排序新闻
newsData.sort((a, b) => b.timestamp - a.timestamp);

// 添加分页配置
const newsConfig = {
    itemsPerPage: 6,
    totalPages: Math.ceil(newsData.length / 6)
}; 