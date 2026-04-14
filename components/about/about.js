(function() {
    'use strict';

    // 高級感のあるスクロールアニメーション
    function initAbout() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        // スライドショーの初期化
        initSlideshow();

        // スクロール連動アニメーションの初期化
        initScrollAnimations();

        // パララックス効果の初期化
        initParallaxEffect();

        // 設定の適用
        if (window.aboutConfig) {
            applyAboutConfig(window.aboutConfig);
        }
    }

    // スライドショー切り替え
    function initSlideshow() {
        const slides = document.querySelectorAll('.about-slide');
        const navBtns = document.querySelectorAll('.slide-nav-btn');
        const progressBar = document.getElementById('aboutProgressBar');
        if (!slides.length || !navBtns.length) return;

        let currentSlide = 1;
        let autoTimer = null;

        function showSlide(num) {
            slides.forEach(s => {
                s.classList.remove('active');
                // アニメーションをリトリガー
                const text = s.querySelector('.slide-text');
                const image = s.querySelector('.slide-image');
                if (text) { text.classList.remove('in-view'); text.style.animation = ''; }
                if (image) { image.classList.remove('in-view'); image.style.animation = ''; }
            });
            navBtns.forEach(b => b.classList.remove('active'));

            const target = document.querySelector('.about-slide[data-slide="' + num + '"]');
            const btn = document.querySelector('.slide-nav-btn[data-slide="' + num + '"]');
            if (target) {
                target.classList.add('active');
                // アニメーション再適用
                setTimeout(() => {
                    const text = target.querySelector('.slide-text');
                    const image = target.querySelector('.slide-image');
                    if (text) {
                        text.classList.add('in-view');
                        text.style.animation = 'floatIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        const descriptions = text.querySelectorAll('.slide-description');
                        descriptions.forEach((desc, i) => {
                            setTimeout(() => {
                                desc.style.opacity = '0';
                                desc.style.transform = 'translateX(-20px)';
                                desc.style.animation = 'fadeUpRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                            }, 100 * (i + 1));
                        });
                    }
                    if (image) {
                        image.classList.add('in-view');
                        image.style.animation = 'slideInRotate 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                    }
                }, 50);
            }
            if (btn) btn.classList.add('active');
            if (progressBar) {
                progressBar.style.width = (num / slides.length * 100) + '%';
            }
            currentSlide = num;
        }

        // ナビボタンのクリック
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const num = parseInt(btn.dataset.slide);
                showSlide(num);
                resetAutoPlay();
            });
        });

        // 自動切り替え
        function startAutoPlay() {
            autoTimer = setInterval(() => {
                let next = currentSlide + 1;
                if (next > slides.length) next = 1;
                showSlide(next);
            }, 8000);
        }

        function resetAutoPlay() {
            if (autoTimer) clearInterval(autoTimer);
            startAutoPlay();
        }

        // 初期表示
        showSlide(1);
        startAutoPlay();

        // セクションが見えていないときは自動切り替え停止
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetAutoPlay();
                } else {
                    if (autoTimer) clearInterval(autoTimer);
                }
            });
        }, { threshold: 0.1 });

        const slideshow = document.querySelector('.about-slideshow');
        if (slideshow) sectionObserver.observe(slideshow);
    }

    // スクロール連動アニメーション
    function initScrollAnimations() {
        // セクションヘッダーのアニメーション
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        const header = document.querySelector('.section-header');
        if (header) {
            headerObserver.observe(header);
        }

        // 各要素のアニメーション（スクロールするたびに動作）
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ビューポートに入ったらアニメーション追加
                    entry.target.classList.add('in-view');
                    
                    // 動的なアニメーション適用
                    if (entry.target.classList.contains('slide-text')) {
                        entry.target.style.animation = 'floatIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                    }
                    if (entry.target.classList.contains('slide-image')) {
                        entry.target.style.animation = 'slideInRotate 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        entry.target.setAttribute('data-parallax', 'true');
                        // パルス効果を追加
                        setTimeout(() => {
                            if (entry.target.classList.contains('in-view')) {
                                entry.target.style.animation = 'slideInRotate 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, pulseGlow 3s ease-in-out infinite';
                            }
                        }, 1500);
                    }
                    
                    // Staggered child animations
                    const descriptions = entry.target.querySelectorAll('.slide-description');
                    descriptions.forEach((desc, index) => {
                        setTimeout(() => {
                            desc.style.opacity = '0';
                            desc.style.transform = 'translateX(-20px)';
                            desc.style.animation = `fadeUpRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                        }, 100 * (index + 1));
                    });
                } else if (entry.boundingClientRect.top > 0) {
                    // ビューポートの上に出たらアニメーションリセット（下にスクロール時）
                    entry.target.classList.remove('in-view');
                    
                    // パララックス効果をリセット
                    if (entry.target.classList.contains('slide-image')) {
                        entry.target.removeAttribute('data-parallax');
                        entry.target.style.animation = '';
                    }
                    if (entry.target.classList.contains('slide-text')) {
                        entry.target.style.animation = '';
                        const descriptions = entry.target.querySelectorAll('.slide-description');
                        descriptions.forEach(desc => {
                            desc.style.animation = '';
                            desc.style.opacity = '';
                            desc.style.transform = '';
                        });
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        // テキストと画像要素を監視
        const animateElements = document.querySelectorAll('[data-animation]');
        animateElements.forEach(element => {
            elementObserver.observe(element);
        });

        // スライド全体の監視（より複雑なアニメーション用）
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const slide = entry.target;
                const slideText = slide.querySelector('.slide-text');
                const slideImage = slide.querySelector('.slide-image');
                
                if (entry.isIntersecting) {
                    // スライドの位置に基づいて異なるタイミングでアニメーション
                    const slideIndex = parseInt(slide.dataset.slide);
                    
                    // テキストアニメーション
                    if (slideText && !slideText.classList.contains('in-view')) {
                        setTimeout(() => {
                            slideText.classList.add('in-view');
                        }, slideIndex % 2 === 0 ? 100 : 0);
                    }
                    
                    // 画像アニメーション
                    if (slideImage && !slideImage.classList.contains('in-view')) {
                        setTimeout(() => {
                            slideImage.classList.add('in-view');
                        }, slideIndex % 2 === 0 ? 0 : 100);
                    }
                } else if (entry.boundingClientRect.top > 0) {
                    // リセット処理
                    if (slideText) slideText.classList.remove('in-view');
                    if (slideImage) slideImage.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // 各スライドを監視
        const slides = document.querySelectorAll('.about-slide');
        slides.forEach(slide => {
            slideObserver.observe(slide);
        });
        
        // 資格認定セクションのアニメーション監視
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const certContainer = document.querySelector('.certifications-elegant');
        if (certContainer) {
            certObserver.observe(certContainer);
        }
    }

    // パララックス効果
    function initParallaxEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax="true"]');
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.5; // パララックススピード
                const yPos = -(rect.top * speed);
                
                // より滑らかなパララックス効果
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const img = element.querySelector('.slide-img');
                    if (img) {
                        img.style.transform = `translateY(${yPos * 0.3}px) scale(1.1)`;
                    }
                }
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // スクロールイベントの最適化
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // マウスムーブによる微細なパララックス効果（デスクトップのみ）
    function initMouseParallax() {
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const images = document.querySelectorAll('.slide-image.in-view .slide-img');
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                images.forEach(img => {
                    const offsetX = mouseX * 20;
                    const offsetY = mouseY * 20;
                    
                    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
                });
            });
        }
    }

    // 設定の適用
    function applyAboutConfig(config) {
        if (!config) return;
        // 必要に応じて設定を適用
    }

    // スムーススクロール効果
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // モバイル最適化
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // モバイルではパララックス効果を軽減
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                el.removeAttribute('data-parallax');
            });
        }
    }

    // リサイズ時の処理
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            optimizeForMobile();
        }, 250);
    });

    // ギャラリーのライトボックス機能
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        galleryItems.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openLightbox(img.src, index);
            });
        });
    }
    
    function openLightbox(imageSrc, currentIndex) {
        // ライトボックスコンテナを作成
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        // 画像コンテナ
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        // 画像
        const image = document.createElement('img');
        image.src = imageSrc;
        image.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
        `;
        
        // 閉じるボタン
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 30px;
            font-weight: 200;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100001;
        `;
        
        // ナビゲーションボタン
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '‹';
        prevButton.style.cssText = `
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 30px;
            font-weight: 200;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '›';
        nextButton.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 30px;
            font-weight: 200;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        // ホバーエフェクト
        [closeButton, prevButton, nextButton].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.transform = btn === closeButton ? 'scale(1.1)' : btn.style.transform.includes('translateY') ? 'translateY(-50%) scale(1.1)' : 'scale(1.1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.transform = btn === closeButton ? 'scale(1)' : btn.style.transform.includes('translateY') ? 'translateY(-50%) scale(1)' : 'scale(1)';
            });
        });
        
        // 画像リスト
        const allImages = document.querySelectorAll('.gallery-item img');
        let currentIdx = currentIndex;
        
        // ナビゲーション機能
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIdx = (currentIdx - 1 + allImages.length) % allImages.length;
            image.style.opacity = '0';
            setTimeout(() => {
                image.src = allImages[currentIdx].src;
                image.style.opacity = '1';
            }, 200);
        });
        
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIdx = (currentIdx + 1) % allImages.length;
            image.style.opacity = '0';
            setTimeout(() => {
                image.src = allImages[currentIdx].src;
                image.style.opacity = '1';
            }, 200);
        });
        
        // 画像のトランジション
        image.style.transition = 'opacity 0.2s ease';
        
        // 閉じる機能
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            imageContainer.style.transform = 'scale(0.9)';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        };
        
        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // ESCキーで閉じる
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // 矢印キーでナビゲーション
        const handleArrows = (e) => {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        };
        document.addEventListener('keydown', handleArrows);
        
        // DOMに追加
        imageContainer.appendChild(image);
        lightbox.appendChild(imageContainer);
        lightbox.appendChild(closeButton);
        lightbox.appendChild(prevButton);
        lightbox.appendChild(nextButton);
        document.body.appendChild(lightbox);
        
        // アニメーション開始
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
            imageContainer.style.transform = 'scale(1)';
        });
    }
    
    // インストラクター画像の自動切り替え機能
    function initInstructorImageSlider() {
        const container = document.getElementById('instructor-image-container');
        if (!container) return;
        
        const images = container.querySelectorAll('.slide-img');
        const indicators = container.querySelectorAll('.indicator');
        let currentIndex = 0;
        let intervalId;
        
        // 画像を切り替える関数
        function switchImage(index) {
            // 全ての画像とインジケーターを非アクティブに
            images.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // 指定のインデックスの画像とインジケーターをアクティブに
            if (images[index]) {
                images[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentIndex = index;
        }
        
        // 自動切り替え開始
        function startAutoSlide() {
            intervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                switchImage(nextIndex);
            }, 4000); // 4秒ごとに切り替え
        }
        
        // 自動切り替え停止
        function stopAutoSlide() {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
        
        // インジケーターのクリックイベント
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                switchImage(index);
                startAutoSlide();
            });
        });
        
        // ホバー時は自動切り替えを停止
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
        
        // Intersection Observerで表示されているときのみ自動切り替え
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoSlide();
                } else {
                    stopAutoSlide();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(container);
        
        // 初期表示
        switchImage(0);
    }
    
    // 設備セクションのアニメーション
    function initEquipmentAnimation() {
        const equipmentSection = document.querySelector('.equipment-section');
        if (!equipmentSection) return;
        
        // ヘッダーのアニメーション
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease forwards';
                }
            });
        }, { threshold: 0.2 });
        
        const equipmentHeader = document.querySelector('.equipment-header');
        if (equipmentHeader) {
            headerObserver.observe(equipmentHeader);
        }
        
        // 各アイテムのアニメーション
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const equipmentItems = document.querySelectorAll('.equipment-item');
        equipmentItems.forEach(item => {
            item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            itemObserver.observe(item);
        });
        
        // 豪華なマグネティックホバーエフェクト
        equipmentItems.forEach((item, index) => {
            const wrapper = item.querySelector('.equipment-image-wrapper');
            const image = item.querySelector('.equipment-image');
            const overlay = item.querySelector('.equipment-overlay');
            
            // インデックスを設定（CSSアニメーション用）
            wrapper.style.setProperty('--item-index', index);
            
            // マグネティック効果
            let magneticTimeout;
            
            item.addEventListener('mousemove', (e) => {
                clearTimeout(magneticTimeout);
                
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                // マグネティック追従
                const rotateX = deltaY * -10;
                const rotateY = deltaX * 10;
                const translateZ = 30;
                
                wrapper.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(${translateZ}px)
                    scale(1.05)
                `;
                
                // 光の追従
                const gradientX = (x / rect.width) * 100;
                const gradientY = (y / rect.height) * 100;
                
                wrapper.style.background = `
                    radial-gradient(circle at ${gradientX}% ${gradientY}%, 
                        rgba(255, 255, 255, 0.3) 0%, 
                        transparent 50%),
                    linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%)
                `;
            });
            
            item.addEventListener('mouseleave', () => {
                magneticTimeout = setTimeout(() => {
                    wrapper.style.transform = '';
                    wrapper.style.background = '';
                }, 100);
            });
            
            // エントランスアニメーション
            const entranceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('luxury-entrance');
                            
                            // 順番にフェードイン
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0) scale(1)';
                            }, index * 150);
                        }, 100);
                        entranceObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
            
            // 初期状態
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            item.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
            
            entranceObserver.observe(item);
        });
    }
    
    // メールアドレスの保護を解除
    function fixEmailDisplay() {
        const emailLinks = document.querySelectorAll('a[data-email]');
        emailLinks.forEach(link => {
            const email = link.getAttribute('data-email');
            if (email) {
                // Cloudflare email protectionを回避
                const spans = link.querySelectorAll('span');
                if (spans.length === 0 || !link.textContent.includes('@')) {
                    link.textContent = email;
                }
            }
        });
    }
    
    // フォーム送信処理（EmailJS）
    function initContactForm() {
        const form = document.getElementById('inquiry-form');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // ボタンを送信中の状態に
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // フォームデータを取得
            const formData = {
                company: form.company.value,
                user_name: form.name.value,
                user_phone: form.phone.value,
                user_email: form.email.value,
                inquiry_type: form['inquiry-type'].options[form['inquiry-type'].selectedIndex].text,
                message: form.message.value,
                send_date: new Date().toLocaleString('ja-JP')
            };
            
            try {
                // EmailJSで送信
                const response = await emailjs.send(
                    'service_pf2chau',  // Service ID
                    'template_44hhh2n', // Template ID
                    formData
                );
                
                console.log('SUCCESS!', response.status, response.text);
                
                // 成功メッセージを表示
                showSuccessMessage(form);
                
            } catch (error) {
                console.error('FAILED...', error);
                
                // エラーメッセージを表示
                alert('送信に失敗しました。お手数ですが、お電話またはメールでお問い合わせください。');
                
                // ボタンを元に戻す
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // 送信成功メッセージを表示
    function showSuccessMessage(form) {
        const formWrapper = form.parentElement;
        
        // フォームを非表示にしてメッセージを表示
        formWrapper.innerHTML = `
            <div class="success-message" style="
                text-align: center;
                padding: 3rem;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            ">
                <div style="
                    font-size: 3rem;
                    color: #4CAF50;
                    margin-bottom: 1rem;
                ">✓</div>
                <h3 style="
                    font-size: 1.5rem;
                    color: #333;
                    margin-bottom: 1rem;
                    font-weight: 600;
                ">送信が完了しました</h3>
                <p style="
                    color: #666;
                    line-height: 1.6;
                ">お問い合わせありがとうございます。<br>
                内容を確認の上、2営業日以内にご連絡いたします。</p>
            </div>
        `;
        
        // スクロールして成功メッセージを表示
        formWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 初期化処理
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAbout();
            initMouseParallax();
            optimizeForMobile();
            initGalleryLightbox();
            initInstructorImageSlider();
            initEquipmentAnimation();
            fixEmailDisplay();
            initContactForm();
        });
    } else {
        initAbout();
        initMouseParallax();
        optimizeForMobile();
        initGalleryLightbox();
        initInstructorImageSlider();
        initEquipmentAnimation();
        fixEmailDisplay();
        initContactForm();
    }

    // パフォーマンス最適化：Intersection Observerのクリーンアップ
    window.addEventListener('beforeunload', () => {
        const observers = [headerObserver, elementObserver, slideObserver];
        observers.forEach(observer => {
            if (observer) observer.disconnect();
        });
    });
})();