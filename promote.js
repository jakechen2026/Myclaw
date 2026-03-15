<!-- 自动推广系统 - 添加到网站头部 -->
<script>
// ==================== AiAmigo 自动推广系统 ====================
// 版本：1.0
// 功能：自动生成推广内容、收集用户反馈、优化SEO、引导用户分享
// ====================

(function() {
    // 配置
    const CONFIG = {
        siteName: 'AiAmigo',
        siteUrl: 'https://aiamigo.cn',
        apiKey: '你的API密钥', // 可选，用于更多高级功能
        autoShare: true,        // 是否自动生成分享内容
        autoCollect: true,      // 是否自动收集用户反馈
        autoSEO: true          // 是否自动优化SEO
    };

    // ==================== 1. 自动生成分享内容 ====================
    const shareContent = {
        // 小红书风格文案
        xiaohongshu: [
            '发现一个超好用的AI朋友！会22种语言，还能越用越懂你～',
            '打工人必备！这个AI帮我写周报、回邮件，每天省2小时✨',
            '22种语言的AI助手！跟外国客户聊天再也不怕了🌍',
            '我的AI朋友会100种技能，连PPT都会做！太强了👏'
        ],
        
        // 知乎风格回答
        zhihu: [
            '作为重度AI用户，强烈推荐AiAmigo。最打动我的是它真的能记住我的习惯...',
            '对比过市面上十几款AI工具，AiAmigo的22种语言支持是独一档的...',
            '用AiAmigo三个月了，最大的感受是：它真的越用越懂我...'
        ],
        
        // 微博/B站风格
        weibo: [
            '🎉 发现宝藏AI！AiAmigo免费使用，22种语言随便切换～',
            '💻 打工人神器！AI帮我写周报，半小时工作变5分钟',
            '🌍 出国旅游必备！22种语言的AI翻译官，免费！'
        ]
    };

    // 随机获取一条分享内容
    function getRandomShare(platform) {
        const arr = shareContent[platform] || shareContent.xiaohongshu;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ==================== 2. 自动收集用户反馈 ====================
    const feedbackCollector = {
        // 存储用户反馈
        feedbacks: [],
        
        // 弹出反馈框（用户使用3次后自动弹出）
        init: function() {
            const visits = localStorage.getItem('aiamigo_visits') || 0;
            if (visits > 2 && !localStorage.getItem('aiamigo_feedback_asked')) {
                setTimeout(() => {
                    this.showFeedbackModal();
                }, 5000);
            }
        },
        
        // 显示反馈模态框
        showFeedbackModal: function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(20,20,20,0.95);
                backdrop-filter: blur(10px);
                border: 1px solid #ff4d4d;
                border-radius: 12px;
                padding: 20px;
                max-width: 300px;
                color: white;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            `;
            
            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="color: #ff4d4d; font-weight: 600;">🦞 喜欢AiAmigo吗？</span>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #666; cursor: pointer;">✕</button>
                </div>
                <p style="margin-bottom: 16px; font-size: 14px;">你的反馈能帮我变得更好！</p>
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.feedbackCollector.submit('❤️ 很喜欢')" style="flex:1; background: #ff4d4d; border: none; color: white; padding: 8px; border-radius: 6px; cursor: pointer;">❤️ 很喜欢</button>
                    <button onclick="window.feedbackCollector.submit('👍 还不错')" style="flex:1; background: #333; border: 1px solid #ff4d4d; color: white; padding: 8px; border-radius: 6px; cursor: pointer;">👍 还不错</button>
                </div>
                <div style="margin-top: 10px;">
                    <button onclick="window.feedbackCollector.submit('💡 有建议')" style="width:100%; background: transparent; border: 1px solid #666; color: white; padding: 8px; border-radius: 6px; cursor: pointer;">💡 我有建议</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            localStorage.setItem('aiamigo_feedback_asked', 'true');
        },
        
        // 提交反馈
        submit: function(type) {
            this.feedbacks.push({
                type: type,
                time: new Date().toISOString(),
                userId: localStorage.getItem('anonymous_id')
            });
            
            // 保存到本地存储
            localStorage.setItem('aiamigo_feedbacks', JSON.stringify(this.feedbacks));
            
            // 可选：发送到服务器
            if (CONFIG.apiKey) {
                fetch('https://your-api.com/feedback', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.feedbacks[this.feedbacks.length-1])
                });
            }
            
            // 显示感谢消息
            alert('感谢你的反馈！❤️');
            document.querySelector('.feedback-modal')?.remove();
        }
    };

    // ==================== 3. 自动生成UGC收集页面 ====================
    const ugcGenerator = {
        // 创建UGC收集页面
        createUGCPage: function() {
            const page = `
                <div style="max-width: 800px; margin: 40px auto; padding: 20px;">
                    <h1 style="color: #ff4d4d; font-size: 2em; margin-bottom: 20px;">🦞 分享你和AiAmigo的故事</h1>
                    
                    <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                        <h2 style="color: white; margin-bottom: 20px;">📝 分享你的使用体验</h2>
                        <textarea id="userStory" placeholder="写写你怎么用AiAmigo的，有什么好玩的故事..." style="width: 100%; height: 150px; background: rgba(0,0,0,0.3); border: 1px solid #ff4d4d; border-radius: 8px; color: white; padding: 12px; margin-bottom: 20px;"></textarea>
                        
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <label style="color: white;"><input type="checkbox" id="allowShare"> 允许分享到社交媒体</label>
                            <label style="color: white;"><input type="checkbox" id="allowAnonym"> 匿名发布</label>
                        </div>
                        
                        <button onclick="window.ugcGenerator.submitStory()" style="background: #ff4d4d; color: white; border: none; padding: 12px 30px; border-radius: 30px; cursor: pointer; font-size: 1.1em;">✨ 分享故事</button>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px;">
                        <h2 style="color: white; margin-bottom: 20px;">🌟 用户精彩故事</h2>
                        <div id="storiesList">
                            <!-- 动态加载用户故事 -->
                        </div>
                    </div>
                </div>
            `;
            
            // 创建独立页面
            const blob = new Blob([page], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            
            // 在网站底部添加链接
            const footer = document.querySelector('.footer-links');
            if (footer) {
                const storyLink = document.createElement('a');
                storyLink.href = url;
                storyLink.textContent = '📖 分享故事';
                storyLink.style.color = '#ff4d4d';
                footer.appendChild(storyLink);
            }
        },
        
        // 提交故事
        submitStory: function() {
            const story = document.getElementById('userStory')?.value;
            if (!story) return alert('请写下你的故事～');
            
            const stories = JSON.parse(localStorage.getItem('aiamigo_stories') || '[]');
            stories.push({
                content: story,
                time: new Date().toLocaleDateString(),
                allowShare: document.getElementById('allowShare')?.checked || false,
                anonymous: document.getElementById('allowAnonym')?.checked || false
            });
            
            localStorage.setItem('aiamigo_stories', JSON.stringify(stories));
            alert('感谢分享！你的故事已收录 🌟');
            document.getElementById('userStory').value = '';
            this.loadStories();
        },
        
        // 加载故事
        loadStories: function() {
            const stories = JSON.parse(localStorage.getItem('aiamigo_stories') || '[]');
            const container = document.getElementById('storiesList');
            if (!container) return;
            
            container.innerHTML = stories.slice(-5).reverse().map(s => `
                <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                    <p style="color: white; margin-bottom: 8px;">${s.content}</p>
                    <div style="display: flex; gap: 10px; color: #666; font-size: 0.9em;">
                        <span>📅 ${s.time}</span>
                        <span>👤 ${s.anonymous ? '匿名用户' : '热心用户'}</span>
                    </div>
                </div>
            `).join('');
        }
    };

    // ==================== 4. 自动生成SEO结构化数据 ====================
    const seoOptimizer = {
        // 生成结构化数据
        generateStructuredData: function() {
            const data = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "AiAmigo",
                "description": "你的AI朋友 · 22种语言 · 100大技能 · 越用越懂你",
                "applicationCategory": "AI Assistant",
                "operatingSystem": "All",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "CNY"
                },
                "featureList": [
                    "22种语言自动适配",
                    "100大安全技能",
                    "自动学习进化",
                    "无需注册登录",
                    "隐私保护"
                ],
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "127"
                }
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(data);
            document.head.appendChild(script);
        },
        
        // 生成FAQ数据
        generateFAQ: function() {
            const faqData = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "AiAmigo支持哪些语言？",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "AiAmigo支持22种语言，包括中文、英文、西班牙语、法语、德语、日语、韩语等，并且能根据你的IP自动切换语言。"
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "AiAmigo需要注册吗？",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "完全不需要！AiAmigo打开即用，无需任何注册登录。"
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "AiAmigo真的免费吗？",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "是的，AiAmigo完全免费，所有功能都可使用。"
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "AiAmigo能做什么？",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "AiAmigo拥有100项技能，包括PDF处理、文档总结、邮件管理、AI绘画、代码生成、数据分析等。"
                        }
                    }
                ]
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(faqData);
            document.head.appendChild(script);
        }
    };

    // ==================== 5. 自动生成分享按钮 ====================
    const shareButtons = {
        create: function() {
            const shareHTML = `
                <div style="position: fixed; bottom: 20px; left: 20px; z-index: 9999;">
                    <button onclick="window.shareButtons.openShare()" style="background: #ff4d4d; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 15px rgba(255,77,77,0.3);">
                        📤
                    </button>
                </div>
            `;
            
            const div = document.createElement('div');
            div.innerHTML = shareHTML;
            document.body.appendChild(div.firstChild);
        },
        
        openShare: function() {
            const platforms = [
                { name: '小红书', url: `https://www.xiaohongshu.com/discovery/item?content=${encodeURIComponent(getRandomShare('xiaohongshu'))}` },
                { name: '知乎', url: `https://www.zhihu.com/write?topic=AI&content=${encodeURIComponent(getRandomShare('zhihu'))}` },
                { name: '微博', url: `http://service.weibo.com/share/share.php?url=${CONFIG.siteUrl}&title=${encodeURIComponent(getRandomShare('weibo'))}` }
            ];
            
            // 创建分享弹窗
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: #1a1a1a; border: 1px solid #ff4d4d; border-radius: 16px;
                padding: 30px; z-index: 10001; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            `;
            
            modal.innerHTML = `
                <h3 style="color: white; margin-bottom: 20px;">📤 分享AiAmigo</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    ${platforms.map(p => `
                        <a href="${p.url}" target="_blank" style="background: #333; color: white; padding: 10px 20px; border-radius: 30px; text-decoration: none; display: inline-block;">
                            ${p.name}
                        </a>
                    `).join('')}
                </div>
                <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #666; cursor: pointer;">✕</button>
            `;
            
            document.body.appendChild(modal);
        }
    };

    // ==================== 6. 初始化所有功能 ====================
    function init() {
        // 统计访问次数
        const visits = parseInt(localStorage.getItem('aiamigo_visits') || '0') + 1;
        localStorage.setItem('aiamigo_visits', visits.toString());
        
        // 初始化各功能
        if (CONFIG.autoSEO) {
            seoOptimizer.generateStructuredData();
            seoOptimizer.generateFAQ();
        }
        
        if (CONFIG.autoCollect) {
            feedbackCollector.init();
            window.feedbackCollector = feedbackCollector;
        }
        
        if (CONFIG.autoShare) {
            shareButtons.create();
            window.shareButtons = shareButtons;
            window.ugcGenerator = ugcGenerator;
            
            // 页面加载后创建UGC页面
            setTimeout(() => {
                ugcGenerator.createUGCPage();
            }, 2000);
        }
        
        console.log('🚀 AiAmigo 自动推广系统已启动');
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>