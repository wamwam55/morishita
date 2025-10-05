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
        
        // 動画が存在する場合は自動再生を確実に開始
        const existingVideo = document.querySelector('.hero-video');
        if (existingVideo) {
            existingVideo.play().catch(e => console.log('Video autoplay failed:', e));
        }

        // 設定の適用（無効化 - HTMLの内容をそのまま使用）
        // if (window.heroConfig) {
        //     applyHeroConfig(window.heroConfig);
        // }

        // ボタンクリックイベント
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.classList.contains('btn-primary')) {
                    handlePrimaryAction(e);
                } else if (this.classList.contains('btn-secondary')) {
                    handleSecondaryAction(e);
                }
            });
        });

        // パララックス効果
        if (window.heroConfig && window.heroConfig.effects && window.heroConfig.effects.parallax) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }

        // アニメーション再生
        observeHeroAnimations();
        
        // スライドショーの初期化
        initSlideshow();
    }

    function applyHeroConfig(config) {
        if (!config) return;

        // タイトルとサブタイトルの更新
        if (config.title) {
            const title = document.querySelector('.hero-title');
            if (title) title.textContent = config.title;
        }

        if (config.subtitle) {
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) subtitle.textContent = config.subtitle;
        }

        if (config.description) {
            const description = document.querySelector('.hero-description');
            if (description) description.innerHTML = config.description;
        }

        // ボタンテキストの更新
        if (config.buttons) {
            const primaryBtn = document.querySelector('.btn-primary');
            const secondaryBtn = document.querySelector('.btn-secondary');

            if (primaryBtn && config.buttons.primary) {
                primaryBtn.textContent = config.buttons.primary.text;
            }

            if (secondaryBtn && config.buttons.secondary) {
                secondaryBtn.textContent = config.buttons.secondary.text;
            }
        }

        // 画像の更新
        if (config.image && config.image.src) {
            const imagePlaceholder = document.querySelector('.hero-image-placeholder');
            if (imagePlaceholder) {
                const img = document.createElement('img');
                img.src = config.image.src;
                img.alt = config.image.alt || 'Hero Image';
                img.style.width = '100%';
                img.style.height = 'auto';
                imagePlaceholder.innerHTML = '';
                imagePlaceholder.appendChild(img);
            }
        }
    }

    function handlePrimaryAction(e) {
        e.preventDefault();
        
        // configから動作を取得
        if (window.heroConfig && window.heroConfig.buttons && window.heroConfig.buttons.primary) {
            const action = window.heroConfig.buttons.primary.action;
            
            if (action.type === 'scroll') {
                const target = document.querySelector(action.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (action.type === 'link') {
                window.location.href = action.target;
            }
        }
    }

    function handleSecondaryAction(e) {
        e.preventDefault();
        
        // configから動作を取得
        if (window.heroConfig && window.heroConfig.buttons && window.heroConfig.buttons.secondary) {
            const action = window.heroConfig.buttons.secondary.action;
            
            if (action.type === 'scroll') {
                const target = document.querySelector(action.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (action.type === 'link') {
                window.location.href = action.target;
            }
        }
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

    function initSlideshow() {
        // Check if video exists and is supported
        const video = document.querySelector('.hero-video');
        if (video && video.canPlayType && video.canPlayType('video/mp4')) {
            // Video is supported, don't initialize slideshow
            console.log('Video background detected, skipping slideshow');
            return;
        }
        
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        // 自動スライドショー（5秒ごと）
        setInterval(() => {
            // 現在のスライドを非表示
            slides[currentSlide].classList.remove('active');
            
            // 次のスライドへ
            currentSlide = (currentSlide + 1) % slides.length;
            
            // 新しいスライドを表示
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // DOMが読み込まれたら初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero);
    } else {
        initHero();
    }
})();