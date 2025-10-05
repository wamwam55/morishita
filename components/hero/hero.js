(function() {
    'use strict';

    function initHero() {
        const heroSection = document.querySelector('.hero-section');
        const heroButtons = document.querySelectorAll('.hero-actions .btn');
        
        if (!heroSection) return;

        // 強制的に正しいテキストを設定
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroTitle) {
            heroTitle.textContent = 'あなたの「成功」を支える税務戦略';
        }
        if (heroSubtitle) {
            heroSubtitle.textContent = '森下知幸税理士事務所';
        }
        if (heroDescription) {
            heroDescription.innerHTML = '経営者の皆様に寄り添い、最適な税務・財務戦略で<br>事業の持続的成長と成功への道筋を共に創ります。';
        }
        
        // ビデオ背景を動的に作成して確実に読み込む
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            // 既存のビデオ要素を削除
            const existingVideo = heroBackground.querySelector('.hero-video');
            if (existingVideo) {
                existingVideo.remove();
            }
            
            // 新しいビデオ要素を作成
            const video = document.createElement('video');
            video.className = 'hero-video';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            
            // ビデオソースを設定（ローカルファイル）
            const source = document.createElement('source');
            source.src = 'videos/0921(3).mp4';
            source.type = 'video/mp4';
            
            video.appendChild(source);
            
            // グラデーションの前に挿入
            const gradient = heroBackground.querySelector('.hero-gradient');
            if (gradient) {
                heroBackground.insertBefore(video, gradient);
            } else {
                heroBackground.appendChild(video);
            }
            
            // ビデオを読み込んで再生
            video.load();
            
            // 再生を試みる
            video.play().then(() => {
                console.log('Video playing successfully');
            }).catch(error => {
                console.error('Video play failed:', error);
                // ローカルビデオの再生失敗時のログ
                console.error('Local video playback failed');
            });
        }

        // リンクのスムーススクロール機能
        heroButtons.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const siteHeader = document.querySelector('.site-header');
                        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 30;
                        
                        smoothScrollTo(targetPosition, 800);
                    }
                }
            });
        });

        // アニメーション再生
        observeHeroAnimations();
    }

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
        
        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutQuart(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    function observeHeroAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.hero-content, .hero-image');
        animatedElements.forEach(el => observer.observe(el));
    }

    // DOMが読み込まれたら初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero);
    } else {
        initHero();
    }
})();