(function() {
    'use strict';

    class FloatMenus {
        constructor() {
            this.init();
        }

        init() {
            console.log('FloatMenus初期化開始');
            // 少し遅延してからアニメーション付きで表示
            setTimeout(() => {
                this.createFloatMenus();
            }, 1000);
        }

        createFloatMenus() {
            const container = document.createElement('div');
            container.id = 'float-menus-container';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                display: flex;
                flex-direction: row;
                gap: 12px;
                z-index: 100020;
                pointer-events: none;
                animation: floatMenusSlideIn 0.8s ease-out;
            `;


            // メニュー用フロートボタン（フォントサイズを小さく調整）
            const menuButton = this.createFloatButton({
                id: 'float-menu',
                text: 'Menu',
                backgroundColor: '#5D9B9B',
                hoverColor: '#4D8B8B',
                tooltip: '',
                onClick: () => {
                    console.log('メニューボタンクリック');
                    this.toggleExpandMenu();
                }
            });

            container.appendChild(menuButton);

            // 展開メニューを作成
            this.createExpandMenu();

            document.body.appendChild(container);
            console.log('FloatMenus作成完了');
        }

        createFloatButton({ id, icon, text, backgroundColor, hoverColor, tooltip, onClick }) {
            const button = document.createElement('div');
            button.id = id;
            button.style.cssText = `
                width: 56px;
                height: 56px;
                background: ${backgroundColor};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                pointer-events: auto;
                position: relative;
                animation: floatButtonBounce 2s ease-in-out infinite;
            `;

            // テキストまたはアイコンを追加
            if (text) {
                const textElement = document.createElement('span');
                textElement.textContent = text;
                textElement.style.cssText = `
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    letter-spacing: 0.5px;
                `;
                button.appendChild(textElement);
            } else if (icon) {
                button.appendChild(icon);
            }

            // ツールチップ（空でない場合のみ作成）
            let tooltipEl = null;
            if (tooltip && tooltip.trim() !== '') {
                tooltipEl = document.createElement('div');
                tooltipEl.textContent = tooltip;
                tooltipEl.style.cssText = `
                    position: absolute;
                    bottom: 70px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s ease;
                    pointer-events: none;
                    z-index: 1;
                `;
                button.appendChild(tooltipEl);
            }

            // イベント
            button.addEventListener('mouseenter', () => {
                button.style.background = hoverColor;
                button.style.transform = 'scale(1.1) rotateZ(5deg)';
                button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.25)';
                button.style.animation = 'floatButtonPulse 0.6s ease-in-out infinite alternate';
                if (tooltipEl) {
                    tooltipEl.style.opacity = '1';
                    tooltipEl.style.visibility = 'visible';
                    tooltipEl.style.transform = 'translateX(-50%) scale(1.05)';
                }
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = backgroundColor;
                button.style.transform = 'scale(1) rotateZ(0deg)';
                button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                button.style.animation = 'floatButtonBounce 2s ease-in-out infinite';
                if (tooltipEl) {
                    tooltipEl.style.opacity = '0';
                    tooltipEl.style.visibility = 'hidden';
                    tooltipEl.style.transform = 'translateX(-50%) scale(1)';
                }
            });

            button.addEventListener('click', (e) => {
                // クリック時のアニメーション
                button.style.animation = 'floatButtonClick 0.3s ease-out';
                
                // リップル効果
                this.createRippleEffect(button, e);
                
                setTimeout(() => {
                    button.style.animation = 'floatButtonBounce 2s ease-in-out infinite';
                }, 300);
                
                onClick();
            });

            return button;
        }

        createChatIcon() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '24');
            svg.setAttribute('height', '24');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.style.cssText = 'pointer-events: none;';

            // フラットなチャットアイコン
            svg.innerHTML = `
                <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22L14 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
                <circle cx="7" cy="9" r="1.5" fill="${this.getChatIconColor()}"/>
                <circle cx="12" cy="9" r="1.5" fill="${this.getChatIconColor()}"/>
                <circle cx="17" cy="9" r="1.5" fill="${this.getChatIconColor()}"/>
            `;

            return svg;
        }

        createLineIcon() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '24');
            svg.setAttribute('height', '24');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.style.cssText = 'pointer-events: none;';

            // フラットなLINEアイコン（シンプルな吹き出し+L字）
            svg.innerHTML = `
                <path d="M19 3H5C3.9 3 3 3.9 3 5V15C3 16.1 3.9 17 5 17H7L12 21L17 17H19C20.1 17 21 16.1 21 15V5C21 3.9 20.1 3 19 3Z" fill="white"/>
                <path d="M8 8H10V14H8V8Z" fill="#78716c"/>
                <path d="M11 8H13V12H15V14H11V8Z" fill="#78716c"/>
            `;

            return svg;
        }

        getChatIconColor() {
            return '#64748b';
        }

        createRippleEffect(button, event) {
            const ripple = document.createElement('div');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }

        createExpandMenu() {
            // 展開メニューコンテナ
            const expandMenu = document.createElement('div');
            expandMenu.id = 'expand-menu-container';
            expandMenu.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 20px;
                width: 220px;
                background: linear-gradient(135deg, rgba(93, 155, 155, 0.98) 0%, rgba(77, 139, 139, 0.98) 100%);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 14px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
                padding: 6px;
                opacity: 0;
                visibility: hidden;
                transform: scale(0.3) translateY(20px);
                transform-origin: bottom left;
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 100019;
            `;

            // タイトルを追加（左側にMenu、右側に事務所名）
            const menuHeader = document.createElement('div');
            menuHeader.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 14px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 4px;
            `;
            
            const menuText = document.createElement('span');
            menuText.style.cssText = `
                color: rgba(255, 255, 255, 0.7);
                font-size: 11px;
                font-weight: 500;
                letter-spacing: 1px;
            `;
            menuText.textContent = 'Menu';
            
            const officeName = document.createElement('span');
            officeName.style.cssText = `
                color: rgba(255, 255, 255, 0.9);
                font-size: 9px;
                font-weight: 600;
                letter-spacing: 0.5px;
            `;
            officeName.textContent = '森下知幸税理士事務所';
            
            menuHeader.appendChild(menuText);
            menuHeader.appendChild(officeName);
            expandMenu.appendChild(menuHeader);

            // メニューアイテム
            const menuItems = [
                { text: 'HOME', href: '#hero' },
                { text: '事務所紹介', href: '#about' },
                { text: '事業内容', href: '#about-services' },
                { text: '料金案内', href: '#pricing' },
                { text: 'お問い合わせ', href: '#contact-flow' },
                { text: 'ACCESS', href: '#access' }
            ];

            menuItems.forEach((item, index) => {
                const menuItem = document.createElement('a');
                menuItem.href = item.href;
                menuItem.style.cssText = `
                    display: block;
                    padding: 8px 14px;
                    margin: 1px 0;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 1.5px;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: translateX(-10px);
                    animation-delay: ${index * 0.03}s;
                    position: relative;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
                    border: 1px solid transparent;
                `;

                const text = document.createElement('span');
                text.textContent = item.text;
                text.style.position = 'relative';
                text.style.zIndex = '1';

                menuItem.appendChild(text);

                // ホバーエフェクト
                menuItem.addEventListener('mouseenter', () => {
                    menuItem.style.background = 'rgba(255, 255, 255, 0.08)';
                    menuItem.style.color = 'rgba(255, 255, 255, 0.95)';
                    menuItem.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    menuItem.style.transform = 'translateX(3px)';
                });

                menuItem.addEventListener('mouseleave', () => {
                    menuItem.style.background = 'rgba(255, 255, 255, 0.03)';
                    menuItem.style.color = 'rgba(255, 255, 255, 0.7)';
                    menuItem.style.borderColor = 'transparent';
                    menuItem.style.transform = 'translateX(0)';
                });

                // クリック時のスムーズスクロール
                menuItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = item.href.replace('#', '');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // カスタムスムーススクロール
                        const siteHeader = document.querySelector('.site-header');
                        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 30;
                        
                        this.smoothScrollTo(targetPosition, 800);
                        this.toggleExpandMenu(); // メニューを閉じる
                        
                        // ターゲット要素にハイライトアニメーション
                        targetElement.classList.add('section-highlight');
                        setTimeout(() => {
                            targetElement.classList.remove('section-highlight');
                        }, 1000);
                    }
                });

                expandMenu.appendChild(menuItem);
            });

            document.body.appendChild(expandMenu);
            this.expandMenu = expandMenu;
            this.isMenuOpen = false;
        }

        toggleExpandMenu() {
            const menu = this.expandMenu;
            const menuButton = document.getElementById('float-menu');
            
            if (!this.isMenuOpen) {
                // メニューを開く
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'scale(1) translateY(0)';
                
                // 各メニューアイテムをアニメーション
                const items = menu.querySelectorAll('a');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0.9';
                        item.style.transform = 'translateX(0)';
                        item.style.animation = 'menuItemSlide 0.4s ease forwards';
                    }, index * 30);
                });

                // ボタンを回転
                if (menuButton) {
                    menuButton.style.transform = 'scale(1.1) rotate(180deg)';
                }

                this.isMenuOpen = true;
            } else {
                // メニューを閉じる
                const items = menu.querySelectorAll('a');
                items.forEach((item) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-10px)';
                });

                setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'scale(0.3) translateY(20px)';
                }, 200);

                // ボタンを元に戻す
                if (menuButton) {
                    menuButton.style.transform = 'scale(1) rotate(0deg)';
                }

                this.isMenuOpen = false;
            }
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                background: ${type === 'success' ? '#64748b' : type === 'error' ? '#f44336' : type === 'warning' ? '#FF9800' : '#2196F3'};
                color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 100025;
                animation: slideInNotification 0.3s ease;
                font-size: 14px;
            `;

            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutNotification 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        smoothScrollTo(targetPosition, duration) {
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
    }

    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInNotification {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutNotification {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
        
        @keyframes floatMenusSlideIn {
            0% { 
                transform: translateX(-100px) translateY(20px) rotate(-10deg); 
                opacity: 0; 
                filter: blur(5px);
            }
            50% { 
                transform: translateX(10px) translateY(-5px) rotate(2deg); 
                opacity: 0.8; 
                filter: blur(1px);
            }
            100% { 
                transform: translateX(0) translateY(0) rotate(0deg); 
                opacity: 1; 
                filter: blur(0px);
            }
        }
        
        @keyframes floatButtonBounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-3px) scale(1.02); }
        }
        
        @keyframes floatButtonPulse {
            0% { transform: scale(1.1) rotateZ(5deg); }
            100% { transform: scale(1.15) rotateZ(5deg); }
        }
        
        @keyframes floatButtonClick {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(0.9) rotate(-5deg); }
            100% { transform: scale(1.05) rotate(0deg); }
        }
        
        @keyframes menuItemSlide {
            0% { 
                transform: translateX(-10px); 
                opacity: 0; 
            }
            100% { 
                transform: translateX(0); 
                opacity: 1; 
            }
        }
        
        @keyframes rippleEffect {
            0% { 
                transform: scale(0); 
                opacity: 1; 
            }
            100% { 
                transform: scale(2); 
                opacity: 0; 
            }
        }
        
        /* モバイル対応 */
        @media (max-width: 768px) {
            #float-menus-container {
                bottom: 15px !important;
                left: 15px !important;
            }
            
            #float-menus-container > div {
                width: 48px !important;
                height: 48px !important;
            }
            
            #float-menus-container svg {
                width: 20px !important;
                height: 20px !important;
            }
            
            #float-menus-container span {
                font-size: 12px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // グローバルに公開
    window.FloatMenus = FloatMenus;

    // 自動初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.floatMenus = new FloatMenus();
    });

    console.log('FloatMenus.js loaded');
})();